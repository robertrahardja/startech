#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Render the StarTech Innovation capability deck to HTML (EN + ID).

Landscape 16:9 slides, PDF-ready. On-brand per
../guidelines/brand-guidelines.md — dark theme, matching the business
card and startech-innovation.com.

Technical-depth framing for an engineering audience.
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from assets import ASSETS
from content import COMMON
from deck_content import EN, ID

HERE = os.path.dirname(os.path.abspath(__file__))
FONT_CSS = open(os.path.join(HERE, 'fonts', 'fonts-embedded.css')).read()

BG, CARD, TEXT, MUTED = '#09090b', '#141419', '#e4e4e7', '#71717a'
BLUE, PINK, GOLD = '#4f6bf7', '#c084fc', '#d4a853'

# 16:9 at 338.7mm x 190.5mm (fits A4 landscape width nicely)
W, H = '338.7mm', '190.5mm'


def css():
    return FONT_CSS + f"""
* {{ margin:0; padding:0; box-sizing:border-box; }}
@page {{ size: {W} {H}; margin: 0; }}
html {{ -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
body {{
  font-family:'Inter', system-ui, sans-serif;
  background:{BG}; color:{TEXT};
  font-size:13pt; line-height:1.6; letter-spacing:-0.01em;
}}
.slide {{
  position:relative; width:{W}; height:{H};
  padding:16mm 20mm 14mm; background:{BG};
  overflow:hidden; page-break-after:always;
  display:flex; flex-direction:column;
}}
.slide:last-child {{ page-break-after:auto; }}

/* glow */
.glow {{ position:absolute; border-radius:50%; pointer-events:none; }}
.g1 {{ top:-60mm; left:20%; width:180mm; height:120mm;
  background:rgba(79,107,247,0.13); filter:blur(55mm); }}
.g2 {{ bottom:-55mm; right:-30mm; width:150mm; height:110mm;
  background:rgba(192,132,252,0.075); filter:blur(52mm); }}
.g3 {{ top:30%; left:-50mm; width:120mm; height:100mm;
  background:rgba(212,168,83,0.04); filter:blur(50mm); }}
.z {{ position:relative; z-index:2; display:flex; flex-direction:column;
  height:100%; }}

/* type */
.kicker {{ font-size:9pt; font-weight:500; letter-spacing:0.2em;
  text-transform:uppercase; color:{MUTED}; }}
h1 {{ font-family:'Instrument Serif',Georgia,serif; font-weight:400;
  font-size:40pt; line-height:1.1; letter-spacing:-0.03em; color:#fff; }}
h2 {{ font-family:'Instrument Serif',Georgia,serif; font-weight:400;
  font-size:32pt; line-height:1.16; letter-spacing:-0.022em; color:#fff; }}
h3 {{ font-size:14.5pt; font-weight:600; color:#fff;
  letter-spacing:-0.012em; }}
p {{ color:{MUTED}; }}
.lead {{ font-size:14pt; line-height:1.66; color:#a1a1aa; font-weight:300; }}
em {{ font-style:italic; color:#c9c9d2; }}

.rule {{ height:1px; width:36mm;
  background:linear-gradient(90deg,{BLUE},{PINK},transparent);
  opacity:0.6; }}
.rule-gold {{ height:1px; width:26mm;
  background:linear-gradient(90deg,{GOLD},rgba(212,168,83,0)); }}
.hr {{ height:1px; background:rgba(255,255,255,0.07); }}
.sp {{ flex:1; }}

/* slide header + footer */
.shead {{ display:flex; justify-content:space-between; align-items:center;
  padding-bottom:3.5mm; margin-bottom:9mm;
  border-bottom:1px solid rgba(255,255,255,0.07); }}
.shead .nm {{ font-size:8.4pt; font-weight:600; letter-spacing:0.18em;
  text-transform:uppercase; color:#8b8b95; }}
.shead .dl {{ font-size:8.4pt; letter-spacing:0.14em; text-transform:uppercase;
  color:{MUTED}; }}
.sfoot {{ position:absolute; left:20mm; right:20mm; bottom:7mm; z-index:2;
  display:flex; justify-content:space-between; align-items:flex-end;
  gap:12mm; padding-top:2.5mm;
  border-top:1px solid rgba(255,255,255,0.06); }}
.sfoot .c {{ font-size:7.4pt; font-style:italic; color:#55555e;
  max-width:200mm; line-height:1.5; }}
.sfoot .p {{ font-size:8pt; color:#55555e; letter-spacing:0.1em; }}

/* cover */
.cover {{ justify-content:center; padding-bottom:20mm; }}
.cov-logo {{ width:34mm; margin-bottom:8mm; }}
.cov-sub {{ font-size:14pt; line-height:1.62; color:#a1a1aa;
  font-weight:300; max-width:150mm; margin-top:6mm; }}
.cov-tag {{ font-family:'Instrument Serif',Georgia,serif; font-style:italic;
  font-size:16pt; color:{MUTED}; margin-top:6.5mm; }}
.cov-meta {{ display:flex; gap:6mm; align-items:center; margin-top:8mm; }}
.cov-meta span {{ font-size:8.6pt; letter-spacing:0.2em;
  text-transform:uppercase; color:{MUTED}; }}
.cov-meta i {{ width:1px; height:3.5mm; background:rgba(113,113,122,0.4); }}
.cov-foot {{ position:absolute; left:20mm; right:20mm; bottom:11mm;
  z-index:2; display:flex; justify-content:space-between;
  align-items:flex-end; }}
.cov-foot .l {{ font-size:9.4pt; color:{MUTED}; line-height:1.7; }}
.cov-foot .l b {{ color:#c8c8d0; font-weight:500; }}

/* two-column split */
.split {{ display:grid; grid-template-columns:0.85fr 1.15fr; gap:14mm;
  align-items:start; }}
.split-w {{ display:grid; grid-template-columns:1.15fr 1fr; gap:16mm; }}

/* stat row */
.stats {{ display:grid; grid-template-columns:repeat(4,1fr); gap:8mm; }}
.stat .n {{ font-family:'Instrument Serif',Georgia,serif; font-size:40pt;
  line-height:1; color:#fff; letter-spacing:-0.02em; }}
.stat .n span {{ font-size:17pt; color:{BLUE}; }}
.stat .l {{ font-size:10pt; line-height:1.5; color:{MUTED}; margin-top:3.5mm;
  padding-top:3mm; border-top:1px solid rgba(255,255,255,0.09); }}

/* evidence cards */
.ev {{ display:grid; grid-template-columns:repeat(4,1fr); gap:5mm; }}
.evc {{ background:{CARD}; border:1px solid rgba(255,255,255,0.07);
  border-top:2px solid {BLUE}; border-radius:2.4mm; padding:7mm 6mm; }}
.evc .k {{ font-size:8.6pt; letter-spacing:0.14em; text-transform:uppercase;
  color:{MUTED}; margin-bottom:3mm; }}
.evc .n {{ font-family:'Instrument Serif',Georgia,serif; font-size:34pt;
  line-height:1; color:#fff; margin-bottom:4mm; letter-spacing:-0.02em; }}
.evc p {{ font-size:10.4pt; line-height:1.58; }}

/* case callout */
.case {{ background:linear-gradient(135deg,rgba(212,168,83,0.075),
  rgba(212,168,83,0.02)); border:1px solid rgba(212,168,83,0.24);
  border-radius:2.6mm; padding:6.5mm 7mm; }}
.case .k {{ font-size:8.6pt; letter-spacing:0.16em; text-transform:uppercase;
  color:{GOLD}; margin-bottom:3.5mm; }}
.case p {{ font-size:12pt; line-height:1.62; color:#a8a8b2; }}

/* numbered list blocks */
.items {{ display:grid; grid-template-columns:1fr 1fr; gap:11mm 14mm; }}
.item {{ display:grid; grid-template-columns:12mm 1fr; gap:1mm;
  align-items:start; }}
.item .i {{ font-family:'Instrument Serif',Georgia,serif; font-size:19pt;
  color:{BLUE}; line-height:1.1; }}
.item h3 {{ margin-bottom:2.8mm; }}
.item p {{ font-size:11.4pt; line-height:1.62; }}

/* work slide */
.work {{ display:grid; grid-template-columns:1fr 1fr; gap:5mm; }}
.wc {{ background:{CARD}; border:1px solid rgba(255,255,255,0.07);
  border-left:2px solid {BLUE}; border-radius:2.4mm; padding:5.5mm 5.5mm; }}
.wc .top {{ margin-bottom:2.6mm; }}
.wc .top h3 {{ margin-bottom:1.6mm; }}
.wc .sec {{ font-size:8.2pt; letter-spacing:0.1em; text-transform:uppercase;
  color:{GOLD}; }}
.wc p {{ font-size:10pt; line-height:1.52; margin-bottom:3mm; }}
.wc .tech {{ font-size:8.8pt; color:#8f8f99; padding-top:3mm;
  border-top:1px solid rgba(255,255,255,0.08); letter-spacing:0.01em; }}

/* stack slide */
.stk {{ display:grid; grid-template-columns:repeat(3,1fr); gap:11mm 12mm; }}
.stk .k {{ font-size:9.4pt; letter-spacing:0.14em; text-transform:uppercase;
  color:{BLUE}; margin-bottom:2.6mm; padding-bottom:2.6mm;
  border-bottom:1px solid rgba(255,255,255,0.09); }}
.stk .v {{ font-size:12pt; line-height:1.7; color:#a8a8b2; }}

/* process */
.proc {{ display:grid; grid-template-columns:repeat(5,1fr); gap:5mm; }}
.proc .c {{ border-top:1px solid rgba(255,255,255,0.1); padding-top:3.5mm;
  position:relative; }}
.proc .c::before {{ content:''; position:absolute; top:-1px; left:0;
  width:40%; height:1px; background:{BLUE}; }}
.proc .w {{ font-size:8.6pt; letter-spacing:0.11em; text-transform:uppercase;
  color:{BLUE}; margin-bottom:2.4mm; }}
.proc .t {{ font-size:12.5pt; font-weight:600; color:#fff; line-height:1.3;
  margin-bottom:2.4mm; }}
.proc .d {{ font-size:10pt; line-height:1.5; color:{MUTED}; }}
.note {{ font-size:11.4pt; line-height:1.6; color:#8f8f99;
  border-left:2px solid rgba(212,168,83,0.5); padding-left:5mm; }}

/* contact */
.cta {{ background:linear-gradient(135deg,rgba(79,107,247,0.12),
  rgba(192,132,252,0.06)); border:1px solid rgba(129,140,248,0.22);
  border-radius:3mm; padding:9mm 8.5mm; }}
.ct {{ display:grid; grid-template-columns:1fr 1fr; gap:8mm 12mm; }}
.ct .k {{ font-size:8.6pt; letter-spacing:0.14em; text-transform:uppercase;
  color:{MUTED}; margin-bottom:1.4mm; }}
.ct .v {{ font-size:12pt; color:#e4e4e7; line-height:1.5;
  word-break:break-word; }}
.ct .v.sm {{ font-size:11pt; color:#b4b4be; }}
"""


