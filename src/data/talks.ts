import type { Category, CategoryId, Talk } from './types';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * PULMO MENTOR BFD — RECORDED SESSIONS
 * ─────────────────────────────────────────────────────────────────────────────
 * ADDING A RECORDING = ADDING ONE OBJECT TO THIS ARRAY. Nothing else changes.
 * The library page, the filters, the individual session page, the related-talks
 * rail, the sitemap and the generated thumbnail all read from here.
 *
 * ⚠️ EVERY ENTRY BELOW IS SAMPLE SCAFFOLDING (`status: 'placeholder'`).
 *    - Speaker names, designations and institutions use the `Dr. [Name]` form.
 *      No real faculty member is named and no credential is invented.
 *    - Session titles are generic teaching topics standing in for the actual
 *      workshop programme. Replace them with the real agenda.
 *    - Durations are placeholders until the masters are delivered.
 *
 * No entry carries a video URL yet: `provider: 'pending'` makes the player show
 * a designed "in post-production" state rather than a broken frame. The framing
 * every master must deliver is specified, and rendered to scale, at
 * /recording-spec (docs/RECORDING-SPEC.md).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const categories: Category[] = [
  { id: 'workshop', label: 'Workshop Sessions', blurb: 'Core programme from the Pulmo Mentor BFD Workshop.' },
  { id: 'diagnostics', label: 'Diagnostics', blurb: 'Pulmonary function testing, imaging and tissue diagnosis.' },
  { id: 'interventions', label: 'Interventions', blurb: 'Bronchoscopic and pleural procedures.' },
  { id: 'ecmo', label: 'ECMO', blurb: 'Extracorporeal support and respiratory critical care.' },
  { id: 'transplant', label: 'Lung Transplant', blurb: 'The advanced lung disease and transplantation pathway.' },
];

