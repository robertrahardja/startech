import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import worker from "../worker/index.ts";
import { handleInterest } from "../worker/interest.ts";
import { handleKeepUpdated } from "../worker/keep-updated.ts";
import { CONFIRM_SUBJECT, SIGNUP_CONSENT } from "../worker/subscribe.ts";
import { en } from "../src/i18n/en.ts";
import { es } from "../src/i18n/es.ts";
import { ja } from "../src/i18n/ja.ts";
import { ko } from "../src/i18n/ko.ts";
import { pt } from "../src/i18n/pt.ts";
import { zhHans } from "../src/i18n/zh-Hans.ts";
import { zhHant } from "../src/i18n/zh-Hant.ts";
import { fakeD1 } from "./fake-d1.mjs";
import { TOKEN, captureErrors, fakeFetch, fakeKV, restoreGlobals } from "./fakes.mjs";

// The updates list: /k/<token> ("keep me updated" in hq's outreach emails),
// /k/c/<token> and /k/u/<token> (worker/keep-updated.ts), and the website
// sign-up, POST /api/subscribe (worker/subscribe.ts).

// hq's migrations/0025, as given.
const SUBSCRIBERS = `CREATE TABLE IF NOT EXISTS subscribers (
  id TEXT PRIMARY KEY,                    -- sub_<uuid>
  email TEXT NOT NULL UNIQUE,             -- lower case
  name TEXT,
  company TEXT,                           -- as they typed it
  company_id TEXT,                        -- the CRM company, when known
  language TEXT NOT NULL DEFAULT 'en',    -- en|ja|id|es|pt|zh-Hans|zh-Hant
  source TEXT NOT NULL,                   -- outreach|website|hq
  consent_text TEXT NOT NULL,             -- the words they agreed to
  consent_meta TEXT,                      -- JSON: page, network, browser, scanner flag (no IP)
  consent_at TEXT NOT NULL,               -- ISO time they said yes
  confirmed_at TEXT,                      -- set when a person confirmed (null: awaiting, or a mail scanner's press)
  token TEXT NOT NULL UNIQUE,             -- 32 hex: confirm and unsubscribe links
  unsubscribed_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);`;

const NOW = "2026-11-16T02:00:00.000Z";
const CHROME = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const PERSON = { asn: 2856, asOrganization: "British Telecommunications PLC", country: "GB" };
const SCANNER = { asn: 8075, asOrganization: "Microsoft Corporation", country: "GB" };

let db;
let clock;

const context = () => ({ db: db.d1, isRateLimited: async () => false, now: () => new Date(clock) });

/** A request to /k/...; `cf` and a browser make it a press by a person, none a scanner's. */
function request(path, method = "GET", cf = null) {
  const headers = { "CF-Connecting-IP": "203.0.113.7" };
  if (cf) headers["User-Agent"] = CHROME;
  const r = new Request(`https://startech-innovation.com${path}`, { method, headers });
  if (cf) Object.defineProperty(r, "cf", { value: cf });
  return r;
}

beforeEach(() => {
  db = fakeD1();
  db.query(SUBSCRIBERS);
  clock = NOW;
  db.query("INSERT INTO companies (id, org_id, name, country) VALUES ('co_1', 'org', 'PT Sample', 'Indonesia')");
  db.query("INSERT INTO outreach_campaigns (id, country, language, local_language, name) VALUES ('id-ja', 'Indonesia', 'ja', 'id', 'Japanese firms in Indonesia')");
  db.query(
    `INSERT INTO outreach_recipients (id, campaign_id, company_id, email, consent_basis, status, step, next_at, unsub_token)
     VALUES ('rcp_1', 'id-ja', 'co_1', 'Info@Sample.co.id', 'id-published', 'active', 1, '2026-11-18T02:00:00Z', ?)`,
    TOKEN
  );
  db.query("INSERT INTO outreach_sends (id, recipient_id, campaign_id, step, subject, body, status) VALUES ('snd_2', 'rcp_1', 'id-ja', 2, 's', 'b', 'pending')");
});

afterEach(restoreGlobals);

const recipient = () => db.query("SELECT status, next_at FROM outreach_recipients WHERE id = 'rcp_1'")[0];
const sendStatus = () => db.query("SELECT status, error FROM outreach_sends WHERE id = 'snd_2'")[0];
const subscribers = () => db.query("SELECT * FROM subscribers");
const notes = () => db.query("SELECT org_id, type, company_id, subject, description, is_completed, created_by FROM activities");

