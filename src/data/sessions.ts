import type { Session } from './types';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * RECORDED SESSIONS — Pulmo Mentor Master Class in PFT
 * ─────────────────────────────────────────────────────────────────────────────
 * ADDING A RECORDING = ADDING ONE OBJECT TO THIS ARRAY. Nothing else changes:
 * the card, the branded thumbnail, the modal player and the category grouping
 * are all produced from this record.
 *
 * ⚠️ EVERY ENTRY IS A PLACEHOLDER. No speaker is named and no session title is
 * invented — the `[ADD …]` tokens mark exactly what the team must supply. The
 * session categories mirror the official programme highlights so the shape of
 * the day is already right.
 *
 * Each recording is captured from two sources and composited — presentation
 * full-frame, speaker keyed into the corner. See docs/RECORDING-SPEC.md.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const sessions: Session[] = [
  {
    id: 'session-01',
    title: '[ADD SESSION TITLE]',
    speaker: '[ADD SPEAKER NAME]',
    designation: '[ADD DESIGNATION]',
    institution: '[ADD INSTITUTION]',
    category: 'Foundations',
    duration: '--:--',
    description:
      '[ADD APPROVED SESSION DESCRIPTION — two or three sentences, cleared by the speaker.]',
    video: { youtubeId: '', layout: 'presentation-and-speaker' },
    status: 'placeholder',
  },
  {
    id: 'session-02',
    title: '[ADD SESSION TITLE]',
    speaker: '[ADD SPEAKER NAME]',
    designation: '[ADD DESIGNATION]',
    institution: '[ADD INSTITUTION]',
    category: 'Foundations',
    duration: '--:--',
    description:
      '[ADD APPROVED SESSION DESCRIPTION — two or three sentences, cleared by the speaker.]',
    video: { youtubeId: '', layout: 'presentation-and-speaker' },
    status: 'placeholder',
  },
  {
    id: 'session-03',
    title: '[ADD SESSION TITLE]',
    speaker: '[ADD SPEAKER NAME]',
    designation: '[ADD DESIGNATION]',
    institution: '[ADD INSTITUTION]',
    category: 'Advanced Interpretation',
    duration: '--:--',
    description:
      '[ADD APPROVED SESSION DESCRIPTION — two or three sentences, cleared by the speaker.]',
    video: { youtubeId: '', layout: 'presentation-and-speaker' },
    status: 'placeholder',
  },
  {
    id: 'session-04',
    title: '[ADD SESSION TITLE]',
    speaker: '[ADD SPEAKER NAME]',
    designation: '[ADD DESIGNATION]',
    institution: '[ADD INSTITUTION]',
    category: 'Advanced Interpretation',
    duration: '--:--',
    description:
      '[ADD APPROVED SESSION DESCRIPTION — two or three sentences, cleared by the speaker.]',
    video: { youtubeId: '', layout: 'presentation-and-speaker' },
    status: 'placeholder',
  },
  {
    id: 'session-05',
    title: '[ADD SESSION TITLE]',
    speaker: '[ADD SPEAKER NAME]',
    designation: '[ADD DESIGNATION]',
    institution: '[ADD INSTITUTION]',
    category: 'Practical Demonstrations',
    duration: '--:--',
    description:
      '[ADD APPROVED SESSION DESCRIPTION — two or three sentences, cleared by the speaker.]',
    video: { youtubeId: '', layout: 'presentation-and-speaker' },
    status: 'placeholder',
  },
  {
    id: 'session-06',
    title: '[ADD SESSION TITLE]',
    speaker: '[ADD SPEAKER NAME]',
    designation: '[ADD DESIGNATION]',
    institution: '[ADD INSTITUTION]',
    category: 'Practical Demonstrations',
    duration: '--:--',
    description:
      '[ADD APPROVED SESSION DESCRIPTION — two or three sentences, cleared by the speaker.]',
    video: { youtubeId: '', layout: 'presentation-and-speaker' },
    status: 'placeholder',
  },
];

/** Session categories in programme order, for the grouped library view. */
export const sessionCategories = (): string[] =>
  sessions.reduce<string[]>((acc, s) => (acc.includes(s.category) ? acc : [...acc, s.category]), []);

export const getSession = (id: string): Session | undefined => sessions.find((s) => s.id === id);

/** The next session in the list, for "More recorded sessions" in the modal. */
export const adjacentSessions = (id: string, limit = 3): Session[] => {
  const i = sessions.findIndex((s) => s.id === id);
  if (i === -1) return sessions.slice(0, limit);
  return [...sessions.slice(i + 1), ...sessions.slice(0, i)].slice(0, limit);
};
