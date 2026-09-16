import { useState } from 'react';
import { Clock } from 'lucide-react';
import type { Session } from '@/data/types';
import { sessionCategories, sessions } from '@/data/sessions';
import { event } from '@/data/site';
import { track } from '@/lib/analytics';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { ApprovalNote, StatusChip, isVisible } from '@/components/ui/ContentStatus';
import { ShareBar } from '@/components/ui/ShareBar';
import { SessionThumbnail } from '@/components/video/SessionThumbnail';
import { VideoModal } from '@/components/video/VideoModal';

/**
 * The destination.
 *
 * Grouped by programme category so the shape of the day is visible. No video is
 * mounted here — every card is a poster and a button, and the player only
 * exists once the visitor opens a session in the modal.
 */
export function RecordedSessions() {
  const [openSession, setOpenSession] = useState<Session | null>(null);
  const visible = sessions.filter((s) => isVisible(s.status));
  const categories = sessionCategories();

  const open = (session: Session) => {
    setOpenSession(session);
    track({
      name: 'session_open',
      sessionId: session.id,
      title: session.title,
      category: session.category,
    });
  };

  return (
    <>
      <Section
        id="recorded-sessions"
        index="07"
        eyebrow="Recorded Sessions"
        title={event.name}
        lede={`${event.date} · ${event.venueShort}`}
      >
        {visible.length === 0 ? (
          <div className="rounded-card border border-dashed border-line bg-mist-100 px-6 py-16 text-center">
            <p className="text-sm font-medium text-ink-700">
              Recordings are published here as post-production completes each session.
            </p>
          </div>
        ) : (
          <div className="space-y-14 sm:space-y-16">
            {categories.map((category) => {
              const inCategory = visible.filter((s) => s.category === category);
              if (inCategory.length === 0) return null;

              return (
                <div key={category}>
                  <Reveal>
                    <div className="mb-7 flex items-baseline gap-4">
                      <h3 className="text-subhead font-semibold text-ink-900">{category}</h3>
                      <span aria-hidden="true" className="h-px flex-1 bg-line" />
                      <span className="section-index">
                        {String(inCategory.length).padStart(2, '0')}
                      </span>
                    </div>
                  </Reveal>

                  <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {inCategory.map((session, i) => (
                      <li key={session.id}>
                        <Reveal delay={Math.min(i, 3) * 70}>
                          <SessionCard session={session} onOpen={() => open(session)} />
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 space-y-6">
          <ShareBar />
          <ApprovalNote>
            <strong className="font-semibold">For the content team:</strong> every session above is
            a placeholder — no speaker is named and no title is invented. Fill in one object per
            recording in <code>src/data/sessions.ts</code> and the card, thumbnail, grouping and
            modal player all follow. What post-production must deliver is specified in{' '}
            <code>docs/RECORDING-SPEC.md</code>.
          </ApprovalNote>
        </div>
      </Section>

      {openSession && (
        <VideoModal
          session={openSession}
          onClose={() => setOpenSession(null)}
          onSelect={setOpenSession}
        />
      )}
    </>
  );
}

function SessionCard({ session, onOpen }: { session: Session; onOpen: () => void }) {
  return (
    <article className="group flex h-full flex-col">
      <button
        type="button"
        onClick={onOpen}
        className="flex flex-1 flex-col text-left outline-offset-4"
        aria-label={`Play session: ${session.title}, ${session.speaker}`}
      >
        <span className="relative block overflow-hidden rounded-card shadow-card transition-shadow duration-500 ease-editorial group-hover:shadow-card-hover">
          <SessionThumbnail session={session} />
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-pill bg-ink-950/80 px-2.5 py-1 text-[0.625rem] font-semibold tabular-nums text-white backdrop-blur-sm">
            <Clock className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
            {session.duration}
          </span>
        </span>

        <span className="flex flex-1 flex-col pt-5">
          <span className="text-meta font-medium text-ink-500">{session.category}</span>
          <span className="mt-2 block text-subhead font-semibold leading-snug text-ink-900 transition-colors duration-300 group-hover:text-ink-700">
            {session.title}
          </span>
          <span className="mt-3 block text-sm font-semibold text-ink-800">{session.speaker}</span>
          <span className="block text-meta text-ink-500">
            {session.designation}
            {session.designation && session.institution ? ' · ' : ''}
            {session.institution}
          </span>
          <span className="mt-4 flex items-center gap-1.5 text-meta font-semibold uppercase tracking-[0.1em] text-accent-600">
            Watch session
            <span
              aria-hidden="true"
              className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </span>
      </button>

      <StatusChip status={session.status} className="mt-4 self-start" />
    </article>
  );
}
