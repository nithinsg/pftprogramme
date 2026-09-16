import { FileVideo } from 'lucide-react';
import type { Talk } from '@/data/types';
import { cn } from '@/lib/cn';
import { Reveal } from '@/components/ui/Reveal';
import { VideoCard } from './VideoCard';

export function VideoGrid({
  talks,
  columns = 3,
  className,
}: {
  talks: Talk[];
  columns?: 2 | 3;
  className?: string;
}) {
  if (talks.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-line bg-mist-100 px-6 py-16 text-center">
        <FileVideo className="h-6 w-6 text-ink-300" strokeWidth={1.25} aria-hidden="true" />
        <p className="text-sm font-medium text-ink-700">No sessions in this category yet.</p>
        <p className="max-w-sm text-meta text-ink-500">
          Recordings are published here as post-production completes each session.
        </p>
      </div>
    );
  }

  return (
    <ul
      className={cn(
        'grid gap-x-6 gap-y-12 sm:gap-y-14',
        columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2',
        className,
      )}
    >
      {talks.map((talk, i) => (
        <li key={talk.id}>
          {/* Stagger caps at four steps — beyond that it reads as lag, not craft. */}
          <Reveal delay={Math.min(i, 3) * 70}>
            <VideoCard talk={talk} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
