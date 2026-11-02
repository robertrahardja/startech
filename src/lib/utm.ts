/**
 * Which channel a visit came from.
 *
 * Every bio link and flyer carries ?utm_source=<platform> (see
 * startech_marketing/gtm/playbooks/digital-flyers-and-social.md). The tag is
 * read once on arrival and kept for the session, because the form is several
 * pushState navigations away and the query string is gone by then. The
 * contact form sends it with the lead, and hq files the contact under that
 * source — without this no channel can be measured.
 */

export interface UtmTags {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
}

const KEY = "st_utm";
const EMPTY: UtmTags = { utm_source: "", utm_medium: "", utm_campaign: "" };

function read(): UtmTags {
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<UtmTags>) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

/** Call once at startup. A tagged URL replaces whatever the session had. */
export function captureUtm(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const tags: UtmTags = {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
  };
  if (!tags.utm_source && !tags.utm_medium && !tags.utm_campaign) return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(tags));
  } catch {
    // Private mode or storage blocked: the lead still goes through, untagged.
  }
}

/** The tags for this session, or empty strings when the visit was untagged. */
export function getUtm(): UtmTags {
  if (typeof window === "undefined") return EMPTY;
  return read();
}
