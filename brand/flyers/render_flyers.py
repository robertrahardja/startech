#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Render the StarTech image flyers (EN, JA, ID, country sites) to PNG.

The image flyer is what gets sent on WhatsApp, LINE, Instagram and LinkedIn:
headline, who it is for, three proof lines, the spreadsheet offer, the link
and a QR code. Two sizes per language:

    portrait   1080 x 1350   WhatsApp, LINE, Instagram
    landscape  1200 x 628    LinkedIn, email

Same look as the capability deck: render_deck.py's palette, the embedded
Inter / Instrument Serif faces and, for Japanese, the deck's Noto Sans JP
subset. HTML goes to html/, PNGs to this folder and to
public/assets/flyers/, so they can be shared by link.

    python3 render_flyers.py              # HTML, PNGs, checks, publish copy
    python3 render_flyers.py --html-only  # HTML only (before a font rebuild)

Each PNG is checked for its exact size and for overflow: the page measures
every element against the frame and reports anything that spills past the
padding, and the script fails if anything does. See README.md for the full
order when Japanese text changes.
"""
import argparse
import html
import os
import re
import shutil
import struct
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))
sys.path.insert(0, os.path.join(HERE, "..", "profile"))
# One palette for every piece of collateral.
from render_deck import BG, BLUE, GOLD, TEXT  # noqa: E402
from flyer_content import FLYERS  # noqa: E402

HTML_DIR = os.path.join(HERE, "html")
QR_DIR = os.path.join(HERE, "qr")
PUBLIC_DIR = os.path.join(REPO, "public", "assets", "flyers")
CHROMIUM = os.environ.get("CHROMIUM", "chromium")

SIZES = {"portrait": (1080, 1350), "landscape": (1200, 628)}
# Target QR width in px, snapped down to a whole number of px per module so
# the edges stay sharp. The portrait one must stay at 220 px or more.
QR_TARGET = {"portrait": 250, "landscape": 250}

# Relative to html/: the deck's embedded fonts and the transparent mark.
FONT_CSS = "../../profile/fonts/fonts-embedded.css"
FONT_CSS_JA = "../../profile/fonts/fonts-ja-embedded.css"
LOGO = "../../logos/startech-mark-light.svg"


# ---------------------------------------------------------------- QR codes

def ensure_qr(d):
    """Return qr/<name>.svg, regenerating it only if its URL changed."""
    path = os.path.join(QR_DIR, f"{d['name']}.svg")
    stamp = f"<!-- {d['qr']} -->"
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            if f.readline().strip() == stamp:
                return path
    os.makedirs(QR_DIR, exist_ok=True)
    cmd = ["node", os.path.join(HERE, "make_qr.cjs"), d["qr"], path]
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        sys.exit(f"QR for {d['name']} failed: {res.stderr.strip()}")
    print("wrote", os.path.relpath(path, REPO))
    return path


def qr_modules(path):
    """Width of the code in modules, quiet zone included (the viewBox)."""
    with open(path, encoding="utf-8") as f:
        m = re.search(r'viewBox="0 0 (\d+) \1"', f.read())
    if not m:
        sys.exit(f"{path}: no square viewBox")
    return int(m.group(1))


# -------------------------------------------------------------------- page

def css():
    return f"""
* {{ margin:0; padding:0; box-sizing:border-box; }}
html, body {{ background:{BG}; }}
body {{ font-family:'Inter',system-ui,sans-serif; color:{TEXT};
  letter-spacing:-0.01em; -webkit-font-smoothing:antialiased; }}
.frame {{ position:relative; overflow:hidden; background:{BG}; }}
.portrait .frame {{ width:1080px; height:1350px; padding:70px 80px 68px; }}
.landscape .frame {{ width:1200px; height:628px; padding:46px 54px 44px; }}

/* the deck's glows, in pixels */
.glow {{ position:absolute; border-radius:50%; pointer-events:none; }}
.g1 {{ background:rgba(79,107,247,0.16); }}
.g2 {{ background:rgba(192,132,252,0.09); }}
.portrait .g1 {{ top:-260px; left:18%; width:760px; height:520px;
  filter:blur(200px); }}
.portrait .g2 {{ bottom:-220px; right:-140px; width:640px; height:480px;
  filter:blur(190px); }}
.landscape .g1 {{ top:-230px; left:12%; width:700px; height:400px;
  filter:blur(170px); }}
