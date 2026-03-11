import { CheckCircle2 } from 'lucide-react';
import { pricingPlans } from '../../data/siteData';
import { cn } from '../../utils/cn';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { SectionTitle } from '../ui/SectionTitle';

type PackagesSectionProps = {
  onOpenLeadModal: () => void;
};

export function PackagesSection({ onOpenLeadModal }: PackagesSectionProps) {
  return (
    <SectionContainer id="packages" className="scroll-mt-24">
      <SectionTitle
        badge={<Badge>Çalışma Modelleri</Badge>}
        title="İhtiyaca göre ölçeklenen paketler"
        subtitle="Bazı markalar için güçlü bir başlangıç yeterlidir, bazıları ise web ve reklam sistemini birlikte kurmak ister. Paketleri buna göre şekillendiriyoruz."
      />

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <article
            key={plan.id}
            className={cn(
              'relative rounded-[28px] border bg-[var(--color-surface)] p-5 sm:p-6 shadow-[0_24px_60px_rgba(2,8,20,0.42)] transition hover:-translate-y-1 hover:shadow-[0_30px_72px_rgba(2,8,20,0.52)]',
              plan.recommended
                ? 'border-transparent bg-[linear-gradient(rgba(9,17,34,0.96),rgba(9,17,34,0.96))_padding-box,linear-gradient(120deg,var(--color-primary),var(--color-accent))_border-box] border-2'
                : 'border-[var(--color-border)]',
            )}
          >
            {plan.recommended ? (
              <Badge className="mb-4 border-[var(--color-border-strong)] bg-white/8 text-[var(--color-primary)]">
                Önerilen Paket
              </Badge>
            ) : null}
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]">
              {plan.priceLabel ?? 'Süreç'}
            </p>
            <h3
              className="mt-4 text-3xl leading-none text-[var(--color-ink)] sm:text-4xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {plan.name}
            </h3>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-primary-strong)]">
              {plan.priceTRY}
            </p>
            <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{plan.description}</p>

            <ul className="mt-5 space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm leading-6 text-[var(--color-ink)]">
                  <CheckCircle2 size={16} className="mt-0.5 text-emerald-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="mt-6 w-full" variant={plan.recommended ? 'primary' : 'outline'} onClick={onOpenLeadModal}>
              Teklif Al
            </Button>
          </article>
        ))}
      </div>

      <p className="mt-5 text-xs text-[var(--color-muted)]">
        Paketler başlangıç çerçevesidir. Nihai kapsam; marka yapısı, sayfa yoğunluğu ve reklam ihtiyacına göre netleşir.
      </p>
    </SectionContainer>
  );
}
