import { ChevronDown } from 'lucide-react';
import { primaryCta, secondaryCta, site } from '@/data/site';
import { categories, talks } from '@/data/talks';
import { track } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';

/**
 * Landing hero (§4).
 *
 * This is the first thing a delegate sees after tapping the WhatsApp link, so
 * it carries the institutional identity BEFORE any mention of video. The
 * primary CTA is present but the page below it is the point — the brief is
 * explicit that the link must not drop straight into a player.
 *
 * Sized in `svh` so the mobile browser chrome collapsing mid-scroll does not
 * make the hero jump.
 */
export function Hero() {
  return (
    <section
      className="field-navy field-grid on-dark relative flex min-h-[92svh] flex-col overflow-hidden pt-[var(--nav-h)]"
      aria-labelledby="hero-title"
    >
      <div className="container-x relative flex flex-1 flex-col justify-center py-16 sm:py-20">
        <div className="max-w-3xl">
          {/* 01 — Institutional identity, first. */}
          <div className="animate-fade-rise">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-eyebrow font-semibold uppercase tracking-[0.2em] text-white">
              {site.hospital}
            </p>
            <p className="mt-2 flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.2em] text-accent-300">
              <span aria-hidden="true" className="h-px w-8 bg-accent-400" />
              {site.centre} <span aria-hidden="true" className="text-white/30">|</span>{' '}
              {site.departmentShort}
            </p>
          </div>

          {/* 02 — The workshop. */}
          <h1
            id="hero-title"
            className="text-shadow-hero mt-8 animate-fade-rise text-display font-semibold text-white [animation-delay:90ms]"
          >
            {site.event}
          </h1>

          <p className="mt-6 animate-fade-rise text-subhead font-medium text-accent-200 [animation-delay:150ms]">
            {site.tagline}
          </p>

          <p className="mt-6 max-w-xl animate-fade-rise text-lede text-ink-200 [animation-delay:210ms]">
            This page gives attending clinicians access to the recorded sessions from the workshop,
            and introduces the advanced pulmonary capabilities of the {site.department} at{' '}
            {site.hospital}, {site.centre} — from interventional pulmonology and advanced
            diagnostics through extracorporeal support and lung transplantation.
          </p>

          <div className="mt-10 flex animate-fade-rise flex-col gap-3 sm:flex-row sm:items-center [animation-delay:270ms]">
            <Button
              to={primaryCta.href}
              variant="onDark"
              size="lg"
              withArrow
              onClick={() => track({ name: 'view_recorded_talks_click', location: 'hero' })}
            >
              {primaryCta.label}
            </Button>
            <Button
              to={secondaryCta.href}
              variant="onDarkGhost"
              size="lg"
              onClick={() =>
                track({
                  name: 'cta_click',
                  cta: secondaryCta.label,
                  location: 'hero',
                  destination: secondaryCta.href,
                })
              }
            >
              {secondaryCta.label}
            </Button>
          </div>
        </div>
      </div>

      {/* Factual site metadata only — no clinical statistics. */}
      <div className="relative border-t border-white/10">
        <div className="container-x flex items-center justify-between gap-6 py-5">
          <dl className="flex flex-wrap items-center gap-x-8 gap-y-3 sm:gap-x-12">
            <MetaStat label="Recorded sessions" value={String(talks.length)} />
            <MetaStat label="Topic tracks" value={String(categories.length)} />
            <MetaStat label="Centre" value={site.centre} />
          </dl>

          <a
            href="#pulmonology"
            aria-label="Scroll to the department profile"
            className="-my-2.5 hidden shrink-0 items-center gap-2 py-2.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-300 transition-colors hover:text-white sm:flex"
          >
            Explore
            <ChevronDown className="h-4 w-4 animate-bounce" strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function MetaStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-ink-300/70">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold tabular-nums text-white">{value}</dd>
    </div>
  );
}
