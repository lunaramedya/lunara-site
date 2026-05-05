import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSiteContent } from '../../context/SiteContentContext';
import { cn } from '../../utils/cn';
import { SectionContainer } from '../layout/SectionContainer';
import { SectionTitle } from '../ui/SectionTitle';

export function FAQSection() {
  const { content, editMode, updateContentField, saveContent } = useSiteContent();
  const [openId, setOpenId] = useState<string | null>(content.faqs[0]?.id ?? null);

  useEffect(() => {
    if (!openId && content.faqs[0]?.id) {
      setOpenId(content.faqs[0].id);
    }
  }, [content.faqs, openId]);

  return (
    <SectionContainer id="faq" className="scroll-mt-24">
      <SectionTitle
        badge={
          <span className="inline-flex items-center rounded-full border border-[var(--color-border-strong)] bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {editMode ? (
              <input
                value={content.faqSection.badge}
                onChange={(e) => updateContentField('faqSection.badge', e.target.value)}
                className="bg-transparent text-xs outline-none"
              />
            ) : (
              content.faqSection.badge
            )}
          </span>
        }
        title={content.faqSection.title}
        subtitle={content.faqSection.subtitle}
      />
      {editMode && (
        <div className="mt-4 space-y-2">
          <input
            value={content.faqSection.title}
            onChange={(e) => updateContentField('faqSection.title', e.target.value)}
            className="w-full rounded border px-3 py-2"
            placeholder="Başlık"
          />
          <textarea
            value={content.faqSection.subtitle}
            onChange={(e) => updateContentField('faqSection.subtitle', e.target.value)}
            className="w-full rounded border px-3 py-2"
            placeholder="Alt açıklama"
          />
        </div>
      )}

      <div className="mt-8 space-y-3">
        {content.faqs.map((item) => {
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
                  {editMode ? (
                    <input
                      value={item.question}
                      onChange={(e) => updateContentField(`faqs.${content.faqs.indexOf(item)}.question`, e.target.value)}
                      className="w-full bg-transparent text-xl outline-none"
                    />
                  ) : (
                    item.question
                  )}
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
                      {editMode ? (
                        <textarea
                          value={item.answer}
                          onChange={(e) => updateContentField(`faqs.${content.faqs.indexOf(item)}.answer`, e.target.value)}
                          className="w-full bg-transparent outline-none"
                        />
                      ) : (
                        item.answer
                      )}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      {editMode && (
        <button
          onClick={saveContent}
          className="mt-6 rounded bg-green-600 px-4 py-2 text-sm text-white"
        >
          Kaydet
        </button>
      )}
    </SectionContainer>
  );
}
