/**
 * PINT SG invoice builder and checks for the /invoicenow demo.
 *
 * Turns a small invoice (what a business keeps in a spreadsheet) into a
 * Peppol PINT SG Billing UBL 2.1 Invoice, and runs a subset of the PINT SG
 * business rules against it, client-side. It is a marketing demo: the output
 * is sample data, not a tax invoice, and these checks are not the official
 * validator. A real connection sends the XML to an IMDA-accredited access
 * point, which runs the full schematron before anything leaves.
 *
 * Every identifier below was taken from the PINT SG Billing v1.4.1 release
 * (released 25 May 2026), https://docs.peppol.eu/poac/sg/pint-sg/ and its
 * resources.zip:
 *   - trn-invoice/schematron/PINT-UBL-validation-preprocessed.sch  ("ibr-*")
 *   - trn-invoice/schematron/PINT-jurisdiction-aligned-rules.sch  ("*-SG")
 *   - trn-invoice/codelist/*.gc                                    (code lists)
 *   - trn-invoice/example/*.xml                                    (examples)
 * Rule IDs on each check are the assert ids in those schematron files.
 *
 * Pure: no DOM, no React, so scripts/check-invoicenow.mjs can run it in Node.
 */

// ---------------------------------------------------------------------------
// Identifiers
// ---------------------------------------------------------------------------

/**
 * BT-24 Specification identifier. Asserted by PEPPOL-EN16931-R004-SG in
 * PINT-jurisdiction-aligned-rules.sch; same value in every official example.
 */
export const CUSTOMIZATION_ID = "urn:peppol:pint:billing-1@sg-1";

/** BT-23 Business process. Asserted by PEPPOL-EN16931-R007-SG. */
export const PROFILE_ID = "urn:peppol:bis:billing";

/** UNCL1001 code 380 "Commercial invoice" (codelist/UNCL1001-inv.gc). */
export const INVOICE_TYPE_CODE = "380";

/**
 * Peppol Electronic Address Scheme 0195, "Singapore UEN identifier"
 * (codelist/eas.gc). The official PINT SG examples write the endpoint value
 * as "SGUEN" + UEN, e.g. <cbc:EndpointID schemeID="0195">SGUEN200212345Z<…>,
 * while PartyLegalEntity/CompanyID carries the bare UEN.
 */
export const UEN_SCHEME = "0195";
export const UEN_ENDPOINT_PREFIX = "SGUEN";

/** The demo only invoices in SGD, so BR-113-GST-SG forbids TaxCurrencyCode. */
export const CURRENCY = "SGD";
export const COUNTRY = "SG";

/** TaxScheme/ID used throughout PINT SG ("GST", not "VAT"). */
export const TAX_SCHEME = "GST";

/**
 * GST category codes offered in the demo: a subset of the 14 codes in
 * codelist/Aligned-TaxCategoryCodes.gc (BR-CL-17/18-GST-SG accept: SR SRCA-S
 * SRCA-C ZR ES33 ESN33 DS OS NA NG SRRC SROVR-RS SROVR-LVG SRLVG). The
 * specialised ones (customer accounting, OVR, reverse charge) are left out
 * of a demo on purpose.
 */
export const GST_CATEGORIES = ["SR", "ZR", "ES33", "ESN33", "OS", "NG"] as const;
export type GstCategory = (typeof GST_CATEGORIES)[number];

/** Every code the spec allows, for BR-CL-18-GST-SG. */
const VALID_CATEGORY_CODES = new Set([
  "SR", "SRCA-S", "SRCA-C", "ZR", "ES33", "ESN33", "DS", "OS", "NA", "NG",
  "SRRC", "SROVR-RS", "SROVR-LVG", "SRLVG",
]);

/**
 * Categories that require the seller's GST number, address, UUID and legal
 * ID (BR-105..BR-112-GST-SG apply to these).
 */
const GST_REGISTERED_CATEGORIES = new Set([
  "SR", "SRCA-S", "SRCA-C", "ZR", "SRRC", "SROVR-RS", "SROVR-LVG", "SRLVG", "NA",
]);

/**
 * Rate per category, as a decimal string. 9% is the standard GST rate from
 * 1 Jan 2024 (IRAS, "Current GST Rates"). Every other category in the demo
 * carries 0, as in the official ZR and NG examples (<cbc:Percent>0<…>).
 * Rates are for the demo only; which category applies is the client's and
 * their accountant's call.
 */
