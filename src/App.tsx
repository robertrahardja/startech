import { useState, useCallback } from "react";
import Nav from "./components/Nav";
import HomePage from "./pages/HomePage";
import ScrollProgress from "./components/ScrollProgress";
import AskButton from "./components/AskButton";
import Footer from "./components/Footer";
import AskStartech from "./components/AskStartech";
import SolutionsIndex from "./components/solutions/SolutionsIndex";
import SolutionPage from "./components/solutions/SolutionPage";
import { useCurrentPage } from "./lib/router";

/**
 * Application shell: chrome, the chat panel, and whichever page the current
 * URL resolves to. Route resolution lives in lib/router, page content in
 * pages/ and components/ — this file only composes them.
 */
export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const page = useCurrentPage();

  const toggleChat = useCallback(() => setChatOpen((prev) => !prev), []);
  const openChat = useCallback(() => setChatOpen(true), []);
  const closeChat = useCallback(() => setChatOpen(false), []);

  return (
    <div className="min-h-screen bg-st-bg text-st-text">
      <ScrollProgress />
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

      <AskButton onClick={toggleChat} />

      <AskStartech isOpen={chatOpen} onClose={closeChat} />
    </div>
  );
}