def head(d):
    return (f'<div class="shead"><div class="nm">'
            f'{COMMON["legal_name"].upper()}</div>'
            f'<div class="dl">{d["doc_label"]}</div></div>')


def foot(d, n, tot):
    return (f'<div class="sfoot"><div class="c">{d["footer_conf"]}</div>'
            f'<div class="p">{n} / {tot}</div></div>')


def s_cover(d):
    meta = '<i></i>'.join(f'<span>{m}</span>' for m in d['cover_meta'])
    return f"""<div class="slide">
<div class="glow g1"></div><div class="glow g2"></div>
<div class="z cover">
  <img class="cov-logo" src="{ASSETS['MARK_SVG']}" alt="">
  <div class="kicker" style="margin-bottom:6mm">{d['cover_kicker']}</div>
  <h1>{d['cover_head_1']}<br>{d['cover_head_2']}</h1>
  <div class="cov-tag">{COMMON['tagline']}</div>
  <div class="rule-gold" style="margin-top:6mm"></div>
  <p class="cov-sub">{d['cover_sub']}</p>
  <div class="cov-meta">{meta}</div>
</div>
<div class="cov-foot">
  <div class="l"><b>{COMMON['legal_name']}</b><br>
    {COMMON['addr']}<br>UEN {COMMON['uen']}</div>
  <div class="l" style="text-align:right">{COMMON['phone']}<br>
    {COMMON['email']}<br>{COMMON['web']}</div>
</div></div>"""