export const GST_RATES: Record<GstCategory, string> = {
  SR: "9",
  ZR: "0",
  ES33: "0",
  ESN33: "0",
  OS: "0",
  NG: "0",
};

/** UNECE Rec 20 unit codes offered (all in codelist/UNECERec20.gc). */
export const UNIT_CODES = ["H87", "HUR", "DAY", "MON"] as const;
export type UnitCode = (typeof UNIT_CODES)[number];

// ---------------------------------------------------------------------------
// Input: what the form (or a CSV row set) provides
// ---------------------------------------------------------------------------

export interface PartyInput {
  name: string;
  uen: string;
  street: string;
  postalCode: string;
  city: string;
}

export interface SellerInput extends PartyInput {
  /** GST registration number (for companies, usually the UEN). */
  gstRegNo: string;
}

export interface LineInput {
  description: string;
  quantity: string;
  unitCode: UnitCode;
  unitPrice: string;
  gstCategory: GstCategory;
}

export interface InvoiceInput {
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  buyerReference: string;
  paymentTerms: string;
  seller: SellerInput;
  buyer: PartyInput;
  lines: LineInput[];
}

// ---------------------------------------------------------------------------
// Decimal arithmetic
//
// Money is never a float here. Quantities and prices are parsed to integers
// scaled by 10^4 (up to 4 decimals accepted), amounts are integer cents, and
// every rounding is half-up to 2 decimals, which is what the BR-DEC rules and
// the "round(x * 10 * 10) div 100" comparisons in the schematron expect.
// ---------------------------------------------------------------------------

const SCALE = 4;
const SCALE_FACTOR = 10n ** BigInt(SCALE);
const DECIMAL_RE = /^\d+(\.\d+)?$/;

/** Non-negative decimal string with at most 4 decimals, scaled by 10^4. */
export function parseScaled(value: string): bigint | null {
  const v = value.trim();
  if (!DECIMAL_RE.test(v)) return null;
  const [whole, frac = ""] = v.split(".");
  if (frac.length > SCALE) return null;
  return BigInt(whole) * SCALE_FACTOR + BigInt(frac.padEnd(SCALE, "0"));
}

/** Integer division rounding half away from zero (inputs are non-negative). */
function divRound(numerator: bigint, divisor: bigint): bigint {
  return (numerator * 2n + divisor) / (divisor * 2n);
}

/** Integer cents to "1234.50". */
export function formatCents(cents: bigint): string {
  const sign = cents < 0n ? "-" : "";
  const abs = cents < 0n ? -cents : cents;
  const whole = abs / 100n;
  const frac = (abs % 100n).toString().padStart(2, "0");
  return `${sign}${whole}.${frac}`;
}

/** Scaled-by-10^4 value to the shortest decimal, keeping `minDecimals`. */
function formatScaled(value: bigint, minDecimals = 0): string {
  const whole = value / SCALE_FACTOR;
  let frac = (value % SCALE_FACTOR).toString().padStart(SCALE, "0").replace(/0+$/, "");
  if (frac.length < minDecimals) frac = frac.padEnd(minDecimals, "0");
  return frac ? `${whole}.${frac}` : `${whole}`;
}

/** "123.45" to cents; only used to re-read our own 2-decimal output. */
function centsOf(amount: string): bigint {
  const [whole, frac = ""] = amount.split(".");
  const negative = whole.startsWith("-");
  const cents = BigInt(whole.replace("-", "")) * 100n + BigInt((frac + "00").slice(0, 2));
  return negative ? -cents : cents;
}

/** quantity × price, both scaled 10^4, to cents (half-up). */
function lineCents(quantity: bigint, price: bigint): bigint {
  return divRound(quantity * price, SCALE_FACTOR * SCALE_FACTOR / 100n);
}

/** taxable cents × rate% (rate scaled 10^4), to cents (half-up). */
function taxCents(taxable: bigint, rate: bigint): bigint {
  return divRound(taxable * rate, 100n * SCALE_FACTOR);
}

/** Line amount for display as the visitor types; null until both parse. */
export function previewLineAmount(quantity: string, unitPrice: string): string | null {
  const qty = parseScaled(quantity);
  const price = parseScaled(unitPrice);
  return qty === null || price === null ? null : formatCents(lineCents(qty, price));
}

