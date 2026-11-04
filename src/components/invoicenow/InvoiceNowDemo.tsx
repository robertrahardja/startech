import { useEffect, useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useI18n } from "../../i18n";
import {
  GST_CATEGORIES,
  UNIT_CODES,
  brokenSampleInvoice,
  buildInvoice,
  parseScaled,
  previewLineAmount,
  runChecks,
  sampleInvoice,
  toXml,
  type CheckResult,
  type InvoiceInput,
  type LineInput,
  type UblInvoice,
} from "../../lib/invoicenow/pintSg";
import { SAMPLE_CSV, invoiceFromCsv } from "../../lib/invoicenow/csv";

/**
 * The PINT SG demo: a TanStack Form for a small invoice (or a CSV in the
 * template's shape), turned into UBL XML and checked, all in the browser.
 *
 * Field validators only stop input that cannot become a number or a date.
 * Everything else (a missing GST number, no buyer reference) is allowed
 * through on purpose, so the PINT SG checks can show it failing.
 */

const LABEL = "mb-1.5 block text-[11px] font-medium tracking-wide text-st-text-muted";
const FIELD =
  "w-full min-h-[46px] rounded-lg border border-st-field bg-st-field-bg px-3.5 py-3 text-[14px] font-normal text-st-text placeholder-st-text-muted/50 outline-none transition-all duration-300 hover:border-st-border-hover focus:border-st-blue-light focus:bg-st-bg-elevated focus:ring-2 focus:ring-st-blue/25";
const BUTTON_SECONDARY =
  "inline-flex min-h-[44px] items-center justify-center rounded-xl border border-st-border px-4 py-2.5 text-[13px] text-st-text-muted transition-colors duration-300 hover:border-st-border-hover hover:text-st-text";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const SAMPLE_CSV_HREF = `data:text/csv;charset=utf-8,${encodeURIComponent(SAMPLE_CSV)}`;

interface Result {
  invoice: UblInvoice;
  xml: string;
  checks: CheckResult[];
}

/** crypto.randomUUID needs a secure context; fall back to getRandomValues. */
function newUuid(): string {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? ""));

const EMPTY_LINE: LineInput = {
  description: "",
  quantity: "1",
  unitCode: "H87",
  unitPrice: "",
  gstCategory: "SR",
};

