import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';

/**
 * ROUTES (§22).
 *
 * The landing page is bundled eagerly — it is where the WhatsApp link lands and
 * it must paint immediately on a mid-range phone. Every other route is split out
 * and fetched on navigation, so the first load stays small.
 */
const Capabilities = lazy(() => import('@/pages/Capabilities'));
const ShowcasePage = lazy(() => import('@/pages/ShowcasePage'));
const Recordings = lazy(() => import('@/pages/Recordings'));
const RecordingDetail = lazy(() => import('@/pages/RecordingDetail'));
const Doctors = lazy(() => import('@/pages/Doctors'));
const About = lazy(() => import('@/pages/About'));
const EventScreen = lazy(() => import('@/pages/EventScreen'));
const RecordingSpec = lazy(() => import('@/pages/RecordingSpec'));
const NotFound = lazy(() => import('@/pages/NotFound'));

/** Quiet placeholder during a route chunk fetch — no spinner, no layout shift. */
function RouteFallback() {
  return (
    <div className="min-h-[60svh]" role="status" aria-live="polite">
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="capabilities" element={<Capabilities />} />

            {/* One component, three capability routes — see src/pages/ShowcasePage.tsx */}
            <Route path="ecmo" element={<ShowcasePage />} />
            <Route path="interventions" element={<ShowcasePage />} />
            <Route path="lung-transplant" element={<ShowcasePage />} />

            <Route path="recordings" element={<Recordings />} />
            <Route path="recordings/:id" element={<RecordingDetail />} />

            <Route path="doctors" element={<Doctors />} />
            <Route path="about" element={<About />} />

            {/* Internal production pages — the venue-screen creative and the
                two-source recording specification. Both are noindex. */}
            <Route path="event-screen" element={<EventScreen />} />
            <Route path="recording-spec" element={<RecordingSpec />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
