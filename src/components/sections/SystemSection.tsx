import { motion } from 'framer-motion';
import { useSiteContent } from '../../context/SiteContentContext';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export function SystemSection() {
  const { content } = useSiteContent();

  return (
    <SectionContainer id="system" className="scroll-mt-24">
      <div className="max-w-3xl space-y-4">
        <Badge>{content.systemSection.badge}</Badge>
        <h2
          className="text-3xl leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)] sm:text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {content.systemSection.title}
        </h2>
        <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base md:text-lg">{content.systemSection.subtitle}</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {content.systemSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.32, delay: index * 0.06 }}
          >
            <Card className="h-full border-[var(--color-border)] bg-[var(--color-surface)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-primary-strong)]">0{index + 1}</p>
              <h3
                className="mt-4 text-3xl leading-none text-[var(--color-ink)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{step.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-primary-strong)]">
        {content.systemSection.cta}
      </p>
    </SectionContainer>
  );
}