def s_positioning(d, n, tot):
    st = ''.join(
        f'<div class="stat"><div class="n">{v}</div>'
        f'<div class="l">{l}</div></div>' for v, l in d['pos_stats'])
    return f"""<div class="slide">
<div class="glow g1"></div><div class="glow g3"></div>
<div class="z">{head(d)}
  <div class="split-w">
    <div>
      <div class="kicker">{d['pos_kicker']}</div>
      <h2 style="margin:4mm 0 6mm">{d['pos_head']}</h2>
      <div class="rule"></div>
    </div>
    <div>
      <p class="lead">{d['pos_body']}</p>
      <p class="lead" style="margin-top:5mm">{d['pos_body2']}</p>
    </div>
  </div>
  <div class="sp"></div>
  <div class="stats">{st}</div>
  <div class="sp"></div>
</div>{foot(d, n, tot)}</div>"""


def s_evidence(d, n, tot):
    cards = ''.join(
        f'<div class="evc"><div class="k">{k}</div>'
        f'<div class="n">{v}</div><p>{b}</p></div>'
        for k, v, b in d['ev_cards'])
    return f"""<div class="slide">
<div class="glow g1"></div><div class="glow g2"></div>
<div class="z">{head(d)}
  <div class="split-w" style="align-items:end">
    <div>
      <div class="kicker">{d['ev_kicker']}</div>
      <h2 style="margin:4mm 0 0">{d['ev_head']}</h2>
    </div>
    <p class="lead">{d['ev_lead']}</p>
  </div>
  <div class="rule" style="margin:7mm 0 7mm"></div>
  <div class="ev">{cards}</div>
  <div class="sp"></div>
  <div class="case">
    <div class="k">{d['ev_case_kicker']}</div>
    <p>{d['ev_case']}</p>
  </div>
  <div class="sp"></div>
</div>{foot(d, n, tot)}</div>"""


