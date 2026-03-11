import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { faqs } from '../../data/siteData';
import { cn } from '../../utils/cn';
import { SectionContainer } from '../layout/SectionContainer';
import { SectionTitle } from '../ui/SectionTitle';

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <SectionContainer>
      <SectionTitle
        badge={<span className="inline-flex items-center rounded-full border border-[var(--color-border-strong)] bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">FAQ</span>}
        title="Sık sorulanlar"
        subtitle="Karar vermeden once ihtiyac duyulan temel basliklari burada netlestirdik."
      />

      <div className="mt-8 space-y-3">
        {faqs.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div key={item.id} className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_14px_34px_rgba(17,24,34,0.04)]">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-${item.id}`}
              >
                <span
                  className="text-xl leading-none text-[var(--color-ink)] sm:text-2xl md:text-[2rem]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {item.question}
                </span>
                <ChevronDown
                  size={18}
                  className={cn('shrink-0 text-[var(--color-muted)] transition', isOpen && 'rotate-180')}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={`faq-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                  >
                    <p className="border-t border-[var(--color-border)] px-5 py-5 text-sm leading-7 text-[var(--color-muted)]">
                      {item.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
