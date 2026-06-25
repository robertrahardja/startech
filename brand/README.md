# Startech Brand Kit

Single source of truth for Startech Innovation's visual identity —
website, business documents, and anything else that carries the name.

```text
brand/
├── README.md                    ← you are here
├── guidelines/
│   └── brand-guidelines.md      ← full spec (colors, type, logo, voice)
├── logos/
│   ├── startech-full.svg        ← dark canvas, white wordmark (web hero)
│   ├── startech-full.png
│   ├── startech-full-light.svg  ← no canvas, dark wordmark (documents)
│   ├── startech-full-light.png
│   ├── startech-mark.svg        ← gradient blob only, dark canvas
│   ├── startech-mark.png
│   ├── startech-mark-light.svg  ← gradient blob only, transparent bg
│   └── startech-mark-light.png
└── templates/
    ├── build_templates.py                   ← generator (python-docx)
    ├── Startech-Quotation-Template.docx
    └── Startech-Invoice-Template.docx
```

## Using the Word templates

1. Duplicate the template — do **not** edit it in place.

   ```bash
   cp brand/templates/Startech-Quotation-Template.docx \
      ~/Documents/"Startech — <Client> — Quotation — $(date +%F).docx"
   ```

2. Open the copy in Word (or Google Docs / LibreOffice). All
   placeholders are `[bracketed]` — Find & Replace makes it fast.

3. Fill in:
   - Reference code (`STI-Q<YYMM>-<DDDD>`, e.g. `STI-Q2601-0108`)
   - Date, client block, attention line
   - Project snapshot, overview, scope bullets
   - Tables (timeline, investment, invoice lines)
   - Signature names

4. Export to PDF with fonts embedded: File → Save As → PDF → Options →
   check "Embed fonts in the file" (or in LibreOffice: File → Export
   as PDF → General → "Embed standard fonts").

5. File as `Startech — <Client> — <Type> — <YYYY-MM-DD>.pdf`.

## Regenerating the templates

The `.docx` files are built from `build_templates.py` so the design can
evolve without hand-editing XML. After changing colours, fonts, or
structure in the script:

```bash
cd brand/templates
python3 build_templates.py
```

Requires `python-docx` (`pip install python-docx`).

## Mapping: website ⇄ documents

| Concept           | Website (`src/index.css`) | Document (print)      |
| ----------------- | ------------------------- | --------------------- |
| Primary blue      | `--color-st-blue` #4f6bf7 | Table header, rules   |
| Darkened blue     | —                         | #2a3a8c (heading ink) |
| Gold accent       | `--color-st-gold` #d4a853 | Emphasis, optional    |
| Body text         | `--color-st-text` #e4e4e7 | #18181b (inverted)    |
| Muted             | `--color-st-text-muted`   | Same (#71717a)        |
| Signature font    | Instrument Serif          | Georgia (fallback)    |
| Body font         | Inter                     | Inter → Calibri       |

When the website palette changes, update both
`guidelines/brand-guidelines.md` and the constants at the top of
`templates/build_templates.py`, then regenerate.

## What to do when…

- **…a new document type is needed** (e.g. proposal, SoW, NDA): copy
  one of the existing `build_*` functions in the script, swap the
  section structure, and add it to `__main__`.

- **…the logo changes**: drop the new SVG into `logos/` with the same
  filenames, regenerate PNGs with `rsvg-convert`, and rebuild the
  templates — they pull from PNG at build time.

- **…Inter / Instrument Serif aren't installed on the recipient's
  machine**: the template declares safe fallbacks (Calibri, Georgia)
  so it still renders. For guaranteed fidelity, always send PDFs.
