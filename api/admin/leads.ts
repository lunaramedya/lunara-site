import { requireAdmin } from '../../server/admin-auth.js';
import { runQuery } from '../../server/db.js';

type RequestLike = {
  method?: string;
  headers?: Record<string, string>;
  url?: string;
};

type ResponseLike = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ResponseLike;
  json: (body: unknown) => void;
  end: () => void;
};

function getToken(headers: Record<string, string> | undefined) {
  const auth = headers?.authorization ?? headers?.Authorization;
  if (!auth) {
    return null;
  }
  const [, token] = auth.split(' ');
  return token ?? null;
}

function getLimit(url?: string) {
  if (!url) {
    return 200;
  }
  try {
    const params = new URL(url, 'http://localhost').searchParams;
    const value = Number(params.get('limit'));
    return Number.isFinite(value) ? Math.min(Math.max(value, 1), 500) : 200;
  } catch {
    return 200;
  }
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(204).end();
    return;
  }

  const token = getToken(req.headers);
  const isAdmin = await requireAdmin(process.env, token);

  if (!isAdmin) {
    res.status(401).json({ ok: false, message: 'Yetkisiz erişim.' });
    return;
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(405).json({ ok: false, message: 'Bu endpoint yalnızca GET isteklerini kabul eder.' });
    return;
  }

  const limit = getLimit(req.url);
  const rows = await runQuery(process.env, 'SELECT * FROM leads ORDER BY created_at DESC LIMIT $1', [limit]);
  res.status(200).json({ ok: true, items: rows });
}
