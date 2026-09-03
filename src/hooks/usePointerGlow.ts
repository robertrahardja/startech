import { useCallback } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

/**
 * Feeds the cursor's position into --mx / --my on the element under it, so a
 * radial highlight in CSS can follow the pointer across a button.
 *
 * Returns a bare onPointerMove; the visual is entirely CSS, and the whole
 * effect is wrapped in @media (hover: hover) there, so on a touch device this
 * writes two custom properties nothing reads.
 */
export function usePointerGlow() {
  return useCallback((e: ReactPointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);
}
