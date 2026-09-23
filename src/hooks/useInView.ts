import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to detect when an element enters the viewport.
 * Uses IntersectionObserver with a fallback: if the observer never fires
 * within 3 seconds, we default to visible (safety net for SSR, screenshots, etc.).
 *
 * The effect deliberately depends on the *contents* of `options`, never the
 * object itself. Every call site passes a literal — `useInView({ threshold:
 * 0.1 })` — which is a fresh identity on each render, so depending on the
 * object made the dependency check fail every time: each render tore down
 * the observer and built a new one, re-`observe`d the element and armed
 * another 3s timer. With ~20 call sites, several inside lists, that turned
 * every scroll-driven re-render into a burst of observer churn and was the
 * main source of scroll jank. Reading the primitives out keeps the effect
 * stable across renders.
 */
export function useInView(
  options: IntersectionObserverInit = { threshold: 0.1 }
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  const { threshold, root, rootMargin } = options;
  // A threshold array would still be a new identity per render; join it to a
  // primitive so the dependency stays stable for that case too.
  const thresholdKey = Array.isArray(threshold) ? threshold.join(",") : threshold;

  // Read inside the effect rather than depending on it: `thresholdKey` below
  // already changes whenever the value does, and holding the live value in a
  // ref keeps the object out of the dependency array.
  const thresholdRef = useRef(threshold);
  thresholdRef.current = threshold;

  useEffect(() => {
    // Once seen, the element stays revealed — nothing left to watch, and
    // re-running would re-arm an observer we only ever wanted to fire once.
    if (isInView) return;

    const element = ref.current;
    if (!element) return;

    // Safety: if IntersectionObserver doesn't fire within 3s, show anyway
    const fallbackTimer = setTimeout(() => {
      setIsInView(true);
    }, 3000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          clearTimeout(fallbackTimer);
          observer.unobserve(element);
        }
      },
      { threshold: thresholdRef.current, root, rootMargin }
    );

    observer.observe(element);

    return () => {
      clearTimeout(fallbackTimer);
      observer.unobserve(element);
    };
  }, [isInView, thresholdKey, root, rootMargin]);

  return [ref, isInView];
}
