import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Landing from '@/pages/Landing';

/**
 * ROUTES
 *
 * The public experience is ONE page. `/` is the entire site — every navigation
 * link is an in-page anchor and a recording opens in a modal, so a visitor is
 * never sent away from the story.
 *
 * The two routes below it are internal production documents, `noindex` and
 * unlinked from the public page: the event-day vertical screen creative and the
 * two-source recording specification. They are deliverables for the production
 * team, not part of the visitor's journey.
 */
const EventScreen = lazy(() => import('@/pages/EventScreen'));
const RecordingSpec = lazy(() => import('@/pages/RecordingSpec'));

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
          <Route path="/" element={<Landing />} />
          <Route path="/event-screen" element={<EventScreen />} />
          <Route path="/recording-spec" element={<RecordingSpec />} />
          {/* Anything else returns to the one page that matters. */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
