import { readJsonBody, submitMailRequest } from '../server/contact-mail.js';
import { getRequestMeta } from '../server/request.js';

type RequestLike = AsyncIterable<Uint8Array> & {
  method?: string;
  body?: unknown;
};

type ResponseLike = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ResponseLike;
  json: (body: unknown) => void;
  end: () => void;
};

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    res.status(405).json({
      ok: false,
      message: 'Bu endpoint yalnızca POST isteklerini kabul eder.',
    });
    return;
  }

  try {
    const payload = req.body ?? (await readJsonBody(req));
    const meta = getRequestMeta(req as { headers?: Record<string, string> });
    const result = await submitMailRequest(payload, process.env, meta);
    res.status(result.status).json(result.body);
  } catch {
    res.status(500).json({
      ok: false,
      message: 'Sunucu tarafında bir hata oluştu. Lütfen tekrar deneyin.',
    });
  }
}
