/**
 * Haptic feedback, as progressive enhancement only.
 *
 * The Vibration API is supported by Chrome, Edge, Opera and Samsung Internet
 * (~77% of browsers) but NOT by Safari or iOS at all — WebKit exposes no
 * public haptics API. So every call here is a no-op on iPhone, and nothing in
 * the UI may depend on the buzz being felt: it confirms an interaction that
 * was already obvious from what moved on screen.
 *
 * Patterns are deliberately short. A long buzz on a marketing site reads as a
 * malfunction rather than as feedback.
 */

type Intensity = "tick" | "select" | "commit";

const PATTERNS: Record<Intensity, number | number[]> = {
  /** Passing a snap point, changing a slide. */
  tick: 8,
  /** Choosing something — a card opening, a tab changing. */
  select: 14,
  /** Completing an action, e.g. a submitted form. */
  commit: [12, 40, 18],
};

let enabled: boolean | null = null;

function supported(): boolean {
  if (enabled === null) {
    enabled =
      typeof navigator !== "undefined" &&
      typeof navigator.vibrate === "function" &&
      // Respect the same preference that governs animation: someone who has
      // asked for less motion has not asked for buzzing either.
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return enabled;
}

export function haptic(intensity: Intensity = "tick"): void {
  if (!supported()) return;
  try {
    navigator.vibrate(PATTERNS[intensity]);
  } catch {
    // Some browsers throw if the page is not visible or the gesture is not
    // user-initiated. Feedback is optional, so failure is silent.
  }
}
