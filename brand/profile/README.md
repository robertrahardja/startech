# Company Profile & Capability Deck

Company collateral for Startech Innovation Pte Ltd. On-brand per
`../guidelines/brand-guidelines.md` — dark theme, matching the business
card and startech-innovation.com.

## Output

| File | Format | Use |
|---|---|---|
| `out/pitch-{EN,JA,KO,ZH-Hans,ZH-Hant,ES,PT,ID}.pdf` | 16:9, 8 slides | **Capability deck** — the one to send; also the website download |
| `profile-EN.pdf` / `profile-ID.pdf` | A4 portrait, 5 pages | Outdated — see below |
| `deck-EN.pdf` / `deck-ID.pdf` | 16:9 landscape, 9 slides | Outdated — see below |

> **Do not send the profile or the technical deck** until they are
> rewritten. They predate the current positioning: "Singapore, Indonesia",
> "strategy to production in 90 days", and (profile) "we run the full PSG
> and SFEC application" — PSG closed on 29 September 2026. The capability
> deck replaces both. Claims are tracked in `../../docs/COMPANY.md`.

## Capability deck

Content: `pitch_content.py`, one dict per language with identical keys
(EN, JA, KO, ZH_HANS, ZH_HANT, ES, PT, ID). Layout: `render_pitch.py`,
which reuses `render_deck.py`'s CSS and slide builders. Every claim must
hold up on a call — check `../../docs/COMPANY.md` before changing one.

```bash
python3 render_pitch.py                     # -> out/pitch-*.html
# Only if CJK text changed: rebuild the embedded Noto Sans CJK subsets
# (one per language, only the characters used), then render again.
uvx --from fonttools --with brotli python build_cjk_fonts.py
python3 render_pitch.py

cd out
for s in EN JA KO ZH-Hans ZH-Hant ES PT ID; do
  chromium --headless --disable-gpu --no-pdf-header-footer \
    --print-to-pdf=pitch-$s.pdf file://$PWD/pitch-$s.html
done
```

Publish to the website (the homepage download, by locale; there is no
Indonesian site):

```bash
for s in EN:en JA:ja KO:ko ZH-Hans:zh-Hans ZH-Hant:zh-Hant ES:es PT:pt; do
  cp "out/pitch-${s%%:*}.pdf" \
    "../../public/assets/startech-capability-deck-${s##*:}.pdf"
done
```

Check slides 3 and 5 after any text change: they are the fullest, and
longer languages (ES, PT, ID) are the first to reach the footer.

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
