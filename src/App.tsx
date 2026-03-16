import { useState, useCallback } from "react";
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

export default function App() {
  const [chatOpen, setChatOpen] = useState(false);

  const toggleChat = useCallback(() => {
    setChatOpen((prev) => !prev);
  }, []);

  const openChat = useCallback(() => {
    setChatOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-st-bg text-st-text">
      <Nav onAskAi={openChat} />

      <main>
        <Hero onAskAi={openChat} />
        <Products />
        <AiCapabilities />
        <Industries />
        <Approach />
        <Contact />
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
