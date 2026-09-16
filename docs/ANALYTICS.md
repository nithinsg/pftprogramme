# Analytics

The question this instrumentation exists to answer:

> Of the ~100–120 clinicians who were sent the link, how many opened it, how far
> down the page did they get, and how many actually watched a talk?

---

## How it works

`src/lib/analytics.ts` exposes one typed function:

```ts
track({ name: 'video_play', talkId: 'ebus-mediastinum', title: '…' });
```

Every event is pushed to `window.dataLayer`, so Google Tag Manager, GA4, Matomo
or a server-side collector can consume it with no code change. If
`VITE_GA_MEASUREMENT_ID` is set, `gtag.js` is loaded **lazily on the first
event** — never during initial page paint — and the same events are forwarded.

Set `VITE_ANALYTICS_DEBUG=true` to log every event to the console while testing.

## Privacy

No personal data is collected. No names, email addresses, identifiers or free
text. Events carry the page path, a content id and a playback position. IP
anonymisation is on. Keep it that way if you add a vendor.

---

## Event catalogue

The union type in `src/lib/analytics.ts` is the source of truth. Adding an event
means adding a case to it, so the catalogue cannot drift from the code.

### Reach and depth

| Event | Fires when | Payload |
| --- | --- | --- |
| `page_view` | The page loads | `path`, `title` |
| `scroll_depth` | 25 / 50 / 75 / 100% of the page, once each | `percent` |
| `section_view` | A section first enters the viewport | `section` |
| `nav_click` | An anchor link is used | `anchor` |
| `nav_open` | Mobile menu opened | — |
| `share_click` | WhatsApp or copy-link | `channel` |

`section_view` is the one that answers the brief's real question — did visitors
actually reach the course director and the capability grid, or did they scroll
straight past to the recordings?

### The CTA

| Event | Fires when | Payload |
| --- | --- | --- |
| `cta_click` | Any CTA | `cta`, `location` |
| `watch_sessions_click` | The primary CTA, anywhere | `location` — `navbar`, `mobile-nav`, `sticky-cta`, `main-cta` |

### Video

| Event | Fires when | Payload |
| --- | --- | --- |
| `showcase_video_open` | A curated official Yashoda video is opened | `videoId`, `title`, `category` |
| `session_open` | A recording is opened in the modal | `sessionId`, `title`, `category` |
| `video_play` | Playback actually starts | `videoId`, `title` |
| `video_progress` | 25% / 50% / 75% watched, once each | `videoId`, `percent` |
| `video_complete` | Playback reaches the end | `videoId`, `title` |

`session_open` and `video_play` are deliberately separate: the gap between them
is how many people opened a session and did not press play.

---

## What to look at after the event

1. **Reach** — `page_view` against the ~100–120 attendees.
2. **Depth** — `scroll_depth` and `section_view`. Did the course director and
   capability sections actually get seen, or did people jump to the CTA?
3. **Conversion** — `watch_sessions_click` over `page_view`, split by `location`.
   If `sticky-cta` dominates, the page is too long; if `navbar` dominates, the
   story before the CTA is being skipped.
4. **Which sessions matter** — `session_open` grouped by `sessionId`.
5. **Watch-through** — `video_progress` at 75% over `video_play`. This is the
   number that tells you whether the composite presentation-and-speaker framing
   is working. A cliff before 25% usually means the slides are unreadable on a
   phone.
6. **Did the expertise land** — `showcase_video_open`. A doctor who watches an
   EBUS video on the way to the recordings is the exact behaviour this page was
   built to produce.
7. **Onward sharing** — `share_click`.

## Suggested GA4 setup

- Mark `watch_sessions_click` and `video_play` as conversions.
- Build an exploration funnel: `page_view` → `section_view` (course-director) →
  `section_view` (capabilities) → `watch_sessions_click` → `session_open` →
  `video_play` → `video_progress` (75).
- Because the link is sent once to a known list, absolute counts are more useful
  than rates. Report "37 of ~110 opened the link, 22 reached the library,
  14 played a session" rather than percentages.
