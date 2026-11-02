/**
 * Client-side PDF generation for demo results.
 * Lazy-loaded via dynamic import() — zero impact on initial bundle.
 */

const GOLD = [212, 168, 83] as const; // #d4a853
const DARK = [40, 40, 45] as const;
const GRAY = [120, 120, 130] as const;
const WHITE = [255, 255, 255] as const;
const BLACK = [30, 30, 35] as const;

let jspdfModule: typeof import("jspdf") | null = null;
let autotableModule: typeof import("jspdf-autotable") | null = null;

async function loadDeps() {
  if (!jspdfModule) {
    [jspdfModule, autotableModule] = await Promise.all([
      import("jspdf"),
      import("jspdf-autotable"),
    ]);
  }
  return { jsPDF: jspdfModule.default, autoTable: autotableModule!.default };
}

/* ─── Text the PDF fonts can draw ───
 * jsPDF's built-in Helvetica only covers Windows-1252. Anything else (Chinese,
 * arrows, emoji) came out as letter-spaced garbage, so every string drawn goes
 * through the doc.text / doc.splitTextToSize wrappers installed below, which
 * jspdf-autotable also calls. Text containing Chinese switches to a subset of
 * Noto Sans SC (GB2312 + Big5 level 1, ~3 MB), fetched only when a result has
 * Chinese in it. Characters neither font has are mapped or dropped.
 */
const CJK_RE = /[　-〿㐀-鿿豈-﫿＀-￯]/;
// An emoji and the space after it, so "🎉 Grand opening" becomes "Grand opening".
const PICTOGRAPH_RE = /[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{1F3FB}-\u{1F3FF}]+ ?/gu;
const SUBSCRIPT_RE = /[₀-₉]/g;
const CP1252_EXTRAS = "€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ";
const CJK_FONT = "NotoSansSC";
const CJK_FONT_FILE = "noto-sans-sc-pdf.ttf";

let cjkFontBase64: string | null = null;

async function loadCjkFont(): Promise<string> {
  if (cjkFontBase64) return cjkFontBase64;
  const res = await fetch(`/fonts/${CJK_FONT_FILE}`);
  if (!res.ok) throw new Error(`Could not load the PDF font (${res.status})`);
  const bytes = new Uint8Array(await res.arrayBuffer());
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  cjkFontBase64 = btoa(binary);
  return cjkFontBase64;
}

/** Drops emoji and turns subscript digits into plain ones (neither font has them). */
function withoutPictographs(text: string): string {
  return text
    .replace(PICTOGRAPH_RE, "")
    .replace(SUBSCRIPT_RE, (d) => String.fromCharCode(d.charCodeAt(0) - 0x2080 + 48))
    .replace(/ +(\n|$)/g, "$1")
    .replace(/ {2,}/g, " ");
}

function isCp1252(ch: string): boolean {
  const c = ch.charCodeAt(0);
  return ch === "\n" || ch === "\t" || (c >= 0x20 && c <= 0x7e) ||
    (c >= 0xa0 && c <= 0xff) || CP1252_EXTRAS.includes(ch);
}

/** What Helvetica can draw: arrows spelled out, everything else outside Windows-1252 dropped. */
function forHelvetica(text: string): string {
  const mapped = withoutPictographs(text).replace(/→/g, "->").replace(/←/g, "<-");
  return Array.from(mapped).filter(isCp1252).join("");
}

// Both accept a single string or a list of lines; jspdf-autotable passes lists.
type TextFn = (text: string | string[], ...rest: unknown[]) => unknown;
type SplitFn = (text: string | string[], ...rest: unknown[]) => string[];

