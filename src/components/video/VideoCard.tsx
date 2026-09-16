import { Link } from 'react-router-dom';
import { Clock, Layers3 } from 'lucide-react';
import type { Talk } from '@/data/types';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { StatusChip } from '@/components/ui/ContentStatus';
import { TalkThumbnail } from './TalkThumbnail';

/**
 * One recorded talk in the library grid.
 *
 * The whole card is a single link with one accessible name (§26) — the nested
 * text is aria-hidden from the link label and exposed visually only, so screen
 * readers announce "Watch session: <title>, <speaker>" rather than reading the
 * card four times over.
 */
export function VideoCard({ talk, className }: { talk: Talk; className?: string }) {
  return (
    <article className={cn('group relative flex flex-col', className)}>
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
        className="flex flex-1 flex-col rounded-card outline-offset-4"
        aria-label={`Watch session: ${talk.title}, ${talk.speaker}`}
      >
        <div className="relative overflow-hidden rounded-card shadow-card transition-shadow duration-500 ease-editorial group-hover:shadow-card-hover">
          <TalkThumbnail talk={talk} />
          {/* Top-right: the top-left of the thumbnail belongs to the programme mark. */}
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-pill bg-ink-950/80 px-2.5 py-1 text-[0.625rem] font-semibold tabular-nums text-white backdrop-blur-sm">
            <Clock className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
            {talk.duration}
          </span>
        </div>

        <div className="flex flex-1 flex-col pt-5">
          <p className="flex items-center gap-1.5 text-meta font-medium text-ink-500">
            <Layers3 className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            <span className="truncate">{talk.session}</span>
          </p>

          <h3 className="mt-2 text-subhead font-semibold leading-snug text-ink-900 transition-colors duration-300 group-hover:text-ink-700">
            {talk.title}
          </h3>

          <div className="mt-3 space-y-0.5">
            <p className="text-sm font-semibold text-ink-800">{talk.speaker}</p>
            <p className="text-meta text-ink-500">
              {talk.designation}
              {talk.designation && talk.institution ? ' · ' : ''}
              {talk.institution}
            </p>
          </div>

          <p className="mt-4 flex items-center gap-1.5 text-meta font-semibold uppercase tracking-[0.1em] text-accent-600">
            Watch session
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
            >
              →
            </span>
          </p>
        </div>
      </Link>

      <StatusChip status={talk.status} className="mt-4 self-start" />
    </article>
  );
}
