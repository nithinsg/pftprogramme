import { cn } from '@/lib/cn';

/**
 * Line-art representations of the measurements the workshop is built around.
 *
 * Deliberately schematic: enough to be recognised at a glance by a clinician,
 * far short of a textbook figure. No axis values, no reference ranges, no
 * interpretation — these are graphic devices, not clinical material.
 */
export type PhysiologyKind = 'flow-volume' | 'spirometry' | 'lung-volumes' | 'cpet' | 'body-box';

const stroke = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export function PhysiologyVisual({
  kind,
  className,
  label,
}: {
  kind: PhysiologyKind;
  className?: string;
  label: string;
}) {
  return (
    <svg
      viewBox="0 0 160 100"
      className={cn('h-full w-full', className)}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
    >
      {kind === 'flow-volume' && (
        <>
          <line x1="16" y1="52" x2="150" y2="52" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
          <line x1="16" y1="8" x2="16" y2="94" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
          {/* Expiratory limb: rapid rise to peak, gradual descent */}
          <path d="M20 52 L32 14 Q62 22 100 40 T146 52" stroke="currentColor" strokeWidth="2" {...stroke} />
          {/* Inspiratory limb */}
          <path
            d="M146 52 Q108 88 66 85 T20 52"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="2"
            strokeDasharray="4 4"
            {...stroke}
          />
        </>
      )}

      {kind === 'spirometry' && (
        <>
          <line x1="16" y1="86" x2="150" y2="86" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
          <line x1="16" y1="10" x2="16" y2="86" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
          {/* Volume-time: steep then plateau */}
          <path d="M20 84 Q34 22 58 18 T146 16" stroke="currentColor" strokeWidth="2" {...stroke} />
          <line x1="58" y1="18" x2="58" y2="86" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 4" />
        </>
      )}

      {kind === 'lung-volumes' && (
        <>
          {/* Stacked compartments */}
          {[
            { y: 14, h: 18, o: 0.9 },
            { y: 34, h: 26, o: 0.6 },
            { y: 62, h: 14, o: 0.4 },
            { y: 78, h: 12, o: 0.25 },
          ].map((band) => (
            <rect
              key={band.y}
              x="34"
              y={band.y}
              width="92"
              height={band.h}
              rx="2"
              fill="currentColor"
              fillOpacity={band.o * 0.25}
              stroke="currentColor"
              strokeOpacity={band.o}
              strokeWidth="1.5"
            />
          ))}
          <line x1="22" y1="14" x2="22" y2="90" stroke="currentColor" strokeOpacity="0.3" strokeWidth="1" />
        </>
      )}

      {kind === 'cpet' && (
        <>
          <line x1="16" y1="86" x2="150" y2="86" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
          <line x1="16" y1="10" x2="16" y2="86" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
          {/* Two rising curves diverging at threshold */}
          <path d="M20 82 Q64 70 96 46 T146 18" stroke="currentColor" strokeWidth="2" {...stroke} />
          <path
            d="M20 84 Q68 78 100 62 T146 40"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="2"
            {...stroke}
          />
          <circle cx="96" cy="46" r="3" fill="currentColor" fillOpacity="0.7" />
        </>
      )}

      {kind === 'body-box' && (
        <>
          {/* Cabin outline with a figure and a pressure trace */}
          <rect
            x="30"
            y="12"
            width="100"
            height="78"
            rx="6"
            stroke="currentColor"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="66" cy="40" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M56 74 Q66 52 76 74" stroke="currentColor" strokeWidth="1.5" {...stroke} />
          <path
            d="M92 62 q6 -14 12 0 t12 0"
            stroke="currentColor"
            strokeOpacity="0.6"
            strokeWidth="1.5"
            {...stroke}
          />
        </>
      )}
    </svg>
  );
}
