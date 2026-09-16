import { Camera, Check, MonitorPlay, X } from 'lucide-react';
import { event, site } from '@/data/site';
import { useSeo } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { PageHeader } from '@/components/ui/PageHeader';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { CompositeLayoutSpec } from '@/components/video/CompositeLayoutSpec';

/**
 * /recording-spec — the production requirement (§11), as a page the team can be
 * handed rather than a paragraph in an email.
 *
 * Internal and `noindex`: it exists so that what post-production delivers and
 * what this site expects are the same thing.
 */
export default function RecordingSpec() {
  useSeo({
    title: 'Recording Production Specification',
    description:
      'Two-source capture and composite delivery requirements for the Pulmo Mentor Master Class in PFT recordings.',
    path: '/recording-spec',
    noIndex: true,
  });

  return (
    <>
      <PageHeader
        eyebrow="Production · Internal"
        title="Recording Specification"
        lede="Two sources, captured separately, synchronised in post and delivered as one composite master — presentation full-frame, speaker keyed in. This is what the video library on this site is built to play."
        back={{ to: '/', label: 'Back to the workshop page' }}
      />

      {/* The two sources */}
      <Section
        id="sources"
        index="01"
        eyebrow="Capture"
        title="Two sources. Recorded separately."
        lede="Do not point a camera at the projector screen and do not publish the raw room recording. Those are the two failure modes this specification exists to prevent."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <SourceCard
            icon={<Camera className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />}
            index="Source 1"
            title="Speaker camera"
            points={[
              'Professional camera on the speaker, locked off or gently operated',
              'Mid-shot: head and shoulders with a little room above',
              'Even key light on the face — no reliance on the projector spill',
              'Lavalier or boom audio, recorded to the camera and to a backup recorder',
              'Same frame rate as Source 2 — agree 25 or 30 fps before the day',
            ]}
          />
          <SourceCard
            icon={<MonitorPlay className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />}
            index="Source 2"
            title="Presentation feed"
            points={[
              'Direct capture from the presentation output — HDMI splitter into a recorder',
              'Native 1920 × 1080, no scaling, no camera in the path',
              'Records the laptop signal including builds, video and cursor',
              'Started before the first slide and left running through the session',
              'A visible clap or timecode at the top of each session for sync',
            ]}
          />
        </div>

        <div className="mt-6 rounded-card border border-line bg-mist-100 p-6">
          <h3 className="text-sm font-semibold text-ink-900">Sync</h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-600">
            Feed both recorders a common timecode if the kit supports it. If it does not, a clap at
            the head of every session is enough — the editor aligns on the transient, then confirms
            against a slide transition later in the talk to prove there is no drift.
          </p>
        </div>
      </Section>

      {/* The composite */}
      <Section
        id="composite"
        tone="mist"
        index="02"
        eyebrow="Delivery"
        title="One composite master"
        lede="The presentation fills the frame. The speaker is keyed into the lower right at roughly 22% of the frame width. Both remain visible for the whole talk — the brief treats this as non-negotiable, and so does the player."
      >
        <CompositeLayoutSpec />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-card border border-line bg-white p-6 sm:p-7">
              <h3 className="eyebrow">Master file</h3>
              <dl className="mt-5 divide-y divide-line">
                <SpecRow label="Resolution" value="1920 × 1080, 16:9" />
                <SpecRow label="Codec" value="H.264 high profile, MP4 container" />
                <SpecRow label="Bitrate" value="8–12 Mbps VBR — the slide text must stay crisp" />
                <SpecRow label="Frame rate" value="Match capture: 25 or 30 fps, constant" />
                <SpecRow label="Audio" value="AAC 192 kbps stereo, normalised to −16 LUFS" />
                <SpecRow label="Speaker inset" value="22% of frame width, lower right, 2.5–3% inset" />
                <SpecRow label="Head / tail" value="Trim to the first and last spoken word" />
                <SpecRow label="Captions" value="WebVTT sidecar, reviewed for clinical terms" />
              </dl>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="h-full rounded-card border border-line bg-white p-6 sm:p-7">
              <h3 className="eyebrow">Legibility, checked on a phone</h3>
              <p className="mt-5 text-sm leading-relaxed text-ink-600">
                The audience will watch this on a 360–414px-wide screen. Before a master is
                accepted, play it at that width and read the smallest text on the busiest slide.
              </p>
              <ul className="mt-5 space-y-3">
                {[
                  'Slide body type no smaller than 20pt in the original deck',
                  'No full-width data tables — split them across slides instead',
                  'The lower-right quarter of every slide kept clear for the inset',
                  'Thin hairlines and 1px chart strokes thickened before export',
                  'Screen recordings of software shown full-frame, inset temporarily hidden',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-ink-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-600" strokeWidth={2.25} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Do not */}
      <Section id="avoid" index="03" eyebrow="Rejection criteria" title="What will not be accepted">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'A camera pointed at the screen',
              body: 'Keystone, moiré, projector colour and burnt-out highlights. The slides must come from the signal, not the wall.',
            },
            {
              title: 'The raw room recording',
              body: 'A wide of the stage is not a teaching asset. Neither feed is usable at phone size on its own.',
            },
            {
              title: 'A postage-stamp presentation',
              body: 'Slides shrunk into a corner beside a full-height speaker. The slides are the content.',
            },
            {
              title: 'Speaker-only for long stretches',
              body: 'Cutting away from the slides during a data-heavy passage loses the point of the talk.',
            },
            {
              title: 'Unsynchronised feeds',
              body: 'A slide that turns two seconds after the speaker refers to it reads as a fault, every time.',
            },
            {
              title: 'Unapproved patient material',
              body: 'Any identifiable patient image, scan or detail without documented consent and institutional approval.',
            },
          ].map((item, i) => (
            <li key={item.title}>
              <Reveal delay={Math.min(i, 3) * 60}>
                <div className="h-full rounded-card border border-line bg-white p-6">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-mist-100 text-ink-500">
                    <X className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold leading-snug text-ink-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-600">{item.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Section>

      {/* Hand-off */}
      <Section id="handoff" tone="navy" index="04" eyebrow="Hand-off" title="Publishing a finished master">
        <div className="max-w-3xl">
          <p className="text-lede text-ink-200">
            Upload the master, then add one object to <code className="text-accent-300">src/data/talks.ts</code>{' '}
            with the title, speaker, session, duration, description and the video source. The
            library card, the branded thumbnail, the session grouping, the filters, the related-talks
            rail and the sitemap entry are all produced from that single record.
          </p>

          <p className="mt-6 text-sm leading-relaxed text-ink-300">
            If post-production can only supply the two feeds separately, set{' '}
            <code className="text-accent-300">speakerUrl</code> alongside{' '}
            <code className="text-accent-300">url</code> and the player composites them at playback
            time — slides full-frame, speaker inset, clock-locked to the slide feed. The composite
            master is still the preferred deliverable: one file, one download, no drift.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button to="/" variant="onDark" size="md" withArrow>
              Back to the workshop page
            </Button>
            <Button to="/event-screen" variant="onDarkGhost" size="md">
              Event-day vertical screen
            </Button>
          </div>

          <p className="mt-10 text-meta text-ink-300/70">
            {site.hospital} <span aria-hidden="true">·</span> {site.centre}{' '}
            <span aria-hidden="true">·</span> {event.name}
          </p>
        </div>
      </Section>
    </>
  );
}

function SourceCard({
  icon,
  index,
  title,
  points,
}: {
  icon: React.ReactNode;
  index: string;
  title: string;
  points: string[];
}) {
  return (
    <Reveal className="h-full">
      <div className="h-full rounded-card border border-line bg-white p-6 sm:p-7">
        <div className="flex items-center gap-4">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-mist-100 text-ink-700">
            {icon}
          </span>
          <div>
            <p className="eyebrow">{index}</p>
            <h3 className="mt-1 text-subhead font-semibold text-ink-900">{title}</h3>
          </div>
        </div>

        <ul className="mt-6 space-y-3">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-2.5 text-sm leading-snug text-ink-700">
              <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 py-3 sm:flex-row sm:gap-5">
      <dt className="shrink-0 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-400 sm:w-32">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-ink-700">{value}</dd>
    </div>
  );
}
