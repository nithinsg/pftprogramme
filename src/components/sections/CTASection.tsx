import { ArrowRight } from 'lucide-react';
import { event, primaryCta, site } from '@/data/site';
import { track } from '@/lib/analytics';
import { Reveal } from '@/components/ui/Reveal';

/**
 * The hinge of the whole page.
 *
 * Everything above it earns the click; everything below it is the payoff. Dark,
 * full-bleed and quiet — one heading, one line, one button — so that after a
 * long scroll it reads as arrival rather than as another section.
 */
export function CTASection() {
  return (
    <section
      aria-labelledby="cta-title"
      className="field-navy field-grid on-dark relative overflow-hidden py-section"
    >
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow-light">Continue Your Learning</p>
          </Reveal>

          <Reveal delay={60}>
            <h2 id="cta-title" className="mt-5 text-heading font-semibold text-white">
              Revisit the sessions from the {event.name}.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="mx-auto mt-5 max-w-xl text-lede text-ink-200">
              Every session, recorded with the presentation and the speaker on screen together.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-10 flex justify-center">
              <a
                href={`#${primaryCta.anchor}`}
                onClick={() => {
                  track({ name: 'watch_sessions_click', location: 'main-cta' });
                  track({ name: 'cta_click', cta: primaryCta.label, location: 'main-cta' });
                }}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-pill bg-white px-9 text-[0.9375rem] font-semibold tracking-wide text-ink-900 shadow-lift transition-all duration-300 ease-editorial hover:bg-mist-100 sm:w-auto sm:text-base"
                style={{ minHeight: '3.75rem' }}
              >
                {primaryCta.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 text-meta text-ink-300/70">
              {site.hospital} <span aria-hidden="true">·</span> {site.centre}{' '}
              <span aria-hidden="true">·</span> {event.date}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
