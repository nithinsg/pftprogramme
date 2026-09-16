# Event-day vertical screen — creative brief and storyboard

For the video editor. A **live preview at real timings** is at `/event-screen`.
Play it through before reading further — it is the fastest way to judge whether
each card holds long enough.

---

## What this is

A silent 9:16 capability reel that loops continuously on the vertical screen at
the venue on 20 September 2026.

**It is not the workshop recording.** Those are landscape composites of a
presentation and a speaker, published on the website. Different asset, different
brief, different deliverable.

The test it has to pass: a doctor walking past at two to three metres
understands the message within five to ten seconds, with no audio.

---

## Constraints

| | |
| --- | --- |
| Canvas | 1080 × 1920 (9:16) |
| Frame rate | 25 fps — confirm against the venue player |
| Loop length | 58 seconds |
| Audio | **None.** The reel must communicate fully on mute |
| Safe area | 96px top and bottom — venue screens are often bezel-cropped |
| Minimum type | 48px at 1080 wide for anything that must be read |
| Colour | Deep navy field, white type, one warm accent rule |
| Loop point | Invisible — the closing card matches the opening card exactly |

Venue screens run bright. Avoid pure black, and avoid hairlines under 3px.

---

## The sequence

Every card carries the Yashoda Somajiguda lockup in the upper left.

| # | Hold | Headline | Supporting line | Visual | Direction |
| --- | --- | --- | --- | --- | --- |
| 01 | 6s | **Yashoda Hospitals** | Somajiguda · Pulmonology | Title card | Fade up from navy over 12 frames. Logo settles. Absolute stillness — the anchor frame. |
| 02 | 7s | **Master Class in PFT** | 20 September 2026 | Title card | Headline enters on a 24px rise; the date follows 8 frames later. The only card with a date. |
| 03 | 8s | **Pulmonary Function Testing** | Spirometry · Lung volumes · Diffusion | PFT booth b-roll | Slow push in. Let the trace draw itself on the monitor — that motion carries the card. |
| 04 | 8s | **CPET · Body Box** | Advanced respiratory diagnostics | CPET and plethysmography b-roll | Two beats — CPET, then the body box — 4 seconds each, cut on the subline rhythm. |
| 05 | 8s | **Interventional Pulmonology** | Bronchoscopy · EBUS · Cryobiopsy | Bronchoscopy suite b-roll | Hard-ish cut on a beat. Hold the scope detail. Type lower third, accent rule above. |
| 06 | 8s | **ECMO · Lung Transplantation** | Advanced respiratory support | ECMO / theatre b-roll | Warmest grade of the reel. Slight lift in exposure. Let one human moment land here. |
| 07 | 7s | **Expertise · Diagnosis · Care** | — | Typographic card | Words stack 14 frames apart. Hold all three together for the final 2 seconds. |
| 08 | 6s | **Yashoda Hospitals** | Somajiguda · Department of Pulmonology | Title card | **LOOP POINT.** Match card 01 exactly and cross-dissolve into it over 12 frames. |

The same sequence is the data behind `/event-screen`, in
`src/data/eventScreen.ts`. Changing a headline, a supporting line or a hold time
there updates the preview immediately — use it to settle timings before the
edit, not after.

---

## Footage brief

Vertical, or shot with enough headroom to crop to 9:16 without losing the
subject. Shallow depth of field, cool clinical light, macro detail over wide
shots — a wide of a room reads as nothing at walking pace.

| Card | What to shoot |
| --- | --- |
| PFT | PFT booth, patient at the mouthpiece (consented, or hands only), spirometry trace resolving on screen |
| CPET / Body Box | Cycle ergometer and mask, body plethysmography cabin |
| Interventional | Bronchoscopy tower, scope in hand, monitor stack |
| Advanced care | ECMO console and circuit, theatre corridor, multidisciplinary team |

**Consent rules apply exactly as on the website.** No identifiable patient
without documented consent and institutional approval. No identifiable staff
member without a release. Any screen in shot must show non-identifiable or
cleared studies.

---

## Deliverables

- **Master:** 1080 × 1920 H.264 MP4, ~12 Mbps, seamless loop point
- **Backup:** the same reel cut to 30 s, in case the venue player stutters
- **Stills:** each title card exported as a 1080 × 1920 JPEG fallback

---

## Approval — before the event

- [ ] Storyboard and copy approved by the department
- [ ] All footage cleared — no identifiable patient without documented consent
- [ ] Brand lockup checked against the official Yashoda guideline
- [ ] Loop point tested on the actual venue player, at venue brightness
- [ ] Fallback stills exported in case the player cannot hold the video

---

## Swapping content later

The content team edits `src/data/eventScreen.ts` — headline, supporting line,
hold time, or the media file behind a slot — and the preview at `/event-screen`
updates without a code change. Slots group into buckets so a whole topic can be
replaced at once:

```
Event screen content
├── Branding                   (cards 01, 07, 08)
├── PFT                        (cards 02, 03)
├── Advanced Diagnostics       (card 04)
├── Interventional Pulmonology (card 05)
└── ECMO & Transplantation     (card 06)
```
