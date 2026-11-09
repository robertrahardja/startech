import assert from "node:assert/strict";
import { test } from "node:test";
import { contentType, objectKey, parseConceptPath } from "../worker/concept-files.ts";
import { interestHref } from "../worker/concept-response.ts";
import { CONCEPT } from "./fake-r2.mjs";
import { TOKEN } from "./fakes.mjs";

// The /c/ path rules (worker/concept-files.ts): which R2 object each
// address under a base serves, and which addresses are never looked up.

const keyFor = (path, current = 2) => {
  const p = parseConceptPath(path);
  return objectKey(p.token, p.version ?? current, p.rest).key;
};

test("every base maps the same way: compare page, site/..., and the comparison page's own files", () => {
  const expected = {
    [`/c/${CONCEPT}/`]: "v2/compare/index.html",
    [`/c/${CONCEPT}/index.html`]: "v2/compare/index.html",
    [`/c/${CONCEPT}/site/`]: "v2/site/index.html",
    [`/c/${CONCEPT}/site/hero-0.webp`]: "v2/site/hero-0.webp",
    [`/c/${CONCEPT}/today-phone.webp`]: "v2/compare/today-phone.webp",
    [`/c/${CONCEPT}/v1/`]: "v1/compare/index.html",
    [`/c/${CONCEPT}/v1/site/about/`]: "v1/site/about/index.html",
    [`/c/${CONCEPT}/v1/today-laptop.webp`]: "v1/compare/today-laptop.webp",
  };
  for (const [path, key] of Object.entries(expected)) assert.equal(keyFor(path), `c/${CONCEPT}/${key}`, path);
  assert.equal(objectKey(CONCEPT, 1, "").isComparePage, true);
  assert.equal(objectKey(CONCEPT, 1, "site/").isComparePage, false);
});

test("the beacon only on the unversioned base; a directory without its slash redirects", () => {
  assert.deepEqual(parseConceptPath(`/c/${CONCEPT}/view`), { kind: "view", token: CONCEPT });
  assert.equal(parseConceptPath(`/c/${CONCEPT}/v1/view`).kind, "redirect");
  assert.deepEqual(parseConceptPath(`/c/${CONCEPT}`), { kind: "redirect", to: `/c/${CONCEPT}/` });
  assert.deepEqual(parseConceptPath(`/c/${CONCEPT}/site`), { kind: "redirect", to: `/c/${CONCEPT}/site/` });
  assert.deepEqual(parseConceptPath(`/c/${CONCEPT}/v3`), { kind: "redirect", to: `/c/${CONCEPT}/v3/` });
});

test("unsafe paths and short tokens are never looked up", () => {
  const unsafe = [
    `/c/${CONCEPT}/site/../../other/v1/site/index.html`,
    `/c/${CONCEPT}/site/%2e%2e/x.html`,
    `/c/${CONCEPT}/site\\x.html`,
    `/c/${CONCEPT}//etc.html`,
    `/c/${CONCEPT}/site/a b.html`,
    "/c/short/",
  ];
  for (const path of unsafe) assert.deepEqual(parseConceptPath(path), { kind: "invalid" }, path);
});

test("content types by extension, and the interest link only for a valid unsub token", () => {
  assert.equal(contentType("c/x/v1/site/index.html"), "text/html; charset=utf-8");
  assert.equal(contentType("c/x/v1/site/a.WEBP"), "image/webp");
  assert.equal(contentType("c/x/v1/site/logo.svg"), "image/svg+xml");
  assert.equal(contentType("c/x/v1/site/data.bin"), "application/octet-stream");
  assert.equal(interestHref(TOKEN), `/i/${TOKEN}`);
  assert.equal(interestHref("short"), "#contact");
  assert.equal(interestHref('bad"><script>'), "#contact");
  assert.equal(interestHref(null), "#contact");
});
