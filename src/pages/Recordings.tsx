import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { categories, getTalksByCategory, sessionOrder, talks } from '@/data/talks';
import type { CategoryId } from '@/data/types';
import { site } from '@/data/site';
import { useSeo } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { ApprovalNote } from '@/components/ui/ContentStatus';
import { ShareBar } from '@/components/ui/ShareBar';
import { Reveal } from '@/components/ui/Reveal';
import { VideoFilters } from '@/components/video/VideoFilters';
import type { FilterValue } from '@/components/video/VideoFilters';
import { VideoGrid } from '@/components/video/VideoGrid';

const isCategory = (value: string | null): value is CategoryId =>
  categories.some((c) => c.id === value);

/**
 * THE VIDEO LIBRARY (§9, §20).
 *
 * The filter lives in the URL (`/recordings?topic=ecmo`), so a filtered view is
 * shareable and the showcase pages can link straight into their own track.
 *
 * With no filter applied the library is grouped by programme session, which is
 * how a delegate remembers the day. Filtered, it collapses to a flat grid.
 *
 * Nothing on this page loads a video file — every card is a poster and a link.
 */
export default function Recordings() {
  const [params, setParams] = useSearchParams();
  const topic = params.get('topic');
  const filter: FilterValue = isCategory(topic) ? topic : 'all';

  const filtered = useMemo(() => getTalksByCategory(filter), [filter]);
  const sessions = useMemo(() => sessionOrder(), []);

  useSeo({
    title: 'Recorded Sessions',
    description: `All recorded sessions from the ${site.event}, presented with the speaker and their presentation on screen together. ${site.hospital}, ${site.centre}.`,
    path: '/recordings',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: `${site.event} — Recorded Sessions`,
      numberOfItems: talks.length,
      itemListElement: talks.map((talk, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: talk.title,
        url: `/recordings/${talk.id}`,
      })),
    },
  });

  const setFilter = (next: FilterValue) => {
    if (next === 'all') setParams({}, { replace: true });
    else setParams({ topic: next }, { replace: true });
  };

  const activeCategory = categories.find((c) => c.id === filter);

  return (
    <>
      <PageHeader
        eyebrow={site.event}
        title="Recorded Sessions"
        lede="Every session from the workshop, with the presentation and the speaker on screen together — recorded from two sources and composited in post-production so the slides stay readable on a phone."
        back={{ to: '/', label: 'Back to Somajiguda Pulmonology' }}
      />

      <section className="py-section-sm" aria-label="Recorded sessions">
        <div className="container-x">
          <VideoFilters value={filter} onChange={setFilter} />

          <p className="mt-6 text-meta text-ink-500" role="status" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'session' : 'sessions'}
            {activeCategory ? ` · ${activeCategory.blurb}` : ''}
          </p>

          <div className="mt-10 sm:mt-12">
            {filter === 'all' ? (
              <div className="space-y-16 sm:space-y-20">
                {sessions.map((session) => {
                  const inSession = filtered.filter((t) => t.session === session);
                  if (inSession.length === 0) return null;

                  return (
                    <div key={session}>
                      <Reveal>
                        <div className="mb-8 flex items-baseline gap-4">
                          <h2 className="text-subhead font-semibold text-ink-900">{session}</h2>
                          <span aria-hidden="true" className="h-px flex-1 bg-line" />
                          <span className="section-index">
                            {String(inSession.length).padStart(2, '0')}
                          </span>
                        </div>
                      </Reveal>
                      <VideoGrid talks={inSession} />
                    </div>
                  );
                })}
              </div>
            ) : (
              <VideoGrid talks={filtered} />
            )}
          </div>

          <div className="mt-16 space-y-6 sm:mt-20">
            <ShareBar path="/recordings" />
            <ApprovalNote>
              <strong className="font-semibold">For the content team:</strong> all session titles,
              speakers, durations and descriptions are sample scaffolding. Add each real recording as
              one object in <code>src/data/talks.ts</code> — the library, filters, session grouping,
              related talks, thumbnails and sitemap all update from that single edit. What
              post-production must deliver is specified at{' '}
              <Link to="/recording-spec" className="font-semibold underline underline-offset-4">
                /recording-spec
              </Link>
              .
            </ApprovalNote>
          </div>
        </div>
      </section>
    </>
  );
}
