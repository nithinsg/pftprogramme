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

### Funnel

| Event | Fires when | Payload |
| --- | --- | --- |
| `page_view` | Any route change | `path`, `title` |
| `cta_click` | Any CTA button | `cta`, `location`, `destination` |
| `view_recorded_talks_click` | The primary CTA, anywhere | `location` — `hero`, `navbar`, `mobile-nav`, `sticky-cta`, `home-final-cta`, … |
| `library_filter` | A topic filter is chosen | `filter` |
| `nav_open` | Mobile menu opened | — |
| `share_click` | WhatsApp or copy-link | `channel`, `path` |

### Capability engagement

| Event | Fires when | Payload |
| --- | --- | --- |
| `showcase_view` | An ECMO / interventions / transplant section scrolls into view | `showcase` |
| `showcase_cta_click` | A showcase CTA is clicked | `showcase`, `destination` |
| `capability_card_click` | A capability tile or showcase card | `capability`, `location` |
| `doctor_profile_click` | "View profile" on a faculty card | `doctorId` |

### Video

| Event | Fires when | Payload |
| --- | --- | --- |
| `video_open` | A talk page is opened from a card | `talkId`, `title`, `category` |
| `video_play` | Playback actually starts | `talkId`, `title` |
| `video_progress` | 25% / 50% / 75% watched, once each | `talkId`, `percent` |
| `video_complete` | Playback reaches the end | `talkId`, `title` |

`video_open` and `video_play` are deliberately separate: the gap between them is
how many people opened a session and did not press play.

---

## What to look at after the event

1. **Reach** — unique `page_view` on `/` against the ~100–120 invited.
2. **Depth** — `showcase_view` counts. Did the ECMO / interventions / transplant
   story actually get seen, or did people jump straight to the CTA?
3. **Conversion to the library** — `view_recorded_talks_click` over `page_view` on `/`,
   split by `location`. If `sticky-cta` dominates, the page is too long; if
   `hero` dominates, the profile content is being skipped.
4. **Which sessions matter** — `video_open` grouped by `talkId`.
5. **Watch-through** — `video_progress` at 75% over `video_play`. This is the
   number that tells you whether the composite presentation-and-speaker framing
   is working. A cliff before 25% usually means the slides are unreadable on a
   phone.
6. **Onward sharing** — `share_click`, which indicates the content travelled
   beyond the invited list.

## Suggested GA4 setup

- Mark `view_recorded_talks_click` and `video_play` as conversions.
- Build an exploration funnel: `page_view` (`/`) → `showcase_view` →
  `view_recorded_talks_click` → `video_open` → `video_play` → `video_progress` (75).
- Because the link is sent once to a known list, absolute counts are more useful
  than rates. Report "37 of ~110 opened the link, 22 reached the library,
  14 played a session" rather than percentages.
