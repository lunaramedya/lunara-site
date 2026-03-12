import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { PricingPlan } from './types/site';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { CaseStudiesSection } from './components/sections/CaseStudiesSection';
import { ContactSection } from './components/sections/ContactSection';
import { FAQSection } from './components/sections/FAQSection';
import { FloatingWhatsApp } from './components/sections/FloatingWhatsApp';
import { HeroSection } from './components/sections/HeroSection';
import { PackagesSection } from './components/sections/PackagesSection';
import { ProcessSection } from './components/sections/ProcessSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { SocialProofSection } from './components/sections/SocialProofSection';
import { Button } from './components/ui/Button';
import { Input } from './components/ui/Input';
import { Modal } from './components/ui/Modal';
import { Toast } from './components/ui/Toast';
import { useActiveSection } from './hooks/useActiveSection';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { submitContactForm } from './utils/contactApi';

type LeadFormValues = {
  name: string;
  phone: string;
  service: string;
};

const defaultLeadServiceOptions = [
  'Web Site Tasarımı',
  'Landing Page & Funnel',
  'Meta Ads Yönetimi',
  'Sosyal Medya Reklamcılığı',
  'Tam Kapsam Çalışma',
];

const planScopedServiceOptions: Record<string, string[]> = {
  starter: ['Web Site Tasarımı', 'Landing Page & Funnel', 'Meta Ads Yönetimi'],
  growth: ['Web Site Tasarımı', 'Landing Page & Funnel', 'Meta Ads Yönetimi', 'Sosyal Medya Reklamcılığı'],
  signature: [
    'Web Site Tasarımı',
    'Landing Page & Funnel',
    'Meta Ads Yönetimi',
    'Sosyal Medya Reklamcılığı',
    'Tam Kapsam Çalışma',
  ],
};

const observedSections = ['hero', 'services', 'cases', 'packages', 'process', 'faq', 'contact'];

function App() {
  const [isLeadModalOpen, setLeadModalOpen] = useState(false);
  const [contactEmphasized, setContactEmphasized] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [leadSource, setLeadSource] = useState<'package_card' | 'generic_cta'>('generic_cta');
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

  const activeSection = useActiveSection(observedSections);
  const scrollTo = useSmoothScroll(86);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    defaultValues: {
      name: '',
      phone: '',
      service: '',
    },
  });

  const navigateTo = useCallback(
    (id: string) => {
      scrollTo(id);

      if (id === 'contact') {
        setContactEmphasized(true);
      }
    },
    [scrollTo],
  );

  const openLeadModal = useCallback((plan?: PricingPlan | null, source: 'package_card' | 'generic_cta' = 'generic_cta') => {
    const options = plan ? (planScopedServiceOptions[plan.id] ?? defaultLeadServiceOptions) : defaultLeadServiceOptions;

    setSelectedPlan(plan ?? null);
    setLeadSource(source);
    reset({
      name: '',
      phone: '',
      service: options[0] ?? '',
    });
    setLeadModalOpen(true);
  }, [reset]);

  useEffect(() => {
    if (!contactEmphasized) {
      return;
    }

    const timeout = setTimeout(() => setContactEmphasized(false), 1400);
    return () => clearTimeout(timeout);
  }, [contactEmphasized]);

  const handleLeadSubmit = async (values: LeadFormValues) => {
    try {
      await submitContactForm({
        kind: 'lead',
        name: values.name,
        phone: values.phone,
        service: values.service,
        planId: selectedPlan?.id,
        planName: selectedPlan?.name,
        planPrice: selectedPlan?.priceTRY,
        source: leadSource,
      });
      reset();
      setSelectedPlan(null);
      setLeadSource('generic_cta');
      setLeadModalOpen(false);
      setToastState({
        open: true,
        type: 'success',
        title: 'Talebiniz alındı',
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

  const activeLeadServiceOptions = selectedPlan
    ? (planScopedServiceOptions[selectedPlan.id] ?? defaultLeadServiceOptions)
    : defaultLeadServiceOptions;

  return (
    <div className="relative overflow-x-clip bg-[var(--color-bg)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[760px] bg-[radial-gradient(circle_at_15%_0%,rgba(143,238,255,0.2),transparent_30%),radial-gradient(circle_at_85%_8%,rgba(143,134,255,0.18),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-[22rem] -z-10 h-[920px] bg-[radial-gradient(circle_at_78%_22%,rgba(143,238,255,0.12),transparent_24%),radial-gradient(circle_at_18%_12%,rgba(143,134,255,0.12),transparent_22%)]" />

      <Navbar
        activeSection={activeSection}
        onNavigate={navigateTo}
        onOpenLeadModal={openLeadModal}
      />

      <main>
        <HeroSection onNavigate={navigateTo} onOpenLeadModal={openLeadModal} />
        <SocialProofSection />
        <ServicesSection />
        <CaseStudiesSection />
        <PackagesSection onOpenLeadModal={openLeadModal} />
        <ProcessSection />
        <FAQSection />
        <ContactSection emphasized={contactEmphasized} />
      </main>

      <Footer onNavigate={navigateTo} />
      <FloatingWhatsApp />

      <Modal
        open={isLeadModalOpen}
        onClose={() => {
          setLeadModalOpen(false);
          setSelectedPlan(null);
          setLeadSource('generic_cta');
          reset();
        }}
        title={selectedPlan ? `${selectedPlan.priceLabel ?? 'Paket'} Teklif Formu` : 'Teklif Formu'}
      >
        <form className="space-y-4" onSubmit={handleSubmit(handleLeadSubmit)} noValidate>
          <Input
            id="lead-name"
            label="Ad Soyad"
            placeholder="Adınız Soyadınız"
            error={errors.name?.message}
            {...register('name', { required: 'Ad soyad zorunludur.' })}
          />

          <Input
            id="lead-phone"
            label="Telefon"
            placeholder="05xx xxx xx xx"
            error={errors.phone?.message}
            {...register('phone', {
              required: 'Telefon zorunludur.',
              minLength: {
                value: 10,
                message: 'Telefon numarası en az 10 karakter olmalı.',
              },
            })}
          />

          {selectedPlan ? (
            <div className="rounded-[22px] border border-[var(--color-border)] bg-white/6 p-4 text-sm text-[var(--color-muted)]">
              <span className="block text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
                Seçilen Paket
              </span>
              <span className="mt-2 block text-lg font-semibold text-[var(--color-ink)]">{selectedPlan.name}</span>
              <span className="mt-1 block text-sm text-[var(--color-primary-strong)]">{selectedPlan.priceTRY}</span>
            </div>
          ) : null}

          <div className="space-y-2">
            <label htmlFor="lead-service" className="block text-sm font-medium text-[var(--color-ink)]">
              {selectedPlan ? 'Bu paket için uygun hizmet' : 'İlgilendiğiniz Hizmet'}
            </label>
            <select
              id="lead-service"
              className="h-12 w-full rounded-[20px] border border-[var(--color-border-strong)] bg-white/6 px-4 text-sm text-[var(--color-ink)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
              {...register('service', { required: 'Hizmet seçimi zorunludur.' })}
            >
              <option value="">Seçiniz</option>
              {activeLeadServiceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.service?.message ? <p className="text-xs text-rose-600">{errors.service.message}</p> : null}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Gönderiliyor...' : 'Teklif Gönder'}
          </Button>
        </form>
      </Modal>

      <Toast
        open={toastState.open}
        type={toastState.type}
        title={toastState.title}
        message={toastState.message}
        onClose={() => setToastState((current) => ({ ...current, open: false }))}
      />
    </div>
  );
}

export default App;
