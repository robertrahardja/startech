/**
 * The demo's CSV template: one row per invoice line, with the invoice and
 * buyer details repeated on every row, the way most invoice spreadsheets are
 * already laid out. The seller (the visitor's own business) comes from the
 * form, not the file.
 *
 * Column names are fixed; order is not. Only the first invoice number in a
 * file is imported, and the caller is told how many others were skipped.
 */
import {
  GST_CATEGORIES,
  UNIT_CODES,
  type GstCategory,
  type InvoiceInput,
  type LineInput,
  type UnitCode,
} from "./pintSg";

const CSV_COLUMNS = [
  "invoice_number",
  "issue_date",
  "due_date",
  "buyer_reference",
  "buyer_name",
  "buyer_uen",
  "buyer_street",
  "buyer_postal_code",
  "description",
  "quantity",
  "unit",
  "unit_price",
  "gst_category",
] as const;

type Column = (typeof CSV_COLUMNS)[number];

/** Downloadable template, filled with the same fictional data as the form. */
export const SAMPLE_CSV = [
  CSV_COLUMNS.join(","),
  "INV-2026-0107,2026-11-04,2026-12-04,PO-8812,Demo Buyer Pte. Ltd.,202054321B,2 Sample Avenue,654321,Monthly maintenance,1,MON,450.00,SR",
  'INV-2026-0107,2026-11-04,2026-12-04,PO-8812,Demo Buyer Pte. Ltd.,202054321B,2 Sample Avenue,654321,"Spare parts, set of 4",4,H87,12.35,SR',
  "INV-2026-0107,2026-11-04,2026-12-04,PO-8812,Demo Buyer Pte. Ltd.,202054321B,2 Sample Avenue,654321,On-site support,3.5,HUR,88.00,SR",
  "",
].join("\r\n");

export type CsvError = "empty" | "missingColumns" | "noRows";

export type CsvResult =
  | { ok: true; invoice: Omit<InvoiceInput, "seller" | "paymentTerms">; skippedInvoices: number }
  | { ok: false; error: CsvError; missing?: string[] };

/** RFC 4180 parsing: quoted fields, doubled quotes, CRLF or LF. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  const src = text.replace(/^\uFEFF/, ""); // Excel's UTF-8 BOM

  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && src[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += ch;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
}

const asUnit = (v: string): UnitCode =>
  (UNIT_CODES as readonly string[]).includes(v.toUpperCase()) ? (v.toUpperCase() as UnitCode) : "H87";

const asCategory = (v: string): GstCategory =>
  (GST_CATEGORIES as readonly string[]).includes(v.toUpperCase())
    ? (v.toUpperCase() as GstCategory)
    : "SR";

/**
 * Reads the template into invoice fields. Unknown units or GST categories
 * fall back to the defaults (piece, SR) rather than failing the import; the
 * visitor sees them in the form and can change them before generating.
 */
export function invoiceFromCsv(text: string): CsvResult {
  const rows = parseCsv(text);
  if (rows.length === 0) return { ok: false, error: "empty" };

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const missing = CSV_COLUMNS.filter((c) => !header.includes(c));
  if (missing.length) return { ok: false, error: "missingColumns", missing };

  const records = rows.slice(1).map((cells) => {
    const get = (c: Column) => (cells[header.indexOf(c)] ?? "").trim();
    return get;
  });
  if (records.length === 0) return { ok: false, error: "noRows" };

  const first = records[0]("invoice_number");
  const mine = records.filter((r) => r("invoice_number") === first);
  const others = new Set(records.map((r) => r("invoice_number")).filter((n) => n !== first));
  const head = mine[0];

  const lines: LineInput[] = mine.map((r) => ({
    description: r("description"),
    quantity: r("quantity"),
    unitCode: asUnit(r("unit")),
    unitPrice: r("unit_price"),
    gstCategory: asCategory(r("gst_category")),
  }));

  return {
    ok: true,
    skippedInvoices: others.size,
    invoice: {
      invoiceNumber: first,
      issueDate: head("issue_date"),
      dueDate: head("due_date"),
      buyerReference: head("buyer_reference"),
      buyer: {
        name: head("buyer_name"),
        uen: head("buyer_uen"),
        street: head("buyer_street"),
        postalCode: head("buyer_postal_code"),
        city: "Singapore",
      },
      lines,
    },
  };
}
