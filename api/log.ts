import { insertEventLog } from '../server/db.js';
import { getRequestMeta } from '../server/request.js';

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

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(405).json({ ok: false, message: 'Bu endpoint yalnızca POST isteklerini kabul eder.' });
    return;
  }

  try {
    const payload = req.body ?? (await readJsonBody(req));
    if (!payload || typeof payload !== 'object') {
      res.status(400).json({ ok: false, message: 'Log verisi eksik.' });
      return;
    }

    const data = payload as {
      eventType?: string;
      eventName?: string;
      page?: string;
      sessionId?: string;
      metadata?: unknown;
    };

    if (!data.eventType || !data.eventName) {
      res.status(400).json({ ok: false, message: 'Log alanları eksik.' });
      return;
    }

    const meta = getRequestMeta(req);
    await insertEventLog(process.env, {
      eventType: data.eventType,
      eventName: data.eventName,
      page: data.page,
      sessionId: data.sessionId,
      metadata: data.metadata,
      ip: meta.ip ?? null,
      userAgent: meta.userAgent ?? null,
      referrer: meta.referrer ?? null,
    });

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error instanceof Error ? error.message : 'Log kaydı yapılamadı.',
    });
  }
}
