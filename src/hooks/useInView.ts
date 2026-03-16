import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to detect when an element enters the viewport.
 * Uses IntersectionObserver with a fallback: if the observer never fires
 * within 3 seconds, we default to visible (safety net for SSR, screenshots, etc.).
 */
export function useInView(
  options: IntersectionObserverInit = { threshold: 0.1 }
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Safety: if IntersectionObserver doesn't fire within 3s, show anyway
    const fallbackTimer = setTimeout(() => {
      setIsInView(true);
    }, 3000);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        clearTimeout(fallbackTimer);
        observer.unobserve(element);
      }
    }, options);

    observer.observe(element);

    return () => {
      clearTimeout(fallbackTimer);
      observer.unobserve(element);
    };
  }, [options]);

  return [ref, isInView];
}
