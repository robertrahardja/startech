import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import worker, * as workerModule from "../worker/index.ts";
import { brokenD1, fakeD1 } from "./fake-d1.mjs";
import { TOKEN, captureErrors, fakeFetch, fakeKV, restoreGlobals } from "./fakes.mjs";

// The Worker's own fetch handler: /api/contact with the acknowledgement,
// and the /u/ route, as Cloudflare would call them.

const SENDER = "Robert Rahardja <robert@mail.startech-innovation.com>";

function setup(overrides = {}) {
  const db = fakeD1();
  const pending = [];
  const env = {
    ENVIRONMENT: "production",
    RESEND_API_KEY: "re_test",
    OUTREACH_FROM: SENDER,
    CRM_DB: db.d1,
    RATE_LIMIT: fakeKV(),
    ...overrides,
  };
  const ctx = { waitUntil: (promise) => pending.push(promise), passThroughOnException() {} };
  const call = async (request) => {
    const response = await worker.fetch(request, env, ctx);
    await Promise.all(pending);
    return response;
  };
  return { db, call };
}

function enquiry(body) {
  return new Request("https://startech-innovation.com/api/contact", {
    method: "POST",
    headers: {
      Origin: "https://thailand.startech-innovation.com",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "CF-Connecting-IP": "203.0.113.9",
    },
    body: JSON.stringify({
      name: "Somchai P.",
      email: "somchai@example.co.th",
      message: "We track stock in Excel.",
      ...body,
    }),
  });
}

afterEach(restoreGlobals);

test("the module exports the Mailer entrypoint beside the default handler, and nothing else", () => {
  assert.deepEqual(Object.keys(workerModule).sort(), ["Mailer", "default"]);
  assert.equal(typeof worker.fetch, "function");
});

test("a saved enquiry: the notification to StarTech is unchanged, then the visitor's acknowledgement", async () => {
  const calls = fakeFetch();
  const { db, call } = setup();
  const res = await call(enquiry({ topic: "thailand", utm_campaign: "thailand-en" }));

  assert.equal(res.status, 200);
  assert.equal((await res.json()).success, true);
  assert.equal(db.query("SELECT email FROM contacts")[0].email, "somchai@example.co.th");
  assert.equal(calls.length, 2);

  const [notification, ack] = calls.map((c) => c.body);
  assert.equal(notification.from, "StarTech Website <onboarding@resend.dev>");
  assert.deepEqual(notification.to, ["rr.startech.innovation@gmail.com"]);
  assert.equal(notification.reply_to, "somchai@example.co.th");
  assert.equal(notification.subject, "Thailand site enquiry: Somchai P.");

  assert.equal(ack.from, SENDER);
  assert.deepEqual(ack.to, ["somchai@example.co.th"]);
  assert.equal(ack.subject, "Thank you for your message to StarTech Innovation");
});

test("the request's locale field picks the acknowledgement's language", async () => {
  const calls = fakeFetch();
  const { call } = setup();
  await call(enquiry({ topic: "vietnam", locale: "ja", utm_campaign: "vietnam-en" }));
  assert.equal(calls[1].body.subject, "お問い合わせありがとうございます（StarTech Innovation）");
});

test("no acknowledgement without OUTREACH_FROM, or when the lead did not reach the CRM", async () => {
  const calls = fakeFetch();
  const off = setup({ OUTREACH_FROM: undefined });
  assert.equal((await off.call(enquiry({}))).status, 200);
  assert.equal(calls.length, 1);

  captureErrors();
  const unsaved = setup({ CRM_DB: brokenD1() });
  assert.equal((await unsaved.call(enquiry({}))).status, 200);
  assert.equal(calls.length, 2);
  assert.match(calls[1].body.html, /NOT saved to the CRM/);
});

test("a failed acknowledgement never fails the enquiry", async () => {
  const logged = captureErrors();
  const calls = fakeFetch((_call, index) =>
    index === 0 ? Response.json({ id: "email_1" }) : Response.json({ name: "internal_server_error" }, { status: 500 })
  );
  const { call } = setup();
  const res = await call(enquiry({}));

  assert.equal(res.status, 200);
  assert.equal(calls.length, 2);
  assert.deepEqual(logged, ["Enquiry acknowledgement not sent: resend-500:internal_server_error"]);
});

test("/u/<token> is served by the Worker with the site's security headers", async () => {
  fakeFetch();
  const { db, call } = setup();
  db.query("INSERT INTO outreach_campaigns (id, country, language, name) VALUES ('sg-en', 'Singapore', 'en', 'Singapore')");
  db.query(
    `INSERT INTO outreach_recipients (id, campaign_id, email, consent_basis, unsub_token)
     VALUES ('rcp_1', 'sg-en', 'hello@example.sg', 'published-role-address', ?)`,
    TOKEN
  );
  const res = await call(new Request(`https://startech-innovation.com/u/${TOKEN}`));

  assert.equal(res.status, 200);
  assert.match(await res.text(), /Unsubscribe from StarTech Innovation emails/);
  assert.equal(res.headers.get("X-Frame-Options"), "DENY");
  assert.match(res.headers.get("Content-Security-Policy"), /frame-ancestors 'none'/);
  assert.equal(res.headers.get("X-Robots-Tag"), "noindex, nofollow");

  const done = await call(
    new Request(`https://startech-innovation.com/u/${TOKEN}`, { method: "POST", body: "List-Unsubscribe=One-Click" })
  );
  assert.match(await done.text(), /You are unsubscribed/);
  assert.equal(db.query("SELECT reason FROM outreach_suppression")[0].reason, "unsubscribe");
});
