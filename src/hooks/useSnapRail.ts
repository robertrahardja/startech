import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { haptic } from "../lib/haptics";

/**
 * Tracks which item is centred in a CSS scroll-snap rail.
 *
 * The rail itself scrolls natively — this only observes it, so the gesture
 * stays on the compositor and no listener sits in the way of the finger.
 * A short haptic fires as each new item settles, which on Android makes the
 * snap feel physical; on iOS it is silently absent.
 */
export function useSnapRail(count: number) {
  const railRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const lastActive = useRef(0);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || count === 0) return;

    // IntersectionObserver against the rail's own box: whichever child is
    // most visible within it is the one centred by the snap.
    const observer = new IntersectionObserver(
      (entries) => {
        let best: { index: number; ratio: number } | null = null;

        for (const entry of entries) {
          const index = Number(
            (entry.target as HTMLElement).dataset.snapIndex ?? -1
          );
          if (index < 0) continue;
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { index, ratio: entry.intersectionRatio };
          }
        }

        if (best && best.ratio > 0.6 && best.index !== lastActive.current) {
          lastActive.current = best.index;
          setActive(best.index);
          haptic("tick");
        }
      },
      { root: rail, threshold: [0.3, 0.6, 0.9] }
    );

    for (const child of Array.from(rail.children)) {
      observer.observe(child);
    }

    return () => observer.disconnect();
  }, [count]);

  /** Scroll a given item to centre — used by the dots. */
  const goTo = useCallback((index: number) => {
    const rail = railRef.current;
    const child = rail?.children[index] as HTMLElement | undefined;
    if (!rail || !child) return;

    haptic("select");
    rail.scrollTo({
      left: child.offsetLeft - (rail.clientWidth - child.clientWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  return { railRef, active, goTo };
}

/**
 * Distinguishes a tap from a drag on a swipeable card.
 *
 * Two subtleties make the obvious approaches fail. Pointer coordinates alone
 * are not enough — while a snap rail scrolls, the card travels with the
 * finger, so the pointer barely moves relative to it. And comparing the
 * rail's scrollLeft at pointerdown vs pointerup misses too, because the snap
 * animation continues after the finger lifts.
 *
 * So watch for movement *during* the gesture: any pointermove past the slop
 * threshold, or any scroll event on the rail, marks it a drag for good.
 */
export function useTapGuard(
  onTap: () => void,
  railRef?: React.RefObject<HTMLElement | null>
) {
  const origin = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);

  const onPointerDown = useCallback(
    (e: ReactPointerEvent) => {
      origin.current = { x: e.clientX, y: e.clientY };
      dragged.current = false;

      const rail = railRef?.current;
      if (!rail) return;

      const markDragged = () => {
        dragged.current = true;
      };
      rail.addEventListener("scroll", markDragged, {
        once: true,
        passive: true,
      });
      // Stop listening shortly after the gesture could plausibly end, so a
      // later idle scroll cannot poison the next tap.
      window.setTimeout(
        () => rail.removeEventListener("scroll", markDragged),
        700
      );
    },
    [railRef]
  );

  const onPointerMove = useCallback((e: ReactPointerEvent) => {
    const from = origin.current;
    if (!from || dragged.current) return;
    if (
      Math.abs(e.clientX - from.x) > 8 ||
      Math.abs(e.clientY - from.y) > 8
    ) {
      dragged.current = true;
    }
  }, []);

  const onPointerUp = useCallback(() => {
    const wasTap = origin.current !== null && !dragged.current;
    origin.current = null;
    if (wasTap) onTap();
  }, [onTap]);

  const onPointerCancel = useCallback(() => {
    origin.current = null;
    dragged.current = false;
  }, []);

  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel };
}