function installDrawableText(doc: import("jspdf").jsPDF, cjkFontReady: boolean) {
  const text = doc.text.bind(doc) as unknown as TextFn;
  const split = doc.splitTextToSize.bind(doc) as unknown as SplitFn;

  /** Cleans the input for the font it will be drawn in, and runs fn in that font. */
  function draw<T>(input: string | string[], fn: (cleaned: string | string[]) => T): T {
    const useCjk = cjkFontReady && [input].flat().some((s) => CJK_RE.test(s));
    const clean = useCjk ? withoutPictographs : forHelvetica;
    const cleaned = Array.isArray(input) ? input.map(clean) : clean(input);
    if (!useCjk) return fn(cleaned);
    const { fontName, fontStyle } = doc.getFont();
    doc.setFont(CJK_FONT, "normal");
    try {
      return fn(cleaned);
    } finally {
      doc.setFont(fontName, fontStyle);
    }
  }

  doc.text = ((input: string | string[], ...rest: unknown[]) =>
    draw(input, (cleaned) => text(cleaned, ...rest))) as unknown as typeof doc.text;

  doc.splitTextToSize = ((input: string | string[], ...rest: unknown[]) =>
    draw(input, (cleaned) => split(cleaned, ...rest))) as unknown as typeof doc.splitTextToSize;
}

/* ─── Shared Helpers ─── */

function addHeader(doc: import("jspdf").jsPDF, title: string, subtitle?: string) {
  const pageW = doc.internal.pageSize.getWidth();

  // Gold accent line
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(1.5);
  doc.line(20, 18, 60, 18);

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...BLACK);
  doc.text(title, 20, 30);

  // Subtitle
  if (subtitle) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...GRAY);
    doc.text(subtitle, 20, 37);
  }

  // Date on right
  doc.setFontSize(9);
  doc.setTextColor(...GRAY);
  doc.text(new Date().toLocaleDateString("en-SG", {
    day: "numeric", month: "long", year: "numeric",
  }), pageW - 20, 30, { align: "right" });

  // Divider
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.line(20, 42, pageW - 20, 42);

  return 50; // y cursor after header
}

function addFooter(doc: import("jspdf").jsPDF) {
  const pages = doc.getNumberOfPages();
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.3);
    doc.line(20, pageH - 20, pageW - 20, pageH - 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...GRAY);
    doc.text("Generated by StarTech Innovation | startech-innovation.com", 20, pageH - 13);
    doc.text(`Page ${i} of ${pages}`, pageW - 20, pageH - 13, { align: "right" });
  }
}

function addSectionTitle(doc: import("jspdf").jsPDF, y: number, text: string): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...GOLD);
  doc.text(text, 20, y);
  return y + 8;
}

/** Distance between baselines of the current font, in mm (jsPDF's own spacing). */
function lineHeight(doc: import("jspdf").jsPDF): number {
  return (doc.getFontSize() * doc.getLineHeightFactor()) / doc.internal.scaleFactor;
}

function addParagraph(doc: import("jspdf").jsPDF, y: number, text: string, maxWidth?: number): number {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...BLACK);
  const w = maxWidth || doc.internal.pageSize.getWidth() - 40;
  const lines = doc.splitTextToSize(text, w);
  doc.text(lines, 20, y);
  return y + lines.length * lineHeight(doc) + 4;
}

function addBulletList(doc: import("jspdf").jsPDF, y: number, items: string[], indent = 25): number {
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...BLACK);
  const maxW = doc.internal.pageSize.getWidth() - indent - 20;
  for (const item of items) {
    doc.setTextColor(...GOLD);
    doc.text("•", indent - 5, y);
    doc.setTextColor(...BLACK);
    const lines = doc.splitTextToSize(item, maxW);
    doc.text(lines, indent, y);
    y += lines.length * lineHeight(doc) + 2;
  }
  return y + 2;
}

function addKeyValue(doc: import("jspdf").jsPDF, y: number, label: string, value: string): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...GRAY);
  doc.text(label + ":", 20, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(...BLACK);
  doc.text(value, 70, y);
  return y + 6;
}

/**
 * A letter or contract: keeps its own line breaks, wraps lines too long for the
 * page, and starts a new page between lines when needed.
 */
