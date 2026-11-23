#!/usr/bin/env node
/**
 * Reports catalogue values that are still identical to English.
 *
 * Written after several strings shipped untranslated because they were left
 * hardcoded in a component rather than read from the catalogue — a section
 * subtitle in Spanish sat in English under a Spanish heading, and a
 * marker-based scan missed it because it only looked for a handful of known
 * phrases.
 *
 * Compares the real objects rather than the source text: an earlier attempt
 * used a regex over the file and matched across line boundaries, capturing
 * fragments of code instead of values.
 *
 * Run: npm run check:untranslated
 *
 * Uses esbuild (already a Vite dependency) to strip the types, since Node
 * cannot import a .ts file that carries `import type` statements.
 */
import { build } from "esbuild";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

/**
 * Strings that are legitimately the same in every language: the legal entity,
 * its registration number, and bare figures.
 */
const SHARED = [
  /^StarTech/,
  /^UEN /,
  /^[\d.,+%\s]+$/,
];

/** Walks a nested object, yielding [dottedKey, value] for every string. */
function* strings(node, prefix = "") {
  for (const [key, value] of Object.entries(node)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "string") {
      yield [path, value];
    } else if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const item = value[i];
        if (typeof item === "string") {
          yield [`${path}[${i}]`, item];
        } else if (item && typeof item === "object") {
          yield* strings(item, `${path}[${i}]`);
        }
      }
    } else if (value && typeof value === "object") {
      for (const pair of strings(value, path)) yield pair;
    }
  }
}

const LOCALE_FILES = ["en", "ja", "ko", "zh-Hans", "zh-Hant", "es", "pt"];

const outdir = mkdtempSync(join(tmpdir(), "startech-i18n-"));
await build({
  entryPoints: LOCALE_FILES.map((l) => `src/i18n/${l}.ts`),
  outdir,
  format: "esm",
  bundle: false,
  logLevel: "silent",
});

const load = async (locale) =>
  Object.values(await import(join(outdir, `${locale}.js`)))[0];

const en = await load("en");

const enByKey = new Map(strings(en));
let failures = 0;

for (const locale of LOCALE_FILES.filter((l) => l !== "en")) {
  const catalogue = await load(locale);

  for (const [key, value] of strings(catalogue)) {
    const english = enByKey.get(key);
    if (english === undefined || value !== english) continue;
    if (SHARED.some((allowed) => allowed.test(value))) continue;

    console.error(`${locale}: ${key} is still English — "${value.slice(0, 55)}"`);
    failures++;
  }
}

if (failures) {
  console.error(`\n${failures} untranslated value(s).`);
  process.exit(1);
}

console.log("All catalogue values differ from English.");
