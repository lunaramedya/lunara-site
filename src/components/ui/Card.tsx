import type { PropsWithChildren } from 'react';
import { cn } from '../../utils/cn';

type CardProps = PropsWithChildren<{
  className?: string;
}>;

export function Card({ children, className }: CardProps) {
  return (
    <article
      className={cn(
        'rounded-[28px] border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_20px_60px_rgba(3,8,18,0.34)] backdrop-blur-xl transition duration-300',
        className,
      )}
    >
      {children}
    </article>
  );
}
