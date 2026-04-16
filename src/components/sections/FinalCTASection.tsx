import { ArrowRight, MessageCircle } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

type FinalCTASectionProps = {
  onOpenLeadModal: () => void;
};

export function FinalCTASection({ onOpenLeadModal }: FinalCTASectionProps) {
  const { content } = useSiteContent();

  return (
    <SectionContainer id="final-cta" className="scroll-mt-24 pt-6 md:pt-8">
      <div className="rounded-[34px] border border-[var(--color-border)] bg-[linear-gradient(130deg,rgba(17,30,44,0.95),rgba(10,16,26,0.95))] p-6 shadow-[0_34px_90px_rgba(1,6,16,0.45)] sm:p-8 md:p-10">
        <Badge className="border-[var(--color-border-strong)] bg-white/8 text-[var(--color-primary)]">
          {content.finalCtaSection.badge}
        </Badge>

        <h2
          className="mt-4 max-w-4xl text-3xl leading-[0.95] tracking-[-0.03em] text-[var(--color-ink)] sm:text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {content.finalCtaSection.title}
        </h2>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">{content.finalCtaSection.subtitle}</p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" onClick={onOpenLeadModal}>
            {content.cta.primary} <ArrowRight size={18} />
          </Button>
          <Button
            size="lg"
            variant="secondary"
            href={`https://wa.me/${content.contactInfo.whatsapp}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} /> {content.cta.secondary}
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
