import { useState, useEffect, useMemo } from "react";
import { getSolutionBySlug } from "../components/solutions/solutionsData";
import type { Solution } from "../components/solutions/solutionsData";

/** Which page a pathname resolves to. */
export type Page =
  | { type: "home" }
  | { type: "solutions-index" }
  | { type: "solution-page"; solution: Solution };

const SOLUTION_PATH = /^\/solutions\/([a-z0-9-]+)$/;

/**
 * Resolve a pathname to a page. Pure — no React, no history access — so the
 * routing table is separable from rendering. Internal: the shell consumes
 * useCurrentPage; export this if a test or a second caller ever needs it.
 *
 * An unknown path, including a /solutions/<slug> with no matching solution,
 * falls through to the homepage rather than erroring.
 */
function resolvePage(pathname: string): Page {
  if (pathname === "/solutions") {
    return { type: "solutions-index" };
  }

  const match = pathname.match(SOLUTION_PATH);
  if (match) {
    const solution = getSolutionBySlug(match[1]);
    if (solution) {
      return { type: "solution-page", solution };
    }
  }

  return { type: "home" };
}

/**
 * Current pathname, kept in sync with browser back/forward and with the
 * popstate events the Link component dispatches on navigation.
 */
function usePathname(): string {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return pathname;
}

/** The page for the current URL. */
export function useCurrentPage(): Page {
  const pathname = usePathname();
  return useMemo(() => resolvePage(pathname), [pathname]);
}