test("GET /k/ shows one button in the campaign's languages and records nothing", async () => {
  for (const method of ["GET", "HEAD"]) {
    const res = await handleKeepUpdated(request(`/k/${TOKEN}`, method, PERSON), context());
    assert.equal(res.status, 200);
    if (method === "GET") {
      const html = await res.text();
      assert.match(html, /<html lang="ja">/);
      assert.match(html, new RegExp(`<form method="post" action="/k/${TOKEN}"><button type="submit">最新情報を受け取る / Kirimi saya kabar terbaru</button></form>`));
      assert.match(html, /四半期に一度程度/);
      assert.match(html, /sekitar sekali per kuartal/);
    }
  }
  assert.deepEqual(subscribers(), []);
  assert.deepEqual(recipient(), { status: "active", next_at: "2026-11-18T02:00:00Z" });
  assert.equal(sendStatus().status, "pending");
  assert.deepEqual(notes(), []);
});

test("a person's press: subscribed and confirmed, sequence stopped, one CRM note, no deal", async () => {
  const res = await handleKeepUpdated(request(`/k/${TOKEN}`, "POST", PERSON), context());
  const html = await res.text();
  assert.equal(res.status, 200);
  const [sub] = subscribers();
  assert.match(sub.id, /^sub_[0-9a-f-]{36}$/);
  assert.match(sub.token, /^[0-9a-f]{32}$/);
  assert.deepEqual(
    { ...sub, id: undefined, token: undefined, consent_meta: undefined, created_at: undefined },
    {
      id: undefined, token: undefined, consent_meta: undefined, created_at: undefined,
      email: "info@sample.co.id",
      name: null,
      company: "PT Sample",
      company_id: "co_1",
      language: "ja",
      source: "outreach",
      consent_text:
        "Startech Innovation より、四半期に一度程度、簡単なお知らせをお送りいたします。配信はいつでも停止いただけます。\n" +
        "Kabar singkat dari Startech Innovation sekitar sekali per kuartal; berhenti berlangganan kapan saja.\n" +
        "[最新情報を受け取る / Kirimi saya kabar terbaru]",
      consent_at: NOW,
      confirmed_at: NOW,
      unsubscribed_at: null,
    }
  );
  const meta = JSON.parse(sub.consent_meta);
  assert.equal(meta.page, "/k/");
  assert.equal(meta.scanner, false);
  assert.equal(meta.org, "British Telecommunications PLC");
  assert.ok(!sub.consent_meta.includes("203.0.113.7"), "no IP address is kept");

  assert.match(html, /ありがとうございます/);
  assert.match(html, /四半期に一度程度、お知らせをお送りいたします。/);
  assert.match(html, new RegExp(`href="/k/u/${sub.token}"`));

  assert.deepEqual(recipient(), { status: "done", next_at: null });
  assert.deepEqual(sendStatus(), { status: "skipped", error: "keep-updated" });
  const [note] = notes();
  assert.equal(notes().length, 1);
  assert.deepEqual(
    { ...note, description: undefined },
    { org_id: "org_startech_default", type: "note", company_id: "co_1", subject: "Asked to be kept updated", description: undefined, is_completed: 1, created_by: "user_ceo_default" }
  );
  assert.match(note.description, /info@sample\.co\.id pressed "Keep me updated" in outreach campaign id-ja/);
  assert.match(note.description, /probably a person/);
  assert.equal(db.query("SELECT COUNT(*) AS n FROM deals")[0].n, 0);

  // Pressed again: nothing changes and no second note.
  clock = "2026-11-17T02:00:00.000Z";
  await handleKeepUpdated(request(`/k/${TOKEN}`, "POST", PERSON), context());
  assert.equal(subscribers()[0].confirmed_at, NOW);
  assert.equal(notes().length, 1);
});

test("a scanner's press is kept unconfirmed and stops nothing; a person's later press confirms it", async () => {
  // No browser at all: a link checker.
  await handleKeepUpdated(request(`/k/${TOKEN}`, "POST"), context());
  let [sub] = subscribers();
  assert.equal(sub.confirmed_at, null);
  assert.equal(JSON.parse(sub.consent_meta).scanner, true);
  assert.deepEqual(recipient(), { status: "active", next_at: "2026-11-18T02:00:00Z" });
  assert.equal(sendStatus().status, "pending");
  assert.equal(notes().length, 1);
  assert.match(notes()[0].description, /automatic link check.*Recorded but not confirmed/);

  // A cloud network with a real browser is a scanner too, and changes nothing more.
  await handleKeepUpdated(request(`/k/${TOKEN}`, "POST", SCANNER), context());
  assert.equal(subscribers()[0].confirmed_at, null);
  assert.equal(notes().length, 1);

  clock = "2026-11-16T05:00:00.000Z";
  await handleKeepUpdated(request(`/k/${TOKEN}`, "POST", PERSON), context());
  [sub] = subscribers();
  assert.equal(sub.confirmed_at, clock);
  assert.equal(sub.consent_at, clock);
  assert.equal(JSON.parse(sub.consent_meta).scanner, false);
  assert.deepEqual(recipient(), { status: "done", next_at: null });
  assert.deepEqual(sendStatus(), { status: "skipped", error: "keep-updated" });
  assert.equal(notes().length, 2);
  assert.match(notes()[1].description, /confirms an earlier record/);
});

