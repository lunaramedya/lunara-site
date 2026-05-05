import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

type SectionTitleProps = {
  title: React.ReactNode;
  subtitle: React.ReactNode;
  badge?: ReactNode;
  align?: 'left' | 'center';
  tone?: 'default' | 'inverse';
};

export function SectionTitle({ title, subtitle, badge, align = 'left', tone = 'default' }: SectionTitleProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : 'text-left';
  const titleColor = tone === 'inverse' ? 'text-white' : 'text-[var(--color-ink)]';
  const subtitleColor = tone === 'inverse' ? 'text-white/72' : 'text-[var(--color-muted)]';

  return (
    <header className={cn('max-w-3xl space-y-4', alignment)}>
      {badge ? <div>{badge}</div> : null}
      <h2
        className={cn('text-3xl leading-[0.95] tracking-[-0.02em] sm:text-4xl md:text-5xl', titleColor)}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {title}
      </h2>
      <p className={cn('max-w-2xl text-sm leading-7 sm:text-[15px] md:text-lg', subtitleColor)}>{subtitle}</p>
    </header>
  );
}
