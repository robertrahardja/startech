import { useState, useEffect, useMemo } from "react";
import { getSolutionBySlug } from "../components/solutions/solutionsData";
import type { Solution } from "../components/solutions/solutionsData";
import { parseLocalePath, type Locale } from "../i18n/locales";

/** Which page a pathname resolves to. */
export type Page =
  | { type: "home" }
  | { type: "flyer" }
  | { type: "testimonial" }
  | { type: "invoicenow" }
  | { type: "singpass" }
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

  // The digital flyer: the one page every bio link and campaign points at.
  if (pathname === "/flyer") {
    return { type: "flyer" };
  }

  // Where clients leave a testimonial. Unlisted: reached by a link we send.
  if (pathname === "/testimonial") {
    return { type: "testimonial" };
  }

  // InvoiceNow explainer and the client-side PINT SG invoice demo.
  if (pathname === "/invoicenow") {
    return { type: "invoicenow" };
  }

  // Singpass FAPI 2.0: the deadline, a working demo, and the upgrade offer.
  if (pathname === "/singpass") {
    return { type: "singpass" };
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
  // typeof window check, not a bare reference: this hook's initial value
  // also runs during prerendering (see scripts/prerender.mjs), where there
  // is no window at all. The homepage is the only route prerendered, so
  // "/" is the only value that render ever actually needs.
  const [pathname, setPathname] = useState(
    typeof window === "undefined" ? "/" : window.location.pathname
  );

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
