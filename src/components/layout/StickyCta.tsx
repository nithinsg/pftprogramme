import { ArrowRight } from 'lucide-react';
import { primaryCta } from '@/data/site';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { useScrolledPast } from '@/lib/hooks';
import { useEffect, useState } from 'react';

/**
 * Mobile sticky CTA.
 *
 * Appears once the visitor has scrolled past the hero — so the landing page
 * keeps its uninterrupted first impression — and hides again once the recorded
 * sessions are on screen, where it would point at what they are already
 * reading. It must never obstruct content, so it only ever occupies a single
 * row at the very bottom.
 */
export function StickyCta() {
  const pastHero = useScrolledPast(600);
  const [atTarget, setAtTarget] = useState(false);

  useEffect(() => {
    const target = document.getElementById(primaryCta.anchor);
    if (!target || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setAtTarget(entry.isIntersecting),
      { rootMargin: '-10% 0px -40% 0px' },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const visible = pastHero && !atTarget;

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3',
        'backdrop-blur-md transition-transform duration-400 ease-editorial lg:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
      aria-hidden={!visible}
    >
      <a
        href={`#${primaryCta.anchor}`}
        tabIndex={visible ? 0 : -1}
        onClick={() => track({ name: 'watch_sessions_click', location: 'sticky-cta' })}
        className="flex min-h-[3.25rem] w-full items-center justify-center gap-2 rounded-pill bg-ink-900 px-6 text-sm font-semibold tracking-wide text-white active:bg-ink-950"
      >
        {primaryCta.label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}
