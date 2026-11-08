#!/usr/bin/env node
/**
 * Records how the running Worker answers a fixed set of requests, and
 * compares two such records. Written for the worker/index.ts split, a pure
 * refactor: snapshot the old code, then compare the new one against it, and
 * every status, header and body has to match.
 *
 *   npm run build
 *   npx wrangler dev --port 5270 --persist-to "$(mktemp -d)" &
 *   npm run check:parity -- snapshot /tmp/before.json
 *   # change the Worker, rebuild, restart wrangler dev on a fresh --persist-to
 *   npm run check:parity -- compare /tmp/before.json
 *
 * Compare against a snapshot taken from the same `npm run build`: wrangler
 * dev's asset ETags change with every rebuild even when the files do not.
 *
 * BASE overrides http://localhost:5270.
 *
 * The local CRM database starts empty, so /u/ answers 503 and a valid form
 * reaches neither the CRM nor Resend (502). That is a fair comparison too,
 * but to exercise the real paths give the --persist-to directory the CRM
 * schema before starting the server: st_dasboard's migrations
 * 0001_crm_init.sql and 0007_outreach.sql, plus one outreach recipient whose
 * unsub_token is PARITY_TOKEN below, via
 *   npx wrangler d1 execute startech-crm --local --persist-to <dir> --file <seed.sql>
 *
 * Nothing is emailed: wrangler dev has no Resend key unless .dev.vars sets
 * one. Every form request fails validation, except the "valid" cases, which
 * run only against localhost because they would otherwise file a real lead.
 *
 * Rate-limit counters live in KV and every request comes from the same IP,
 * so start each server on a fresh --persist-to and run this once per start.
 * The last /api/contact and /api/testimonial cases are the fourth request
 * inside the 3-per-minute limit, so locally they are the 429.
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";

const BASE = process.env.BASE ?? "http://localhost:5270";
const LOCAL = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(BASE);

const SITE = "https://startech-innovation.com";
const COUNTRY_SITE = "https://indonesia.startech-innovation.com";
const FOREIGN = "https://example.com";

/** The unsub_token of the one recipient a seeded local CRM holds. */
const PARITY_TOKEN = "tok_parity_check_0000000001";

/** Headers that change from one response to the next on their own. */
const VOLATILE = new Set(["date", "cf-ray", "report-to", "nel", "server-timing"]);

const xhr = (origin) => ({
  Origin: origin,
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
});

const VALID_CONTACT = {
  name: "Parity Check",
  email: "parity@example.com",
  message: "Checking the Worker answers the same before and after a refactor.",
  company: "Example Pte Ltd",
  topic: "indonesia",
  utm_source: "linkedin",
};

const VALID_TESTIMONIAL = {
  name: "Parity Check",
  role: "Director",
  company: "Example Pte Ltd",
  email: "parity@example.com",
  quote: "A testimonial long enough to pass the twenty-character minimum.",
  credit: "anonymous",
  consent: true,
};

function spreadsheetForm() {
  const form = new FormData();
  for (const [key, value] of Object.entries(VALID_CONTACT)) form.set(key, value);
  // The extension is the check under test: .txt is not a spreadsheet.
  form.set("spreadsheet", new File(["a,b\n1,2\n"], "stock.txt", { type: "text/plain" }));
  return form;
}

