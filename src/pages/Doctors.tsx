import { doctors } from '@/data/doctors';
import { site } from '@/data/site';
import { useSeo } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { PageHeader } from '@/components/ui/PageHeader';
import { ApprovalNote, visibleOnly } from '@/components/ui/ContentStatus';
import { FacultyGrid } from '@/components/home/DoctorProfile';
import { CTASection } from '@/components/home/CTASection';

/** /doctors — faculty directory (§22). Structured for any number of profiles. */
export default function Doctors() {
  const visible = visibleOnly(doctors);

  useSeo({
    title: 'Faculty',
    description: `The ${site.department} at ${site.hospital}, ${site.centre} — faculty profiles and clinical focus areas.`,
    path: '/doctors',
  });

  return (
    <>
      <PageHeader
        eyebrow={site.department}
        title="Faculty"
        lede={`The clinicians of the ${site.department} at ${site.hospital}, ${site.centre}, and the faculty behind the Pulmo Mentor BFD programme.`}
        back={{ to: '/', label: 'Back to the workshop page' }}
      />

      <Section
        id="faculty"
        index="01"
        eyebrow="Profiles"
        title={
          visible.length > 0
            ? `${visible.length} ${visible.length === 1 ? 'profile' : 'profiles'}`
            : 'Profiles to follow'
        }
        lede={
          visible.length === 0
            ? 'Faculty profiles are published here as the department approves them.'
            : undefined
        }
      >
        <FacultyGrid columns={3} />

        <div className={visible.length > 0 ? 'mt-12' : ''}>
          <ApprovalNote>
            <strong className="font-semibold">For the content team:</strong> every profile on this
            page is a structural placeholder. No clinician is named, no qualification is invented
            and no photograph is substituted with stock imagery. Replace the entries in{' '}
            <code>src/data/doctors.ts</code> with approved names, designations, qualifications,
            portraits and profile text, then set each <code>status</code> to <code>approved</code>.
          </ApprovalNote>
        </div>
      </Section>

      <CTASection location="doctors-cta" />
    </>
  );
}
