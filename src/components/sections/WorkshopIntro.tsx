import { event } from '@/data/site';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { PhysiologyVisual } from './PhysiologyVisual';

/**
 * "About the workshop" — the first thing after the hero.
 *
 * Establishes what the day was, using only what the official listing states.
 * No attendance figures, no superlatives.
 */
export function WorkshopIntro() {
  return (
    <Section
      id="workshop"
      index="01"
      eyebrow="About the Workshop"
      title="A day spent on how the lung is measured."
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-16">
        <div className="min-w-0">
          <Reveal>
            <p className="text-lede text-ink-700">
              The {event.name} ran from {event.time} on {event.date} at {event.venueShort}, taking
              pulmonary function testing from first principles through to advanced interpretation.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-5 text-base leading-relaxed text-ink-600">
              The programme paired lectures from invited speakers with hands-on respiratory
              diagnostics — bronchoprovocation testing, cardiopulmonary exercise testing, body
              plethysmography and the Alti Trainer respiratory diagnostic device — and marked the
              launch of the Centre of Excellence.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-3">
              {[
                { label: 'Date', value: event.date },
                { label: 'Timing', value: event.time },
                { label: 'Venue', value: event.venueShort },
              ].map((item) => (
                <div key={item.label} className="bg-white px-5 py-4">
                  <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-ink-400">
                    {item.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium text-ink-900">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line">
            {[
              { kind: 'flow-volume' as const, label: 'Flow–volume loop' },
              { kind: 'spirometry' as const, label: 'Volume–time trace' },
              { kind: 'lung-volumes' as const, label: 'Lung volume compartments' },
              { kind: 'cpet' as const, label: 'Cardiopulmonary exercise response' },
            ].map((item) => (
              <figure key={item.kind} className="bg-white p-5">
                <div className="aspect-[8/5] text-ink-700">
                  <PhysiologyVisual kind={item.kind} label={item.label} />
                </div>
                <figcaption className="mt-3 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-ink-400">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
