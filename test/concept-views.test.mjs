import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import { handleConcept } from "../worker/concepts.ts";
import worker from "../worker/index.ts";
import { fakeD1 } from "./fake-d1.mjs";
import { CONCEPT, conceptFiles, fakeR2 } from "./fake-r2.mjs";
import { TOKEN, fakeKV } from "./fakes.mjs";

// POST /c/<token>/view (worker/concept-views.ts), and /c/ through the
// Worker's own router.

let bucket;
let db;
let limited;

const post = (path, method = "POST") =>
  handleConcept(
    new Request(`https://startech-innovation.com${path}`, { method, headers: { "CF-Connecting-IP": "203.0.113.7" } }),
    { bucket, db: db.d1, isRateLimited: async () => limited, now: () => new Date("2026-11-20T03:00:00Z") }
  );

const views = () => db.query("SELECT token, at FROM web_views");

beforeEach(() => {
  bucket = fakeR2(conceptFiles());
  db = fakeD1();
  limited = false;
});

test("POST /c/<token>/view records one view; there is no beacon on a frozen copy", async () => {
  assert.equal((await post(`/c/${CONCEPT}/view`)).status, 204);
  assert.deepEqual(views(), [{ token: CONCEPT, at: "2026-11-20T03:00:00.000Z" }]);
  assert.equal((await post(`/c/${CONCEPT}/view`, "GET")).status, 405);
  assert.equal((await post(`/c/${CONCEPT}/v1/view`)).status, 405);
  assert.equal(views().length, 1);
});

test("a view of a pulled, unknown or rate-limited concept records nothing", async () => {
  assert.equal((await post("/c/AAAAAAAAAAAAAAAAAAAAAA/view")).status, 404);
  limited = true;
  const busy = await post(`/c/${CONCEPT}/view`);
  assert.equal(busy.status, 429);
  assert.equal(busy.headers.get("Retry-After"), "60");
  limited = false;
  bucket.store.set(`c/${CONCEPT}/current.json`, JSON.stringify({ version: 2, pulled: true }));
  assert.equal((await post(`/c/${CONCEPT}/view`)).status, 410);
  assert.equal(views().length, 0);
});

test("the Worker routes /c/ to the concept, before the static assets", async () => {
  const env = { ENVIRONMENT: "production", CONCEPTS: bucket, CRM_DB: db.d1, RATE_LIMIT: fakeKV() };
  const ctx = { waitUntil() {}, passThroughOnException() {} };
  const call = (path, method = "GET") => worker.fetch(new Request(`https://startech-innovation.com${path}`, { method }), env, ctx);
  const page = await call(`/c/${CONCEPT}/?r=${TOKEN}`);
  assert.equal(page.status, 200);
  assert.match(await page.text(), new RegExp(`href="/i/${TOKEN}"`));
  assert.equal((await call(`/c/${CONCEPT}/view`, "POST")).status, 204);
  assert.equal(views().length, 1);
});
