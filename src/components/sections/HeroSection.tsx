import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { contactInfo, stats } from '../../data/siteData';
import { BrandMark } from '../brand/BrandMark';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

type HeroSectionProps = {
  onNavigate: (id: string) => void;
  onOpenLeadModal: () => void;
};

const heroServices = ['Web Site Tasarımı', 'Meta Ads', 'Sosyal Medya Reklamcılığı', 'Landing Page', 'Kreatif Sistem'];

export function HeroSection({ onNavigate, onOpenLeadModal }: HeroSectionProps) {
  return (
    <SectionContainer id="hero" className="pt-28 sm:pt-32 md:pt-40">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.45 }}
            className="space-y-8"
          >
            <Badge className="border-[var(--color-border-strong)] bg-white/8 text-[var(--color-primary)]">
              Dijital büyümenin yeni adresi
            </Badge>

            <div className="space-y-5">
              <h1
                className="max-w-4xl text-4xl leading-[0.94] tracking-[-0.04em] text-[var(--color-ink)] sm:text-5xl md:text-6xl lg:text-7xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Premium görünüm, net mesaj ve
                <span className="block bg-[linear-gradient(135deg,var(--color-primary),#d7d5ff_54%,var(--color-accent))] bg-clip-text text-transparent">
                  daha fazla talep üreten sistemler
                </span>
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-base md:text-lg md:leading-8">
                Lunara Medya; hizmet ve premium algı odaklı markalar için web sitesi, landing page, Meta Ads ve
                kreatif sistemleri tek çatı altında kurar. Amaç yalnızca şık görünmek değil; daha güçlü güven, daha
                net başvuru ve daha yüksek dönüşümdür.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={() => onOpenLeadModal()}>
                Ücretsiz Ön Analiz Al <ArrowRight size={18} />
              </Button>
              <Button
                href={`https://wa.me/${contactInfo.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                size="lg"
                variant="secondary"
              >
                <MessageCircle size={18} /> WhatsApp'tan Yaz
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:max-w-3xl lg:grid-cols-5">
              {stats.map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-[var(--color-border)] bg-white/6 px-4 py-4 text-sm font-semibold text-[var(--color-ink)] shadow-[0_18px_40px_rgba(4,9,20,0.32)] backdrop-blur-xl"
                >
                  {item}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)] transition hover:text-white"
            >
              <Sparkles size={16} /> Hizmet katmanlarını keşfet
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="relative min-h-[520px] sm:min-h-[620px] lg:min-h-[640px]"
        >
          <div className="absolute left-1/2 top-14 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(111,201,255,0.28),_transparent_58%)] blur-2xl sm:top-10 sm:h-[420px] sm:w-[420px] lg:h-[470px] lg:w-[470px]" />
          <div className="absolute right-2 top-4 hidden h-20 w-20 rounded-full border border-[var(--color-border)] bg-white/4 backdrop-blur-xl sm:block lg:right-4 lg:top-6 lg:h-28 lg:w-28" />
          <div className="absolute bottom-8 left-4 hidden h-16 w-16 rounded-full border border-[var(--color-border)] bg-white/4 backdrop-blur-xl sm:block lg:bottom-10 lg:left-8 lg:h-20 lg:w-20" />

          <div className="relative mx-auto flex h-[500px] w-full max-w-[700px] items-center justify-center overflow-visible rounded-[32px] border border-[var(--color-border)] bg-[linear-gradient(180deg,rgba(10,17,33,0.9),rgba(7,12,24,0.76))] shadow-[0_30px_90px_rgba(2,8,20,0.56)] sm:h-[620px] sm:rounded-[42px] lg:h-[650px] lg:rounded-[48px]">
            <div className="absolute inset-6 rounded-full border border-[rgba(143,134,255,0.24)] sm:inset-8 lg:inset-10" />
            <div className="absolute inset-[56px] rounded-full border border-[rgba(143,238,255,0.18)] sm:inset-[78px] lg:inset-[88px]" />
            <div className="absolute h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,_rgba(143,238,255,0.24),_transparent_62%)] sm:h-[300px] sm:w-[300px] lg:h-[340px] lg:w-[340px]" />
            <img
              src="/lunara-logo.jpg"
              alt="Lunara Medya logo"
              className="relative z-10 h-[200px] w-[200px] rounded-full object-cover shadow-[0_0_70px_rgba(120,203,255,0.24)] sm:h-[280px] sm:w-[280px] md:h-[300px] md:w-[300px] lg:h-[320px] lg:w-[320px]"
              loading="eager"
            />

            <div className="absolute left-4 top-4 max-w-[calc(100%-2rem)] rounded-[20px] border border-[var(--color-border)] bg-[rgba(8,16,30,0.84)] px-3 py-3 backdrop-blur-xl sm:left-6 sm:top-6 sm:max-w-none sm:rounded-[24px] sm:px-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]">Brand</p>
              <BrandMark brand="lunara" compact />
            </div>

            <div className="absolute bottom-4 left-4 right-4 z-20 rounded-[20px] border border-[var(--color-border)] bg-[rgba(8,16,30,0.96)] p-4 backdrop-blur-xl sm:bottom-6 sm:left-auto sm:right-6 sm:w-[220px] sm:rounded-[24px] md:right-2 lg:-right-12 lg:bottom-14 lg:w-[220px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]">
                Core Services
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {heroServices.map((service) => (
                  <span
                    key={service}
                    className="rounded-full border border-[var(--color-border)] bg-white/6 px-3 py-1.5 text-xs text-[var(--color-ink)]"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
