import { useSiteContent } from '../../context/SiteContentContext';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';

export function SocialProofSection() {
  const { content } = useSiteContent();

  return (
    <SectionContainer className="pt-8">
      <div className="rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
        <Badge>Demand Operating System</Badge>
        <h2
          className="mt-4 text-3xl leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)] sm:text-4xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {content.systemSection.title}
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-muted)]">{content.systemSection.subtitle}</p>
      </div>
    </SectionContainer>
  );
}
