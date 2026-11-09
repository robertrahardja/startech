/**
 * /c/<token>/: the private comparison page and concept website that the
 * website email links to (startech_marketing gtm/playbooks/
 * website-programme-architecture.md). Robert, 9 Nov 2026: "make sure I can
 * see exactly what was sent". So every version is served from immutable
 * files in R2 (CONCEPTS), the company's link follows current.json, and
 * /c/<token>/v<n>/ shows a version exactly as it was sent. The URL layout
 * is in worker/concept-files.ts, the view beacon in worker/concept-views.ts.
 *
 * "Pull offline" in hq sets "pulled": true in current.json, and every
 * address of that concept, frozen copies included, then answers with a
 * polite 410: a company that asked for it to be removed must not reach it
 * through any copy of the link. The files stay in R2 for hq's record.
 */

import { contentType, objectKey, parseConceptPath, type ConceptRequest } from "./concept-files";
import { renderConceptPage } from "./concept-page";
import { readPointer } from "./concept-pointer";
import { fillInterestLink, withConceptHeaders } from "./concept-response";
import { recordView, type ViewContext } from "./concept-views";
import { browserLanguage } from "./unsubscribe";
import type { PageLanguage } from "./unsubscribe-page";

export { CONCEPT_PREFIX } from "./concept-files";

export type ConceptContext = ViewContext;

type FileRequest = Extract<ConceptRequest, { kind: "file" }>;

async function serveFile(request: Request, bucket: R2Bucket, file: FileRequest, language: PageLanguage): Promise<Response> {
  const pointer = await readPointer(bucket, file.token);
  if (!pointer) return renderConceptPage(language, "unknown");
  if (pointer.pulled) return renderConceptPage(language, "gone");
  const { key, isComparePage } = objectKey(file.token, file.version ?? pointer.version, file.rest);
  const object = await bucket.get(key);
  if (!object) return renderConceptPage(language, "unknown");
  const type = contentType(key);
  const headers = {
    "Content-Type": type,
    // HTML revalidates every time, so a pull takes effect on the next load.
    "Cache-Control": type.startsWith("text/html") ? "private, no-cache" : "private, max-age=3600",
  };
  const body = isComparePage
    ? fillInterestLink(await object.text(), new URL(request.url).searchParams.get("r"))
    : object.body;
  return new Response(request.method === "HEAD" ? null : body, { headers });
}

async function answer(request: Request, ctx: ConceptContext, language: PageLanguage): Promise<Response> {
  const url = new URL(request.url);
  const parsed = parseConceptPath(url.pathname);
  if (parsed.kind === "view") return recordView(request, parsed.token, ctx);
  if (request.method !== "GET" && request.method !== "HEAD") {
    const refused = renderConceptPage(language, "unknown", 405);
    refused.headers.set("Allow", "GET, HEAD");
    return refused;
  }
  if (parsed.kind === "invalid") return renderConceptPage(language, "unknown");
  // Keep ?r= across the redirect, or the button loses the recipient.
  if (parsed.kind === "redirect") return Response.redirect(new URL(parsed.to + url.search, url).href, 301);
  if (!ctx.bucket) return renderConceptPage(language, "error");
  return serveFile(request, ctx.bucket, parsed, language);
}

export async function handleConcept(request: Request, ctx: ConceptContext): Promise<Response> {
  const language = browserLanguage(request.headers.get("Accept-Language"));
  try {
    return withConceptHeaders(await answer(request, ctx, language));
  } catch (err) {
    console.error("Concept failed:", err instanceof Error ? err.message : err);
    return withConceptHeaders(renderConceptPage(language, "error"));
  }
}
