import type { ReactNode } from 'react';

type SectionTitleProps = {
  title: string;
  subtitle: string;
  badge?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'default' | 'inverse';
};

export function SectionTitle({ title, subtitle, badge, align = 'left', tone = 'default' }: SectionTitleProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const titleColor = tone === 'inverse' ? 'text-white' : 'text-[var(--color-ink)]';
  const subtitleColor = tone === 'inverse' ? 'text-white/72' : 'text-[var(--color-muted)]';

  return (
    <header className={`max-w-3xl space-y-4 ${alignment}`}>
      {badge ? <div>{badge}</div> : null}
      <h2
        className={`text-3xl leading-[0.95] tracking-[-0.02em] sm:text-4xl md:text-5xl ${titleColor}`}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h2>
      <p className={`max-w-2xl text-sm leading-7 sm:text-[15px] md:text-lg ${subtitleColor}`}>{subtitle}</p>
    </header>
  );
}
