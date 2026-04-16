import { motion } from 'framer-motion';
import { useSiteContent } from '../../context/SiteContentContext';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export function ServicesSection() {
  const { content } = useSiteContent();

  return (
    <SectionContainer id="stages" className="scroll-mt-24">
      <div className="max-w-3xl space-y-4">
        <Badge>{content.servicesSection.badge}</Badge>
        <h2
          className="text-3xl leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)] sm:text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {content.servicesSection.title}
        </h2>
        <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base md:text-lg">{content.servicesSection.subtitle}</p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {content.growthStages.map((stage, index) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.34, delay: index * 0.08 }}
          >
            <Card className="h-full border-[var(--color-border)] bg-[var(--color-surface-strong)]">
              <h3
                className="text-3xl leading-none text-[var(--color-ink)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {stage.title}
              </h3>

              <div className="mt-5 space-y-4 text-sm leading-7">
                <p className="text-[var(--color-muted)]">
                  <span className="font-semibold text-[var(--color-ink)]">Kim için:</span> {stage.bestFor}
                </p>
                <p className="text-[var(--color-muted)]">
                  <span className="font-semibold text-[var(--color-ink)]">Ne kurulur:</span> {stage.build}
                </p>
                <p className="text-[var(--color-muted)]">
                  <span className="font-semibold text-[var(--color-ink)]">Sonuç odağı:</span> {stage.outcome}
                </p>
              </div>

              <ul className="mt-5 space-y-2">
                {stage.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-[var(--color-ink)]">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-primary-strong)]">
        {content.servicesSection.cta}
      </p>
    </SectionContainer>
  );
}
