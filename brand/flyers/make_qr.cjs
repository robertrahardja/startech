#!/usr/bin/env node
// Writes one flyer QR code as SVG with the qrcode package, at the version
// the repo's apps/japan pins (1.5.4). render_flyers.py calls this only when a
// flyer's link has changed: the SVGs in qr/ are committed, so a normal
// re-render needs neither Node nor qrcode.
//
//   NODE_PATH=<a node_modules with qrcode> node make_qr.cjs <url> <out.svg>
"use strict";

const fs = require("fs");

const [url, out] = process.argv.slice(2);
if (!url || !out) {
  console.error("usage: node make_qr.cjs <url> <out.svg>");
  process.exit(64);
}
// The URL is kept in a leading XML comment so the renderer can tell whether
// the code is stale; "--" is not allowed inside one.
if (url.includes("--")) {
  console.error(`cannot store ${url} in an XML comment (contains "--")`);
  process.exit(65);
}

let QRCode;
try {
  QRCode = require("qrcode");
} catch {
  console.error(
    "qrcode not found. Point NODE_PATH at a node_modules that has " +
      "qrcode@1.5.4, e.g. apps/japan/node_modules on the japan-flyer branch."
  );
  process.exit(2);
}

// Level M (15% recovery) keeps the code at version 4 for these URLs, so the
// modules stay large; nothing is drawn over the code, so H is not needed.
QRCode.toString(url, {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 4,
  color: { dark: "#000000", light: "#ffffff" },
})
  .then((svg) => fs.writeFileSync(out, `<!-- ${url} -->\n${svg}\n`))
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
