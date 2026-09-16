# Event-day vertical screen — creative brief and storyboard

For the video editor. A **live preview at real timings** is at `/event-screen`
on the site — play it through before reading further. It is the fastest way to
judge whether each card holds long enough.

---

## What this is

A silent 9:16 capability reel that loops continuously on the vertical screen at
the venue, read by delegates walking past at two to three metres.

**It is not the workshop recording.** Those are landscape composites of a
presentation and a speaker, published in the video library. Different asset,
different brief, different deliverable.

---

## Constraints

| | |
| --- | --- |
| Canvas | 1080 × 1920 (9:16) |
| Frame rate | 25 fps — confirm against the venue player |
| Loop length | 64 seconds |
| Audio | **None.** The reel must communicate fully on mute |
| Safe area | 96px top and bottom — venue screens are often bezel-cropped |
| Minimum type | 48px at 1080 wide for anything that must be read |
| Colour | Deep navy field, white type, one warm accent rule |
| Loop point | Invisible — the closing card matches the opening card exactly |

Venue screens run bright. Avoid pure black, and avoid hairlines under 3px.

---

## The sequence

Every card carries the Yashoda Somajiguda lockup in the upper left. Headlines
are one to four words — someone walking past reads one idea, not a sentence.

| # | Hold | Headline | Supporting line | Visual | Direction |
| --- | --- | --- | --- | --- | --- |
| 01 | 6s | **Yashoda Hospitals** | Somajiguda | Title card | Fade up from navy over 12 frames. Logo settles. Absolute stillness — this is the anchor frame. |
| 02 | 8s | **Pulmonology** | Advanced respiratory medicine | Department b-roll | Slow push in. Headline enters on a 24px rise, subline staggered 6 frames. |
| 03 | 9s | **ECMO** | Advanced extracorporeal support | ECMO console, circuit, waveforms | Hard-ish cut on a beat. Hold the circuit detail. Type lower third, accent rule above. |
| 04 | 9s | **Advanced Pulmonary Interventions** | Diagnosis and therapy through the airway | Bronchoscopy tower, scope in hand | Longest headline in the reel — two lines, 56px, tight tracking. Give it the full 9 seconds. |
| 05 | 9s | **Lung Transplantation** | Multidisciplinary care for advanced lung disease | Theatre corridor, team in discussion | Warmest grade of the reel. Slight lift in exposure. Let one human moment land here. |
| 06 | 8s | **Advanced Diagnostics** | Pulmonary function · Imaging · Tissue diagnosis | PFT booth, spirometry trace, CT reading | Three quick beats matched to the three words. Crossfades, 10 frames each. |
| 07 | 8s | **Expertise · Innovation · Care** | — | Typographic card | Words stack in sequence, 14 frames apart. Hold all three together for the final 2 seconds. |
| 08 | 7s | **Yashoda Hospitals** | Somajiguda · Department of Pulmonology | Title card | **LOOP POINT.** Match card 01 exactly — same scale, position, grade — and cross-dissolve into it over 12 frames. |

The same sequence is the data behind `/event-screen`, in
`src/data/eventScreen.ts`. Changing a headline, a supporting line or a hold time
there updates the preview immediately — use it to settle timings before the
edit, not after.

---

## Footage brief

Vertical or shot with enough headroom to crop to 9:16 without losing the
subject. Shallow depth of field, cool clinical light, macro detail over wide
shots — a wide shot of a room reads as nothing at walking pace.

| Card | What to shoot |
| --- | --- |
| Pulmonology | Department corridor, consultation or diagnostic environment |
| ECMO | ECMO console and circuit, monitor waveforms, perfusionist hands |
| Interventions | Bronchoscopy tower, scope in hand, monitor stack |
| Lung transplant | Theatre corridor, team in discussion, transplant coordination |
| Diagnostics | PFT booth, spirometry trace on screen, CT reading |

**Consent rules apply exactly as they do on the website.** No identifiable
patient without documented consent and institutional approval. No identifiable
staff member without a release. Any screen in shot must show non-identifiable or
cleared studies.

---

## Deliverables

- **Master:** 1080 × 1920 H.264 MP4, ~12 Mbps, seamless loop point
- **Backup:** the same reel cut to 30 s, in case the venue player stutters
- **Stills:** each title card exported as a 1080 × 1920 JPEG fallback

---

## Approval — before the event

The brief requires this creative to be signed off **before** the event, not
delivered on the day.

- [ ] Storyboard and copy approved by the department
- [ ] All footage cleared — no identifiable patient without documented consent
- [ ] Brand lockup checked against the official Yashoda guideline
- [ ] Loop point tested on the actual venue player, at venue brightness
- [ ] Fallback stills exported in case the player cannot hold the video

---

## Swapping content later

The content team edits `src/data/eventScreen.ts` — headline, supporting line,
hold time, or the media file behind a slot — and the preview at `/event-screen`
updates without a code change. Slots are grouped into five buckets so a whole
topic can be replaced at once:

```
Event screen content
├── Branding            (cards 01, 07, 08)
├── Pulmonology         (cards 02, 06)
├── ECMO                (card 03)
├── Advanced Interventions (card 04)
└── Lung Transplant     (card 05)
```