test("a person's press brings back an unsubscribed address; other recipient statuses are kept", async () => {
  db.query("UPDATE outreach_recipients SET status = 'replied'");
  db.query(
    `INSERT INTO subscribers (id, email, language, source, consent_text, consent_at, confirmed_at, token, unsubscribed_at)
     VALUES ('sub_old', 'info@sample.co.id', 'en', 'website', 'old words', '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '2026-06-01T00:00:00Z')`
  );
  // A scanner does not resubscribe anyone.
  await handleKeepUpdated(request(`/k/${TOKEN}`, "POST"), context());
  assert.equal(subscribers()[0].unsubscribed_at, "2026-06-01T00:00:00Z");

  const res = await handleKeepUpdated(request(`/k/${TOKEN}`, "POST", PERSON), context());
  const [sub] = subscribers();
  assert.equal(sub.id, "sub_old");
  assert.equal(sub.unsubscribed_at, null);
  assert.equal(sub.confirmed_at, NOW);
  assert.equal(sub.company_id, "co_1");
  assert.match(sub.consent_text, /^Startech Innovation より/);
  assert.match(await res.text(), /href="\/k\/u\/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"/);
  assert.equal(recipient().status, "replied");
});

test("/k/u/ unsubscribes on the button only, once; an unknown token is a 404", async () => {
  await handleKeepUpdated(request(`/k/${TOKEN}`, "POST", PERSON), context());
  const { token } = subscribers()[0];

  const page = await handleKeepUpdated(request(`/k/u/${token}`), context());
  assert.equal(page.status, 200);
  assert.match(await page.text(), new RegExp(`<form method="post" action="/k/u/${token}"><button type="submit">配信を停止する</button>`));
  assert.equal(subscribers()[0].unsubscribed_at, null);

  const done = await handleKeepUpdated(request(`/k/u/${token}`, "POST"), context());
  assert.equal(done.status, 200);
  assert.match(await done.text(), /配信を停止しました/);
  assert.equal(subscribers()[0].unsubscribed_at, NOW);

  clock = "2026-11-20T00:00:00.000Z";
  await handleKeepUpdated(request(`/k/u/${token}`, "POST"), context());
  assert.equal(subscribers()[0].unsubscribed_at, NOW, "the first unsubscribe is kept");

  for (const path of ["/k/u/ffffffffffffffffffffffffffffffff", "/k/c/ffffffffffffffffffffffffffffffff", "/k/tok_does_not_exist_0000000", "/k/short"]) {
    const res = await handleKeepUpdated(request(path, "POST", PERSON), context());
    assert.equal(res.status, 404, path);
    assert.match(await res.text(), /This link is not valid/);
  }
});

// --- The website sign-up, through the Worker's own fetch handler. ---

const SENDER = "Robert Rahardja <robert@mail.startech-innovation.com>";

function site(overrides = {}) {
  const pending = [];
  const env = {
    ENVIRONMENT: "production",
    RESEND_API_KEY: "re_test",
    OUTREACH_FROM: SENDER,
    CRM_DB: db.d1,
    RATE_LIMIT: fakeKV(),
    ...overrides,
  };
  const ctx = { waitUntil: (p) => pending.push(p), passThroughOnException() {} };
  return async (req) => {
    const res = await worker.fetch(req, env, ctx);
    await Promise.all(pending);
    return res;
  };
}

let ip = 0;
function signup(body, { origin = "https://startech-innovation.com", sameIp = false } = {}) {
  if (!sameIp) ip++;
  return new Request("https://startech-innovation.com/api/subscribe", {
    method: "POST",
    headers: {
      Origin: origin,
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "CF-Connecting-IP": `198.51.100.${ip}`,
      "User-Agent": CHROME,
    },
    body: JSON.stringify({ email: "Mei@Example.SG", consent: true, language: "en", page: "/updates", ...body }),
  });
}

