#!/usr/bin/env node
/**
 * Guards the translation catalogues against the failure modes that are easy to
 * introduce and hard to spot in a language you do not read.
 *
 * Written after Cyrillic characters twice appeared in the Japanese file — the
 * kind of slip a human reviewer catches instantly but which survives a build,
 * a typecheck and a screenshot review.
 *
 * Run: node scripts/check-locales.mjs
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const DIR = "src/i18n";

/** Scripts each locale is allowed to contain, beyond Latin and punctuation. */
const ALLOWED = {
  en: /^[\p{Script=Latin}]$/u,
  es: /^[\p{Script=Latin}]$/u,
  pt: /^[\p{Script=Latin}]$/u,
  ja: /^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Latin}]$/u,
  ko: /^[\p{Script=Hangul}\p{Script=Han}\p{Script=Latin}]$/u,
  "zh-Hans": /^[\p{Script=Han}\p{Script=Latin}]$/u,
  "zh-Hant": /^[\p{Script=Han}\p{Script=Latin}]$/u,
};

/** Always wrong, in every language. */
const FORBIDDEN = /[\p{Script=Cyrillic}\p{Script=Arabic}\p{Script=Hebrew}\p{Script=Devanagari}\p{Script=Thai}]/u;

let failures = 0;

for (const file of readdirSync(DIR)) {
  const locale = file.replace(/\.tsx?$/, "");
  if (!(locale in ALLOWED)) continue;

  const source = readFileSync(join(DIR, file), "utf8");

  // Only the string literals matter; comments and identifiers are English.
  const strings = source.match(/"(?:[^"\\]|\\.)*"/g) ?? [];

  for (const literal of strings) {
    const bad = [...literal].find((ch) => FORBIDDEN.test(ch));
    if (bad) {
      console.error(
        `${file}: unexpected ${bad} (U+${bad
          .codePointAt(0)
          .toString(16)
          .toUpperCase()}) in ${literal.slice(0, 60)}`
      );
      failures++;
    }
  }
}

if (failures) {
  console.error(`\n${failures} problem(s) found in the locale catalogues.`);
  process.exit(1);
}

console.log("Locale catalogues clean.");
