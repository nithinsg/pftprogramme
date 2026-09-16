import type { ShowcaseVideo } from './types';
import { YOUTUBE_ID_PLACEHOLDER } from './types';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * EXPLORE PULMONARY EXPERTISE — curated official Yashoda videos
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️ NO VIDEO ID IS GUESSED.
 *
 * The titles and attributions below are the official Yashoda videos named by
 * the client. The build environment could not reach yashodahospitals.com or
 * youtube.com to resolve their video IDs, so every `youtubeId` is the
 * placeholder token. The card renders fully — thumbnail, topic, attribution,
 * play affordance — and the player shows a labelled empty state instead of
 * embedding a video that might be the wrong one.
 *
 * TO PUBLISH: open the official Yashoda YouTube channel or the doctor's profile
 * page, copy the id out of the watch URL (youtube.com/watch?v=THIS_PART), paste
 * it into `youtubeId`, and set `status` to 'verified'. Use only official
 * Yashoda uploads — never a re-upload or a third-party channel.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const showcaseVideos: ShowcaseVideo[] = [
  {
    id: 'thoracic-ultrasound',
    category: 'Interventional Pulmonology',
    title: 'Interventional Pulmonology — Thoracic Ultrasound',
    doctor: 'Dr. B. Viswesvaran',
    description:
      'Thoracic ultrasound in the interventional pulmonology workflow, from the Yashoda pulmonology library.',
    video: { youtubeId: YOUTUBE_ID_PLACEHOLDER, layout: 'single-camera' },
    sourceUrl: '',
    status: 'placeholder',
  },
  {
    id: 'ebus',
    category: 'Advanced Diagnostics',
    title: 'EBUS — Endobronchial Ultrasound Bronchoscopy',
    doctor: 'Dr. B. Viswesvaran',
    description:
      'Endobronchial ultrasound and its role in sampling the mediastinum and staging lung disease.',
    video: { youtubeId: YOUTUBE_ID_PLACEHOLDER, layout: 'single-camera' },
    sourceUrl: '',
    status: 'placeholder',
  },
  {
    id: 'lung-transplant',
    category: 'Lung Transplantation',
    title: 'Lung Transplant: A Second Chance at Life',
    doctor: 'Dr. Tapaswi Krishna K',
    description:
      'The lung transplantation pathway at Yashoda Hospitals, from assessment through to long-term care.',
    video: { youtubeId: YOUTUBE_ID_PLACEHOLDER, layout: 'single-camera' },
    sourceUrl: '',
    status: 'placeholder',
  },
  {
    id: 'sleep-medicine',
    category: 'Sleep Medicine',
    title: '[ADD OFFICIAL VIDEO TITLE]',
    doctor: 'Dr. B. Viswesvaran',
    description:
      'Select a sleep or respiratory-health video from the official Yashoda profile, or remove this card.',
    video: { youtubeId: YOUTUBE_ID_PLACEHOLDER, layout: 'single-camera' },
    sourceUrl: '',
    status: 'placeholder',
  },
];
