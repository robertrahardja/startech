// The title and description of every page, and which pages search engines
// should list. The Worker writes them into the HTML it serves, so crawlers
// and link previews (which do not run the app) see the right ones; the app
// sets the same title after a client-side navigation.
//
// English only for now: a translated page is served with its English title
// and description until the Worker learns the other locales.

import { en } from "../i18n/en";
import { SOLUTIONS } from "../components/solutions/solutionsData";
import { SITE_NAME } from "./site";
import type { Page } from "./routes";

const DEFAULT_TITLE = `${SITE_NAME} | Business. Finance. Tech.`;

const DEFAULT_DESCRIPTION =
  "StarTech Innovation is a Singapore software and AI consultancy. We turn operations that run on spreadsheets into systems you own: business systems, AI implementation, finance workflows and cross-border operations.";

// The /solutions heading and lead, as SolutionsIndex shows them.
const SOLUTIONS_TITLE = "Working demos";
const SOLUTIONS_DESCRIPTION =
  "Each demo runs on sample data, so you can see it work before you talk to us. Any of them can become part of a system built around your own business.";

interface PageMeta {
  title: string;
  description: string;
  /** The page's own path without a locale prefix: what canonical names. */
  route: string;
  /** False keeps the page out of search results and the sitemap. */
  indexable: boolean;
}

const titled = (name: string) => `${name} · ${SITE_NAME}`;

export function pageMeta(page: Page): PageMeta {
  switch (page.type) {
    case "home":
      return { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, route: "/", indexable: true };
    case "solutions-index":
      return { title: titled(SOLUTIONS_TITLE), description: SOLUTIONS_DESCRIPTION, route: "/solutions", indexable: true };
    case "solution-page":
      return {
        title: titled(page.solution.title),
        description: page.solution.tagline,
        route: `/solutions/${page.solution.slug}`,
        indexable: true,
      };
    case "flyer":
      return { title: titled(en.flyer.headline), description: en.flyer.who, route: "/flyer", indexable: true };
    case "invoicenow":
      return { title: titled(en.invoicenow.eyebrow), description: en.invoicenow.lead, route: "/invoicenow", indexable: true };
    case "singpass":
      return { title: titled(en.singpass.eyebrow), description: en.singpass.intro, route: "/singpass", indexable: true };
    // Reached only by a link we send to clients, so it stays unlisted.
    case "testimonial":
      return { title: titled(en.testimonial.eyebrow), description: en.testimonial.intro, route: "/testimonial", indexable: false };
  }
}

/** Every route the sitemap lists, before locale prefixes. */
export const INDEXED_ROUTES = [
  "/",
  "/solutions",
  "/flyer",
  "/invoicenow",
  "/singpass",
  ...SOLUTIONS.map((s) => `/solutions/${s.slug}`),
];
