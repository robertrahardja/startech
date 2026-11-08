import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { handleUnsubscribe } from "../worker/unsubscribe.ts";
import { brokenD1, fakeD1 } from "./fake-d1.mjs";
import { TOKEN, captureErrors, restoreGlobals } from "./fakes.mjs";

// GET and POST /u/<token> (worker/unsubscribe.ts), against the outreach
// tables from st_dasboard's migration 0007.

const URL_FOR = (token) => `https://startech-innovation.com/u/${token}`;
const ONE_CLICK = "List-Unsubscribe=One-Click";
let db;
let limited;

function request(token, init = {}) {
  return new Request(URL_FOR(token), {
    ...init,
    headers: { "CF-Connecting-IP": "203.0.113.7", ...init.headers },
  });
}

const post = (token, headers = {}) =>
  request(token, {
    method: "POST",
    body: ONE_CLICK,
    headers: { "Content-Type": "application/x-www-form-urlencoded", ...headers },
  });

const context = (database = db.d1) => ({
  db: database,
  isRateLimited: async () => limited,
});

beforeEach(() => {
  limited = false;
  db = fakeD1();
  db.query("INSERT INTO outreach_campaigns (id, country, language, name) VALUES ('jp-ja', 'Japan', 'ja', 'Japan, Japanese')");
  db.query("INSERT INTO outreach_campaigns (id, country, language, name) VALUES ('id-id', 'Indonesia', 'id', 'Indonesia')");
  db.query(
    `INSERT INTO outreach_recipients (id, campaign_id, email, consent_basis, status, unsub_token)
     VALUES ('rcp_1', 'jp-ja', 'Info@Example.co.jp', 'jp-published-for-enquiries', 'active', ?),
            ('rcp_2', 'jp-ja', 'sales@other.example.jp', 'jp-published-for-enquiries', 'active', 'tok_another_recipient_00001')`,
    TOKEN
  );
});
afterEach(restoreGlobals);

const suppression = () => db.query("SELECT email, reason, source FROM outreach_suppression ORDER BY email");
const statusOf = (id) => db.query("SELECT status FROM outreach_recipients WHERE id = ?", id)[0].status;

test("GET shows a confirmation in the campaign's language and changes nothing", async () => {
  const res = await handleUnsubscribe(request(TOKEN), context());
  const html = await res.text();

  assert.equal(res.status, 200);
  assert.equal(res.headers.get("Content-Type"), "text/html; charset=utf-8");
  assert.equal(res.headers.get("Cache-Control"), "no-store");
  assert.equal(res.headers.get("X-Robots-Tag"), "noindex, nofollow");
  assert.match(html, /<html lang="ja">/);
  assert.match(html, /<meta name="robots" content="noindex, nofollow">/);
  assert.match(html, new RegExp(`<form method="post" action="/u/${TOKEN}">`));
  assert.match(html, /配信を停止する/);
  assert.doesNotMatch(html, /<script/i);
  // The address is never shown: the link may have been forwarded.
  assert.doesNotMatch(html, /example\.co\.jp/i);

  assert.deepEqual(suppression(), []);
  assert.equal(statusOf("rcp_1"), "active");
});

test("POST (one-click or the button) suppresses the address and marks only that recipient", async () => {
  const res = await handleUnsubscribe(post(TOKEN), context());
  const html = await res.text();

  assert.equal(res.status, 200);
  assert.match(html, /配信を停止しました/);
  assert.deepEqual(suppression(), [{ email: "Info@Example.co.jp", reason: "unsubscribe", source: "rcp_1" }]);
  assert.equal(statusOf("rcp_1"), "unsubscribed");
  assert.equal(statusOf("rcp_2"), "active");
});

test("unsubscribing again, or after a bounce under another letter case, changes nothing more", async () => {
  db.query("INSERT INTO outreach_suppression (email, reason, source) VALUES ('info@example.co.jp', 'bounce', 'hq')");
  await handleUnsubscribe(post(TOKEN), context());
  const second = await handleUnsubscribe(post(TOKEN), context());

  assert.equal(second.status, 200);
  assert.deepEqual(suppression(), [{ email: "info@example.co.jp", reason: "bounce", source: "hq" }]);
  assert.equal(statusOf("rcp_1"), "unsubscribed");
});

test("answers in English and Indonesian for those campaigns", async () => {
  db.query("UPDATE outreach_recipients SET campaign_id = 'id-id' WHERE id = 'rcp_1'");
  const indonesian = await (await handleUnsubscribe(post(TOKEN), context())).text();
  assert.match(indonesian, /<html lang="id">/);
  assert.match(indonesian, /Anda telah berhenti berlangganan/);

  db.query("INSERT INTO outreach_campaigns (id, country, language, name) VALUES ('sg-en', 'Singapore', 'en', 'Singapore')");
  db.query("UPDATE outreach_recipients SET campaign_id = 'sg-en' WHERE id = 'rcp_2'");
  const english = await (await handleUnsubscribe(post("tok_another_recipient_00001"), context())).text();
  assert.match(english, /You are unsubscribed/);
});

test("an unknown token gets a neutral page and touches nothing", async () => {
  const res = await handleUnsubscribe(post("tok_nobody_has_this_token_0"), context());
  const html = await res.text();

  assert.equal(res.status, 404);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /This link is not valid/);
  assert.doesNotMatch(html, /<form/);
  assert.deepEqual(suppression(), []);
  assert.equal(statusOf("rcp_1"), "active");

  // Without a campaign to go by, the browser's language is used.
  const japanese = await handleUnsubscribe(
    request("tok_nobody_has_this_token_0", { headers: { "Accept-Language": "ja-JP,ja;q=0.9,en;q=0.8" } }),
    context()
  );
  assert.match(await japanese.text(), /このリンクは無効です/);
});

test("a malformed token is never looked up", async () => {
  for (const path of ["short", "tok_9fJ2kQ7x%27%20OR%201=1--x", `${TOKEN}/extra`, ""]) {
    const res = await handleUnsubscribe(request(path), context(brokenD1()));
    assert.equal(res.status, 404, path);
    assert.match(await res.text(), /This link is not valid/);
  }
});

test("a database failure shows a generic error and logs the cause", async () => {
  const logged = captureErrors();
  const res = await handleUnsubscribe(post(TOKEN), context(brokenD1()));
  const html = await res.text();

  assert.equal(res.status, 503);
  assert.match(html, /Something went wrong/);
  assert.doesNotMatch(html, /D1_ERROR/);
  assert.match(logged[0], /Unsubscribe failed: D1_ERROR/);

  // No CRM_DB binding at all (e.g. a misconfigured deploy).
  const unbound = await handleUnsubscribe(post(TOKEN), { ...context(), db: undefined });
  assert.equal(unbound.status, 503);
});

test("rate limiting and other methods", async () => {
  limited = true;
  const busy = await handleUnsubscribe(post(TOKEN), context());
  assert.equal(busy.status, 429);
  assert.equal(busy.headers.get("Retry-After"), "60");
  assert.deepEqual(suppression(), []);

  limited = false;
  const put = await handleUnsubscribe(request(TOKEN, { method: "PUT", body: "x" }), context());
  assert.equal(put.status, 405);
  assert.equal(put.headers.get("Allow"), "GET, HEAD, POST");
});
