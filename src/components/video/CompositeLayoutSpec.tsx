import { useState } from 'react';
import { cn } from '@/lib/cn';
import { site } from '@/data/site';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THE COMPOSITE FRAMING, TO SCALE (§10, §11)
 * ─────────────────────────────────────────────────────────────────────────────
 * The brief's hard requirement is that the presentation and the speaker are
 * both visible and that the slides stay readable on a phone. Those two pull
 * against each other, and the argument is always settled by looking — so this
 * draws the exact framing at real device widths.
 *
 * Switch to 360px and read the mock slide. If the axis labels are legible there,
 * the framing works; if they are not, the inset is too large or the deck's type
 * is too small — and the fix belongs in the slide template, not in the player.
 * ─────────────────────────────────────────────────────────────────────────────
 */

const WIDTHS = [
  { id: 'phone', label: 'Phone', px: 360, note: 'iPhone SE / small Android — the worst case' },
  { id: 'phone-lg', label: 'Large phone', px: 414, note: 'The most common delegate device' },
  { id: 'tablet', label: 'Tablet', px: 768, note: 'iPad portrait' },
  { id: 'desktop', label: 'Desktop', px: 1024, note: 'Laptop, contained in the page grid' },
] as const;

export function CompositeLayoutSpec() {
  const [width, setWidth] = useState<(typeof WIDTHS)[number]>(WIDTHS[0]);
  const [annotated, setAnnotated] = useState(true);

  return (
    <div>
      {/* Device width switcher */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-400">
          Render at
        </span>
        {WIDTHS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setWidth(option)}
            aria-pressed={width.id === option.id}
            className={cn(
              'inline-flex h-10 items-center gap-2 rounded-pill border px-4 text-[0.8125rem] font-medium transition-colors duration-250',
              width.id === option.id
                ? 'border-ink-900 bg-ink-900 text-white'
                : 'border-line bg-white text-ink-700 hover:border-ink-300 hover:bg-mist-100',
            )}
          >
            {option.label}
            <span className={cn('tabular-nums text-[0.6875rem]', width.id === option.id ? 'text-white/60' : 'text-ink-400')}>
              {option.px}
            </span>
          </button>
        ))}

        <button
          type="button"
          onClick={() => setAnnotated((a) => !a)}
          aria-pressed={annotated}
          className="ml-auto inline-flex h-10 items-center rounded-pill border border-line bg-white px-4 text-[0.8125rem] font-medium text-ink-700 transition-colors hover:border-ink-300 hover:bg-mist-100"
        >
          {annotated ? 'Hide guides' : 'Show guides'}
        </button>
      </div>

      <p className="mt-3 text-meta text-ink-500">{width.note}</p>

      {/* The frame, rendered at the chosen width */}
      <div className="mt-6 overflow-x-auto rounded-card bg-mist-200 p-4 sm:p-8">
        <div className="mx-auto" style={{ width: width.px, maxWidth: '100%' }}>
          <CompositeFrame annotated={annotated} />
          <p className="mt-3 text-center text-[0.6875rem] tabular-nums text-ink-500">
            {width.px} × {Math.round((width.px * 9) / 16)} CSS px
            <span aria-hidden="true"> · </span>16:9
          </p>
        </div>
      </div>
    </div>
  );
}

function CompositeFrame({ annotated }: { annotated: boolean }) {
  // `container-type: inline-size` makes every size below scale with the frame,
  // so the 360px render is a true miniature of the 1024px one — which is the
  // only way this comparison means anything.
  return (
    <div className="relative aspect-video overflow-hidden rounded-lg bg-ink-950 shadow-card [container-type:inline-size]">
      {/* ── SOURCE 2: the presentation feed, full frame ───────────────────── */}
      <MockSlide />

      {/* ── SOURCE 1: the speaker camera, keyed in ────────────────────────── */}
      <div
        className={cn(
          'absolute overflow-hidden rounded-[4px] border border-white/25 bg-ink-800 shadow-lift',
          // 22% of frame width, inset by 3% — the proportions the master must ship.
          'bottom-[3%] right-[2.5%] w-[22%]',
        )}
        style={{ aspectRatio: '4 / 3' }}
      >
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-ink-600 to-ink-900">
          <span className="text-[length:1.1cqw] font-semibold uppercase tracking-[0.1em] text-white/60">
            Speaker
          </span>
        </div>
      </div>

      {/* Persistent programme mark, burned into the master. */}
      <p className="absolute left-[2.5%] top-[4%] text-[length:1cqw] font-semibold uppercase tracking-[0.16em] text-white/45">
        {site.eventShort}
      </p>

      {annotated && <Guides />}
    </div>
  );
}