/** Each case: [name, path, RequestInit, { localOnly }]. Order matters (rate limits). */
const CASES = [
  // Pages: static assets, the SPA fallback, locale markup and #root stripping.
  ["GET /", "/", {}],
  ["GET /ja", "/ja", {}],
  ["GET /ko/solutions", "/ko/solutions", {}],
  ["GET /flyer", "/flyer", {}],
  ["GET /solutions", "/solutions", {}],
  ["GET /solutions/invoice-scanner", "/solutions/invoice-scanner", {}],
  ["GET /singpass", "/singpass", {}],
  ["GET /invoicenow", "/invoicenow", {}],
  ["GET /testimonial", "/testimonial", {}],
  ["GET /no-such-page (SPA fallback)", "/no-such-page", {}],
  ["GET /fonts/inter-latin.woff2", "/fonts/inter-latin.woff2", {}],
  ["GET /noto-sans-sc-OFL.txt", "/noto-sans-sc-OFL.txt", {}],

  // Unsubscribe (worker/unsubscribe.ts).
  ["GET /u/<unknown token>", "/u/notarealtoken1234567890", {}],
  ["GET /u/<seeded token>", `/u/${PARITY_TOKEN}`, {}],
  ["GET /u/<malformed token>", "/u/short", {}],
  ["PUT /u/<token> (405)", "/u/notarealtoken1234567890", { method: "PUT" }],

  // Singpass relying party and mock server.
  ["GET /.well-known/jwks.json", "/.well-known/jwks.json", {}],
  ["GET /singpass/callback", "/singpass/callback", {}],
  ["GET staging/config", "/api/demo/singpass/staging/config", {}],
  ["GET staging/<unknown>", "/api/demo/singpass/staging/nope", {}],
  ["GET mock discovery", "/api/demo/singpass/fapi/.well-known/openid-configuration", {}],
  ["GET mock <unknown>", "/api/demo/singpass/nope", {}],
  ["POST mock par, foreign origin", "/api/demo/singpass/fapi/par", { method: "POST", headers: { Origin: FOREIGN } }],

  // CORS preflight.
  ["OPTIONS /api/contact, country site", "/api/contact", { method: "OPTIONS", headers: { Origin: COUNTRY_SITE } }],
  ["OPTIONS /api/contact, foreign origin", "/api/contact", { method: "OPTIONS", headers: { Origin: FOREIGN } }],

  // The API gate: origin, method, routing.
  ["POST /api/contact, no origin", "/api/contact", { method: "POST", body: "{}" }],
  ["GET /api/contact, allowed origin (405)", "/api/contact", { headers: { Origin: SITE } }],
  ["POST /api/nope, allowed origin (404)", "/api/nope", { method: "POST", headers: xhr(SITE), body: "{}" }],
  ["POST /api/chat (disabled)", "/api/chat", { method: "POST", headers: xhr(SITE), body: '{"message":"hi"}' }],
  ["POST /api/tts (disabled)", "/api/tts", { method: "POST", headers: xhr(SITE), body: '{"text":"hi"}' }],
  ["POST /api/demo, empty", "/api/demo", { method: "POST", headers: xhr(SITE), body: "{}" }],

  // /api/contact: 3 per minute per IP. The foreign-origin request is refused
  // before the rate limit, so it does not count.
  ["POST /api/contact {}, foreign origin", "/api/contact", { method: "POST", headers: xhr(FOREIGN), body: "{}" }],
  ["POST /api/contact {}, country site", "/api/contact", { method: "POST", headers: xhr(COUNTRY_SITE), body: "{}" }],
  [
    "POST /api/contact multipart, .txt attached",
    "/api/contact",
    { method: "POST", headers: { Origin: SITE, "X-Requested-With": "XMLHttpRequest" }, body: spreadsheetForm() },
  ],
  [
    "POST /api/contact valid (local only)",
    "/api/contact",
    { method: "POST", headers: xhr(COUNTRY_SITE), body: JSON.stringify(VALID_CONTACT) },
    { localOnly: true },
  ],
  ["POST /api/contact, no X-Requested-With", "/api/contact", { method: "POST", headers: { Origin: SITE }, body: "{}" }],

  // /api/testimonial: the same limit.
  ["POST /api/testimonial {}", "/api/testimonial", { method: "POST", headers: xhr(SITE), body: "{}" }],
  [
    "POST /api/testimonial honeypot",
    "/api/testimonial",
    { method: "POST", headers: xhr(SITE), body: JSON.stringify({ website: "http://spam.example" }) },
  ],
  [
    "POST /api/testimonial valid (local only)",
    "/api/testimonial",
    { method: "POST", headers: xhr(SITE), body: JSON.stringify(VALID_TESTIMONIAL) },
    { localOnly: true },
  ],
  ["POST /api/testimonial, no X-Requested-With", "/api/testimonial", { method: "POST", headers: { Origin: SITE }, body: "{}" }],
];

