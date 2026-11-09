import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { notifyOwner, outreachStatus, sendOutreach } from "../worker/mailer.ts";
import { Mailer } from "../worker/mailer-entrypoint.ts";
import { OWNER_INBOX } from "../worker/resend.ts";
import { fakeD1 } from "./fake-d1.mjs";
import { TOKEN, captureErrors, fakeFetch, outreachMessage, restoreGlobals } from "./fakes.mjs";

// The Mailer entrypoint hq calls over its service binding
// (worker/mailer-entrypoint.ts, worker/mailer.ts, worker/outreach-rules.ts).

const SENDER = "Robert Rahardja <robert@mail.startech-innovation.com>";
const LINK = `https://startech-innovation.com/u/${TOKEN}`;
let db;
let env;

beforeEach(() => {
  db = fakeD1();
  env = { RESEND_API_KEY: "re_test", OUTREACH_FROM: SENDER, CRM_DB: db.d1 };
});
afterEach(restoreGlobals);

test("refuses to send anything until OUTREACH_FROM is set", async () => {
  const calls = fakeFetch();
  for (const sender of [undefined, "", "   "]) {
    const result = await sendOutreach({ ...env, OUTREACH_FROM: sender }, outreachMessage());
    assert.deepEqual(result, { ok: false, error: "sender-not-configured" });
  }
  assert.equal(calls.length, 0);
});

test("the entrypoint class hq binds to delegates each RPC method with the Worker's env", async () => {
  const calls = fakeFetch(() => Response.json({ id: "email_1", last_event: "delivered" }));
  const mailer = new Mailer({}, { RESEND_API_KEY: "re_test", CRM_DB: db.d1 });

  assert.deepEqual(await mailer.send(outreachMessage()), { ok: false, error: "sender-not-configured" });
  assert.equal(calls.length, 0);
  assert.deepEqual(await mailer.status("email_1"), { ok: true, id: "email_1", lastEvent: "delivered" });
  assert.deepEqual(await mailer.notifyOwner("Outreach: week 45", "Sent 12."), { ok: true, id: "email_1" });
  assert.deepEqual(calls[1].body.to, [OWNER_INBOX]);
});

test("refuses a message without the unsubscribe link or the postal address", async () => {
  const calls = fakeFetch();
  const cases = [
    "Hello.\n\nStarTech Innovation Pte Ltd, 1003 Bukit Merah Central #06-07, Singapore 159836",
    `Hello.\n\nUnsubscribe: ${LINK}`,
    // A link to some other site's /u/ page does not count.
    `Hello.\n\n1003 Bukit Merah Central, Singapore 159836\nhttps://example.com/u/${TOKEN}`,
    // Nor does a token too short to be one of hq's.
    "Hello.\n\n1003 Bukit Merah Central, Singapore 159836\nhttps://startech-innovation.com/u/abc",
  ];
  for (const text of cases) {
    const result = await sendOutreach(env, outreachMessage({ text }));
    assert.deepEqual(result, { ok: false, error: "missing-required-footer" }, text);
  }
  // The HTML part needs the footer too, not only the text part.
  const htmlOnlyBody = await sendOutreach(env, outreachMessage({ html: "<p>Hello.</p>" }));
  assert.deepEqual(htmlOnlyBody, { ok: false, error: "missing-required-footer" });
  assert.equal(calls.length, 0);
});

test("accepts the footer in HTML, wrapped across lines and with &nbsp;", async () => {
  const calls = fakeFetch();
  const html = `<p>Hello.</p><p>1003&nbsp;Bukit Merah Central #06-07,<br>\nSingapore&nbsp;159836</p><a href="${LINK}">Unsubscribe</a>`;
  const result = await sendOutreach(env, outreachMessage({ html }));
  assert.deepEqual(result, { ok: true, id: "email_1" });
  assert.equal(calls[0].body.html, html);
});

