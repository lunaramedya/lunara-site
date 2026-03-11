import React from 'react';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
    asChild?: false;
  };

type ButtonAsLink = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    asChild?: false;
  };

type ButtonAsChild = CommonProps & {
  asChild: true;
  href?: never;
  children: React.ReactElement<{ className?: string }>;
};

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsChild;

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[linear-gradient(135deg,var(--color-primary),var(--color-accent))] text-[#06101f] hover:brightness-105 shadow-[0_20px_45px_rgba(111,134,255,0.28)]',
  secondary:
    'border border-white/14 bg-white/8 text-white hover:bg-white/12 shadow-[0_18px_36px_rgba(7,11,22,0.28)]',
  ghost: 'bg-transparent text-[var(--color-ink)] hover:bg-white/6',
  outline:
    'border border-[var(--color-border-strong)] bg-white/4 text-[var(--color-ink)] hover:border-[var(--color-primary)] hover:bg-white/8 hover:text-white',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-sm md:text-[15px]',
  lg: 'h-12 px-6 text-base',
};

function getClassName(variant: Variant, size: Size, className?: string): string {
  return cn(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.01em] transition duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060a16]',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export function Button(props: ButtonAsChild): JSX.Element;
export function Button(props: ButtonAsLink): JSX.Element;
export function Button(props: ButtonAsButton): JSX.Element;
export function Button(props: ButtonProps): JSX.Element {
  if ('asChild' in props && props.asChild && React.isValidElement(props.children)) {
    const { variant = 'primary', size = 'md', className, children } = props;
    const merged = getClassName(variant, size, className);

    return React.cloneElement(children, {
      className: cn(merged, children.props.className),
    });
  }

  if ('href' in props && props.href) {
    const { variant = 'primary', size = 'md', className, href, ...anchorProps } = props;
    const merged = getClassName(variant, size, className);

    return (
      <a href={href} {...anchorProps} className={merged}>
        {props.children}
      </a>
    );
  }

  const buttonProps = props as ButtonAsButton;
  const {
    variant = 'primary',
    size = 'md',
    className,
    ...restButtonProps
  } = buttonProps;

  const merged = getClassName(variant, size, className);

  return (
    <button {...restButtonProps} className={merged}>
      {props.children}
    </button>
  );
}