async function record([name, path, init]) {
  const res = await fetch(`${BASE}${path}`, { redirect: "manual", ...init });
  const bytes = Buffer.from(await res.arrayBuffer());
  const headers = Object.fromEntries(
    [...res.headers].filter(([key]) => !VOLATILE.has(key)).sort(([a], [b]) => a.localeCompare(b))
  );
  const type = headers["content-type"] ?? "";
  const textual = /json|text\/plain/.test(type) && bytes.length <= 4000;
  return {
    name,
    status: res.status,
    statusText: res.statusText,
    headers,
    bodyBytes: bytes.length,
    bodySha256: createHash("sha256").update(bytes).digest("hex"),
    ...(textual ? { body: bytes.toString("utf8") } : {}),
    ...(type.includes("text/html") ? { html: htmlSummary(bytes.toString("utf8")) } : {}),
  };
}

/** What the Worker rewrites in the HTML shell, for a readable report. */
function htmlSummary(html) {
  return {
    lang: html.match(/<html[^>]*\blang="([^"]*)"/)?.[1] ?? null,
    alternates: (html.match(/rel="alternate"/g) ?? []).length,
    rootEmpty: /<div id="root"><\/div>/.test(html),
  };
}

async function snapshot() {
  const results = [];
  for (const c of CASES) {
    if (c[3]?.localOnly && !LOCAL) continue;
    results.push(await record(c));
  }
  return { base: BASE, results };
}

function line(r) {
  const extra = r.html
    ? ` lang=${r.html.lang} alternates=${r.html.alternates} rootEmpty=${r.html.rootEmpty}`
    : r.body
      ? ` ${r.body.replace(/\s+/g, " ").slice(0, 90)}`
      : "";
  return `${String(r.status).padEnd(4)} ${r.name.padEnd(46)} ${(r.headers["content-type"] ?? "-").padEnd(32)} ${String(r.bodyBytes).padStart(7)}B${extra}`;
}

function diff(before, after) {
  const problems = [];
  for (const key of ["status", "statusText", "bodyBytes", "bodySha256", "body"]) {
    if (before[key] !== after[key]) problems.push(`${key}: ${JSON.stringify(before[key])} -> ${JSON.stringify(after[key])}`);
  }
  const names = new Set([...Object.keys(before.headers), ...Object.keys(after.headers)]);
  for (const header of [...names].sort()) {
    if (before.headers[header] !== after.headers[header]) {
      problems.push(`header ${header}: ${JSON.stringify(before.headers[header])} -> ${JSON.stringify(after.headers[header])}`);
    }
  }
  return problems;
}

const [mode, file] = process.argv.slice(2);
if (!["snapshot", "compare"].includes(mode) || !file) {
  console.error("usage: check-worker-parity.mjs snapshot|compare <file.json>");
  process.exit(2);
}

const current = await snapshot();
for (const r of current.results) console.log(line(r));

if (mode === "snapshot") {
  writeFileSync(file, `${JSON.stringify(current, null, 2)}\n`);
  console.log(`\n${current.results.length} responses recorded in ${file}`);
} else {
  const saved = JSON.parse(readFileSync(file, "utf8"));
  const byName = new Map(saved.results.map((r) => [r.name, r]));
  let failures = 0;
  for (const r of current.results) {
    const before = byName.get(r.name);
    const problems = before ? diff(before, r) : ["not in the saved snapshot"];
    if (problems.length) {
      failures++;
      console.log(`\nDIFFERS  ${r.name}\n  ${problems.join("\n  ")}`);
    }
  }
  const missing = saved.results.filter((r) => !current.results.some((c) => c.name === r.name));
  for (const r of missing) {
    failures++;
    console.log(`\nMISSING  ${r.name}`);
  }
  console.log(
    failures
      ? `\n${failures} of ${saved.results.length} responses differ from ${file}`
      : `\nAll ${current.results.length} responses match ${file}: status, headers and body.`
  );
  process.exit(failures ? 1 : 0);
}
