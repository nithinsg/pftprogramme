import { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { eventScreenSlots, totalLoopSeconds } from '@/data/eventScreen';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';
import { usePrefersReducedMotion } from '@/lib/hooks';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * EVENT-DAY VERTICAL LOOP — LIVE PREVIEW (§12–§14)
 * ─────────────────────────────────────────────────────────────────────────────
 * This is not decoration. It is the approval tool.
 *
 * The brief requires the vertical creative to be signed off BEFORE the event.
 * Rather than circulating a PDF storyboard, this plays the loop at its real
 * timings in a 9:16 frame, so the team can judge whether each card holds long
 * enough to be read by someone walking past — the only question that matters
 * for a silent venue screen.
 *
 * Once the editor delivers real footage, set `media.src` on a slot in
 * `src/data/eventScreen.ts` and it plays here in place of the title card.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function VerticalVideoShowcase({ className }: { className?: string }) {
  const slots = eventScreenSlots;
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const reducedMotion = usePrefersReducedMotion();
  const raf = useRef<number>();
  const last = useRef<number>(0);

  const current = slots[index];

  const advance = useCallback(() => {
    setIndex((i) => (i + 1) % slots.length);
    setElapsed(0);
  }, [slots.length]);

  useEffect(() => {
    if (!playing) return;

    last.current = performance.now();
    const tick = (now: number) => {
      const delta = (now - last.current) / 1000;
      last.current = now;

      setElapsed((e) => {
        const next = e + delta;
        if (next >= current.durationSeconds) {
          advance();
          return 0;
        }
        return next;
      });

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [playing, current.durationSeconds, advance]);

  // Auto-play is the whole point of a venue loop, but it should never override
  // a stated motion preference.
  useEffect(() => {
    if (reducedMotion) setPlaying(false);
  }, [reducedMotion]);

  const progress = Math.min(elapsed / current.durationSeconds, 1);

  return (
    <div className={cn('flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10', className)}>
      {/* The 9:16 screen */}
      <div className="mx-auto w-full max-w-[19rem] shrink-0">
        <div className="relative aspect-[9/16] overflow-hidden rounded-[1.75rem] border-[6px] border-ink-900 bg-ink-950 shadow-lift">
          {/* Slot progress — one segment per card, like a story rail. */}
          <div className="absolute inset-x-3 top-3 z-20 flex gap-1">
            {slots.map((slot, i) => (
              <span key={slot.id} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/25">
                <span
                  className="block h-full bg-white"
                  style={{
                    width: i < index ? '100%' : i === index ? `${progress * 100}%` : '0%',
                  }}
                />
              </span>
            ))}
          </div>

          <VerticalFrame key={current.id} slot={current} />

          {/* Loop-position readout */}
          <p className="absolute inset-x-0 bottom-3 z-20 text-center text-[0.5625rem] font-medium uppercase tracking-[0.18em] text-white/40">
            {String(current.order).padStart(2, '0')} / {String(slots.length).padStart(2, '0')}
            <span aria-hidden="true"> · </span>
            {current.durationSeconds}s
          </p>
        </div>

        {/* Preview transport — not part of the delivered reel. */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <ControlButton
            onClick={() => setPlaying((p) => !p)}
            label={playing ? 'Pause preview' : 'Play preview'}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </ControlButton>
          <ControlButton
            onClick={() => {
              setIndex(0);
              setElapsed(0);
            }}
            label="Restart preview from the first card"
          >
            <RotateCcw className="h-4 w-4" />
          </ControlButton>
          <p className="ml-2 text-meta tabular-nums text-ink-500">
            Loop {totalLoopSeconds}s <span aria-hidden="true">·</span> 1080 × 1920
          </p>
        </div>
      </div>

      {/* Slot list — doubles as the shot list for the editor */}
      <ol className="min-w-0 flex-1 space-y-px overflow-hidden rounded-card border border-line bg-line">
        {slots.map((slot, i) => {
          const active = i === index;
          return (
            <li key={slot.id}>
              <button
                type="button"
                onClick={() => {
                  setIndex(i);
                  setElapsed(0);
                }}
                aria-current={active}
                className={cn(
                  'flex w-full items-start gap-4 px-4 py-4 text-left transition-colors duration-250 sm:px-5',
                  active ? 'bg-ink-900 text-white' : 'bg-white hover:bg-mist-50',
                )}
              >
                <span
                  className={cn(
                    'section-index mt-0.5 w-6 shrink-0 tabular-nums',
                    active && 'text-white/45',
                  )}
                >
                  {String(slot.order).padStart(2, '0')}
                </span>

                <span className="min-w-0 flex-1">
                  <span
                    className={cn(
                      'block text-sm font-semibold leading-snug',
                      active ? 'text-white' : 'text-ink-900',
                    )}
                  >
                    {slot.headline}
                  </span>
                  <span
                    className={cn(
                      'mt-1 block text-[0.8125rem] leading-relaxed',
                      active ? 'text-ink-200' : 'text-ink-500',
                    )}
                  >
                    {slot.direction}
                  </span>
                </span>

                <span
                  className={cn(
                    'shrink-0 text-[0.6875rem] tabular-nums',
                    active ? 'text-white/50' : 'text-ink-400',
                  )}
                >
                  {slot.durationSeconds}s
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/** One 9:16 card. Renders supplied footage when it exists, the title card otherwise. */
function VerticalFrame({ slot }: { slot: (typeof eventScreenSlots)[number] }) {
  const { media, headline, subline } = slot;

  return (
    <div className="field-navy field-grid absolute inset-0 animate-fade-in">
      {media.src && media.type === 'video' && (
        <video
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          src={media.src}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
      )}
      {media.src && media.type === 'image' && (
        <img
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          src={media.src}
          alt=""
          loading="lazy"
          decoding="async"
        />
      )}

      <div className="relative flex h-full flex-col justify-end p-6 pb-14">
        <span aria-hidden="true" className="mb-4 block h-px w-10 bg-accent-400" />
        <p className="text-[1.375rem] font-semibold leading-[1.1] tracking-[-0.02em] text-white [text-wrap:balance]">
          {headline}
        </p>
        {subline && <p className="mt-2.5 text-[0.8125rem] leading-snug text-ink-200">{subline}</p>}
      </div>

      {/* Persistent brand corner — present on every card in the loop. */}
      <p className="absolute left-6 top-8 text-[0.5625rem] font-semibold uppercase leading-relaxed tracking-[0.18em] text-white/50">
        {site.hospital}
        <span className="block text-white/30">{site.centre}</span>
      </p>
    </div>
  );
}

function ControlButton({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white text-ink-700 transition-colors hover:border-ink-300 hover:bg-mist-100"
    >
      {children}
    </button>
  );
}
