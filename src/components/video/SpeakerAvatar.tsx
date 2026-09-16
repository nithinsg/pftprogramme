import { User } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * A name is a placeholder while it still carries the brief's bracket notation,
 * e.g. "Dr. [Speaker Name]". Those get a neutral glyph rather than initials —
 * "[Name]" would otherwise reduce to the monogram "NA", which reads as "not
 * applicable" and looks like a bug.
 */
export const isPlaceholderName = (name: string): boolean => /[[\]]/.test(name);

/** "Dr. Asha Menon" → "AM". Honorifics are stripped first. */
export function initialsOf(name: string): string {
  const cleaned = name
    .replace(/[[\]]/g, '')
    .replace(/^(Dr\.?|Prof\.?|Mr\.?|Ms\.?|Mrs\.?)\s+/i, '')
    .trim();

  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 0) return '—';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/**
 * Speaker portrait. Falls back to a typographic monogram so the thumbnail
 * system stays visually consistent before photography is delivered — and so no
 * stock portrait ever stands in for a real clinician.
 */
export function SpeakerAvatar({
  name,
  photo,
  className,
  size = 'md',
}: {
  name: string;
  photo?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const monogramSize = { sm: 'text-sm', md: 'text-lg', lg: 'text-2xl sm:text-3xl' }[size];
  const iconSize = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-9 w-9' }[size];

  if (photo) {
    return (
      <img
        src={photo}
        alt={`Portrait of ${name.replace(/[[\]]/g, '')}`}
        loading="lazy"
        decoding="async"
        className={cn('h-full w-full object-cover object-top', className)}
      />
    );
  }

  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-700 to-ink-900',
        className,
      )}
      role="img"
      aria-label={
        isPlaceholderName(name)
          ? 'Speaker portrait to be supplied'
          : `Portrait placeholder for ${name}`
      }
    >
      {isPlaceholderName(name) ? (
        <User
          className={cn('text-white/40', iconSize)}
          strokeWidth={1.25}
          aria-hidden="true"
        />
      ) : (
        <span
          className={cn('font-semibold tracking-[0.06em] text-white/70', monogramSize)}
          aria-hidden="true"
        >
          {initialsOf(name)}
        </span>
      )}
    </div>
  );
}