def s_items(d, n, tot, kicker, head_key, items_key, lead_key=None):
    lead = (f'<p class="lead">{d[lead_key]}</p>' if lead_key else '')
    it = ''.join(
        f'<div class="item"><div class="i">{i:02d}</div><div>'
        f'<h3>{t}</h3><p>{b}</p></div></div>'
        for i, (t, b) in enumerate(d[items_key], 1))
    return f"""<div class="slide">
<div class="glow g1"></div><div class="glow g3"></div>
<div class="z">{head(d)}
  <div class="split-w" style="align-items:end">
    <div>
      <div class="kicker">{d[kicker]}</div>
      <h2 style="margin:4mm 0 0">{d[head_key]}</h2>
    </div>
    {lead}
  </div>
  <div class="rule" style="margin:7mm 0 0"></div>
  <div class="sp"></div>
  <div class="items">{it}</div>
  <div class="sp"></div>
</div>{foot(d, n, tot)}</div>"""


def s_work(d, n, tot):
    w = ''.join(
        f'<div class="wc"><div class="top"><h3>{t}</h3>'
        f'<div class="sec">{sec}</div></div><p>{b}</p>'
        f'<div class="tech">{tech}</div></div>'
        for t, sec, b, tech in d['work'])
    return f"""<div class="slide">
<div class="glow g1"></div><div class="glow g2"></div>
<div class="z">{head(d)}
  <div class="kicker">{d['work_kicker']}</div>
  <h2 style="margin:3.5mm 0 0">{d['work_head']}</h2>
  <div class="rule" style="margin:4.5mm 0 5mm"></div>
  <div class="work">{w}</div>
  <div class="sp"></div>
</div>{foot(d, n, tot)}</div>"""


