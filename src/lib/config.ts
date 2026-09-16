/** Typed access to the public build-time configuration (see `.env`). */

const bool = (v: string | undefined, fallback = false): boolean =>
  v === undefined || v === '' ? fallback : v === 'true' || v === '1';

export const config = {
  siteUrl: (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, ''),
  /**
   * Master switch for the dashed "needs approval" markers and for unapproved
   * procedure items. Turn OFF before go-live: unapproved content then simply
   * does not render, satisfying the brief's medical-content rules.
   */
  showPlaceholders: bool(import.meta.env.VITE_SHOW_PLACEHOLDERS, true),
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID ?? '',
  analyticsDebug: bool(import.meta.env.VITE_ANALYTICS_DEBUG, false),
  isProd: import.meta.env.PROD,
} as const;

/** Absolute URL for canonical tags, OG tags and the sitemap. */
export const absoluteUrl = (path: string): string =>
  `${config.siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