function addDocumentText(doc: import("jspdf").jsPDF, y: number, text: string): number {
  const maxW = doc.internal.pageSize.getWidth() - 40;
  for (const line of text.split("\n")) {
    doc.setFont("helvetica", "normal"); doc.setFontSize(9.5); doc.setTextColor(...BLACK);
    const wrapped = line.trim() ? doc.splitTextToSize(line, maxW) : [""];
    for (const part of wrapped) {
      y = checkPageBreak(doc, y, 6);
      if (part) doc.text(part, 20, y);
      y += 4.5;
    }
  }
  return y;
}

function checkPageBreak(doc: import("jspdf").jsPDF, y: number, needed: number): number {
  if (y + needed > doc.internal.pageSize.getHeight() - 30) {
    doc.addPage();
    return 25;
  }
  return y;
}

/* ─── Per-Demo PDF Generators ─── */

function invoiceScanner(doc: import("jspdf").jsPDF, autoTable: any, r: Record<string, unknown>) {
  let y = addHeader(doc, "Invoice / Receipt Scan", r.vendor as string);
  y = addKeyValue(doc, y, "Date", r.date as string);
  y = addKeyValue(doc, y, "Currency", (r.currency as string) || "SGD");
  y += 4;

  const items = (r.items as any[]) || [];
  autoTable(doc, {
    startY: y,
    head: [["Description", "Qty", "Unit Price", "Amount"]],
    body: items.map((i: any) => [i.description, i.quantity, i.unit_price.toFixed(2), i.amount.toFixed(2)]),
    margin: { left: 20, right: 20 },
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [...GOLD], textColor: [...WHITE], fontStyle: "bold" },
    alternateRowStyles: { fillColor: [248, 248, 248] },
  });

  y = (doc as any).lastAutoTable.finalY + 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const pageW = doc.internal.pageSize.getWidth();
  doc.setTextColor(...GRAY);
  doc.text("Subtotal:", pageW - 70, y); doc.setTextColor(...BLACK); doc.text((r.subtotal as number).toFixed(2), pageW - 20, y, { align: "right" }); y += 6;
  doc.setTextColor(...GRAY);
  doc.text("GST:", pageW - 70, y); doc.setTextColor(...BLACK); doc.text((r.gst as number).toFixed(2), pageW - 20, y, { align: "right" }); y += 6;
  doc.setFont("helvetica", "bold"); doc.setFontSize(12);
  doc.setTextColor(...GOLD);
  doc.text("Total:", pageW - 70, y); doc.setTextColor(...BLACK); doc.text((r.total as number).toFixed(2), pageW - 20, y, { align: "right" });
}

function customerChatbot(doc: import("jspdf").jsPDF, _autoTable: any, r: Record<string, unknown>) {
  let y = addHeader(doc, "AI Chatbot Response", `Confidence: ${r.confidence_percent}%`);
  y = addSectionTitle(doc, y, "Customer Question");
  y = addParagraph(doc, y, r.question as string);
  y += 4;
  y = addSectionTitle(doc, y, "AI Response");
  y = addParagraph(doc, y, r.answer as string);
  y += 4;
  const followups = (r.suggested_followups as string[]) || [];
  if (followups.length > 0) {
    y = addSectionTitle(doc, y, "Suggested Follow-ups");
    y = addBulletList(doc, y, followups);
  }
}

function appointmentBooking(doc: import("jspdf").jsPDF, _autoTable: any, r: Record<string, unknown>) {
  let y = addHeader(doc, "Appointment Confirmation");
  y = addKeyValue(doc, y, "Service", r.service as string);
  y = addKeyValue(doc, y, "Date", r.confirmed_date as string);
  y = addKeyValue(doc, y, "Time", r.confirmed_time as string);
  y = addKeyValue(doc, y, "Duration", `${r.duration_minutes} minutes`);
  y += 6;
  y = addSectionTitle(doc, y, "Confirmation");
  y = addParagraph(doc, y, r.confirmation_text as string);
  y += 4;
  y = addSectionTitle(doc, y, "Reminder Message");
  y = addParagraph(doc, y, r.reminder_message as string);
}

