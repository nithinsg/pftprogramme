import type { ExpertiseArea } from './types';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * COURSE DIRECTOR — DR. B. VISWESVARAN
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️ SOURCE NOTE, PLEASE READ BEFORE GO-LIVE
 *
 * The name, designation, qualifications and expertise areas below were supplied
 * by the client as coming from the official Yashoda Hospitals doctor profile.
 * They are transcribed here verbatim — nothing has been added, embellished or
 * inferred, and no credential, award, statistic or outcome has been invented.
 *
 * The build environment could not reach yashodahospitals.com to verify them
 * independently. Before go-live, check each line against the official profile
 * and confirm the photograph is cleared for use on this page.
 *
 * Deliberately NOT included, because they were not supplied: years of
 * experience, procedure volumes, publications, memberships, awards beyond the
 * two Gold Medals named below, and any patient-outcome claim.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const courseDirector = {
  name: 'Dr. B. Viswesvaran',
  designation: 'Senior Consultant — Interventional Pulmonology & Sleep Medicine',
  institution: 'Yashoda Hospitals, Somajiguda',
  role: 'Course Director',

  /**
   * A selected set, not the full list from the official profile — the brief
   * asks for elegance over completeness here.
   */
  qualifications: [
    { degree: 'MD', note: '' },
    { degree: 'DNB', note: '' },
    { degree: 'DM — Pulmonary & Critical Care', note: 'Gold Medalist' },
    { degree: 'Fellowship in Sleep Medicine', note: 'Gold Medalist' },
    { degree: 'Fellowship in Interventional Pulmonology', note: 'Malaysia' },
    { degree: 'European Diploma in Adult Respiratory Medicine', note: 'Switzerland' },
  ],

  /**
   * PHOTOGRAPH: not embedded. Hot-linking the official profile portrait from
   * yashodahospitals.com would be both technically fragile and a use of the
   * hospital's image asset without an explicit licence on this domain. Save the
   * approved file to /public/media/ and set `photo` to its path.
   */
  photo: '' as string,
  photoBrief:
    'Official Yashoda profile portrait of Dr. B. Viswesvaran, cleared for use on this page. Square or 4:5, head and shoulders, min 800px.',

  /** One paragraph, drawn only from the supplied role and expertise. */
  intro:
    'Dr. B. Viswesvaran directs the Pulmo Mentor Master Class in PFT. His practice at Somajiguda spans interventional pulmonology and sleep medicine — from advanced bronchoscopic diagnosis through airway intervention, to the respiratory physiology that pulmonary function testing sets out to measure.',
} as const;

/**
 * Expertise areas, from the official profile as supplied: interventional
 * pulmonology, sleep medicine, flexible and rigid bronchoscopy, linear and
 * radial EBUS, cryobiopsy, airway interventions, ILD, lung cancer diagnostics,
 * critical care, ECMO and lung transplantation.
 */
export const expertise: ExpertiseArea[] = [
  {
    id: 'interventional-pulmonology',
    title: 'Interventional Pulmonology',
    description: 'Advanced diagnostic and therapeutic pulmonary interventions.',
    icon: 'activity',
    status: 'verified',
  },
  {
    id: 'sleep-medicine',
    title: 'Sleep Medicine',
    description: 'Advanced sleep diagnostics and management of sleep-disordered breathing.',
    icon: 'moon',
    status: 'verified',
  },
  {
    id: 'bronchoscopy',
    title: 'Advanced Bronchoscopy',
    description: 'Flexible bronchoscopy, rigid bronchoscopy and advanced bronchoscopic procedures.',
    icon: 'scan',
    status: 'verified',
  },
  {
    id: 'ebus',
    title: 'EBUS',
    description: 'Linear and radial EBUS-based diagnostic procedures.',
    icon: 'waves',
    status: 'verified',
  },
  {
    id: 'cryobiopsy',
    title: 'Cryobiopsy',
    description: 'Transbronchial cryobiopsy and advanced pulmonary diagnostics.',
    icon: 'syringe',
    status: 'verified',
  },
  {
    id: 'airway-interventions',
    title: 'Airway Interventions',
    description: 'Airway stenting, dilation, electrocautery and related interventions.',
    icon: 'wind',
    status: 'verified',
  },
  {
    id: 'ild',
    title: 'ILD',
    description: 'Diagnosis and management of interstitial lung disease.',
    icon: 'layers',
    status: 'verified',
  },
  {
    id: 'lung-cancer',
    title: 'Lung Cancer Diagnostics',
    description: 'Advanced diagnostic evaluation of pulmonary malignancy.',
    icon: 'microscope',
    status: 'verified',
  },
  {
    id: 'ecmo-transplant',
    title: 'ECMO & Lung Transplantation',
    description: 'Advanced respiratory support and involvement in lung transplantation.',
    icon: 'heart-pulse',
    status: 'verified',
  },
];
