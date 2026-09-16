import { departmentProfile, doctors } from '@/data/doctors';
import { capabilities } from '@/data/capabilities';
import { capabilitiesIntro } from '@/data/capabilities';
import { visibleOnly } from '@/components/ui/ContentStatus';
import { site } from '@/data/site';
import { useSeo } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { ApprovalNote } from '@/components/ui/ContentStatus';
import { Hero } from '@/components/home/Hero';
import { FacultyGrid } from '@/components/home/DoctorProfile';
import { DepartmentProfile } from '@/components/home/DepartmentProfile';
import { ShowcaseIndex } from '@/components/home/ShowcaseIndex';
import {
  ECMOSection,
  InterventionSection,
  LungTransplantSection,
} from '@/components/home/ShowcaseSection';
import { CapabilityGrid } from '@/components/home/CapabilityGrid';
import { ContinueLearning } from '@/components/home/ContinueLearning';
import { CTASection } from '@/components/home/CTASection';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THE LANDING PAGE — AND THE POINT OF THE WHOLE BRIEF
 * ─────────────────────────────────────────────────────────────────────────────
 * The post-event WhatsApp link lands here, NOT on a video. A delegate meets the
 * institution, the department, the faculty and the three capability stories
 * before the recordings are ever offered as a destination.
 *
 * The section order below is the order specified in the brief (§23):
 *
 *   01/02  Branding + workshop hero
 *   03     Faculty / pulmonology profile
 *   04     Pulmonology at Somajiguda
 *   05     Advanced capabilities (the three showcase cards)
 *   06     ECMO showcase
 *   07     Advanced interventions showcase
 *   08     Lung transplantation showcase
 *   09     Why Somajiguda — capability tiles
 *   10     Continue the Learning
 *   11     View Recorded Talks
 *   12     Footer (in the layout shell)
 *
 * No video element is mounted anywhere on this page.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function Home() {
  // In go-live mode (VITE_SHOW_PLACEHOLDERS=false) unapproved records do not
  // render — so a section with nothing approved in it is skipped entirely
  // rather than left as a heading above empty space.
  const hasFaculty = visibleOnly(doctors).length > 0;
  const hasCapabilities = visibleOnly(capabilities).length > 0;

  useSeo({
    title: `${site.eventShort} | ${site.hospital} – ${site.centre}`,
    description:
      'Knowledge. Expertise. Advanced Pulmonary Care. Recorded sessions from the Pulmo Mentor BFD Workshop and the advanced pulmonary capabilities of Yashoda Hospitals, Somajiguda — ECMO, advanced interventions and lung transplantation.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: site.event,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      organizer: {
        '@type': 'MedicalOrganization',
        name: `${site.hospital} — ${site.centre}`,
        department: { '@type': 'MedicalOrganization', name: site.department },
      },
      location: {
        '@type': 'Place',
        name: `${site.hospital}, ${site.centre}`,
        address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'IN' },
      },
    },
  });

  return (
    <>
      {/* 01 · 02 — Branding and the workshop */}
      <Hero />

      {/* 03 — Faculty profile */}
      {hasFaculty && (
      <Section
        id="department-profile"
        index="03"
        eyebrow="Faculty"
        title="The Department of Pulmonology"
        lede="The clinicians behind the Pulmo Mentor BFD programme and the pulmonary services at Somajiguda."
      >
        <FacultyGrid columns={2} />
        <div className="mt-10">
          <ApprovalNote>
            <strong className="font-semibold">For the content team:</strong> faculty names,
            designations, qualifications, photographs and profile text are placeholders. Replace the
            entries in <code>src/data/doctors.ts</code> with hospital-approved details and set each
            record's <code>status</code> to <code>approved</code>. No clinician is named and no
            credential is invented anywhere in this build.
          </ApprovalNote>
        </div>
      </Section>
      )}

      {/* 04 — Pulmonology at Somajiguda */}
      <Section
        id="pulmonology"
        tone="mist"
        index="04"
        eyebrow="Department Profile"
        title={departmentProfile.title}
      >
        <DepartmentProfile />
      </Section>

      {/* 05 — Advanced capabilities: the three showcase cards */}
      <Section
        id="advanced-capabilities"
        index="05"
        eyebrow="Advanced Capabilities"
        title="Three capabilities that define the centre."
        lede="Extracorporeal support, advanced pulmonary intervention and lung transplantation — the areas where complex respiratory care is decided."
      >
        <ShowcaseIndex />
      </Section>

      {/* 06 · 07 · 08 — The showcases in full */}
      <ECMOSection />
      <InterventionSection />
      <LungTransplantSection />

      {/* 09 — Why Somajiguda */}
      {hasCapabilities && (
      <Section
        id="why-somajiguda"
        index="09"
        eyebrow={capabilitiesIntro.eyebrow}
        title={capabilitiesIntro.title}
        lede={capabilitiesIntro.lede}
      >
        <CapabilityGrid />
      </Section>
      )}

      {/* 10 — Continue the Learning */}
      <Section
        id="continue-learning"
        tone="mist"
        index="10"
        eyebrow="Continue the Learning"
        title="The workshop, on record."
      >
        <ContinueLearning />
      </Section>

      {/* 11 — View Recorded Talks */}
      <CTASection location="home-final-cta" />
    </>
  );
}