// ---------------------------------------------------------------------------
// UBL model: the invoice exactly as it will be serialised
//
// Values are the strings that land in the XML, and an absent optional field is
// `undefined` (never ""), because ibr-079 forbids empty elements. The checks
// read this model, so they test what is actually written, not the form.
// ---------------------------------------------------------------------------

export interface UblParty {
  endpointId?: string;
  streetName?: string;
  cityName?: string;
  postalZone?: string;
  countryCode: string;
  gstId?: string;
  registrationName?: string;
  legalId?: string;
}

export interface UblTaxSubtotal {
  taxableAmount: string;
  taxAmount: string;
  category: string;
  percent: string;
}

export interface UblLine {
  id: string;
  quantity: string;
  unitCode: string;
  lineExtensionAmount: string;
  name?: string;
  category: string;
  percent: string;
  priceAmount: string;
}

export interface UblInvoice {
  customizationId: string;
  profileId: string;
  id?: string;
  uuid: string;
  issueDate?: string;
  dueDate?: string;
  invoiceTypeCode: string;
  currency: string;
  buyerReference?: string;
  supplier: UblParty;
  customer: UblParty;
  paymentTerms?: string;
  taxAmount: string;
  taxSubtotals: UblTaxSubtotal[];
  lineExtensionAmount: string;
  taxExclusiveAmount: string;
  taxInclusiveAmount: string;
  payableAmount: string;
  lines: UblLine[];
}

const opt = (value: string): string | undefined => value.trim() || undefined;

function normaliseUen(value: string): string {
  return value.trim().toUpperCase();
}

function toParty(input: PartyInput, gstRegNo?: string): UblParty {
  const uen = normaliseUen(input.uen);
  return {
    endpointId: uen ? `${UEN_ENDPOINT_PREFIX}${uen}` : undefined,
    streetName: opt(input.street),
    cityName: opt(input.city),
    postalZone: opt(input.postalCode),
    countryCode: COUNTRY,
    gstId: gstRegNo === undefined ? undefined : opt(gstRegNo.toUpperCase()),
    registrationName: opt(input.name),
    legalId: uen || undefined,
  };
}

/**
 * Builds the UBL model and its totals. Assumes quantity and price passed the
 * form's number checks; anything unparseable counts as zero rather than
 * throwing, and then shows up as a failed check instead of a crash.
 *
 * Totals follow the spec's order of operations: line net = round(qty × price)
 * (PEPPOL-EN16931-R120-SG); GST per category = round(taxable × rate)
 * (BR-CO-17-GST-SG); totals are sums of rounded values (BR-CO-10/13/14/15).
 */
export function buildInvoice(input: InvoiceInput, uuid: string): UblInvoice {
  const lines: UblLine[] = input.lines.map((line, i) => {
    const qty = parseScaled(line.quantity) ?? 0n;
    const price = parseScaled(line.unitPrice) ?? 0n;
    return {
      id: String(i + 1),
      quantity: formatScaled(qty),
      unitCode: line.unitCode,
      lineExtensionAmount: formatCents(lineCents(qty, price)),
      name: opt(line.description),
      category: line.gstCategory,
      percent: GST_RATES[line.gstCategory] ?? "0",
      priceAmount: formatScaled(price, 2),
    };
  });

  // One breakdown per distinct category + rate (bis.pdf §3.1.3).
  const groups = new Map<string, { category: string; percent: string; taxable: bigint }>();
  for (const line of lines) {
    const key = `${line.category}|${line.percent}`;
    const group = groups.get(key) ?? { category: line.category, percent: line.percent, taxable: 0n };
    group.taxable += centsOf(line.lineExtensionAmount);
    groups.set(key, group);
  }
  const order = (c: string) => {
    const i = (GST_CATEGORIES as readonly string[]).indexOf(c);
    return i < 0 ? GST_CATEGORIES.length : i;
  };
  const taxSubtotals = [...groups.values()]
    .sort((a, b) => order(a.category) - order(b.category))
    .map((g) => ({
      taxableAmount: formatCents(g.taxable),
      taxAmount: formatCents(taxCents(g.taxable, parseScaled(g.percent) ?? 0n)),
      category: g.category,
      percent: g.percent,
    }));

  const lineTotal = lines.reduce((sum, l) => sum + centsOf(l.lineExtensionAmount), 0n);
  const taxTotal = taxSubtotals.reduce((sum, s) => sum + centsOf(s.taxAmount), 0n);

  return {
    customizationId: CUSTOMIZATION_ID,
    profileId: PROFILE_ID,
    id: opt(input.invoiceNumber),
    uuid,
    issueDate: opt(input.issueDate),
    dueDate: opt(input.dueDate),
    invoiceTypeCode: INVOICE_TYPE_CODE,
    currency: CURRENCY,
    buyerReference: opt(input.buyerReference),
    supplier: toParty(input.seller, input.seller.gstRegNo),
    customer: toParty(input.buyer),
    paymentTerms: opt(input.paymentTerms),
    taxAmount: formatCents(taxTotal),
    taxSubtotals,
    lineExtensionAmount: formatCents(lineTotal),
    // No document-level allowances or charges in the demo, so BT-109 = BT-106.
    taxExclusiveAmount: formatCents(lineTotal),
    taxInclusiveAmount: formatCents(lineTotal + taxTotal),
    // No prepaid amount or rounding, so BT-115 = BT-112.
    payableAmount: formatCents(lineTotal + taxTotal),
    lines,
  };
}

