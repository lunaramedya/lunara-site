import { motion } from 'framer-motion';
import { agencySignals } from '../../data/siteData';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { SectionTitle } from '../ui/SectionTitle';

const targetSegments = [
  'Güzellik salonları ve butik beauty markaları',
  'Premium algı kurmak isteyen hizmet işletmeleri',
  'Reklam trafiğini boşa harcamak istemeyen markalar',
  'WhatsApp ve formdan daha net talep akışı arayan ekipler',
  'Dijitalde daha güvenilir ve daha otoriter görünmek isteyen işletmeler',
];

export function SocialProofSection() {
  return (
    <SectionContainer className="pt-10 md:pt-14">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div className="space-y-6">
          <SectionTitle
            badge={<Badge>Neden Lunara</Badge>}
            title="Sadece tasarım değil, sonuç üreten kurgu"
            subtitle="Web, reklam ve kreatif katmanını tek bir sistemde birleştirerek markanızın güven algısını yükseltir, talep kararını hızlandırırız."
          />

          <div className="rounded-[30px] border border-[var(--color-border)] bg-[linear-gradient(135deg,rgba(13,24,48,0.94),rgba(8,13,24,0.86))] p-6 shadow-[0_24px_60px_rgba(2,8,20,0.42)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">
              Growth Standard
            </p>
            <p
              className="mt-4 text-4xl leading-none text-[var(--color-ink)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Güven veren görünüm,
              <span className="block bg-[linear-gradient(135deg,var(--color-primary),#d7d5ff_50%,var(--color-accent))] bg-clip-text text-transparent">
                daha net başvuru akışı.
              </span>
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {agencySignals.map((signal, index) => (
            <motion.div
              key={signal.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
            >
              <Card className="h-full">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]">
                  0{index + 1}
                </p>
                <h3
                  className="mt-4 text-3xl leading-none text-[var(--color-ink)]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {signal.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{signal.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-[30px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_24px_60px_rgba(2,8,20,0.36)]">
        <h3
          className="text-3xl leading-none text-[var(--color-ink)] sm:text-4xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Kimler için doğru partneriz?
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-muted)]">
          Her marka için değil, dijitalde premium algı ve düzenli talep akışı hedefleyen işletmeler için en verimli modeli kuruyoruz.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {targetSegments.map((segment) => (
            <div
              key={segment}
              className="rounded-[20px] border border-[var(--color-border)] bg-white/6 px-4 py-4 text-sm leading-6 text-[var(--color-ink)]"
            >
              {segment}
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
