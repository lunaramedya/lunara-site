import { motion } from 'framer-motion';
import { Instagram, Mail, MessageCircle, Phone } from 'lucide-react';
import { useState } from 'react';
import { useForm, type UseFormRegister } from 'react-hook-form';
import { useSiteContent } from '../../context/SiteContentContext';
import { logEvent } from '../../utils/logging';
import { submitContactForm } from '../../utils/contactApi';
import { SectionContainer } from '../layout/SectionContainer';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Toast } from '../ui/Toast';

type ContactFormValues = {
  name: string;
  company: string;
  phone: string;
  email: string;
  instagram: string;
  sector: string;
  interestedService: string;
  monthlyAdBudget: string;
  primaryGoal: string;
  creatorSupportNeeded: string;
  message: string;
};

type ContactSectionProps = {
  emphasized: boolean;
};

type ToastState = {
  open: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
};

type ContactFieldName = keyof ContactFormValues;

type ContactSelectFieldProps = {
  id: ContactFieldName;
  label: string;
  options: string[];
  requiredMessage: string;
  register: UseFormRegister<ContactFormValues>;
  error?: string;
};

const contactFormDefaults: ContactFormValues = {
  name: '',
  company: '',
  phone: '',
  email: '',
  instagram: '',
  sector: '',
  interestedService: '',
  monthlyAdBudget: '',
  primaryGoal: '',
  creatorSupportNeeded: '',
  message: '',
};

const defaultToastState: ToastState = {
  open: false,
  type: 'success',
  title: '',
  message: '',
};

const selectClassName =
  'h-12 w-full rounded-[20px] border border-[var(--color-border-strong)] bg-white/6 px-4 text-sm text-[var(--color-ink)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20';

function ContactSelectField({
  id,
  label,
  options,
  requiredMessage,
  register,
  error,
}: ContactSelectFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-[var(--color-ink)]">
        {label}
      </label>
      <select id={id} className={selectClassName} {...register(id, { required: requiredMessage })}>
        <option value="">Seçiniz</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}