export default function InvoiceNowDemo() {
  const { t, locale } = useI18n();
  const m = t.invoicenow;
  const f = m.fields;
  const [result, setResult] = useState<Result | null>(null);
  const [csvMessage, setCsvMessage] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  // Stable across renders: useForm re-applies changed defaultValues, which
  // would quietly undo a loaded sample or CSV on the next state change.
  const [initialValues] = useState<InvoiceInput>(sampleInvoice);

  const form = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      const invoice = buildInvoice(value, newUuid());
      setResult({ invoice, xml: toXml(invoice), checks: runChecks(invoice) });
      requestAnimationFrame(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        resultRef.current?.focus({ preventScroll: true });
      });
    },
  });

  const money = new Intl.NumberFormat(locale, { style: "currency", currency: "SGD" });
  const showMoney = (amount: string) => money.format(Number(amount));

  /** Replaces every value (a sample or a CSV) and clears the old result. */
  const loadValues = (values: InvoiceInput) => {
    (Object.keys(values) as (keyof InvoiceInput)[]).forEach((key) => {
      form.setFieldValue(key, values[key]);
    });
    // Errors from the last submit belong to the old values.
    form.setErrorMap({});
    (Object.keys(form.fieldInfo) as (keyof typeof form.fieldInfo)[]).forEach((name) => {
      form.setFieldMeta(name, (meta) => (meta ? { ...meta, errorMap: {} } : meta));
    });
    setResult(null);
  };

  const onCsv = async (file: File | undefined) => {
    if (!file) return;
    let text: string;
    try {
      text = await file.text();
    } catch {
      setCsvMessage({ tone: "error", text: m.csvErrorRead });
      return;
    }
    const parsed = invoiceFromCsv(text);
    if (!parsed.ok) {
      const messages = {
        empty: m.csvErrorEmpty,
        noRows: m.csvErrorRows,
        missingColumns: fill(m.csvErrorColumns, { columns: (parsed.missing ?? []).join(", ") }),
      };
      setCsvMessage({ tone: "error", text: messages[parsed.error] });
      return;
    }
    const current = form.state.values;
    loadValues({ ...current, ...parsed.invoice, seller: current.seller, paymentTerms: current.paymentTerms });
    const loaded = fill(m.csvLoaded, { count: parsed.invoice.lines.length });
    setCsvMessage({
      tone: "ok",
      text: parsed.skippedInvoices
        ? `${loaded} ${fill(m.csvSkipped, { count: parsed.skippedInvoices })}`
        : loaded,
    });
  };

  // Download link for the generated XML; revoked whenever it is replaced.
  const [xmlUrl, setXmlUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!result) {
      setXmlUrl(null);
      return;
    }
    const url = URL.createObjectURL(new Blob([result.xml], { type: "application/xml" }));
    setXmlUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [result]);

  const numberValidator =
    (message: string, positive: boolean) =>
    ({ value }: { value: string }) => {
      const parsed = parseScaled(value);
      if (parsed === null) return message;
      return positive && parsed === 0n ? message : undefined;
    };
  const dateValidator = ({ value }: { value: string }) =>
    !value.trim() || DATE_RE.test(value.trim()) ? undefined : m.errorDate;

  const textField = (
    name:
      | "invoiceNumber"
      | "buyerReference"
      | "paymentTerms"
      | "seller.name"
      | "seller.uen"
      | "seller.gstRegNo"
      | "seller.street"
      | "seller.postalCode"
      | "buyer.name"
      | "buyer.uen"
      | "buyer.street"
      | "buyer.postalCode",
    label: string,
    extra: { className?: string; autoComplete?: string } = {}
  ) => {
    // "seller.name" -> "inv-seller-name": a dot in an id breaks CSS selectors.
    const id = `inv-${name.replace(".", "-")}`;
    return (
      <form.Field name={name}>
        {(field) => (
          <div className={extra.className}>
            <label htmlFor={id} className={LABEL}>
              {label}
            </label>
            <input
              id={id}
              type="text"
              maxLength={200}
              autoComplete={extra.autoComplete ?? "off"}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className={FIELD}
            />
          </div>
        )}
      </form.Field>
    );
  };

  const dateField = (name: "issueDate" | "dueDate", label: string) => (
    <form.Field name={name} validators={{ onSubmit: dateValidator, onChange: dateValidator }}>
      {(field) => (
        <div>
          <label htmlFor={`inv-${name}`} className={LABEL}>
            {label}
          </label>
          <input
            id={`inv-${name}`}
            type="text"
            inputMode="numeric"
            placeholder="YYYY-MM-DD"
            maxLength={10}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            aria-invalid={field.state.meta.errors.length > 0 || undefined}
            className={FIELD}
          />
          <FieldError errors={field.state.meta.errors} />
        </div>
      )}
    </form.Field>
  );

  const passed = result?.checks.filter((c) => c.pass).length ?? 0;
  const total = result?.checks.length ?? 0;

  return (
    <div className="mt-8">
      <p className="inline-flex min-h-[32px] items-center rounded-full border border-st-gold/40 bg-st-gold/10 px-3 text-[12px] font-medium tracking-wide text-st-gold-light">
        {m.sampleBadge}
      </p>

      {/* Start from a spreadsheet, or a sample */}
      <div className="card mt-5 rounded-2xl p-5 sm:p-7">
        <h3 className="text-[15px] font-medium text-st-text">{m.csvTitle}</h3>
        <p className="mt-1.5 text-[13.5px] leading-[1.65] text-st-text-muted">{m.csvHint}</p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <a href={SAMPLE_CSV_HREF} download="invoicenow-sample.csv" className={BUTTON_SECONDARY}>
            {m.csvDownload}
          </a>
          <button type="button" className={BUTTON_SECONDARY} onClick={() => fileInput.current?.click()}>
            {m.csvUpload}
          </button>
          <input
            ref={fileInput}
            type="file"
            accept=".csv,text/csv"
            hidden
            aria-label={m.csvUpload}
            data-testid="csv-input"
            onChange={(e) => {
              void onCsv(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <button
            type="button"
            className={BUTTON_SECONDARY}
            onClick={() => {
              setCsvMessage(null);
              loadValues(sampleInvoice());
            }}
          >
            {m.loadValid}
          </button>
          <button
            type="button"
            className={BUTTON_SECONDARY}
            onClick={() => {
              setCsvMessage(null);
              loadValues(brokenSampleInvoice());
            }}
          >
            {m.loadBroken}
          </button>
        </div>
        <p
          aria-live="polite"
          className={`mt-3 text-[13px] ${csvMessage?.tone === "error" ? "text-red-400/90" : "text-emerald-400"}`}
        >
          {csvMessage?.text}
        </p>
      </div>

      <form
        className="mt-5 space-y-5"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          void form.handleSubmit();
        }}
      >
        <Fieldset legend={m.invoiceSection}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {textField("invoiceNumber", f.invoiceNumber)}
            {dateField("issueDate", f.issueDate)}
            {dateField("dueDate", f.dueDate)}
            {textField("buyerReference", f.buyerReference)}
            {textField("paymentTerms", f.paymentTerms, { className: "lg:col-span-2" })}
          </div>
        </Fieldset>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Fieldset legend={m.sellerSection}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {textField("seller.name", f.name, { className: "sm:col-span-2", autoComplete: "organization" })}
              {textField("seller.uen", f.uen)}
              {textField("seller.gstRegNo", f.gstRegNo)}
              {textField("seller.street", f.street, { autoComplete: "street-address" })}
              {textField("seller.postalCode", f.postalCode, { autoComplete: "postal-code" })}
            </div>
          </Fieldset>
          <Fieldset legend={m.buyerSection}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {textField("buyer.name", f.name, { className: "sm:col-span-2" })}
              {textField("buyer.uen", f.uen, { className: "sm:col-span-2" })}
              {textField("buyer.street", f.street)}
              {textField("buyer.postalCode", f.postalCode)}
            </div>
          </Fieldset>
        </div>

        <Fieldset legend={m.linesSection}>
          <form.Field name="lines" mode="array">
            {(linesField) => (
              <div className="space-y-4">
                {linesField.state.value.map((_, i) => (
                  <div key={i} className="rounded-xl border border-st-border p-4" data-testid={`line-${i + 1}`}>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-[12px] font-medium tracking-wide text-st-text">
                        {fill(m.lineLabel, { n: i + 1 })}
                      </span>
                      {linesField.state.value.length > 1 && (
                        <button
                          type="button"
                          onClick={() => linesField.removeValue(i)}
                          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg px-3 text-[12px] text-st-text-muted underline-offset-4 hover:text-st-text hover:underline"
                        >
                          {fill(m.removeLine, { n: i + 1 })}
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-[2fr_1fr_1fr_1fr_1.6fr]">
                      <form.Field name={`lines[${i}].description`}>
                        {(field) => (
                          <div className="col-span-2 lg:col-span-1">
                            <label htmlFor={`line-${i}-description`} className={LABEL}>
                              {f.description}
                            </label>
                            <input
                              id={`line-${i}-description`}
                              type="text"
                              maxLength={200}
                              value={field.state.value}
                              onChange={(e) => field.handleChange(e.target.value)}
                              onBlur={field.handleBlur}
                              className={FIELD}
                            />
                          </div>
                        )}
                      </form.Field>
                      <form.Field
                        name={`lines[${i}].quantity`}
                        validators={{ onSubmit: numberValidator(m.errorQuantity, true) }}
                      >
                        {(field) => (
                          <div>
                            <label htmlFor={`line-${i}-quantity`} className={LABEL}>
                              {f.quantity}
                            </label>
                            <input
                              id={`line-${i}-quantity`}
                              type="text"
                              inputMode="decimal"
                              maxLength={16}
                              value={field.state.value}
                              onChange={(e) => field.handleChange(e.target.value)}
                              onBlur={field.handleBlur}
                              aria-invalid={field.state.meta.errors.length > 0 || undefined}
                              className={FIELD}
                            />
                            <FieldError errors={field.state.meta.errors} />
                          </div>
                        )}
                      </form.Field>
                      <form.Field name={`lines[${i}].unitCode`}>
                        {(field) => (
                          <div>
                            <label htmlFor={`line-${i}-unit`} className={LABEL}>
                              {f.unit}
                            </label>
                            <select
                              id={`line-${i}-unit`}
                              value={field.state.value}
                              onChange={(e) => field.handleChange(e.target.value as LineInput["unitCode"])}
                              className={FIELD}
                            >
                              {UNIT_CODES.map((code) => (
                                <option key={code} value={code}>
                                  {m.units[code]}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </form.Field>
                      <form.Field
                        name={`lines[${i}].unitPrice`}
                        validators={{ onSubmit: numberValidator(m.errorNumber, false) }}
                      >
                        {(field) => (
                          <div>
                            <label htmlFor={`line-${i}-price`} className={LABEL}>
                              {f.unitPrice}
                            </label>
                            <input
                              id={`line-${i}-price`}
                              type="text"
                              inputMode="decimal"
                              maxLength={16}
                              value={field.state.value}
                              onChange={(e) => field.handleChange(e.target.value)}
                              onBlur={field.handleBlur}
                              aria-invalid={field.state.meta.errors.length > 0 || undefined}
                              className={FIELD}
                            />
                            <FieldError errors={field.state.meta.errors} />
                          </div>
                        )}
                      </form.Field>
                      <form.Field name={`lines[${i}].gstCategory`}>
                        {(field) => (
                          <div className="col-span-2 lg:col-span-1">
                            <label htmlFor={`line-${i}-category`} className={LABEL}>
                              {f.gstCategory}
                            </label>
                            <select
                              id={`line-${i}-category`}
                              value={field.state.value}
                              onChange={(e) => field.handleChange(e.target.value as LineInput["gstCategory"])}
                              className={FIELD}
                            >
                              {GST_CATEGORIES.map((code) => (
                                <option key={code} value={code}>
                                  {m.categories[code]}
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </form.Field>
                    </div>
                    <form.Subscribe selector={(s) => s.values.lines[i]}>
                      {(line) => {
                        const amount = line ? previewLineAmount(line.quantity, line.unitPrice) : null;
                        return (
                          <p className="mt-3 text-right text-[12.5px] text-st-text-muted">
                            {f.lineAmount}:{" "}
                            <span className="font-medium text-st-text">{amount ? showMoney(amount) : "–"}</span>
                          </p>
                        );
                      }}
                    </form.Subscribe>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => linesField.pushValue({ ...EMPTY_LINE })}
                  className={BUTTON_SECONDARY}
                >
                  + {m.addLine}
                </button>
                <p className="text-[12.5px] leading-[1.6] text-st-text-muted">{m.categoryNote}</p>
              </div>
            )}
          </form.Field>
        </Fieldset>

        <form.Subscribe selector={(s) => s.isSubmitting}>
          {(isSubmitting) => (
            <button
              type="submit"
              disabled={isSubmitting}
              className="hero-btn-primary relative w-full overflow-hidden rounded-xl px-4 py-3.5 text-[13px] font-normal tracking-wide text-st-text transition-all duration-500 disabled:opacity-40 sm:w-auto sm:px-8"
            >
              {isSubmitting ? m.generating : m.generate}
            </button>
          )}
        </form.Subscribe>
      </form>

      {/* Result */}
      <div ref={resultRef} tabIndex={-1} className="scroll-mt-24 outline-none" aria-live="polite">
        {result && (
          <div className="mt-10 space-y-5" data-testid="invoicenow-result">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[11px] font-medium tracking-[0.2em] uppercase text-st-text-muted">
                  {m.resultEyebrow}
                </div>
                <p
                  data-testid="checks-summary"
                  className={`mt-1 font-display text-2xl tracking-[-0.02em] ${passed === total ? "text-emerald-400" : "text-red-400"}`}
                >
                  {fill(m.checksSummary, { passed, total })}
                </p>
              </div>
              <p className="inline-flex min-h-[32px] items-center self-start rounded-full border border-st-gold/40 bg-st-gold/10 px-3 text-[12px] font-medium tracking-wide text-st-gold-light">
                {m.sampleBadge}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_2fr]">
              <div className="card rounded-2xl p-5 sm:p-6">
                <h3 className="text-[15px] font-medium text-st-text">{m.totalsTitle}</h3>
                <dl className="mt-3 space-y-2 text-[14px]">
                  {(
                    [
                      [m.totals.net, result.invoice.taxExclusiveAmount],
                      [m.totals.gst, result.invoice.taxAmount],
                      [m.totals.payable, result.invoice.payableAmount],
                    ] as const
                  ).map(([label, amount], i) => (
                    <div
                      key={label}
                      className={`flex items-baseline justify-between gap-4 ${i === 2 ? "border-t border-st-border pt-2 font-medium text-st-text" : "text-st-text-muted"}`}
                    >
                      <dt>{label}</dt>
                      <dd data-testid={`total-${i}`}>{showMoney(amount)}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-4 space-y-1 border-t border-st-border pt-3 text-[12.5px] text-st-text-muted">
                  {result.invoice.taxSubtotals.map((s) => (
                    <li key={`${s.category}-${s.percent}`} className="flex justify-between gap-3">
                      <span>
                        {s.category} · {s.percent}%
                      </span>
                      <span>
                        {showMoney(s.taxableAmount)} → {showMoney(s.taxAmount)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card rounded-2xl p-5 sm:p-6">
                <h3 className="text-[15px] font-medium text-st-text">{m.checksTitle}</h3>
                <ul className="mt-3 divide-y divide-st-border" data-testid="checks">
                  {result.checks.map((check) => (
                    <li
                      key={check.key}
                      data-check={check.key}
                      data-pass={check.pass}
                      className="flex items-start gap-3 py-2.5"
                    >
                      <span
                        className={`mt-0.5 inline-flex min-w-[52px] shrink-0 justify-center rounded-md px-1.5 py-0.5 text-[11px] font-medium ${check.pass ? "bg-emerald-400/10 text-emerald-400" : "bg-red-400/10 text-red-400"}`}
                      >
                        {check.pass ? `✓ ${m.pass}` : `✕ ${m.fail}`}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13.5px] leading-[1.5] text-st-text">{m.checks[check.key]}</span>
                        <span className="mt-0.5 block break-words font-mono text-[11px] text-st-text-muted">
                          {check.source === "spec" ? check.ruleIds.join(" · ") : m.demoCheck}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[12px] leading-[1.6] text-st-text-muted">{m.checksSource}</p>
              </div>
            </div>

            <div className="card rounded-2xl p-5 sm:p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-[15px] font-medium text-st-text">{m.xmlTitle}</h3>
                {xmlUrl && (
                  <a
                    href={xmlUrl}
                    download={`${result.invoice.id ?? "invoice"}-pint-sg-sample.xml`.replace(/[^\w.-]+/g, "_")}
                    className="hero-btn-primary inline-flex min-h-[44px] items-center justify-center rounded-xl px-5 py-2.5 text-[13px] text-st-text"
                  >
                    {m.download}
                  </a>
                )}
              </div>
              <pre
                data-testid="xml-preview"
                tabIndex={0}
                className="mt-4 max-h-[28rem] overflow-auto rounded-xl border border-st-border bg-st-bg p-4 font-mono text-[11.5px] leading-[1.55] text-st-text-muted"
              >
                {result.xml}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="card rounded-2xl p-5 sm:p-7">
      <legend className="sr-only">{legend}</legend>
      <div aria-hidden="true" className="mb-4 text-[11px] font-medium tracking-[0.2em] uppercase text-st-text-muted">
        {legend}
      </div>
      {children}
    </fieldset>
  );
}

function FieldError({ errors }: { errors: unknown[] }) {
  const first = errors.find((e) => typeof e === "string");
  return first ? (
    <p className="mt-1.5 text-[12px] text-red-400/80" role="alert">
      {first as string}
    </p>
  ) : null;
}