function quotationGenerator(doc: import("jspdf").jsPDF, autoTable: any, r: Record<string, unknown>) {
  let y = addHeader(doc, "QUOTATION", r.quote_number as string);
  y = addKeyValue(doc, y, "Date", r.date as string);
  y = addKeyValue(doc, y, "Client", r.client as string);
  y += 4;

  const items = (r.items as any[]) || [];
  autoTable(doc, {
    startY: y,
    head: [["Description", "Qty", "Unit Price (SGD)", "Amount (SGD)"]],
    body: items.map((i: any) => [i.description, i.quantity, i.unit_price.toFixed(2), i.amount.toFixed(2)]),
    margin: { left: 20, right: 20 },
    styles: { fontSize: 10, cellPadding: 3 },
    headStyles: { fillColor: [...GOLD], textColor: [...WHITE], fontStyle: "bold" },
    alternateRowStyles: { fillColor: [248, 248, 248] },
  });

  y = (doc as any).lastAutoTable.finalY + 8;
  const pageW = doc.internal.pageSize.getWidth();
  doc.setFont("helvetica", "normal"); doc.setFontSize(10);
  doc.setTextColor(...GRAY); doc.text("Subtotal:", pageW - 70, y); doc.setTextColor(...BLACK); doc.text((r.subtotal as number).toFixed(2), pageW - 20, y, { align: "right" }); y += 6;
  doc.setTextColor(...GRAY); doc.text("GST (9%):", pageW - 70, y); doc.setTextColor(...BLACK); doc.text((r.gst as number).toFixed(2), pageW - 20, y, { align: "right" }); y += 6;
  doc.setFont("helvetica", "bold"); doc.setFontSize(12);
  doc.setTextColor(...GOLD); doc.text("Total:", pageW - 70, y); doc.setTextColor(...BLACK); doc.text((r.total as number).toFixed(2), pageW - 20, y, { align: "right" });
  y += 12;
  y = checkPageBreak(doc, y, 20);
  doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(...GRAY);
  if (r.terms) { doc.text(`Terms: ${r.terms}`, 20, y); y += 5; }
  doc.text(`Valid for: ${r.validity_days} days`, 20, y);
}

function jobPostingWriter(doc: import("jspdf").jsPDF, _autoTable: any, r: Record<string, unknown>) {
  let y = addHeader(doc, r.title as string, `${r.company} — ${r.location}`);
  y = addKeyValue(doc, y, "Type", r.employment_type as string);
  if (r.salary_range) y = addKeyValue(doc, y, "Salary", r.salary_range as string);
  y += 2;
  y = addSectionTitle(doc, y, "About the Role");
  y = addParagraph(doc, y, r.summary as string);

  const sections: [string, string][] = [
    ["Responsibilities", "responsibilities"],
    ["Requirements", "requirements"],
    ["Nice to Have", "nice_to_have"],
    ["Benefits", "benefits"],
  ];
  for (const [title, key] of sections) {
    const items = (r[key] as string[]) || [];
    if (items.length > 0) {
      y = checkPageBreak(doc, y, 30);
      y = addSectionTitle(doc, y, title);
      y = addBulletList(doc, y, items);
    }
  }
}

function inventoryTracker(doc: import("jspdf").jsPDF, autoTable: any, r: Record<string, unknown>) {
  let y = addHeader(doc, "Inventory Analysis", `As of ${r.analysis_date}`);
  const items = (r.items as any[]) || [];
  autoTable(doc, {
    startY: y,
    head: [["Item", "Stock", "Daily Use", "Days Left", "Restock By", "Alert", "Order Qty"]],
    body: items.map((i: any) => [
      i.name, i.current_stock, i.daily_usage, i.days_until_empty,
      i.restock_date, i.alert_level.toUpperCase(), i.recommended_order_qty,
    ]),
    margin: { left: 20, right: 20 },
    styles: { fontSize: 9, cellPadding: 2.5 },
    headStyles: { fillColor: [...GOLD], textColor: [...WHITE], fontStyle: "bold" },
    alternateRowStyles: { fillColor: [248, 248, 248] },
    didParseCell(data: any) {
      if (data.section === "body" && data.column.index === 5) {
        const val = data.cell.raw as string;
        if (val === "CRITICAL") data.cell.styles.textColor = [220, 50, 50];
        else if (val === "WARNING") data.cell.styles.textColor = [200, 150, 30];
        else data.cell.styles.textColor = [50, 180, 80];
      }
    },
  });
  y = (doc as any).lastAutoTable.finalY + 10;
  y = addSectionTitle(doc, y, "Summary");
  y = addParagraph(doc, y, r.summary as string);
}