// ---------------------------------------------------------------------------
// XML
// ---------------------------------------------------------------------------

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** One element, or nothing when the value is absent (ibr-079). */
function el(name: string, value: string | undefined, indent: string, attrs = ""): string {
  return value === undefined ? "" : `${indent}<${name}${attrs}>${esc(value)}</${name}>\n`;
}

const amt = (name: string, value: string, indent: string) =>
  el(name, value, indent, ` currencyID="${CURRENCY}"`);

function partyXml(tag: string, p: UblParty): string {
  const i = "      ";
  let x = `  <cac:${tag}>\n    <cac:Party>\n`;
  x += el("cbc:EndpointID", p.endpointId, i, ` schemeID="${UEN_SCHEME}"`);
  x += `${i}<cac:PostalAddress>\n`;
  x += el("cbc:StreetName", p.streetName, i + "  ");
  x += el("cbc:CityName", p.cityName, i + "  ");
  x += el("cbc:PostalZone", p.postalZone, i + "  ");
  x += `${i}  <cac:Country>\n${el("cbc:IdentificationCode", p.countryCode, i + "    ")}${i}  </cac:Country>\n`;
  x += `${i}</cac:PostalAddress>\n`;
  if (p.gstId) {
    x += `${i}<cac:PartyTaxScheme>\n${el("cbc:CompanyID", p.gstId, i + "  ")}`;
    x += `${i}  <cac:TaxScheme>\n${el("cbc:ID", TAX_SCHEME, i + "    ")}${i}  </cac:TaxScheme>\n`;
    x += `${i}</cac:PartyTaxScheme>\n`;
  }
  if (p.registrationName || p.legalId) {
    x += `${i}<cac:PartyLegalEntity>\n`;
    x += el("cbc:RegistrationName", p.registrationName, i + "  ");
    x += el("cbc:CompanyID", p.legalId, i + "  ");
    x += `${i}</cac:PartyLegalEntity>\n`;
  }
  x += `    </cac:Party>\n  </cac:${tag}>\n`;
  return x;
}

function taxCategoryXml(tag: string, category: string, percent: string, indent: string): string {
  return (
    `${indent}<cac:${tag}>\n` +
    el("cbc:ID", category, indent + "  ") +
    el("cbc:Percent", percent, indent + "  ") +
    `${indent}  <cac:TaxScheme>\n${el("cbc:ID", TAX_SCHEME, indent + "    ")}${indent}  </cac:TaxScheme>\n` +
    `${indent}</cac:${tag}>\n`
  );
}

/**
 * Serialises the model as a UBL 2.1 Invoice. Element order follows the UBL
 * 2.1 Invoice schema sequence (UBL-Invoice-2.1.xsd in the spec's
 * common/UBL-Inv-Cred-xsd.zip); the shape follows the official examples.
 */
