import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { primaryCta, primaryNav, site } from '@/data/site';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { useLockBodyScroll, useScrolledPast } from '@/lib/hooks';
import { Logo } from './Logo';

/**
 * Header for a single-page site: every link is an in-page anchor.
 *
 * Transparent over the navy hero, resolving to a solid bar on scroll. Five
 * links and one CTA — the brief asks for minimal, and a clinician on a phone
 * should reach the recordings in one tap.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolledPast(32);
  const solid = scrolled || open;

  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (anchor: string) => {
    setOpen(false);
    track({ name: 'nav_click', anchor });
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-400 ease-editorial',
        solid
          ? 'border-b border-line bg-white/95 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent on-dark',
      )}
    >
      <div className="container-x flex h-[var(--nav-h)] items-center justify-between gap-3 sm:gap-6">
        <Logo tone={solid ? 'dark' : 'light'} />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <a
              key={item.anchor}
              href={`#${item.anchor}`}
              onClick={() => go(item.anchor)}
              className={cn(
                'rounded-md px-3 py-2 text-[0.8125rem] font-medium transition-colors duration-250',
                solid ? 'text-ink-600 hover:text-ink-900' : 'text-ink-200 hover:text-white',
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`#${primaryCta.anchor}`}
            onClick={() => {
              go(primaryCta.anchor);
              track({ name: 'watch_sessions_click', location: 'navbar' });
            }}
            className={cn(
              'hidden h-11 items-center rounded-pill px-5 text-[0.8125rem] font-semibold tracking-wide transition-colors sm:inline-flex',
              solid
                ? 'bg-ink-900 text-white hover:bg-ink-800'
                : 'bg-white text-ink-900 hover:bg-mist-100',
            )}
          >
            {primaryCta.shortLabel}
          </a>

          <button
            type="button"
            onClick={() => {
              setOpen((o) => !o);
              if (!open) track({ name: 'nav_open' });
            }}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className={cn(
              'grid h-11 w-11 place-items-center rounded-md transition-colors lg:hidden',
              solid ? 'text-ink-800 hover:bg-mist-200' : 'text-white hover:bg-white/10',
            )}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!open} className="border-t border-line bg-white lg:hidden">
        <nav aria-label="Primary mobile" className="container-x animate-slide-down py-4">
          <ul className="divide-y divide-line">
            {primaryNav.map((item) => (
              <li key={item.anchor}>
                <a
                  href={`#${item.anchor}`}
                  onClick={() => go(item.anchor)}
                  className="flex items-center justify-between py-4 text-base font-medium text-ink-800"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-ink-300">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href={`#${primaryCta.anchor}`}
            onClick={() => {
              go(primaryCta.anchor);
              track({ name: 'watch_sessions_click', location: 'mobile-nav' });
            }}
            className="mt-5 flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-pill bg-ink-900 px-6 text-sm font-semibold tracking-wide text-white"
          >
            {primaryCta.label}
          </a>

          <p className="mt-5 pb-2 text-meta text-ink-400">
            {site.hospital} · {site.centre} · {site.department}
          </p>
        </nav>
      </div>
    </header>
  );
}
