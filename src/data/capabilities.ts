import type { Capability, ProgrammeHighlight } from './types';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SOMAJIGUDA — PULMONARY CAPABILITY GRID
 * ─────────────────────────────────────────────────────────────────────────────
 * Capability statements only: what the service does. No volumes, no success
 * rates, no outcomes, no superlatives. Each entry corresponds to a capability
 * named in the supplied official Yashoda information or in the course
 * director's listed expertise.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const capabilities: Capability[] = [
  // ── Diagnostics ──────────────────────────────────────────────────────────
  {
    id: 'pft',
    title: 'Pulmonary Function Testing',
    summary: 'Spirometry, lung volumes and diffusion studies.',
    icon: 'gauge',
    group: 'Diagnostics',
    status: 'verified',
  },
  {
    id: 'body-box',
    title: 'Body Plethysmography',
    summary: 'Body box measurement of absolute lung volumes and airway resistance.',
    icon: 'layers',
    group: 'Diagnostics',
    status: 'verified',
  },
  {
    id: 'cpet',
    title: 'CPET',
    summary: 'Cardiopulmonary exercise testing for unexplained breathlessness.',
    icon: 'heart-pulse',
    group: 'Diagnostics',
    status: 'verified',
  },
  {
    id: 'bronchoprovocation',
    title: 'Bronchoprovocation Testing',
    summary: 'Challenge testing for airway hyper-responsiveness.',
    icon: 'wind',
    group: 'Diagnostics',
    status: 'verified',
  },
  {
    id: 'advanced-diagnostics',
    title: 'Advanced Pulmonary Diagnostics',
    summary: 'Physiology, imaging and tissue diagnosis brought into one pathway.',
    icon: 'scan',
    group: 'Diagnostics',
    status: 'verified',
  },
  {
    id: 'lung-cancer-diagnostics',
    title: 'Lung Cancer Diagnostics',
    summary: 'Diagnostic evaluation and staging of pulmonary malignancy.',
    icon: 'microscope',
    group: 'Diagnostics',
    status: 'verified',
  },

  // ── Intervention ─────────────────────────────────────────────────────────
  {
    id: 'bronchoscopy',
    title: 'Bronchoscopy',
    summary: 'Flexible and rigid bronchoscopy for diagnosis and therapy.',
    icon: 'activity',
    group: 'Intervention',
    status: 'verified',
  },
  {
    id: 'ebus',
    title: 'EBUS',
    summary: 'Linear and radial endobronchial ultrasound with real-time sampling.',
    icon: 'waves',
    group: 'Intervention',
    status: 'verified',
  },
  {
    id: 'cryobiopsy',
    title: 'Cryobiopsy',
    summary: 'Transbronchial cryoprobe sampling for diffuse lung disease.',
    icon: 'syringe',
    group: 'Intervention',
    status: 'verified',
  },
  {
    id: 'interventional-pulmonology',
    title: 'Interventional Pulmonology',
    summary: 'Airway stenting, dilation, electrocautery and thoracoscopy.',
    icon: 'stethoscope',
    group: 'Intervention',
    status: 'verified',
  },

  // ── Advanced care ────────────────────────────────────────────────────────
  {
    id: 'sleep-medicine',
    title: 'Sleep Medicine',
    summary: 'Sleep diagnostics and management of sleep-disordered breathing.',
    icon: 'moon',
    group: 'Advanced Care',
    status: 'verified',
  },
  {
    id: 'ild',
    title: 'ILD Care',
    summary: 'Diagnosis and long-term management of interstitial lung disease.',
    icon: 'layers',
    group: 'Advanced Care',
    status: 'verified',
  },
  {
    id: 'critical-care',
    title: 'Critical Care',
    summary: 'Intensive care for respiratory failure and complex respiratory disease.',
    icon: 'monitor',
    group: 'Advanced Care',
    status: 'verified',
  },
  {
    id: 'ecmo',
    title: 'ECMO',
    summary: 'Extracorporeal membrane oxygenation for severe respiratory failure.',
    icon: 'shield',
    group: 'Advanced Care',
    status: 'verified',
  },
  {
    id: 'lung-transplantation',
    title: 'Lung Transplantation',
    summary: 'Assessment and multidisciplinary care for advanced lung disease.',
    icon: 'wind',
    group: 'Advanced Care',
    status: 'verified',
  },
];

export const capabilityGroups = ['Diagnostics', 'Intervention', 'Advanced Care'] as const;

/**
 * PROGRAMME HIGHLIGHTS — from the official event listing for the
 * Pulmo Mentor Master Class in PFT.
 */
export const programmeHighlights: ProgrammeHighlight[] = [
  {
    id: 'basics-to-advanced',
    title: 'Basics to Advanced PFT',
    description: 'From first principles of respiratory physiology through to advanced interpretation.',
    icon: 'gauge',
    status: 'verified',
  },
  {
    id: 'hands-on',
    title: 'Hands-On Respiratory Diagnostics',
    description: 'Practical experience with respiratory diagnostic equipment and technique.',
    icon: 'stethoscope',
    status: 'verified',
  },
  {
    id: 'alti-trainer',
    title: 'Alti Trainer',
    description: 'Demonstration of the Alti Trainer respiratory diagnostic device.',
    icon: 'monitor',
    status: 'verified',
  },
  {
    id: 'bronchoprovocation',
    title: 'Bronchoprovocation Testing',
    description: 'Challenge testing and its place in the diagnostic pathway.',
    icon: 'wind',
    status: 'verified',
  },
  {
    id: 'cpet',
    title: 'CPET',
    description: 'Cardiopulmonary exercise testing, demonstrated and interpreted.',
    icon: 'heart-pulse',
    status: 'verified',
  },
  {
    id: 'body-box',
    title: 'Body Box',
    description: 'Body plethysmography for absolute lung volumes and airway resistance.',
    icon: 'layers',
    status: 'verified',
  },
  {
    id: 'demonstrations',
    title: 'Practical Demonstrations',
    description: 'Live demonstrations across the respiratory diagnostic workflow.',
    icon: 'activity',
    status: 'verified',
  },
  {
    id: 'centre-of-excellence',
    title: 'Centre of Excellence Launch',
    description: 'Launch of the Centre of Excellence, marked during the programme.',
    icon: 'graduation',
    status: 'verified',
  },
];