export function toXml(inv: UblInvoice): string {
  let x = '<?xml version="1.0" encoding="UTF-8"?>\n';
  x +=
    '<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"' +
    ' xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"' +
    ' xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2">\n';
  x += "  <!-- SAMPLE DATA generated by the StarTech InvoiceNow demo. Not a valid tax invoice. -->\n";
  x += el("cbc:UBLVersionID", "2.1", "  ");
  x += el("cbc:CustomizationID", inv.customizationId, "  ");
  x += el("cbc:ProfileID", inv.profileId, "  ");
  x += el("cbc:ID", inv.id, "  ");
  x += el("cbc:UUID", inv.uuid, "  ");
  x += el("cbc:IssueDate", inv.issueDate, "  ");
  x += el("cbc:DueDate", inv.dueDate, "  ");
  x += el("cbc:InvoiceTypeCode", inv.invoiceTypeCode, "  ");
  x += el("cbc:DocumentCurrencyCode", inv.currency, "  ");
  x += el("cbc:BuyerReference", inv.buyerReference, "  ");
  x += partyXml("AccountingSupplierParty", inv.supplier);
  x += partyXml("AccountingCustomerParty", inv.customer);
  if (inv.paymentTerms) {
    x += `  <cac:PaymentTerms>\n${el("cbc:Note", inv.paymentTerms, "    ")}  </cac:PaymentTerms>\n`;
  }
  x += "  <cac:TaxTotal>\n";
  x += amt("cbc:TaxAmount", inv.taxAmount, "    ");
  for (const s of inv.taxSubtotals) {
    x += "    <cac:TaxSubtotal>\n";
    x += amt("cbc:TaxableAmount", s.taxableAmount, "      ");
    x += amt("cbc:TaxAmount", s.taxAmount, "      ");
    x += taxCategoryXml("TaxCategory", s.category, s.percent, "      ");
    x += "    </cac:TaxSubtotal>\n";
  }
  x += "  </cac:TaxTotal>\n";
  x += "  <cac:LegalMonetaryTotal>\n";
  x += amt("cbc:LineExtensionAmount", inv.lineExtensionAmount, "    ");
  x += amt("cbc:TaxExclusiveAmount", inv.taxExclusiveAmount, "    ");
  x += amt("cbc:TaxInclusiveAmount", inv.taxInclusiveAmount, "    ");
  x += amt("cbc:PayableAmount", inv.payableAmount, "    ");
  x += "  </cac:LegalMonetaryTotal>\n";
  for (const line of inv.lines) {
    x += "  <cac:InvoiceLine>\n";
    x += el("cbc:ID", line.id, "    ");
    x += el("cbc:InvoicedQuantity", line.quantity, "    ", ` unitCode="${esc(line.unitCode)}"`);
    x += amt("cbc:LineExtensionAmount", line.lineExtensionAmount, "    ");
    x += "    <cac:Item>\n";
    x += el("cbc:Name", line.name, "      ");
    x += taxCategoryXml("ClassifiedTaxCategory", line.category, line.percent, "      ");
    x += "    </cac:Item>\n";
    x += `    <cac:Price>\n${amt("cbc:PriceAmount", line.priceAmount, "      ")}    </cac:Price>\n`;
    x += "  </cac:InvoiceLine>\n";
  }
  x += "</Invoice>\n";
  return x;
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

/** Keys double as i18n keys: t.invoicenow.checks[key]. */
export type CheckKey =
  | "specIds"
  | "invoiceNumber"
  | "issueDate"
  | "dueOrTerms"
  | "buyerReference"
  | "currency"
  | "sellerName"
  | "buyerName"
  | "sellerEndpoint"
  | "buyerEndpoint"
  | "sellerLegalId"
  | "sellerGstId"
  | "sellerAddress"
  | "buyerAddress"
  | "countries"
  | "uuid"
  | "linesNamed"
  | "lineCategories"
  | "lineAmounts"
  | "netTotals"
  | "gstAmounts"
  | "payable"
  | "decimals"
  | "noGst"
  | "noGstNumber"
  | "uenFormat";

export interface CheckResult {
  key: CheckKey;
  /** Assert ids from the PINT SG v1.4.1 schematron; empty for demo checks. */
  ruleIds: string[];
  pass: boolean;
  /** "spec": modelled on a PINT SG rule. "demo": StarTech's own sanity check. */
  source: "spec" | "demo";
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const UUID_RE = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

/**
 * UEN shapes published by the UEN registry (uen.gov.sg): businesses
 * nnnnnnnnX, local companies yyyynnnnnX, other entities TyyPQnnnnX /
 * SyyPQnnnnX / RyyPQnnnnX. Shape only: no checksum, no registry lookup.
 * Not a PINT SG rule, so it is labelled as a demo check.
 */
const UEN_RE = /^(\d{8}[A-Z]|\d{9}[A-Z]|[TSR]\d{2}[A-Z]{2}\d{4}[A-Z])$/;

/** ibr-073: YYYY-MM-DD and a real calendar date. */
function isIsoDate(value: string): boolean {
  if (!DATE_RE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

const decimalsOk = (amount: string) => (amount.split(".")[1] ?? "").length <= 2;

/** Runs the demo's checks against the model that toXml() serialises. */
export function runChecks(inv: UblInvoice): CheckResult[] {
  const spec = (key: CheckKey, ruleIds: string[], pass: boolean): CheckResult => ({
    key, ruleIds, pass, source: "spec",
  });

  const categories = new Set(inv.taxSubtotals.map((s) => s.category));
  const needsGstSeller = [...categories].some((c) => GST_REGISTERED_CATEGORIES.has(c));
  const hasNgLine = inv.lines.some((l) => l.category === "NG");
  const payable = centsOf(inv.payableAmount);
  const lineSum = inv.lines.reduce((s, l) => s + centsOf(l.lineExtensionAmount), 0n);
  const subtotalTaxSum = inv.taxSubtotals.reduce((s, t) => s + centsOf(t.taxAmount), 0n);

  const amounts = [
    inv.taxAmount, inv.lineExtensionAmount, inv.taxExclusiveAmount, inv.taxInclusiveAmount,
    inv.payableAmount,
    ...inv.taxSubtotals.flatMap((s) => [s.taxableAmount, s.taxAmount]),
    ...inv.lines.map((l) => l.lineExtensionAmount),
  ];

  return [
    spec("specIds", ["PEPPOL-EN16931-R004-SG", "PEPPOL-EN16931-R007-SG"],
      inv.customizationId === CUSTOMIZATION_ID && inv.profileId === PROFILE_ID),
    spec("invoiceNumber", ["ibr-002"], Boolean(inv.id)),
    spec("issueDate", ["ibr-003", "ibr-073"],
      Boolean(inv.issueDate) && isIsoDate(inv.issueDate!) && (!inv.dueDate || isIsoDate(inv.dueDate))),
    spec("dueOrTerms", ["BR-CO-25-SG"], payable <= 0n || Boolean(inv.dueDate || inv.paymentTerms)),
    spec("buyerReference", ["PEPPOL-EN16931-R003-SG"], Boolean(inv.buyerReference)),
    spec("currency", ["ibr-005", "BR-113-GST-SG"], inv.currency === "SGD"),
    spec("sellerName", ["ibr-006"], Boolean(inv.supplier.registrationName)),
    spec("buyerName", ["ibr-007"], Boolean(inv.customer.registrationName)),
    spec("sellerEndpoint", ["ibr-081", "ibr-062"], Boolean(inv.supplier.endpointId)),
    spec("buyerEndpoint", ["ibr-080", "ibr-063"], Boolean(inv.customer.endpointId)),
    spec("sellerLegalId", ["BR-112-GST-SG"], !needsGstSeller || Boolean(inv.supplier.legalId)),
    spec("sellerGstId", ["BR-105-GST-SG"], !needsGstSeller || Boolean(inv.supplier.gstId)),
    spec("sellerAddress", ["BR-106-GST-SG"],
      !needsGstSeller || Boolean(inv.supplier.streetName && inv.supplier.postalZone)),
    spec("buyerAddress", ["BR-107-GST-SG"],
      !needsGstSeller || Boolean(inv.customer.streetName && inv.customer.postalZone)),
    spec("countries", ["ibr-009", "BR-11-SG"],
      Boolean(inv.supplier.countryCode && inv.customer.countryCode)),
    spec("uuid", ["BR-108-GST-SG", "BR-109-GST-SG"], UUID_RE.test(inv.uuid)),
    spec("linesNamed", ["ibr-016", "ibr-025"],
      inv.lines.length > 0 && inv.lines.every((l) => Boolean(l.name))),
    spec("lineCategories", ["BR-CO-04-GST-SG", "BR-CL-18-GST-SG"],
      inv.lines.every((l) => VALID_CATEGORY_CODES.has(l.category))),
    spec("lineAmounts", ["PEPPOL-EN16931-R120-SG"],
      inv.lines.every((l) => {
        // The spec allows 0.02 of slack (u:slack in the schematron).
        const expected = lineCents(parseScaled(l.quantity) ?? 0n, parseScaled(l.priceAmount) ?? 0n);
        const diff = centsOf(l.lineExtensionAmount) - expected;
        return diff <= 2n && diff >= -2n;
      })),
    spec("netTotals", ["BR-CO-10-SG", "BR-CO-13-GST-SG"],
      centsOf(inv.lineExtensionAmount) === lineSum &&
        centsOf(inv.taxExclusiveAmount) === centsOf(inv.lineExtensionAmount)),
    spec("gstAmounts", ["BR-CO-17-GST-SG", "BR-CO-14-GST-SG", "BR-48-GST-SG"],
      inv.taxSubtotals.every((s) => {
        // Stricter than the schematron, which tolerates a small difference:
        // the demo requires the exact half-up rounded value.
        const rate = parseScaled(s.percent);
        return rate !== null && centsOf(s.taxAmount) === taxCents(centsOf(s.taxableAmount), rate);
      }) && centsOf(inv.taxAmount) === subtotalTaxSum),
    spec("payable", ["ibr-co-15", "BR-CO-16-GST-SG"],
      centsOf(inv.taxInclusiveAmount) === centsOf(inv.taxExclusiveAmount) + centsOf(inv.taxAmount) &&
        centsOf(inv.payableAmount) === centsOf(inv.taxInclusiveAmount)),
    spec("decimals",
      ["BR-DEC-09-SG", "BR-DEC-12-SG", "BR-DEC-13-GST-SG", "BR-DEC-14-SG", "BR-DEC-19-SG", "BR-DEC-20-SG", "ibr-091"],
      amounts.every(decimalsOk)),
    spec("noGst", ["BR-NG-11-GST-SG", "BR-NG-12-GST-SG"], !hasNgLine || categories.size === 1),
    spec("noGstNumber", ["BR-NG-02-GST-SG"], !hasNgLine || !inv.supplier.gstId),
    {
      key: "uenFormat",
      ruleIds: [],
      pass: [inv.supplier.legalId, inv.customer.legalId].every((u) => !u || UEN_RE.test(u)),
      source: "demo",
    },
  ];
}

// ---------------------------------------------------------------------------
// Samples
// ---------------------------------------------------------------------------

/** ISO date `days` from today, in the visitor's local calendar. */
export function isoDateFromToday(days = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/**
 * A complete, fictional invoice. The UENs have a valid shape but are made
 * up; they are not meant to identify any real entity.
 */
export function sampleInvoice(): InvoiceInput {
  return {
    invoiceNumber: "INV-2026-0042",
    issueDate: isoDateFromToday(0),
    dueDate: isoDateFromToday(30),
    buyerReference: "PO-7781",
    paymentTerms: "30 days",
    seller: {
      name: "Sample Trading Pte. Ltd.",
      uen: "201912345A",
      gstRegNo: "201912345A",
      street: "1 Example Road #01-01",
      postalCode: "123456",
      city: "Singapore",
    },
    buyer: {
      name: "Demo Buyer Pte. Ltd.",
      uen: "202054321B",
      street: "2 Sample Avenue",
      postalCode: "654321",
      city: "Singapore",
    },
    lines: [
      { description: "Office chairs", quantity: "3", unitCode: "H87", unitPrice: "129.90", gstCategory: "SR" },
      { description: "Installation", quantity: "2.5", unitCode: "HUR", unitPrice: "45.00", gstCategory: "SR" },
      { description: "Overseas delivery", quantity: "1", unitCode: "H87", unitPrice: "80.00", gstCategory: "ZR" },
    ],
  };
}

/**
 * The same invoice with the mistakes that come up when a spreadsheet is
 * turned into an e-invoice by hand: no buyer reference, no GST number, no
 * due date or terms, a missing postal code, and a "not GST registered" line
 * mixed into a GST invoice.
 */
export function brokenSampleInvoice(): InvoiceInput {
  const base = sampleInvoice();
  return {
    ...base,
    dueDate: "",
    buyerReference: "",
    paymentTerms: "",
    seller: { ...base.seller, gstRegNo: "" },
    buyer: { ...base.buyer, postalCode: "" },
    lines: [
      base.lines[0],
      { ...base.lines[1], gstCategory: "NG" },
      base.lines[2],
    ],
  };
}
