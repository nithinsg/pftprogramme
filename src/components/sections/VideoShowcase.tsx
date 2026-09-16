import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { showcaseVideos } from '@/data/showcaseVideos';
import type { ShowcaseVideo } from '@/data/types';
import { isPlayable } from '@/data/types';
import { track } from '@/lib/analytics';
import { Section } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';
import { StatusChip, ApprovalNote, isVisible } from '@/components/ui/ContentStatus';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import { ShowcaseThumbnail } from '@/components/video/SessionThumbnail';

/**
 * A short, curated set of official Yashoda videos.
 *
 * Its job is to show the depth of expertise at Somajiguda — not to compete with
 * the workshop recordings below it. Four cards maximum, and each expands in
 * place rather than opening a modal, which keeps the recorded sessions the only
 * thing on the page that gets a full player.
 *
 * ⚠️ Nothing here embeds a guessed video. If the official id is missing, the
 * player says so rather than substituting another upload.
 */
export function VideoShowcase() {
  const [openId, setOpenId] = useState<string | null>(null);
  const items = showcaseVideos.filter((v) => isVisible(v.status));

  if (items.length === 0) return null;

  return (
    <Section
      id="videos"
      tone="mist"
      index="06"
      eyebrow="Explore Pulmonary Expertise"
      title="From the Yashoda pulmonology library."
      lede="A short selection of official Yashoda Hospitals videos on the procedures and pathways behind the workshop."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <li key={item.id} className="h-full">
            <Reveal delay={Math.min(i, 3) * 70} className="h-full">
              <ShowcaseCard
                item={item}
                open={openId === item.id}
                onOpen={() => {
                  setOpenId(item.id);
                  track({
                    name: 'showcase_video_open',
                    videoId: item.id,
                    title: item.title,
                    category: item.category,
                  });
                }}
              />
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <ApprovalNote>
          <strong className="font-semibold">For the content team:</strong> these cards name the
          official Yashoda videos but carry no video IDs — this build could not reach
          yashodahospitals.com or YouTube to resolve them, and no ID has been guessed. Paste each
          official id into <code>src/data/showcaseVideos.ts</code> and set its{' '}
          <code>status</code> to <code>verified</code>. Use only official Yashoda uploads.
        </ApprovalNote>
      </div>
    </Section>
  );
}

function ShowcaseCard({
  item,
  open,
  onOpen,
}: {
  item: ShowcaseVideo;
  open: boolean;
  onOpen: () => void;
}) {
  const playable = isPlayable(item.video);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-white transition-all duration-400 ease-editorial hover:border-ink-200 hover:shadow-card">
      {open ? (
        <VideoPlayer
          source={item.video}
          title={item.title}
          analyticsId={item.id}
          autoStart
          poster={<ShowcaseThumbnail item={item} />}
        />
      ) : (
        <button
          type="button"
          onClick={onOpen}
          className="relative block w-full text-left"
          aria-label={`Play video: ${item.title}, ${item.doctor}`}
        >
          <ShowcaseThumbnail item={item} />
        </button>
      )}

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-accent-600">
          {item.category}
        </p>
        <h3 className="mt-2 text-[0.9375rem] font-semibold leading-snug text-ink-900">
          {item.title}
        </h3>
        <p className="mt-2 text-meta font-medium text-ink-700">{item.doctor}</p>
        <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-600">{item.description}</p>

        <div className="mt-auto pt-4">
          {item.sourceUrl ? (
            <a
              href={item.sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="-my-2 inline-flex items-center gap-1.5 py-2 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-ink-500 transition-colors hover:text-ink-900"
            >
              Official page
              <ExternalLink className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
            </a>
          ) : null}
          <StatusChip
            status={item.status}
            label={playable ? 'Awaiting approval' : 'Official video ID required'}
            className="mt-2"
          />
        </div>
      </div>
    </article>
  );
}
