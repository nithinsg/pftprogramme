import { capabilities, capabilitiesIntro } from '@/data/capabilities';
import { departmentProfile } from '@/data/doctors';
import { site } from '@/data/site';
import { useSeo } from '@/lib/seo';
import { Section } from '@/components/ui/Section';
import { PageHeader } from '@/components/ui/PageHeader';
import { ApprovalNote, visibleOnly } from '@/components/ui/ContentStatus';
import { CapabilityGrid } from '@/components/home/CapabilityGrid';
import { ShowcaseIndex } from '@/components/home/ShowcaseIndex';
import { DepartmentProfile } from '@/components/home/DepartmentProfile';
import { CTASection } from '@/components/home/CTASection';

export default function Capabilities() {
  const hasCapabilities = visibleOnly(capabilities).length > 0;

  useSeo({
    title: 'Pulmonology Capabilities',
    description: `Clinical and interventional pulmonology, advanced diagnostics, respiratory critical care, ECMO and lung transplantation at ${site.hospital}, ${site.centre}.`,
    path: '/capabilities',
  });

  return (
    <>
      <PageHeader
        eyebrow={`${site.centre} · ${site.departmentShort}`}
        title={capabilitiesIntro.title}
        lede={capabilitiesIntro.lede}
        back={{ to: '/', label: 'Back to the workshop page' }}
      />

      {hasCapabilities && (
      <Section id="capability-tiles" index="01" eyebrow="Capabilities" title="What the department does">
        <CapabilityGrid />
        <div className="mt-10">
          <ApprovalNote>
            <strong className="font-semibold">For the content team:</strong> each tile is a
            capability statement awaiting departmental sign-off. They contain no volumes, success
            rates or outcome claims. Approve them individually in{' '}
            <code>src/data/capabilities.ts</code>.
          </ApprovalNote>
        </div>
      </Section>
      )}

      <Section
        id="advanced"
        tone="mist"
        index="02"
        eyebrow="Advanced Capabilities"
        title="Where complex respiratory care is decided"
        lede="Three areas carry the most complex work of the department — and each has its own page."
      >
        <ShowcaseIndex />
      </Section>

      <Section id="department" index="03" eyebrow="Department Profile" title={departmentProfile.title}>
        <DepartmentProfile />
      </Section>

      <CTASection location="capabilities-cta" />
    </>
  );
}