export function ContactSection({ emphasized }: ContactSectionProps) {
  const { content, editMode, updateContentField, saveContent } = useSiteContent();
  const whatsappHref = `https://wa.me/${content.contactInfo.whatsapp}`;
  const mailtoHref = `mailto:${content.contactInfo.email}`;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: contactFormDefaults,
  });

  const [toastState, setToastState] = useState<ToastState>(defaultToastState);

  const handleContactSubmit = async (values: ContactFormValues) => {
    try {
      logEvent({
        eventType: 'form',
        eventName: 'contact_submit',
        metadata: {
          interestedService: values.interestedService,
          monthlyAdBudget: values.monthlyAdBudget,
          sector: values.sector,
          primaryGoal: values.primaryGoal,
          creatorSupportNeeded: values.creatorSupportNeeded,
        },
      });

      await submitContactForm({
        kind: 'contact',
        name: values.name,
        company: values.company,
        phone: values.phone,
        email: values.email,
        instagram: values.instagram,
        sector: values.sector,
        interestedService: values.interestedService,
        monthlyAdBudget: values.monthlyAdBudget,
        primaryGoal: values.primaryGoal,
        creatorSupportNeeded: values.creatorSupportNeeded,
        message: values.message,
      });

      reset();
      setToastState({
        open: true,
        type: 'success',
        title: 'Başvurunuz alındı',
        message: 'Growth fit değerlendirmesi için en kısa sürede size dönüş yapılacaktır.',
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
      <div className="max-w-3xl space-y-4">
        <span className="inline-flex items-center rounded-full border border-[var(--color-border-strong)] bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
          {editMode ? (
            <input
              value={content.contactSection.badge}
              onChange={(e) => updateContentField('contactSection.badge', e.target.value)}
              className="bg-transparent text-xs outline-none"
            />
          ) : (
            content.contactSection.badge
          )}
        </span>
        <h2
          className="text-3xl leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)] sm:text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {editMode ? (
            <input
              value={content.contactSection.title}
              onChange={(e) => updateContentField('contactSection.title', e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          ) : (
            content.contactSection.title
          )}
        </h2>
        <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base md:text-lg">
          {editMode ? (
            <textarea
              value={content.contactSection.subtitle}
              onChange={(e) => updateContentField('contactSection.subtitle', e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          ) : (
            content.contactSection.subtitle
          )}
        </p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <motion.div
          animate={emphasized ? { scale: [1, 1.01, 1] } : { scale: 1 }}
          transition={{ duration: 0.45 }}
          className="rounded-[30px] border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-6 shadow-[0_24px_60px_rgba(2,8,20,0.4)]"
        >
          <div className="mb-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">
              {editMode ? (
                <input
                  value={content.contactSection.formBadge}
                  onChange={(e) => updateContentField('contactSection.formBadge', e.target.value)}
                  className="bg-transparent outline-none"
                />
              ) : (
                content.contactSection.formBadge
              )}
            </p>
            <p className="mt-3 text-3xl leading-none text-[var(--color-ink)] sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
              {editMode ? (
                <input
                  value={content.contactSection.formTitle}
                  onChange={(e) => updateContentField('contactSection.formTitle', e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              ) : (
                content.contactSection.formTitle
              )}
              <span className="block bg-[linear-gradient(130deg,var(--color-primary),#e8ddc7_56%,var(--color-accent))] bg-clip-text text-transparent">
                {editMode ? (
                  <input
                    value={content.contactSection.formHighlight}
                    onChange={(e) => updateContentField('contactSection.formHighlight', e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                ) : (
                  content.contactSection.formHighlight
                )}
              </span>
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(handleContactSubmit)} noValidate>
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
                {...register('company', { required: 'Marka/Firma bilgisi zorunludur.' })}
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
                placeholder="ornek@marka.com"
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
                label="Instagram"
                placeholder="@markaniz"
                error={errors.instagram?.message}
                autoComplete="off"
                {...register('instagram', { required: 'Instagram hesabı zorunludur.' })}
              />

              <ContactSelectField
                id="sector"
                label="Sektör"
                options={content.contactFormOptions.sectorOptions}
                requiredMessage="Sektör seçimi zorunludur."
                register={register}
                error={errors.sector?.message}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ContactSelectField
                id="interestedService"
                label="İlgilendiğiniz Model / Hizmet"
                options={content.contactFormOptions.serviceOptions}
                requiredMessage="Model/Hizmet seçimi zorunludur."
                register={register}
                error={errors.interestedService?.message}
              />

              <ContactSelectField
                id="monthlyAdBudget"
                label="Aylık Reklam Bütçesi"
                options={content.contactFormOptions.budgetOptions}
                requiredMessage="Bütçe bilgisi zorunludur."
                register={register}
                error={errors.monthlyAdBudget?.message}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <ContactSelectField
                id="primaryGoal"
                label="Birincil Hedef"
                options={content.contactFormOptions.goalOptions}
                requiredMessage="Birincil hedef seçimi zorunludur."
                register={register}
                error={errors.primaryGoal?.message}
              />

              <ContactSelectField
                id="creatorSupportNeeded"
                label="Creator Desteği Gerekli mi?"
                options={content.contactFormOptions.creatorSupportOptions}
                requiredMessage="Creator desteği seçimi zorunludur."
                register={register}
                error={errors.creatorSupportNeeded?.message}
              />
            </div>

            <Textarea
              id="message"
              label="Proje Detayları"
              placeholder="Hedefinizi, mevcut durumunuzu ve beklentinizi kısa ve net şekilde paylaşın."
              error={errors.message?.message}
              autoComplete="off"
              {...register('message', {
                required: 'Proje detayı zorunludur.',
                minLength: {
                  value: 10,
                  message: 'Mesajınız en az 10 karakter olmalı.',
                },
              })}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Gönderiliyor...' : content.cta.primary}
            </Button>
          </form>
        </motion.div>

        <div className="space-y-5 rounded-[30px] border border-[var(--color-border)] bg-[linear-gradient(180deg,#0d1725,#09111d)] p-5 sm:p-6 text-white shadow-[0_28px_70px_rgba(1,6,16,0.5)]">
          <div className="rounded-[24px] border border-white/10 bg-white/6 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/56">
              {editMode ? (
                <input
                  value={content.contactSection.directBadge}
                  onChange={(e) => updateContentField('contactSection.directBadge', e.target.value)}
                  className="bg-transparent outline-none"
                />
              ) : (
                content.contactSection.directBadge
              )}
            </p>
            <h3 className="mt-3 text-3xl leading-none text-white sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
              {editMode ? (
                <input
                  value={content.contactSection.directTitle}
                  onChange={(e) => updateContentField('contactSection.directTitle', e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              ) : (
                content.contactSection.directTitle
              )}
              <span className="block text-white/72">
                {editMode ? (
                  <input
                    value={content.contactSection.directSubtitle}
                    onChange={(e) => updateContentField('contactSection.directSubtitle', e.target.value)}
                    className="w-full bg-transparent outline-none"
                  />
                ) : (
                  content.contactSection.directSubtitle
                )}
              </span>
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-white/78">
              <li className="flex items-start gap-3">
                <Phone size={17} className="mt-0.5 text-[var(--color-primary)]" />
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="transition hover:text-white">
                  {content.contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={17} className="mt-0.5 text-[var(--color-primary)]" />
                <a href={mailtoHref} className="transition hover:text-white">
                  {content.contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Instagram size={17} className="mt-0.5 text-[var(--color-primary)]" />
                <a href={content.contactInfo.instagramUrl} target="_blank" rel="noreferrer" className="transition hover:text-white">
                  {content.contactInfo.instagramHandle}
                </a>
              </li>
            </ul>
          </div>

          <Button href={whatsappHref} target="_blank" rel="noreferrer" variant="secondary" className="w-full">
            <MessageCircle size={16} /> {content.cta.secondary}
          </Button>

          <a
            href={content.contactInfo.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border border-[var(--color-border)] bg-white/6 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Instagram size={16} />
            Instagram'da bağlan
          </a>

          <div className="grid gap-3">
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-4 text-sm text-white/72">
              Çalışma odağı
              <span className="mt-2 block text-base font-semibold text-white">Talep kalitesi ve kapanış potansiyeli</span>
            </div>
            <div className="rounded-[22px] border border-white/10 bg-white/6 p-4 text-sm text-white/72">
              Teslim biçimi
              <span className="mt-2 block text-base font-semibold text-white">Dijital, planlı ve operasyon odaklı yönetim</span>
            </div>
          </div>
        </div>
      </div>

      {editMode && (
        <button
          onClick={saveContent}
          className="mt-6 rounded bg-green-600 px-4 py-2 text-sm text-white"
        >
          Kaydet
        </button>
      )}
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
