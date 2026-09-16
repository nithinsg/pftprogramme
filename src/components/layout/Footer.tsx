import { Link } from 'react-router-dom';
import { footerNav, site } from '@/data/site';
import { config } from '@/lib/config';
import { Logo } from './Logo';

/** Site footer (§24). Contact rows appear only when officially supplied. */
export function Footer() {
  const { website, phone, email, address } = site.contact;
  const hasContact = Boolean(website || phone || email);

  return (
    <footer className="field-navy on-dark border-t border-white/10 pb-[calc(var(--sticky-cta-h)+1.5rem)] pt-section-sm lg:pb-14">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div className="min-w-0 max-w-md">
            <Logo tone="light" />

            <p className="mt-6 text-sm leading-relaxed text-ink-200">
              {site.department}
              <span className="block text-ink-300">
                {site.hospital}, {site.centre}
              </span>
              <span className="block text-ink-300">{address}</span>
            </p>

            <p className="mt-6 max-w-sm text-meta leading-relaxed text-ink-300/80">
              This page hosts the recorded sessions from the {site.event} and an overview of the
              advanced pulmonary services at {site.centre}. It is intended for healthcare
              professionals.
            </p>

            {hasContact ? (
              <ul className="mt-6 space-y-1 text-sm text-ink-200">
                {website && (
                  <li>
                    <a className="hover:text-white" href={website} target="_blank" rel="noreferrer noopener">
                      {website.replace(/^https?:\/\//, '')}
                    </a>
                  </li>
                )}
                {phone && (
                  <li>
                    <a className="hover:text-white" href={`tel:${phone.replace(/\s/g, '')}`}>
                      {phone}
                    </a>
                  </li>
                )}
                {email && (
                  <li>
                    <a className="hover:text-white" href={`mailto:${email}`}>
                      {email}
                    </a>
                  </li>
                )}
              </ul>
            ) : (
              config.showPlaceholders && (
                <p className="mt-6 rounded-md border border-dashed border-white/25 px-3 py-2 text-[0.6875rem] leading-relaxed text-ink-300">
                  Contact slot — add the official hospital website, phone and email in
                  <code className="mx-1 text-accent-300">src/data/site.ts</code>. Nothing is invented
                  here.
                </p>
              )
            )}
          </div>

          <nav aria-label="Footer" className="lg:min-w-[14rem]">
            <h2 className="eyebrow-light">Explore</h2>
            <ul className="mt-5 space-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="-my-2 inline-block py-2 text-sm text-ink-200 transition-colors duration-250 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[0.6875rem] text-ink-300/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.hospital}, {site.centre}. {site.department}.
          </p>
          <p>
            {site.event} <span aria-hidden="true">·</span> For healthcare professionals
          </p>
        </div>
      </div>
    </footer>
  );
}
