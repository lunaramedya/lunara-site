import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, TrendingUp } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import { logEvent } from '../../utils/logging';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

type HeroSectionProps = {
  onNavigate: (id: string) => void;
  onOpenLeadModal: () => void;
};

export function HeroSection({ onNavigate, onOpenLeadModal }: HeroSectionProps) {
  const { content, editMode, toggleEditMode, updateContentField, saveContent } = useSiteContent();

  return (
    <SectionContainer id="hero" className="pt-28 sm:pt-32 md:pt-36">
      <div className="absolute right-6 top-6 z-50">
        <button
          onClick={toggleEditMode}
          className="rounded-full bg-black/60 px-3 py-1 text-xs text-white"
        >
          {editMode ? 'Edit Kapat' : 'Edit Aç'}
        </button>
      </div>
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.42 }}
          className="space-y-7"
        >
          <Badge className="border-[var(--color-border-strong)] bg-white/8 text-[var(--color-primary)]">
            {editMode ? (
              <input
                value={content.hero.badge}
                onChange={(e) => updateContentField('hero.badge', e.target.value)}
                className="bg-transparent text-sm outline-none"
              />
            ) : (
              content.hero.badge
            )}
          </Badge>

          <div className="space-y-5">
            <h1
              className="max-w-4xl text-4xl leading-[0.92] tracking-[-0.04em] text-[var(--color-ink)] sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {editMode ? (
                <input
                  value={content.hero.title}
                  onChange={(e) => updateContentField('hero.title', e.target.value)}
                  className="w-full bg-transparent text-4xl outline-none"
                />
              ) : (
                content.hero.title
              )}
              <span className="block bg-[linear-gradient(130deg,var(--color-primary),#e8ddc7_58%,var(--color-accent))] bg-clip-text text-transparent">
                {editMode ? (
                  <input
                    value={content.hero.highlight}
                    onChange={(e) => updateContentField('hero.highlight', e.target.value)}
                    className="w-full bg-transparent text-transparent outline-none"
                  />
                ) : (
                  content.hero.highlight
                )}
              </span>
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-base md:text-lg md:leading-8">
              {editMode ? (
                <textarea
                  value={content.hero.subtitle}
                  onChange={(e) => updateContentField('hero.subtitle', e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              ) : (
                content.hero.subtitle
              )}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={onOpenLeadModal}>
              {content.cta.primary} <ArrowRight size={18} />
            </Button>
            <Button
              href={`https://wa.me/${content.contactInfo.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              size="lg"
              variant="secondary"
              onClick={() =>
                logEvent({
                  eventType: 'cta',
                  eventName: 'whatsapp_click',
                  metadata: { location: 'hero' },
                })
              }
            >
              <MessageCircle size={18} /> {content.cta.secondary}
            </Button>
          </div>
          {editMode && (
            <button
              onClick={saveContent}
              className="mt-4 rounded bg-green-600 px-4 py-2 text-sm text-white"
            >
              Kaydet
            </button>
          )}

          <div className="grid gap-3 md:grid-cols-2">
            {content.stats.map((item) => (
              <div
                key={item}
                className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 text-sm font-medium text-[var(--color-ink)]"
              >
                {item}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('system')}
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-primary)] transition hover:text-white"
          >
            <TrendingUp size={16} /> Demand Operating System'i Gör
          </button>
        </motion.div>

        <motion.div
          initial={{ y: 22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.48, delay: 0.12 }}
          className="rounded-[34px] border border-[var(--color-border)] bg-[linear-gradient(170deg,rgba(15,26,38,0.95),rgba(8,14,23,0.95))] p-6 shadow-[0_30px_80px_rgba(2,8,18,0.5)] sm:p-8"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">Operator Snapshot</p>

          <h2
            className="mt-4 text-3xl leading-none text-[var(--color-ink)] sm:text-4xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ajans sunumu değil,
            <span className="mt-2 block text-[var(--color-primary)]">işletilen talep hattı</span>
          </h2>

          <div className="mt-6 space-y-3">
            <div className="rounded-[18px] border border-[var(--color-border)] bg-white/5 px-4 py-4 text-sm text-[var(--color-ink)]">
              Reklam, kreatif ve landing aynı hedefe bağlanır.
            </div>
            <div className="rounded-[18px] border border-[var(--color-border)] bg-white/5 px-4 py-4 text-sm text-[var(--color-ink)]">
              Her kampanya döngüsü, lead kalitesi ve dönüşüm kararına göre optimize edilir.
            </div>
            <div className="rounded-[18px] border border-[var(--color-border)] bg-white/5 px-4 py-4 text-sm text-[var(--color-ink)]">
              Güzel görünüm tek başına hedef değil; ticari etki üreten sistem hedef.
            </div>
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
