import { Link } from 'react-router-dom';
import { categories, categoryCounts, sessionOrder, talks } from '@/data/talks';
import { site } from '@/data/site';
import { track } from '@/lib/analytics';
import { Reveal } from '@/components/ui/Reveal';

/**
 * "Continue the Learning" (§8) — the bridge between the institutional story and
 * the library.
 *
 * Deliberately contains NO video elements. The brief is explicit that the home
 * page must not load every video; this section describes what is waiting and
 * hands off to /recordings, which is where playback lives.
 */
export function ContinueLearning() {
  const counts = categoryCounts();
  const sessions = sessionOrder();
  const tracks = categories.filter((c) => (counts[c.id] ?? 0) > 0);

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
      <div className="min-w-0">
        <Reveal>
          <p className="text-lede text-ink-600">
            Revisit the expert sessions from the {site.event} — presentation and speaker together,
            on any device, whenever you need them.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-6 sm:gap-x-10">
            <Stat label="Recorded talks" value={String(talks.length)} />
            <Stat label="Programme sessions" value={String(sessions.length)} />
            <Stat label="Topic tracks" value={String(tracks.length)} />
          </dl>
        </Reveal>
      </div>

      <Reveal delay={120} className="min-w-0">
        <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line">
          {tracks.map((track_) => (
            <li key={track_.id}>
              <Link
                to={`/recordings?topic=${track_.id}`}
                onClick={() => track({ name: 'library_filter', filter: `home-${track_.id}` })}
                className="group flex items-center gap-5 bg-white px-5 py-5 transition-colors duration-300 hover:bg-mist-50 sm:px-6"
              >
                <span className="section-index w-6 shrink-0 tabular-nums">
                  {String(counts[track_.id]).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-ink-900">{track_.label}</span>
                  <span className="mt-1 block truncate text-meta text-ink-500">{track_.blurb}</span>
                </span>
                <span
                  aria-hidden="true"
                  className="shrink-0 text-ink-300 transition-all duration-300 ease-editorial group-hover:translate-x-1 group-hover:text-accent-600"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-ink-400">
        {label}
      </dt>
      <dd className="mt-1.5 text-3xl font-semibold tabular-nums tracking-tight text-ink-900">
        {value}
      </dd>
    </div>
  );
}
