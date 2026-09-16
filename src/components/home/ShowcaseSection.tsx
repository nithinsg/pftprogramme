import { useEffect } from 'react';
import { Check } from 'lucide-react';
import type { Showcase } from '@/data/types';
import { showcaseById } from '@/data/showcases';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { useReveal } from '@/lib/hooks';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { MediaFrame, hasMedia } from '@/components/ui/MediaFrame';
import { StatusChip, isVisible } from '@/components/ui/ContentStatus';

type Tone = 'light' | 'mist' | 'navy';

/**
 * A capability showcase (§6) — ECMO, advanced interventions, lung transplant.
 *
 * All three run through this one component with different data and a different
 * tone, so they read as a family while staying visually distinct: navy for the
 * critical-care story, white for the procedural one, mist for transplantation.
 *
 * The section fires a `showcase_view` analytics event the first time it enters
 * the viewport — that is how we learn which of the three the delegates actually
 * care about.
 */
export function ShowcaseSection({
  showcase,
  index,
  tone = 'light',
  reverse = false,
}: {
  showcase: Showcase;
  index: string;
  tone?: Tone;
  reverse?: boolean;
}) {
  const dark = tone === 'navy';
  const [ref, seen] = useReveal<HTMLElement>({ threshold: 0.3 });

  useEffect(() => {
    if (seen) track({ name: 'showcase_view', showcase: showcase.id });
  }, [seen, showcase.id]);

  const procedures = showcase.procedures.filter((p) => isVisible(p.status));
  const showMedia = hasMedia(showcase.media);
  const showAttribution = showcase.status === 'approved' || isVisible(showcase.status);

  return (
    <section
      ref={ref}
      id={showcase.id}
      aria-labelledby={`${showcase.id}-title`}
      className={cn(
        'relative overflow-hidden py-section',
        tone === 'light' && 'bg-white',
        tone === 'mist' && 'bg-mist-100',
        dark && 'field-navy field-grid on-dark',
      )}
    >
      <div className="container-x relative">
        <div
          className={cn(
            'grid items-center gap-10 lg:gap-16',
            showMedia && 'lg:grid-cols-2',
            showMedia && reverse && 'lg:[&>*:first-child]:order-2',
          )}
        >
          {/* Media */}
          {showMedia && (
            <Reveal>
              <div className="relative min-w-0">
                <MediaFrame media={showcase.media} ratio="3/2" className="shadow-card" />
                <StatusChip
                  status={showcase.media.status}
                  label="Photography required"
                  className="mt-4"
                />
              </div>
            </Reveal>
          )}

          {/* Copy */}
          <div className={cn('min-w-0', !showMedia && 'max-w-3xl')}>
            <Reveal>
              <div className="flex items-center gap-4">
                <span className={dark ? 'eyebrow-light' : 'eyebrow'}>{showcase.eyebrow}</span>
                <span
                  aria-hidden="true"
                  className={cn('h-px flex-1', dark ? 'bg-white/15' : 'bg-line')}
                />
                <span className={cn('section-index', dark && 'text-white/35')}>{index}</span>
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h2
                id={`${showcase.id}-title`}
                className={cn('mt-5 text-heading font-semibold', dark && 'text-white')}
              >
                {showcase.title}
              </h2>
              <p
                className={cn(
                  'mt-3 text-subhead font-medium',
                  dark ? 'text-accent-200' : 'text-accent-600',
                )}
              >
                {showcase.subtitle}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <p className={cn('mt-6 text-base leading-relaxed', dark ? 'text-ink-200' : 'text-ink-600')}>
                {showcase.description}
              </p>
            </Reveal>

            {/* Clinical highlights — capability statements, never outcomes. */}
            <Reveal delay={180}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {showcase.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      className={cn(
                        'mt-0.5 h-4 w-4 shrink-0',
                        dark ? 'text-accent-300' : 'text-accent-600',
                      )}
                      strokeWidth={2.25}
                      aria-hidden="true"
                    />
                    <span className={cn('text-sm leading-snug', dark ? 'text-ink-100' : 'text-ink-700')}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {procedures.length > 0 && (
              <Reveal delay={220}>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {procedures.map((procedure) => (
                    <li
                      key={procedure.id}
                      className={cn(
                        'rounded-pill border px-3 py-1.5 text-[0.6875rem] font-medium',
                        dark
                          ? 'border-white/20 bg-white/5 text-ink-100'
                          : 'border-line bg-white text-ink-600',
                      )}
                    >
                      {procedure.title}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <Reveal delay={260}>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  to={showcase.href}
                  variant={dark ? 'onDark' : 'primary'}
                  size="md"
                  withArrow
                  onClick={() =>
                    track({
                      name: 'showcase_cta_click',
                      showcase: showcase.id,
                      destination: showcase.href,
                    })
                  }
                >
                  {showcase.ctaLabel}
                </Button>
                {showAttribution && (
                  <p className={cn('text-meta', dark ? 'text-ink-300' : 'text-ink-400')}>
                    {showcase.attribution}
                  </p>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Named wrappers, so the page reads like the brief's component list ──── */

const required = (id: string): Showcase => {
  const found = showcaseById(id);
  if (!found) throw new Error(`Showcase "${id}" is missing from src/data/showcases.ts`);
  return found;
};

export const ECMOSection = () => (
  <ShowcaseSection showcase={required('ecmo')} index="06" tone="navy" />
);

export const InterventionSection = () => (
  <ShowcaseSection showcase={required('interventions')} index="07" tone="light" reverse />
);

export const LungTransplantSection = () => (
  <ShowcaseSection showcase={required('lung-transplant')} index="08" tone="mist" />
);
