import type { PropsWithChildren } from 'react';
import { cn } from '../../utils/cn';

type SectionContainerProps = PropsWithChildren<{
  id?: string;
  className?: string;
}>;

export function SectionContainer({ id, className, children }: SectionContainerProps) {
  return (
    <section id={id} className={cn('px-4 py-14 md:px-8 md:py-20', className)}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}
