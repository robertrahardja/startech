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
  const press = { at: "2026-11-10T02:00:00.000Z", asn: null, org: null, country: null, ua: null, scanner: true };
  assert.deepEqual(notified, [
    { company: "PT Sample", country: "Indonesia", email: "info@sample.co.id", campaignId: "id-ja", step: 1, press, again: false },
  ]);

  // Pressed again: nothing new, no second email to Robert, no second deal.
  await handleInterest(request(`/i/${TOKEN}`, "POST"), context());
  await Promise.all(pending);
  assert.equal(notified.length, 1);
  assert.equal(db.query("SELECT COUNT(*) AS n FROM deals")[0].n, 1);
  assert.equal(JSON.parse(db.query("SELECT interest_presses FROM outreach_recipients")[0].interest_presses).length, 2);
});

const CHROME = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36";
const pressFrom = (cf) => {
  const r = new Request(`https://startech-innovation.com/i/${TOKEN}`, {
    method: "POST",
    headers: { "CF-Connecting-IP": "203.0.113.7", "User-Agent": CHROME },
  });
  Object.defineProperty(r, "cf", { value: cf });
  return r;
};

test("each press is kept without the IP; a person after a scanner tells Robert again", async () => {
  await handleInterest(pressFrom({ asn: 8075, asOrganization: "Microsoft Corporation", country: "GB" }), context());
  await handleInterest(pressFrom({ asn: 8075, asOrganization: "Microsoft Corporation", country: "GB" }), context());
  await handleInterest(pressFrom({ asn: 2856, asOrganization: "British Telecommunications PLC", country: "GB" }), context());
  await Promise.all(pending);
  const presses = JSON.parse(db.query("SELECT interest_presses FROM outreach_recipients")[0].interest_presses);
  assert.deepEqual(presses.map((p) => [p.org, p.scanner]), [
    ["Microsoft Corporation", true],
    ["Microsoft Corporation", true],
    ["British Telecommunications PLC", false],
  ]);
  assert.ok(!JSON.stringify(presses).includes("203.0.113.7"), "no IP address is kept");
  assert.deepEqual(notified.map((n) => n.again), [false, true]);
  assert.match(db.query("SELECT notes FROM deals")[0].notes, /Microsoft Corporation \(AS8075\), GB.*automatic link check/);
  // At most five presses are kept.
  for (let i = 0; i < 4; i++) await handleInterest(pressFrom({ asn: 2856, asOrganization: "BT", country: "GB" }), context());
  assert.equal(JSON.parse(db.query("SELECT interest_presses FROM outreach_recipients")[0].interest_presses).length, 5);
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
  const press = { at: "2026-11-10T02:00:00.000Z", asn: 8075, org: "Microsoft Corporation", country: "GB", ua: "Mozilla/5.0", scanner: true };
  const who = { company: "PT Sample", country: "Indonesia", email: "info@sample.co.id", campaignId: "id-ja", step: 1, press, again: false };
  await notify(who);
  assert.equal(sent[0].subject, "Interested: PT Sample (Indonesia)");
  assert.equal(sent[0].reply_to, "info@sample.co.id");
  assert.match(sent[0].text, /pressed "I am interested"/);
  assert.match(sent[0].text, /Microsoft Corporation \(AS8075\), GB.*probably an automatic link check, not a person/);
  await notify({ ...who, again: true, press: { ...press, org: "BT", asn: 2856, scanner: false } });
  assert.equal(sent[1].subject, "Interested again: PT Sample (Indonesia)");
  assert.match(sent[1].text, /probably a person/);
});
