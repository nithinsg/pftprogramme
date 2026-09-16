import { Play } from 'lucide-react';
import type { Talk } from '@/data/types';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';
import { SpeakerAvatar } from './SpeakerAvatar';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THE THUMBNAIL SYSTEM (§29)
 * ─────────────────────────────────────────────────────────────────────────────
 * Every recording gets the same thumbnail construction:
 *
 *   PULMO MENTOR BFD          ← programme mark
 *   [Talk title]              ← the one thing that changes
 *   Dr. [Name] · [Institution]
 *   YASHODA HOSPITALS · SOMAJIGUDA
 *   [speaker portrait, prominent, right]
 *
 * It is DRAWN IN CSS rather than exported as an image, which means:
 *   · zero image requests and nothing to re-export when a title changes
 *   · crisp at every density, including 3× phone screens
 *   · the speaker's name is real text — searchable, translatable, screen-readable
 *
 * A designed JPEG still wins when one exists: set `talk.thumbnail` and it is
 * used instead, with this construction as the fallback.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function TalkThumbnail({
  talk,
  size = 'card',
  showPlayAffordance = true,
  className,
}: {
  talk: Talk;
  size?: 'card' | 'hero';
  showPlayAffordance?: boolean;
  className?: string;
}) {
  const hero = size === 'hero';

  if (talk.thumbnail) {
    return (
      <div className={cn('relative aspect-video overflow-hidden rounded-card bg-ink-900', className)}>
        <img
          src={talk.thumbnail}
          alt={`${talk.title} — ${talk.speaker}`}
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
    <div
      className={cn(
        'field-navy field-grid relative aspect-video overflow-hidden rounded-card',
        className,
      )}
    >
      {/* Speaker portrait — prominent, right-aligned, feathered into the field. */}
      <div
        className={cn(
          'absolute inset-y-0 right-0 overflow-hidden',
          hero ? 'w-[38%]' : 'w-[34%]',
        )}
      >
        <div className="h-full w-full opacity-90 [mask-image:linear-gradient(to_right,transparent,#000_38%)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_38%)]">
          <SpeakerAvatar name={talk.speaker} photo={talk.speakerPhoto} size={hero ? 'lg' : 'md'} />
        </div>
      </div>

      {/* Editorial text block */}
      <div
        className={cn(
          'relative flex h-full flex-col justify-between',
          hero ? 'p-6 sm:p-8 lg:p-10' : 'p-4 sm:p-5',
        )}
      >
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className={cn('h-px bg-accent-400', hero ? 'w-8' : 'w-5')}
          />
          <span
            className={cn(
              'font-semibold uppercase tracking-[0.18em] text-accent-300',
              hero ? 'text-[0.6875rem] sm:text-xs' : 'text-[0.5625rem]',
            )}
          >
            {site.eventShort}
          </span>
        </div>

        <div className={cn('max-w-[68%]', hero && 'max-w-[62%]')}>
          <p
            className={cn(
              'font-semibold leading-tight text-white [text-wrap:balance]',
              hero
                ? 'line-clamp-3 text-xl sm:text-2xl lg:text-[1.75rem]'
                : 'line-clamp-2 text-[0.9375rem] sm:text-base',
            )}
          >
            {talk.title}
          </p>
          <p
            className={cn(
              'mt-2 truncate font-medium text-ink-200',
              hero ? 'text-sm sm:text-base' : 'text-[0.6875rem] sm:text-xs',
            )}
          >
            {talk.speaker}
          </p>
          <p
            className={cn(
              'truncate text-ink-300/80',
              hero ? 'text-xs sm:text-sm' : 'text-[0.625rem] sm:text-[0.6875rem]',
            )}
          >
            {talk.institution}
          </p>
        </div>

        <div className="flex items-end justify-between gap-3">
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
      </div>

      {showPlayAffordance && <PlayBadge hero={hero} />}
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
        hero
          ? 'bottom-5 right-5 h-14 w-14 sm:bottom-7 sm:right-7 sm:h-16 sm:w-16'
          : 'bottom-3 right-3 h-10 w-10 sm:h-11 sm:w-11',
      )}
    >
      <Play className={cn('translate-x-[1px] fill-current', hero ? 'h-5 w-5' : 'h-4 w-4')} />
    </div>
  );
}
