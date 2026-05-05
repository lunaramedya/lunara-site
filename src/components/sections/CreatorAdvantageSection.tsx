import { useSiteContent } from '../../context/SiteContentContext';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export function CreatorAdvantageSection() {
  const { content, editMode, updateContentField, saveContent } = useSiteContent();

  return (
    <SectionContainer id="creator" className="scroll-mt-24 bg-[linear-gradient(180deg,#0a121f,#070d18)]">
      <div className="max-w-3xl space-y-4">
        <Badge className="border-white/20 bg-white/10 text-white/80">
          {editMode ? (
            <input
              value={content.creatorSection.badge}
              onChange={(e) => updateContentField('creatorSection.badge', e.target.value)}
              className="bg-transparent text-white/80 text-sm outline-none"
            />
          ) : (
            content.creatorSection.badge
          )}
        </Badge>
        <h2
          className="text-3xl leading-[0.95] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {editMode ? (
            <input
              value={content.creatorSection.title}
              onChange={(e) => updateContentField('creatorSection.title', e.target.value)}
              className="w-full bg-transparent text-white text-3xl outline-none"
            />
          ) : (
            content.creatorSection.title
          )}
        </h2>
        <p className="text-sm leading-7 text-white/70 sm:text-base md:text-lg">
          {editMode ? (
            <textarea
              value={content.creatorSection.subtitle}
              onChange={(e) => updateContentField('creatorSection.subtitle', e.target.value)}
              className="w-full bg-transparent text-white/70 outline-none"
            />
          ) : (
            content.creatorSection.subtitle
          )}
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {content.creatorLayerItems.map((item) => (
          <Card key={item.id} className="h-full border-white/12 bg-white/5">
            <h3 className="text-3xl leading-none text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {editMode ? (
                <input
                  value={item.title}
                  onChange={(e) => updateContentField(`creatorLayerItems.${content.creatorLayerItems.indexOf(item)}.title`, e.target.value)}
                  className="w-full bg-transparent text-white text-3xl outline-none"
                />
              ) : (
                item.title
              )}
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/72">
              {editMode ? (
                <textarea
                  value={item.description}
                  onChange={(e) => updateContentField(`creatorLayerItems.${content.creatorLayerItems.indexOf(item)}.description`, e.target.value)}
                  className="w-full bg-transparent text-white/72 outline-none"
                />
              ) : (
                item.description
              )}
            </p>
          </Card>
        ))}
      </div>

      <div className="mt-8 rounded-[28px] border border-white/12 bg-white/6 p-5 text-white/78 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
          {editMode ? (
            <input
              value={content.creatorSection.honestyTitle}
              onChange={(e) => updateContentField('creatorSection.honestyTitle', e.target.value)}
              className="bg-transparent text-white/60 outline-none"
            />
          ) : (
            content.creatorSection.honestyTitle
          )}
        </p>
        <p className="mt-3 text-sm leading-7">
          {editMode ? (
            <textarea
              value={content.creatorSection.honestyText}
              onChange={(e) => updateContentField('creatorSection.honestyText', e.target.value)}
              className="w-full bg-transparent text-white/78 outline-none"
            />
          ) : (
            content.creatorSection.honestyText
          )}
        </p>
      </div>

      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-[var(--color-primary)]">
        {editMode ? (
          <input
            value={content.creatorSection.cta}
            onChange={(e) => updateContentField('creatorSection.cta', e.target.value)}
            className="bg-transparent outline-none"
          />
        ) : (
          content.creatorSection.cta
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
