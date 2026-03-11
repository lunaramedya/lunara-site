# Lunara Medya

İstanbul merkezli, Türkiye geneline hizmet veren premium ajans landing page projesi.

## Teknoloji Yığını

- React + Vite + TypeScript
- Tailwind CSS v4
- Framer Motion
- lucide-react
- react-hook-form

## Kurulum

```bash
npm install
npm run dev
```

## Mail Ayarları

Otomatik form gönderimi için `.env.local` veya Vercel Environment Variables içine aşağıdaki alanları tanımlayın:

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-account@gmail.com
SMTP_PASS=your-app-password
MAIL_TO=your-account@gmail.com
```

Local geliştirmede `npm run dev` altında `/api/contact` endpoint'i çalışır. Vercel deploy'unda aynı endpoint `api/contact.ts` üzerinden serverless function olarak devam eder.

## Build

```bash
npm run build
npm run preview
```

## Bölümler

- Sticky Navbar + Teklif Al Modalı
- Hero + İstatistikler
- Social Proof + Yorumlar
- Hizmetler
- Süreç
- Çalışmalar / Case Studies (filtreli)
- Paketler
- SSS
- Blog Önizleme
- İletişim Formu + Harita
- Sabit WhatsApp CTA
- Footer

## Özelleştirme Notları

- Tüm statik içerik `src/data/siteData.ts` dosyasından yönetilir.
- Form gönderimleri SMTP tabanlı backend endpoint'i üzerinden otomatik mail atar.
- Vercel'de aynı SMTP değişkenlerini `Environment Variables` bölümüne eklemeniz gerekir.
