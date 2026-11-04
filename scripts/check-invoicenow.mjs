#!/usr/bin/env node
/**
 * Tests for the /invoicenow demo's PINT SG builder (src/lib/invoicenow).
 *
 * The repo has no unit-test runner, so this follows the check-* scripts:
 * esbuild strips the types, Node runs plain assertions. Covers totals and
 * half-up rounding, which checks pass for the valid sample and which fail
 * for the broken one, XML escaping, the CSV template, and (when xmllint is
 * installed) that the generated XML is well-formed.
 *
 * Run: npm run check:invoicenow
 */
import { build } from "esbuild";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const outdir = mkdtempSync(join(tmpdir(), "startech-invoicenow-"));
await build({
  entryPoints: ["src/lib/invoicenow/pintSg.ts", "src/lib/invoicenow/csv.ts"],
  outdir,
  format: "esm",
  bundle: true,
  logLevel: "silent",
});
const pint = await import(join(outdir, "pintSg.js"));
const csv = await import(join(outdir, "csv.js"));

const UUID = "2523149b-cb40-4b32-9004-debca57b80ee";
let passed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
    console.log(`  ok  ${name}`);
  } catch (err) {
    console.error(`  FAIL ${name}\n${err.message}`);
    process.exitCode = 1;
  }
}

const failing = (inv) => pint.runChecks(inv).filter((c) => !c.pass).map((c) => c.key).sort();

function wellFormed(xml, label) {
  let hasXmllint = true;
  try {
    execFileSync("xmllint", ["--version"], { stdio: "ignore" });
  } catch {
    hasXmllint = false;
  }
  if (!hasXmllint) return;
  const file = join(outdir, `${label}.xml`);
  writeFileSync(file, xml);
  execFileSync("xmllint", ["--noout", file], { stdio: "pipe" });
}

test("sample invoice: totals, rounded half-up per GST category", () => {
  const inv = pint.buildInvoice(pint.sampleInvoice(), UUID);
  // 3 x 129.90 = 389.70; 2.5 x 45.00 = 112.50; 1 x 80.00 = 80.00
  assert.deepEqual(inv.lines.map((l) => l.lineExtensionAmount), ["389.70", "112.50", "80.00"]);
  // SR taxable 502.20 x 9% = 45.198 -> 45.20; ZR 80.00 x 0% = 0.00
  assert.deepEqual(
    inv.taxSubtotals.map((s) => [s.category, s.percent, s.taxableAmount, s.taxAmount]),
    [["SR", "9", "502.20", "45.20"], ["ZR", "0", "80.00", "0.00"]]
  );
  assert.equal(inv.lineExtensionAmount, "582.20");
  assert.equal(inv.taxExclusiveAmount, "582.20");
  assert.equal(inv.taxAmount, "45.20");
  assert.equal(inv.taxInclusiveAmount, "627.40");
  assert.equal(inv.payableAmount, "627.40");
});

test("sample invoice: every check passes", () => {
  assert.deepEqual(failing(pint.buildInvoice(pint.sampleInvoice(), UUID)), []);
});

test("broken sample: exactly the expected checks fail", () => {
  assert.deepEqual(failing(pint.buildInvoice(pint.brokenSampleInvoice(), UUID)), [
    "buyerAddress", // BR-107-GST-SG
    "buyerReference", // PEPPOL-EN16931-R003-SG
    "dueOrTerms", // BR-CO-25-SG
    "noGst", // BR-NG-11-GST-SG, BR-NG-12-GST-SG
    "sellerGstId", // BR-105-GST-SG
  ]);
});

test("rounding: half-up at the half cent, no float drift", () => {
  const base = pint.sampleInvoice();
  const one = (unitPrice, quantity = "1") => ({
    ...base,
    lines: [{ description: "x", quantity, unitCode: "H87", unitPrice, gstCategory: "SR" }],
  });
  // 0.50 x 9% = 0.045 -> 0.05 (a float multiply gives 0.045000000000000005 or 0.04499…)
  assert.equal(pint.buildInvoice(one("0.50"), UUID).taxAmount, "0.05");
  // 0.05 x 9% = 0.0045 -> 0.00
  assert.equal(pint.buildInvoice(one("0.05"), UUID).taxAmount, "0.00");
  // 3 x 0.1 = 0.30 exactly (0.30000000000000004 in floats)
  assert.equal(pint.buildInvoice(one("0.1", "3"), UUID).lineExtensionAmount, "0.30");
  // 1.005 rounds to 1.01 (toFixed gives 1.00)
  assert.equal(pint.buildInvoice(one("1.005"), UUID).lineExtensionAmount, "1.01");
  // 4-decimal price and quantity
  assert.equal(pint.buildInvoice(one("12.3456", "0.3333"), UUID).lineExtensionAmount, "4.11");
});

