import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { LayoutTemplate, Layers, Play, UserSquare2, VideoOff } from 'lucide-react';
import type { VideoSource } from '@/data/types';
import { YOUTUBE_ID_PLACEHOLDER, isPlayable } from '@/data/types';
import { createProgressTracker } from '@/lib/analytics';
import { cn } from '@/lib/cn';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * VIDEO PLAYER
 * ─────────────────────────────────────────────────────────────────────────────
 * THE REQUIREMENT: the presentation and the speaker must both stay visible, and
 * the slides must stay legible on a phone.
 *
 * 1. COMPOSITE MASTER — the intended deliverable. Post-production hands over
 *    ONE file: presentation full-frame with the speaker keyed into the corner.
 *    The player is then a plain single-video player and the framing is already
 *    right on every device.
 *
 * 2. DUAL FEED — fallback. If the two sources arrive separately, set
 *    `speakerUrl` and the player composites them live: slides full-frame,
 *    speaker inset, playback clock-locked to the slide feed and drift-
 *    corrected. Viewers can move the speaker out of the way or swap which feed
 *    is large — on a 360px phone, the reader decides what gets the pixels.
 *
 * LAZY: nothing is fetched until the visitor presses play. Until then this is a
 * poster and a button, so the page stays light with a dozen recordings on it.
 *
 * NEVER AUTOPLAYS WITH SOUND: playback only ever starts from a user gesture.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/**
 * `flex-none` is load-bearing, not decoration. The player is dropped into flex
 * columns (the modal, the showcase card). As a default flex item its main size
 * resolves from content, which for an empty aspect-ratio box is zero — and the
 * whole player silently collapses to a 0px-high strip. `flex: none` keeps the
 * box sizing its own height, so `aspect-video` applies.
 */
const PLAYER_ROOT = 'relative w-full flex-none';

export interface VideoPlayerProps {
  source: VideoSource;
  title: string;
  /** Branded poster rendered as the facade before playback starts. */
  poster: ReactNode;
  analyticsId: string;
  /** Mount the player immediately — used inside the modal, opened by a tap. */
  autoStart?: boolean;
  className?: string;
}

export function VideoPlayer({
  source,
  title,
  poster,
  analyticsId,
  autoStart = false,
  className,
}: VideoPlayerProps) {
  const [active, setActive] = useState(autoStart);

  if (!isPlayable(source)) {
    const awaitingOfficialId = source.youtubeId === YOUTUBE_ID_PLACEHOLDER;
    return (
      <PlayerNotice
        heading={awaitingOfficialId ? 'Official video to be linked' : 'Recording in post-production'}
        body={
          awaitingOfficialId
            ? 'This card is reserved for an official Yashoda Hospitals video. The video ID has not been added yet — no other source will be substituted.'
            : 'This session will appear here once the composite presentation-and-speaker master has been delivered and approved.'
        }
        className={className}
      />
    );
  }

  const isDual = Boolean(source.speakerUrl && source.videoUrl);

  return (
    <div className={cn(PLAYER_ROOT, 'aspect-video overflow-hidden bg-ink-950', className)}>
      {!active ? (
        <PlayerFacade title={title} poster={poster} onActivate={() => setActive(true)} />
      ) : isDual ? (
        <DualFeedPlayer source={source} title={title} analyticsId={analyticsId} />
      ) : source.videoUrl ? (
        <SingleFilePlayer source={source} title={title} analyticsId={analyticsId} />
      ) : (
        <YouTubeEmbed source={source} title={title} />
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
}: {
  source: VideoSource;
  title: string;
  analyticsId: string;
}) {
  const tracker = useRef(createProgressTracker(analyticsId, title));

  return (
    <video
      className="absolute inset-0 h-full w-full bg-ink-950"
      src={source.videoUrl}
      poster={source.thumbnail}
      controls
      autoPlay
      playsInline
      preload="metadata"
      aria-label={title}
      onPlay={() => tracker.current.play()}
      onTimeUpdate={(e) => tracker.current.timeUpdate(e.currentTarget.currentTime, e.currentTarget.duration)}
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
}: {
  source: VideoSource;
  title: string;
  analyticsId: string;
}) {
  const mainRef = useRef<HTMLVideoElement>(null);
  const insetRef = useRef<HTMLVideoElement>(null);
  const tracker = useRef(createProgressTracker(analyticsId, title));

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
    // A one-second correction loop is enough: `timeupdate` alone drifts on seek,
    // and rAF would burn battery on a phone for no visible gain.
    const interval = window.setInterval(() => sync(), 1000);
    return () => window.clearInterval(interval);
  }, [sync]);

  const slidesUrl = source.videoUrl;
  const speakerUrl = source.speakerUrl;

  return (
    <>
      <video
        ref={mainRef}
        className="absolute inset-0 h-full w-full bg-ink-950 object-contain"
        src={swapped ? speakerUrl : slidesUrl}
        poster={source.thumbnail}
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
        onTimeUpdate={(e) => tracker.current.timeUpdate(e.currentTarget.currentTime, e.currentTarget.duration)}
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

      <div className="absolute right-3 top-3 flex gap-2 sm:right-5 sm:top-5">
        <FeedButton
          onClick={() => setSwapped((v) => !v)}
          label={swapped ? 'Show presentation full size' : 'Show speaker full size'}
        >
          <Layers className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </FeedButton>
        <FeedButton
          onClick={() => setShowInset((v) => !v)}
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

/* ── Official Yashoda YouTube embed ─────────────────────────────────────── */

function YouTubeEmbed({ source, title }: { source: VideoSource; title: string }) {
  // youtube-nocookie keeps a clinical audience out of ad-personalisation
  // cookies, and is one less consent banner to build.
  const src =
    `https://www.youtube-nocookie.com/embed/${source.youtubeId}` +
    '?autoplay=1&rel=0&modestbranding=1&playsinline=1&cc_load_policy=1';

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

/* ── Empty state ────────────────────────────────────────────────────────── */

function PlayerNotice({
  heading,
  body,
  className,
}: {
  heading: string;
  body: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        PLAYER_ROOT,
        'field-navy field-grid grid aspect-video place-items-center overflow-hidden',
        className,
      )}
    >
      <div className="relative max-w-md px-6 text-center">
        <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white/70">
          <VideoOff className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </span>
        <p className="text-base font-semibold text-white">{heading}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-200">{body}</p>
      </div>
    </div>
  );
}

/** Badge stating how a master is framed, shown beside the player. */
export function LayoutBadge({ layout }: { layout?: VideoSource['layout'] }) {
  if (layout !== 'presentation-and-speaker') return null;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-mist-100 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-ink-600">
      <LayoutTemplate className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
      Presentation + speaker
    </span>
  );
}
