/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CONTENT MODELS
 * ─────────────────────────────────────────────────────────────────────────────
 * Every piece of content on this site is described by one of the types below
 * and lives in `src/data/*`. No page component hard-codes a talk, a doctor or a
 * capability — adding a new recording is a single object in `src/data/talks.ts`.
 *
 * See `docs/CONTENT-GUIDE.md` for the hand-off instructions written for the
 * medical / marketing team.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Governance flag carried by every content item.
 *
 * - `approved`    — signed off by the medical/marketing team. Renders clean.
 * - `placeholder` — sample scaffolding shipped with the build. Renders with a
 *                   visible marker while VITE_SHOW_PLACEHOLDERS is on.
 * - `awaiting-approval` — real content drafted but not yet cleared for publication.
 *
 * Nothing on this site states a clinical outcome, statistic or credential that
 * is not marked `approved` by the hospital.
 */
export type ContentStatus = 'approved' | 'placeholder' | 'awaiting-approval';

/** An image/video asset slot the content team fills in. */
export interface MediaSlot {
  /** Path under /public, or an absolute URL from the hospital's CDN. */
  src?: string;
  /** Required whenever `src` is set — used for alt text and accessibility. */
  alt: string;
  /** Short brief describing the shot the production team should supply. */
  brief?: string;
  status: ContentStatus;
}

export type VideoProvider = 'youtube' | 'vimeo' | 'file' | 'pending';

/**
 * A playable video.
 *
 * The workshop deliverable (see `docs/RECORDING-SPEC.md`) is a single COMPOSITE
 * master: presentation feed full-frame with the speaker keyed in as an inset.
 * That is the `composite` case and it is what `provider` + `id`/`url` describe.
 *
 * `speakerUrl` exists for the fallback case where post-production hands over the
 * two feeds separately. When it is present the player composites them live —
 * slide feed full-frame, speaker inset, playback clock-locked to the slide feed.
 */
export interface VideoSource {
  provider: VideoProvider;
  /** YouTube / Vimeo id. Used when provider is `youtube` or `vimeo`. */
  id?: string;
  /** Direct MP4 or HLS URL. Used when provider is `file`. */
  url?: string;
  /** Second feed — speaker camera only. Triggers live picture-in-picture. */
  speakerUrl?: string;
  /** Poster frame. Falls back to the generated branded thumbnail. */
  poster?: string;
  /** WebVTT captions. Supplying this enables the captions track (§26). */
  captionsUrl?: string;
  aspect?: '16:9' | '9:16';
  /** Presentation layout of the master file, for the on-page layout badge. */
  layout?: 'composite-ppt-speaker' | 'speaker-only' | 'slides-only';
}

/** Filter buckets for the recordings library (§20). */
export type CategoryId =
  | 'workshop'
  | 'ecmo'
  | 'interventions'
  | 'transplant'
  | 'diagnostics';

export interface Category {
  id: CategoryId;
  label: string;
  /** Short line shown when the filter is active. */
  blurb: string;
}

/** A recorded talk in the Pulmo Mentor BFD library. */
export interface Talk {
  /** URL slug — /recordings/:id */
  id: string;
  title: string;
  /** Use the `Dr. [Speaker Name]` placeholder form until names are confirmed. */
  speaker: string;
  designation: string;
  institution: string;
  category: CategoryId;
  /** Free-text session grouping, e.g. "Session 01 — Foundations". */
  session: string;
  /** Display duration, `MM:SS` or `HH:MM:SS`. */
  duration: string;
  description: string;
  /** Optional override; omit to use the generated branded thumbnail (§29). */
  thumbnail?: string;
  speakerPhoto?: string;
  video: VideoSource;
  /** Optional slide deck download, once cleared by the speaker. */
  slidesUrl?: string;
  /** Bullet takeaways shown under the player. Keep to teaching points. */
  takeaways?: string[];
  featured: boolean;
  status: ContentStatus;
}

/** A faculty / department profile card. */
export interface Doctor {
  id: string;
  name: string;
  designation: string;
  qualifications: string;
  department: string;
  hospital: string;
  photo?: string;
  focusAreas: string[];
  bio: string;
  status: ContentStatus;
}

/** Icon keys resolved by `src/components/ui/Icon.tsx`. Data stays presentation-free. */
export type IconKey =
  | 'stethoscope'
  | 'activity'
  | 'scan'
  | 'heart-pulse'
  | 'wind'
  | 'microscope'
  | 'flask'
  | 'graduation'
  | 'users'
  | 'shield'
  | 'monitor'
  | 'layers';

export interface Capability {
  id: string;
  title: string;
  summary: string;
  icon: IconKey;
  /** Optional deep link to a showcase page. */
  href?: string;
  status: ContentStatus;
}

/** A named procedure or service line listed inside a showcase. */
export interface ProcedureItem {
  id: string;
  title: string;
  description: string;
  /**
   * Procedures render only when `status` is `approved` — the brief requires that
   * specific procedures appear only once approved content exists (§6, card 2).
   */
  status: ContentStatus;
}

/** A case / procedure film attached to a showcase. */
export interface CaseVideo {
  id: string;
  title: string;
  summary: string;
  duration: string;
  video: VideoSource;
  /** Faculty attribution line. */
  attribution: string;
  /**
   * Patient-identifiable footage must not publish until consent and
   * institutional approval are recorded here.
   */
  consent: 'on-file' | 'required';
  status: ContentStatus;
}

export type ShowcaseId = 'ecmo' | 'interventions' | 'lung-transplant';

export interface Showcase {
  id: ShowcaseId;
  /** Route path, e.g. /ecmo */
  href: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  /** 2–3 sentences. No outcome claims, no statistics. */
  description: string;
  /** Clinical highlights — capability statements only. */
  highlights: string[];
  procedures: ProcedureItem[];
  media: MediaSlot;
  caseVideos: CaseVideo[];
  ctaLabel: string;
  /** Faculty attribution slot for the showcase. */
  attribution: string;
  /** Recording library category this showcase filters into. */
  libraryCategory: CategoryId;
  status: ContentStatus;
}

/**
 * ── Event-day vertical screen (§12–§14) ──────────────────────────────────────
 * A 9:16 loop that plays silently on the venue screen. Each slot is swappable
 * by the content team without touching code — see docs/VERTICAL-LOOP-STORYBOARD.md.
 */
export type EventScreenCategory =
  | 'branding'
  | 'ecmo'
  | 'interventions'
  | 'lung-transplant'
  | 'pulmonology';

export interface EventScreenSlot {
  id: string;
  order: number;
  category: EventScreenCategory;
  /** Large on-screen type. Keep to 1–4 words — read at walking pace. */
  headline: string;
  /** One short supporting line. Optional. */
  subline?: string;
  /** Seconds this slot holds on screen. */
  durationSeconds: number;
  media: MediaSlot & { type: 'video' | 'image' | 'title-card' };
  /** Motion / edit direction for the video editor. */
  direction: string;
}
