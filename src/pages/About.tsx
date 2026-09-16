import { departmentProfile, doctors } from '@/data/doctors';
import { capabilities } from '@/data/capabilities';
import { site } from '@/data/site';
import { useSeo } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { PageHeader } from '@/components/ui/PageHeader';
import { ApprovalNote, visibleOnly } from '@/components/ui/ContentStatus';
import { Reveal } from '@/components/ui/Reveal';
import { FacultyGrid } from '@/components/home/DoctorProfile';
import { DepartmentProfile } from '@/components/home/DepartmentProfile';
import { CapabilityGrid } from '@/components/home/CapabilityGrid';
import { CTASection } from '@/components/home/CTASection';

/** /about — the fuller Somajiguda Pulmonology overview (§22). */
export default function About() {
  const hasFaculty = visibleOnly(doctors).length > 0;
  const hasCapabilities = visibleOnly(capabilities).length > 0;

  useSeo({
    title: 'Pulmonology at Somajiguda',
    description: `An overview of the ${site.department} at ${site.hospital}, ${site.centre} — clinical pulmonology, interventional pulmonology, advanced diagnostics, respiratory critical care, ECMO and lung transplantation.`,
    path: '/about',
  });

  return (
    <>
      <PageHeader
        eyebrow={site.hospital}
        title={departmentProfile.title}
        lede={departmentProfile.lede}
        back={{ to: '/', label: 'Back to the workshop page' }}
      />

      <Section id="overview" index="01" eyebrow="Overview" title="A tertiary pulmonary service">
        <DepartmentProfile />
      </Section>

      <Section
        id="academics"
        tone="mist"
        index="02"
        eyebrow="Academic Medicine"
        title="Teaching is part of the clinical work"
        lede="The Pulmo Mentor BFD Workshop is one of the department's teaching programmes for practising physicians and trainees."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            {
              title: 'Structured workshops',
              body: 'Programmes such as Pulmo Mentor BFD, built around demonstration, discussion and case-based teaching.',
            },
            {
              title: 'Case discussions',
              body: 'Multidisciplinary review of complex respiratory presentations, opened up for teaching.',
            },
            {
              title: 'Continuing education',
              body: 'Recorded sessions and knowledge resources made available to referring clinicians.',
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="h-full rounded-card border border-line bg-white p-6">
                <span className="section-index">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 text-base font-semibold text-ink-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {hasCapabilities && (
        <Section id="capabilities" index="03" eyebrow="Capabilities" title="Services at a glance">
          <CapabilityGrid />
        </Section>
      )}

      {hasFaculty && (
      <Section id="faculty" tone="mist" index="04" eyebrow="Faculty" title="The team">
        <FacultyGrid columns={2} />
        <div className="mt-10">
          <ApprovalNote>
            <strong className="font-semibold">For the content team:</strong> the department
            overview, academic programme descriptions and faculty entries on this page all need
            departmental approval before go-live. Nothing here states a patient number, an outcome
            or an award.
          </ApprovalNote>
        </div>
      </Section>
      )}

      <CTASection location="about-cta" />
    </>
  );
}
