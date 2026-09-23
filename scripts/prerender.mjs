#!/usr/bin/env node
/**
 * Prerenders the homepage's HTML at build time and writes it into
 * dist/index.html, so the browser has real content to paint before any JS
 * has run — a client-rendered React app otherwise ships an empty
 * <div id="root"> and the visitor stares at a blank (here, solid black)
 * screen until the main bundle downloads, parses and executes. React still
 * hydrates over this markup exactly as before; nothing about the runtime
 * behaviour changes, only what's on screen for the first paint.
 *
 * Only the homepage is prerendered — see entry-server.tsx for why "/" is
 * the only path this can meaningfully cover. Every other route (solutions
 * index, individual solution pages, non-English locales) is unaffected and
 * stays purely client-rendered, same as before this existed.
 *
 * Run after `vite build` (see package.json's build script) and after a
 * separate `vite build --ssr src/entry-server.tsx`, which produces the
 * dist-ssr/entry-server.js this script imports.
 */
import { readFileSync, writeFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const distIndex = resolve(root, "dist/index.html");
const ssrEntry = resolve(root, "dist-ssr/entry-server.js");

const { render } = await import(ssrEntry);
const appHtml = render();

const html = readFileSync(distIndex, "utf-8");
const marker = '<div id="root"></div>';

if (!html.includes(marker)) {
  throw new Error(
    `prerender: expected to find ${JSON.stringify(marker)} in dist/index.html — ` +
      "has the root element's markup changed?"
  );
}

writeFileSync(distIndex, html.replace(marker, `<div id="root">${appHtml}</div>`));

// dist-ssr only exists to produce entry-server.js for this script; nothing
// in it is deployed, so there's no reason to ship it or leave it on disk.
rmSync(resolve(root, "dist-ssr"), { recursive: true, force: true });

console.log("Prerendered homepage HTML written to dist/index.html");
