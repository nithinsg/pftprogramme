import { Play } from 'lucide-react';
import type { Session, ShowcaseVideo } from '@/data/types';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';
import { SpeakerAvatar } from './SpeakerAvatar';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THE THUMBNAIL SYSTEM
 * ─────────────────────────────────────────────────────────────────────────────
 * Every recording gets the same construction:
 *
 *   PULMO MENTOR · PFT        ← programme mark
 *   [Session title]           ← the one thing that changes
 *   [Speaker] · [Institution]
 *   YASHODA HOSPITALS · SOMAJIGUDA      [speaker portrait, right]
 *
 * DRAWN IN CSS rather than exported as an image, which means zero image
 * requests, crisp at every density including 3× phone screens, and the
 * speaker's name is real text — searchable and screen-readable. A designed
 * JPEG still wins when one exists: set `video.thumbnail`.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function SessionThumbnail({
  session,
  size = 'card',
  showPlayAffordance = true,
  className,
}: {
  session: Session;
  size?: 'card' | 'hero';
  showPlayAffordance?: boolean;
  className?: string;
}) {
  const hero = size === 'hero';

  if (session.video.thumbnail) {
    return (
      <div className={cn('relative aspect-video overflow-hidden bg-ink-900', className)}>
        <img
          src={session.video.thumbnail}
          alt={`${session.title} — ${session.speaker}`}
          loading="lazy"
          decoding="async"
          sizes={hero ? '(min-width: 1024px) 60vw, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
        />
        {showPlayAffordance && <PlayBadge hero={hero} />}
      </div>
    );
  }

  return (
    <div className={cn('field-navy field-grid relative aspect-video overflow-hidden', className)}>
      {/* Speaker portrait — right-aligned, feathered into the field. */}
      <div className={cn('absolute inset-y-0 right-0 overflow-hidden', hero ? 'w-[36%]' : 'w-[32%]')}>
        <div className="h-full w-full opacity-90 [mask-image:linear-gradient(to_right,transparent,#000_38%)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_38%)]">
          <SpeakerAvatar name={session.speaker} photo={session.speakerPhoto} size={hero ? 'lg' : 'md'} />
        </div>
      </div>

      <div
        className={cn(
          'relative flex h-full flex-col justify-between',
          hero ? 'p-6 sm:p-8' : 'p-4 sm:p-5',
        )}
      >
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className={cn('h-px bg-accent-400', hero ? 'w-8' : 'w-5')} />
          <span
            className={cn(
              'font-semibold uppercase tracking-[0.18em] text-accent-300',
              hero ? 'text-[0.6875rem] sm:text-xs' : 'text-[0.5625rem]',
            )}
          >
            Pulmo Mentor <span className="text-accent-300/60">·</span> PFT
          </span>
        </div>

        <div className={cn('max-w-[70%]', hero && 'max-w-[64%]')}>
          <p
            className={cn(
              'font-semibold leading-tight text-white [text-wrap:balance]',
              hero ? 'line-clamp-3 text-xl sm:text-2xl' : 'line-clamp-2 text-[0.9375rem] sm:text-base',
            )}
          >
            {session.title}
          </p>
          <p
            className={cn(
              'mt-2 truncate font-medium text-ink-200',
              hero ? 'text-sm sm:text-base' : 'text-[0.6875rem] sm:text-xs',
            )}
          >
            {session.speaker}
          </p>
          <p
            className={cn(
              'truncate text-ink-300/80',
              hero ? 'text-xs sm:text-sm' : 'text-[0.625rem] sm:text-[0.6875rem]',
            )}
          >
            {session.institution}
          </p>
        </div>

        <p
          className={cn(
            'font-semibold uppercase leading-tight tracking-[0.14em] text-white/45',
            hero ? 'text-[0.625rem] sm:text-[0.6875rem]' : 'text-[0.5rem] sm:text-[0.5625rem]',
          )}
        >
          {site.hospital}
          <span className="block text-white/30">{site.centre}</span>
        </p>
      </div>

      {showPlayAffordance && <PlayBadge hero={hero} />}
    </div>
  );
}

/** Poster for a curated official Yashoda video. Same family, different content. */
export function ShowcaseThumbnail({ item, className }: { item: ShowcaseVideo; className?: string }) {
  if (item.video.thumbnail) {
    return (
      <div className={cn('relative aspect-video overflow-hidden bg-ink-900', className)}>
        <img
          src={item.video.thumbnail}
          alt={item.title}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03]"
        />
        <PlayBadge hero={false} />
      </div>
    );
  }

  return (
    <div className={cn('field-navy field-grid relative aspect-video overflow-hidden', className)}>
      <div className="relative flex h-full flex-col justify-between p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="h-px w-5 bg-accent-400" />
          <span className="text-[0.5625rem] font-semibold uppercase tracking-[0.18em] text-accent-300">
            {item.category}
          </span>
        </div>

        <div className="max-w-[80%]">
          <p className="line-clamp-2 text-[0.9375rem] font-semibold leading-tight text-white sm:text-base">
            {item.title}
          </p>
          <p className="mt-2 truncate text-[0.6875rem] font-medium text-ink-200 sm:text-xs">
            {item.doctor}
          </p>
        </div>

        <p className="text-[0.5rem] font-semibold uppercase leading-tight tracking-[0.14em] text-white/45 sm:text-[0.5625rem]">
          {site.hospital}
          <span className="block text-white/30">{site.centre}</span>
        </p>
      </div>
      <PlayBadge hero={false} />
    </div>
  );
}

function PlayBadge({ hero }: { hero: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute grid place-items-center rounded-full bg-white/95 text-ink-900 shadow-lift',
        'transition-all duration-300 ease-editorial group-hover:scale-105 group-hover:bg-white',
        hero ? 'bottom-5 right-5 h-14 w-14' : 'bottom-3 right-3 h-10 w-10 sm:h-11 sm:w-11',
      )}
    >
      <Play className={cn('translate-x-[1px] fill-current', hero ? 'h-5 w-5' : 'h-4 w-4')} />
    </div>
  );
}

