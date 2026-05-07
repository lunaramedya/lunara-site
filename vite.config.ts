import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import { readJsonBody, submitMailRequest } from './server/contact-mail';
import { createSession, verifyAdminPassword, requireAdmin } from './server/admin-auth';
import { getContent, setContent, insertEventLog, runQuery } from './server/db';
import { getRequestMeta } from './server/request';

import { cloudflare } from "@cloudflare/vite-plugin";

function contactApiPlugin(env: Record<string, string>): Plugin {
  return {
    name: 'lunara-contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res, next) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          next();
          return;
        }

        try {
          const payload = await readJsonBody(req);
          const meta = getRequestMeta(req as { headers?: Record<string, string> });
          const result = await submitMailRequest(payload, env, meta);
          res.statusCode = result.status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(result.body));
        } catch {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              ok: false,
              message: 'Sunucu tarafında bir hata oluştu. Lütfen tekrar deneyin.',
            }),
          );
        }
      });

      server.middlewares.use('/api/content', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== 'GET') {
          res.statusCode = 405;
          res.end();
          return;
        }

        try {
          const content = await getContent(env, 'site');
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true, content }));
        } catch {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, message: 'İçerik alınamadı.' }));
        }
      });

      server.middlewares.use('/api/log', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end();
          return;
        }

        try {
          const payload = await readJsonBody(req);
          const meta = getRequestMeta(req as { headers?: Record<string, string> });
          if (payload?.eventType && payload?.eventName) {
            await insertEventLog(env, {
              eventType: payload.eventType,
              eventName: payload.eventName,
              page: payload.page,
              sessionId: payload.sessionId,
              metadata: payload.metadata,
              ip: meta.ip ?? null,
              userAgent: meta.userAgent ?? null,
              referrer: meta.referrer ?? null,
            });
          }
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true }));
        } catch {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false }));
        }
      });

      server.middlewares.use('/api/admin/login', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end();
          return;
        }

        try {
          const payload = await readJsonBody(req);
          const password = payload?.password;
          if (!password || typeof password !== 'string') {
            res.statusCode = 400;
            res.end(JSON.stringify({ ok: false, message: 'Şifre zorunludur.' }));
            return;
          }
          if (!verifyAdminPassword(env, password.trim())) {
            res.statusCode = 401;
            res.end(JSON.stringify({ ok: false, message: 'Şifre hatalı.' }));
            return;
          }
          const session = await createSession(env);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true, token: session.token, expiresAt: session.expiresAt.toISOString() }));
        } catch {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: false, message: 'Giriş yapılamadı.' }));
        }
      });

      const getAuthToken = (headers?: Record<string, string | string[] | undefined>) => {
        const auth = headers?.authorization ?? headers?.Authorization;
        const value = Array.isArray(auth) ? auth[0] : auth;
        return value?.split(' ')[1];
      };

      server.middlewares.use('/api/admin/content', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        const token = getAuthToken(req.headers);
        const isAdmin = await requireAdmin(env, token);
        if (!isAdmin) {
          res.statusCode = 401;
          res.end(JSON.stringify({ ok: false, message: 'Yetkisiz erişim.' }));
          return;
        }

        if (req.method === 'GET') {
          const content = await getContent(env, 'site');
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true, content }));
          return;
        }

        if (req.method === 'PUT') {
          const payload = await readJsonBody(req);
          await setContent(env, 'site', payload, 'admin');
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ ok: true }));
          return;
        }

        res.statusCode = 405;
        res.end();
      });

      const adminListHandler = async (
        req: { method?: string; url?: string; headers?: Record<string, string | string[] | undefined> },
        res: any,
        table: string,
      ) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        const token = getAuthToken(req.headers);
        const isAdmin = await requireAdmin(env, token);
        if (!isAdmin) {
          res.statusCode = 401;
          res.end(JSON.stringify({ ok: false, message: 'Yetkisiz erişim.' }));
          return;
        }

        if (req.method !== 'GET') {
          res.statusCode = 405;
          res.end();
          return;
        }

        const params = new URL(req.url ?? '', 'http://localhost').searchParams;
        const limit = Math.min(Math.max(Number(params.get('limit') ?? 200), 1), 500);
        const rows = await runQuery(env, `SELECT * FROM ${table} ORDER BY created_at DESC LIMIT $1`, [limit]);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ ok: true, items: rows }));
      };

      server.middlewares.use('/api/admin/logs', (req, res) => adminListHandler(req, res, 'event_logs'));
      server.middlewares.use('/api/admin/leads', (req, res) => adminListHandler(req, res, 'leads'));
      server.middlewares.use('/api/admin/contacts', (req, res) => adminListHandler(req, res, 'contacts'));
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss(), contactApiPlugin(env), cloudflare()],
  };
});