test("refuses header injection in every field that becomes a header", async () => {
  const calls = fakeFetch();
  const cases = [
    [{ subject: "Hello\r\nBcc: victim@example.com" }, "invalid-subject"],
    [{ subject: "Hello\nthere" }, "invalid-subject"],
    [{ subject: "Hello there" }, "invalid-subject"],
    [{ subject: "x".repeat(201) }, "invalid-subject"],
    [{ subject: "" }, "invalid-subject"],
    [{ to: "info@example.co.jp\r\nBcc: victim@example.com" }, "invalid-to"],
    [{ to: "info@example.co.jp, sales@example.co.jp" }, "invalid-to"],
    [{ to: "Info Desk <info@example.co.jp>" }, "invalid-to"],
    [{ to: ["info@example.co.jp"] }, "invalid-to"],
    [{ replyTo: "robert@startech-innovation.com\nBcc: victim@example.com" }, "invalid-reply-to"],
    [{ headers: { "List-Unsubscribe": `<${LINK}>\r\nBcc: victim@example.com` } }, "invalid-headers"],
    [{ headers: { Bcc: "victim@example.com" } }, "invalid-headers"],
    [{ headers: { From: "someone@else.example" } }, "invalid-headers"],
    [{ headers: ["List-Unsubscribe"] }, "invalid-headers"],
    [{ tags: [{ name: "campaign", value: "jp ja" }] }, "invalid-tags"],
    [{ tags: [{ name: "campaign" }] }, "invalid-tags"],
    [{ idempotencyKey: "send_1\r\nX: y" }, "invalid-idempotency-key"],
  ];
  for (const [overrides, error] of cases) {
    const result = await sendOutreach(env, outreachMessage(overrides));
    assert.deepEqual(result, { ok: false, error }, JSON.stringify(overrides));
  }
  assert.deepEqual(await sendOutreach(env, null), { ok: false, error: "invalid-message" });
  assert.equal(calls.length, 0);
});

