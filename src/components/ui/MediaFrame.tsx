import { ImageIcon } from 'lucide-react';
import type { MediaSlot } from '@/data/types';
import { cn } from '@/lib/cn';
import { config } from '@/lib/config';

type Ratio = '16/9' | '4/3' | '3/2' | '1/1' | '9/16';

const ratioClass: Record<Ratio, string> = {
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '3/2': 'aspect-[3/2]',
  '1/1': 'aspect-square',
  '9/16': 'aspect-[9/16]',
};

/**
 * An image slot. Renders the real asset when the content team has supplied one,
 * otherwise a designed placeholder carrying the shot brief — so the page still
 * reads as finished during review, and the photographer knows what to shoot.
 *
 * Images are lazy-loaded and async-decoded by default (§25).
 */
/**
 * True when this slot has something worth rendering: a real asset, or the
 * designed placeholder while the team is still in review mode.
 */
export const hasMedia = (media: MediaSlot): boolean =>
  Boolean(media.src) || config.showPlaceholders;

export function MediaFrame({
  media,
  ratio = '16/9',
  className,
  priority = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  overlay = false,
}: {
  media: MediaSlot;
  ratio?: Ratio;
  className?: string;
  /** Set on the hero image only — everything else stays lazy. */
  priority?: boolean;
  sizes?: string;
  /** Adds a navy scrim, for when type sits on top. */
  overlay?: boolean;
}) {
  const hasImage = Boolean(media.src);
  if (!hasMedia(media)) return null;

  return (
    <figure
      className={cn(
        'relative overflow-hidden rounded-card bg-mist-200',
        ratioClass[ratio],
        className,
      )}
    >
      {hasImage ? (
        <img
          src={media.src}
          alt={media.alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 field-navy field-grid">
          <div className="relative flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
            <ImageIcon className="h-6 w-6 text-white/35" strokeWidth={1.25} aria-hidden="true" />
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white/50">
              Image slot
            </p>
            {config.showPlaceholders && media.brief && (
              <p className="max-w-sm text-xs leading-relaxed text-white/45">{media.brief}</p>
            )}
            <span className="sr-only">{media.alt}</span>
          </div>
        </div>
      )}

      {overlay && hasImage && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/25 to-transparent"
        />
      )}
    </figure>
  );
}
