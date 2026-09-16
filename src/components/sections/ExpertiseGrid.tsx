import { expertise } from '@/data/doctor';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';

/**
 * The course director's areas of expertise, from the official profile as
 * supplied. Icon, two or three words, one line — the grid is meant to be
 * scanned, not read.
 */
export function ExpertiseGrid() {
  return (
    <Section
      id="expertise"
      index="03"
      eyebrow="Areas of Expertise"
      title="Where the clinical work sits."
      lede="Diagnostic and therapeutic pulmonary intervention, sleep medicine, and the advanced respiratory care that sits behind them."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {expertise.map((area, i) => (
          <li key={area.id} className="h-full">
            <Reveal delay={Math.min(i, 5) * 55} className="h-full">
              <div className="group flex h-full flex-col rounded-card border border-line bg-white p-6 transition-all duration-400 ease-editorial hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-card">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-mist-100 text-ink-700 transition-colors duration-400 group-hover:border-accent-300 group-hover:bg-accent-100 group-hover:text-accent-700">
                  <Icon name={area.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold leading-snug text-ink-900">
                  {area.title}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-600">
                  {area.description}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
