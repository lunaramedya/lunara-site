import type { PropsWithChildren } from 'react';
import { cn } from '../../utils/cn';

type BadgeProps = PropsWithChildren<{
  className?: string;
}>;

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-[var(--color-border-strong)] bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)] backdrop-blur',
        className,
      )}
    >
      {children}
    </span>
  );
}
