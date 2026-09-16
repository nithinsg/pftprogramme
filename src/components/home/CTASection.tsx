import { primaryCta, site } from '@/data/site';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

/**
 * The gateway to the video library (§8, §37).
 *
 * This is the single most important click on the site, and it sits AFTER the
 * institutional profile and the three capability showcases — which is the whole
 * point of the brief. The button is large and unmissable, but the tone stays
 * academic: an invitation to keep learning, not an advertisement.
 */
export function CTASection({
  eyebrow = 'Continue the Learning',
  title = 'Revisit the Science. Continue the Conversation.',
  body = `Access the recorded sessions from the ${site.event}.`,
  ctaLabel = primaryCta.label,
  ctaHref = primaryCta.href,
  location = 'cta-section',
  tone = 'navy',
  className,
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
  location?: string;
  tone?: 'navy' | 'mist';
  className?: string;
}) {
  const dark = tone === 'navy';

  return (
    <section
      aria-labelledby="cta-title"
      className={cn(
        'relative overflow-hidden py-section',
        dark ? 'field-navy field-grid on-dark' : 'bg-mist-100',
        className,
      )}
    >
      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className={dark ? 'eyebrow-light' : 'eyebrow'}>{eyebrow}</p>
          </Reveal>

          <Reveal delay={60}>
            <h2
              id="cta-title"
              className={cn('mt-5 text-heading font-semibold', dark && 'text-white')}
            >
              {title}
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className={cn('mx-auto mt-5 max-w-xl text-lede', dark ? 'text-ink-200' : 'text-ink-600')}>
              {body}
            </p>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-10 flex justify-center">
              <Button
                to={ctaHref}
                variant={dark ? 'onDark' : 'primary'}
                size="lg"
                withArrow
                className="w-full sm:w-auto"
                onClick={() => {
                  track({ name: 'view_recorded_talks_click', location });
                  track({ name: 'cta_click', cta: ctaLabel, location, destination: ctaHref });
                }}
              >
                {ctaLabel}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <p className={cn('mt-6 text-meta', dark ? 'text-ink-300/70' : 'text-ink-400')}>
              {site.hospital} <span aria-hidden="true">·</span> {site.centre}{' '}
              <span aria-hidden="true">·</span> {site.department}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
