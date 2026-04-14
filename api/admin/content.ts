import { requireAdmin } from '../../server/admin-auth.js';
import { getContent, setContent } from '../../server/db.js';

type RequestLike = AsyncIterable<Uint8Array> & {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
};

type ResponseLike = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ResponseLike;
  json: (body: unknown) => void;
  end: () => void;
};

async function readJsonBody(request: AsyncIterable<Uint8Array>) {
  const chunks: Uint8Array[] = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  if (!chunks.length) {
    return null;
  }
  const rawBody = Buffer.concat(chunks).toString('utf8');
  return rawBody ? JSON.parse(rawBody) : null;
}

function getToken(headers: Record<string, string> | undefined) {
  const auth = headers?.authorization ?? headers?.Authorization;
  if (!auth) {
    return null;
  }
  const [, token] = auth.split(' ');
  return token ?? null;
}

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'GET, PUT, OPTIONS');
    res.status(204).end();
    return;
  }

  const token = getToken(req.headers);
  const isAdmin = await requireAdmin(process.env, token);

  if (!isAdmin) {
    res.status(401).json({ ok: false, message: 'Yetkisiz erişim.' });
    return;
  }

  if (req.method === 'GET') {
    const content = await getContent(process.env, 'site');
    res.status(200).json({ ok: true, content });
    return;
  }

  if (req.method === 'PUT') {
    const payload = req.body ?? (await readJsonBody(req));
    if (!payload || typeof payload !== 'object') {
      res.status(400).json({ ok: false, message: 'İçerik verisi eksik.' });
      return;
    }

    await setContent(process.env, 'site', payload, 'admin');
    res.status(200).json({ ok: true });
    return;
  }

  res.setHeader('Allow', 'GET, PUT, OPTIONS');
  res.status(405).json({ ok: false, message: 'Bu endpoint yalnızca GET/PUT isteklerini kabul eder.' });
}
