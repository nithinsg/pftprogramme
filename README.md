# Pulmo Mentor Master Class in PFT — Yashoda Hospitals, Somajiguda

A single-page post-event experience for the doctors who attended the
**Pulmo Mentor Master Class in PFT**, 20 September 2026 at Yashoda Hospitals,
Somajiguda, Hyderabad.

## The one rule this page is built around

> **The recordings are the destination, not the opening.**

A doctor taps a link and meets the hospital, the course director and the
pulmonary ecosystem at Somajiguda *before* the workshop recordings are offered.
The page reads as one continuous story:

```
Hero → Workshop → Dr. B. Viswesvaran → Expertise → Somajiguda capabilities
     → From PFT to advanced practice → Official Yashoda videos
     → "Watch Recorded Sessions" → Recorded sessions
```

No video element is mounted anywhere above the CTA except by a deliberate tap,
and no session player exists until a recording is opened.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build
npm run typecheck  # tsc only
npm run og         # re-render the WhatsApp/OG card and the touch icon
```

Node 20+. Copy `.env.example` to `.env.local` and set `VITE_SITE_URL` to the
real origin before deploying.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | **The entire public site.** One page; recordings open in a modal. |
| `/event-screen` | **Internal.** Event-day 9:16 loop — storyboard, spec, live preview. |
| `/recording-spec` | **Internal.** Two-source capture and composite delivery spec. |

Both internal routes are `noindex`, excluded from the sitemap and unlinked from
the public page. They are working documents for the production team. Any other
path redirects to `/`.

## Stack

React 18 + TypeScript + Vite + Tailwind CSS + lucide-react. No animation
library — scroll reveals use a single `IntersectionObserver` per element and
honour `prefers-reduced-motion`. Inter is self-hosted. React Router carries only
the two internal routes.

## Adding a recording

One object in `src/data/sessions.ts`:

```ts
{
  id: 'session-01',
  title: 'Interpreting the Flow–Volume Loop',
  speaker: 'Dr. …',
  designation: '…',
  institution: '…',
  category: 'Foundations',
  duration: '24:15',
  description: 'Approved description, cleared by the speaker.',
  video: { youtubeId: '…', layout: 'presentation-and-speaker' },
  status: 'verified',
}
```

That single record produces the card, the branded thumbnail, the category
grouping and the modal player. Nothing else needs editing.

See [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md) for the full hand-off.

## Project structure

```
src/
  data/            Content models and all content. No component hard-codes content.
    types.ts         Session, ShowcaseVideo, ExpertiseArea, Capability, EventScreenSlot
    site.ts          Brand, event facts, anchor navigation, footer
    doctor.ts        Dr. B. Viswesvaran + his expertise areas
    capabilities.ts  Somajiguda capability grid + official programme highlights
    sessions.ts      The recordings  ← add recordings here
    showcaseVideos.ts  Curated official Yashoda videos
    eventScreen.ts   The 9:16 venue loop
  lib/             config, analytics, seo, hooks, cn
  components/
    layout/          Navbar, Footer, StickyCta, Logo
    ui/              Button, Section, Reveal, MediaFrame, ContentStatus, Icon, ShareBar
    sections/        Hero, WorkshopIntro, DoctorProfile, ExpertiseGrid,
                     CapabilitySection, PftBridge, VideoShowcase, CTASection,
                     RecordedSessions, PhysiologyVisual
    video/           VideoPlayer, VideoModal, SessionThumbnail, SpeakerAvatar,
                     CompositeLayoutSpec
    event/           VerticalVideoShowcase
  pages/           Landing (the site) + two internal production pages
```

## Content safety

- **Nothing is invented.** No speaker name, session title, patient outcome,
  success rate, procedure count, award or superlative appears anywhere.
- **Dr. Viswesvaran's credentials are transcribed, not authored.** They were
  supplied as coming from the official Yashoda profile and are reproduced
  verbatim in `src/data/doctor.ts`. This build could not reach
  yashodahospitals.com to verify them — **check each line against the official
  profile before go-live**, and confirm the portrait is cleared for this domain.
- **No YouTube ID is ever guessed.** Every curated video carries the token
  `[INSERT OFFICIAL YASHODA VIDEO ID]` until an official id is pasted in. The
  player renders a labelled empty state rather than embedding a wrong video.
- **`VITE_SHOW_PLACEHOLDERS` is the master switch.** `true` (review) renders
  unverified content with a visible marker; `false` (go-live) means unverified
  content does not render at all.

Contact details and footer URLs in `src/data/site.ts` are intentionally empty.
Fill them in only from officially supplied details.

## Brand assets

The official Yashoda logo is **not** included and no mark has been invented.
The header, footer, favicon and OG card render a neutral typographic lockup:

1. Drop the logo into `public/media/` and set `site.logo.src` in `src/data/site.ts`.
2. Replace `public/favicon.svg` and the `.mono` block in `scripts/og-template.html`.
3. Re-run `npm run og`.

The colour tokens in `tailwind.config.ts` are a restrained placeholder palette
— deep navy, white, neutral greys, one warm accent. Replace the `ink` and
`accent` scales when the official guideline arrives; nothing else hard-codes a
brand colour, so the whole site re-skins from that one file.

## Deployment

Static SPA. Deep links need a rewrite to `index.html`, configured for Vercel
(`vercel.json`) and Netlify (`public/_redirects`). `sitemap.xml` and
`robots.txt` are generated at build time from `VITE_SITE_URL`.

**Before go-live**

- [ ] Set `VITE_SITE_URL` to the real origin
- [ ] Set `VITE_ROBOTS=index` — it is `noindex` on every staging deployment so a
      page carrying the hospital's name is never indexed with placeholder content
- [ ] Set `VITE_SHOW_PLACEHOLDERS=false`
- [ ] Set `VITE_GA_MEASUREMENT_ID` (or wire `window.dataLayer` to your tag manager)
- [ ] Verify Dr. Viswesvaran's credentials against the official profile
- [ ] Add his approved portrait
- [ ] Paste the official Yashoda YouTube IDs into `src/data/showcaseVideos.ts`
- [ ] Fill in the real sessions in `src/data/sessions.ts`
- [ ] Add the official logo and re-run `npm run og`
- [ ] Test the WhatsApp preview by sending the live link to yourself

## Documentation

| Document | For |
| --- | --- |
| [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md) | The medical / marketing team |
| [`docs/RECORDING-SPEC.md`](docs/RECORDING-SPEC.md) | The video production team |
| [`docs/VERTICAL-LOOP-STORYBOARD.md`](docs/VERTICAL-LOOP-STORYBOARD.md) | The video editor |
| [`docs/ANALYTICS.md`](docs/ANALYTICS.md) | Whoever reads the numbers after the event |
