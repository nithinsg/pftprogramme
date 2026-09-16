import { capabilities, capabilityGroups } from '@/data/capabilities';
import { site } from '@/data/site';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';

/**
 * The move from the individual to the institution.
 *
 * Grouped into Diagnostics / Intervention / Advanced Care so fifteen tiles read
 * as three ideas rather than a wall. Capability statements only — no volumes,
 * no outcomes, no claims of superiority.
 */
export function CapabilitySection() {
  return (
    <Section
      id="capabilities"
      tone="mist"
      index="04"
      eyebrow={`${site.hospital}, ${site.centre}`}
      title={
        <>
          More Than a Workshop.
          <span className="block text-ink-600">An Ecosystem of Advanced Pulmonary Care.</span>
        </>
      }
      lede={`${site.hospital}, ${site.centre} brings together clinical expertise, advanced diagnostics, interventional pulmonology, critical care and complex respiratory care.`}
    >
      <div className="space-y-12 sm:space-y-14">
        {capabilityGroups.map((group, groupIndex) => {
          const items = capabilities.filter((c) => c.group === group);
          if (items.length === 0) return null;

          return (
            <div key={group}>
              <Reveal>
                <div className="mb-6 flex items-baseline gap-4">
                  <h3 className="eyebrow">{group}</h3>
                  <span aria-hidden="true" className="h-px flex-1 bg-line" />
                  <span className="section-index">
                    {String(groupIndex + 1).padStart(2, '0')}
                  </span>
                </div>
              </Reveal>

              <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
                {items.map((item, i) => (
                  <li key={item.id} className="h-full">
                    <Reveal delay={Math.min(i, 4) * 50} className="h-full">
                      <div className="flex h-full flex-col rounded-card border border-line bg-white p-5 transition-colors duration-400 hover:border-ink-200 sm:p-6">
                        <span className="text-ink-700">
                          <Icon name={item.icon} className="h-5 w-5" />
                        </span>
                        <h4 className="mt-4 text-[0.9375rem] font-semibold leading-snug text-ink-900">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-600">
                          {item.summary}
                        </p>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
