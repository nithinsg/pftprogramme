import { Link } from 'react-router-dom';
import type { Capability } from '@/data/types';
import { capabilities } from '@/data/capabilities';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { visibleOnly } from '@/components/ui/ContentStatus';

/**
 * Capability tile (§7). Icon, two words, one line. Nothing more — the brief asks
 * for minimal copy here, and ten tiles of dense paragraphs would defeat the
 * purpose of the section.
 */
export function CapabilityCard({ capability }: { capability: Capability }) {
  const inner = (
    <>
      <span
        className={cn(
          'grid h-11 w-11 place-items-center rounded-xl border border-line bg-mist-100 text-ink-700',
          'transition-colors duration-400 ease-editorial',
          capability.href && 'group-hover:border-accent-300 group-hover:bg-accent-100 group-hover:text-accent-700',
        )}
      >
        <Icon name={capability.icon} className="h-5 w-5" />
      </span>

      <h3 className="mt-5 text-base font-semibold leading-snug text-ink-900">{capability.title}</h3>
      <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-600">{capability.summary}</p>

      {capability.href && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-accent-600">
          Explore
          <span
            aria-hidden="true"
            className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      )}
    </>
  );

  const shell =
    'group flex h-full flex-col rounded-card border border-line bg-white p-5 transition-all duration-400 ease-editorial sm:p-6';

  if (capability.href) {
    return (
      <Link
        to={capability.href}
        onClick={() =>
          track({ name: 'capability_card_click', capability: capability.id, location: 'capability-grid' })
        }
        className={cn(shell, 'hover:-translate-y-0.5 hover:border-ink-200 hover:shadow-card-hover')}
      >
        {inner}
      </Link>
    );
  }

  return <div className={cn(shell, 'hover:border-ink-200')}>{inner}</div>;
}

export function CapabilityGrid({ items = capabilities }: { items?: Capability[] }) {
  const visible = visibleOnly(items);
  if (visible.length === 0) return null;

  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
      {visible.map((capability, i) => (
        <li key={capability.id} className="h-full">
          <Reveal delay={Math.min(i, 5) * 55} className="h-full">
            <CapabilityCard capability={capability} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
