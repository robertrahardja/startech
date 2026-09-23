import { useEffect, useState } from "react";

const SEEN_KEY = "startech-splash-seen";
// Long enough to hold past the glow pulse (see .splash-glow in index.css:
// 300ms delay + 3.3s duration) before the fade-out starts.
const HOLD_MS = 3800;
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
 * (px-6), not a small centred icon. The original startech-logo-full.svg —
 * the same file the Nav, Footer, and Hero business card use — not a copy:
 * an earlier version tried animating a shine inside a dedicated duplicate
 * of the file, clipped to the logo's own paths, which turned out fragile
 * (SVG gradients defined relative to a moving element don't sweep the way
 * a transform suggests, and it read as a glitch rather than light). A
 * plain radial glow starting behind the logo — see .splash-glow below —
 * gets the same "catching light, once" feeling without touching the
 * logo's own file at all, and it's sized to the viewport (not the logo's
 * own wrapper) so it can bloom out to cover the whole screen and clear,
 * rather than staying a small halo around the mark.
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
      <div aria-hidden="true" className="splash-glow" />
      <div className="relative flex w-1/2 items-center justify-center">
        <img
          src="/assets/startech-logo-full.svg"
          alt=""
          className="relative w-full"
        />
      </div>
    </div>
  );
}
