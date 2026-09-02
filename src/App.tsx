import { useState, useCallback, useEffect } from "react";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import ScrollProgress from "./components/ScrollProgress";
import AskButton from "./components/AskButton";
import StickyCta from "./components/StickyCta";
import Footer from "./components/Footer";
import AskStartech from "./components/AskStartech";
import SolutionsIndex from "./components/solutions/SolutionsIndex";
import SolutionPage from "./components/solutions/SolutionPage";
import { useCurrentPage } from "./lib/router";
import { I18nProvider } from "./i18n";
import LanguageHint from "./components/LanguageHint";
import { AI_CHAT_ENABLED } from "./lib/features";

/**
 * Application shell: chrome, the chat panel, and whichever page the current
 * URL resolves to. Route resolution lives in lib/router, page content in
 * pages/ and components/ — this file only composes them.
 */
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
          <SolutionsIndex onAskAi={openChat} />
        )}

        {page.type === "solution-page" && (
          <SolutionPage solution={page.solution} onAskAi={openChat} />
        )}
      </main>

      <Footer />

      <StickyCta onVisibilityChange={setCtaBarUp} />

      {AI_CHAT_ENABLED && (
        <AskButton onClick={toggleChat} hidden={ctaBarUp} />
      )}

      {AI_CHAT_ENABLED && (
        <AskStartech isOpen={chatOpen} onClose={closeChat} />
      )}
    </div>
    </I18nProvider>
  );
}