def s_stack(d, n, tot):
    g = ''.join(f'<div><div class="k">{k}</div><div class="v">{v}</div></div>'
                for k, v in d['stack_groups'])
    return f"""<div class="slide">
<div class="glow g1"></div><div class="glow g3"></div>
<div class="z">{head(d)}
  <div class="kicker">{d['stack_kicker']}</div>
  <h2 style="margin:4mm 0 0">{d['stack_head']}</h2>
  <div class="rule" style="margin:6mm 0 0"></div>
  <div class="sp"></div>
  <div class="stk">{g}</div>
  <div class="sp"></div>
</div>{foot(d, n, tot)}</div>"""


def s_process(d, n, tot):
    p = ''.join(
        f'<div class="c"><div class="w">{w}</div><div class="t">{t}</div>'
        f'<div class="d">{dl}</div></div>' for w, t, dl in d['process'])
    return f"""<div class="slide">
<div class="glow g1"></div><div class="glow g2"></div>
<div class="z">{head(d)}
  <div class="kicker">{d['proc_kicker']}</div>
  <h2 style="margin:4mm 0 0">{d['proc_head']}</h2>
  <div class="rule" style="margin:6mm 0 10mm"></div>
  <div class="proc">{p}</div>
  <div class="sp"></div>
  <div class="note">{d['proc_note']}</div>
  <div class="sp"></div>
</div>{foot(d, n, tot)}</div>"""


def s_contact(d, n, tot):
    L = d['labels']
    def row(k, v, sm=False):
        return (f'<div><div class="k">{k}</div>'
                f'<div class="v{" sm" if sm else ""}">{v}</div></div>')
    rows = (row(L['md'], COMMON['md']) + row(L['phone'], COMMON['phone'])
            + row(L['email'], COMMON['email']) + row(L['web'], COMMON['web'])
            + row(L['linkedin'], COMMON['linkedin'])
            + row(L['uen'], COMMON['uen'])
            + row(L['office'], COMMON['addr'], True))
    return f"""<div class="slide">
<div class="glow g1"></div><div class="glow g2"></div>
<div class="z">{head(d)}
  <div class="kicker">{d['cta_kicker']}</div>
  <h2 style="margin:4mm 0 5mm">{d['cta_head']}</h2>
  <p class="lead" style="max-width:180mm">{d['cta_body']}</p>
  <div class="rule" style="margin:8mm 0 0"></div>
  <div class="sp"></div>
  <div class="ct" style="grid-template-columns:repeat(3,1fr)">{rows}</div>
  <div class="sp"></div>
  <div style="display:flex; align-items:center; gap:7mm">
    <img src="{ASSETS['MARK_SVG']}" style="width:26mm" alt="">
    <div style="font-family:'Instrument Serif',Georgia,serif;
         font-style:italic; font-size:16pt; color:{MUTED}">
      {COMMON['tagline']}</div>
  </div>
  <div class="sp"></div>
</div>{foot(d, n, tot)}</div>"""


def render(d):
    tot = 9
    slides = (
        s_cover(d)
        + s_positioning(d, 2, tot)
        + s_evidence(d, 3, tot)
        + s_items(d, 4, tot, 'arch_kicker', 'arch_head', 'arch_items')
        + s_items(d, 5, tot, 'ai_kicker', 'ai_head', 'ai_items', 'ai_lead')
        + s_work(d, 6, tot)
        + s_stack(d, 7, tot)
        + s_process(d, 8, tot)
        + s_contact(d, 9, tot)
    )
    title = f"{COMMON['legal_name']} — {d['doc_label']}"
    return (f'<!doctype html><html lang="{d["lang"]}"><head>'
            f'<meta charset="utf-8"><title>{title}</title>'
            f'<style>{css()}</style></head><body>{slides}</body></html>')


if __name__ == '__main__':
    out = os.path.join(HERE, 'out')
    os.makedirs(out, exist_ok=True)
    for d, sfx in ((EN, 'EN'), (ID, 'ID')):
        p = os.path.join(out, f'deck-{sfx}.html')
        open(p, 'w', encoding='utf-8').write(render(d))
        print('wrote', p, os.path.getsize(p), 'bytes')
