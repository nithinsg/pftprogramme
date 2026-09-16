import { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, X } from 'lucide-react';
import type { Session } from '@/data/types';
import { adjacentSessions } from '@/data/sessions';
import { event } from '@/data/site';
import { track } from '@/lib/analytics';
import { useLockBodyScroll } from '@/lib/hooks';
import { cn } from '@/lib/cn';
import { StatusChip } from '@/components/ui/ContentStatus';
import { VideoPlayer, LayoutBadge } from './VideoPlayer';
import { SessionThumbnail } from './SessionThumbnail';
import { SpeakerAvatar } from './SpeakerAvatar';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SESSION PLAYER — a modal, not a page
 * ─────────────────────────────────────────────────────────────────────────────
 * The brief keeps this a single-page experience, so opening a recording must
 * not navigate away. This is the modal option: it keeps the visitor's scroll
 * position, keeps the page's story intact behind them, and on a phone it gives
 * the player the entire screen width.
 *
 * Accessibility, because a modal that traps a keyboard user is worse than no
 * modal: `role="dialog"` + `aria-modal`, focus moved in on open and restored on
 * close, Tab cycled within the dialog, Escape closes, background scroll locked,
 * and the backdrop is click-to-dismiss.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function VideoModal({
  session,
  onClose,
  onSelect,
}: {
  session: Session;
  onClose: () => void;
  /** Switch to another recording without leaving the modal. */
  onSelect: (next: Session) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);
  const more = adjacentSessions(session.id);

  useLockBodyScroll(true);

  // Remember what had focus, move focus into the dialog, restore on unmount.
  useEffect(() => {
    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => restoreFocusTo.current?.focus?.();
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), video[controls], iframe, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
      onKeyDown={onKeyDown}
    >
      <div
        className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="session-modal-title"
        className={cn(
          'relative flex max-h-[94svh] w-full flex-col overflow-y-auto bg-white shadow-lift',
          'animate-fade-rise rounded-t-2xl sm:max-w-4xl sm:rounded-card',
        )}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start gap-4 border-b border-line bg-white/95 px-5 py-4 backdrop-blur-md sm:px-7 sm:py-5">
          <div className="min-w-0 flex-1">
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-accent-600">
              {event.name}
            </p>
            <h2
              id="session-modal-title"
              className="mt-1.5 text-lg font-semibold leading-snug text-ink-900 sm:text-xl"
            >
              {session.title}
            </h2>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close the session player"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-ink-500 transition-colors hover:bg-mist-200 hover:text-ink-900"
          >
            <X className="h-5 w-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Player — full width on a phone, where every pixel is slide legibility */}
        <VideoPlayer
          source={session.video}
          title={session.title}
          analyticsId={session.id}
          autoStart
          poster={<SessionThumbnail session={session} size="hero" showPlayAffordance={false} />}
        />

        <div className="px-5 py-6 sm:px-7 sm:py-8">
          {/* Speaker */}
          <div className="flex items-start gap-4">
            <span className="h-14 w-14 shrink-0 overflow-hidden rounded-xl">
              <SpeakerAvatar name={session.speaker} photo={session.speakerPhoto} size="sm" />
            </span>
            <div className="min-w-0">
              <p className="text-base font-semibold text-ink-900">{session.speaker}</p>
              <p className="text-sm text-ink-600">{session.designation}</p>
              <p className="text-meta text-ink-500">{session.institution}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <LayoutBadge layout={session.video.layout} />
            <StatusChip status={session.status} label="Session details to be added" />
          </div>

          {/* About */}
          <h3 className="eyebrow mt-8">About this session</h3>
          <p className="mt-4 text-base leading-relaxed text-ink-700">{session.description}</p>

          {/* More */}
          {more.length > 0 && (
            <div className="mt-10 border-t border-line pt-8">
              <h3 className="eyebrow">More recorded sessions</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                {more.map((next) => (
                  <li key={next.id}>
                    <button
                      type="button"
                      onClick={() => {
                        onSelect(next);
                        track({
                          name: 'session_open',
                          sessionId: next.id,
                          title: next.title,
                          category: next.category,
                        });
                      }}
                      className="group w-full overflow-hidden rounded-card border border-line text-left transition-all duration-300 ease-editorial hover:border-ink-200 hover:shadow-card"
                    >
                      <SessionThumbnail session={next} />
                      <span className="block p-3">
                        <span className="line-clamp-2 block text-[0.8125rem] font-semibold leading-snug text-ink-900">
                          {next.title}
                        </span>
                        <span className="mt-1 flex items-center gap-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-accent-600">
                          Watch
                          <ArrowRight
                            className="h-3 w-3 transition-transform duration-300 ease-editorial group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
