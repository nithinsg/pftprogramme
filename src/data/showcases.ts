import type { Showcase } from './types';

/**
 * CAPABILITY SHOWCASES — ECMO, ADVANCED INTERVENTIONS, LUNG TRANSPLANTATION (§6)
 *
 * ⚠️ MEDICAL CONTENT RULE
 * Nothing here states a volume, a success rate, an outcome or a patient story.
 * `highlights` are capability statements. `procedures` describe what a procedure
 * is, not how often it is done or how well it goes.
 *
 * PROCEDURE VISIBILITY: a procedure only renders in production once its
 * `status` is `approved` (the brief: "only display specific procedures when
 * approved content exists"). While VITE_SHOW_PLACEHOLDERS is on, unapproved
 * procedures stay visible for review with a pending marker.
 *
 * CASE VIDEOS: any film showing a patient, a procedure or identifiable clinical
 * material must have `consent: 'on-file'` AND `status: 'approved'` before it
 * will play. The player refuses to mount a source that fails either check.
 */
export const showcases: Showcase[] = [
  {
    id: 'ecmo',
    href: '/ecmo',
    eyebrow: 'Showcase 01',
    title: 'ECMO / Advanced Extracorporeal Support',
    subtitle: 'Advanced respiratory support for critically ill patients',
    description:
      'Extracorporeal membrane oxygenation supports gas exchange when the lungs cannot, buying time for the underlying disease to be treated or for a definitive plan to be made. At Somajiguda it sits inside the respiratory critical care pathway, with pulmonology, intensivists, perfusion and cardiothoracic teams working to one protocol.',
    highlights: [
      'Veno-venous support for severe respiratory failure',
      'Multidisciplinary selection and daily review',
      'Dedicated perfusion and nursing support',
      'Escalation and weaning governed by protocol',
      'Integrated with the transplant assessment pathway',
    ],
    procedures: [
      {
        id: 'vv-ecmo',
        title: 'Veno-venous ECMO',
        description: 'Extracorporeal gas exchange in severe, potentially reversible respiratory failure.',
        status: 'awaiting-approval',
      },
      {
        id: 'ecmo-retrieval',
        title: 'Assessment & Retrieval Pathway',
        description: 'Referral, assessment and transfer pathway for patients considered for support.',
        status: 'awaiting-approval',
      },
      {
        id: 'ecmo-weaning',
        title: 'Weaning & Decannulation',
        description: 'Protocolised weaning trials and decannulation under multidisciplinary review.',
        status: 'awaiting-approval',
      },
      {
        id: 'ecmo-bridge',
        title: 'Bridge to Decision',
        description: 'Support while definitive management, including transplant assessment, is determined.',
        status: 'awaiting-approval',
      },
    ],
    media: {
      alt: 'ECMO circuit and critical care environment at Yashoda Hospitals, Somajiguda',
      brief:
        'Hero still: ECMO console / circuit in the critical care unit, shallow depth of field, cool clinical light. No identifiable patient. Landscape 16:9, min 2000px wide.',
      status: 'placeholder',
    },
    caseVideos: [
      {
        id: 'ecmo-story-01',
        title: '[ECMO Story 01 — approved title]',
        summary:
          '[Short approved description of the case film: what it shows, who presents it, what the teaching point is. No outcome claims until cleared.]',
        duration: '--:--',
        video: { provider: 'pending', layout: 'composite-ppt-speaker' },
        attribution: 'Dr. [Name], Department of Pulmonology',
        consent: 'required',
        status: 'placeholder',
      },
      {
        id: 'ecmo-story-02',
        title: '[ECMO Story 02 — approved title]',
        summary:
          '[Short approved description of the case film: what it shows, who presents it, what the teaching point is. No outcome claims until cleared.]',
        duration: '--:--',
        video: { provider: 'pending', layout: 'composite-ppt-speaker' },
        attribution: 'Dr. [Name], Department of Pulmonology',
        consent: 'required',
        status: 'placeholder',
      },
    ],
    ctaLabel: 'Watch ECMO Stories',
    attribution: 'Faculty: Dr. [Name] · Dr. [Name], Department of Pulmonology',
    libraryCategory: 'ecmo',
    status: 'awaiting-approval',
  },

  {
    id: 'interventions',
    href: '/interventions',
    eyebrow: 'Showcase 02',
    title: 'Advanced Pulmonary Interventions',
    subtitle: 'Diagnosis and therapy delivered through the airway',
    description:
      'Interventional pulmonology answers two questions without an open operation: what is this, and can it be treated from inside the airway. The service covers diagnostic sampling of the mediastinum and lung parenchyma through to therapeutic management of the central airway.',
    highlights: [
      'Diagnostic and therapeutic bronchoscopy',
      'Mediastinal and hilar nodal sampling',
      'Peripheral lung lesion sampling',
      'Central airway management',
      'Pleural diagnosis and intervention',
    ],
    procedures: [
      {
        id: 'bronchoscopy',
        title: 'Diagnostic Bronchoscopy',
        description: 'Airway inspection with lavage, brushing and biopsy for diagnosis.',
        status: 'awaiting-approval',
      },
      {
        id: 'ebus',
        title: 'EBUS / EBUS-TBNA',
        description: 'Endobronchial ultrasound with real-time needle sampling of mediastinal and hilar nodes.',
        status: 'awaiting-approval',
      },
      {
        id: 'cryobiopsy',
        title: 'Cryobiopsy',
        description: 'Cryoprobe sampling for larger, better-preserved tissue in diffuse lung disease.',
        status: 'awaiting-approval',
      },
      {
        id: 'nodule',
        title: 'Lung Nodule Procedures',
        description: 'Navigational and guided approaches to the peripheral pulmonary nodule.',
        status: 'awaiting-approval',
      },
      {
        id: 'airway',
        title: 'Complex Airway Procedures',
        description: 'Management of central airway obstruction, including dilatation and stenting.',
        status: 'awaiting-approval',
      },
      {
        id: 'pleural',
        title: 'Pleural Interventions',
        description: 'Thoracoscopy, pleural drainage and indwelling catheter management.',
        status: 'awaiting-approval',
      },
    ],
    media: {
      alt: 'Interventional pulmonology suite at Yashoda Hospitals, Somajiguda',
      brief:
        'Hero still: bronchoscopy suite mid-procedure, operator hands and monitor stack, no identifiable patient or staff faces without release. Landscape 16:9, min 2000px wide.',
      status: 'placeholder',
    },
    caseVideos: [
      {
        id: 'intervention-film-01',
        title: '[Procedure Film 01 — approved title]',
        summary:
          '[Short approved description: the procedure demonstrated, the indication in general terms and the teaching point.]',
        duration: '--:--',
        video: { provider: 'pending', layout: 'composite-ppt-speaker' },
        attribution: 'Dr. [Name], Department of Pulmonology',
        consent: 'required',
        status: 'placeholder',
      },
      {
        id: 'intervention-film-02',
        title: '[Procedure Film 02 — approved title]',
        summary:
          '[Short approved description: the procedure demonstrated, the indication in general terms and the teaching point.]',
        duration: '--:--',
        video: { provider: 'pending', layout: 'composite-ppt-speaker' },
        attribution: 'Dr. [Name], Department of Pulmonology',
        consent: 'required',
        status: 'placeholder',
      },
      {
        id: 'intervention-film-03',
        title: '[Procedure Film 03 — approved title]',
        summary:
          '[Short approved description: the procedure demonstrated, the indication in general terms and the teaching point.]',
        duration: '--:--',
        video: { provider: 'pending', layout: 'composite-ppt-speaker' },
        attribution: 'Dr. [Name], Department of Pulmonology',
        consent: 'required',
        status: 'placeholder',
      },
    ],
    ctaLabel: 'Explore Advanced Interventions',
    attribution: 'Faculty: Dr. [Name] · Dr. [Name], Department of Pulmonology',
    libraryCategory: 'interventions',
    status: 'awaiting-approval',
  },

  {
    id: 'lung-transplant',
    href: '/lung-transplant',
    eyebrow: 'Showcase 03',
    title: 'Lung Transplantation',
    subtitle: 'Advanced multidisciplinary care for complex lung disease',
    description:
      'Transplantation is the end of a long pathway, not a single operation. It begins with recognising which patient with advanced lung disease should be assessed, and continues through optimisation, listing, surgery and lifelong follow-up — coordinated across pulmonology, surgery, anaesthesia, critical care, physiotherapy and transplant coordination.',
    highlights: [
      'Referral and candidacy assessment',
      'Pre-transplant optimisation and rehabilitation',
      'Multidisciplinary team review',
      'Peri-operative critical care',
      'Long-term post-transplant follow-up',
    ],
    procedures: [
      {
        id: 'referral',
        title: 'Referral & Assessment',
        description: 'Structured evaluation of patients with advanced lung disease for candidacy.',
        status: 'awaiting-approval',
      },
      {
        id: 'optimisation',
        title: 'Pre-transplant Optimisation',
        description: 'Nutrition, rehabilitation and comorbidity management before listing.',
        status: 'awaiting-approval',
      },
      {
        id: 'mdt',
        title: 'Multidisciplinary Team Review',
        description: 'Joint decision-making across pulmonology, surgery, critical care and coordination.',
        status: 'awaiting-approval',
      },
      {
        id: 'follow-up',
        title: 'Post-transplant Follow-up',
        description: 'Surveillance, immunosuppression management and long-term respiratory care.',
        status: 'awaiting-approval',
      },
    ],
    media: {
      alt: 'Multidisciplinary lung transplant team at Yashoda Hospitals, Somajiguda',
      brief:
        'Hero still: multidisciplinary team in discussion or a transplant theatre environment. Consent and institutional release required for any identifiable person. Landscape 16:9, min 2000px wide.',
      status: 'placeholder',
    },
    caseVideos: [
      {
        id: 'transplant-story-01',
        title: '[Patient Journey 01 — approved title]',
        summary:
          '[Short approved description of the patient journey film. Patient consent and institutional approval are mandatory before this can be published.]',
        duration: '--:--',
        video: { provider: 'pending', layout: 'composite-ppt-speaker' },
        attribution: 'Dr. [Name], Department of Pulmonology',
        consent: 'required',
        status: 'placeholder',
      },
      {
        id: 'transplant-story-02',
        title: '[Multidisciplinary Team Film — approved title]',
        summary:
          '[Short approved description of the team film: who is featured, what the pathway shows.]',
        duration: '--:--',
        video: { provider: 'pending', layout: 'composite-ppt-speaker' },
        attribution: 'Department of Pulmonology',
        consent: 'required',
        status: 'placeholder',
      },
    ],
    ctaLabel: 'Explore Lung Transplant',
    attribution: 'Faculty: Dr. [Name] · Dr. [Name], Department of Pulmonology',
    libraryCategory: 'transplant',
    status: 'awaiting-approval',
  },
];

export const showcaseById = (id: string) => showcases.find((s) => s.id === id);
