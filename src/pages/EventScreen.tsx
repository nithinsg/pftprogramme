import { Link } from 'react-router-dom';
import { eventScreenSlots, eventScreenSpec, totalLoopSeconds } from '@/data/eventScreen';
import type { EventScreenCategory } from '@/data/types';
import { site } from '@/data/site';
import { useSeo } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { PageHeader } from '@/components/ui/PageHeader';
import { ApprovalNote } from '@/components/ui/ContentStatus';
import { Reveal } from '@/components/ui/Reveal';
import { VerticalVideoShowcase } from '@/components/event/VerticalVideoShowcase';

/**
 * /event-screen — the venue screen creative (§12–§14).
 *
 * An internal production page: it carries the storyboard, the technical spec,
 * the content-management structure and a live preview of the loop at its real
 * timings. It is `noindex` — it is a working document for the team, not a page
 * for delegates.
 */
const categoryLabels: Record<EventScreenCategory, string> = {
  branding: 'Branding',
  pulmonology: 'Pulmonology',
  ecmo: 'ECMO',
  interventions: 'Advanced Interventions',
  'lung-transplant': 'Lung Transplant',
};

export default function EventScreen() {
  useSeo({
    title: 'Event-Day Vertical Screen',
    description:
      'Creative specification, storyboard and live preview for the 9:16 capability loop playing on the venue screen at the Pulmo Mentor BFD Workshop.',
    path: '/event-screen',
    noIndex: true,
  });

  // Group the slots by content bucket — this is the swap-in structure the
  // content team works with (§14).
  const grouped = eventScreenSlots.reduce<Record<string, typeof eventScreenSlots>>((acc, slot) => {
    (acc[slot.category] ??= []).push(slot);
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        eyebrow="Production · Internal"
        title="Event-Day Vertical Screen"
        lede={`A silent 9:16 capability loop for the venue screen — ${totalLoopSeconds} seconds, running continuously. This is not the workshop recording.`}
        back={{ to: '/', label: 'Back to the workshop page' }}
      />

      {/* Live preview */}
      <Section
        id="preview"
        index="01"
        eyebrow="Live preview"
        title="The loop, at real timings"
        lede="Play it through once and watch the clock. If a card cannot be read by someone walking past at two metres in the time it holds, it needs to be longer or shorter in words — this preview is how that gets decided before the shoot."
      >
        <VerticalVideoShowcase />
      </Section>

      {/* Technical spec */}
      <Section
        id="spec"
        tone="mist"
        index="02"
        eyebrow="Specification"
        title="Delivery requirements"
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <dl className="divide-y divide-line overflow-hidden rounded-card border border-line bg-white">
              <SpecRow label="Canvas" value={eventScreenSpec.canvas} />
              <SpecRow label="Frame rate" value={eventScreenSpec.frameRate} />
              <SpecRow label="Loop length" value={`${totalLoopSeconds}s (target ${eventScreenSpec.loopLength})`} />
              <SpecRow label="Audio" value={eventScreenSpec.audio} />
              <SpecRow label="Safe area" value={eventScreenSpec.safeArea} />
              <SpecRow label="Minimum type" value={eventScreenSpec.minimumType} />
              <SpecRow label="Colour" value={eventScreenSpec.colourNote} />
            </dl>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-card border border-line bg-white p-6 sm:p-7">
              <h3 className="eyebrow">Deliverables</h3>
              <ul className="mt-5 space-y-3">
                {eventScreenSpec.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink-700">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="eyebrow mt-9">Approval, before the event</h3>
              <ol className="mt-5 space-y-3 text-sm leading-relaxed text-ink-700">
                {[
                  'Storyboard and copy approved by the department.',
                  'All footage cleared — no identifiable patient without documented consent.',
                  'Brand lockup checked against the official Yashoda guideline.',
                  'Loop point tested on the actual venue player, at venue brightness.',
                  'Fallback stills exported in case the player cannot hold the video.',
                ].map((item, i) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="section-index mt-0.5 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Content management structure */}
      <Section
        id="content"
        index="03"
        eyebrow="Content management"
        title="Swapping the loop without a rebuild"
        lede="Event screen content is organised into five buckets. The content team edits the slot — headline, supporting line, hold time or the media file — and the venue reel is re-cut from the same structure."
      >
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(grouped).map(([category, slots], i) => (
            <li key={category}>
              <Reveal delay={Math.min(i, 3) * 70}>
                <div className="h-full rounded-card border border-line bg-white p-6">
                  <h3 className="text-base font-semibold text-ink-900">
                    {categoryLabels[category as EventScreenCategory]}
                  </h3>
                  <p className="mt-1 text-meta text-ink-400">
                    {slots.length} {slots.length === 1 ? 'slot' : 'slots'} ·{' '}
                    {slots.reduce((s, x) => s + x.durationSeconds, 0)}s
                  </p>
                  <ul className="mt-4 space-y-2">
                    {slots.map((slot) => (
                      <li key={slot.id} className="text-sm text-ink-600">
                        <span className="font-medium text-ink-800">{slot.headline}</span>
                        {slot.subline && (
                          <span className="mt-0.5 block text-[0.8125rem] text-ink-500">
                            {slot.subline}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <ApprovalNote>
            <strong className="font-semibold">For the content team:</strong> edit{' '}
            <code>src/data/eventScreen.ts</code> to change any slot. Point{' '}
            <code>media.src</code> at a file in <code>/public/media/</code> and it plays in the
            preview above in place of the title card. The full brief for the video editor is in{' '}
            <code>docs/VERTICAL-LOOP-STORYBOARD.md</code>. Footage showing an identifiable patient
            requires documented consent and institutional approval before it goes on the venue
            screen — the same rule as the website.
          </ApprovalNote>
        </div>
      </Section>

      <Section id="not-the-recording" tone="navy" index="04" eyebrow="A reminder">
        <div className="max-w-2xl">
          <h2 className="text-heading font-semibold text-white">
            This reel is not the workshop recording.
          </h2>
          <p className="mt-6 text-lede text-ink-200">
            The venue loop is a silent capability reel for people walking past a screen. The
            workshop recordings are a separate deliverable — two synchronised sources, composited so
            the presentation and the speaker are visible together, published in the library on this
            site.{' '}
            <Link to="/recording-spec" className="text-accent-300 underline underline-offset-4 hover:text-accent-200">
              The production requirements for those are specified here
            </Link>
            .
          </p>
          <p className="mt-8 text-meta text-ink-300/70">
            {site.hospital} <span aria-hidden="true">·</span> {site.centre}
          </p>
        </div>
      </Section>
    </>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-6 sm:px-6">
      <dt className="shrink-0 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-ink-400 sm:w-32">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-ink-700">{value}</dd>
    </div>
  );
}
