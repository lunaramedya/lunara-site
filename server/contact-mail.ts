import nodemailer from 'nodemailer';

type BasePayload = {
  name?: string;
  phone?: string;
};

export type ContactPayload = BasePayload & {
  kind: 'contact';
  company?: string;
  email?: string;
  message?: string;
};

export type LeadPayload = BasePayload & {
  kind: 'lead';
  service?: string;
};

export type MailPayload = ContactPayload | LeadPayload;

type EnvSource = Record<string, string | undefined>;

type ApiResult = {
  status: number;
  body: {
    ok: boolean;
    message: string;
  };
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function readRequiredEnv(env: EnvSource) {
  const host = env.SMTP_HOST;
  const port = Number(env.SMTP_PORT);
  const user = env.SMTP_USER;
  const pass = env.SMTP_PASS?.replace(/\s+/g, '');
  const to = env.MAIL_TO ?? env.SMTP_USER;

  if (!host || !port || !user || !pass || !to) {
    throw new Error('MAIL_ENV_MISSING');
  }

  return { host, port, user, pass, to };
}

function ensureText(value: string | undefined, minLength = 1) {
  return typeof value === 'string' && value.trim().length >= minLength;
}

function validatePayload(payload: unknown): payload is MailPayload {
  if (!payload || typeof payload !== 'object') {
    return false;
  }

  const data = payload as Partial<MailPayload>;

  if (data.kind === 'contact') {
    return (
      ensureText(data.name, 2) &&
      ensureText(data.company, 2) &&
      ensureText(data.phone, 10) &&
      ensureText(data.email, 5) &&
      ensureText(data.message, 10)
    );
  }

  if (data.kind === 'lead') {
    return ensureText(data.name, 2) && ensureText(data.phone, 10) && ensureText(data.service, 2);
  }

  return false;
}

function buildMail(payload: MailPayload) {
  if (payload.kind === 'contact') {
    const subject = `Yeni İletişim Formu - ${payload.company}`;
    const text = [
      'Lunara Medya web sitesi üzerinden yeni bir proje talebi geldi.',
      '',
      `Ad Soyad: ${payload.name}`,
      `Marka / Firma: ${payload.company}`,
      `Telefon: ${payload.phone}`,
      `E-posta: ${payload.email}`,
      '',
      'Proje Notu:',
      payload.message,
    ].join('\n');

    const html = `
      <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6">
        <h2 style="margin:0 0 18px">Yeni proje talebi</h2>
        <table style="border-collapse:collapse;width:100%;max-width:680px">
          <tr><td style="padding:8px 0;font-weight:700">Ad Soyad</td><td style="padding:8px 0">${escapeHtml(payload.name ?? '')}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Marka / Firma</td><td style="padding:8px 0">${escapeHtml(payload.company ?? '')}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">Telefon</td><td style="padding:8px 0">${escapeHtml(payload.phone ?? '')}</td></tr>
          <tr><td style="padding:8px 0;font-weight:700">E-posta</td><td style="padding:8px 0">${escapeHtml(payload.email ?? '')}</td></tr>
        </table>
        <div style="margin-top:20px;padding:18px;border-radius:16px;background:#eef6ff;border:1px solid #c7d2fe">
          <div style="font-weight:700;margin-bottom:10px">Proje Notu</div>
          <div>${escapeHtml(payload.message ?? '').replace(/\n/g, '<br />')}</div>
        </div>
      </div>
    `;

    return {
      subject,
      text,
      html,
      replyTo: payload.email?.trim(),
    };
  }

  const subject = `Yeni Teklif Talebi - ${payload.service}`;
  const text = [
    'Lunara Medya teklif modalı üzerinden yeni bir talep geldi.',
    '',
    `Ad Soyad: ${payload.name}`,
    `Telefon: ${payload.phone}`,
    `İlgilendiği Hizmet: ${payload.service}`,
  ].join('\n');

  const html = `
    <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6">
      <h2 style="margin:0 0 18px">Yeni teklif talebi</h2>
      <table style="border-collapse:collapse;width:100%;max-width:680px">
        <tr><td style="padding:8px 0;font-weight:700">Ad Soyad</td><td style="padding:8px 0">${escapeHtml(payload.name ?? '')}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">Telefon</td><td style="padding:8px 0">${escapeHtml(payload.phone ?? '')}</td></tr>
        <tr><td style="padding:8px 0;font-weight:700">İlgilendiği Hizmet</td><td style="padding:8px 0">${escapeHtml(payload.service ?? '')}</td></tr>
      </table>
    </div>
  `;

  return {
    subject,
    text,
    html,
    replyTo: undefined,
  };
}

export async function submitMailRequest(payload: unknown, env: EnvSource): Promise<ApiResult> {
  if (!validatePayload(payload)) {
    return {
      status: 400,
      body: {
        ok: false,
        message: 'Form verileri eksik veya hatalı.',
      },
    };
  }

  try {
    const config = readRequiredEnv(env);
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.port === 465,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });

    const mail = buildMail(payload);

    await transporter.sendMail({
      from: `"Lunara Medya Web Form" <${config.user}>`,
      to: config.to,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      replyTo: mail.replyTo,
    });

    return {
      status: 200,
      body: {
        ok: true,
        message: 'Mesajınız başarıyla gönderildi.',
      },
    };
  } catch {
    return {
      status: 500,
      body: {
        ok: false,
        message: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.',
      },
    };
  }
}

export async function readJsonBody(request: AsyncIterable<Uint8Array>) {
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
