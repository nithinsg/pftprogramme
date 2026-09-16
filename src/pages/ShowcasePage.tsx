import { Navigate, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import { showcaseById } from '@/data/showcases';
import type { Showcase } from '@/data/types';
import { categories } from '@/data/talks';
import { site } from '@/data/site';
import { useSeo } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { PageHeader } from '@/components/ui/PageHeader';
import { MediaFrame, hasMedia } from '@/components/ui/MediaFrame';
import { ApprovalNote, StatusChip, isVisible } from '@/components/ui/ContentStatus';
import { Reveal } from '@/components/ui/Reveal';
import { CaseVideoCard } from '@/components/video/CaseVideoCard';
import { CTASection } from '@/components/home/CTASection';

/** Route path → showcase id. */
const routeMap: Record<string, string> = {
  '/ecmo': 'ecmo',
  '/interventions': 'interventions',
  '/lung-transplant': 'lung-transplant',
};

/**
 * The dedicated showcase pages — /ecmo, /interventions, /lung-transplant.
 *
 * One component serves all three: the content lives in `src/data/showcases.ts`,
 * so adding a fourth capability page is a data entry plus a route.
 */
export default function ShowcasePage() {
  const { pathname } = useLocation();
  const showcase = showcaseById(routeMap[pathname] ?? '');

  if (!showcase) return <Navigate to="/capabilities" replace />;

  return <ShowcaseView key={showcase.id} showcase={showcase} />;
}

function ShowcaseView({ showcase }: { showcase: Showcase }) {
  const procedures = showcase.procedures.filter((p) => isVisible(p.status));
  const caseVideos = showcase.caseVideos.filter((v) => isVisible(v.status));
  const category = categories.find((c) => c.id === showcase.libraryCategory);
  const showMedia = hasMedia(showcase.media);
  const showAttribution = isVisible(showcase.status);

  useSeo({
    title: showcase.title,
    description: `${showcase.subtitle}. ${showcase.description.slice(0, 150)}…`,
    path: showcase.href,
  });

  return (
    <>
      <PageHeader
        eyebrow={`${site.departmentShort} · ${site.centre}`}
        title={showcase.title}
        lede={showcase.subtitle}
        back={{ to: '/capabilities', label: 'All capabilities' }}
      />

      {/* Overview */}
      <Section id="overview" index="01" eyebrow="Overview">
        <div
          className={
            showMedia
              ? 'grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16'
              : 'max-w-3xl'
          }
        >
          <div className="min-w-0">
            <Reveal>
              <p className="text-lede text-ink-700">{showcase.description}</p>
            </Reveal>

            <Reveal delay={80}>
              <ul className="mt-9 grid gap-3 sm:grid-cols-2">
                {showcase.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent-600"
                      strokeWidth={2.25}
                      aria-hidden="true"
                    />
                    <span className="text-sm leading-snug text-ink-700">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {showAttribution && (
              <Reveal delay={140}>
                <p className="mt-9 text-meta text-ink-400">{showcase.attribution}</p>
              </Reveal>
            )}
          </div>

          {showMedia && (
            <Reveal delay={100} className="min-w-0">
              <MediaFrame media={showcase.media} ratio="4/3" className="shadow-card" />
              <StatusChip
                status={showcase.media.status}
                label="Photography required"
                className="mt-4"
              />
            </Reveal>
          )}
        </div>
      </Section>

      {/* Procedures / service lines */}
      {procedures.length > 0 && (
        <Section
          id="procedures"
          tone="mist"
          index="02"
          eyebrow="Service lines"
          title="What this covers"
          lede="Each item below appears publicly only once the department has approved it. Nothing is listed here as a claim about volume or outcome."
        >
          <ul className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {procedures.map((procedure, i) => (
              <li key={procedure.id} className="bg-white p-6">
                <Reveal delay={Math.min(i, 3) * 60}>
                  <span className="section-index">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-base font-semibold leading-snug text-ink-900">
                    {procedure.title}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-600">
                    {procedure.description}
                  </p>
                  <StatusChip status={procedure.status} className="mt-4" />
                </Reveal>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Case / procedure films */}
      {caseVideos.length > 0 && (
        <Section
          id="films"
          index="03"
          eyebrow="Films"
          title={showcase.ctaLabel}
          lede="Procedure and case films are published here once they are edited, attributed and cleared. Any film showing a patient requires documented consent and institutional approval."
        >
          <ul className="grid gap-x-6 gap-y-12 lg:grid-cols-2">
            {caseVideos.map((item, i) => (
              <li key={item.id}>
                <Reveal delay={Math.min(i, 2) * 80}>
                  <CaseVideoCard item={item} />
                </Reveal>
              </li>
            ))}
          </ul>

          <div className="mt-12">
            <ApprovalNote>
              <strong className="font-semibold">For the content team:</strong> these entries are
              placeholders in <code>src/data/showcases.ts</code>. A film will not play until its{' '}
              <code>consent</code> is <code>on-file</code> and its <code>status</code> is{' '}
              <code>approved</code> — the player enforces both.
            </ApprovalNote>
          </div>
        </Section>
      )}

      {/* Straight into the matching library track */}
      <CTASection
        eyebrow="From the workshop"
        title={`${category?.label ?? 'Recorded'} sessions from Pulmo Mentor BFD`}
        body={`Watch the workshop talks on this topic — presentation and speaker on screen together.`}
        ctaLabel="View these recorded talks"
        ctaHref={`/recordings?topic=${showcase.libraryCategory}`}
        location={`showcase-${showcase.id}`}
      />
    </>
  );
}
