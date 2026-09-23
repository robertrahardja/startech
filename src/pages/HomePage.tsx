import { lazy, Suspense, useEffect, useRef, useState } from "react";
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

/**
 * Mounts `children` only once the sentinel is near the viewport — not on
 * first render. React.lazy() only keeps a component's code out of the main
 * bundle; it still fetches that code the instant the component is actually
 * rendered, Suspense or not. CapabilityDeck sat unconditionally in the JSX
 * below, so every visitor downloaded it (and the motion/react it pulls in)
 * immediately after the main bundle, whether or not they ever scrolled
 * eight sections down to see it — an extra ~130KB blocking chunk for
 * something most of the page's weight was supposed to avoid.
 *
 * Deliberately not useInView: that hook has a 3s fallback that forces
 * isInView true regardless of actual visibility, which is right for a
 * reveal animation (content must not stay invisible forever if the
 * observer fails) but wrong here — it would make this gate expire for
 * nearly every visitor before they'd scrolled anywhere near it, which
 * defeats the entire point of deferring the fetch.
 */
function DeferredMount({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || shouldMount) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      // Starts the fetch a little before the section is actually on
      // screen, so scrolling to it doesn't show a bare loading gap.
      { rootMargin: "400px 0px" }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [shouldMount]);

  // The id lives on this sentinel, not on anything inside `children` — the
  // hero's "Download the deck" link points at #capability-deck, and that
  // target has to exist before the real section does, or scrolling to it
  // finds nothing, never triggers the observer, and the anchor link goes
  // nowhere.
  return (
    <div id={id} ref={ref}>
      {shouldMount ? children : null}
    </div>
  );
}

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
      <DeferredMount id="capability-deck">
        <Suspense fallback={<div className="min-h-[20vh]" aria-hidden="true" />}>
          <CapabilityDeck />
        </Suspense>
      </DeferredMount>
      <Contact />
    </>
  );
}
