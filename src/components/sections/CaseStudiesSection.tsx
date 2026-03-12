import { motion } from 'framer-motion';
import { caseStudies } from '../../data/siteData';
import { SectionContainer } from '../layout/SectionContainer';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { SectionTitle } from '../ui/SectionTitle';

export function CaseStudiesSection() {
  return (
    <SectionContainer id="cases" className="scroll-mt-24">
      <SectionTitle
        badge={<Badge>Referanslar</Badge>}
        title="Seçili referanslarımız"
        subtitle="Farklı sektörlerde kurduğumuz iki farklı premium yaklaşım, tasarım dilini ve kullanıcı kararını nasıl güçlendirdiğimizi net biçimde gösteriyor."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {caseStudies.map((item, index) => {
          const isMaster = item.id === 'master';
          const frameClass = isMaster
            ? 'mt-6 flex h-[240px] items-center justify-center rounded-[24px] border border-white/10 bg-white/4 p-4 sm:h-[320px] sm:p-5 md:h-[420px] md:p-6 lg:h-[520px]'
            : 'mt-6 flex h-[240px] items-center justify-center rounded-[24px] border border-[#e5cbd6] bg-white/84 p-4 sm:h-[320px] sm:p-5 md:h-[420px] lg:h-[520px]';
          const imageClass = isMaster
            ? 'w-full max-w-[540px] rounded-[20px] object-contain'
            : 'h-full w-full rounded-[20px] object-contain';
          const dimensions = isMaster ? { width: 400, height: 62 } : { width: 1080, height: 1350 };

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
            >
              <Card
                className={
                  isMaster
                    ? 'h-full border-[#24456f]/30 bg-[linear-gradient(180deg,#10203a,#0a1220)] text-white'
                    : 'h-full border-[#e7d8df] bg-[linear-gradient(180deg,#f8f4f6,#f2e9ee)] text-[#111317]'
                }
              >
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
                  <Badge
                    className={
                      isMaster
                        ? 'border-white/14 bg-white/8 text-white/78'
                        : 'border-[#d7b5c3] bg-white/80 text-[#a55d7f]'
                    }
                  >
                    {item.category}
                  </Badge>
                  <span
                    className={
                      isMaster
                        ? 'text-xs font-semibold uppercase tracking-[0.24em] text-white/62'
                        : 'text-xs font-semibold uppercase tracking-[0.24em] text-[#a55d7f]'
                    }
                  >
                    {item.metric}
                  </span>
                </div>

                <div className={frameClass}>
                  <img
                    src={item.image}
                    alt={item.title}
                    width={dimensions.width}
                    height={dimensions.height}
                    className={imageClass}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <h3
                  className={isMaster ? 'mt-6 text-3xl leading-none text-white sm:text-4xl' : 'mt-6 text-3xl leading-none text-[#111317] sm:text-4xl'}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {item.title}
                </h3>

                <p className={isMaster ? 'mt-4 text-sm leading-7 text-white/72' : 'mt-4 text-sm leading-7 text-[#59535a]'}>
                  {item.summary}
                </p>

                <div className="mt-5 space-y-3">
                  <div
                    className={
                      isMaster
                        ? 'rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6 text-white/80'
                        : 'rounded-[18px] border border-[#e5cbd6] bg-white/82 px-4 py-3 text-sm leading-6 text-[#343038]'
                    }
                  >
                    <strong className={isMaster ? 'text-white' : 'text-[#111317]'}>İhtiyaç:</strong>{' '}
                    {item.problem}
                  </div>
                  <div
                    className={
                      isMaster
                        ? 'rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6 text-white/80'
                        : 'rounded-[18px] border border-[#e5cbd6] bg-white/82 px-4 py-3 text-sm leading-6 text-[#343038]'
                    }
                  >
                    <strong className={isMaster ? 'text-white' : 'text-[#111317]'}>Yapılan:</strong>{' '}
                    {item.solution}
                  </div>
                  <div
                    className={
                      isMaster
                        ? 'rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6 text-white/80'
                        : 'rounded-[18px] border border-[#e5cbd6] bg-white/82 px-4 py-3 text-sm leading-6 text-[#343038]'
                    }
                  >
                    <strong className={isMaster ? 'text-white' : 'text-[#111317]'}>Sonuç:</strong>{' '}
                    {item.outcome}
                  </div>
                </div>

                {item.services?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.services.map((service) => (
                      <span
                        key={service}
                        className={
                          isMaster
                            ? 'rounded-full border border-white/16 bg-white/8 px-3 py-1.5 text-xs text-white/88'
                            : 'rounded-full border border-[#d7b5c3] bg-white px-3 py-1.5 text-xs text-[#7c4862]'
                        }
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {item.highlights?.map((highlight) => (
                    <div
                      key={highlight}
                      className={
                        isMaster
                          ? 'rounded-[20px] border border-white/10 bg-white/6 px-4 py-4 text-sm leading-6 text-white/84'
                          : 'rounded-[20px] border border-[#e5cbd6] bg-white/82 px-4 py-4 text-sm leading-6 text-[#111317]'
                      }
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </SectionContainer>
  );
}
