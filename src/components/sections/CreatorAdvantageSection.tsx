import { useSiteContent } from '../../context/SiteContentContext';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export function CreatorAdvantageSection() {
  const { content } = useSiteContent();

  return (
    <SectionContainer id="creator" className="scroll-mt-24 bg-[linear-gradient(180deg,#0a121f,#070d18)]">
      <div className="max-w-3xl space-y-4">
        <Badge className="border-white/20 bg-white/10 text-white/80">{content.creatorSection.badge}</Badge>
        <h2
          className="text-3xl leading-[0.95] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {content.creatorSection.title}
        </h2>
        <p className="text-sm leading-7 text-white/70 sm:text-base md:text-lg">{content.creatorSection.subtitle}</p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {content.creatorLayerItems.map((item) => (
          <Card key={item.id} className="h-full border-white/12 bg-white/5">
            <h3 className="text-3xl leading-none text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {item.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/72">{item.description}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 rounded-[28px] border border-white/12 bg-white/6 p-5 text-white/78 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">{content.creatorSection.honestyTitle}</p>
        <p className="mt-3 text-sm leading-7">{content.creatorSection.honestyText}</p>
      </div>

      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)]">{content.creatorSection.cta}</p>
    </SectionContainer>
  );
}
