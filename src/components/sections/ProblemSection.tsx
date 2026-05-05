import { AlertTriangle } from 'lucide-react';
import { useSiteContent } from '../../context/SiteContentContext';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export function ProblemSection() {
  const { content, editMode, updateContentField, saveContent } = useSiteContent();

  return (
    <SectionContainer id="problem" className="scroll-mt-24 pt-8 md:pt-10">
      <div className="max-w-3xl space-y-4">
        <Badge>
          {editMode ? (
            <input
              value={content.problemSection.badge}
              onChange={(e) => updateContentField('problemSection.badge', e.target.value)}
              className="bg-transparent text-sm outline-none"
            />
          ) : (
            content.problemSection.badge
          )}
        </Badge>
        <h2
          className="text-3xl leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)] sm:text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {editMode ? (
            <input
              value={content.problemSection.title}
              onChange={(e) => updateContentField('problemSection.title', e.target.value)}
              className="w-full bg-transparent text-3xl outline-none"
            />
          ) : (
            content.problemSection.title
          )}
        </h2>
        <p className="text-sm leading-7 text-[var(--color-muted)] sm:text-base md:text-lg">
          {editMode ? (
            <textarea
              value={content.problemSection.subtitle}
              onChange={(e) => updateContentField('problemSection.subtitle', e.target.value)}
              className="w-full bg-transparent outline-none"
            />
          ) : (
            content.problemSection.subtitle
          )}
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {content.problemItems.map((item) => (
          <Card key={item.id} className="h-full border-[var(--color-border)] bg-[var(--color-surface-strong)]">
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-white/5 text-[var(--color-primary)]">
              <AlertTriangle size={17} />
            </div>
            <h3 className="text-2xl leading-tight text-[var(--color-ink)]" style={{ fontFamily: 'var(--font-display)' }}>
              {editMode ? (
                <input
                  value={item.title}
                  onChange={(e) => updateContentField(`problemItems.${content.problemItems.indexOf(item)}.title`, e.target.value)}
                  className="w-full bg-transparent text-2xl outline-none"
                />
              ) : (
                item.title
              )}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
              {editMode ? (
                <textarea
                  value={item.description}
                  onChange={(e) => updateContentField(`problemItems.${content.problemItems.indexOf(item)}.description`, e.target.value)}
                  className="w-full bg-transparent outline-none"
                />
              ) : (
                item.description
              )}
            </p>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-primary-strong)]">
        {editMode ? (
          <input
            value={content.problemSection.cta}
            onChange={(e) => updateContentField('problemSection.cta', e.target.value)}
            className="bg-transparent outline-none"
          />
        ) : (
          content.problemSection.cta
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
