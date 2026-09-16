import { event, footerLinks, site } from '@/data/site';
import { config } from '@/lib/config';
import { Logo } from './Logo';

/** Minimal footer. External links render only once an official URL is supplied. */
export function Footer() {
  const links = footerLinks.filter((l) => l.href);

  return (
    <footer className="field-navy on-dark border-t border-white/10 pb-24 pt-section-sm lg:pb-14">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0 max-w-md">
            <Logo tone="light" />

            <p className="mt-6 text-sm leading-relaxed text-ink-200">
              {site.department}
              <span className="block text-ink-300">
                {site.hospital}, {site.centre}, {site.city}
              </span>
            </p>

            <p className="mt-6 max-w-sm text-meta leading-relaxed text-ink-300/80">
              Recorded sessions from the {event.name}, {event.date}. Intended for healthcare
              professionals.
            </p>
          </div>

          <nav aria-label="Footer" className="lg:min-w-[13rem]">
            <h2 className="eyebrow-light">Yashoda Hospitals</h2>
            {links.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="-my-2 inline-block py-2 text-sm text-ink-200 transition-colors duration-250 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              config.showPlaceholders && (
                <p className="mt-5 max-w-[16rem] rounded-md border border-dashed border-white/25 px-3 py-2 text-[0.6875rem] leading-relaxed text-ink-300">
                  Link slot — add the official Yashoda Hospitals, Pulmonology and doctor-profile
                  URLs in <code className="text-accent-300">src/data/site.ts</code>. No URL is
                  invented here.
                </p>
              )
            )}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[0.6875rem] text-ink-300/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.hospital}, {site.centre}. {site.department}.
          </p>
          <p>
            {event.name} <span aria-hidden="true">·</span> {event.date}
          </p>
        </div>
      </div>
    </footer>
  );
}
