import { CheckCircle2 } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import type { PricingPlan } from '../../types/site';
import { cn } from '../../utils/cn';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

type PackagesSectionProps = {
  onOpenLeadModal: (plan: PricingPlan, source?: 'package_card') => void;
};

export function PackagesSection({ onOpenLeadModal }: PackagesSectionProps) {
  const { content } = useSiteContent();

  return (
    <SectionContainer id="packages" className="scroll-mt-24">
      <div className="max-w-3xl space-y-4">
        <Badge>{content.packagesSection.badge}</Badge>
        <h2
          className="text-3xl leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)] sm:text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {content.packagesSection.title}
        </h2>
        <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base md:text-lg">{content.packagesSection.subtitle}</p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {content.pricingPlans.map((plan) => (
          <article
            key={plan.id}
            className={cn(
              'relative rounded-[28px] border bg-[var(--color-surface)] p-5 sm:p-6 shadow-[0_24px_60px_rgba(2,8,20,0.42)] transition hover:-translate-y-1 hover:shadow-[0_30px_72px_rgba(2,8,20,0.52)]',
              plan.recommended
                ? 'border-transparent bg-[linear-gradient(rgba(10,18,30,0.97),rgba(10,18,30,0.97))_padding-box,linear-gradient(120deg,var(--color-primary),var(--color-accent))_border-box] border-2'
                : 'border-[var(--color-border)]',
            )}
          >
            <Badge className={plan.recommended ? 'mb-4 border-[var(--color-border-strong)] bg-white/8 text-[var(--color-primary)]' : 'mb-4'}>
              {plan.badge ?? 'Çalışma Modeli'}
            </Badge>

            <h3 className="mt-2 text-3xl leading-none text-[var(--color-ink)] sm:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
              {plan.name}
            </h3>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-strong)]">{plan.priceTRY}</p>

            <div className="mt-5 space-y-3 text-sm leading-7">
              <p className="text-[var(--color-muted)]">
                <span className="font-semibold text-[var(--color-ink)]">Doğru müşteri:</span> {plan.bestFor}
              </p>
              <p className="text-[var(--color-muted)]">{plan.description}</p>
              <p className="text-[var(--color-muted)]">
                <span className="font-semibold text-[var(--color-ink)]">Odak sonuç:</span> {plan.outcome}
              </p>
            </div>

            <ul className="mt-5 space-y-2">
              {plan.includes.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm leading-6 text-[var(--color-ink)]">
                  <CheckCircle2 size={16} className="mt-0.5 text-emerald-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              className="mt-6 w-full"
              variant={plan.recommended ? 'primary' : 'outline'}
              onClick={() => onOpenLeadModal(plan, 'package_card')}
            >
              {content.cta.primary}
            </Button>
          </article>
        ))}
      </div>

      <p className="mt-5 text-xs text-[var(--color-muted)]">{content.packagesSection.footnote}</p>
    </SectionContainer>
  );
}
