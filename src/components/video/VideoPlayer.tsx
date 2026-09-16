import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { LayoutTemplate, Layers, Play, ShieldAlert, UserSquare2, VideoOff } from 'lucide-react';
import type { VideoSource } from '@/data/types';
import { createProgressTracker } from '@/lib/analytics';
import { cn } from '@/lib/cn';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * VIDEO PLAYER (§10, §11, §25)
 * ─────────────────────────────────────────────────────────────────────────────
 * THE REQUIREMENT: the presentation and the speaker must both stay visible, and
 * the slides must stay legible on a phone.
 *
 * TWO WAYS THAT IS SATISFIED:
 *
 * 1. COMPOSITE MASTER (the intended deliverable — see docs/RECORDING-SPEC.md).
 *    Post-production hands over ONE file: the presentation feed full-frame with
 *    the speaker keyed into the lower-right corner. The player is then a plain
 *    single-video player and the framing is already correct on every device.
 *
 * 2. DUAL FEED (fallback). If the two sources arrive separately, set
 *    `source.speakerUrl` and the player composites them live: slides full-frame,
 *    speaker as an inset, playback clock-locked to the slide feed and drift-
 *    corrected. Viewers can move the speaker out of the way, or swap which feed
 *    is large — because on a 360px-wide phone, the reader decides what matters.
 *
 * LAZY LOADING: nothing is fetched until the visitor presses play. Until then
 * this is a poster image and a button. That keeps the library page light even
 * with a dozen sessions on it.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface VideoPlayerProps {
  source: VideoSource;
  /** Used for the accessible name of the player and the iframe title. */
  title: string;
  /** Branded thumbnail rendered as the facade before playback starts. */
  poster: ReactNode;
  analyticsId: string;
  analyticsTitle: string;
  /**
   * Set when the clip must not play — e.g. patient consent is not yet recorded.
   * The player refuses to mount any source and explains why instead.
   */
  blockedReason?: string;
  /** Fired once, when the visitor activates the facade and the source mounts. */
  onActivate?: () => void;
  className?: string;
}

export function VideoPlayer({
  source,
  title,
  poster,
  analyticsId,
  analyticsTitle,
  blockedReason,
  onActivate,
  className,
}: VideoPlayerProps) {
  const [active, setActive] = useState(false);

  if (blockedReason) {
    return <PlayerNotice icon={<ShieldAlert />} heading="Not yet cleared for publication" body={blockedReason} className={className} />;
  }

  if (source.provider === 'pending') {
    return (
      <PlayerNotice
        icon={<VideoOff />}
        heading="Recording in post-production"
        body="This session will appear here once the composite presentation-and-speaker master has been delivered and approved."
        className={className}
      />
    );
  }

  const isDual = Boolean(source.speakerUrl) && source.provider === 'file';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-card bg-ink-950 shadow-lift',
        source.aspect === '9:16' ? 'aspect-[9/16] mx-auto max-w-sm' : 'aspect-video',
        className,
      )}
    >
      {!active ? (
        <PlayerFacade
          title={title}
          poster={poster}
          onActivate={() => {
            setActive(true);
            onActivate?.();
          }}
        />
      ) : isDual ? (
        <DualFeedPlayer
          source={source}
          title={title}
          analyticsId={analyticsId}
          analyticsTitle={analyticsTitle}
        />
      ) : source.provider === 'file' ? (
        <SingleFilePlayer
          source={source}
          title={title}
          analyticsId={analyticsId}
          analyticsTitle={analyticsTitle}
        />
      ) : (
        <EmbedPlayer source={source} title={title} />
      )}
    </div>
  );
}

/* ── Facade ─────────────────────────────────────────────────────────────── */

function PlayerFacade({
  title,
  poster,
  onActivate,
}: {
  title: string;
  poster: ReactNode;
  onActivate: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onActivate}
      aria-label={`Play video: ${title}`}
      className="group absolute inset-0 h-full w-full cursor-pointer"
    >
      <div className="absolute inset-0 [&>*]:h-full [&>*]:rounded-none">{poster}</div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-ink-950/25 transition-colors duration-300 group-hover:bg-ink-950/15"
      />
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-ink-900 shadow-lift transition-transform duration-300 ease-editorial group-hover:scale-105 sm:h-20 sm:w-20"
      >
        <Play className="h-6 w-6 translate-x-[2px] fill-current sm:h-7 sm:w-7" />
      </span>
    </button>
  );
}

/* ── Single composite file ──────────────────────────────────────────────── */

function SingleFilePlayer({
  source,
  title,
  analyticsId,
  analyticsTitle,
}: {
  source: VideoSource;
  title: string;
  analyticsId: string;
  analyticsTitle: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const tracker = useRef(createProgressTracker(analyticsId, analyticsTitle));

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full bg-ink-950"
      src={source.url}
      poster={source.poster}
      controls
      autoPlay
      playsInline
      preload="metadata"
      aria-label={title}
      onPlay={() => tracker.current.play()}
      onTimeUpdate={(e) => {
        const el = e.currentTarget;
        tracker.current.timeUpdate(el.currentTime, el.duration);
      }}
      onEnded={() => tracker.current.complete()}
    >
      {source.captionsUrl && (
        <track kind="captions" src={source.captionsUrl} srcLang="en" label="English" default />
      )}
    </video>
  );
}

/* ── Dual feed: slides + speaker, clock-locked ──────────────────────────── */

/** Resync the follower feed if it drifts more than this many seconds. */
const DRIFT_TOLERANCE_S = 0.3;

