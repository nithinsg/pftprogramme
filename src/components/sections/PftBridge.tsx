import { programmeHighlights } from '@/data/capabilities';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { PhysiologyVisual } from './PhysiologyVisual';
import type { PhysiologyKind } from './PhysiologyVisual';

/**
 * The bridge: what the workshop taught, and where it leads.
 *
 * Highlights are the official programme items, nothing more. The schematics
 * carry the visual weight so the section reads as editorial rather than as a
 * bulleted list.
 */
const visuals: Array<{ kind: PhysiologyKind; label: string; caption: string }> = [
  { kind: 'spirometry', label: 'Volume–time trace', caption: 'Spirometry' },
  { kind: 'flow-volume', label: 'Flow–volume loop', caption: 'Flow–volume loops' },
  { kind: 'lung-volumes', label: 'Lung volume compartments', caption: 'Lung volumes' },
  { kind: 'body-box', label: 'Body plethysmography cabin', caption: 'Body plethysmography' },
  { kind: 'cpet', label: 'Cardiopulmonary exercise response', caption: 'CPET' },
];

export function PftBridge() {
  return (
    <Section
      id="from-pft"
      index="05"
      eyebrow="From the Workshop"
      title={
        <>
          From PFT Fundamentals
          <span className="block text-ink-600">to Advanced Pulmonary Medicine</span>
        </>
      }
      lede="The workshop was designed around understanding respiratory physiology, interpreting pulmonary function and exploring advanced respiratory diagnostics."
    >
      {/* Programme highlights */}
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {programmeHighlights.map((item, i) => (
          <li key={item.id} className="h-full">
            <Reveal delay={Math.min(i, 4) * 55} className="h-full">
              <div className="flex h-full flex-col rounded-card border border-line bg-white p-5 sm:p-6">
                <span className="flex items-center gap-3">
                  <span className="text-accent-600">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span className="section-index">{String(i + 1).padStart(2, '0')}</span>
                </span>
                <h3 className="mt-4 text-[0.9375rem] font-semibold leading-snug text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-600">
                  {item.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* What the measurements look like */}
      <Reveal delay={120}>
        <div className="mt-12 overflow-hidden rounded-card field-navy field-grid on-dark sm:mt-16">
          <div className="relative px-6 py-10 sm:px-10 sm:py-12">
            <h3 className="eyebrow-light">The measurements behind the day</h3>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
              {visuals.map((v) => (
                <li key={v.kind}>
                  <div className="aspect-[8/5] text-white/80">
                    <PhysiologyVisual kind={v.kind} label={v.label} />
                  </div>
                  <p className="mt-3 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-300">
                    {v.caption}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