function socialMediaManager(doc: import("jspdf").jsPDF, _autoTable: any, r: Record<string, unknown>) {
  let y = addHeader(doc, "Social Media Content Plan");
  y = addSectionTitle(doc, y, "Topic");
  y = addParagraph(doc, y, r.topic_summary as string);
  const posts = (r.posts as any[]) || [];
  for (const post of posts) {
    y = checkPageBreak(doc, y, 60);
    y = addSectionTitle(doc, y, post.platform);
    y = addParagraph(doc, y, post.content);
    doc.setFont("helvetica", "italic"); doc.setFontSize(9); doc.setTextColor(...GRAY);
    doc.text(`Hashtags: ${post.hashtags.join(" ")}`, 20, y); y += 5;
    doc.text(`Best time: ${post.best_posting_time} | ${post.character_count} chars`, 20, y); y += 8;
  }
}

function documentTranslator(doc: import("jspdf").jsPDF, _autoTable: any, r: Record<string, unknown>) {
  let y = addHeader(doc, "Document Translation", `${r.source_language} to ${r.target_language}`);
  y = addSectionTitle(doc, y, `Original (${r.source_language})`);
  y = addParagraph(doc, y, r.original_text as string);
  y += 4;
  y = addSectionTitle(doc, y, `Translation (${r.target_language})`);
  y = addParagraph(doc, y, r.translated_text as string);
  const notes = (r.notes as string[]) || [];
  if (notes.length > 0) {
    y += 4;
    y = addSectionTitle(doc, y, "Translation Notes");
    y = addBulletList(doc, y, notes);
  }
}

function employeeOnboarding(doc: import("jspdf").jsPDF, autoTable: any, r: Record<string, unknown>) {
  let y = addHeader(doc, "Employee Onboarding Pack");

  // Offer Letter
  y = addSectionTitle(doc, y, "Offer Letter");
  y = addDocumentText(doc, y, r.offer_letter_preview as string);
  y += 6;

  // NDA
  y = checkPageBreak(doc, y, 40);
  y = addSectionTitle(doc, y, "Non-Disclosure Agreement");
  y = addDocumentText(doc, y, r.nda_preview as string);
  y += 6;

  // Checklist
  y = checkPageBreak(doc, y, 40);
  y = addSectionTitle(doc, y, "Onboarding Checklist");
  const checklist = (r.checklist as any[]) || [];
  autoTable(doc, {
    startY: y,
    head: [["Task", "Owner", "Due By", "Category"]],
    body: checklist.map((c: any) => [c.task, c.owner, c.due_by, c.category]),
    margin: { left: 20, right: 20 },
    styles: { fontSize: 9, cellPadding: 2.5 },
    headStyles: { fillColor: [...GOLD], textColor: [...WHITE], fontStyle: "bold" },
    alternateRowStyles: { fillColor: [248, 248, 248] },
  });
}

function salesAssistant(doc: import("jspdf").jsPDF, _autoTable: any, r: Record<string, unknown>) {
  let y = addHeader(doc, "Sales Email Sequence");
  y = addSectionTitle(doc, y, "Lead Summary");
  y = addParagraph(doc, y, r.lead_summary as string);
  y += 4;

  const emails = (r.emails as any[]) || [];
  for (const email of emails) {
    y = checkPageBreak(doc, y, 50);
    y = addSectionTitle(doc, y, `${email.send_day} — ${email.purpose}`);
    doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(...BLACK);
    doc.text(`Subject: ${email.subject}`, 20, y); y += 7;
    y = addParagraph(doc, y, email.body);
    y += 4;
  }
}