function DualFeedPlayer({
  source,
  title,
  analyticsId,
  analyticsTitle,
}: {
  source: VideoSource;
  title: string;
  analyticsId: string;
  analyticsTitle: string;
}) {
  const mainRef = useRef<HTMLVideoElement>(null);
  const insetRef = useRef<HTMLVideoElement>(null);
  const tracker = useRef(createProgressTracker(analyticsId, analyticsTitle));

  const [showInset, setShowInset] = useState(true);
  const [swapped, setSwapped] = useState(false);

  /** Keep the inset locked to the master's clock and play state. */
  const sync = useCallback((hard = false) => {
    const main = mainRef.current;
    const inset = insetRef.current;
    if (!main || !inset) return;

    if (hard || Math.abs(inset.currentTime - main.currentTime) > DRIFT_TOLERANCE_S) {
      inset.currentTime = main.currentTime;
    }
    if (main.paused && !inset.paused) inset.pause();
    if (!main.paused && inset.paused) void inset.play().catch(() => undefined);
    inset.playbackRate = main.playbackRate;
  }, []);

  useEffect(() => {
    // A low-frequency correction loop is enough: `timeupdate` alone drifts on
    // seek, and rAF would burn battery on a phone for no visible gain.
    const interval = window.setInterval(() => sync(), 1000);
    return () => window.clearInterval(interval);
  }, [sync]);

  // The slide feed is always the audio master and the timing master, whichever
  // of the two is currently displayed large.
  const slidesUrl = source.url;
  const speakerUrl = source.speakerUrl;

  return (
    <>
      <video
        ref={mainRef}
        className="absolute inset-0 h-full w-full bg-ink-950 object-contain"
        src={swapped ? speakerUrl : slidesUrl}
        poster={source.poster}
        controls
        autoPlay
        playsInline
        preload="metadata"
        aria-label={`${title} — ${swapped ? 'speaker' : 'presentation'} feed`}
        onPlay={() => {
          tracker.current.play();
          sync(true);
        }}
        onPause={() => sync()}
        onSeeked={() => sync(true)}
        onRateChange={() => sync()}
        onTimeUpdate={(e) => {
          const el = e.currentTarget;
          tracker.current.timeUpdate(el.currentTime, el.duration);
        }}
        onEnded={() => tracker.current.complete()}
      >
        {source.captionsUrl && (
          <track kind="captions" src={source.captionsUrl} srcLang="en" label="English" default />
        )}
      </video>

      {/* Inset feed. Muted — all audio comes from the master element. */}
      <video
        ref={insetRef}
        className={cn(
          'absolute bottom-16 right-3 w-[30%] max-w-[220px] overflow-hidden rounded-lg border border-white/20',
          'bg-ink-900 object-cover shadow-lift transition-opacity duration-300 sm:bottom-20 sm:right-5 sm:w-[24%]',
          showInset ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        src={swapped ? slidesUrl : speakerUrl}
        muted
        playsInline
        preload="metadata"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Reader controls — the phone viewer decides what gets the pixels. */}
      <div className="absolute right-3 top-3 flex gap-2 sm:right-5 sm:top-5">
        <FeedButton
          onClick={() => setSwapped((s) => !s)}
          label={swapped ? 'Show presentation full size' : 'Show speaker full size'}
        >
          <Layers className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </FeedButton>
        <FeedButton
          onClick={() => setShowInset((s) => !s)}
          label={showInset ? 'Hide the inset feed' : 'Show the inset feed'}
          pressed={showInset}
        >
          <UserSquare2 className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </FeedButton>
      </div>
    </>
  );
}

function FeedButton({
  children,
  label,
  onClick,
  pressed,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      className="grid h-10 w-10 place-items-center rounded-full bg-ink-950/70 text-white backdrop-blur-sm transition-colors hover:bg-ink-950/90"
    >
      {children}
    </button>
  );
}

/* ── YouTube / Vimeo embed ──────────────────────────────────────────────── */

function EmbedPlayer({ source, title }: { source: VideoSource; title: string }) {
  // youtube-nocookie keeps the visitor out of ad-personalisation cookies —
  // appropriate for a clinical audience, and one less consent banner to build.
  const src =
    source.provider === 'youtube'
      ? `https://www.youtube-nocookie.com/embed/${source.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&cc_load_policy=1`
      : `https://player.vimeo.com/video/${source.id}?autoplay=1&dnt=1&title=0&byline=0&portrait=0&texttrack=en`;

  return (
    <iframe
      className="absolute inset-0 h-full w-full"
      src={src}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}

/* ── Empty / blocked states ─────────────────────────────────────────────── */

function PlayerNotice({
  icon,
  heading,
  body,
  className,
}: {
  icon: ReactNode;
  heading: string;
  body: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'field-navy field-grid relative grid aspect-video place-items-center overflow-hidden rounded-card',
        className,
      )}
    >
      <div className="relative max-w-md px-6 text-center">
        <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white/70 [&>svg]:h-5 [&>svg]:w-5">
          {icon}
        </span>
        <p className="text-base font-semibold text-white">{heading}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-200">{body}</p>
      </div>
    </div>
  );
}

/** Badge stating how a master is framed, shown beside the player. */
export function LayoutBadge({ layout }: { layout?: VideoSource['layout'] }) {
  if (layout !== 'composite-ppt-speaker') return null;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-mist-100 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-ink-600">
      <LayoutTemplate className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
      Presentation + speaker
    </span>
  );
}
