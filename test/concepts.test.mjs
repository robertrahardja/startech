import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { handleConcept } from "../worker/concepts.ts";
import { fakeD1 } from "./fake-d1.mjs";
import { CONCEPT, conceptFiles, fakeR2 } from "./fake-r2.mjs";
import { TOKEN, captureErrors, restoreGlobals } from "./fakes.mjs";

// GET /c/<token>/... (worker/concepts.ts): the private comparison page and
// concept website the website email links to, served from R2.

let bucket;

const get = (path, init = {}) =>
  handleConcept(new Request(`https://startech-innovation.com${path}`, init), {
    bucket,
    db: fakeD1().d1,
    isRateLimited: async () => false,
  });

const setPointer = (pointer) => bucket.store.set(`c/${CONCEPT}/current.json`, JSON.stringify(pointer));

beforeEach(() => {
  bucket = fakeR2(conceptFiles());
});

afterEach(restoreGlobals);

test("the company's link serves the current version, with the button as /i/<r>", async () => {
  const res = await get(`/c/${CONCEPT}/?r=${TOKEN}`);
  const html = await res.text();
  assert.equal(res.status, 200);
  assert.match(html, / v2</);
  assert.match(html, new RegExp(`href="/i/${TOKEN}"`));
  assert.doesNotMatch(html, /__INTEREST_HREF__/);
  assert.equal(res.headers.get("Content-Type"), "text/html; charset=utf-8");
  assert.equal(res.headers.get("Cache-Control"), "private, no-cache");
  assert.equal(res.headers.get("X-Robots-Tag"), "noindex, nofollow");
  // The site's security headers, with same-origin framing for the concept iframe.
  assert.equal(res.headers.get("X-Content-Type-Options"), "nosniff");
  assert.match(res.headers.get("Strict-Transport-Security"), /max-age=31536000/);
  assert.equal(res.headers.get("X-Frame-Options"), "SAMEORIGIN");
  assert.match(res.headers.get("Content-Security-Policy"), /frame-src 'self'; frame-ancestors 'self'/);
});

test("without a valid r the button points to #contact", async () => {
  assert.match(await (await get(`/c/${CONCEPT}/`)).text(), /href="#contact"/);
  assert.match(await (await get(`/c/${CONCEPT}/?r=bad"><script>`)).text(), /href="#contact"/);
});

test("the concept site and the comparison page's screenshots, with their content types", async () => {
  assert.equal(await (await get(`/c/${CONCEPT}/site/`)).text(), "<!doctype html><title>Concept v2</title>");
  const hero = await get(`/c/${CONCEPT}/site/hero-0.webp`);
  assert.equal(hero.headers.get("Content-Type"), "image/webp");
  assert.equal(hero.headers.get("Cache-Control"), "private, max-age=3600");
  assert.equal(hero.headers.get("X-Robots-Tag"), "noindex, nofollow");
  assert.equal(await hero.text(), "RIFF-hero");
  assert.equal(await (await get(`/c/${CONCEPT}/today-phone.webp`)).text(), "RIFF-phone");
  assert.equal(await (await get(`/c/${CONCEPT}/site/about/`)).text(), "<!doctype html><title>About</title>");
});

test("a company's SVG, opened on its own, is sandboxed", async () => {
  const res = await get(`/c/${CONCEPT}/site/logo.svg`);
  assert.equal(res.headers.get("Content-Type"), "image/svg+xml");
  assert.match(res.headers.get("Content-Security-Policy"), /default-src 'none'.*sandbox/);
});

test("a frozen base shows that version as it was sent, whatever current.json says", async () => {
  const html = await (await get(`/c/${CONCEPT}/v1/?r=${TOKEN}`)).text();
  assert.match(html, / v1</);
  assert.match(html, new RegExp(`href="/i/${TOKEN}"`));
  assert.match(await (await get(`/c/${CONCEPT}/v1/`)).text(), /href="#contact"/);
  assert.equal(await (await get(`/c/${CONCEPT}/v1/site/`)).text(), "<!doctype html><title>Concept v1</title>");
  assert.equal((await get(`/c/${CONCEPT}/v9/`)).status, 404);
});

test("a directory without its slash redirects, keeping ?r=", async () => {
  const cases = {
    [`/c/${CONCEPT}?r=${TOKEN}`]: `/c/${CONCEPT}/?r=${TOKEN}`,
    [`/c/${CONCEPT}/site`]: `/c/${CONCEPT}/site/`,
    [`/c/${CONCEPT}/v1`]: `/c/${CONCEPT}/v1/`,
    [`/c/${CONCEPT}/v1/site`]: `/c/${CONCEPT}/v1/site/`,
  };
  for (const [from, to] of Object.entries(cases)) {
    const res = await get(from);
    assert.equal(res.status, 301, from);
    assert.equal(res.headers.get("Location"), `https://startech-innovation.com${to}`);
  }
});

test("pulled: every address answers a polite 410, frozen copies too; the files stay", async () => {
  setPointer({ version: 2, pulled: true });
  for (const path of [`/c/${CONCEPT}/`, `/c/${CONCEPT}/site/`, `/c/${CONCEPT}/v1/`, `/c/${CONCEPT}/v1/site/`]) {
    const res = await get(path);
    const html = await res.text();
    assert.equal(res.status, 410, path);
    assert.match(html, /This page is no longer available/);
    assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
    assert.equal(res.headers.get("X-Robots-Tag"), "noindex, nofollow");
  }
  assert.ok(bucket.store.has(`c/${CONCEPT}/v1/compare/index.html`));
});

test("a pointer without an explicit pulled: false fails closed", async () => {
  setPointer({ version: 2 });
  assert.equal((await get(`/c/${CONCEPT}/`)).status, 410);
});

test("unknown token or file: a neutral 404, in the visitor's language", async () => {
  const res = await get("/c/AAAAAAAAAAAAAAAAAAAAAA/", { headers: { "Accept-Language": "ja-JP,ja;q=0.9" } });
  assert.equal(res.status, 404);
  assert.match(await res.text(), /<html lang="ja">[\s\S]*ページが見つかりませんでした/);
  assert.equal((await get(`/c/${CONCEPT}/site/missing.webp`)).status, 404);
  assert.equal((await get(`/c/${CONCEPT}/site/../x.html`)).status, 404);
});

test("only GET and HEAD read; HEAD has no body", async () => {
  const post = await get(`/c/${CONCEPT}/`, { method: "POST" });
  assert.equal(post.status, 405);
  assert.equal(post.headers.get("Allow"), "GET, HEAD");
  const head = await get(`/c/${CONCEPT}/`, { method: "HEAD" });
  assert.equal(head.status, 200);
  assert.equal(await head.text(), "");
});

test("no bucket or a failing one: 503, never a crash", async () => {
  const logged = captureErrors();
  bucket = undefined;
  assert.equal((await get(`/c/${CONCEPT}/`)).status, 503);
  bucket = { get: async () => Promise.reject(new Error("R2 down")) };
  assert.equal((await get(`/c/${CONCEPT}/`)).status, 503);
  assert.match(logged.join("\n"), /R2 down/);
});
