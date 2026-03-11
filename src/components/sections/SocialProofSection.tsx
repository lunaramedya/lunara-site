import { motion } from 'framer-motion';
import { agencySignals } from '../../data/siteData';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { SectionTitle } from '../ui/SectionTitle';

export function SocialProofSection() {
  return (
    <SectionContainer className="pt-10 md:pt-14">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div className="space-y-6">
          <SectionTitle
            badge={<Badge>Lunara Medya</Badge>}
            title="Dijital büyümenin yeni adresi"
            subtitle="Lunara Medya; premium görünüm, net mesaj ve dönüşüm odaklı büyüme sistemini aynı çatı altında birleştiren yeni nesil bir ajans yapısı sunar."
          />

          <div className="rounded-[30px] border border-[var(--color-border)] bg-[linear-gradient(135deg,rgba(13,24,48,0.94),rgba(8,13,24,0.86))] p-6 shadow-[0_24px_60px_rgba(2,8,20,0.42)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">
              Creative Standard
            </p>
            <p
              className="mt-4 text-4xl leading-none text-[var(--color-ink)]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Şık görünüm,
              <span className="block bg-[linear-gradient(135deg,var(--color-primary),#d7d5ff_50%,var(--color-accent))] bg-clip-text text-transparent">
                güçlü algı, gerçek sonuç.
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
    </SectionContainer>
  );
}