export const talks: Talk[] = [
  {
    id: 'opening-address',
    title: 'Opening Address — The Scope of the Pulmo Mentor BFD Programme',
    speaker: 'Dr. [Speaker Name]',
    designation: '[Designation]',
    institution: 'Yashoda Hospitals, Somajiguda',
    category: 'workshop',
    session: 'Session 01 — Opening',
    duration: '12:40',
    description:
      '[Approved session description. Two to three sentences describing what the session covers and who it is aimed at. Replace with the speaker-approved abstract.]',
    /**
     * When the master arrives, this becomes:
     *   { provider: 'youtube', id: '…', layout: 'composite-ppt-speaker', aspect: '16:9' }
     * or, for a self-hosted file:
     *   { provider: 'file', url: '/media/…mp4', poster: '…jpg', captionsUrl: '…vtt' }
     */
    video: { provider: 'pending', layout: 'composite-ppt-speaker', aspect: '16:9' },
    takeaways: [
      '[Teaching point one — supplied by the speaker]',
      '[Teaching point two — supplied by the speaker]',
      '[Teaching point three — supplied by the speaker]',
    ],
    featured: true,
    status: 'placeholder',
  },
  {
    id: 'pft-interpretation',
    title: 'Reading a Pulmonary Function Test: A Structured Approach',
    speaker: 'Dr. [Speaker Name]',
    designation: '[Designation]',
    institution: '[Institution]',
    category: 'diagnostics',
    session: 'Session 02 — Foundations',
    duration: '24:15',
    description:
      '[Approved session description. Two to three sentences describing what the session covers and who it is aimed at.]',
    video: { provider: 'pending', layout: 'composite-ppt-speaker', aspect: '16:9' },
    takeaways: ['[Teaching point one]', '[Teaching point two]', '[Teaching point three]'],
    featured: true,
    status: 'placeholder',
  },
  {
    id: 'obstruction-vs-restriction',
    title: 'Obstruction, Restriction and the Patterns in Between',
    speaker: 'Dr. [Speaker Name]',
    designation: '[Designation]',
    institution: '[Institution]',
    category: 'diagnostics',
    session: 'Session 02 — Foundations',
    duration: '21:02',
    description:
      '[Approved session description. Two to three sentences describing what the session covers and who it is aimed at.]',
    video: { provider: 'pending', layout: 'composite-ppt-speaker', aspect: '16:9' },
    featured: false,
    status: 'placeholder',
  },
  {
    id: 'bronchoscopy-fundamentals',
    title: 'Bronchoscopy: Fundamentals, Technique and Safe Practice',
    speaker: 'Dr. [Speaker Name]',
    designation: '[Designation]',
    institution: '[Institution]',
    category: 'interventions',
    session: 'Session 03 — The Airway',
    duration: '27:48',
    description:
      '[Approved session description. Two to three sentences describing what the session covers and who it is aimed at.]',
    video: { provider: 'pending', layout: 'composite-ppt-speaker', aspect: '16:9' },
    featured: true,
    status: 'placeholder',
  },
  {
    id: 'ebus-mediastinum',
    title: 'EBUS and the Mediastinum: Staging and Sampling',
    speaker: 'Dr. [Speaker Name]',
    designation: '[Designation]',
    institution: '[Institution]',
    category: 'interventions',
    session: 'Session 03 — The Airway',
    duration: '25:30',
    description:
      '[Approved session description. Two to three sentences describing what the session covers and who it is aimed at.]',
    video: { provider: 'pending', layout: 'composite-ppt-speaker', aspect: '16:9' },
    featured: false,
    status: 'placeholder',
  },
  {
    id: 'peripheral-nodule',
    title: 'Approaching the Peripheral Pulmonary Nodule',
    speaker: 'Dr. [Speaker Name]',
    designation: '[Designation]',
    institution: '[Institution]',
    category: 'interventions',
    session: 'Session 04 — Advanced Interventions',
    duration: '19:55',
    description:
      '[Approved session description. Two to three sentences describing what the session covers and who it is aimed at.]',
    video: { provider: 'pending', layout: 'composite-ppt-speaker', aspect: '16:9' },
    featured: false,
    status: 'placeholder',
  },
  {
    id: 'cryobiopsy-ild',
    title: 'Cryobiopsy in Diffuse Parenchymal Lung Disease',
    speaker: 'Dr. [Speaker Name]',
    designation: '[Designation]',
    institution: '[Institution]',
    category: 'interventions',
    session: 'Session 04 — Advanced Interventions',
    duration: '22:37',
    description:
      '[Approved session description. Two to three sentences describing what the session covers and who it is aimed at.]',
    video: { provider: 'pending', layout: 'composite-ppt-speaker', aspect: '16:9' },
    featured: false,
    status: 'placeholder',
  },
  {
    id: 'ecmo-selection',
    title: 'ECMO in Respiratory Failure: Selection and Timing',
    speaker: 'Dr. [Speaker Name]',
    designation: '[Designation]',
    institution: '[Institution]',
    category: 'ecmo',
    session: 'Session 05 — Advanced Support',
    duration: '28:10',
    description:
      '[Approved session description. Two to three sentences describing what the session covers and who it is aimed at.]',
    video: { provider: 'pending', layout: 'composite-ppt-speaker', aspect: '16:9' },
    featured: true,
    status: 'placeholder',
  },
  {
    id: 'ecmo-day-to-day',
    title: 'Day-to-Day Management of the Patient on Extracorporeal Support',
    speaker: 'Dr. [Speaker Name]',
    designation: '[Designation]',
    institution: '[Institution]',
    category: 'ecmo',
    session: 'Session 05 — Advanced Support',
    duration: '23:44',
    description:
      '[Approved session description. Two to three sentences describing what the session covers and who it is aimed at.]',
    video: { provider: 'pending', layout: 'composite-ppt-speaker', aspect: '16:9' },
    featured: false,
    status: 'placeholder',
  },
  {
    id: 'transplant-referral',
    title: 'When to Refer for Lung Transplantation',
    speaker: 'Dr. [Speaker Name]',
    designation: '[Designation]',
    institution: '[Institution]',
    category: 'transplant',
    session: 'Session 06 — Advanced Lung Disease',
    duration: '26:20',
    description:
      '[Approved session description. Two to three sentences describing what the session covers and who it is aimed at.]',
    video: { provider: 'pending', layout: 'composite-ppt-speaker', aspect: '16:9' },
    featured: false,
    status: 'placeholder',
  },
  {
    id: 'transplant-mdt',
    title: 'Building the Multidisciplinary Transplant Pathway',
    speaker: 'Dr. [Speaker Name]',
    designation: '[Designation]',
    institution: '[Institution]',
    category: 'transplant',
    session: 'Session 06 — Advanced Lung Disease',
    duration: '20:08',
    description:
      '[Approved session description. Two to three sentences describing what the session covers and who it is aimed at.]',
    video: { provider: 'pending', layout: 'composite-ppt-speaker', aspect: '16:9' },
    featured: false,
    status: 'placeholder',
  },
  {
    id: 'panel-discussion',
    title: 'Faculty Panel — Questions from the Floor',
    speaker: 'Pulmo Mentor BFD Faculty',
    designation: 'Panel Discussion',
    institution: 'Yashoda Hospitals, Somajiguda',
    category: 'workshop',
    session: 'Session 07 — Closing',
    duration: '34:12',
    description:
      '[Approved session description of the closing panel. Replace with the moderator-approved summary.]',
    video: { provider: 'pending', layout: 'composite-ppt-speaker', aspect: '16:9' },
    featured: false,
    status: 'placeholder',
  },
];

/* ── Selectors ──────────────────────────────────────────────────────────── */

export const getTalk = (id: string): Talk | undefined => talks.find((t) => t.id === id);

export const getTalksByCategory = (category: CategoryId | 'all'): Talk[] =>
  category === 'all' ? talks : talks.filter((t) => t.category === category);

export const featuredTalk = (): Talk | undefined => talks.find((t) => t.featured) ?? talks[0];

/** Sessions in programme order, for the grouped view on the library page. */
export const sessionOrder = (): string[] =>
  talks.reduce<string[]>((acc, t) => (acc.includes(t.session) ? acc : [...acc, t.session]), []);

/** Same category first, then anything else, never the talk itself. */
export const getRelatedTalks = (id: string, limit = 3): Talk[] => {
  const current = getTalk(id);
  if (!current) return talks.slice(0, limit);
  const sameCategory = talks.filter((t) => t.id !== id && t.category === current.category);
  const rest = talks.filter((t) => t.id !== id && t.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
};

/** Count per filter chip, so the UI never shows an empty bucket. */
export const categoryCounts = (): Record<CategoryId | 'all', number> => {
  const counts = { all: talks.length } as Record<CategoryId | 'all', number>;
  for (const c of categories) counts[c.id] = talks.filter((t) => t.category === c.id).length;
  return counts;
};
