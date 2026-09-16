import { Link, Navigate, useParams } from 'react-router-dom';
import { ChevronLeft, Clock, Download, Layers3, Tag } from 'lucide-react';
import { categories, getRelatedTalks, getTalk } from '@/data/talks';
import { site } from '@/data/site';
import { useSeo } from '@/lib/seo';
import { StatusChip } from '@/components/ui/ContentStatus';
import { ShareBar } from '@/components/ui/ShareBar';
import { VideoPlayer, LayoutBadge } from '@/components/video/VideoPlayer';
import { TalkThumbnail } from '@/components/video/TalkThumbnail';
import { SpeakerProfile } from '@/components/video/SpeakerProfile';
import { RelatedTalks } from '@/components/video/RelatedTalks';

/**
 * INDIVIDUAL SESSION PAGE (§30).
 *
 * Information hierarchy, top to bottom:
 *   Pulmo Mentor BFD → talk title → video → speaker → about → related → back.
 *
 * On phones the player goes edge-to-edge: on a 360px screen every pixel of
 * horizontal space is slide legibility, and the gutter buys nothing.
 */
export default function RecordingDetail() {
  const { id } = useParams<{ id: string }>();
  const talk = id ? getTalk(id) : undefined;

  if (!talk) return <Navigate to="/recordings" replace />;

  return <RecordingView key={talk.id} talk={talk} />;
}

function RecordingView({ talk }: { talk: NonNullable<ReturnType<typeof getTalk>> }) {
  const related = getRelatedTalks(talk.id);
  const category = categories.find((c) => c.id === talk.category);

  useSeo({
    title: talk.title,
    description: `${talk.speaker} — ${talk.title}. A recorded session from the ${site.event} at ${site.hospital}, ${site.centre}.`,
    path: `/recordings/${talk.id}`,
    type: 'video.other',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: talk.title,
      description: talk.description,
      uploadDate: undefined,
      publisher: {
        '@type': 'MedicalOrganization',
        name: `${site.hospital} — ${site.centre}`,
      },
    },
  });

  return (
    <article className="pb-section-sm">
      {/* Masthead */}
      <div className="border-b border-line bg-mist-50">
        <div className="container-x py-8 sm:py-10">
          <Link
            to="/recordings"
            className="-my-2 inline-flex items-center gap-1.5 py-2 text-meta font-medium text-ink-500 transition-colors hover:text-ink-900"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Back to Recorded Talks
          </Link>

          <p className="mt-6 flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.2em] text-accent-600">
            <span aria-hidden="true" className="h-px w-8 bg-accent-400" />
            {site.eventShort}
          </p>

          <h1 className="mt-5 max-w-4xl text-heading font-semibold text-ink-900">{talk.title}</h1>

          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-meta text-ink-500">
            <li className="flex items-center gap-1.5">
              <Layers3 className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              {talk.session}
            </li>
            <li className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              <span className="tabular-nums">{talk.duration}</span>
            </li>
            {category && (
              <li className="flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                <Link
                  to={`/recordings?topic=${category.id}`}
                  className="-my-2 inline-block py-2 hover:text-ink-900"
                >
                  {category.label}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Player — edge-to-edge on phones, contained from `sm` up. */}
      <div className="bg-ink-950">
        <div className="mx-auto max-w-container sm:px-8 sm:py-8 lg:px-10 lg:py-10">
          <VideoPlayer
            source={talk.video}
            title={talk.title}
            poster={<TalkThumbnail talk={talk} size="hero" showPlayAffordance={false} />}
            analyticsId={talk.id}
            analyticsTitle={talk.title}
            className="sm:rounded-card rounded-none"
          />
        </div>
      </div>

      <div className="container-x">
        <div className="mt-8 flex flex-wrap items-center gap-3 sm:mt-10">
          <LayoutBadge layout={talk.video.layout} />
          <StatusChip status={talk.status} label="Sample entry — replace with the real session" />
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
          {/* About */}
          <div className="min-w-0">
            <h2 className="eyebrow">About this session</h2>
            <p className="mt-5 text-lede text-ink-700">{talk.description}</p>

            {talk.takeaways && talk.takeaways.length > 0 && (
              <>
                <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.1em] text-ink-900">
                  Key points
                </h3>
                <ul className="mt-4 space-y-3">
                  {talk.takeaways.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-base leading-relaxed text-ink-600">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {talk.slidesUrl && (
              <a
                href={talk.slidesUrl}
                className="mt-10 inline-flex h-12 items-center gap-2 rounded-pill border border-line bg-white px-6 text-sm font-semibold text-ink-800 transition-colors hover:border-ink-300 hover:bg-mist-100"
                download
              >
                <Download className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                Download the presentation
              </a>
            )}
          </div>

          {/* Speaker */}
          <aside className="min-w-0 lg:pt-1">
            <SpeakerProfile talk={talk} />
            <ShareBar
              path={`/recordings/${talk.id}`}
              heading="Pass this session on"
              body="Shares the workshop page, so a colleague arrives at Somajiguda Pulmonology first."
              className="mt-5"
            />
          </aside>
        </div>

        <div className="mt-16 border-t border-line pt-14 sm:mt-20">
          <RelatedTalks talks={related} />
        </div>

        <div className="mt-14">
          <Link
            to="/recordings"
            className="-my-2 inline-flex items-center gap-1.5 py-2 text-meta font-semibold uppercase tracking-[0.1em] text-accent-600 transition-colors hover:text-accent-700"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Back to Recorded Talks
          </Link>
        </div>
      </div>
    </article>
  );
}
