import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import type { Talk } from '@/data/types';
import { track } from '@/lib/analytics';
import { SpeakerAvatar } from './SpeakerAvatar';

/**
 * Compact "keep watching" rail shown under a session. Deliberately lighter than
 * the library grid — it should suggest, not compete with the talk just watched.
 */
export function RelatedTalks({ talks }: { talks: Talk[] }) {
  if (talks.length === 0) return null;

  return (
    <section aria-labelledby="related-talks-title">
      <div className="mb-6 flex items-baseline gap-4">
        <h2 id="related-talks-title" className="eyebrow">
          Related talks
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>

      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {talks.map((talk) => (
          <li key={talk.id}>
            <Link
              to={`/recordings/${talk.id}`}
              onClick={() =>
                track({
                  name: 'video_open',
                  talkId: talk.id,
                  title: talk.title,
                  category: talk.category,
                })
              }
              className="group flex h-full items-start gap-4 rounded-card border border-line bg-white p-4 transition-all duration-300 ease-editorial hover:border-ink-200 hover:shadow-card"
            >
              <span className="h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                <SpeakerAvatar name={talk.speaker} photo={talk.speakerPhoto} size="sm" />
              </span>

              <span className="min-w-0 flex-1">
                <span className="line-clamp-2 block text-sm font-semibold leading-snug text-ink-900 transition-colors group-hover:text-ink-700">
                  {talk.title}
                </span>
                <span className="mt-1.5 block truncate text-meta text-ink-500">{talk.speaker}</span>
                <span className="mt-1.5 flex items-center gap-1.5 text-[0.6875rem] tabular-nums text-ink-400">
                  <Clock className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
                  {talk.duration}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
