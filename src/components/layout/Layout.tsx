import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { track } from '@/lib/analytics';
import { usePrefersReducedMotion } from '@/lib/hooks';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { StickyCta } from './StickyCta';

/**
 * App shell: header, routed content, footer, mobile sticky CTA.
 * Also owns scroll restoration and the page_view analytics event.
 */
export function Layout() {
  const { pathname, hash } = useLocation();
  const reducedMotion = usePrefersReducedMotion();
  const isHome = pathname === '/';

  // Scroll to top on navigation — but honour in-page anchors, and never
  // animate for visitors who have asked for reduced motion.
  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  }, [pathname, hash, reducedMotion]);

  // One page_view per route change. No identifiers, no query strings.
  useEffect(() => {
    track({ name: 'page_view', path: pathname, title: document.title });
  }, [pathname]);

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navbar transparentOnTop={isHome} />

      <main id="main" className={isHome ? '' : 'pt-[var(--nav-h)]'}>
        <Outlet />
      </main>

      <Footer />
      <StickyCta />
    </>
  );
}
