# Recording specification — Pulmo Mentor Master Class in PFT

For the video production team. A rendered, to-scale version of this document
lives at **`/recording-spec`** on the site — open it on a phone and read the
mock slide at 360px. That is the acceptance test.

---

## The requirement

**The presentation and the speaker must both be visible for the whole talk, and
the slides must stay readable on a phone.**

The audience is ~100–120 clinicians who will mostly watch on a 360–414px-wide
screen. Everything below follows from that.

---

## Capture: two sources, recorded separately

### Source 1 — speaker camera

- Professional camera on the speaker, locked off or gently operated
- Mid-shot: head and shoulders with a little room above
- Even key light on the face — do not rely on projector spill
- Lavalier or boom audio to the camera **and** to a backup recorder
- Same frame rate as Source 2 — agree 25 or 30 fps before the day

### Source 2 — presentation feed

- Direct capture from the presentation output: HDMI splitter into a recorder
- Native 1920 × 1080, no scaling, **no camera in the path**
- Records the laptop signal including builds, embedded video and cursor
- Started before the first slide, left running through the session
- A visible clap or timecode at the head of each session

### Sync

Feed both recorders a common timecode if the kit supports it. If not, a clap at
the head of every session is enough: align on the transient, then confirm
against a slide transition later in the talk to prove there is no drift.

---

## Delivery: one composite master

```
┌──────────────────────────────────────────────┐
│ PULMO MENTOR · PFT                           │
│                                              │
│              PRESENTATION                    │
│              (full frame)                    │
│                                              │
│                              ┌─────────────┐ │
│                              │   SPEAKER   │ │
│                              │  22% width  │ │
│                              └─────────────┘ │
└──────────────────────────────────────────────┘
```

| | |
| --- | --- |
| Resolution | 1920 × 1080, 16:9 |
| Codec | H.264 high profile, MP4 container |
| Bitrate | 8–12 Mbps VBR — slide text must stay crisp |
| Frame rate | Match capture: 25 or 30 fps, constant |
| Audio | AAC 192 kbps stereo, normalised to −16 LUFS |
| Speaker inset | 22% of frame width, lower right, 2.5–3% inset, subtle 1px border |
| Title-safe | 5% margin on all sides |
| Head / tail | Trim to the first and last spoken word |
| Captions | WebVTT sidecar, reviewed for clinical terminology |
| Programme mark | "PULMO MENTOR · PFT" burned in, upper left, subtle |

**When the speaker demonstrates software or a scan on screen**, hide the inset
for that passage rather than shrinking the presentation.

---

## Legibility checklist

Play the master at 360px wide and read the smallest text on the busiest slide.
If you cannot, the master is not finished.

- [ ] Slide body type no smaller than 20pt in the original deck
- [ ] No full-width data tables — split across slides instead
- [ ] Lower-right quarter of every slide kept clear for the inset
- [ ] Thin hairlines and 1px chart strokes thickened before export
- [ ] Axis labels and figure legends legible at 360px

Send the slide template to speakers **before** the event with the lower-right
reservation marked. It is far cheaper than fixing it in post.

---

## What will be rejected

| | Why |
| --- | --- |
| A camera pointed at the projector screen | Keystone, moiré, projector colour, blown highlights |
| The raw room recording | A wide of the stage is not a teaching asset |
| A postage-stamp presentation beside a full-height speaker | The slides are the content |
| Speaker-only cutaways during data-heavy passages | Loses the point of the talk |
| Unsynchronised feeds | A slide turning late reads as a fault, every time |
| Unapproved patient material | Consent and institutional approval are mandatory |

---

## If the two feeds cannot be composited

The site can composite them at playback time. Deliver both files and set:

```ts
video: {
  videoUrl: '/media/session-slides.mp4',      // slide feed — timing and audio master
  speakerUrl: '/media/session-speaker.mp4',
  layout: 'presentation-and-speaker',
}
```

The player then renders the slides full-frame with the speaker as an inset,
clock-locked to the slide feed and drift-corrected once a second. Viewers can
hide the inset or swap which feed is large.

This is the fallback, not the plan. A single composite master is one file, one
download, no drift, and it plays identically everywhere.

---

## Handing over a finished master

1. Upload the master (YouTube, Vimeo or the hospital's own hosting).
2. Add one record to `src/data/sessions.ts` — see `docs/CONTENT-GUIDE.md`.
3. Set `status: 'approved'` once the speaker has cleared the description.

Everything else — the card, the branded thumbnail, the session grouping and the
modal player — is produced from that one record.
