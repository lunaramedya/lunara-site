type BasePayload = {
  name: string;
  phone: string;
};

export type ContactApiPayload =
  | (BasePayload & {
      kind: 'contact';
      company: string;
      email: string;
      message: string;
    })
  | (BasePayload & {
      kind: 'lead';
      service: string;
      planId?: string;
      planName?: string;
      planPrice?: string;
      source?: 'package_card' | 'generic_cta';
    });

type ContactApiResponse = {
  ok: boolean;
  message: string;
};

export async function submitContactForm(payload: ContactApiPayload) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const raw = await response.text();
  let data: ContactApiResponse | null = null;

  try {
    data = raw ? (JSON.parse(raw) as ContactApiResponse) : null;
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        (response.status === 404
          ? 'API endpoint bulunamadı. Deploy ayarları güncellenip tekrar yayın alınmalı.'
          : 'Mesaj gönderilirken sunucu tarafında bir hata oluştu.'),
    );
  }

  if (!data?.ok) {
    throw new Error(data?.message || 'Mesaj gönderilirken bir hata oluştu.');
  }

  return data;
}
