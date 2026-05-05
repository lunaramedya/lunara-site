import { motion } from 'framer-motion';
import { useSiteContent } from '../../context/SiteContentContext';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export function CaseStudiesSection() {
  const { content, editMode, updateContentField, saveContent } = useSiteContent();

  return (
    <SectionContainer id="cases" className="scroll-mt-24">
      <div className="max-w-3xl space-y-4">
        <Badge>
          {editMode ? (
            <input
              value={content.casesSection.badge}
              onChange={(e) => updateContentField('casesSection.badge', e.target.value)}
              className="bg-transparent text-sm outline-none"
            />
          ) : (
            content.casesSection.badge
          )}
        </Badge>
        <h2
          className="text-3xl leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)] sm:text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {editMode ? (
            <input
              value={content.casesSection.title}
              onChange={(e) => updateContentField('casesSection.title', e.target.value)}
              className="w-full bg-transparent text-3xl outline-none"
            />
          ) : (
            content.casesSection.title
          )}
        </h2>
        <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base md:text-lg">
          {editMode ? (
            <textarea
              value={content.casesSection.subtitle}
              onChange={(e) => updateContentField('casesSection.subtitle', e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          ) : (
            content.casesSection.subtitle
          )}
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {content.caseStudies.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.34, delay: index * 0.08 }}
          >
            <Card className="h-full border-[var(--color-border)] bg-[var(--color-surface)]">
              <div className="flex items-center justify-between gap-3">
                <Badge className="border-[var(--color-border-strong)] bg-white/7 text-[var(--color-ink)]">
                  {editMode ? (
                    <input
                      value={item.category}
                      onChange={(e) => updateContentField(`caseStudies.${index}.category`, e.target.value)}
                      className="bg-transparent outline-none"
                    />
                  ) : (
                    item.category
                  )}
                </Badge>
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--color-primary-strong)]">Case Study</span>
              </div>

              {editMode ? (
                <div className="mt-5 flex h-[180px] items-center justify-center rounded-[22px] border border-[var(--color-border)] bg-white/4 p-5 sm:h-[220px]">
                  <input
                    value={item.image || ''}
                    onChange={(e) => updateContentField(`caseStudies.${index}.image`, e.target.value)}
                    placeholder="Image URL"
                    className="w-full bg-transparent text-xs outline-none"
                  />
                </div>
              ) : (
                item.image ? (
                  <div className="mt-5 flex h-[180px] items-center justify-center rounded-[22px] border border-[var(--color-border)] bg-white/4 p-5 sm:h-[220px]">
                    <img src={item.image} alt={item.title} className="h-full w-full object-contain" loading="lazy" decoding="async" />
                  </div>
                ) : null
              )}

              <h3 className="mt-5 text-3xl leading-none text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>
                {editMode ? (
                  <input
                    value={item.title}
                    onChange={(e) => updateContentField(`caseStudies.${index}.title`, e.target.value)}
                    className="w-full bg-transparent text-3xl outline-none"
                  />
                ) : (
                  item.title
                )}
              </h3>

              <div className="mt-5 space-y-3">
                <div className="rounded-[18px] border border-[var(--color-border)] bg-white/5 px-4 py-3 text-sm leading-6 text-[var(--color-muted)]">
                  <strong className="text-[var(--color-ink)]">Challenge:</strong>{' '}
                  {editMode ? (
                    <textarea
                      value={item.challenge}
                      onChange={(e) => updateContentField(`caseStudies.${index}.challenge`, e.target.value)}
                      className="w-full bg-transparent outline-none"
                    />
                  ) : (
                    item.challenge
                  )}
                </div>
                <div className="rounded-[18px] border border-[var(--color-border)] bg-white/5 px-4 py-3 text-sm leading-6 text-[var(--color-muted)]">
                  <strong className="text-[var(--color-ink)]">Ne Değişti:</strong>{' '}
                  {editMode ? (
                    <textarea
                      value={item.changed}
                      onChange={(e) => updateContentField(`caseStudies.${index}.changed`, e.target.value)}
                      className="w-full bg-transparent outline-none"
                    />
                  ) : (
                    item.changed
                  )}
                </div>
                <div className="rounded-[18px] border border-[var(--color-border)] bg-white/5 px-4 py-3 text-sm leading-6 text-[var(--color-muted)]">
                  <strong className="text-[var(--color-ink)]">Etkisi:</strong>{' '}
                  {editMode ? (
                    <textarea
                      value={item.impact}
                      onChange={(e) => updateContentField(`caseStudies.${index}.impact`, e.target.value)}
                      className="w-full bg-transparent outline-none"
                    />
                  ) : (
                    item.impact
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
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
