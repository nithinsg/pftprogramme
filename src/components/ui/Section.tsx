import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from './Reveal';

type Tone = 'light' | 'mist' | 'navy';

const toneClasses: Record<Tone, string> = {
  light: 'bg-white',
  mist: 'bg-mist-100',
  navy: 'field-navy text-ink-100 on-dark',
};

/**
 * The editorial section wrapper: consistent vertical rhythm, an optional
 * numbered eyebrow and a constrained header block. Everything on the site sits
 * inside one of these so spacing stays on a single scale.
 */
export function Section({
  id,
  tone = 'light',
  index,
  eyebrow,
  title,
  lede,
  children,
  className,
  headerClassName,
  align = 'left',
  divider = false,
}: {
  id?: string;
  tone?: Tone;
  /** Editorial number shown at the top-right of the header, e.g. "03". */
  index?: string;
  eyebrow?: string;
  title?: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  className?: string;
  headerClassName?: string;
  align?: 'left' | 'center';
  divider?: boolean;
}) {
  const dark = tone === 'navy';

  return (
    <section
      id={id}
      className={cn('relative py-section', toneClasses[tone], className)}
      aria-labelledby={id && title ? `${id}-title` : undefined}
    >
      <div className="container-x">
        {(eyebrow || title || lede) && (
          <header
            className={cn(
              'mb-10 sm:mb-14',
              align === 'center' && 'mx-auto max-w-3xl text-center',
              headerClassName,
            )}
          >
            {(eyebrow || index) && (
              <Reveal
                className={cn(
                  'mb-4 flex items-baseline gap-4',
                  align === 'center' && 'justify-center',
                )}
              >
                {eyebrow && <span className={dark ? 'eyebrow-light' : 'eyebrow'}>{eyebrow}</span>}
                {index && (
                  <>
                    <span
                      aria-hidden="true"
                      className={cn('h-px flex-1', dark ? 'bg-white/15' : 'bg-line')}
                    />
                    <span className={cn('section-index', dark && 'text-white/35')}>{index}</span>
                  </>
                )}
              </Reveal>
            )}

            {title && (
              <Reveal delay={60}>
                <h2
                  id={id ? `${id}-title` : undefined}
                  className={cn('text-heading font-semibold', dark && 'text-white')}
                >
                  {title}
                </h2>
              </Reveal>
            )}

            {lede && (
              <Reveal delay={120}>
                <p
                  className={cn(
                    'mt-5 max-w-2xl text-lede',
                    dark ? 'text-ink-200' : 'text-ink-600',
                    align === 'center' && 'mx-auto',
                  )}
                >
                  {lede}
                </p>
              </Reveal>
            )}
          </header>
        )}

        {children}
      </div>

      {divider && !dark && (
        <div aria-hidden="true" className="container-x absolute inset-x-0 bottom-0">
          <div className="hairline" />
        </div>
      )}
    </section>
  );
}
