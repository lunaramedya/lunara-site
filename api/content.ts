import { getContent } from '../server/db.js';

type RequestLike = AsyncIterable<Uint8Array> & {
  method?: string;
};

type ResponseLike = {
  setHeader: (name: string, value: string) => void;
  status: (code: number) => ResponseLike;
  json: (body: unknown) => void;
  end: () => void;
};

export default async function handler(req: RequestLike, res: ResponseLike) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(204).end();
    return;
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET, OPTIONS');
    res.status(405).json({ ok: false, message: 'Bu endpoint yalnızca GET isteklerini kabul eder.' });
    return;
  }

  try {
    const content = await getContent(process.env, 'site');
    res.status(200).json({ ok: true, content });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error instanceof Error ? error.message : 'İçerik alınırken hata oluştu.',
    });
  }
}
