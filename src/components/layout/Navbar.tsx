import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { primaryCta, primaryNav, site } from '@/data/site';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { useLockBodyScroll, useScrolledPast } from '@/lib/hooks';
import { Button } from '@/components/ui/Button';
import { Logo } from './Logo';

/**
 * Site header (§18).
 *
 * On the home page it starts transparent over the navy hero and resolves to a
 * solid white bar on scroll. Everywhere else it is solid from the start.
 * Navigation stays to six items — the brief asks for extremely simple, and a
 * clinician on a phone should reach the recordings in one tap.
 */
export function Navbar({ transparentOnTop = false }: { transparentOnTop?: boolean }) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolledPast(32);
  const location = useLocation();

  const solid = scrolled || !transparentOnTop || open;

  useLockBodyScroll(open);

  // Close the drawer on navigation.
  useEffect(() => setOpen(false), [location.pathname]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

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

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'rounded-md px-3 py-2 text-[0.8125rem] font-medium transition-colors duration-250',
                  solid
                    ? isActive
                      ? 'text-ink-900'
                      : 'text-ink-600 hover:text-ink-900'
                    : isActive
                      ? 'text-white'
                      : 'text-ink-200 hover:text-white',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            to={primaryCta.href}
            variant={solid ? 'primary' : 'onDark'}
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => track({ name: 'view_recorded_talks_click', location: 'navbar' })}
          >
            View Talks
          </Button>

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

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-line bg-white lg:hidden"
      >
        <nav aria-label="Primary mobile" className="container-x animate-slide-down py-4">
          <ul className="divide-y divide-line">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="flex items-center justify-between py-4 text-base font-medium text-ink-800"
                >
                  {item.label}
                  <span aria-hidden="true" className="text-ink-300">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Button
            to={primaryCta.href}
            variant="primary"
            size="md"
            fullWidth
            withArrow
            className="mt-5"
            onClick={() => track({ name: 'view_recorded_talks_click', location: 'mobile-nav' })}
          >
            {primaryCta.label}
          </Button>

          <p className="mt-5 pb-2 text-meta text-ink-400">
            {site.hospital} · {site.centre} · {site.department}
          </p>
        </nav>
      </div>
    </header>
  );
}
