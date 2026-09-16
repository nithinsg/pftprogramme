# Content guide

For the medical and marketing teams. Everything on the page is edited in
`src/data/` — no layout needs to be touched to change what it says.

---

## The two modes

`VITE_SHOW_PLACEHOLDERS` in `.env`:

| Mode | Setting | Behaviour |
| --- | --- | --- |
| **Review** | `true` | Unverified content renders with a dashed marker and a note saying what it needs. |
| **Go-live** | `false` | Unverified content **does not render at all**. Only `verified` items reach a visitor. |

Every record carries a `status` of `placeholder` or `verified`.
**Change the text, then change the status.**

---

## What must never be invented

- Speaker names, session titles, designations or institutions
- Doctor credentials, qualifications, awards or publications
- Patient numbers, procedure counts, success rates, outcomes
- Superlatives: "world-class", "leading", "best", "No. 1"
- Phone numbers, email addresses or URLs not officially supplied
- **YouTube video IDs** — see below

---

## Where each thing lives

| You want to change… | Edit |
| --- | --- |
| Hospital name, event facts, navigation, footer links | `src/data/site.ts` |
| Dr. Viswesvaran's profile and expertise areas | `src/data/doctor.ts` |
| Somajiguda capability grid and programme highlights | `src/data/capabilities.ts` |
| The curated official Yashoda videos | `src/data/showcaseVideos.ts` |
| The recorded sessions | `src/data/sessions.ts` |
| The event-day vertical loop | `src/data/eventScreen.ts` |
| Brand colours | `tailwind.config.ts` |

---

## Dr. Viswesvaran's profile — verify before go-live

The name, designation and qualifications in `src/data/doctor.ts` were supplied
as coming from the official Yashoda profile and are transcribed verbatim.
Nothing was added or inferred.

**The build could not reach yashodahospitals.com to check them.** Before
go-live:

- [ ] Compare every qualification line against the official profile
- [ ] Confirm the designation wording matches
- [ ] Save the approved portrait to `/public/media/` and set `photo`
- [ ] Confirm the portrait is cleared for use on this domain

Deliberately absent because they were not supplied: years of experience,
procedure volumes, publications, memberships, and any outcome claim. Add them
only from the official profile.

---

## The curated videos — never guess an ID

`src/data/showcaseVideos.ts` names the official Yashoda videos but carries no
IDs. Every `youtubeId` is the token `[INSERT OFFICIAL YASHODA VIDEO ID]`, and
the player shows a labelled empty state rather than embedding a guess.

To publish one:

1. Open the official Yashoda Hospitals YouTube channel or the doctor's profile page.
2. Find the video by its exact title.
3. Copy the id out of the watch URL — `youtube.com/watch?v=THIS_PART`.
4. Paste it into `youtubeId` and set `status: 'verified'`.

**Only official Yashoda uploads.** Never a re-upload, a third-party medical
channel, or a patient-uploaded video. If a video cannot be found, delete the
card rather than substituting something else.

---

## Adding a recorded session

```ts
{
  id: 'session-01',                    // any stable slug
  title: 'Interpreting the Flow–Volume Loop',
  speaker: 'Dr. Example Name',
  designation: 'Consultant Pulmonologist',
  institution: 'Yashoda Hospitals, Somajiguda',
  category: 'Foundations',             // groups the library; free text
  duration: '24:15',
  description: 'Two or three sentences, approved by the speaker.',
  video: {
    youtubeId: 'XXXXXXXXXXX',          // or videoUrl for a self-hosted file
    layout: 'presentation-and-speaker',
    captionsUrl: '/media/session-01.vtt',   // optional, enables captions
  },
  status: 'verified',
}
```

**Before the master exists**, leave `video: { youtubeId: '' }`. The card still
renders and the player shows a designed "in post-production" state.

### Video sources

| Situation | `video` |
| --- | --- |
| Composite master on YouTube | `{ youtubeId: '…' }` (uses youtube-nocookie) |
| Self-hosted composite MP4 | `{ videoUrl: '/media/….mp4', thumbnail: '…jpg' }` |
| Two feeds delivered separately | `{ videoUrl: '<slides>', speakerUrl: '<speaker>' }` — the player composites them live |
| Not yet delivered | `{ youtubeId: '' }` |

---

## Thumbnails

You do not need to design one. Every session gets a consistent branded
thumbnail, drawn in the browser from its own data:

```
PULMO MENTOR · PFT
[Session title]
[Speaker] · [Institution]      [speaker portrait]
YASHODA HOSPITALS · SOMAJIGUDA
```

Add `speakerPhoto: '/media/speakers/name.jpg'` to drop in a portrait. A designed
JPEG overrides the whole thing via `video.thumbnail`, but the generated one
stays consistent for free and needs no re-export when a title changes.

**Speaker portraits:** square or 4:5, head and shoulders, min 800px, neutral
background. Until one is supplied the card shows a neutral glyph — never a stock
portrait standing in for a real clinician.

---

## Photography

Image slots carry a `brief` describing the shot needed, visible on screen in
review mode. House rules:

- No identifiable patient without documented consent and institutional approval
- No identifiable staff member without a release
- Any screen in shot must show non-identifiable or cleared studies
- Prefer real Yashoda-approved imagery over stock

---

## The WhatsApp preview

This link will be distributed over WhatsApp, which shows a branded preview card
generated by `npm run og`. Re-run it after changing the event name, tagline or
logo — and do it **before** the link is first shared, because WhatsApp caches
previews aggressively.

Test it by sending the live link to yourself before the bulk send.
