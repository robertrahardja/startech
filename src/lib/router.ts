import { useState, useEffect, useMemo } from "react";
import { parseLocalePath, type Locale } from "../i18n/locales";
import { resolvePage, type Page } from "./routes";

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
