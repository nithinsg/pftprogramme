import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/cn';
import { event, site } from '@/data/site';

/** Masthead for the two internal production pages. */
export function PageHeader({
  eyebrow,
  title,
  lede,
  back,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  back?: { to: string; label: string };
  className?: string;
}) {
  return (
    <header
      className={cn(
        'field-navy field-grid on-dark relative overflow-hidden pb-section-sm pt-12 sm:pt-16',
        className,
      )}
    >
      <div className="container-x relative">
        {back && (
          <Link
            to={back.to}
            className="-my-2 mb-6 inline-flex items-center gap-1.5 py-2 text-meta font-medium text-ink-300 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            {back.label}
          </Link>
        )}

        <p className="flex items-center gap-3 text-eyebrow font-semibold uppercase tracking-[0.2em] text-accent-300">
          <span aria-hidden="true" className="h-px w-8 bg-accent-400" />
          {eyebrow}
        </p>

        <h1 className="mt-6 max-w-4xl text-display font-semibold text-white">{title}</h1>
        {lede && <p className="mt-6 max-w-2xl text-lede text-ink-200">{lede}</p>}

        <p className="mt-10 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white/35">
          {site.hospital} <span aria-hidden="true">·</span> {site.centre}{' '}
          <span aria-hidden="true">·</span> {event.name}
        </p>
      </div>
    </header>
  );
}
