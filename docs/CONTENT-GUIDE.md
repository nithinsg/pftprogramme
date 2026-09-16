# Content guide

For the medical and marketing teams. Everything on the site is edited in
`src/data/` — no page layout needs to be touched to change what it says.

---

## The two modes

The site runs in one of two modes, set by `VITE_SHOW_PLACEHOLDERS` in `.env`:

| Mode | Setting | Behaviour |
| --- | --- | --- |
| **Review** | `true` | Unapproved content renders with a dashed marker and a note saying what it needs. Use this while the team is filling content in. |
| **Go-live** | `false` | Unapproved content **does not render at all**. Only `approved` items reach a visitor. |

Every content record carries a `status`:

- `placeholder` — sample scaffolding shipped with the build
- `awaiting-approval` — real text drafted, not yet signed off
- `approved` — cleared by the hospital, renders clean

**The rule: change the text, then change the status.** Content that has not been
approved cannot be published by accident.

---

## What must never be invented

This is a healthcare site. The following do not appear anywhere in the build,
and must not be added without documented approval:

- Doctor names, designations, qualifications, awards or publications
- Patient numbers, procedure counts, success rates, mortality rates or outcomes
- Testimonials, patient identities or any identifiable patient material
- Phone numbers, email addresses or URLs that were not officially supplied

Capability statements — *what the department does* — are fine. Claims about
*how much* or *how well* are not, until the department supplies and approves them.

---

## Where each thing lives

| You want to change… | Edit |
| --- | --- |
| Hospital name, centre, department, taglines, navigation, footer links | `src/data/site.ts` |
| Faculty profiles and the department overview | `src/data/doctors.ts` |
| The ten capability tiles | `src/data/capabilities.ts` |
| ECMO / Interventions / Lung transplant showcases and case films | `src/data/showcases.ts` |
| The recorded talks library | `src/data/talks.ts` |
| The event-day vertical screen loop | `src/data/eventScreen.ts` |
| Brand colours | `tailwind.config.ts` |

---

## Adding a recorded talk

Add one object to the `talks` array in `src/data/talks.ts`:

```ts
{
  id: 'ebus-mediastinum',            // URL slug: /recordings/ebus-mediastinum
  title: 'EBUS and the Mediastinum: Staging and Sampling',
  speaker: 'Dr. Example Name',
  designation: 'Consultant Pulmonologist',
  institution: 'Yashoda Hospitals, Somajiguda',
  category: 'interventions',          // workshop | diagnostics | interventions | ecmo | transplant
  session: 'Session 03 — The Airway',
  duration: '25:30',
  description: 'Two or three sentences, approved by the speaker.',
  video: {
    provider: 'youtube',              // youtube | vimeo | file | pending
    id: 'XXXXXXXXXXX',
    layout: 'composite-ppt-speaker',
    captionsUrl: '/media/ebus.vtt',   // optional, enables the captions track
  },
  takeaways: ['…', '…', '…'],         // optional teaching points
  featured: false,
  status: 'approved',
}
```

That produces the library card, thumbnail, session grouping, filter count, the
individual page, the related-talks rail and the sitemap entry.

**Before the master exists**, leave `video: { provider: 'pending' }`. The page
still works and shows a designed "in post-production" state rather than a broken
player.

### Video sources

| Situation | `video` |
| --- | --- |
| Composite master on YouTube | `{ provider: 'youtube', id: '…' }` (uses youtube-nocookie) |
| Composite master on Vimeo | `{ provider: 'vimeo', id: '…' }` |
| Self-hosted composite MP4 | `{ provider: 'file', url: '/media/….mp4', poster: '/media/….jpg' }` |
| Two feeds delivered separately | `{ provider: 'file', url: '<slides>', speakerUrl: '<speaker>' }` — the player composites them live |
| Not yet delivered | `{ provider: 'pending' }` |

---

## Thumbnails

You do not need to design one. Every talk gets a consistent branded thumbnail,
drawn in the browser from the talk's own data:

```
PULMO MENTOR BFD
[Talk title]
Dr. [Name] · [Institution]      [speaker portrait]
YASHODA HOSPITALS · SOMAJIGUDA
```

Adding `speakerPhoto: '/media/speakers/name.jpg'` drops the portrait in. A
designed JPEG can override the whole thing with `thumbnail: '/media/…jpg'`, but
the generated one stays consistent across the library for free, is crisp on
every screen, and does not need re-exporting when a title changes.

**Speaker portraits:** square or 4:5, head and shoulders, min 800px, neutral
background. Until one is supplied the card shows a neutral placeholder glyph —
never a stock portrait standing in for a real clinician.

---

## Photography briefs

Each image slot carries a `brief` describing the shot needed. They appear on
screen in review mode, so a photographer can walk the site and see exactly what
is wanted. Fill in `src/…` `media.src` and set `media.status` to `approved`.

House rules for every photograph:

- No identifiable patient without documented consent and institutional approval
- No identifiable staff member without a release
- Any screen in shot must show non-identifiable or cleared studies
- Landscape 16:9 or 3:2, minimum 2000px wide, cool clinical grade

---

## Case and procedure films

In `src/data/showcases.ts`, each `caseVideos` entry has a `consent` field. A film
only plays when **both**:

- `consent: 'on-file'` — documentation is held, and
- `status: 'approved'` — cleared for publication

Otherwise the player refuses to mount the source and explains why. This is
deliberate: it is not possible to publish an unconsented film by forgetting a
step.

---

## Procedures

Procedure items in `src/data/showcases.ts` follow the brief's rule that specific
procedures appear only once approved content exists. In go-live mode, a
procedure with `status: 'awaiting-approval'` is not rendered. Approve each one
individually as the department signs it off.

---

## Contact details

`site.contact` in `src/data/site.ts` is empty on purpose. The footer shows a
placeholder note instead of a fabricated number. Fill in only what the hospital
officially supplies:

```ts
contact: {
  website: 'https://…',
  phone: '+91 …',
  email: '…@…',
  address: 'Somajiguda, Hyderabad, Telangana',
}
```

---

## The WhatsApp preview

The post-event message will look something like:

> Thank you for attending the Pulmo Mentor BFD Workshop. Access the recorded
> sessions here. → *link*

WhatsApp shows a branded preview card generated by `npm run og`. Re-run it after
changing the event name, tagline or logo. WhatsApp caches previews aggressively,
so re-render **before** the link is first shared.

Test it by sending the live link to yourself before the bulk send.