test("sends from OUTREACH_FROM to one recipient, with one-click unsubscribe headers", async () => {
  const calls = fakeFetch(() => Response.json({ id: "4ef9a417-02e9-4d39-ad75-9611e0fcc33c" }));
  const message = outreachMessage({
    tags: [{ name: "campaign", value: "jp-ja" }],
    idempotencyKey: "send_42",
  });
  const result = await sendOutreach(env, message);

  assert.deepEqual(result, { ok: true, id: "4ef9a417-02e9-4d39-ad75-9611e0fcc33c" });
  assert.equal(calls.length, 1);
  const [call] = calls;
  assert.equal(call.url, "https://api.resend.com/emails");
  assert.equal(call.method, "POST");
  assert.equal(call.headers.get("Authorization"), "Bearer re_test");
  assert.equal(call.headers.get("Idempotency-Key"), "send_42");
  assert.deepEqual(call.body, {
    from: SENDER,
    to: ["info@example.co.jp"],
    subject: message.subject,
    text: message.text,
    // The sending subdomain has no mailbox, so replies go to StarTech's inbox.
    reply_to: OWNER_INBOX,
    headers: {
      "List-Unsubscribe": `<${LINK}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
    tags: [{ name: "campaign", value: "jp-ja" }],
  });
});

test("passes hq's own List-Unsubscribe headers and reply-to through", async () => {
  const calls = fakeFetch();
  const headers = {
    "list-unsubscribe": `<${LINK}>, <mailto:robert.rahardja@startech-innovation.com?subject=unsubscribe>`,
    "list-unsubscribe-post": "List-Unsubscribe=One-Click",
  };
  await sendOutreach(env, outreachMessage({ headers, replyTo: "robert.rahardja@startech-innovation.com" }));
  assert.equal(calls[0].body.reply_to, "robert.rahardja@startech-innovation.com");
  assert.deepEqual(calls[0].body.headers, {
    "List-Unsubscribe": headers["list-unsubscribe"],
    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
  });
});

test("refuses a suppressed address in any letter case, and fails closed without the database", async () => {
  const calls = fakeFetch();
  db.query("INSERT INTO outreach_suppression (email, reason, source) VALUES ('INFO@Example.co.jp', 'bounce', 'hq')");
  assert.deepEqual(await sendOutreach(env, outreachMessage()), { ok: false, error: "suppressed" });

  captureErrors();
  const noDatabase = await sendOutreach({ ...env, CRM_DB: undefined }, outreachMessage());
  assert.deepEqual(noDatabase, { ok: false, error: "suppression-check-failed" });
  assert.equal(calls.length, 0);
});

test("reports Resend's refusal and an unreachable Resend without throwing", async () => {
  fakeFetch(() => Response.json({ name: "validation_error", message: "Invalid `to`" }, { status: 422 }));
  assert.deepEqual(await sendOutreach(env, outreachMessage()), {
    ok: false,
    error: "resend-422:validation_error",
  });

  fakeFetch(() => {
    throw new TypeError("fetch failed");
  });
  assert.deepEqual(await sendOutreach(env, outreachMessage()), { ok: false, error: "resend-unreachable" });

  fakeFetch(() => Response.json({}));
  assert.deepEqual(await sendOutreach(env, outreachMessage()), { ok: false, error: "resend-bad-response" });
});

test("status returns Resend's last event for an email", async () => {
  const calls = fakeFetch(() => Response.json({ id: "4ef9a417", last_event: "bounced" }));
  assert.deepEqual(await outreachStatus(env, "4ef9a417"), { ok: true, id: "4ef9a417", lastEvent: "bounced" });
  assert.equal(calls[0].url, "https://api.resend.com/emails/4ef9a417");
  assert.equal(calls[0].method, "GET");

  fakeFetch(() => Response.json({ name: "not_found" }, { status: 404 }));
  assert.deepEqual(await outreachStatus(env, "4ef9a417"), { ok: false, error: "not-found" });

  const none = fakeFetch();
  assert.deepEqual(await outreachStatus(env, "../domains"), { ok: false, error: "invalid-id" });
  assert.deepEqual(await outreachStatus({}, "4ef9a417"), { ok: false, error: "resend-not-configured" });
  assert.equal(none.length, 0);
});

test("notifyOwner reaches StarTech's inbox, from the site domain until OUTREACH_FROM is set", async () => {
  const calls = fakeFetch();
  const report = "Sent 12, replied 1, bounced 0.";
  assert.deepEqual(await notifyOwner({ RESEND_API_KEY: "re_test" }, "Outreach: week 45", report), {
    ok: true,
    id: "email_1",
  });
  assert.equal(calls[0].body.from, "StarTech HQ <hq@mail.startech-innovation.com>");
  assert.deepEqual(calls[0].body.to, [OWNER_INBOX]);
  assert.equal(calls[0].body.text, report);

  await notifyOwner(env, "Outreach: week 45", report);
  assert.equal(calls[1].body.from, SENDER);

  assert.deepEqual(await notifyOwner(env, "Week 45\r\nBcc: x@example.com", report), {
    ok: false,
    error: "invalid-subject",
  });
  assert.deepEqual(await notifyOwner(env, "Week 45", "   "), { ok: false, error: "invalid-text" });
  assert.equal(calls.length, 2);
});

test("the second sending domain: its own sender and key; refused until both are set; unknown senders refused", async () => {
  const calls = fakeFetch();
  const second = { ...env, OUTREACH_FROM_2: "Robert Rahardja <robert@outreach.startech-innovation.com>", RESEND_API_KEY_2: "re_second" };
  assert.deepEqual(await sendOutreach({ ...env, RESEND_API_KEY_2: "re_second" }, { ...outreachMessage(), sender: "secondary" }), { ok: false, error: "sender-not-configured" });
  assert.deepEqual(await sendOutreach({ ...env, OUTREACH_FROM_2: second.OUTREACH_FROM_2 }, { ...outreachMessage(), sender: "secondary" }), { ok: false, error: "resend-not-configured" });
  assert.deepEqual(await sendOutreach(second, { ...outreachMessage(), sender: "tertiary" }), { ok: false, error: "invalid-sender" });
  const before = calls.length;
  await sendOutreach(second, { ...outreachMessage(), sender: "secondary" });
  const sent = calls.slice(before)[0];
  assert.equal(sent.body.from, "Robert Rahardja <robert@outreach.startech-innovation.com>");
  assert.match(sent.headers.get("authorization"), /re_second/);
  await sendOutreach(second, outreachMessage());
  assert.notEqual(calls[calls.length - 1].body.from, sent.body.from); // primary by default
});
