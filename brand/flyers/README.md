# Image Flyers

The image Robert sends on WhatsApp, LINE, Instagram and LinkedIn: the
capability deck's cover and proof in one frame (plan:
`startech_marketing/gtm/playbooks/digital-flyers-and-social.md`, 3.2).
English, Japanese and Bahasa Indonesia, two sizes each, plus variants
for the country sites.

| File | Size | Use |
| --- | --- | --- |
| `flyer-<name>-portrait.png` | 1080 x 1350 | WhatsApp, LINE, Instagram |
| `flyer-<name>-landscape.png` | 1200 x 628 | LinkedIn, email |

`<name>` is `en`, `ja` or `id`, or a country-site variant:
`malaysia-en`, `philippines-en`, `thailand-ja`, `thailand-en`,
`vietnam-ja` and `vietnam-en`. A variant is the EN or JA flyer word for
word; only its written link and QR code change, to
`<country>.startech-innovation.com`. Use them in the outreach in
`startech_marketing/gtm/playbooks/outreach-new-countries.md`.

Copies are served from `public/assets/flyers/`, so each one can be
shared by link, for example
`startech-innovation.com/assets/flyers/flyer-en-portrait.png`.

## What each flyer says

Headline, who it is for, three proof lines, the spreadsheet offer, the
link written out with a QR code, and the logo with "StarTech Innovation
Pte. Ltd." and the country. The proof lines are the deck's and nothing
more: the exporter system live in Japan, the 7,060 tests in the internal
ERP build (not deployed), and the client owning the code, database and
cloud account. Check `../../docs/COMPANY.md` ("Claims to keep honest")
before changing a line.

The QR codes open the written link plus `?utm_source=qr`, so hq can tell
a scan from a typed visit. The Indonesian link,
`indonesia.startech-innovation.com`, points at a site still being built,
and so did the Malaysia, Philippines, Thailand and Vietnam links when
their flyers were made (8 Nov 2026). Thailand and Vietnam have one site
each for Japanese and English, so both languages share the link. If
those sites serve English at `/en`, as the Japan site does, point the two
EN variants there in `flyer_content.py` and render again.

## Files

- `flyer_content.py`: the copy, one dict per language with identical keys;
  `country_site()` makes the country variants from the EN and JA dicts
- `render_flyers.py`: layout (HTML and CSS), render, checks and publish
- `html/`: the rendered HTML, the source of each PNG
- `qr/<name>.svg`: the QR codes, committed
- `make_qr.cjs`: writes a QR code; only needed when a link changes

The layout reuses the deck's palette (`../profile/render_deck.py`), its
embedded Inter and Instrument Serif faces and, for Japanese, its Noto Sans
JP subset (`../profile/fonts/`). The HTML links to those files, so render
it in place.

## Re-rendering

Run from this folder (Python 3, Chromium on the path or in `$CHROMIUM`):

```bash
python3 render_flyers.py
```

This writes `html/`, screenshots each page with headless Chromium at its
exact size, and copies the PNGs to `public/assets/flyers/`. A PNG fails,
and is not copied, if it is the wrong size, if any element spills past
the frame's padding, or if a brand font did not load. The page measures
that itself and reports it through `--dump-dom`. Look at the PNGs before
sending them anyway.

When the Japanese text changes, its glyphs must be added to the embedded
subset, which the deck shares:

```bash
python3 render_flyers.py --html-only
cd ../profile
python3 render_pitch.py
uvx --from fonttools --with brotli python build_cjk_fonts.py
python3 render_pitch.py      # then print the decks to PDF again
cd ../flyers
python3 render_flyers.py
```

When a link changes, the QR code is regenerated on the next render with
the `qrcode` package (1.5.4, the version `apps/japan` pins). Point
`NODE_PATH` at a `node_modules` that has it, for example `apps/japan`'s
on the `japan-flyer` branch:

```bash
NODE_PATH=/path/to/apps/japan/node_modules python3 render_flyers.py
```

Codes use error correction level M and come out at version 4 (33
modules). The portrait code is 246 px and the landscape one 246 px, six
pixels per module; keep the portrait one at 220 px or more.
