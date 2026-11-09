import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import { handleInterest, notifyByEmail } from "../worker/interest.ts";
import { fakeD1 } from "./fake-d1.mjs";
import { TOKEN } from "./fakes.mjs";

// GET and POST /i/<token> and GET /wa/<token> (worker/interest.ts): the
// one-button "I am interested" in hq's outreach emails.

let db;
let notified;
let pending;

const context = () => ({
  db: db.d1,
  isRateLimited: async () => false,
  notify: async (who) => notified.push(who),
  waitUntil: (p) => pending.push(p),
  now: () => new Date("2026-11-10T02:00:00Z"),
});

const request = (path, method = "GET") =>
  new Request(`https://startech-innovation.com${path}`, { method, headers: { "CF-Connecting-IP": "203.0.113.7" } });

beforeEach(() => {
  db = fakeD1();
  notified = [];
  pending = [];
  db.query("INSERT INTO companies (id, org_id, name, country) VALUES ('co_1', 'org', 'PT Sample', 'Indonesia')");
  db.query("INSERT INTO outreach_campaigns (id, country, language, local_language, name) VALUES ('id-ja', 'Indonesia', 'ja', 'id', 'Japanese firms in Indonesia')");
  db.query(
    `INSERT INTO outreach_recipients (id, campaign_id, company_id, email, consent_basis, status, step, next_at, unsub_token)
     VALUES ('rcp_1', 'id-ja', 'co_1', 'info@sample.co.id', 'id-published', 'active', 1, '2026-11-12T02:00:00Z', ?)`,
    TOKEN
  );
  db.query("INSERT INTO outreach_sends (id, recipient_id, campaign_id, step, subject, body, status) VALUES ('snd_1', 'rcp_1', 'id-ja', 1, 's', 'b', 'pending')");
});

const recipient = () => db.query("SELECT status, replied_at, interested_at, next_at FROM outreach_recipients WHERE id = 'rcp_1'")[0];

test("GET shows one button in the campaign's languages and records nothing (mail scanners open links)", async () => {
  const res = await handleInterest(request(`/i/${TOKEN}`), context());
  const html = await res.text();
  assert.equal(res.status, 200);
  assert.match(html, /<html lang="ja">/);
  assert.match(html, new RegExp(`<form method="post" action="/i/${TOKEN}"><button type="submit">話を聞いてみたい / Saya tertarik</button>`));
  assert.equal(recipient().status, "active");
  assert.equal(recipient().interested_at, null);
  assert.equal(notified.length, 0);
});

test("POST records interest like a reply: replied, sequence stopped, a lead deal, Robert told once", async () => {
  const res = await handleInterest(request(`/i/${TOKEN}`, "POST"), context());
  const html = await res.text();
  await Promise.all(pending);
  assert.equal(res.status, 200);
  assert.match(html, /ありがとうございます/);
  assert.match(html, new RegExp(`href="/wa/${TOKEN}"`));
  assert.deepEqual(recipient(), {
    status: "replied",
    replied_at: "2026-11-10T02:00:00.000Z",
    interested_at: "2026-11-10T02:00:00.000Z",
    next_at: null,
  });
  assert.equal(db.query("SELECT status FROM outreach_sends WHERE id = 'snd_1'")[0].status, "skipped");
  const deals = db.query("SELECT title, stage FROM deals");
  assert.deepEqual(deals, [{ title: "Interested (outreach): PT Sample", stage: "lead" }]);
  assert.deepEqual(notified, [{ company: "PT Sample", country: "Indonesia", email: "info@sample.co.id", campaignId: "id-ja", step: 1 }]);

  // Pressed again: nothing new, no second email to Robert, no second deal.
  await handleInterest(request(`/i/${TOKEN}`, "POST"), context());
  await Promise.all(pending);
  assert.equal(notified.length, 1);
  assert.equal(db.query("SELECT COUNT(*) AS n FROM deals")[0].n, 1);
});

test("an unknown token is a neutral 404 and changes nothing", async () => {
  const res = await handleInterest(request("/i/tok_does_not_exist_0000000", "POST"), context());
  assert.equal(res.status, 404);
  assert.equal(notified.length, 0);
});

test("/wa/ opens WhatsApp with a message naming the company, in the local language", async () => {
  const res = await handleInterest(request(`/wa/${TOKEN}`), context());
  assert.equal(res.status, 302);
  const to = new URL(res.headers.get("Location"));
  assert.equal(to.origin + to.pathname, "https://wa.me/6590693236");
  assert.equal(to.searchParams.get("text"), "Halo Pak Robert, saya tertarik. Perusahaan: PT Sample");
  assert.equal(recipient().interested_at, null, "a WhatsApp click records nothing");
});

test("Robert's email names the company and replies to it", async () => {
  const sent = [];
  const notify = notifyByEmail({ RESEND_API_KEY: "re_test", OUTREACH_FROM: "Robert <robert@mail.example>" }, async (_key, email) => {
    sent.push(email);
    return { ok: true, id: "e1" };
  });
  await notify({ company: "PT Sample", country: "Indonesia", email: "info@sample.co.id", campaignId: "id-ja", step: 1 });
  assert.equal(sent[0].subject, "Interested: PT Sample (Indonesia)");
  assert.equal(sent[0].reply_to, "info@sample.co.id");
  assert.match(sent[0].text, /pressed "I am interested"/);
});
