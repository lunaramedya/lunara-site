import { motion } from 'framer-motion';
import { useSiteContent } from '../../context/SiteContentContext';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { SectionTitle } from '../ui/SectionTitle';

export function ProcessSection() {
  const { content } = useSiteContent();
  return (
    <SectionContainer id="process" className="scroll-mt-24 bg-[linear-gradient(180deg,#0b1426,#060c18)]">
      <SectionTitle
        title={content.processSection.title}
        subtitle={content.processSection.subtitle}
        badge={<Badge className="border-white/14 bg-white/8 text-white/78">{content.processSection.badge}</Badge>}
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
              {step.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-white/70">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
}
