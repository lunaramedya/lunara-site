import { motion } from 'framer-motion';
import { useSiteContent } from '../../context/SiteContentContext';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export function ServicesSection() {
  const { content, editMode, updateContentField, saveContent } = useSiteContent();

  return (
    <SectionContainer id="stages" className="scroll-mt-24">
      <div className="max-w-3xl space-y-4">
        <Badge>
          {editMode ? (
            <input
              value={content.servicesSection.badge}
              onChange={(e) => updateContentField('servicesSection.badge', e.target.value)}
              className="bg-transparent text-sm outline-none"
            />
          ) : (
            content.servicesSection.badge
          )}
        </Badge>
        <h2
          className="text-3xl leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)] sm:text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {editMode ? (
            <input
              value={content.servicesSection.title}
              onChange={(e) => updateContentField('servicesSection.title', e.target.value)}
              className="w-full bg-transparent text-3xl outline-none"
            />
          ) : (
            content.servicesSection.title
          )}
        </h2>
        <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base md:text-lg">
          {editMode ? (
            <textarea
              value={content.servicesSection.subtitle}
              onChange={(e) => updateContentField('servicesSection.subtitle', e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          ) : (
            content.servicesSection.subtitle
          )}
        </p>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {content.growthStages.map((stage, index) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.34, delay: index * 0.08 }}
          >
            <Card className="h-full border-[var(--color-border)] bg-[var(--color-surface-strong)]">
              <h3
                className="text-3xl leading-none text-[var(--color-ink)]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {editMode ? (
                  <input
                    value={stage.title}
                    onChange={(e) => updateContentField(`growthStages.${index}.title`, e.target.value)}
                    className="w-full bg-transparent text-3xl outline-none"
                  />
                ) : (
                  stage.title
                )}
              </h3>

              <div className="mt-5 space-y-4 text-sm leading-7">
                <p className="text-[var(--color-muted)]">
                  <span className="font-semibold text-[var(--color-ink)]">Kim için:</span>{' '}
                  {editMode ? (
                    <input
                      value={stage.bestFor}
                      onChange={(e) => updateContentField(`growthStages.${index}.bestFor`, e.target.value)}
                      className="bg-transparent outline-none"
                    />
                  ) : (
                    stage.bestFor
                  )}
                </p>
                <p className="text-[var(--color-muted)]">
                  <span className="font-semibold text-[var(--color-ink)]">Ne kurulur:</span>{' '}
                  {editMode ? (
                    <input
                      value={stage.build}
                      onChange={(e) => updateContentField(`growthStages.${index}.build`, e.target.value)}
                      className="bg-transparent outline-none"
                    />
                  ) : (
                    stage.build
                  )}
                </p>
                <p className="text-[var(--color-muted)]">
                  <span className="font-semibold text-[var(--color-ink)]">Sonuç odağı:</span>{' '}
                  {editMode ? (
                    <input
                      value={stage.outcome}
                      onChange={(e) => updateContentField(`growthStages.${index}.outcome`, e.target.value)}
                      className="bg-transparent outline-none"
                    />
                  ) : (
                    stage.outcome
                  )}
                </p>
              </div>

              <ul className="mt-5 space-y-2">
                {stage.points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-[var(--color-ink)]">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                    <span>
                      {editMode ? (
                        <input
                          value={point}
                          onChange={(e) =>
                            updateContentField(
                              `growthStages.${index}.points.${stage.points.indexOf(point)}`,
                              e.target.value
                            )
                          }
                          className="bg-transparent outline-none"
                        />
                      ) : (
                        point
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-primary-strong)]">
        {editMode ? (
          <input
            value={content.servicesSection.cta}
            onChange={(e) => updateContentField('servicesSection.cta', e.target.value)}
            className="bg-transparent outline-none"
          />
        ) : (
          content.servicesSection.cta
        )}
      </p>
      {editMode && (
        <button
          onClick={saveContent}
          className="mt-4 rounded bg-green-600 px-4 py-2 text-sm text-white"
        >
          Kaydet
        </button>
      )}
    </SectionContainer>
  );
}
