import { useState, useEffect, useMemo } from "react";
import { getSolutionBySlug } from "../components/solutions/solutionsData";
import type { Solution } from "../components/solutions/solutionsData";
import { parseLocalePath, type Locale } from "../i18n/locales";

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

/**
 * The page and language for the current URL.
 *
 * The locale prefix is stripped before the route is resolved, so every route
 * exists once and is simply rendered in whichever language the prefix names.
 */
export function useCurrentPage(): { page: Page; locale: Locale } {
  const pathname = usePathname();

  return useMemo(() => {
    const { locale, path } = parseLocalePath(pathname);
    return { page: resolvePage(path), locale };
  }, [pathname]);
}
