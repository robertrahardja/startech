# Startech Innovation — Brand Guidelines

Single source of truth for visual identity across the website, business
documents (quotes, invoices, proposals), and any future surfaces.

Website implementation: `src/index.css` (`@theme` tokens).
Print / document implementation: `brand/templates/`.

---

## 1. Logo

Two marks, both in `brand/logos/`:

- `startech-full.svg` / `.png` — full wordmark "Startech Innovation"
  with the gradient blob above. Dark background by design
  (black canvas, gradient blob, white wordmark).
- `startech-mark.svg` / `.png` — gradient blob only, no wordmark.
  Dark background.
- `startech-full-light.svg` / `.png` — light variant with the
  black canvas removed and the wordmark shifted to near-black
  (`#18181b`). Use on white documents.
- `startech-mark-light.svg` / `.png` — light variant, blob only.

### Logo usage rules

- Minimum clear space around the mark = height of the "S" in Startech.
- Minimum width: 120 px (screen), 30 mm (print).
- Never recolour the gradient. Never place the dark logo on a busy
  photograph. Never stretch.
- For documents on white paper, always use the `-light` variants.

---

## 2. Colour system

All tokens are defined in `src/index.css` under `@theme`. The document
templates use the same palette in their Word/PDF equivalents.

### Core palette

| Token              | Hex        | Role                               |
| ------------------ | ---------- | ---------------------------------- |
| `st-bg`            | `#09090b`  | Primary background (web, dark)     |
| `st-bg-elevated`   | `#0f0f13`  | Elevated surface                   |
| `st-bg-card`       | `#141419`  | Card background                    |
| `st-text`          | `#e4e4e7`  | Primary text on dark               |
| `st-text-muted`    | `#71717a`  | Secondary text, labels             |

### Accent palette

| Token              | Hex        | Role                               |
| ------------------ | ---------- | ---------------------------------- |
| `st-blue`          | `#4f6bf7`  | Primary accent, heading rules      |
| `st-blue-light`    | `#818cf8`  | Hover/secondary blue               |
| `st-pink`          | `#c084fc`  | Gradient end, rotating word accent |
| `st-accent`        | `#6366f1`  | Selection / interactive            |
| `st-gold`          | `#d4a853`  | Premium accent, shimmer            |
| `st-gold-light`    | `#e7c47a`  | Hover gold, highlights             |

### Signature gradient

Used for the logo blob and brand headings (`.gradient-text` on web).

```css
linear-gradient(135deg, #4f6bf7 0%, #c084fc 100%);
```

Three-stop form (matches the SVG logo):

```text
#3B6BFF → #9B6BD8 → #F0A6D0
```

### Print / document palette (white page)

Business documents are printed on white and must remain readable in
greyscale. Use a reduced palette:

| Role                  | Hex        | Maps to web token       |
| --------------------- | ---------- | ----------------------- |
| Body text             | `#18181b`  | Inverted `st-text`      |
| Muted label text      | `#71717a`  | `st-text-muted`         |
| Heading accent rule   | `#4f6bf7`  | `st-blue`               |
| Heading text          | `#2a3a8c`  | Darkened `st-blue` for  |
|                       |            | print contrast (WCAG AA)|
| Gold / premium accent | `#d4a853`  | `st-gold`               |
| Table header fill     | `#4f6bf7`  | `st-blue`, white text   |
| Table header text     | `#ffffff`  | —                       |
| Table alt row         | `#f5f5f8`  | Near-white tint         |
| Hairline              | `#e4e4e7`  | Borders / dividers      |

---

## 3. Typography

### Web

```css
--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
--font-display: "Instrument Serif", Georgia, "Times New Roman", serif;
```

- `Inter` — all body, UI, and most headings.
- `Instrument Serif` — display / hero / editorial moments only.
- Base line-height: `1.65`; base letter-spacing: `-0.01em`.

### Print / Word documents

Word doesn't reliably ship with Inter / Instrument Serif, so the
templates declare them as the requested face with safe fallbacks:

- Primary: `Inter` → `Calibri` → `Segoe UI` → `Arial`
- Display: `Instrument Serif` → `Georgia` → `Cambria` → `Times New Roman`

If you want true brand fidelity in exported PDFs, install Inter and
Instrument Serif system-wide before exporting from Word.

### Type scale (documents)

| Role                    | Size | Weight | Face     | Case          |
| ----------------------- | ---- | ------ | -------- | ------------- |
| Company name (header)   | 11pt | 700    | Inter    | UPPERCASE     |
|                         |      |        |          | tracking 0.08 |
| Document title          | 26pt | 300    | Inter    | UPPERCASE     |
| Section heading (H2)    | 12pt | 600    | Inter    | UPPERCASE     |
|                         |      |        |          | tracking 0.06 |
| Subsection (H3)         | 11pt | 600    | Inter    | Title Case    |
| Body                    | 10pt | 400    | Inter    | Sentence      |
| Small / metadata        | 9pt  | 400    | Inter    | Sentence      |
| Signature name          | 11pt | 400    | Georgia  | Italic        |
| Confidentiality footer  | 8pt  | 400    | Inter    | Italic        |

