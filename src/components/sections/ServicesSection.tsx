import { motion } from 'framer-motion';
import {
  Megaphone,
  MessagesSquare,
  MonitorSmartphone,
  Palette,
  Search,
  Workflow,
} from 'lucide-react';
import { memo } from 'react';
import { serviceCategories } from '../../data/siteData';
import type { ServiceItem } from '../../types/site';
import { SectionContainer } from '../layout/SectionContainer';
import { Card } from '../ui/Card';
import { SectionTitle } from '../ui/SectionTitle';

const iconMap = {
  megaphone: Megaphone,
  search: Search,
  palette: Palette,
  'messages-square': MessagesSquare,
  'monitor-smartphone': MonitorSmartphone,
  workflow: Workflow,
} as const;

type ServiceCardProps = {
  item: ServiceItem;
};

const ServiceCard = memo(function ServiceCard({ item }: ServiceCardProps) {
  const Icon = iconMap[item.icon as keyof typeof iconMap] ?? Megaphone;

  return (
    <Card className="h-full transition hover:-translate-y-1 hover:border-[var(--color-primary)]/40 hover:shadow-[0_30px_70px_rgba(2,8,20,0.46)]">
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))] text-[#06101f] shadow-[0_18px_36px_rgba(111,134,255,0.3)]">
        <Icon size={20} />
      </div>
      <h3
        className="text-3xl leading-none text-[var(--color-ink)]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {item.title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{item.description}</p>
      <ul className="mt-5 space-y-2">
        {item.benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2 text-sm leading-6 text-[var(--color-ink)]">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
});

export function ServicesSection() {
  return (
    <SectionContainer id="services" className="scroll-mt-24">
      <SectionTitle
        title="Markanızı büyüten hizmet katmanları"
        subtitle="Web tasarımı, reklam yönetimi ve kreatif yön tek başına değil, birbirini besleyen tek bir büyüme sistemi olarak çalıştığında gerçek etki ortaya çıkar."
      />

      <div className="mt-10 space-y-10 sm:mt-12 sm:space-y-12">
        {serviceCategories.map((category, groupIndex) => (
          <div key={category.id}>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px flex-1 bg-[var(--color-border-strong)]" />
              <h3 className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)] sm:text-sm sm:tracking-[0.28em]">
                {category.title}
              </h3>
              <span className="h-px flex-1 bg-[var(--color-border-strong)]" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ y: 18, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.32, delay: groupIndex * 0.1 + index * 0.06 }}
                >
                  <ServiceCard item={item} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
