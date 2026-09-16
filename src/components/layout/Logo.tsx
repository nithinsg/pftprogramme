import { Link } from 'react-router-dom';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';

/**
 * Brand lockup.
 *
 * ⚠️ NO LOGO IS INVENTED HERE. Until the official Yashoda Hospitals asset is
 * supplied, this renders a neutral typographic lockup. Set `site.logo.src` in
 * `src/data/site.ts` to the official file and it is used instead, at the same
 * optical size, with no other change needed.
 */
export function Logo({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  const light = tone === 'light';

  return (
    <Link
      to="/"
      // `min-w-0` matters: without it the lockup refuses to shrink and pushes
      // the menu button off the right edge of a 390px screen.
      className={cn('group -my-1.5 inline-flex min-w-0 items-center gap-2.5 py-1.5 sm:gap-3', className)}
      aria-label={`${site.hospital}, ${site.centre} — home`}
    >
      {site.logo.src ? (
        <img
          src={site.logo.src}
          alt={site.logo.alt}
          className="h-8 w-auto sm:h-9"
          width={160}
          height={36}
        />
      ) : (
        <>
          <span
            aria-hidden="true"
            className={cn(
              'grid h-9 w-9 shrink-0 place-items-center rounded-md border text-[0.8125rem] font-semibold tracking-tight transition-colors',
              light
                ? 'border-white/25 text-white group-hover:border-white/50'
                : 'border-ink-200 text-ink-900 group-hover:border-ink-400',
            )}
          >
            YH
          </span>
          <span className="min-w-0 leading-none">
            <span
              className={cn(
                'block truncate text-[0.875rem] font-semibold tracking-[-0.01em] sm:text-[0.9375rem]',
                light ? 'text-white' : 'text-ink-900',
              )}
            >
              {site.hospital}
            </span>
            <span
              className={cn(
                'mt-1 block truncate text-[0.5625rem] font-semibold uppercase tracking-[0.14em] sm:text-[0.625rem] sm:tracking-[0.16em]',
                light ? 'text-ink-300' : 'text-ink-500',
              )}
            >
              {site.centre}
              {/* The department is dropped on the narrowest phones — the brand
                  and the centre are what must survive at 360px. */}
              <span className="hidden xs:inline">
                {' '}
                <span aria-hidden="true">·</span> {site.departmentShort}
              </span>
            </span>
          </span>
        </>
      )}
    </Link>
  );
}
