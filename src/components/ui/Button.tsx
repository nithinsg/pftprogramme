import { forwardRef } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'accent' | 'outline' | 'ghost' | 'onDark' | 'onDarkGhost';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Renders a trailing arrow that nudges on hover. */
  withArrow?: boolean;
  fullWidth?: boolean;
  className?: string;
  onClick?: () => void;
  /** Internal route. */
  to?: string;
  /** External URL — rendered as an anchor with rel/target set. */
  href?: string;
  type?: 'button' | 'submit';
  'aria-label'?: string;
  disabled?: boolean;
}

const base =
  'group inline-flex items-center justify-center gap-2 rounded-pill font-semibold ' +
  'transition-all duration-300 ease-editorial select-none ' +
  'disabled:cursor-not-allowed disabled:opacity-45';

const variants: Record<Variant, string> = {
  // Primary action — deep navy. AA on white.
  primary:
    'bg-ink-900 text-white hover:bg-ink-800 active:bg-ink-950 shadow-card hover:shadow-card-hover',
  // Reserved for the single most important CTA on a dark field.
  accent:
    'bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-700 shadow-card hover:shadow-card-hover',
  outline:
    'border border-ink-200 bg-white text-ink-800 hover:border-ink-300 hover:bg-mist-100 active:bg-mist-200',
  ghost: 'text-ink-700 hover:bg-mist-200 active:bg-mist-300',
  onDark: 'bg-white text-ink-900 hover:bg-mist-100 active:bg-mist-200 shadow-lift',
  onDarkGhost:
    'border border-white/25 text-white hover:border-white/50 hover:bg-white/10 active:bg-white/15',
};

const sizes: Record<Size, string> = {
  // 44px+ tall on every size — comfortable one-handed touch targets (§19).
  sm: 'h-11 px-5 text-[0.8125rem] tracking-wide',
  md: 'h-12 px-6 text-sm tracking-wide',
  lg: 'h-14 px-7 text-[0.9375rem] tracking-wide sm:h-[3.75rem] sm:px-9 sm:text-base',
};

/**
 * The one button in the system. Renders as `<Link>`, `<a>` or `<button>`
 * depending on which of `to` / `href` is supplied.
 */
export const Button = forwardRef<HTMLElement, BaseProps>(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    withArrow = false,
    fullWidth = false,
    className,
    to,
    href,
    type = 'button',
    disabled,
    ...rest
  },
  ref,
) {
  const classes = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);

  const content = (
    <>
      <span className="whitespace-nowrap">{children}</span>
      {withArrow && (
        <ArrowRight
          className="h-4 w-4 shrink-0 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (to && !disabled) {
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      className={classes}
      disabled={disabled}
      {...rest}
    >
      {content}
    </button>
  );
});