function complianceChecker(doc: import("jspdf").jsPDF, autoTable: any, r: Record<string, unknown>) {
  const score = r.risk_score as number;
  let y = addHeader(doc, "Compliance Review", `${r.document_type} — Risk Score: ${score}/10`);

  y = addSectionTitle(doc, y, "Summary");
  y = addParagraph(doc, y, r.summary as string);
  y += 4;

  const findings = (r.findings as any[]) || [];
  y = addSectionTitle(doc, y, "Findings");
  autoTable(doc, {
    startY: y,
    head: [["Severity", "Issue", "Regulation", "Suggestion"]],
    body: findings.map((f: any) => [f.severity.toUpperCase(), f.issue, f.regulation, f.suggestion]),
    margin: { left: 20, right: 20 },
    styles: { fontSize: 8.5, cellPadding: 3 },
    headStyles: { fillColor: [...GOLD], textColor: [...WHITE], fontStyle: "bold" },
    alternateRowStyles: { fillColor: [248, 248, 248] },
    columnStyles: { 0: { cellWidth: 22 }, 1: { cellWidth: 45 } },
    didParseCell(data: any) {
      if (data.section === "body" && data.column.index === 0) {
        const val = data.cell.raw as string;
        if (val === "HIGH") data.cell.styles.textColor = [220, 50, 50];
        else if (val === "MEDIUM") data.cell.styles.textColor = [200, 150, 30];
        else data.cell.styles.textColor = [50, 130, 200];
      }
    },
  });
}

function trainingContent(doc: import("jspdf").jsPDF, autoTable: any, r: Record<string, unknown>) {
  let y = addHeader(doc, r.course_title as string, `Total duration: ${r.total_duration_hours} hours`);

  const modules = (r.modules as any[]) || [];
  for (let idx = 0; idx < modules.length; idx++) {
    const m = modules[idx];
    y = checkPageBreak(doc, y, 50);
    y = addSectionTitle(doc, y, `Module ${idx + 1}: ${m.title} (${m.duration_minutes} min)`);

    y = addParagraph(doc, y, m.content_summary);
    y += 2;

    doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(...DARK);
    doc.text("Learning Objectives:", 20, y); y += 6;
    y = addBulletList(doc, y, m.objectives);

    if (m.quiz && m.quiz.length > 0) {
      y = checkPageBreak(doc, y, 30);
      doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(...DARK);
      doc.text("Quiz:", 20, y); y += 6;
      autoTable(doc, {
        startY: y,
        head: [["Question", "A", "B", "C", "D", "Answer"]],
        body: m.quiz.map((q: any) => [
          q.question,
          q.options[0] || "",
          q.options[1] || "",
          q.options[2] || "",
          q.options[3] || "",
          String.fromCharCode(65 + q.correct_answer_index),
        ]),
        margin: { left: 20, right: 20 },
        styles: { fontSize: 8, cellPadding: 2.5 },
        headStyles: { fillColor: [...GOLD], textColor: [...WHITE], fontStyle: "bold" },
        columnStyles: { 0: { cellWidth: 50 } },
      });
      y = (doc as any).lastAutoTable.finalY + 10;
    }
  }
}

