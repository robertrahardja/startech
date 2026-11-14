// The routing table, kept free of React and of the browser so the Worker can
// import it too.
import { getSolutionBySlug } from "../components/solutions/solutionsData";
import type { Solution } from "../components/solutions/solutionsData";

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
 * same routing table serves the client (lib/router's useCurrentPage) and the
 * Worker, which writes each page's title and description into the HTML it
 * serves (worker/locale-markup.ts).
 *
 * An unknown path, including a /solutions/<slug> with no matching solution,
 * falls through to the homepage rather than erroring.
 */
export function resolvePage(pathname: string): Page {
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
