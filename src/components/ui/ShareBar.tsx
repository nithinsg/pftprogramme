import { Check, Link2, MessageCircle } from 'lucide-react';
import { absoluteUrl, config } from '@/lib/config';
import { track } from '@/lib/analytics';
import { whatsappShareUrl } from '@/lib/seo';
import { useCopyToClipboard } from '@/lib/hooks';
import { cn } from '@/lib/cn';

/**
 * Sharing (§31, §32).
 *
 * The post-event link travels by WhatsApp, so sharing onward should too. The
 * share always points at the branded landing page — never at a raw video URL —
 * which is the behaviour the brief calls a core requirement.
 */
export function ShareBar({
  path = '/',
  heading = 'Share with a colleague',
  body = 'The link opens the workshop page, with the recordings one tap away.',
  className,
}: {
  path?: string;
  heading?: string;
  body?: string;
  className?: string;
}) {
  const [copied, copy] = useCopyToClipboard();
  // Always share the landing page, whatever page the visitor is on.
  const shareTarget = config.siteUrl ? absoluteUrl('/') : window.location.origin;

  return (
    <div
      className={cn(
        'flex flex-col gap-5 rounded-card border border-line bg-mist-100 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7',
        className,
      )}
    >
      <div>
        <h2 className="text-base font-semibold text-ink-900">{heading}</h2>
        <p className="mt-1.5 max-w-md text-sm leading-relaxed text-ink-600">{body}</p>
      </div>

      <div className="flex shrink-0 gap-2">
        <a
          href={whatsappShareUrl('/')}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => track({ name: 'share_click', channel: 'whatsapp', path })}
          className="inline-flex h-11 items-center gap-2 rounded-pill bg-ink-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-ink-800"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          WhatsApp
        </a>

        <button
          type="button"
          onClick={() => {
            copy(shareTarget);
            track({ name: 'share_click', channel: 'copy-link', path });
          }}
          className="inline-flex h-11 items-center gap-2 rounded-pill border border-line bg-white px-5 text-sm font-semibold text-ink-800 transition-colors hover:border-ink-300 hover:bg-mist-50"
        >
          {copied ? (
            <Check className="h-4 w-4 text-accent-600" strokeWidth={2.25} aria-hidden="true" />
          ) : (
            <Link2 className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          )}
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>
    </div>
  );
}