/**
 * A schematic teaching slide used purely to judge legibility — a flow–volume
 * loop with axes and a title block. It is the hardest thing a pulmonology deck
 * asks a phone screen to render: a thin curve and small axis type.
 */
function MockSlide() {
  return (
    <div className="absolute inset-0 bg-white p-[3.5%]">
      <p className="leading-tight">
        <span className="block text-[length:1.4cqw] font-semibold uppercase tracking-[0.12em] text-accent-600">
          Mock slide — framing reference only
        </span>
        <span className="mt-[0.45em] block text-[length:3.4cqw] font-semibold leading-tight text-ink-900">
          Interpreting the Flow–Volume Loop
        </span>
      </p>

      <div className="mt-[2.5%] flex h-[72%] gap-[3%]">
        <svg
          viewBox="0 0 200 130"
          className="h-full w-[52%]"
          role="img"
          aria-label="Schematic flow–volume loop with labelled axes"
        >
          <line x1="20" y1="65" x2="190" y2="65" stroke="#C3D2E1" strokeWidth="1" />
          <line x1="20" y1="8" x2="20" y2="122" stroke="#C3D2E1" strokeWidth="1" />
          <path
            d="M25 65 L40 18 Q70 26 110 50 T185 65"
            fill="none"
            stroke="#16324F"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M185 65 Q140 108 90 104 T25 65"
            fill="none"
            stroke="#C4762F"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <text x="96" y="129" textAnchor="middle" fontSize="7" fill="#4E7DAB">
            Volume (L)
          </text>
          <text x="8" y="40" fontSize="7" fill="#4E7DAB" transform="rotate(-90 8 40)">
            Flow (L/s)
          </text>
          <text x="44" y="14" fontSize="6.5" fill="#16324F">
            PEF
          </text>
        </svg>

        <ul className="flex w-[45%] flex-col justify-center gap-[5%] text-[length:2.2cqw] leading-snug text-ink-700">
          {[
            'Shape before numbers',
            'Check effort and reproducibility',
            'Expiratory limb concavity',
            'Inspiratory limb flattening',
          ].map((item) => (
            <li key={item} className="flex items-start gap-[0.5em]">
              <span className="mt-[0.45em] h-[0.3em] w-[0.3em] shrink-0 rounded-full bg-accent-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Measurement guides drawn over the frame. */
function Guides() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* Title-safe area */}
      <div className="absolute inset-[5%] border border-dashed border-accent-400/70" />
      {/* Bottom-left of the safe box: the top-left is the slide's own title zone. */}
      <span className="absolute bottom-[6%] left-[5.5%] bg-accent-600 px-[0.4cqw] py-px text-[length:1cqw] font-semibold uppercase tracking-[0.08em] text-white">
        Title-safe 5%
      </span>

      {/* Inset callout */}
      {/* The inset is 22% of frame WIDTH at 4:3, which is ~29% of frame HEIGHT.
          Percentage offsets on `bottom` resolve against height, so the label
          clears it at 34%, not at 22%. */}
      <span className="absolute bottom-[34%] right-[2.5%] bg-ink-900 px-[0.4cqw] py-px text-[length:1cqw] font-semibold uppercase tracking-[0.08em] text-white">
        Speaker · 22% width
      </span>

      {/* Reserved lower-right zone — the deck must keep this clear */}
      <div className="absolute bottom-[2%] right-[1.5%] h-[26%] w-[24%] border border-dashed border-white/45" />
    </div>
  );
}
