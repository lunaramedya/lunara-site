import { motion } from 'framer-motion';
import { useSiteContent } from '../../context/SiteContentContext';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { SectionTitle } from '../ui/SectionTitle';

export function ProcessSection() {
  const { content, editMode, updateContentField, saveContent } = useSiteContent();
  return (
    <SectionContainer id="process" className="scroll-mt-24 bg-[linear-gradient(180deg,#0d1725,#08111d)]">
      <SectionTitle
        title={editMode ? (
          <input
            value={content.processSection.title}
            onChange={(e) => updateContentField('processSection.title', e.target.value)}
            className="w-full bg-transparent text-white outline-none"
          />
        ) : (
          content.processSection.title
        )}
        subtitle={editMode ? (
          <textarea
            value={content.processSection.subtitle}
            onChange={(e) => updateContentField('processSection.subtitle', e.target.value)}
            className="w-full bg-transparent text-white/70 outline-none"
          />
        ) : (
          content.processSection.subtitle
        )}
        badge={
          <Badge className="border-white/14 bg-white/8 text-white/78">
            {editMode ? (
              <input
                value={content.processSection.badge}
                onChange={(e) => updateContentField('processSection.badge', e.target.value)}
                className="bg-transparent text-white/80 text-sm outline-none"
              />
            ) : (
              content.processSection.badge
            )}
          </Badge>
        }
        tone="inverse"
      />

      <div className="relative mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {content.processSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.12, duration: 0.35 }}
            className="rounded-[28px] border border-white/10 bg-white/6 p-6 backdrop-blur-xl"
          >
            <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))] text-sm font-bold text-[#06101f] shadow-[0_18px_40px_rgba(111,134,255,0.28)]">
              {index + 1}
            </div>
            <h3
              className="text-3xl leading-none text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {editMode ? (
                <input
                  value={step.title}
                  onChange={(e) => updateContentField(`processSteps.${index}.title`, e.target.value)}
                  className="w-full bg-transparent text-white text-3xl outline-none"
                />
              ) : (
                step.title
              )}
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/70">{editMode ? (
              <textarea
                value={step.description}
                onChange={(e) => updateContentField(`processSteps.${index}.description`, e.target.value)}
                className="w-full bg-transparent text-white/70 outline-none"
              />
            ) : (
              step.description
            )}</p>
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
