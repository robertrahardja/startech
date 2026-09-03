import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import ScrollProgress from "./components/ScrollProgress";
import AskButton from "./components/AskButton";
import StickyCta from "./components/StickyCta";
import Footer from "./components/Footer";
import { useCurrentPage } from "./lib/router";
import { I18nProvider } from "./i18n";
import LanguageHint from "./components/LanguageHint";
import { AI_CHAT_ENABLED } from "./lib/features";

/**
 * Routes and the chat panel load on demand.
 *
 * These were statically imported, so someone landing on the homepage
 * downloaded every solution page and the chat panel before anything could
 * render — most of a 428KB main bundle for code the visit may never reach.
 * The homepage is what nearly every visitor sees first, so it stays in the
 * main chunk; everything else is fetched when its route is actually opened.
 */
const SolutionsIndex = lazy(() => import("./components/solutions/SolutionsIndex"));
const SolutionPage = lazy(() => import("./components/solutions/SolutionPage"));
const AskStartech = lazy(() => import("./components/AskStartech"));

/**
 * Application shell: chrome, the chat panel, and whichever page the current
 * URL resolves to. Route resolution lives in lib/router, page content in
 * pages/ and components/ — this file only composes them.
 */
/** Keeps the page height stable while a route chunk is fetched. */
function RouteFallback() {
  return <div className="min-h-[60vh]" aria-hidden="true" />;
}

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const [ctaBarUp, setCtaBarUp] = useState(false);
  const { page, locale } = useCurrentPage();

  // A deep link like /#products arrives before React has rendered the
  // section, so the browser finds no such element and stays at the top.
  // Re-run the jump once the page exists.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView();
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const toggleChat = useCallback(() => setChatOpen((prev) => !prev), []);
  const openChat = useCallback(() => setChatOpen(true), []);
  const closeChat = useCallback(() => setChatOpen(false), []);

  return (
    <I18nProvider locale={locale}>
    <div className="min-h-screen bg-st-bg text-st-text">
      <ScrollProgress />
      <LanguageHint />
      <Nav onAskAi={openChat} />

      <main>
        {page.type === "home" && <HomePage onAskAi={openChat} />}

        {page.type === "solutions-index" && (
          <Suspense fallback={<RouteFallback />}>
            <SolutionsIndex onAskAi={openChat} />
          </Suspense>
        )}

        {page.type === "solution-page" && (
          <Suspense fallback={<RouteFallback />}>
            <SolutionPage solution={page.solution} onAskAi={openChat} />
          </Suspense>
        )}
      </main>

      <Footer />

      <StickyCta onVisibilityChange={setCtaBarUp} />

      {AI_CHAT_ENABLED && (
        <AskButton onClick={toggleChat} hidden={ctaBarUp} />
      )}

      {AI_CHAT_ENABLED && chatOpen && (
        <Suspense fallback={null}>
          <AskStartech isOpen={chatOpen} onClose={closeChat} />
        </Suspense>
      )}
    </div>
    </I18nProvider>
  );
}
