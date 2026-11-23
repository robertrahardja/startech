import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { acknowledgeEnquiry } from "../worker/ack.ts";
import { OWNER_INBOX } from "../worker/resend.ts";
import { captureErrors, fakeFetch, fakeKV, restoreGlobals } from "./fakes.mjs";

// The automatic acknowledgement to a website enquiry (worker/ack.ts).

const SENDER = "Robert Rahardja <robert@mail.startech-innovation.com>";
const env = (overrides = {}) => ({
  RESEND_API_KEY: "re_test",
  OUTREACH_FROM: SENDER,
  RATE_LIMIT: fakeKV(),
  ...overrides,
});
const enquiry = (overrides = {}) => ({
  email: "somchai@example.co.th",
  topic: "",
  locale: "",
  utmCampaign: "",
  hasSpreadsheet: false,
  ...overrides,
});

afterEach(restoreGlobals);

test("sends nothing until OUTREACH_FROM is set", async () => {
  const calls = fakeFetch();
  await acknowledgeEnquiry(env({ OUTREACH_FROM: undefined }), enquiry());
  await acknowledgeEnquiry(env({ OUTREACH_FROM: " " }), enquiry());
  assert.equal(calls.length, 0);
});

test("one short English reply from OUTREACH_FROM, replies going to StarTech's inbox", async () => {
  const calls = fakeFetch();
  await acknowledgeEnquiry(env(), enquiry({ topic: "singpass" }));

  assert.equal(calls.length, 1);
  const { body } = calls[0];
  assert.equal(body.from, SENDER);
  assert.deepEqual(body.to, ["somchai@example.co.th"]);
  assert.equal(body.reply_to, OWNER_INBOX);
  assert.equal(body.subject, "Thank you for your message to StarTech Innovation");
  assert.match(body.text, /within one working day/);
  assert.match(body.text, /the only automatic email you will receive from us/);
  assert.match(body.text, /1003 Bukit Merah Central #06-07, Singapore 159836/);
  assert.doesNotMatch(body.text, /spreadsheet/);
  // Fixed copy only: nothing from the form, not even the address, is echoed.
  assert.doesNotMatch(body.text, /somchai/);
  assert.equal(body.headers["Auto-Submitted"], "auto-replied");
});

test("mentions the spreadsheet only when one was attached", async () => {
  const calls = fakeFetch();
  await acknowledgeEnquiry(env(), enquiry({ hasSpreadsheet: true }));
  assert.match(calls[0].body.text, /We have also received the spreadsheet you attached\./);
});

test("picks the language from the site and, where it varies, the visitor's own", async () => {
  const cases = [
    [{ topic: "indonesia" }, "Terima kasih atas pesan Anda kepada StarTech Innovation"],
    [{ topic: "indonesia", utmCampaign: "indonesia-en" }, "Terima kasih atas pesan Anda kepada StarTech Innovation"],
    [{ topic: "thailand" }, "お問い合わせありがとうございます（StarTech Innovation）"],
    [{ topic: "thailand", utmCampaign: "thailand-ja" }, "お問い合わせありがとうございます（StarTech Innovation）"],
    [{ topic: "thailand", utmCampaign: "thailand-en" }, "Thank you for your message to StarTech Innovation"],
    [{ topic: "vietnam", locale: "en" }, "Thank you for your message to StarTech Innovation"],
    [{ topic: "vietnam", locale: "ja", utmCampaign: "vietnam-en" }, "お問い合わせありがとうございます（StarTech Innovation）"],
    // A tagged campaign says nothing about the language.
    [{ topic: "vietnam", utmCampaign: "flyer-nov" }, "お問い合わせありがとうございます（StarTech Innovation）"],
    // A language we have no copy in reads better in English than in Japanese.
    [{ topic: "thailand", locale: "th" }, "Thank you for your message to StarTech Innovation"],
    [{ topic: "japan" }, "お問い合わせありがとうございます（StarTech Innovation）"],
    [{ topic: "malaysia" }, "Thank you for your message to StarTech Innovation"],
    [{ topic: "philippines", locale: "ja" }, "Thank you for your message to StarTech Innovation"],
    // The main site sends its page locale.
    [{ topic: "", locale: "es" }, "Gracias por su mensaje a StarTech Innovation"],
    [{ topic: "", locale: "pt" }, "Obrigado pela sua mensagem à StarTech Innovation"],
    [{ topic: "", locale: "zh-Hans" }, "感谢您联系 StarTech Innovation"],
    [{ topic: "", locale: "zh-Hant" }, "感謝您聯絡 StarTech Innovation"],
    [{ topic: "", locale: "ja" }, "お問い合わせありがとうございます（StarTech Innovation）"],
    [{ topic: "", locale: "ko" }, "Thank you for your message to StarTech Innovation"],
    [{ topic: "" }, "Thank you for your message to StarTech Innovation"],
  ];
  for (const [overrides, subject] of cases) {
    const calls = fakeFetch();
    await acknowledgeEnquiry(env(), enquiry(overrides));
    assert.equal(calls[0].body.subject, subject, JSON.stringify(overrides));
  }
});

test("Japanese and Indonesian copy say the same things politely", async () => {
  const calls = fakeFetch();
  await acknowledgeEnquiry(env(), enquiry({ topic: "thailand", hasSpreadsheet: true }));
  await acknowledgeEnquiry(env(), enquiry({ topic: "indonesia", hasSpreadsheet: true }));
  const [japanese, indonesian] = calls.map((call) => call.body.text);

  assert.match(japanese, /1営業日以内に、代表取締役のロバート・ラハルジャよりご返信いたします/);
  assert.match(japanese, /添付いただいたファイルも/);
  assert.match(japanese, /自動でお送りするメールはこの1通のみ/);
  assert.match(indonesian, /^Yth\. Bapak\/Ibu,/);
  assert.match(indonesian, /dalam satu hari kerja/);
  assert.match(indonesian, /File yang Anda lampirkan juga sudah kami terima/);
  assert.match(indonesian, /satu-satunya email otomatis/);
});

test("reaches an address at most once a day, whatever the letter case", async () => {
  const calls = fakeFetch();
  const shared = env();
  await acknowledgeEnquiry(shared, enquiry());
  await acknowledgeEnquiry(shared, enquiry({ email: "Somchai@Example.co.th" }));
  await acknowledgeEnquiry(shared, enquiry({ email: "other@example.co.th" }));

  assert.deepEqual(calls.map((call) => call.body.to[0]), ["somchai@example.co.th", "other@example.co.th"]);
  // The KV key is a hash; the namespace never holds the address itself.
  for (const key of shared.RATE_LIMIT.store.keys()) assert.match(key, /^ack:[0-9a-f]{64}$/);
});

test("a failure is logged and never thrown", async () => {
  const logged = captureErrors();
  fakeFetch(() => Response.json({ name: "validation_error" }, { status: 403 }));
  await acknowledgeEnquiry(env(), enquiry());

  const brokenKv = { get: async () => { throw new Error("KV unavailable"); } };
  await acknowledgeEnquiry(env({ RATE_LIMIT: brokenKv }), enquiry());

  assert.deepEqual(logged, [
    "Enquiry acknowledgement not sent: resend-403:validation_error",
    "Enquiry acknowledgement failed: KV unavailable",
  ]);
});
