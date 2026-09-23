import { useEffect, useState } from "react";

const SEEN_KEY = "startech-splash-seen";
// Long enough to hold past the shine sweep baked into
// startech-logo-splash.svg (0.5s begin + 1.3s duration) before the
// fade-out starts — the shine finishing mid-fade would read as cut off
// rather than complete.
const HOLD_MS = 2000;
const FADE_MS = 900;

/**
 * A black screen with the full lockup (mark + "StarTech Innovation")
 * centred, fading away to the homepage underneath. Mobile only
 * (sm:hidden — desktop never had a first-load moment this was solving)
 * and only once per browser: a returning visitor has already seen it, so
 * there is nothing left for it to introduce.
 *
 * The logo is the whole point of this screen, so it's sized to fill the
 * width — the same 24px gutter every other section on the page uses
 * (px-6), not a small centred icon.
 *
 * startech-logo-splash.svg is a dedicated copy of startech-logo-full.svg
 * (the same file the Nav, Footer, and Hero business card use), not the
 * shared asset itself — it carries a self-playing shine baked in as a
 * native SVG animateTransform, clipped to the logo's own paths via
 * clipPath so light only ever sweeps across the real mark and wordmark,
 * never a bounding box. Baking that into the shared file would have made
 * every logo on the site shine on every page load; this copy exists so
 * only the splash does.
 *
 * Renders on top of the real page from the first frame rather than
 * blocking on anything — the homepage underneath is already there,
 * this is purely a held reveal.
 */
export default function SplashScreen() {
  const [seen, setSeen] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(SEEN_KEY)) return;
    } catch {
      // Private browsing can throw on access; show it once and move on —
      // it just won't remember across a visit it couldn't write to.
    }

    setSeen(false);

    const holdTimer = setTimeout(() => setFading(true), HOLD_MS);
    const removeTimer = setTimeout(() => {
      setSeen(true);
      try {
        localStorage.setItem(SEEN_KEY, "1");
      } catch {
        // Nothing to do — it shows again next visit, which is a mild
        // repeat, not a broken page.
      }
    }, HOLD_MS + FADE_MS);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (seen) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-st-bg px-6 transition-opacity duration-[900ms] ease-out sm:hidden ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <img
        src="/assets/startech-logo-splash.svg"
        alt=""
        className="w-1/2"
      />
    </div>
  );
}