.landscape .g2 {{ bottom:-200px; right:-120px; width:560px; height:380px;
  filter:blur(160px); }}

.z {{ position:relative; z-index:2; height:100%; display:flex; }}
.portrait .z {{ flex-direction:column; }}
.landscape .z {{ flex-direction:row; gap:44px; }}
.col {{ display:flex; flex-direction:column; flex:1; min-width:0; }}
/* Nothing shrinks, so too much text overflows (and the check reports it)
   instead of quietly squashing the rule to nothing; only spacers flex. */
.z > *, .col > * {{ flex-shrink:0; }}
.sp {{ flex:1 1 0; }}
.portrait .sp {{ min-height:24px; }}
.landscape .sp {{ min-height:16px; }}

.brand {{ display:flex; align-items:center; }}
.brand img {{ display:block; width:auto; }}
.brand span {{ font-weight:500; letter-spacing:0.16em;
  text-transform:uppercase; color:#8b8b95; white-space:nowrap; }}
.portrait .brand {{ gap:20px; }}
.portrait .brand img {{ height:46px; }}
.portrait .brand span {{ font-size:17px; }}
.landscape .brand {{ gap:14px; }}
.landscape .brand img {{ height:32px; }}
.landscape .brand span {{ font-size:12.5px; }}

h1 {{ font-family:'Instrument Serif',Georgia,serif; font-weight:400;
  color:#fff; line-height:1.02; letter-spacing:-0.03em; }}
.portrait h1 {{ font-size:100px; }}
.landscape h1 {{ font-size:64px; }}
.rule {{ height:2px; background:linear-gradient(90deg,{GOLD},
  rgba(212,168,83,0)); }}
.portrait .rule {{ width:130px; margin:32px 0 28px; }}
.landscape .rule {{ width:90px; margin:18px 0 14px; }}
.who {{ color:#a1a1aa; font-weight:300; line-height:1.45;
  text-wrap:pretty; }}
.portrait .who {{ font-size:32px; }}
.landscape .who {{ font-size:20px; }}

.proof {{ list-style:none; }}
.proof li {{ display:grid; border-top:1px solid rgba(255,255,255,0.09); }}
.proof li:last-child {{ border-bottom:1px solid rgba(255,255,255,0.09); }}
.proof .i {{ font-family:'Instrument Serif',Georgia,serif; color:{BLUE};
  line-height:1.1; }}
.proof .t {{ font-weight:600; color:#fff; line-height:1.25; }}
.proof .d {{ color:#a1a1aa; line-height:1.42; text-wrap:pretty; }}
.portrait .proof li {{ grid-template-columns:70px 1fr; padding:17px 0; }}
.portrait .proof .i {{ font-size:36px; }}
.portrait .proof .t {{ font-size:31px; }}
.portrait .proof .d {{ font-size:25px; margin-top:3px; }}
.landscape .proof li {{ grid-template-columns:40px 1fr; padding:9px 0; }}
.landscape .proof .i {{ font-size:22px; }}
.landscape .proof .t {{ font-size:18.5px; }}
.landscape .proof .d {{ font-size:16px; margin-top:1px; }}

.cta {{ display:flex; border-radius:22px;
  background:linear-gradient(135deg,rgba(79,107,247,0.15),
    rgba(192,132,252,0.07));
  border:1px solid rgba(129,140,248,0.28); }}
.cta h2 {{ font-family:'Instrument Serif',Georgia,serif; font-weight:400;
  color:#fff; line-height:1.08; letter-spacing:-0.02em;
  text-wrap:balance; }}
.cta p {{ color:#c8c8d0; line-height:1.42; text-wrap:pretty; }}
.cta .link {{ font-weight:600; color:#fff; white-space:nowrap;
  letter-spacing:-0.01em; text-decoration:underline;
  text-decoration-color:rgba(212,168,83,0.75);
  text-decoration-thickness:2px; text-underline-offset:0.28em; }}
.qr {{ flex:none; background:#fff; border-radius:14px; line-height:0;
  overflow:hidden; }}
.qr img {{ display:block; }}
.portrait .cta {{ align-items:center; gap:32px;
  padding:30px 30px 30px 40px; }}
.portrait .cta .txt {{ flex:1; min-width:0; }}
.portrait .cta h2 {{ font-size:46px; }}
.portrait .cta p {{ font-size:24px; margin-top:12px; }}
.portrait .cta .link {{ font-size:26px; margin-top:20px; }}
.landscape .cta {{ flex:none; width:420px; flex-direction:column;
  align-items:flex-start; padding:26px 30px 24px; }}
.landscape .cta h2 {{ font-size:34px; }}
.landscape .cta p {{ font-size:17.5px; margin-top:8px; }}
.landscape .cta .qr {{ margin-top:auto; align-self:center; }}
.landscape .cta .link {{ font-size:19px; margin-top:12px;
  align-self:center; }}

/* Japanese: the deck's Noto Sans JP subset behind the Latin faces, and
   phrase-aware line breaks so words are not split mid-phrase. */
html[lang=ja] body {{ font-family:'Inter','Noto Sans JP Subset',
  sans-serif; letter-spacing:0; }}
/* Headings in Noto Sans JP throughout, so a digit inside them (1つ) is not
   drawn in Instrument Serif, where it reads like an "l". */
html[lang=ja] h1, html[lang=ja] h2 {{
  font-family:'Noto Sans JP Subset',sans-serif; }}
html[lang=ja] {{ word-break:auto-phrase; line-break:strict; }}
html[lang=ja] h1 {{ letter-spacing:0; line-height:1.24; }}
html[lang=ja].portrait h1 {{ font-size:76px; }}
html[lang=ja].landscape h1 {{ font-size:48px; }}
html[lang=ja] .who {{ line-height:1.6; }}
html[lang=ja].portrait .who {{ font-size:30px; }}
html[lang=ja] .cta h2 {{ letter-spacing:0; line-height:1.32; }}
html[lang=ja].portrait .cta h2 {{ font-size:36px; }}
html[lang=ja].landscape .cta h2 {{ font-size:26px; }}
"""


# Measures every element against the frame's padding box once fonts are in,
# and writes the result to <body data-overflow>, which render_flyers.py reads
# back with --dump-dom. "x:" marks text wider than its own box.
CHECK_JS = """
addEventListener('load', () => document.fonts.ready.then(() => {
  const frame = document.querySelector('.frame');
  const cs = getComputedStyle(frame), fr = frame.getBoundingClientRect();
  const box = {
    l: fr.left + parseFloat(cs.paddingLeft) - 1,
    t: fr.top + parseFloat(cs.paddingTop) - 1,
    r: fr.right - parseFloat(cs.paddingRight) + 1,
    b: fr.bottom - parseFloat(cs.paddingBottom) + 1,
  };
  const name = el => el.className || el.tagName.toLowerCase();
  const bad = new Set();
  frame.querySelectorAll('.z *').forEach(el => {
    const r = el.getBoundingClientRect();
    if (!r.width && !r.height) return;
    if (r.left < box.l || r.top < box.t || r.right > box.r || r.bottom > box.b)
      bad.add(name(el));
    if (el.clientWidth && el.scrollWidth > el.clientWidth + 1)
      bad.add('x:' + name(el));
  });
  document.body.dataset.overflow = bad.size ? [...bad].join(' ') : 'none';
  document.body.dataset.fonts = [...document.fonts]
    .filter(f => f.status === 'loaded').map(f => f.family + ' ' + f.weight)
    .join('|');
}));
"""


def page(d, size, qr_src, qr_px):
    e = html.escape
    fonts = f'<link rel="stylesheet" href="{FONT_CSS}">'
    if d["lang"] == "ja":
        fonts += f'\n<link rel="stylesheet" href="{FONT_CSS_JA}">'
    headline = "<br>".join(e(line) for line in d["headline"])
    proof = "".join(
        f'<li><div class="i">{i:02d}</div><div><div class="t">{e(t)}</div>'
        f'<div class="d">{e(b)}</div></div></li>'
        for i, (t, b) in enumerate(d["proof"], 1))
    brand = (f'<div class="brand"><img src="{LOGO}" alt="StarTech">'
             f'<span>{e(d["company"])}</span></div>')
    intro = (f'<h1>{headline}</h1><div class="rule"></div>'
             f'<p class="who">{e(d["who"])}</p>')
    qr = (f'<div class="qr"><img src="{qr_src}" width="{qr_px}" '
          f'height="{qr_px}" alt="QR code: {e(d["link"])}"></div>')
    offer = (f'<h2>{e(d["offer_head"])}</h2><p>{e(d["offer_body"])}</p>')
    link = f'<div class="link">{e(d["link"])}</div>'

    if size == "portrait":
        body = f"""{brand}
  <div class="sp"></div>
  {intro}
  <div class="sp"></div>
  <ol class="proof">{proof}</ol>
  <div class="sp"></div>
  <div class="cta"><div class="txt">{offer}{link}</div>{qr}</div>"""
    else:
        body = f"""<div class="col">
    {brand}
    <div class="sp"></div>
    {intro}
    <div class="sp"></div>
    <ol class="proof">{proof}</ol>
  </div>
  <div class="cta">{offer}{qr}{link}</div>"""

    return f"""<!doctype html>
<html lang="{d['lang']}" class="{size}">
<head>
<meta charset="utf-8">
<title>StarTech Innovation flyer ({d['name']}, {size})</title>
{fonts}
<style>{css()}</style>
</head>
<body>
<div class="frame">
<div class="glow g1"></div><div class="glow g2"></div>
<div class="z">
  {body}
</div>
</div>
<script>{CHECK_JS}</script>
</body>
</html>
"""


# ---------------------------------------------------------------- chromium

def chromium(w, h, *args):
    cmd = [CHROMIUM, "--headless", "--disable-gpu", "--hide-scrollbars",
           "--force-device-scale-factor=1", f"--window-size={w},{h}",
           "--virtual-time-budget=4000", *args]
    return subprocess.run(cmd, capture_output=True, text=True, check=True)


def png_size(path):
    with open(path, "rb") as f:
        head = f.read(24)
    if head[:8] != b"\x89PNG\r\n\x1a\n":
        sys.exit(f"{path}: not a PNG")
    return struct.unpack(">II", head[16:24])


def check(html_path, w, h):
    """Return (overflow report, fonts loaded) from the page's own check."""
    dom = chromium(w, h, "--dump-dom", "file://" + html_path).stdout
    over = re.search(r'data-overflow="([^"]*)"', dom)
    fonts = re.search(r'data-fonts="([^"]*)"', dom)
    return (html.unescape(over.group(1)) if over else "no report",
            html.unescape(fonts.group(1)) if fonts else "")


# -------------------------------------------------------------------- main

def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--html-only", action="store_true",
                    help="write the HTML and stop (before a font rebuild)")
    args = ap.parse_args()

    os.makedirs(HTML_DIR, exist_ok=True)
    jobs = []
    for d in FLYERS:
        qr_path = ensure_qr(d)
        modules = qr_modules(qr_path)
        for size, (w, h) in SIZES.items():
            qr_px = QR_TARGET[size] // modules * modules
            name = f"flyer-{d['name']}-{size}"
            html_path = os.path.join(HTML_DIR, name + ".html")
            qr_src = "../qr/" + os.path.basename(qr_path)
            with open(html_path, "w", encoding="utf-8") as f:
                f.write(page(d, size, qr_src, qr_px))
            jobs.append((name, html_path, w, h, d["lang"], qr_px))
    print(f"wrote {len(jobs)} HTML files to", os.path.relpath(HTML_DIR, REPO))
    if args.html_only:
        return

    failed = []
    os.makedirs(PUBLIC_DIR, exist_ok=True)
    for name, html_path, w, h, lang, qr_px in jobs:
        png = os.path.join(HERE, name + ".png")
        chromium(w, h, f"--screenshot={png}", "file://" + html_path)
        got = png_size(png)
        over, fonts = check(html_path, w, h)
        need = ["Inter", "Instrument Serif"]
        if lang == "ja":
            need.append("Noto Sans JP Subset")
        missing = [f for f in need if f not in fonts]
        problems = []
        if got != (w, h):
            problems.append(f"size {got[0]}x{got[1]}, want {w}x{h}")
        if over != "none":
            problems.append(f"overflow: {over}")
        if missing:
            problems.append(f"fonts not loaded: {', '.join(missing)}")
        status = "; ".join(problems) or "ok"
        print(f"{name}.png  {got[0]}x{got[1]}  QR {qr_px}px  {status}")
        if problems:
            # Kept here to look at, but never published.
            failed.append(name)
            continue
        shutil.copy2(png, os.path.join(PUBLIC_DIR, name + ".png"))
    print("published passing PNGs to", os.path.relpath(PUBLIC_DIR, REPO))
    if failed:
        sys.exit(f"{len(failed)} flyer(s) need attention: {', '.join(failed)}")


if __name__ == "__main__":
    main()
