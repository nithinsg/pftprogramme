import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { primaryCta } from '@/data/site';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { useScrolledPast } from '@/lib/hooks';

/**
 * Mobile sticky CTA (§18, §19).
 *
 * Appears once the visitor has scrolled past the hero — so the landing page
 * still gets its uninterrupted first impression — and stays reachable with one
 * thumb after that. Hidden on the recordings routes, where it would point at
 * the page the visitor is already reading.
 */
export function StickyCta() {
  const visible = useScrolledPast(560);
  const { pathname } = useLocation();

  const onRecordings = pathname.startsWith('/recordings');
  if (onRecordings) return null;

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3',
        'backdrop-blur-md transition-transform duration-400 ease-editorial lg:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
      // Keep it out of the tab order while it is off-screen.
      aria-hidden={!visible}
    >
      <Link
        to={primaryCta.href}
        tabIndex={visible ? 0 : -1}
        onClick={() => track({ name: 'view_recorded_talks_click', location: 'sticky-cta' })}
        className="flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-pill bg-ink-900 px-6 text-sm font-semibold tracking-wide text-white active:bg-ink-950"
      >
        {primaryCta.label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
