import { departmentProfile } from '@/data/doctors';
import { Reveal } from '@/components/ui/Reveal';

/**
 * "Pulmonology at Somajiguda" (§5) — the department overview the delegate meets
 * before any capability claim or any video.
 *
 * Capability statements only. No volumes, no outcomes, no awards.
 */
export function DepartmentProfile() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-16">
      <div className="min-w-0">
        <Reveal>
          <p className="text-lede font-medium text-ink-800">{departmentProfile.lede}</p>
        </Reveal>

        {departmentProfile.body.map((paragraph, i) => (
          <Reveal key={i} delay={80 + i * 70}>
            <p className="mt-5 text-base leading-relaxed text-ink-600">{paragraph}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120} className="min-w-0">
        <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
          {departmentProfile.pillars.map((pillar) => (
            <li key={pillar.title} className="bg-white p-5 sm:p-6">
              <h3 className="text-sm font-semibold text-ink-900">{pillar.title}</h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-600">
                {pillar.description}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}
