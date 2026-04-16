import { createSession, verifyAdminPassword } from '../../server/admin-auth.js';

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
    const password = payload?.password;

    if (!password || typeof password !== 'string') {
      res.status(400).json({ ok: false, message: 'Şifre zorunludur.' });
      return;
    }

    const ok = verifyAdminPassword(process.env, password.trim());
    if (!ok) {
      res.status(401).json({ ok: false, message: 'Şifre hatalı.' });
      return;
    }

    const session = await createSession(process.env);

    res.status(200).json({
      ok: true,
      token: session.token,
      expiresAt: session.expiresAt.toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error instanceof Error ? error.message : 'Giriş yapılırken hata oluştu.',
    });
  }
}
