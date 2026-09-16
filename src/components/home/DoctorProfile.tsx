import { Link } from 'react-router-dom';
import type { Doctor } from '@/data/types';
import { doctors } from '@/data/doctors';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { Reveal } from '@/components/ui/Reveal';
import { StatusChip, visibleOnly } from '@/components/ui/ContentStatus';
import { SpeakerAvatar } from '@/components/video/SpeakerAvatar';

/**
 * Faculty profile card (§5).
 *
 * The brief is explicit: use placeholders for names, photographs and
 * credentials rather than inventing medical professionals. The card is built so
 * that dropping in real values is the only change needed — the layout does not
 * depend on the length of any field.
 */
export function DoctorCard({ doctor, className }: { doctor: Doctor; className?: string }) {
  return (
    <article
      className={cn(
        'group flex h-full flex-col rounded-card border border-line bg-white p-6 transition-all duration-400 ease-editorial hover:border-ink-200 hover:shadow-card-hover sm:p-7',
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <span className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
          <SpeakerAvatar name={doctor.name} photo={doctor.photo} size="md" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-subhead font-semibold leading-tight text-ink-900">{doctor.name}</h3>
          <p className="mt-1.5 text-sm text-ink-600">{doctor.designation}</p>
          <p className="text-meta text-ink-500">{doctor.qualifications}</p>
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-ink-600">{doctor.bio}</p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {doctor.focusAreas.map((area) => (
          <li
            key={area}
            className="rounded-pill border border-line bg-mist-100 px-3 py-1.5 text-[0.6875rem] font-medium text-ink-600"
          >
            {area}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <p className="text-meta text-ink-400">
          {doctor.department}
          <span className="block">{doctor.hospital}</span>
        </p>

        <Link
          to="/doctors"
          onClick={() => track({ name: 'doctor_profile_click', doctorId: doctor.id })}
          className="-mx-2 mt-3 inline-flex items-center gap-1.5 px-2 py-2 text-meta font-semibold uppercase tracking-[0.1em] text-accent-600 hover:text-accent-700"
        >
          View profile
          <span
            aria-hidden="true"
            className="transition-transform duration-300 ease-editorial group-hover:translate-x-1"
          >
            →
          </span>
        </Link>

        <StatusChip
          status={doctor.status}
          label="Name, photo & credentials pending"
          className="mt-4"
        />
      </div>
    </article>
  );
}

/** The faculty grid. Takes any number of doctors — add entries in src/data/doctors.ts. */
export function FacultyGrid({ items = doctors, columns = 2 }: { items?: Doctor[]; columns?: 2 | 3 }) {
  const visible = visibleOnly(items);
  if (visible.length === 0) return null;

  return (
    <ul
      className={cn(
        'grid gap-5 sm:gap-6',
        columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2',
      )}
    >
      {visible.map((doctor, i) => (
        <li key={doctor.id} className="h-full">
          <Reveal delay={Math.min(i, 3) * 70} className="h-full">
            <DoctorCard doctor={doctor} />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
