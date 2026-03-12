import { motion } from 'framer-motion';
import { Instagram, Mail, MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { contactInfo } from '../../data/siteData';
import { submitContactForm } from '../../utils/contactApi';
import { SectionContainer } from '../layout/SectionContainer';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { SectionTitle } from '../ui/SectionTitle';
import { Textarea } from '../ui/Textarea';
import { Toast } from '../ui/Toast';

type ContactFormValues = {
  name: string;
  company: string;
  phone: string;
  email: string;
  instagram: string;
  interestedService: string;
  monthlyAdBudget: string;
  message: string;
};

const contactServiceOptions = [
  'Web Site Tasarımı',
  'Landing Page & Funnel',
  'Meta Ads Yönetimi',
  'Sosyal Medya Reklamcılığı',
  'Google Ads & Arama',
  'Tam Kapsam Çalışma',
];

const budgetOptions = [
  'Henüz belirlenmedi',
  '15.000 TL altı',
  '15.000 TL - 30.000 TL',
  '30.000 TL - 60.000 TL',
  '60.000 TL ve üzeri',
];

type ContactSectionProps = {
  emphasized: boolean;
};

export function ContactSection({ emphasized }: ContactSectionProps) {
  const whatsappHref = `https://wa.me/${contactInfo.whatsapp}`;
  const mailtoHref = `mailto:${contactInfo.email}`;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      company: '',
      phone: '',
      email: '',
      instagram: '',
      interestedService: '',
      monthlyAdBudget: '',
      message: '',
    },
  });

  const [toastState, setToastState] = useState<{
    open: boolean;
    type: 'success' | 'error';
    title: string;
    message: string;
  }>({
    open: false,
    type: 'success',
    title: '',
    message: '',
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      await submitContactForm({
        kind: 'contact',
        name: values.name,
        company: values.company,
        phone: values.phone,
        email: values.email,
        instagram: values.instagram,
        interestedService: values.interestedService,
        monthlyAdBudget: values.monthlyAdBudget,
        message: values.message,
      });
      reset();
      setToastState({
        open: true,
        type: 'success',
        title: 'Mesaj gönderildi',
        message: 'Mesajınız başarı ile gönderilmiştir. En kısa sürede size dönüş yapılacaktır.',
      });
    } catch (error) {
      setToastState({
        open: true,
        type: 'error',
        title: 'Gönderim başarısız',
        message: error instanceof Error ? error.message : 'Mesaj gönderilirken bir hata oluştu.',
      });
    }
  };

  return (
    <SectionContainer id="contact" className="scroll-mt-24">
      <SectionTitle
        badge={<span className="inline-flex items-center rounded-full border border-[var(--color-border-strong)] bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">Contact</span>}
        title="Projeyi birlikte başlatalım"
        subtitle="Markanızın hedefini, istediğiniz görünümü ve hizmet ihtiyacınızı paylaşın. Size uygun web, reklam ve büyüme modelini net biçimde kuralım."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <motion.div
          animate={emphasized ? { scale: [1, 1.01, 1] } : { scale: 1 }}
          transition={{ duration: 0.45 }}
          className="rounded-[30px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6 shadow-[0_24px_60px_rgba(2,8,20,0.4)] backdrop-blur-xl"
        >
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">
              Project Brief
            </p>
            <p
              className="mt-3 text-3xl leading-none text-[var(--color-ink)] sm:text-4xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Briefinizi bırakın,
              <span className="block bg-[linear-gradient(135deg,var(--color-primary),#d7d5ff_52%,var(--color-accent))] bg-clip-text text-transparent">
                güçlü bir başlangıç hazırlayalım.
              </span>
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                id="name"
                label="Ad Soyad"
                placeholder="Adınız Soyadınız"
                error={errors.name?.message}
                autoComplete="name"
                {...register('name', { required: 'Ad soyad zorunludur.' })}
              />
              <Input
                id="company"
                label="Marka / Firma"
                placeholder="Marka veya firma adınız"
                error={errors.company?.message}
                autoComplete="organization"
                {...register('company', { required: 'Firma bilgisi zorunludur.' })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                id="phone"
                label="Telefon"
                placeholder="05xx xxx xx xx"
                error={errors.phone?.message}
                inputMode="tel"
                autoComplete="tel"
                {...register('phone', {
                  required: 'Telefon zorunludur.',
                  minLength: {
                    value: 10,
                    message: 'Telefon numarası en az 10 karakter olmalı.',
                  },
                })}
              />
              <Input
                id="email"
                label="E-posta"
                type="email"
                placeholder="ornek@firma.com"
                error={errors.email?.message}
                autoComplete="email"
                {...register('email', {
                  required: 'E-posta zorunludur.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Geçerli bir e-posta girin.',
                  },
                })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                id="instagram"
                label="Instagram Hesabı"
                placeholder="@markaniz"
                error={errors.instagram?.message}
                autoComplete="off"
                {...register('instagram', {
                  required: 'Instagram hesabı zorunludur.',
                })}
              />

              <div className="space-y-2">
                <label htmlFor="interestedService" className="block text-sm font-medium text-[var(--color-ink)]">
                  İlgilendiğiniz Hizmet
                </label>
                <select
                  id="interestedService"
                  className="h-12 w-full rounded-[20px] border border-[var(--color-border-strong)] bg-white/6 px-4 text-sm text-[var(--color-ink)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                  {...register('interestedService', { required: 'Hizmet seçimi zorunludur.' })}
                >
                  <option value="">Seçiniz</option>
                  {contactServiceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.interestedService?.message ? (
                  <p className="text-xs text-rose-600">{errors.interestedService.message}</p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="monthlyAdBudget" className="block text-sm font-medium text-[var(--color-ink)]">
                Aylık Reklam Bütçesi
              </label>
              <select
                id="monthlyAdBudget"
                className="h-12 w-full rounded-[20px] border border-[var(--color-border-strong)] bg-white/6 px-4 text-sm text-[var(--color-ink)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                {...register('monthlyAdBudget', { required: 'Bütçe bilgisi zorunludur.' })}
              >
                <option value="">Seçiniz</option>
                {budgetOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.monthlyAdBudget?.message ? (
                <p className="text-xs text-rose-600">{errors.monthlyAdBudget.message}</p>
              ) : null}
            </div>

            <Textarea
              id="message"
              label="Proje Notu"
              placeholder="İstediğiniz site yapısını, hedef kitlenizi ve reklam ihtiyacınızı kısaca anlatın."
              error={errors.message?.message}
              autoComplete="off"
              {...register('message', {
                required: 'Mesaj alanı zorunludur.',
                minLength: {
                  value: 10,
                  message: 'Mesajınız en az 10 karakter olmalı.',
                },
              })}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Gönderiliyor...' : 'Mesajı Gönder'}
            </Button>
          </form>
        </motion.div>

        <div className="space-y-5 rounded-[30px] border border-[var(--color-border)] bg-[linear-gradient(180deg,#0d1528,#09111f)] p-5 sm:p-6 text-white shadow-[0_28px_70px_rgba(1,6,16,0.5)]">
          <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/56">Direct Contact</p>
            <h3
              className="mt-3 text-3xl leading-none text-white sm:text-4xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Hızlı dönüş,
              <span className="block text-white/72">net yol haritası.</span>
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-white/78">
              <li className="flex items-start gap-3">
                <Phone size={17} className="mt-0.5 text-[var(--color-primary)]" />
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="transition hover:text-white">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={17} className="mt-0.5 text-[var(--color-primary)]" />
                <a href={mailtoHref} className="transition hover:text-white">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Instagram size={17} className="mt-0.5 text-[var(--color-primary)]" />
                <a href={contactInfo.instagramUrl} target="_blank" rel="noreferrer" className="transition hover:text-white">
                  {contactInfo.instagramHandle}
                </a>
              </li>
            </ul>
          </div>

          <Button
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            variant="secondary"
            className="w-full"
          >
            <MessageCircle size={16} /> WhatsApp'tan Ulaş
          </Button>

          <a
            href={contactInfo.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Instagram size={16} />
            Instagram'da bizi takip et
          </a>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-4 text-sm text-white/72">
              Hizmet tarafı
              <span className="mt-2 block text-base font-semibold text-white">Web, landing, reklam ve kreatif</span>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-4 text-sm text-white/72">
              Çalışma biçimi
              <span className="mt-2 block text-base font-semibold text-white">Tamamen dijital ve esnek proje yönetimi</span>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-4 text-sm text-white/72">
              Hedef
              <span className="mt-2 block text-base font-semibold text-white">Daha güçlü algı ve daha net talep akışı</span>
            </div>
          </div>
        </div>
      </div>

      <Toast
        open={toastState.open}
        type={toastState.type}
        title={toastState.title}
        message={toastState.message}
        onClose={() => setToastState((current) => ({ ...current, open: false }))}
      />
    </SectionContainer>
  );
}
