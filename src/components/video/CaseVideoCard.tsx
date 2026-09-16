import { ShieldCheck } from 'lucide-react';
import type { CaseVideo } from '@/data/types';
import { track } from '@/lib/analytics';
import { config } from '@/lib/config';
import { StatusChip } from '@/components/ui/ContentStatus';
import { VideoPlayer } from './VideoPlayer';

/**
 * A case / procedure film on a showcase page.
 *
 * CONSENT GATE: the player is only handed a source once consent is recorded AND
 * the item is approved. Anything else renders an explanation instead. This is a
 * deliberate belt-and-braces check — the data file says a film needs consent,
 * and this component refuses to play it until the data says consent exists.
 */
export function CaseVideoCard({ item }: { item: CaseVideo }) {
  const cleared = item.consent === 'on-file' && item.status === 'approved';
  const blockedReason = cleared
    ? undefined
    : item.consent !== 'on-file'
      ? 'Patient consent and institutional approval must be recorded before this film can be published. Set consent to "on-file" in src/data/showcases.ts once documentation is held.'
      : 'This film is drafted but has not been approved for publication yet.';

  return (
    <article className="flex flex-col">
      <VideoPlayer
        source={item.video}
        title={item.title}
        analyticsId={item.id}
        analyticsTitle={item.title}
        blockedReason={blockedReason}
        poster={<CasePoster item={item} />}
        onActivate={() =>
          track({ name: 'video_open', talkId: item.id, title: item.title, category: 'case' })
        }
      />

      <div className="pt-5">
        <h3 className="text-subhead font-semibold leading-snug text-ink-900">{item.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-600">{item.summary}</p>

        <p className="mt-4 text-meta text-ink-500">{item.attribution}</p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <StatusChip status={item.status} />
          {config.showPlaceholders && (
            <span className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-mist-100 px-2.5 py-1 text-[0.6875rem] font-medium text-ink-600">
              <ShieldCheck className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
              Consent: {item.consent === 'on-file' ? 'on file' : 'required'}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function CasePoster({ item }: { item: CaseVideo }) {
  return (
    <div className="field-navy field-grid relative flex h-full w-full flex-col justify-between p-5 sm:p-6">
      <span aria-hidden="true" className="h-px w-8 bg-accent-400" />
      <div>
        <p className="line-clamp-2 text-base font-semibold leading-snug text-white sm:text-lg">
          {item.title}
        </p>
        <p className="mt-2 text-meta text-ink-300">{item.duration}</p>
      </div>
    </div>
  );
}
