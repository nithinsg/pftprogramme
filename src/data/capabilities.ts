import type { Capability } from './types';

/**
 * "WHY SOMAJIGUDA" CAPABILITY TILES (§7)
 *
 * Capability statements only — what the department does. No volumes, no success
 * rates, no outcome claims. Every line here still needs departmental sign-off
 * before go-live; flip `status` to 'approved' as each is cleared.
 */
export const capabilities: Capability[] = [
  {
    id: 'clinical-pulmonology',
    title: 'Clinical Pulmonology',
    summary: 'Out-patient and in-patient management of the full range of respiratory disease.',
    icon: 'stethoscope',
    status: 'awaiting-approval',
  },
  {
    id: 'interventional-pulmonology',
    title: 'Interventional Pulmonology',
    summary: 'Diagnostic and therapeutic airway procedures in a dedicated procedural setting.',
    icon: 'activity',
    href: '/interventions',
    status: 'awaiting-approval',
  },
  {
    id: 'advanced-diagnostics',
    title: 'Advanced Diagnostics',
    summary: 'Imaging, endoscopic sampling and tissue diagnosis integrated into one pathway.',
    icon: 'scan',
    status: 'awaiting-approval',
  },
  {
    id: 'critical-care',
    title: 'Respiratory Critical Care',
    summary: 'Intensive care for respiratory failure, including invasive and non-invasive support.',
    icon: 'monitor',
    status: 'awaiting-approval',
  },
  {
    id: 'ecmo',
    title: 'ECMO',
    summary: 'Extracorporeal membrane oxygenation for selected patients with severe respiratory failure.',
    icon: 'heart-pulse',
    href: '/ecmo',
    status: 'awaiting-approval',
  },
  {
    id: 'lung-transplantation',
    title: 'Lung Transplantation',
    summary: 'Multidisciplinary assessment and care pathways for advanced lung disease.',
    icon: 'wind',
    href: '/lung-transplant',
    status: 'awaiting-approval',
  },
  {
    id: 'pft',
    title: 'Pulmonary Function Testing',
    summary: 'Structured physiological assessment of lung function and its interpretation.',
    icon: 'layers',
    status: 'awaiting-approval',
  },
  {
    id: 'complex-respiratory-disease',
    title: 'Complex Respiratory Disease',
    summary: 'Second-opinion and referral pathways for diagnostically difficult presentations.',
    icon: 'microscope',
    status: 'awaiting-approval',
  },
  {
    id: 'research',
    title: 'Research & Clinical Trials',
    summary: 'Participation in clinical research within the department of pulmonology.',
    icon: 'flask',
    status: 'awaiting-approval',
  },
  {
    id: 'academics',
    title: 'Academic Medicine',
    summary: 'Teaching programmes, workshops and continuing medical education for physicians.',
    icon: 'graduation',
    status: 'awaiting-approval',
  },
];

/** Short framing copy for the capability section. */
export const capabilitiesIntro = {
  eyebrow: 'Why Somajiguda',
  title: 'Advanced Pulmonary Care. Under One Roof.',
  lede: 'Diagnosis, intervention, critical care and transplantation sit within one department and one campus — so escalation happens without a handover between institutions.',
} as const;
