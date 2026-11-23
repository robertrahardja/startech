import { useEffect, useState } from "react";

const SEEN_KEY = "startech-splash-seen";
// Long enough for the mark to rise, settle, and take one pass of light
// before the screen lifts away — the three beats defined in index.css
// (.splash-mark 900ms, .splash-sweep 750ms from 260ms, .splash-exit 420ms).
// The hold covers the two entrance beats; the exit overlaps the tail of the
// sweep rather than waiting for it, so the screen is already leaving while
// the light is still finishing. Total ~1.5s.
//
// An earlier version of this screen built its drama from a radial-gradient
// glow, which didn't render on iPhone Safari — a browser this environment
// can't test directly — and was cut. Everything here animates transform and
// opacity only, the two properties that composite reliably everywhere, so
// there is nothing left that can silently fail on an untestable browser.
const HOLD_MS = 1080;
const FADE_MS = 420;

/**
 * A black screen with the full lockup (mark + "StarTech Innovation")
 * centred, fading away to the homepage underneath. Mobile only
 * (sm:hidden — desktop never had a first-load moment this was solving)
 * and only once per browser: a returning visitor has already seen it, so
 * there is nothing left for it to introduce.
 *
 * The logo is the whole point of this screen, so it's sized to fill the
 * width — the same 24px gutter every other section on the page uses
 * (px-6), not a small centred icon. The original startech-logo-full.svg —
 * the same file the Nav, Footer, and Hero business card use — not a copy.
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
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-st-bg px-6 sm:hidden ${
        fading ? "splash-exit" : ""
      }`}
    >
      {/* The sweep is masked to the logo's own shape (see .splash-sweep in
          index.css), so this wrapper needs no clipping of its own. */}
      <div className="splash-mark relative flex w-1/2 items-center justify-center">
        <img
          src="/assets/startech-logo-full.svg"
          alt=""
          className="relative w-full"
        />
        <div aria-hidden="true" className="splash-sweep" />
      </div>
    </div>
  );
}
