import { config } from './config';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ANALYTICS (§27)
 * ─────────────────────────────────────────────────────────────────────────────
 * Purpose: understand how many of the ~100–120 invited clinicians actually open
 * the link and how far down the funnel they travel.
 *
 * PRIVACY: no personal data is collected here — no names, no email addresses,
 * no identifiers, no free text. Events carry the page, the content id and the
 * playback position only. If you later add a vendor, keep it to that.
 *
 * TRANSPORT: every event is pushed to `window.dataLayer`, so Google Tag Manager,
 * GA4, Matomo or a server-side collector can consume it with no code change
 * here. If VITE_GA_MEASUREMENT_ID is set, gtag.js is loaded lazily and the same
 * events are forwarded to it.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** The complete event catalogue. Adding an event means adding a case here. */
export type AnalyticsEvent =
  | { name: 'page_view'; path: string; title: string }
  | { name: 'cta_click'; cta: string; location: string; destination: string }
  | { name: 'view_recorded_talks_click'; location: string }
  | { name: 'capability_card_click'; capability: string; location: string }
  | { name: 'showcase_view'; showcase: 'ecmo' | 'interventions' | 'lung-transplant' }
  | { name: 'showcase_cta_click'; showcase: string; destination: string }
  | { name: 'video_open'; talkId: string; title: string; category: string }
  | { name: 'video_play'; talkId: string; title: string }
  | { name: 'video_progress'; talkId: string; percent: 25 | 50 | 75 }
  | { name: 'video_complete'; talkId: string; title: string }
  | { name: 'library_filter'; filter: string }
  | { name: 'doctor_profile_click'; doctorId: string }
  | { name: 'nav_open' }
  | { name: 'share_click'; channel: 'whatsapp' | 'copy-link'; path: string };

type DataLayerRecord = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: DataLayerRecord[];
    gtag?: (...args: unknown[]) => void;
  }
}

let gtagLoaded = false;

/** Loads gtag.js on first event, never during initial page paint. */
function ensureGtag(): void {
  if (gtagLoaded || !config.gaMeasurementId || typeof document === 'undefined') return;
  gtagLoaded = true;

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${config.gaMeasurementId}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    window.dataLayer!.push(arguments as unknown as DataLayerRecord);
  };
  window.gtag('js', new Date());
  window.gtag('config', config.gaMeasurementId, {
    send_page_view: false,
    anonymize_ip: true,
  });
}

/** Fire an analytics event. Safe to call during SSR or with no vendor configured. */
export function track(event: AnalyticsEvent): void {
  if (typeof window === 'undefined') return;

  const { name, ...params } = event;
  const payload: DataLayerRecord = { event: name, ...params };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  ensureGtag();
  window.gtag?.('event', name, params);

  if (config.analyticsDebug) {
    console.info('[analytics]', name, params);
  }
}

/**
 * Milestone tracker for a single video. Keeps its own memory so each of
 * 25 / 50 / 75 / complete fires at most once per mount.
 */
export function createProgressTracker(talkId: string, title: string) {
  const fired = new Set<number>();
  return {
    play() {
      if (fired.has(0)) return;
      fired.add(0);
      track({ name: 'video_play', talkId, title });
    },
    timeUpdate(currentTime: number, duration: number) {
      if (!duration || !Number.isFinite(duration)) return;
      const percent = (currentTime / duration) * 100;
      for (const milestone of [25, 50, 75] as const) {
        if (percent >= milestone && !fired.has(milestone)) {
          fired.add(milestone);
          track({ name: 'video_progress', talkId, percent: milestone });
        }
      }
    },
    complete() {
      if (fired.has(100)) return;
      fired.add(100);
      track({ name: 'video_complete', talkId, title });
    },
  };
}
