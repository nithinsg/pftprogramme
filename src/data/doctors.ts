import type { Doctor } from './types';

/**
 * FACULTY / DEPARTMENT PROFILES
 *
 * ⚠️ NO REAL NAMES, CREDENTIALS OR PHOTOGRAPHS ARE INVENTED HERE.
 * Every entry below is a structural placeholder using the `Dr. [Name]` form from
 * the brief. Replace `name`, `designation`, `qualifications`, `photo` and `bio`
 * with hospital-approved copy, then set `status: 'approved'` to clear the
 * on-screen placeholder marker.
 *
 * The grid supports any number of doctors — add or remove objects freely.
 */
export const doctors: Doctor[] = [
  {
    id: 'faculty-01',
    name: 'Dr. [Name]',
    designation: '[Designation]',
    qualifications: '[Qualifications]',
    department: 'Department of Pulmonology',
    hospital: 'Yashoda Hospitals, Somajiguda',
    photo: undefined,
    focusAreas: ['Interventional Pulmonology', 'Advanced Bronchoscopy', 'Airway Disease'],
    bio: '[Approved profile summary — clinical focus, areas of practice and academic interests. Two to three sentences.]',
    status: 'placeholder',
  },
  {
    id: 'faculty-02',
    name: 'Dr. [Name]',
    designation: '[Designation]',
    qualifications: '[Qualifications]',
    department: 'Department of Pulmonology',
    hospital: 'Yashoda Hospitals, Somajiguda',
    photo: undefined,
    focusAreas: ['Critical Care', 'Extracorporeal Support', 'Respiratory Failure'],
    bio: '[Approved profile summary — clinical focus, areas of practice and academic interests. Two to three sentences.]',
    status: 'placeholder',
  },
  {
    id: 'faculty-03',
    name: 'Dr. [Name]',
    designation: '[Designation]',
    qualifications: '[Qualifications]',
    department: 'Department of Pulmonology',
    hospital: 'Yashoda Hospitals, Somajiguda',
    photo: undefined,
    focusAreas: ['Lung Transplantation', 'Advanced Lung Disease', 'Pre- and Post-transplant Care'],
    bio: '[Approved profile summary — clinical focus, areas of practice and academic interests. Two to three sentences.]',
    status: 'placeholder',
  },
  {
    id: 'faculty-04',
    name: 'Dr. [Name]',
    designation: '[Designation]',
    qualifications: '[Qualifications]',
    department: 'Department of Pulmonology',
    hospital: 'Yashoda Hospitals, Somajiguda',
    photo: undefined,
    focusAreas: ['Interstitial Lung Disease', 'Pulmonary Function Testing', 'Clinical Research'],
    bio: '[Approved profile summary — clinical focus, areas of practice and academic interests. Two to three sentences.]',
    status: 'placeholder',
  },
];

/** The department-level introduction shown above the faculty grid. */
export const departmentProfile = {
  eyebrow: 'Department Profile',
  title: 'Pulmonology at Somajiguda',
  lede: 'The Department of Pulmonology at Yashoda Hospitals, Somajiguda brings clinical pulmonology, interventional pulmonology, advanced diagnostics and respiratory critical care together within a single tertiary-care centre.',
  body: [
    'Care is organised around multidisciplinary teams, so that a patient with complex respiratory disease is assessed by pulmonology, critical care, radiology, pathology, thoracic surgery and transplant services working to one shared plan.',
    'The department is also an academic unit. Teaching programmes such as the Pulmo Mentor BFD Workshop, case discussions and structured skills sessions are run for practising physicians and trainees across the region.',
  ],
  pillars: [
    {
      title: 'Specialist expertise',
      description:
        'A dedicated pulmonology faculty covering airway disease, interstitial lung disease, infection, sleep and respiratory failure.',
    },
    {
      title: 'Advanced pulmonary care',
      description:
        'Escalation pathways from ward-level respiratory care through non-invasive support to advanced extracorporeal support.',
    },
    {
      title: 'Complex respiratory disease',
      description:
        'Structured evaluation of diagnostically difficult and treatment-refractory respiratory presentations.',
    },
    {
      title: 'Interventional pulmonology',
      description:
        'A diagnostic and therapeutic bronchoscopy service supported by dedicated procedural infrastructure.',
    },
    {
      title: 'Advanced diagnostics',
      description:
        'Pulmonary function testing, cross-sectional imaging and tissue diagnosis integrated into one pathway.',
    },
    {
      title: 'Research & academics',
      description:
        'Participation in clinical research, teaching programmes and continuing medical education.',
    },
  ],
} as const;
