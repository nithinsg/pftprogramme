import { Award } from 'lucide-react';
import { courseDirector } from '@/data/doctor';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { ApprovalNote } from '@/components/ui/ContentStatus';

/**
 * "Meet the Course Director".
 *
 * Credentials are transcribed from the official Yashoda profile as supplied by
 * the client — see the source note in src/data/doctor.ts. Nothing is added.
 * The layout holds a selected set rather than the full profile, per the brief.
 */
export function DoctorProfile() {
  return (
    <Section id="course-director" tone="mist" index="02" eyebrow="Meet the Course Director">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] lg:gap-16">
        {/* Portrait */}
        <Reveal>
          <div className="min-w-0">
            <MediaFrame
              media={{
                src: courseDirector.photo || undefined,
                alt: `${courseDirector.name}, ${courseDirector.designation}`,
                brief: courseDirector.photoBrief,
                status: courseDirector.photo ? 'verified' : 'placeholder',
              }}
              ratio="4/5"
              className="shadow-card"
            />
          </div>
        </Reveal>

        {/* Name, designation, credentials */}
        <div className="min-w-0">
          <Reveal>
            <p className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-accent-600">
              {courseDirector.role}
            </p>
            <h3 className="mt-3 text-heading font-semibold text-ink-900">{courseDirector.name}</h3>
            <p className="mt-4 text-subhead font-medium text-ink-700">
              {courseDirector.designation}
            </p>
            <p className="mt-1 text-base text-ink-500">{courseDirector.institution}</p>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-ink-600">
              {courseDirector.intro}
            </p>
          </Reveal>

          <Reveal delay={140}>
            <h4 className="eyebrow mt-10">Qualifications</h4>
            <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {courseDirector.qualifications.map((q) => (
                <li key={q.degree} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500"
                  />
                  <span className="text-sm leading-snug text-ink-800">
                    {q.degree}
                    {q.note && (
                      <span className="mt-0.5 flex items-center gap-1 text-[0.75rem] font-medium text-accent-600">
                        {q.note === 'Gold Medalist' && (
                          <Award className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                        )}
                        {q.note}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-10">
              <ApprovalNote>
                <strong className="font-semibold">Before go-live:</strong> these credentials were
                supplied as coming from the official Yashoda profile and are transcribed verbatim —
                nothing has been added or inferred. This build could not reach yashodahospitals.com
                to verify them, so please check each line against the official profile, and confirm
                the portrait is cleared for use on this page.
              </ApprovalNote>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
