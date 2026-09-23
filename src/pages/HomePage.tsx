import { lazy, Suspense } from "react";
import Hero from "../components/Hero";
import Qualify from "../components/Qualify";
import CaseStudies from "../components/CaseStudies";
import Products from "../components/Products";
import Industries from "../components/Industries";
import Approach from "../components/Approach";
import Objections from "../components/Objections";
import Contact from "../components/Contact";

/**
 * `motion`-based (the magnetic download button) — libraries no other
 * homepage section needs — so it loads on demand rather than growing the
 * main bundle for every visitor.
 */
const CapabilityDeck = lazy(() => import("../components/CapabilityDeck"));

interface HomePageProps {
  onAskAi: () => void;
}

/**
 * The homepage, ordered as a single sales conversation from open to close.
 *
 *   Hero        open — who we are, in four seconds
 *   Qualify     sift: the four situations we fit, and the ones we do not
 *   CaseStudies 10 #1 — the work itself, with the numbers
 *   Products    10 #1 — what we actually sell
 *   Industries  10 #3 — the company knows this domain
 *   Approach       10 #3 — and has a method, not just enthusiasm
 *   Objections     deflect — the five reasons people hesitate, answered
 *   CapabilityDeck take-away — everything above, as a document to forward
 *   Contact        close — book the call
 *
 * The order is the argument: nothing is presented before the visitor has had
 * a chance to rule themselves out, and the close comes only after the
 * objections have been named rather than dodged. CapabilityDeck sits just
 * before Contact: the moment a visitor is convinced enough to act but not
 * yet ready to fill in a form is exactly when "take this away and share it"
 * is the more useful next step.
 *
 * Showcase (the thirteen-demo "try it yourself" grid) is built but not
 * wired in here — it isn't ready to show visitors yet. See Showcase.tsx.
 */
export default function HomePage({ onAskAi }: HomePageProps) {
  return (
    <>
      <Hero onAskAi={onAskAi} />
      <Qualify />
      <CaseStudies />
      <Products />
      <Industries />
      <Approach />
      <Objections />
      <Suspense fallback={<div className="min-h-[20vh]" aria-hidden="true" />}>
        <CapabilityDeck />
      </Suspense>
      <Contact />
    </>
  );
}
