import type { EventScreenSlot } from './types';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * EVENT-DAY VERTICAL SCREEN LOOP
 * ─────────────────────────────────────────────────────────────────────────────
 * A silent 9:16 capability reel for the screen at the venue on 20 September.
 * It is NOT part of the post-event website — a separate creative deliverable,
 * specified here so it can be approved before the day.
 *
 * The test it has to pass: a doctor walking past at two to three metres
 * understands the message within five to ten seconds, with no audio.
 *
 * CONSTRAINTS
 *   · 1080 × 1920, 9:16, 25 fps         · must read with NO audio
 *   · one idea per card, 1–4 words      · seamless loop, no cut to black
 *   · type ≥ 48px at 1080 wide          · 96px top/bottom safe area
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const eventScreenSpec = {
  canvas: '1080 × 1920 (9:16)',
  frameRate: '25 fps — confirm against the venue player',
  audio: 'None. The reel must communicate fully on mute.',
  safeArea: '96px top and bottom — venue screens are often bezel-cropped.',
  minimumType: '48px at 1080 wide for any word that must be read.',
  colourNote:
    'Deep navy field, white type, one warm accent rule. Venue screens run bright — avoid pure black and hairlines under 3px.',
  deliverables: [
    'Master: 1080×1920 H.264 MP4, ~12 Mbps, seamless loop point',
    'Backup: a 30 s cut, in case the venue player stutters',
    'Stills: each title card exported as a 1080×1920 JPEG fallback',
  ],
} as const;

export const eventScreenSlots: EventScreenSlot[] = [
  {
    id: 'open-brand',
    order: 1,
    category: 'branding',
    headline: 'Yashoda Hospitals',
    subline: 'Somajiguda · Pulmonology',
    durationSeconds: 6,
    media: {
      type: 'title-card',
      alt: 'Yashoda Hospitals, Somajiguda — opening brand card',
      brief:
        'Title card. Official logo centred on deep navy, warm accent rule beneath. Hold still; no motion except a slow 2% scale on the field.',
      status: 'placeholder',
    },
    direction: 'Fade up from navy over 12 frames. Logo settles. Absolute stillness — the anchor frame.',
  },
  {
    id: 'masterclass',
    order: 2,
    category: 'pft',
    headline: 'Master Class in PFT',
    subline: '20 September 2026',
    durationSeconds: 7,
    media: {
      type: 'title-card',
      alt: 'Pulmo Mentor Master Class in PFT title card',
      brief: 'Typographic card. Event name over a soft spirometry trace, very low contrast.',
      status: 'placeholder',
    },
    direction: 'Headline enters on a 24px rise; the date follows 8 frames later. This is the only card with a date.',
  },
  {
    id: 'pulmonary-function',
    order: 3,
    category: 'pft',
    headline: 'Pulmonary Function Testing',
    subline: 'Spirometry · Lung volumes · Diffusion',
    durationSeconds: 8,
    media: {
      type: 'video',
      alt: 'Pulmonary function testing at Somajiguda',
      brief:
        'B-roll, vertical: PFT booth, patient at the mouthpiece (consented or hands-only), spirometry trace resolving on screen.',
      status: 'placeholder',
    },
    direction: 'Slow push in. Let the trace draw itself on the monitor — that motion carries the card.',
  },
  {
    id: 'cpet-bodybox',
    order: 4,
    category: 'diagnostics',
    headline: 'CPET · Body Box',
    subline: 'Advanced respiratory diagnostics',
    durationSeconds: 8,
    media: {
      type: 'video',
      alt: 'Cardiopulmonary exercise testing and body plethysmography',
      brief:
        'B-roll, vertical: CPET cycle ergometer and mask, body plethysmography cabin. Equipment detail over wide shots.',
      status: 'placeholder',
    },
    direction: 'Two beats — CPET, then the body box — 4 seconds each, cut on the subline rhythm.',
  },
  {
    id: 'intervention',
    order: 5,
    category: 'intervention',
    headline: 'Interventional Pulmonology',
    subline: 'Bronchoscopy · EBUS · Cryobiopsy',
    durationSeconds: 8,
    media: {
      type: 'video',
      alt: 'Interventional pulmonology suite at Somajiguda',
      brief:
        'B-roll, vertical: bronchoscopy tower, scope in hand, monitor stack. Screen content non-identifiable or cleared.',
      status: 'placeholder',
    },
    direction: 'Hard-ish cut on a beat. Hold the scope detail. Type lower third, accent rule above.',
  },
  {
    id: 'advanced-care',
    order: 6,
    category: 'advanced-care',
    headline: 'ECMO · Lung Transplantation',
    subline: 'Advanced respiratory support',
    durationSeconds: 8,
    media: {
      type: 'video',
      alt: 'ECMO and lung transplantation care',
      brief:
        'B-roll, vertical: ECMO console and circuit, theatre corridor, multidisciplinary team. Releases required for identifiable people.',
      status: 'placeholder',
    },
    direction: 'Warmest grade of the reel. Slight lift in exposure. Let one human moment land here.',
  },
  {
    id: 'expertise',
    order: 7,
    category: 'pulmonology',
    headline: 'Expertise · Diagnosis · Care',
    durationSeconds: 7,
    media: {
      type: 'title-card',
      alt: 'Expertise, Diagnosis, Care',
      brief: 'Typographic card on deep navy. Three words, stacked, each on its own beat. No imagery.',
      status: 'placeholder',
    },
    direction: 'Words stack 14 frames apart. Hold all three together for the final 2 seconds.',
  },
  {
    id: 'close-brand',
    order: 8,
    category: 'branding',
    headline: 'Yashoda Hospitals',
    subline: 'Somajiguda · Department of Pulmonology',
    durationSeconds: 6,
    media: {
      type: 'title-card',
      alt: 'Yashoda Hospitals, Somajiguda — closing brand card',
      brief: 'Closing lockup, identical construction to the opening card so the loop point is invisible.',
      status: 'placeholder',
    },
    direction:
      'LOOP POINT. Match card 01 exactly — same scale, position and grade — and cross-dissolve into it over 12 frames.',
  },
];

export const totalLoopSeconds = eventScreenSlots.reduce((sum, s) => sum + s.durationSeconds, 0);
