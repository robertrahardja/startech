import { useState, useCallback, useEffect, useMemo } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Products from "./components/Products";
import AiCapabilities from "./components/AiCapabilities";
import Industries from "./components/Industries";
import Approach from "./components/Approach";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AskStartech from "./components/AskStartech";
import AiIcon from "./components/AiIcon";
import SolutionsIndex from "./components/solutions/SolutionsIndex";
import SolutionPage from "./components/solutions/SolutionPage";
import { getSolutionBySlug } from "./components/solutions/solutionsData";

/**
 * Simple pathname-based router.
 * Listens to popstate events (dispatched by Link component and browser back/forward).
 */
function usePathname(): string {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return pathname;
}

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);
  const pathname = usePathname();

  const toggleChat = useCallback(() => {
    setChatOpen((prev) => !prev);
  }, []);

  const openChat = useCallback(() => {
    setChatOpen(true);
  }, []);

  // Determine which page to render
  const page = useMemo(() => {
    if (pathname === "/solutions") {
      return { type: "solutions-index" as const };
    }

    const solutionMatch = pathname.match(/^\/solutions\/([a-z0-9-]+)$/);
    if (solutionMatch) {
      const solution = getSolutionBySlug(solutionMatch[1]);
      if (solution) {
        return { type: "solution-page" as const, solution };
      }
    }

    return { type: "home" as const };
  }, [pathname]);

  return (
    <div className="min-h-screen bg-st-bg text-st-text">
      <Nav onAskAi={openChat} />

      <main>
        {page.type === "home" && (
          <>
            <Hero onAskAi={openChat} />
            <Products />
            <AiCapabilities />
            <Industries />
            <Approach />
            <Contact />
          </>
        )}

        {page.type === "solutions-index" && (
          <SolutionsIndex onAskAi={openChat} />
        )}

        {page.type === "solution-page" && (
          <SolutionPage solution={page.solution} onAskAi={openChat} />
        )}
      </main>

      <Footer />

      {/* Floating AI button */}
      <button
        onClick={toggleChat}
        aria-label="Ask StarTech AI"
        className="star-whirl hero-btn-primary fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center !rounded-full text-st-gold-light/60 transition-colors duration-500 hover:text-st-gold-light"
      >
        <AiIcon className="h-4 w-4" />
      </button>

      <AskStartech isOpen={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
