import type { Talk } from '@/data/types';
import { StatusChip } from '@/components/ui/ContentStatus';
import { SpeakerAvatar } from './SpeakerAvatar';

/** Speaker block shown directly beneath the player on a session page (§30). */
export function SpeakerProfile({ talk }: { talk: Talk }) {
  return (
    <div className="flex items-start gap-4 rounded-card border border-line bg-mist-50 p-5 sm:gap-5 sm:p-6">
      <span className="h-16 w-16 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-20">
        <SpeakerAvatar name={talk.speaker} photo={talk.speakerPhoto} size="md" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="eyebrow">Speaker</p>
        <p className="mt-2 text-subhead font-semibold text-ink-900">{talk.speaker}</p>
        <p className="mt-1 text-sm text-ink-600">{talk.designation}</p>
        <p className="text-sm text-ink-500">{talk.institution}</p>
        <StatusChip
          status={talk.status}
          label="Speaker details to be confirmed"
          className="mt-3"
        />
      </div>
    </div>
  );
}
