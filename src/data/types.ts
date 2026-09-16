/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CONTENT MODELS — Pulmo Mentor Master Class in PFT
 * ─────────────────────────────────────────────────────────────────────────────
 * All content lives in `src/data/*`. No component hard-codes a session, a
 * credential or a capability, so the team can add the real recordings later
 * without touching the UI.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * Governance flag on every content record.
 *
 * - `verified`    — taken from an official Yashoda source or supplied and
 *                   approved by the hospital. Renders clean.
 * - `placeholder` — scaffolding shipped with the build, awaiting real content.
 *
 * `VITE_SHOW_PLACEHOLDERS` decides whether placeholders render with a visible
 * marker (review mode) or do not render at all (go-live).
 */
export type ContentStatus = 'verified' | 'placeholder';

/** An image slot the content team fills in with an approved Yashoda asset. */
export interface MediaSlot {
  /** Path under /public, or an absolute URL from the hospital's CDN. */
  src?: string;
  /** Required whenever `src` is set. */
  alt: string;
  /** Brief describing the shot to supply. Shown on screen in review mode. */
  brief?: string;
  status: ContentStatus;
}

/**
 * A playable video.
 *
 * ⚠️ NO YOUTUBE ID IS EVER GUESSED. When the official Yashoda video cannot be
 * identified with certainty, `youtubeId` stays as the placeholder token and the
 * player renders a labelled empty state instead of embedding something wrong.
 */
export const YOUTUBE_ID_PLACEHOLDER = '[INSERT OFFICIAL YASHODA VIDEO ID]';

export interface VideoSource {
  /** Official Yashoda YouTube id, or YOUTUBE_ID_PLACEHOLDER. */
  youtubeId?: string;
  /** Self-hosted MP4/HLS, used instead of youtubeId when the file is hosted. */
  videoUrl?: string;
  /** Poster frame. Falls back to the generated branded thumbnail. */
  thumbnail?: string;
  /** WebVTT captions. Supplying this enables the captions track. */
  captionsUrl?: string;
  /**
   * How the master is framed. The workshop recordings are captured from two
   * sources and composited: presentation full-frame, speaker keyed in.
   */
  layout?: 'presentation-and-speaker' | 'single-camera';
  /**
   * Second feed — speaker camera only. Present only when post-production
   * delivers the two sources separately; the player then composites them live.
   */
  speakerUrl?: string;
}

/** True when this source can actually play something. */
export const isPlayable = (video: VideoSource): boolean =>
  Boolean(video.videoUrl) ||
  Boolean(video.youtubeId && video.youtubeId !== YOUTUBE_ID_PLACEHOLDER);

/** A recorded session from the PFT master class. */
export interface Session {
  id: string;
  title: string;
  /** Use the `[ADD SPEAKER NAME]` form until the faculty list is confirmed. */
  speaker: string;
  designation: string;
  institution: string;
  /** Free-text grouping, e.g. "Foundations" or "Advanced Diagnostics". */
  category: string;
  /** Display duration, `MM:SS`. */
  duration: string;
  description: string;
  /** Optional speaker portrait; falls back to a neutral placeholder glyph. */
  speakerPhoto?: string;
  video: VideoSource;
  status: ContentStatus;
}

/** A curated video from an official Yashoda source. */
export interface ShowcaseVideo {
  id: string;
  /** Topic label shown above the title. */
  category: string;
  title: string;
  /** Attributed doctor, exactly as the official source names them. */
  doctor: string;
  description: string;
  video: VideoSource;
  /** Official Yashoda page this video belongs to, when known. */
  sourceUrl?: string;
  status: ContentStatus;
}

/** Icon keys resolved by `src/components/ui/Icon.tsx` — data stays UI-free. */
export type IconKey =
  | 'stethoscope'
  | 'activity'
  | 'scan'
  | 'heart-pulse'
  | 'wind'
  | 'microscope'
  | 'moon'
  | 'graduation'
  | 'shield'
  | 'monitor'
  | 'layers'
  | 'gauge'
  | 'waves'
  | 'syringe';

/** One of Dr. Viswesvaran's areas of expertise. */
export interface ExpertiseArea {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
  status: ContentStatus;
}

/** A capability of the Somajiguda pulmonology service. */
export interface Capability {
  id: string;
  title: string;
  /** One short line. The grid is deliberately light on copy. */
  summary: string;
  icon: IconKey;
  /** Groups the grid into readable bands. */
  group: 'Diagnostics' | 'Intervention' | 'Advanced Care';
  status: ContentStatus;
}

/** A programme highlight from the official event listing. */
export interface ProgrammeHighlight {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
  status: ContentStatus;
}

/**
 * ── Event-day vertical screen ────────────────────────────────────────────────
 * A silent 9:16 loop for the venue screen. Separate from the website
 * experience — see docs/VERTICAL-LOOP-STORYBOARD.md.
 */
export type EventScreenCategory =
  | 'branding'
  | 'pulmonology'
  | 'pft'
  | 'diagnostics'
  | 'intervention'
  | 'advanced-care';

export interface EventScreenSlot {
  id: string;
  order: number;
  category: EventScreenCategory;
  /** Large on-screen type. One to four words — read at walking pace. */
  headline: string;
  subline?: string;
  /** Seconds this slot holds on screen. */
  durationSeconds: number;
  media: MediaSlot & { type: 'video' | 'image' | 'title-card' };
  /** Motion / edit direction for the video editor. */
  direction: string;
}
