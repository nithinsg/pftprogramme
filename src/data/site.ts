/**
 * Brand, event and navigation.
 *
 * ⚠️ BRAND ASSETS: `logo.src` is intentionally empty. Drop the official Yashoda
 * Hospitals logo into /public/media/ and point `logo.src` at it. Until then the
 * header renders a neutral typographic lockup — no mark is invented.
 */

export const site = {
  hospital: 'Yashoda Hospitals',
  centre: 'Somajiguda',
  city: 'Hyderabad',
  department: 'Department of Pulmonology',
  departmentShort: 'Pulmonology',
  logo: {
    /** e.g. '/media/yashoda-logo.svg' once the official asset is supplied. */
    src: '' as string,
    alt: 'Yashoda Hospitals',
  },
  /**
   * Contact details are deliberately empty. Fill in only from officially
   * supplied details — nothing is invented here.
   */
  contact: {
    website: '' as string,
    phone: '' as string,
    email: '' as string,
  },
} as const;

/**
 * Event facts, exactly as given in the official Yashoda listing.
 * Nothing here is inferred or embellished.
 */
export const event = {
  name: 'Pulmo Mentor Master Class in PFT',
  nameLines: ['Pulmo Mentor', 'Master Class in PFT'] as const,
  shortName: 'Master Class in PFT',
  date: '20 September 2026',
  dateISO: '2026-09-20',
  time: '9:00 AM – 5:00 PM',
  venue: 'Yashoda Hospitals, Somajiguda, Hyderabad',
  venueShort: 'Yashoda Hospitals, Somajiguda',
  tagline: 'Revisit the science. Continue the learning.',
} as const;

/** Anchor navigation — this is a single page, so every link is an in-page jump. */
export interface NavItem {
  label: string;
  /** Section id on the landing page. */
  anchor: string;
}

export const primaryNav: NavItem[] = [
  { label: 'About the Workshop', anchor: 'workshop' },
  { label: 'Dr. Viswesvaran', anchor: 'course-director' },
  { label: 'Our Expertise', anchor: 'capabilities' },
  { label: 'Videos', anchor: 'videos' },
  { label: 'Recorded Sessions', anchor: 'recorded-sessions' },
];

export const primaryCta = {
  label: 'Watch Recorded Sessions',
  shortLabel: 'Watch Sessions',
  anchor: 'recorded-sessions',
} as const;

/**
 * Footer links. External hospital URLs are left empty until officially
 * supplied — a link is only rendered once `href` is filled in.
 */
export const footerLinks: Array<{ label: string; href: string }> = [
  { label: 'Yashoda Hospitals', href: '' },
  { label: 'Pulmonology', href: '' },
  { label: 'Dr. B. Viswesvaran', href: '' },
];
