import { useEffect } from 'react';
import { event, site } from '@/data/site';
import { useSeo } from '@/lib/seo';
import { track, trackScrollDepth } from '@/lib/analytics';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { StickyCta } from '@/components/layout/StickyCta';
import { Hero } from '@/components/sections/Hero';
import { WorkshopIntro } from '@/components/sections/WorkshopIntro';
import { DoctorProfile } from '@/components/sections/DoctorProfile';
import { ExpertiseGrid } from '@/components/sections/ExpertiseGrid';
import { CapabilitySection } from '@/components/sections/CapabilitySection';
import { PftBridge } from '@/components/sections/PftBridge';
import { VideoShowcase } from '@/components/sections/VideoShowcase';
import { CTASection } from '@/components/sections/CTASection';
import { RecordedSessions } from '@/components/sections/RecordedSessions';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THE LANDING PAGE — the whole public site
 * ─────────────────────────────────────────────────────────────────────────────
 * One continuous story, in this order:
 *
 *   Hero            → who this is from, and what it was
 *   Workshop        → what the day covered
 *   Course Director → Dr. B. Viswesvaran
 *   Expertise       → where his clinical work sits
 *   Capabilities    → the Somajiguda pulmonary ecosystem
 *   From PFT        → the bridge from the workshop to advanced practice
 *   Videos          → a short curated set of official Yashoda videos
 *   CTA             → Continue Your Learning
 *   Recordings      → the destination
 *
 * No video element is mounted above the CTA except by a deliberate tap, and no
 * session player exists until a recording is opened in the modal.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function Landing() {
  useSeo({
    title: `${event.name} | ${site.hospital}, ${site.centre}`,
    description: `Access recorded sessions from the ${event.name} conducted at ${site.hospital}, ${site.centre}, and explore advanced pulmonary expertise led by Dr. B. Viswesvaran.`,
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'EducationEvent',
      name: event.name,
      startDate: event.dateISO,
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      organizer: {
        '@type': 'MedicalOrganization',
        name: `${site.hospital} — ${site.centre}`,
        department: { '@type': 'MedicalOrganization', name: site.department },
      },
      location: {
        '@type': 'Place',
        name: event.venueShort,
        address: {
          '@type': 'PostalAddress',
          addressLocality: `${site.centre}, ${site.city}`,
          addressRegion: 'Telangana',
          addressCountry: 'IN',
        },
      },
    },
  });

  useEffect(() => {
    track({ name: 'page_view', path: '/', title: document.title });
    return trackScrollDepth();
  }, []);

  return (
    <>
      <a href="#workshop" className="skip-link">
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <WorkshopIntro />
        <DoctorProfile />
        <ExpertiseGrid />
        <CapabilitySection />
        <PftBridge />
        <VideoShowcase />
        <CTASection />
        <RecordedSessions />
      </main>

      <Footer />
      <StickyCta />
    </>
  );
}
