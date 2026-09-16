import { CalendarDays, ChevronDown, MapPin } from 'lucide-react';
import { event, site } from '@/data/site';
import { track } from '@/lib/analytics';

/**
 * The hero.
 *
 * Deliberately NO video player here. The brief is explicit: the recordings are
 * the destination, not the opening. The only thing above the fold is who this
 * is from, what it was, and a cue to keep scrolling.
 *
 * Sized in `svh` so mobile browser chrome collapsing mid-scroll does not make
 * the hero jump.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="field-navy field-grid on-dark relative flex min-h-[94svh] flex-col overflow-hidden pt-[var(--nav-h)]"
      aria-labelledby="hero-title"
    >
      <div className="container-x relative flex flex-1 flex-col justify-center py-16 sm:py-20">
        <div className="max-w-3xl">
          <div className="animate-fade-rise">
            <p className="text-eyebrow font-semibold uppercase tracking-[0.2em] text-white">
              {site.hospital}
            </p>
            <p className="mt-2 flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.2em] text-accent-300">
              <span aria-hidden="true" className="h-px w-8 bg-accent-400" />
              {site.centre} <span aria-hidden="true" className="text-white/30">|</span>{' '}
              {site.departmentShort}
            </p>
          </div>

          <h1
            id="hero-title"
            className="text-shadow-hero mt-8 animate-fade-rise text-display font-semibold text-white [animation-delay:90ms]"
          >
            {event.nameLines[0]}
            <span className="block">{event.nameLines[1]}</span>
          </h1>

          <p className="mt-6 animate-fade-rise text-subhead font-medium text-accent-200 [animation-delay:150ms]">
            {event.tagline}
          </p>

          <p className="mt-6 max-w-xl animate-fade-rise text-lede text-ink-200 [animation-delay:210ms]">
            Recorded sessions from the PFT workshop conducted on {event.date} at {event.venueShort}.
          </p>

          <ul className="mt-10 flex animate-fade-rise flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink-200 [animation-delay:270ms]">
            <li className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-accent-300" strokeWidth={1.5} aria-hidden="true" />
              {event.date}
              <span className="text-white/30" aria-hidden="true">
                ·
              </span>
              {event.time}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent-300" strokeWidth={1.5} aria-hidden="true" />
              {event.venueShort}
            </li>
          </ul>
        </div>
      </div>

      {/* Scroll cue — the only call to action in the hero. */}
      <div className="relative border-t border-white/10">
        <div className="container-x py-5">
          <a
            href="#workshop"
            onClick={() => track({ name: 'cta_click', cta: 'Explore the workshop', location: 'hero' })}
            className="-my-2.5 inline-flex items-center gap-2 py-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-300 transition-colors hover:text-white"
          >
            Explore the workshop
            <ChevronDown className="h-4 w-4 animate-bounce" strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
