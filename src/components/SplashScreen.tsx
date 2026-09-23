import { useEffect, useState } from "react";

const SEEN_KEY = "startech-splash-seen";
const HOLD_MS = 600;
const FADE_MS = 500;

/**
 * A black screen with the mark centred, fading away to the homepage
 * underneath. Mobile only (sm:hidden — desktop never had a first-load
 * moment this was solving) and only once per browser: a returning visitor
 * has already seen it, so there is nothing left for it to introduce.
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
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-st-bg transition-opacity duration-500 ease-out sm:hidden ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <img
        src="/assets/startech-mark.svg"
        alt=""
        className="h-14 w-14"
      />
    </div>
  );
}
