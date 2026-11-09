/**
 * Where a /c/ request's file lives in the CONCEPTS bucket (worker/concepts.ts).
 * Pure: no I/O, so every path rule is tested on its own. The pointer that
 * says which version is current is read in worker/concept-pointer.ts.
 *
 * Each concept version is uploaded once and never changed:
 *   c/<token>/v<n>/compare/index.html   the comparison page, with today-*.webp
 *   c/<token>/v<n>/site/...             the concept website
 *   c/<token>/current.json              {"version": n, "pulled": false}
 *
 * The comparison page uses relative paths ("site/" for the concept iframe,
 * "today-phone.webp" for its screenshots), so every base address maps the
 * same way: /c/<token>/ is the current version and /c/<token>/v<n>/ a frozen
 * one, hq's "Open as sent". Under a base, "" is compare/index.html, site/...
 * is the concept website and any other file is compare/<file>.
 */

export const CONCEPT_PREFIX = "/c/";

/** hq's tokens are 22 URL-safe characters (secrets.token_urlsafe(16)); anything else is never looked up. */
const CONCEPT_TOKEN = "[A-Za-z0-9_-]{22,128}";
const CONCEPT_PATH = new RegExp(`^/c/(${CONCEPT_TOKEN})(?:/v([1-9][0-9]{0,5}))?(/.*)?$`);

/** No "..", no backslash, no percent-escapes: nothing can step outside the token's own files. */
const SAFE_REST = /^[A-Za-z0-9._/-]*$/;

export type ConceptRequest =
  /** A file under a base: `version` null means the current one. `rest` has no leading slash. */
  | { kind: "file"; token: string; version: number | null; rest: string }
  /** The view beacon, POST /c/<token>/view, only on the unversioned base. */
  | { kind: "view"; token: string }
  /** A directory without its slash: relative paths would resolve one level too high. */
  | { kind: "redirect"; to: string }
  | { kind: "invalid" };

function isUnsafe(rest: string): boolean {
  return !SAFE_REST.test(rest) || rest.includes("..") || rest.includes("//");
}

export function parseConceptPath(pathname: string): ConceptRequest {
  const match = pathname.match(CONCEPT_PATH);
  if (!match) return { kind: "invalid" };
  const [, token, version, rest] = match;
  if (rest === "/view" && !version) return { kind: "view", token };
  if (rest === undefined) return { kind: "redirect", to: `${pathname}/` };
  if (isUnsafe(rest)) return { kind: "invalid" };
  // A last segment without an extension is a directory (site, site/about).
  const last = rest.slice(rest.lastIndexOf("/") + 1);
  if (last && !last.includes(".")) return { kind: "redirect", to: `${pathname}/` };
  return { kind: "file", token, version: version ? Number(version) : null, rest: rest.slice(1) };
}

/** The object a file under a base is stored as, and whether it is the comparison page itself. */
export function objectKey(token: string, version: number, rest: string): { key: string; isComparePage: boolean } {
  const file = rest === "" || rest.endsWith("/") ? `${rest}index.html` : rest;
  const area = file.startsWith("site/") ? "" : "compare/";
  return { key: `c/${token}/v${version}/${area}${file}`, isComparePage: area === "compare/" && file === "index.html" };
}

const TYPES: Record<string, string> = {
  html: "text/html; charset=utf-8",
  css: "text/css; charset=utf-8",
  js: "text/javascript; charset=utf-8",
  json: "application/json",
  txt: "text/plain; charset=utf-8",
  webp: "image/webp",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  avif: "image/avif",
  svg: "image/svg+xml",
  ico: "image/x-icon",
  woff2: "font/woff2",
  woff: "font/woff",
};

/** By extension; nosniff (SECURITY_HEADERS) makes the browser keep to it. */
export function contentType(key: string): string {
  const ext = key.slice(key.lastIndexOf(".") + 1).toLowerCase();
  return TYPES[ext] ?? "application/octet-stream";
}
