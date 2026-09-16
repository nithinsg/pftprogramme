/**
 * Brand, navigation and footer content.
 *
 * ⚠️ BRAND ASSETS: `logo.src` is intentionally empty. Drop the official Yashoda
 * Hospitals logo into /public/media/ and point `logo.src` at it. Until then the
 * header renders a neutral typographic lockup — no invented mark is used.
 */

export const site = {
  hospital: 'Yashoda Hospitals',
  centre: 'Somajiguda',
  city: 'Hyderabad',
  department: 'Department of Pulmonology',
  departmentShort: 'Pulmonology',
  event: 'Pulmo Mentor BFD Workshop',
  eventShort: 'Pulmo Mentor BFD',
  tagline: 'Knowledge. Expertise. Advanced Pulmonary Care.',
  /**
   * "BFD" is carried through exactly as supplied by the organisers. If there is
   * an official expansion, add it here and it will surface in the hero subtitle.
   */
  eventExpansion: '' as string,
  logo: {
    /** e.g. '/media/yashoda-logo.svg' once the official asset is supplied. */
    src: '' as string,
    alt: 'Yashoda Hospitals',
  },
  /**
   * Contact details are deliberately empty. Do not invent phone numbers, email
   * addresses or URLs — fill these in only from officially supplied details.
   */
  contact: {
    website: '' as string,
    phone: '' as string,
    email: '' as string,
    address: 'Somajiguda, Hyderabad, Telangana',
  },
} as const;

export interface NavItem {
  label: string;
  href: string;
  /** Section id on the home page, used when the route is the home page itself. */
  hash?: string;
}

export const primaryNav: NavItem[] = [
  { label: 'Pulmonology', href: '/about' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'ECMO', href: '/ecmo' },
  { label: 'Interventions', href: '/interventions' },
  { label: 'Lung Transplant', href: '/lung-transplant' },
  { label: 'Recorded Talks', href: '/recordings' },
];

export const footerNav: NavItem[] = [
  { label: 'Pulmonology at Somajiguda', href: '/about' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'ECMO', href: '/ecmo' },
  { label: 'Advanced Interventions', href: '/interventions' },
  { label: 'Lung Transplant', href: '/lung-transplant' },
  { label: 'Recorded Talks', href: '/recordings' },
  { label: 'Faculty', href: '/doctors' },
];

/** The single CTA repeated across the site. Change it here, it changes everywhere. */
export const primaryCta = {
  label: 'View Recorded Talks',
  href: '/recordings',
} as const;

export const secondaryCta = {
  label: 'Explore Pulmonology',
  href: '/capabilities',
} as const;