test("a new address is saved unconfirmed and gets one confirmation email", async () => {
  const calls = fakeFetch();
  const call = site();
  const res = await call(signup({ name: "Tan Mei", company: "Example Pte Ltd" }));
  assert.equal(res.status, 200);
  const answer = await res.json();
  assert.equal(answer.success, true);

  const [sub] = subscribers();
  assert.equal(sub.email, "mei@example.sg");
  assert.equal(sub.name, "Tan Mei");
  assert.equal(sub.company, "Example Pte Ltd");
  assert.equal(sub.company_id, null);
  assert.equal(sub.source, "website");
  assert.equal(sub.language, "en");
  assert.equal(sub.consent_text, en.updates.consent);
  assert.equal(sub.confirmed_at, null);
  const meta = JSON.parse(sub.consent_meta);
  assert.equal(meta.page, "/updates");
  assert.ok(!sub.consent_meta.includes("198.51.100"), "no IP address is kept");

  assert.equal(calls.length, 1);
  const email = calls[0].body;
  assert.equal(calls[0].url, "https://api.resend.com/emails");
  assert.equal(email.from, SENDER);
  assert.deepEqual(email.to, ["mei@example.sg"]);
  assert.equal(email.subject, CONFIRM_SUBJECT);
  assert.equal(email.subject, "Please confirm: Startech Innovation updates");
  assert.equal(email.html, undefined, "plain text only");
  assert.equal(
    email.text,
    [
      "Please open this link and press Confirm if you would like a short update from Startech Innovation about once a quarter:",
      `https://startech-innovation.com/k/c/${sub.token}`,
      "If you did not ask for this, ignore this email.",
      "Startech Innovation Pte. Ltd., 1003 Bukit Merah Central #06-07, Singapore 159836",
    ].join("\n\n")
  );
  assert.ok(!email.text.includes("Tan Mei"), "nothing the visitor typed is in the email");

  // Again within ten minutes, from another network: no second email.
  const again = await call(signup({}));
  assert.equal(again.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(subscribers().length, 1);
});

test("the answer is the same for a new, unconfirmed and confirmed address; a listed one gets no email", async () => {
  const calls = fakeFetch();
  const call = site();
  db.query(
    `INSERT INTO subscribers (id, email, language, source, consent_text, consent_at, confirmed_at, token)
     VALUES ('sub_listed', 'listed@example.sg', 'en', 'outreach', 'words', '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z', 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb')`
  );
  db.query(
    `INSERT INTO subscribers (id, email, language, source, consent_text, consent_at, token)
     VALUES ('sub_waiting', 'waiting@example.sg', 'en', 'outreach', 'scanner words', '2026-01-01T00:00:00Z', 'dddddddddddddddddddddddddddddddd')`
  );
  const bodies = [];
  for (const email of ["new@example.sg", "waiting@example.sg", "listed@example.sg"]) {
    const res = await call(signup({ email }));
    assert.equal(res.status, 200);
    bodies.push(await res.text());
  }
  assert.equal(new Set(bodies).size, 1);
  assert.deepEqual(calls.map((c) => c.body.to[0]), ["new@example.sg", "waiting@example.sg"]);
  assert.match(calls[1].body.text, /\/k\/c\/dddddddddddddddddddddddddddddddd\n/, "an unconfirmed address keeps its token");
  const waiting = db.query("SELECT source, consent_text, confirmed_at FROM subscribers WHERE id = 'sub_waiting'")[0];
  assert.deepEqual(waiting, { source: "outreach", consent_text: en.updates.consent, confirmed_at: null });
  const listed = db.query("SELECT consent_text, consent_meta, confirmed_at FROM subscribers WHERE id = 'sub_listed'")[0];
  assert.deepEqual(listed, { consent_text: "words", consent_meta: null, confirmed_at: "2026-01-01T00:00:00Z" });
});

test("an unsubscribed address signing up again stays unsubscribed until it confirms", async () => {
  const calls = fakeFetch();
  const call = site();
  db.query(
    `INSERT INTO subscribers (id, email, language, source, consent_text, consent_at, confirmed_at, token, unsubscribed_at)
     VALUES ('sub_gone', 'mei@example.sg', 'en', 'website', 'old', '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z', 'cccccccccccccccccccccccccccccccc', '2026-02-01T00:00:00Z')`
  );
  await call(signup({ language: "ja" }));
  const [sub] = subscribers();
  assert.equal(sub.unsubscribed_at, "2026-02-01T00:00:00Z");
  assert.equal(sub.language, "ja");
  assert.equal(sub.consent_text, ja.updates.consent);
  assert.equal(calls.length, 1);
  assert.match(calls[0].body.text, /\/k\/c\/cccccccccccccccccccccccccccccccc\n/);
});

test("/api/subscribe refuses bad input the same way for everyone, and is rate limited per IP", async () => {
  const calls = fakeFetch();
  captureErrors();
  const call = site();
  assert.equal((await call(signup({ email: "not-an-address" }))).status, 400);
  assert.equal((await call(signup({ email: "a@b" }))).status, 400);
  assert.equal((await call(signup({ consent: false }))).status, 400);
  assert.equal((await call(signup({ language: "toString" }))).status, 200, "an unknown language is English");
  assert.equal(subscribers()[0].consent_text, en.updates.consent);
  assert.equal((await call(signup({}, { origin: "https://example.com" }))).status, 403);

  // Honeypot: answered like a success, nothing saved or sent.
  db.query("DELETE FROM subscribers");
  const sent = calls.length;
  const bot = await call(signup({ email: "bot@example.sg", website: "https://spam.example" }));
  assert.equal(bot.status, 200);
  assert.equal(subscribers().length, 0);
  assert.equal(calls.length, sent);

  // Three a minute from one address, as /api/contact.
  const statuses = [];
  for (let i = 0; i < 4; i++) statuses.push((await call(signup({ email: `p${i}@example.sg` }, { sameIp: i > 0 }))).status);
  assert.deepEqual(statuses, [200, 200, 200, 429]);
});

test("/k/c/ confirms on a person's press only; the Worker serves it, not the app shell", async () => {
  fakeFetch();
  const call = site();
  await call(signup({ language: "zh-Hant" }));
  const { token } = subscribers()[0];

  const page = await call(request(`/k/c/${token}`, "GET", PERSON));
  assert.equal(page.status, 200);
  assert.equal(page.headers.get("X-Frame-Options"), "DENY");
  assert.match(await page.text(), new RegExp(`<html lang="zh-Hant">[\\s\\S]*<form method="post" action="/k/c/${token}"><button type="submit">確認</button>`));
  assert.equal(subscribers()[0].confirmed_at, null);

  await call(request(`/k/c/${token}`, "POST"));
  assert.equal(subscribers()[0].confirmed_at, null, "a scanner's press does not confirm");

  db.query("UPDATE subscribers SET unsubscribed_at = '2026-11-01T00:00:00Z'");
  const done = await call(request(`/k/c/${token}`, "POST", PERSON));
  assert.match(await done.text(), new RegExp(`謝謝您[\\s\\S]*href="/k/u/${token}"`));
  const [sub] = subscribers();
  assert.ok(sub.confirmed_at, "confirmed");
  assert.equal(sub.unsubscribed_at, null);
  const meta = JSON.parse(sub.consent_meta);
  assert.equal(meta.page, "/updates");
  assert.equal(meta.confirm.page, "/k/c/");
  assert.equal(meta.confirm.scanner, false);
});

test("the Worker's consent line for each locale is the one the site shows", () => {
  const catalogues = { en, ja, ko, "zh-Hans": zhHans, "zh-Hant": zhHant, es, pt };
  assert.deepEqual(Object.keys(SIGNUP_CONSENT).sort(), Object.keys(catalogues).sort());
  for (const [locale, messages] of Object.entries(catalogues)) {
    assert.equal(SIGNUP_CONSENT[locale], messages.updates.consent, locale);
  }
});

test("interest: a keep_in_touch deal is not open pipeline, so pressing 'I am interested' opens a lead", async () => {
  db.query("INSERT INTO deals (id, company_id, title, stage) VALUES ('deal_old', 'co_1', 'Earlier', 'keep_in_touch')");
  const ctx = { ...context(), notify: async () => {}, waitUntil: () => {} };
  await handleInterest(request(`/i/${TOKEN}`, "POST", PERSON), ctx);
  assert.deepEqual(db.query("SELECT stage FROM deals ORDER BY stage"), [{ stage: "keep_in_touch" }, { stage: "lead" }]);

  // An open deal still blocks a second one.
  db.query("UPDATE outreach_recipients SET interested_at = NULL");
  await handleInterest(request(`/i/${TOKEN}`, "POST", PERSON), ctx);
  assert.equal(db.query("SELECT COUNT(*) AS n FROM deals WHERE stage = 'lead'")[0].n, 1);
});
