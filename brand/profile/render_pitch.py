#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Render the StarTech Innovation pitch deck to HTML (EN).

Customer-facing capability deck for Singapore and Japan prospects.
Landscape 16:9 slides, PDF-ready. Same brand system as render_deck.py
(../guidelines/brand-guidelines.md) — dark theme, matching the
business card and startech-innovation.com. Reuses that file's CSS and
slide builders; only the content and slide order differ.
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from assets import ASSETS  # noqa: F401  (used by render_deck builders)
from content import COMMON
from pitch_content import EN, JA, ID, KO, ZH_HANS, ZH_HANT, ES, PT
import render_deck as rd

HERE = os.path.dirname(os.path.abspath(__file__))

# CJK languages need a subsetted Noto Sans face embedded as a fallback
# after the Latin faces (Inter / Instrument Serif have no CJK glyphs),
# so each script renders from its own embedded font while Latin text
# and numerals keep using the brand faces. Each subset is built from
# fonts/*.css only for the glyphs actually used in that language's
# content (see brand/profile/README.md regeneration notes) — regenerate
# it if pitch_content.py's CJK text changes.
CJK_FONTS = {
    'ja': ('fonts-ja-embedded.css', 'Noto Sans JP Subset'),
    'ko': ('fonts-ko-embedded.css', 'Noto Sans KR Subset'),
    'zh-Hans': ('fonts-zhs-embedded.css', 'Noto Sans SC Subset'),
    'zh-Hant': ('fonts-zht-embedded.css', 'Noto Sans TC Subset'),
}
CJK_FONT_CSS = {
    lang: open(os.path.join(HERE, 'fonts', fname)).read()
    for lang, (fname, _family) in CJK_FONTS.items()
}


def cjk_css_override(family):
    return f"""
body {{ font-family:'Inter','{family}',system-ui,sans-serif; }}
h1, h2, h3, .cov-tag, .stat .n, .evc .n, .item .i {{
  font-family:'Instrument Serif','{family}',Georgia,serif;
}}
"""
# Every selector render_deck.py sets in Instrument Serif needs the CJK subset
# behind it; without it, CJK in the evidence card titles (e.g. 第1週) fell
# through to whatever serif CJK font the rendering machine had.


# Two slides overflow into the footer at render_deck.py's sizes: the four
# case-study cards (slide 5, every language) and the evidence cards plus
# case box (slide 3, in the longer ES / PT / ID text). Tighter spacing for
# those slides, in this deck only — render_deck.py's own deck is unchanged.
TIGHT_CSS = """
.evc { padding:5.5mm 5mm; }
.evc .n { font-size:30pt; margin-bottom:3mm; }
.evc p { font-size:9.8pt; line-height:1.5; }
.case { padding:5mm 6.5mm; }
.case .k { margin-bottom:2.5mm; }
.case p { font-size:11pt; line-height:1.55; }
.work-tight { gap:3.5mm; }
.work-tight .wc { padding:4mm 5mm; }
.work-tight .wc .top { margin-bottom:1.8mm; }
.work-tight .wc .top h3 { font-size:13pt; line-height:1.3; margin-bottom:1.2mm; }
.work-tight .wc p { font-size:9.4pt; line-height:1.45; margin-bottom:2.2mm; }
.work-tight .wc .tech { font-size:8.4pt; padding-top:2.2mm; }
"""


def s_work_lead(d, n, tot):
    """Work slide with a small confidentiality note beside the title."""
    w = ''.join(
        f'<div class="wc"><div class="top"><h3>{t}</h3>'
        f'<div class="sec">{sec}</div></div><p>{b}</p>'
        f'<div class="tech">{tech}</div></div>'
        for t, sec, b, tech in d['work'])
    return f"""<div class="slide">
<div class="glow g1"></div><div class="glow g2"></div>
<div class="z">{rd.head(d)}
  <div class="split-w" style="align-items:end">
    <div>
      <div class="kicker">{d['work_kicker']}</div>
      <h2 style="margin:3.5mm 0 0">{d['work_head']}</h2>
    </div>
    <p class="lead" style="font-size:11pt">{d['work_lead']}</p>
  </div>
  <div class="rule" style="margin:3.5mm 0 4mm"></div>
  <div class="work work-tight">{w}</div>
  <div class="sp"></div>
</div>{rd.foot(d, n, tot)}</div>"""


def render(d):
    tot = 8
    slides = (
        rd.s_cover(d)
        + rd.s_positioning(d, 2, tot)
        + rd.s_evidence(d, 3, tot)
        + rd.s_items(d, 4, tot, 'arch_kicker', 'arch_head', 'arch_items')
        + s_work_lead(d, 5, tot)
        + rd.s_stack(d, 6, tot)
        + rd.s_process(d, 7, tot)
        + rd.s_contact(d, 8, tot)
    )
    title = f"{COMMON['legal_name']} — {d['doc_label']}"
    page_css = rd.css() + TIGHT_CSS
    lang = d['lang']
    if lang in CJK_FONTS:
        _fname, family = CJK_FONTS[lang]
        page_css += CJK_FONT_CSS[lang] + cjk_css_override(family)
    return (f'<!doctype html><html lang="{lang}"><head>'
            f'<meta charset="utf-8"><title>{title}</title>'
            f'<style>{page_css}</style></head><body>{slides}</body></html>')


if __name__ == '__main__':
    out = os.path.join(HERE, 'out')
    os.makedirs(out, exist_ok=True)
    docs = (
        (EN, 'EN'), (JA, 'JA'), (KO, 'KO'),
        (ZH_HANS, 'ZH-Hans'), (ZH_HANT, 'ZH-Hant'),
        (ES, 'ES'), (PT, 'PT'), (ID, 'ID'),
    )
    for d, sfx in docs:
        p = os.path.join(out, f'pitch-{sfx}.html')
        open(p, 'w', encoding='utf-8').write(render(d))
        print('wrote', p, os.path.getsize(p), 'bytes')
