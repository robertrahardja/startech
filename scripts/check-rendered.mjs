#!/usr/bin/env node
/**
 * Renders each locale homepage in a browser and reports any visible text that
 * is still English.
 *
 * The other two guards read the catalogues; this one reads the page. It exists
 * because the catalogues can be complete and correct while a component still
 * renders a hardcoded English literal that never passes through them — which is
 * how "Ask us", "Before" and the footer links shipped untranslated.
 *
 * Needs a server on :4321, so it is deliberately NOT part of `check:i18n`:
 *   npm run build && npm run preview -- --port 4321 &
 *   npm run check:rendered
 *
 * Set CHROME_PATH to override the browser binary.
 */
import { chromium } from "playwright";
import { build } from "esbuild";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const outdir = mkdtempSync(join(tmpdir(), "scan-"));
await build({ entryPoints: ["src/i18n/en.ts"], outdir, format: "esm", logLevel: "silent" });
const en = Object.values(await import(join(outdir, "en.js")))[0];

const values = [];
(function walk(n) {
  for (const v of Object.values(n)) {
    if (typeof v === "string") values.push(v);
    else if (v && typeof v === "object") walk(v);
  }
})(en);

// Legitimately identical in every language: the legal entity, its registration
// number, the founder's name, and bare figures.
const SHARED = /^(StarTech|UEN |Robert Rahardja|[\d\s.,+%-]+)/;
const needles = [...new Set(values)].filter((v) => v.length >= 6 && !SHARED.test(v));

// Uses the Chromium already on this machine rather than pinning a download:
// the playwright package and the installed browser builds drift apart, and a
// version mismatch fails with a download prompt rather than a useful result.
const CHROME =
  process.env.CHROME_PATH ??
  "/home/rr/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome";

const browser = await chromium.launch({ executablePath: CHROME });
const page = await browser.newPage();
let bad = 0;

for (const loc of ["ja", "ko", "zh-Hans", "zh-Hant", "es", "pt"]) {
  await page.goto(`${process.env.BASE ?? "http://localhost:4321"}/${loc}/`, { waitUntil: "networkidle" });
  const text = await page.evaluate(() => document.body.innerText);
  // Whole-string containment is not enough: English "Contact" is a substring
  // of Spanish "Contacto", which reported a leak that was not there. Require a
  // non-letter (or an edge) on both sides so only a standalone run matches.
  const hits = needles.filter((n) => {
    const at = text.indexOf(n);
    if (at < 0) return false;
    const before = text[at - 1];
    const after = text[at + n.length];
    const letter = /\p{L}/u;
    return (
      (before === undefined || !letter.test(before)) &&
      (after === undefined || !letter.test(after))
    );
  });
  if (hits.length) {
    bad += hits.length;
    console.log(`\n${loc}: ${hits.length} English string(s) visible`);
    for (const h of hits.slice(0, 10)) console.log(`   "${h.slice(0, 70)}"`);
  } else {
    console.log(`${loc}: clean`);
  }
}

await browser.close();
process.exit(bad ? 1 : 0);