test("empty fields are omitted, never written empty (ibr-079)", () => {
  const xml = pint.toXml(pint.buildInvoice(pint.brokenSampleInvoice(), UUID));
  assert.ok(!/<(cbc:[A-Za-z]+)[^>]*><\/\1>/.test(xml), "found an empty element");
  assert.ok(!xml.includes("<cbc:BuyerReference>"));
  assert.ok(!xml.includes("<cbc:DueDate>"));
});

test("XML: identifiers, UEN endpoint scheme, escaping, well-formed", () => {
  const input = pint.sampleInvoice();
  input.lines[0].description = `Tables & "chairs" <set>`;
  const xml = pint.toXml(pint.buildInvoice(input, UUID));
  assert.ok(xml.includes("<cbc:CustomizationID>urn:peppol:pint:billing-1@sg-1</cbc:CustomizationID>"));
  assert.ok(xml.includes("<cbc:ProfileID>urn:peppol:bis:billing</cbc:ProfileID>"));
  assert.ok(xml.includes('<cbc:EndpointID schemeID="0195">SGUEN201912345A</cbc:EndpointID>'));
  assert.ok(xml.includes("<cbc:Name>Tables &amp; &quot;chairs&quot; &lt;set&gt;</cbc:Name>"));
  assert.ok(xml.includes("SAMPLE DATA"));
  wellFormed(xml, "sample");
  wellFormed(pint.toXml(pint.buildInvoice(pint.brokenSampleInvoice(), UUID)), "broken");
});

test("NG line with a seller GST number fails BR-NG-02 only", () => {
  const input = pint.sampleInvoice();
  input.lines = input.lines.map((l) => ({ ...l, gstCategory: "NG" }));
  // NG-only invoice: the GST-registered rules (BR-105..112) no longer apply.
  assert.deepEqual(failing(pint.buildInvoice(input, UUID)), ["noGstNumber"]);
  input.seller.gstRegNo = "";
  assert.deepEqual(failing(pint.buildInvoice(input, UUID)), []);
});

test("UEN shape check flags a malformed UEN", () => {
  const input = pint.sampleInvoice();
  input.buyer.uen = "12345";
  assert.deepEqual(failing(pint.buildInvoice(input, UUID)), ["uenFormat"]);
});

test("CSV template round-trips, including a quoted comma", () => {
  const result = csv.invoiceFromCsv(csv.SAMPLE_CSV);
  assert.equal(result.ok, true);
  assert.equal(result.invoice.invoiceNumber, "INV-2026-0107");
  assert.equal(result.invoice.lines.length, 3);
  assert.equal(result.invoice.lines[1].description, "Spare parts, set of 4");
  assert.equal(result.invoice.lines[2].unitCode, "HUR");
  assert.equal(result.skippedInvoices, 0);
  const full = { ...pint.sampleInvoice(), ...result.invoice, paymentTerms: "" };
  assert.deepEqual(failing(pint.buildInvoice(full, UUID)), []);
});

test("CSV: missing columns and extra invoices are reported", () => {
  const bad = csv.invoiceFromCsv("invoice_number,description\nA,x\n");
  assert.equal(bad.ok, false);
  assert.equal(bad.error, "missingColumns");
  const two = csv.SAMPLE_CSV + csv.SAMPLE_CSV.split("\r\n")[1].replace("INV-2026-0107", "INV-2") + "\r\n";
  assert.equal(csv.invoiceFromCsv(two).skippedInvoices, 1);
});

console.log(process.exitCode ? "\nInvoiceNow checks failed." : `\nInvoiceNow checks: ${passed} passed.`);