function financialReport(doc: import("jspdf").jsPDF, autoTable: any, r: Record<string, unknown>) {
  let y = addHeader(doc, "Financial Report", r.period as string);

  // P&L summary
  const fmt = (n: number) => `SGD ${n.toLocaleString("en-SG")}`;
  y = addSectionTitle(doc, y, "Profit & Loss Summary");
  autoTable(doc, {
    startY: y,
    head: [["Revenue", "Expenses", "Net Profit", "Gross Margin", "Net Margin"]],
    body: [[
      fmt(r.revenue as number),
      fmt(r.expenses as number),
      fmt(r.net_profit as number),
      `${r.gross_margin_pct}%`,
      `${r.net_margin_pct}%`,
    ]],
    margin: { left: 20, right: 20 },
    styles: { fontSize: 10, cellPadding: 4, halign: "center" },
    headStyles: { fillColor: [...GOLD], textColor: [...WHITE], fontStyle: "bold" },
  });
  y = (doc as any).lastAutoTable.finalY + 10;

  // Key Metrics
  const metrics = (r.key_metrics as any[]) || [];
  if (metrics.length > 0) {
    y = addSectionTitle(doc, y, "Key Metrics");
    autoTable(doc, {
      startY: y,
      head: [["Metric", "Value", "Assessment"]],
      body: metrics.map((m: any) => [m.metric, m.value, m.assessment.toUpperCase()]),
      margin: { left: 20, right: 20 },
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [...GOLD], textColor: [...WHITE], fontStyle: "bold" },
      didParseCell(data: any) {
        if (data.section === "body" && data.column.index === 2) {
          const val = data.cell.raw as string;
          if (val === "POSITIVE") data.cell.styles.textColor = [50, 180, 80];
          else if (val === "NEGATIVE") data.cell.styles.textColor = [220, 50, 50];
        }
      },
    });
    y = (doc as any).lastAutoTable.finalY + 10;
  }

  // Analysis
  y = checkPageBreak(doc, y, 40);
  y = addSectionTitle(doc, y, "Analysis");
  y = addParagraph(doc, y, r.analysis as string);

  // Trends
  const trends = (r.trends as string[]) || [];
  if (trends.length > 0) {
    y = checkPageBreak(doc, y, 30);
    y = addSectionTitle(doc, y, "Trends");
    y = addBulletList(doc, y, trends);
  }

  // Recommendations
  const recs = (r.recommendations as string[]) || [];
  if (recs.length > 0) {
    y = checkPageBreak(doc, y, 30);
    y = addSectionTitle(doc, y, "Recommendations");
    y = addBulletList(doc, y, recs);
  }
}

/* ─── Dispatcher ─── */

const GENERATORS: Record<string, (doc: import("jspdf").jsPDF, autoTable: any, r: Record<string, unknown>) => void> = {
  "invoice-scanner": invoiceScanner,
  "customer-chatbot": customerChatbot,
  "appointment-booking": appointmentBooking,
  "quotation-generator": quotationGenerator,
  "job-posting-writer": jobPostingWriter,
  "inventory-tracker": inventoryTracker,
  "social-media-manager": socialMediaManager,
  "document-translator": documentTranslator,
  "employee-onboarding": employeeOnboarding,
  "sales-assistant": salesAssistant,
  "compliance-checker": complianceChecker,
  "training-content-generator": trainingContent,
  "financial-report-builder": financialReport,
};

const TITLES: Record<string, string> = {
  "invoice-scanner": "invoice-scan",
  "customer-chatbot": "chatbot-response",
  "appointment-booking": "appointment",
  "quotation-generator": "quotation",
  "job-posting-writer": "job-posting",
  "inventory-tracker": "inventory-analysis",
  "social-media-manager": "social-media-plan",
  "document-translator": "translation",
  "employee-onboarding": "onboarding-pack",
  "sales-assistant": "sales-sequence",
  "compliance-checker": "compliance-review",
  "training-content-generator": "training-course",
  "financial-report-builder": "financial-report",
};

export async function generateDemoPdf(
  demoType: string,
  result: Record<string, unknown>,
): Promise<void> {
  const { jsPDF, autoTable } = await loadDeps();
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const gen = GENERATORS[demoType];
  if (!gen) return;

  const hasCjk = CJK_RE.test(JSON.stringify(result));
  if (hasCjk) {
    doc.addFileToVFS(CJK_FONT_FILE, await loadCjkFont());
    doc.addFont(CJK_FONT_FILE, CJK_FONT, "normal");
  }
  installDrawableText(doc, hasCjk);

  gen(doc, autoTable, result);
  addFooter(doc);

  const filename = `startech-${TITLES[demoType] || demoType}-${Date.now()}.pdf`;
  doc.save(filename);
}
