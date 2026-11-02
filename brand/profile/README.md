# Company Profile & Capability Deck

Company collateral for Startech Innovation Pte Ltd. On-brand per
`../guidelines/brand-guidelines.md` — dark theme, matching the business
card and startech-innovation.com.

## Output

| File | Format | Use |
|---|---|---|
| `out/pitch-{EN,JA,KO,ZH-Hans,ZH-Hant,ES,PT,ID}.pdf` | 16:9, 8 slides | **Capability deck** — first contact; also the website download |
| `profile-EN.pdf` / `profile-ID.pdf` | A4 portrait, 5 pages | **Company profile** — printable leave-behind, same story in more detail |
| `deck-EN.pdf` / `deck-ID.pdf` | 16:9 landscape, 9 slides | **Technical profile** — for a technical lead reviewing the work |

All three tell the same story, rewritten on 2026-11-02: Singapore and
Japan, founder-led, the scoping sprint and care plan, and the spreadsheet
offer. Each piece of work says where it stands: only the exporter system is
live with a client. There are no accounting or payroll-accuracy claims,
and the only grant named is EDGE, with no percentage. Claims are tracked in
`../../docs/COMPANY.md`; check it before changing one in any of the three.

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

## Technical profile structure (landscape)

1. Cover
2. Who we are — positioning + four headline metrics
3. **Engineering evidence** — ERP test figures + a defect caught on a
   live client system
4. How we build — architecture principles
5. Data & AI — multi-model, answers with sources, human sign-off
6. Selected work — the same four cards as the capability deck, with stacks
7. Technology — the full stack
8. How we work — scoping sprint to care plan
9. Next step — the spreadsheet offer + contact

Written for a technical audience that will probe the claims. The figures
on slides 2, 3 and 6 come from the internal ERP build, which is in
development and not deployed; the slides say so. Sources:

- `startech_erp_java/docs/architecture/verification-report-2026-08.md`:
  9,273 unit + 549 integration + 17 architecture tests (9,839), 0
  failures; SpotBugs gate at 0 findings.
- `startech_erp_java/docs/architecture/calculation-layer-design.md`: 484
  calculation classes, 7,060 tests, about 12 seconds without a database.

Re-verify with `./mvnw clean verify` in `startech_erp_java` and read the
Surefire / Failsafe totals. Do not grep for `@Test`: that counts test
methods (about 5,400), not the parameterised runs the totals report.

The same report found two claims the old deck made untrue, so they must
not come back: the "5-engine verification" is two engines (Java and
PostgreSQL), and tenancy is single-schema with a tenant column, not
schema-per-tenant.

## Regenerating

```bash
python3 render.py        # A4 profile  -> out/profile-{EN,ID}.html
python3 render_deck.py   # 16:9 deck   -> out/deck-{EN,ID}.html

cd out
for f in profile-EN profile-ID deck-EN deck-ID; do
  chromium --headless --disable-gpu --no-pdf-header-footer \
    --print-to-pdf=$f.pdf file://$PWD/$f.html
  cp $f.pdf ../$f.pdf     # the top-level copies are the ones to send
done
```

The profile's working-languages line needs Noto Sans CJK SC installed
(Arch: `noto-fonts-cjk`) to draw 中文 in the right face. `render_pitch.py`
reuses `render_deck.py`'s `css()` and slide builders, so after editing
`render_deck.py` re-render the capability deck and confirm its HTML is
unchanged.

## Editing content

- `content.py` — A4 profile copy, plus `COMMON` (shared company details)
- `deck_content.py` — technical profile copy; imports `COMMON`
- `pitch_content.py` — capability deck copy, eight languages

Both language dicts in each file use identical keys, so add to both
when adding a field. Layout lives in `render.py` / `render_deck.py`.

Fonts (Inter, Instrument Serif) are base64-embedded in
`fonts/fonts-embedded.css`, so PDFs render identically on any machine.
`assets.py` holds the base64 logo, from `../logos/startech-mark-light.svg`.
