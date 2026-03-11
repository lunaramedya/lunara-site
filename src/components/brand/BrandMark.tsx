import { cn } from '../../utils/cn';

type BrandMarkProps = {
  brand: 'lunara' | 'loli' | 'master';
  className?: string;
  inverse?: boolean;
  compact?: boolean;
};

const referenceLogoMap = {
  loli: '/loli-logo.jpg',
  master: '/master-logo.png',
} as const;

export function BrandMark({ brand, className, inverse = false, compact = false }: BrandMarkProps) {
  if (brand === 'lunara') {
    return (
      <div className={cn('inline-flex items-center gap-3', className)}>
        <img
          src="/lunara-logo.jpg"
          alt="Lunara Medya logo"
          className={cn(
            'rounded-full object-cover shadow-[0_0_40px_rgba(114,201,255,0.2)]',
            compact ? 'h-10 w-10 sm:h-12 sm:w-12' : 'h-12 w-12 sm:h-14 sm:w-14',
          )}
          loading="eager"
        />
        <div className="space-y-1">
          <p
            className={cn(
              'text-[9px] font-semibold uppercase tracking-[0.26em] sm:text-[10px] sm:tracking-[0.32em]',
              inverse ? 'text-white/58' : 'text-[var(--color-muted)]',
            )}
          >
            Dijital büyümenin yeni adresi
          </p>
          <p
            className={cn(
              compact ? 'text-sm sm:text-base' : 'text-base sm:text-lg',
              inverse ? 'text-white' : 'text-[var(--color-ink)]',
            )}
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Lunara Medya
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={referenceLogoMap[brand]}
      alt={brand === 'loli' ? 'Loli Nail Studio logo' : 'Master Service logo'}
      className={cn(
        'h-auto max-w-full object-contain',
        brand === 'master'
          ? compact
            ? 'w-[260px]'
            : 'w-[320px]'
          : compact
            ? 'w-[240px]'
            : 'w-[300px]',
        className,
      )}
      loading="lazy"
    />
  );
}
