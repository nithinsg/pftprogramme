# Pulmo Mentor BFD — Yashoda Hospitals, Somajiguda

A post-event digital experience for the **Pulmo Mentor BFD Workshop** and the
Department of Pulmonology at **Yashoda Hospitals, Somajiguda**.

It is two things at once: a premium profile of the department's advanced
pulmonary capabilities, and the video library for the workshop recordings — in
that order, deliberately.

## The one rule this site is built around

> **The post-event link must not open a video.**

A delegate taps a WhatsApp link and lands on the branded workshop page. They
meet the hospital, the department, the faculty, and the three capability stories
— ECMO, advanced pulmonary interventions, lung transplantation — *before* the
recordings are offered as a destination.

```
Workshop → WhatsApp link → Somajiguda profile → Capabilities
   → ECMO / Interventions / Lung transplant → "View Recorded Talks"
   → Video library → Individual talk (presentation + speaker)
```

No `<video>` element is mounted anywhere on the landing page.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve the production build
npm run typecheck  # tsc only
npm run og         # re-render the WhatsApp/OG preview card and touch icon
```

Node 20+. Copy `.env.example` to `.env.local` and set `VITE_SITE_URL` to the
real origin before deploying — it is used for canonical URLs, the sitemap and
the absolute Open Graph image URL.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page — branding, faculty, capabilities, the three showcases, then the CTA |
| `/capabilities` | Pulmonology capabilities |
| `/ecmo` | ECMO / extracorporeal support showcase |
| `/interventions` | Advanced pulmonary interventions showcase |
| `/lung-transplant` | Lung transplantation showcase |
| `/recordings` | The video library, filterable by topic (`?topic=ecmo`) |
| `/recordings/:id` | An individual recorded talk |
| `/doctors` | Faculty directory |
| `/about` | Somajiguda Pulmonology overview |
| `/event-screen` | **Internal.** Event-day 9:16 loop — storyboard, spec, live preview |
| `/recording-spec` | **Internal.** Two-source capture and composite delivery spec |

The two internal routes are `noindex` and excluded from the sitemap. They are
working documents for the production and content teams.

## Stack

React 18 + TypeScript + Vite + Tailwind CSS + React Router + lucide-react.
No animation library — scroll reveals use a single `IntersectionObserver` per
element and honour `prefers-reduced-motion`. Inter is self-hosted.

## Adding a recording

One object in `src/data/talks.ts`:

```ts
{
  id: 'ebus-mediastinum',          // becomes /recordings/ebus-mediastinum
  title: 'EBUS and the Mediastinum',
  speaker: 'Dr. …',
  designation: '…',
  institution: '…',
  category: 'interventions',        // drives the filter chip
  session: 'Session 03 — The Airway',
  duration: '25:30',
  description: '…',
  video: { provider: 'youtube', id: '…', layout: 'composite-ppt-speaker' },
  featured: false,
  status: 'approved',
}
```

That single record produces the library card, the branded thumbnail, the session
grouping, the filter count, the individual page, the related-talks rail and the
sitemap entry. Nothing else needs editing.

See [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md) for the full hand-off.

## Project structure

```
src/
  data/          Content models and all content. No component hard-codes content.
    types.ts       Talk, Doctor, Capability, Showcase, CaseVideo, EventScreenSlot
    site.ts        Brand, navigation, footer, CTAs
    talks.ts       The recordings library  ← add recordings here
    doctors.ts     Faculty + department profile
    capabilities.ts, showcases.ts, eventScreen.ts
  lib/           config, analytics, seo, hooks, cn
  components/
    layout/        Navbar, Footer, StickyCta, Logo, Layout
    ui/            Button, Section, Reveal, MediaFrame, ContentStatus, ShareBar, …
    home/          Hero, DoctorProfile, DepartmentProfile, ShowcaseSection,
                   CapabilityGrid, ShowcaseIndex, ContinueLearning, CTASection
    video/         VideoCard, VideoGrid, VideoPlayer, TalkThumbnail, VideoFilters,
                   SpeakerProfile, RelatedTalks, CaseVideoCard, CompositeLayoutSpec
    event/         VerticalVideoShowcase
  pages/         One file per route
scripts/         OG card renderer
docs/            Content guide, recording spec, vertical loop storyboard, analytics
```

## Medical content rules

This is a healthcare site, and the build enforces the constraint rather than
relying on good intentions.

- **Nothing is invented.** No clinician is named, no credential, qualification,
  award, publication, patient number, success rate, procedure count or clinical
  outcome appears anywhere. Placeholders use the brief's `Dr. [Name]` notation.
- **Every content item carries a `status`** — `approved`, `placeholder` or
  `awaiting-approval`.
- **`VITE_SHOW_PLACEHOLDERS` is the master switch.** `true` (review mode) renders
  unapproved content with a visible marker so the medical team can see what still
  needs copy. `false` (go-live) means unapproved content **does not render at
  all** — nothing unsigned-off can reach a visitor.
- **Case films are consent-gated.** A film with `consent: 'required'` will not
  play; `VideoPlayer` refuses to mount the source and explains why instead.

Contact details in `src/data/site.ts` are intentionally empty. Fill them in only
from officially supplied details — no phone number, email or URL is invented.

## Brand assets

The official Yashoda logo is **not** included and no mark has been invented. The
header, footer, favicon and OG card render a neutral typographic lockup until an
official asset is supplied:

1. Drop the logo into `public/media/` and set `site.logo.src` in `src/data/site.ts`.
2. Replace `public/favicon.svg` and the `.mono` block in `scripts/og-template.html`.
3. Re-run `npm run og`.

The colour tokens in `tailwind.config.ts` are a restrained placeholder palette built in the
spirit of the identity — deep navy, white, neutral greys, one warm accent. It is
not sampled from an official brand sheet. Replace the `ink` and `accent` scales
when the guideline arrives; nothing else in the codebase hard-codes a brand
colour, so the whole site re-skins from that one file.

## Deployment

Static SPA — any static host works. Deep links need a rewrite to `index.html`,
which is already configured for Vercel (`vercel.json`) and Netlify
(`public/_redirects`).

`sitemap.xml` and `robots.txt` are generated at build time from `VITE_SITE_URL`
and the live talk data, so they cannot drift.

**Before go-live**

- [ ] Set `VITE_SITE_URL` to the real origin
- [ ] Set `VITE_SHOW_PLACEHOLDERS=false`
- [ ] Set `VITE_GA_MEASUREMENT_ID` (or wire `window.dataLayer` to your own tag manager)
- [ ] Replace faculty, session, capability and showcase content; set each `status` to `approved`
- [ ] Add the official logo and re-run `npm run og`
- [ ] Add hospital contact details in `src/data/site.ts`
- [ ] Test the WhatsApp preview by sending the live link to yourself

## Documentation

| Document | For |
| --- | --- |
| [`docs/CONTENT-GUIDE.md`](docs/CONTENT-GUIDE.md) | The medical / marketing team |
| [`docs/RECORDING-SPEC.md`](docs/RECORDING-SPEC.md) | The video production team |
| [`docs/VERTICAL-LOOP-STORYBOARD.md`](docs/VERTICAL-LOOP-STORYBOARD.md) | The video editor |
| [`docs/ANALYTICS.md`](docs/ANALYTICS.md) | Whoever reads the numbers after the event |
