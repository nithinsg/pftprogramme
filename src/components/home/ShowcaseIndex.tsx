import { Link } from 'react-router-dom';
import { showcases } from '@/data/showcases';
import { track } from '@/lib/analytics';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import type { IconKey } from '@/data/types';

/**
 * The three capability cards (§6), used as a chapter index above the full
 * showcases. Each is deliberately spare — a number, a mark, a title and one
 * line — so the three read as equals and the detail lives further down.
 */
const iconFor: Record<string, IconKey> = {
  ecmo: 'heart-pulse',
  interventions: 'activity',
  'lung-transplant': 'wind',
};

export function ShowcaseIndex() {
  return (
    <ul className="grid gap-4 sm:gap-5 lg:grid-cols-3">
      {showcases.map((showcase, i) => (
        <li key={showcase.id} className="h-full">
          <Reveal delay={i * 80} className="h-full">
            <Link
              to={showcase.href}
              onClick={() =>
                track({
                  name: 'capability_card_click',
                  capability: showcase.id,
                  location: 'showcase-index',
                })
              }
              className="group flex h-full flex-col rounded-card border border-line bg-white p-6 transition-all duration-400 ease-editorial hover:-translate-y-1 hover:border-ink-200 hover:shadow-card-hover sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-line bg-mist-100 text-ink-700 transition-colors duration-400 group-hover:border-accent-300 group-hover:bg-accent-100 group-hover:text-accent-700">
                  <Icon name={iconFor[showcase.id]} className="h-5 w-5" />
                </span>
                <span className="section-index">{String(i + 1).padStart(2, '0')}</span>
              </div>

              <h3 className="mt-6 text-subhead font-semibold leading-tight text-ink-900">
                {showcase.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-600">{showcase.subtitle}</p>

              <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-meta font-semibold uppercase tracking-[0.1em] text-accent-600">
                {showcase.ctaLabel}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