---

## 4. Layout grid (documents)

- Page: A4 (210 × 297 mm). US Letter is a fallback — templates set A4.
- Margins: 25 mm top / bottom, 22 mm left / right.
- Two-column regions (invoice meta vs. client): left column ~35%, right
  column ~65%, gutter 8 mm.
- Horizontal rule above the company name in the header: 3 pt solid
  `st-blue` (`#4f6bf7`).
- Horizontal rule at page bottom (above page number): 0.75 pt solid
  `#e4e4e7`, width matches content.

---

## 5. Component patterns

### Document header

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  (3pt #4f6bf7)
STARTECH INNOVATION PTE LTD                      ← 11pt bold, tracking
                                                    + mark logo (right)
```

### Section heading

```text
SCOPE OF WORK                                    ← 12pt semibold
                                                    #2a3a8c UPPERCASE
```

No underline, no rule below. Whitespace does the work.

### Info table (quotation, invoice)

- Header row: `#4f6bf7` fill, white text, 10pt semibold, UPPERCASE.
- Body rows: 10pt regular, 6 pt vertical padding, 1 pt row borders
  `#e4e4e7`.
- Grand Total row: bold, `#18181b` text, top border 1.5 pt `#18181b`.

### Footer

Every page bears:

1. 0.75 pt hairline at page bottom.
2. Confidentiality line in 8pt italic grey `#71717a`:

   > This document contains commercially confidential information and is
   > intended solely for the named recipient. Unauthorized distribution
   > is strictly prohibited.

3. Page number (`n / N`) right-aligned, 8pt grey.

---

## 6. Voice, structure, and file naming

### Document reference codes

Format: `STI-<TYPE><YY><MM>-<DDDD>`

- `TYPE` — `Q` for quotation, `INV` for invoice, `PRP` for proposal.
- `YY` — two-digit year.
- `MM` — two-digit month.
- `DDDD` — four-digit sequential counter within that month (or the
  quotation day, per existing practice).

Examples:

- `STI-Q2601-0108` — quotation issued 2026-01-08.
- `STI-INV2601-0108-01` — first invoice tied to that quotation.

### File naming

`Startech — <Client> — <Doc Type> — <YYYY-MM-DD>.docx`

Example: `Startech — Tech Tree — Quotation — 2026-01-08.docx`

### Voice

- Direct, warm, confident. No hype, no corporate buzzwords.
- Use second person when addressing the client ("your platform", not
  "the client's platform").
- Numbers: SGD amounts as `SGD 3,000` (space after currency, comma
  thousands).
- Dates: `8 Jan 2026` in prose, `2026-01-08` in filenames and codes.

---

## 7. Standing company details

Lock these values — they appear on every document.

| Field            | Value                                              |
| ---------------- | -------------------------------------------------- |
| Legal name       | Startech Innovation Pte Ltd                        |
| UEN              | 202110461R                                         |
| Registered addr. | 1003 Bukit Merah Central #06-07, Singapore 159836  |
| Correspondence   | 7500A Beach Road, Singapore 199591                 |
| Managing Dir.    | Robert Rahardja                                    |
| Direct line      | +65 9069 3236                                      |
| Email (primary)  | robert@startech-innovation.com                     |
| Email (personal) | robertrahardja@gmail.com                           |
| Website          | startech-innovation.com                            |

### Banking (for invoices)

| Field           | Value                                             |
| --------------- | ------------------------------------------------- |
| Bank            | DBS Bank Limited                                  |
| Account name    | Robert Rahardja                                   |
| Account number  | 001-0-059172                                      |
| SWIFT / BIC     | DBSSSGSG                                          |
| Bank address    | 12 Marina Boulevard, DBS Asia Central, Marina Bay |
|                 | Financial Centre, Tower 3, Singapore 018982       |

---

## 8. Consistency checklist

Before sending any document, verify:

- [ ] Logo is the light variant on white pages, dark on dark.
- [ ] Company name header uses tracked uppercase + 3pt blue rule.
- [ ] Reference code follows `STI-<TYPE><YYMM>-<DDDD>` format.
- [ ] Dates consistent (`8 Jan 2026` style, not mixed formats).
- [ ] Currency as `SGD 3,000`.
- [ ] Banking block present on all invoices.
- [ ] Confidentiality footer present on every page.
- [ ] Colours limited to the document palette in §2.
- [ ] Page numbers in footer if > 1 page.
- [ ] PDF export: embed fonts (File → Export → PDF → Options → embed).
