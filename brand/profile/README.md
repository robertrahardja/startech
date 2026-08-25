# Company Profile & Capability Deck

Bilingual (EN / ID) company collateral for Startech Innovation Pte Ltd.
On-brand per `../guidelines/brand-guidelines.md` — dark theme, matching
the business card and startech-innovation.com.

## Output

| File | Format | Use |
|---|---|---|
| `profile-EN.pdf` / `profile-ID.pdf` | A4 portrait, 5 pages | Emailed leave-behind, procurement |
| `deck-EN.pdf` / `deck-ID.pdf` | 16:9 landscape, 9 slides | Screen-share, projected pitch |

## Deck structure (landscape)

1. Cover
2. Who we are — positioning + four headline metrics
3. **Engineering evidence** — auditable numbers + a real defect caught
4. How we build — architecture principles
5. Data & AI — production AI, multi-model
6. Selected work — four systems, each with its stack
7. Technology — the full stack
8. How we work — 90-day process
9. Next step — CTA + contact

The deck is written for a technical audience that will probe the
claims. Every number on slide 3 is reproducible from the build:

```bash
cd ../../../startech_erp_java
grep -rh "@Test" --include="*.java" src/test | wc -l   # test methods
grep -rl "@RestController" --include="*.java" src/main | wc -l
```

Source of the headline figures:
`startech_erp_java/docs/architecture/verification-report-2026-08.md`.
**Re-verify before reuse** — these grow with the codebase.

## Regenerating

```bash
python3 render.py        # A4 profile  -> out/profile-{EN,ID}.html
python3 render_deck.py   # 16:9 deck   -> out/deck-{EN,ID}.html
```

Then convert each to PDF:

```bash
cd out
chromium --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf=deck-EN.pdf file://$PWD/deck-EN.html
```

## Editing content

- `content.py` — A4 profile copy, plus `COMMON` (shared company details)
- `deck_content.py` — deck copy; imports `COMMON` from `content.py`

Both language dicts in each file use identical keys, so add to both
when adding a field. Layout lives in `render.py` / `render_deck.py`.

Fonts (Inter, Instrument Serif) are base64-embedded in
`fonts/fonts-embedded.css`, so PDFs render identically on any machine.
`assets.py` holds the base64 logo, from `../logos/startech-mark-light.svg`.
