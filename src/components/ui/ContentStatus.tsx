import type { ReactNode } from 'react';
import { AlertCircle, FileCheck2 } from 'lucide-react';
import type { ContentStatus } from '@/data/types';
import { config } from '@/lib/config';
import { cn } from '@/lib/cn';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CONTENT GOVERNANCE
 * ─────────────────────────────────────────────────────────────────────────────
 * One rule, enforced in one place:
 *
 *   VITE_SHOW_PLACEHOLDERS=true   → review mode. Unverified content renders
 *                                   with a visible marker, so the team can see
 *                                   exactly what still needs supplying.
 *   VITE_SHOW_PLACEHOLDERS=false  → go-live. Unverified content does not render
 *                                   at all. Nothing unchecked reaches a visitor.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Should this item appear at all? */
export const isVisible = (status: ContentStatus): boolean =>
  status === 'verified' || config.showPlaceholders;

/** Should the marker be drawn on it? */
export const isMarked = (status: ContentStatus): boolean =>
  status !== 'verified' && config.showPlaceholders;

/** Filter any list of content records down to what may be shown. */
export const visibleOnly = <T extends { status: ContentStatus }>(items: T[]): T[] =>
  items.filter((item) => isVisible(item.status));

/** Small inline chip pinned to an unverified block. */
export function StatusChip({
  status,
  label,
  className,
}: {
  status: ContentStatus;
  label?: string;
  className?: string;
}) {
  if (!isMarked(status)) return null;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill border border-dashed border-accent-400/70',
        'bg-accent-100/70 px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-accent-700',
        className,
      )}
    >
      <AlertCircle className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
      {label ?? 'Content to be supplied'}
    </span>
  );
}

/** Full-width note explaining what the content team still owes this section. */
export function ApprovalNote({ children }: { children: ReactNode }) {
  if (!config.showPlaceholders) return null;

  return (
    <aside
      className="flex items-start gap-3 rounded-card border border-dashed border-accent-300 bg-accent-100/50 p-4 sm:p-5"
      aria-label="Note for the content team"
    >
      <FileCheck2
        className="mt-0.5 h-4 w-4 shrink-0 text-accent-600"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <p className="text-[0.8125rem] leading-relaxed text-accent-700">{children}</p>
    </aside>
  );
}
