import { AlertTriangle } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export function ProblemSection() {
  const { content } = useSiteContent();

  return (
    <SectionContainer id="problem" className="scroll-mt-24 pt-8 md:pt-10">
      <div className="max-w-3xl space-y-4">
        <Badge>{content.problemSection.badge}</Badge>
        <h2
          className="text-3xl leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)] sm:text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {content.problemSection.title}
        </h2>
        <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base md:text-lg">{content.problemSection.subtitle}</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {content.problemItems.map((item) => (
          <Card key={item.id} className="h-full border-[var(--color-border)] bg-[var(--color-surface-strong)]">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-white/5 text-[var(--color-primary)]">
              <AlertTriangle size={17} />
            </div>
            <h3 className="text-2xl leading-tight text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{item.description}</p>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-primary-strong)]">
        {content.problemSection.cta}
      </p>
    </SectionContainer>
  );
}
