import type { EventScreenSlot } from './types';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * EVENT-DAY VERTICAL SCREEN LOOP (§12–§14)
 * ─────────────────────────────────────────────────────────────────────────────
 * This is NOT the workshop recording. It is a silent 9:16 capability reel that
 * loops continuously on the vertical screen at the venue, read by delegates
 * walking past at two to three metres.
 *
 * DESIGN CONSTRAINTS, ENFORCED BY THE PREVIEW ON /event-screen:
 *   · 1080 × 1920, 9:16, 25 or 30 fps                    · must read with NO audio
 *   · one idea per slot, 1–4 words of headline           · seamless loop, no hard cut to black
 *   · type no smaller than 48px at 1080 wide             · total loop 60–75 s
 *
 * SWAPPING CONTENT: the content team changes `media.src`, `headline`, `subline`
 * or `durationSeconds` here — or replaces the whole rendered loop file — without
 * any code change. See docs/VERTICAL-LOOP-STORYBOARD.md for the full brief that
 * goes to the video editor, and the approval checklist that must be signed off
 * BEFORE the event.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const eventScreenSpec = {
  canvas: '1080 × 1920 (9:16)',
  frameRate: '25 fps (match venue player)',
  loopLength: '60–75 seconds',
  audio: 'None. The reel must communicate fully on mute.',
  safeArea: '96px top and bottom — venue screens are often bezel-cropped.',
  minimumType: '48px at 1080 wide for any word that must be read.',
  colourNote:
    'Deep navy field, white type, single warm accent rule. Venue screens run bright — avoid pure black and avoid fine hairlines under 3px.',
  deliverables: [
    'Master: 1080×1920 H.264 MP4, ~12 Mbps, seamless loop point',
    'Backup: same reel as a 30 s cut, in case the venue player stutters',
    'Stills: each title card exported as a 1080×1920 JPEG fallback',
  ],
} as const;

export const eventScreenSlots: EventScreenSlot[] = [
  {
    id: 'open-brand',
    order: 1,
    category: 'branding',
    headline: 'Yashoda Hospitals',
    subline: 'Somajiguda',
    durationSeconds: 6,
    media: {
      type: 'title-card',
      alt: 'Yashoda Hospitals, Somajiguda — opening brand card',
      brief:
        'Title card. Official logo centred on deep navy, warm accent rule beneath. Hold still, no motion except a slow 2% scale on the field.',
      status: 'placeholder',
    },
    direction: 'Fade up from navy over 12 frames. Logo settles. Absolute stillness — this is the anchor frame.',
  },
  {
    id: 'pulmonology',
    order: 2,
    category: 'pulmonology',
    headline: 'Pulmonology',
    subline: 'Advanced respiratory medicine',
    durationSeconds: 8,
    media: {
      type: 'video',
      alt: 'Department of Pulmonology at Somajiguda',
      brief:
        'B-roll, vertical: department corridor, consultation or diagnostic environment. Shallow depth of field, cool clinical light. No identifiable patients.',
      status: 'placeholder',
    },
    direction: 'Slow push in. Headline enters from a 24px rise with a 6-frame stagger on the subline.',
  },
  {
    id: 'ecmo',
    order: 3,
    category: 'ecmo',
    headline: 'ECMO',
    subline: 'Advanced extracorporeal support',
    durationSeconds: 9,
    media: {
      type: 'video',
      alt: 'ECMO circuit in the critical care unit',
      brief:
        'B-roll, vertical: ECMO console and circuit, monitor waveforms, perfusionist hands. Macro detail preferred over wide shots. No identifiable patient.',
      status: 'placeholder',
    },
    direction: 'Hard-ish cut on a beat. Hold the circuit detail. Type sits lower third, warm accent rule above it.',
  },
  {
    id: 'interventions',
    order: 4,
    category: 'interventions',
    headline: 'Advanced Pulmonary Interventions',
    subline: 'Diagnosis and therapy through the airway',
    durationSeconds: 9,
    media: {
      type: 'video',
      alt: 'Interventional pulmonology suite',
      brief:
        'B-roll, vertical: bronchoscopy tower, scope in hand, monitor stack. Screen content must be non-identifiable or cleared for use.',
      status: 'placeholder',
    },
    direction:
      'Headline is the longest in the reel — set it two lines, 56px, tight tracking. Give it the full 9 seconds.',
  },
  {
    id: 'lung-transplant',
    order: 5,
    category: 'lung-transplant',
    headline: 'Lung Transplantation',
    subline: 'Multidisciplinary care for advanced lung disease',
    durationSeconds: 9,
    media: {
      type: 'video',
      alt: 'Multidisciplinary lung transplant team',
      brief:
        'B-roll, vertical: theatre corridor, team in discussion, transplant coordination. Releases required for any identifiable person.',
      status: 'placeholder',
    },
    direction: 'Warmest grade of the reel. Slight lift in exposure. Let one human moment land here.',
  },
  {
    id: 'diagnostics',
    order: 6,
    category: 'pulmonology',
    headline: 'Advanced Diagnostics',
    subline: 'Pulmonary function · Imaging · Tissue diagnosis',
    durationSeconds: 8,
    media: {
      type: 'video',
      alt: 'Pulmonary function testing and diagnostic imaging',
      brief:
        'B-roll, vertical: PFT booth, spirometry trace on screen, CT reading. Screens must show non-identifiable or cleared studies.',
      status: 'placeholder',
    },
    direction: 'Three quick beats matched to the three words in the subline. Crossfades, 10 frames each.',
  },
  {
    id: 'values',
    order: 7,
    category: 'branding',
    headline: 'Expertise · Innovation · Care',
    durationSeconds: 8,
    media: {
      type: 'title-card',
      alt: 'Expertise, Innovation, Care',
      brief:
        'Typographic card on deep navy. Three words, stacked, each entering on its own beat. No imagery.',
      status: 'placeholder',
    },
    direction: 'Words stack in sequence, 14 frames apart. Hold all three together for the final 2 seconds.',
  },
  {
    id: 'close-brand',
    order: 8,
    category: 'branding',
    headline: 'Yashoda Hospitals',
    subline: 'Somajiguda · Department of Pulmonology',
    durationSeconds: 7,
    media: {
      type: 'title-card',
      alt: 'Yashoda Hospitals, Somajiguda — closing brand card',
      brief:
        'Closing lockup, identical construction to the opening card so the loop point is invisible.',
      status: 'placeholder',
    },
    direction:
      'LOOP POINT. Match the opening card exactly — same scale, same position, same grade — and cross-dissolve into slot 1 over 12 frames.',
  },
];

export const totalLoopSeconds = eventScreenSlots.reduce((sum, s) => sum + s.durationSeconds, 0);
