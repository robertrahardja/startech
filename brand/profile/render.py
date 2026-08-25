#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Render the StarTech Innovation company profile to HTML (EN + ID).

On-brand per startech/brand/guidelines/brand-guidelines.md.
Dark theme, matching the business card and startech-innovation.com.
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from assets import ASSETS
from content import COMMON, EN, ID

HERE = os.path.dirname(os.path.abspath(__file__))
FONT_CSS = open(os.path.join(HERE, 'fonts', 'fonts-embedded.css')).read()

BG, CARD, TEXT, MUTED = '#09090b', '#141419', '#e4e4e7', '#71717a'
BLUE, PINK, GOLD = '#4f6bf7', '#c084fc', '#d4a853'


def css():
    return FONT_CSS + f"""
* {{ margin:0; padding:0; box-sizing:border-box; }}
@page {{ size: A4; margin: 0; }}
html {{ -webkit-print-color-adjust: exact; print-color-adjust: exact; }}
body {{
  font-family: 'Inter', system-ui, sans-serif;
  background: {BG}; color: {TEXT};
  font-size: 9.5pt; line-height: 1.62; font-weight: 400;
  letter-spacing: -0.01em;
}}
.page {{
  position: relative; width: 210mm; height: 297mm;
  padding: 20mm 19mm 22mm; background: {BG};
  overflow: hidden; page-break-after: always;
}}
.page:last-child {{ page-break-after: auto; }}

/* glow */
.glow {{ position:absolute; border-radius:50%; pointer-events:none; }}
.glow-a {{ top:-70mm; left:50%; margin-left:-80mm; width:160mm; height:120mm;
  background: rgba(79,107,247,0.13); filter: blur(58mm); }}
.glow-b {{ bottom:-50mm; right:-40mm; width:110mm; height:90mm;
  background: rgba(192,132,252,0.07); filter: blur(52mm); }}
.glow-c {{ top:40%; left:-45mm; width:95mm; height:80mm;
  background: rgba(212,168,83,0.035); filter: blur(48mm); }}
.inner {{ position:relative; z-index:2; height:100%;
  display:flex; flex-direction:column; }}

/* type */
.kicker {{ font-size:6.6pt; font-weight:500; letter-spacing:0.22em;
  text-transform:uppercase; color:{MUTED}; }}
h1 {{ font-family:'Instrument Serif',Georgia,serif; font-weight:400;
  font-size:36pt; line-height:1.13; letter-spacing:-0.028em; color:#fff; }}
h2 {{ font-family:'Instrument Serif',Georgia,serif; font-weight:400;
  font-size:19pt; line-height:1.22; letter-spacing:-0.02em; color:#fff; }}
h2 em {{ font-style:italic; color:{PINK}; }}
h3 {{ font-size:10pt; font-weight:600; letter-spacing:-0.012em; color:#fff; }}
p {{ color:{MUTED}; }}
.lead {{ font-size:10.5pt; line-height:1.72; color:#a1a1aa; font-weight:300; }}
.body p + p {{ margin-top:2.6mm; }}
.body {{ font-size:9.3pt; line-height:1.72; }}

.rule {{ height:1px; background:linear-gradient(90deg,{BLUE},{PINK},transparent);
  opacity:0.55; }}
.rule-gold {{ height:1px; width:22mm;
  background:linear-gradient(90deg,{GOLD},rgba(212,168,83,0)); }}
.hr {{ height:1px; background:rgba(255,255,255,0.07); }}

/* header / footer */
.phead {{ display:flex; justify-content:space-between; align-items:center;
  padding-bottom:3.2mm; margin-bottom:8mm;
  border-bottom:1px solid rgba(255,255,255,0.07); }}
.phead .nm {{ font-size:6.8pt; font-weight:600; letter-spacing:0.2em;
  text-transform:uppercase; color:#8b8b95; }}
.phead .dl {{ font-size:6.8pt; letter-spacing:0.14em; text-transform:uppercase;
  color:{MUTED}; }}
.pfoot {{ position:absolute; left:19mm; right:19mm; bottom:9mm; z-index:2;
  display:flex; justify-content:space-between; align-items:flex-end;
  gap:10mm; padding-top:2.6mm;
  border-top:1px solid rgba(255,255,255,0.06); }}
.pfoot .conf {{ font-size:5.9pt; font-style:italic; color:#55555e;
  line-height:1.5; max-width:118mm; }}
.pfoot .pg {{ font-size:6.4pt; color:#55555e; letter-spacing:0.1em;
  white-space:nowrap; }}

/* cover */
.cover {{ justify-content:center; }}
.cov-logo {{ width:34mm; margin-bottom:11mm; }}
.cov-sub {{ font-size:10.8pt; line-height:1.75; color:#a1a1aa;
  font-weight:300; max-width:132mm; margin-top:7.5mm; }}
.cov-tag {{ font-family:'Instrument Serif',Georgia,serif; font-style:italic;
  font-size:12pt; color:{MUTED}; margin-top:9mm; letter-spacing:-0.01em; }}
.cov-meta {{ display:flex; gap:5mm; align-items:center; margin-top:11mm; }}
.cov-meta span {{ font-size:6.6pt; letter-spacing:0.2em; text-transform:uppercase;
  color:{MUTED}; }}
.cov-meta i {{ width:1px; height:3mm; background:rgba(113,113,122,0.4); }}
.cov-foot {{ position:absolute; left:19mm; right:19mm; bottom:16mm; z-index:2;
  display:flex; justify-content:space-between; align-items:flex-end; }}
.cov-foot .l {{ font-size:7pt; color:{MUTED}; line-height:1.75; }}
.cov-foot .l b {{ color:#c8c8d0; font-weight:500; }}

/* cards */
.grid2 {{ display:grid; grid-template-columns:1fr 1fr; gap:4mm; }}
.card {{ background:{CARD}; border:1px solid rgba(255,255,255,0.065);
  border-radius:2.6mm; padding:6mm 5.4mm; }}
.card h3 {{ margin-bottom:1.8mm; }}
.card p {{ font-size:8.4pt; line-height:1.66; }}
.card-accent {{ border-left:2px solid {BLUE}; }}

/* service block */
.svc {{ padding:5.4mm 0; border-top:1px solid rgba(255,255,255,0.07);
  display:grid; grid-template-columns:52mm 1fr; gap:7mm; }}
.svc:first-of-type {{ border-top:none; padding-top:0; }}
.svc .st {{ font-size:8.6pt; line-height:1.6; color:{MUTED}; margin-top:1.6mm; }}
.svc ul {{ list-style:none; display:grid; grid-template-columns:1fr 1fr;
  gap:1.4mm 5mm; }}
.svc li {{ font-size:8.1pt; line-height:1.5; color:#9a9aa4;
  padding-left:3.4mm; position:relative; }}
.svc li::before {{ content:''; position:absolute; left:0; top:1.55mm;
  width:1.3mm; height:1.3mm; border-radius:50%; background:{BLUE};
  opacity:0.85; }}

/* tools */
.tools {{ display:flex; flex-wrap:wrap; gap:1.6mm; }}
.tool {{ font-size:7.3pt; color:#9a9aa4; padding:1.35mm 2.9mm;
  border:1px solid rgba(255,255,255,0.09); border-radius:9mm;
  background:rgba(255,255,255,0.022); }}

/* proof */
.pf {{ padding:4.4mm 0; border-top:1px solid rgba(255,255,255,0.07); }}
.pf:first-of-type {{ border-top:none; padding-top:0; }}
.pf .top {{ display:flex; justify-content:space-between; align-items:baseline;
  gap:6mm; margin-bottom:1.5mm; }}
.pf .sec {{ font-size:6.7pt; letter-spacing:0.13em; text-transform:uppercase;
  color:{GOLD}; white-space:nowrap; }}
.pf p {{ font-size:8.4pt; line-height:1.68; }}

/* process */
.proc {{ display:grid; grid-template-columns:repeat(5,1fr); gap:3mm; }}
.proc .c {{ border-top:1px solid rgba(255,255,255,0.1); padding-top:2.8mm;
  position:relative; }}
.proc .c::before {{ content:''; position:absolute; top:-1px; left:0;
  width:38%; height:1px; background:{BLUE}; }}
.proc .w {{ font-size:6.4pt; letter-spacing:0.13em; text-transform:uppercase;
  color:{BLUE}; margin-bottom:1.6mm; }}
.proc .t {{ font-size:8.2pt; font-weight:600; color:#fff; line-height:1.35;
  margin-bottom:1.6mm; }}
.proc .d {{ font-size:7.2pt; line-height:1.48; color:{MUTED}; }}

/* stack */
.stack {{ display:grid; grid-template-columns:repeat(4,1fr); gap:4mm; }}
.stack .k {{ font-size:6.6pt; letter-spacing:0.16em; text-transform:uppercase;
  color:{MUTED}; margin-bottom:1.6mm; }}
.stack .v {{ font-size:7.7pt; line-height:1.6; color:#a8a8b2; }}

/* cta / contact */
.cta {{ background:linear-gradient(135deg,rgba(79,107,247,0.11),
  rgba(192,132,252,0.055)); border:1px solid rgba(129,140,248,0.2);
  border-radius:3.2mm; padding:8mm 7.5mm; }}
.contact {{ display:grid; grid-template-columns:1fr 1fr; gap:6mm 9mm; }}
.crow .k {{ font-size:6.4pt; letter-spacing:0.16em; text-transform:uppercase;
  color:{MUTED}; margin-bottom:1.1mm; }}
.crow .v {{ font-size:9pt; color:#e4e4e7; line-height:1.55; }}
.crow .v.sm {{ font-size:8.2pt; color:#b4b4be; }}
.note {{ font-size:7.4pt; line-height:1.62; color:#7d7d87;
  border-left:2px solid rgba(212,168,83,0.5); padding-left:4mm; }}
.mkt {{ display:grid; grid-template-columns:repeat(3,1fr); gap:5mm; }}
.mkt .k {{ font-size:8.6pt; font-weight:600; color:#fff; margin-bottom:1.6mm; }}
.mkt .v {{ font-size:7.6pt; line-height:1.62; color:#8f8f99; }}
.sp {{ flex:1; }}
"""


def head(d, label):
    return (f'<div class="phead"><div class="nm">'
            f'{COMMON["legal_name"].upper()}</div>'
            f'<div class="dl">{label}</div></div>')


def foot(d, n, total):
    return (f'<div class="pfoot"><div class="conf">{d["footer_conf"]}</div>'
            f'<div class="pg">{n} / {total}</div></div>')


def glows(*which):
    return ''.join(f'<div class="glow glow-{w}"></div>' for w in which)


def page_cover(d):
    meta = '<i></i>'.join(f'<span>{m}</span>' for m in d['cover_meta'])
    return f"""<div class="page">{glows('a','b')}
<div class="inner cover">
  <img class="cov-logo" src="{ASSETS['MARK_SVG']}" alt="">
  <div class="kicker" style="margin-bottom:5mm">{d['cover_kicker']}</div>
  <h1>{d['cover_head_1']}<br>{d['cover_head_2']}</h1>
  <div class="cov-tag">{COMMON['tagline']}</div>
  <div class="rule-gold" style="margin-top:7mm"></div>
  <p class="cov-sub">{d['cover_sub']}</p>
  <div class="cov-meta">{meta}</div>
</div>
<div class="cov-foot">
  <div class="l"><b>{COMMON['legal_name']}</b><br>
    {COMMON['addr']}<br>UEN {COMMON['uen']}</div>
  <div class="l" style="text-align:right">
    {COMMON['phone']}<br>{COMMON['email']}<br>{COMMON['web']}</div>
</div></div>"""


def page_about(d, n, tot):
    body = ''.join(f'<p>{p}</p>' for p in d['about_body'])
    pil = ''.join(
        f'<div class="card card-accent"><h3>{t}</h3><p>{b}</p></div>'
        for t, b in d['about_pillars'])
    mkt = ''.join(f'<div><div class="k">{k}</div><div class="v">{v}</div></div>'
                  for k, v in d['markets'])
    return f"""<div class="page">{glows('a','c')}
<div class="inner">
  {head(d, d['doc_label'])}
  <div class="kicker">{d['about_kicker']}</div>
  <h2 style="margin:3.4mm 0 6mm">{d['about_head']}</h2>
  <div class="body" style="max-width:158mm">{body}</div>
  <div class="sp"></div>
  <div class="hr" style="margin:0 0 6mm"></div>
  <div class="kicker" style="margin-bottom:4.4mm">{d['markets_kicker']}</div>
  <div class="mkt">{mkt}</div>
  <div class="sp"></div>
  <div class="rule" style="width:34mm; margin:0 0 7mm"></div>
  <div class="kicker" style="margin-bottom:4.6mm">
    {d['about_pillars_kicker']}</div>
  <div class="grid2">{pil}</div>
  <div class="sp"></div>
</div>
{foot(d, n, tot)}</div>"""


def page_services(d, n, tot):
    svcs = ''
    for t, sub, items in d['services']:
        li = ''.join(f'<li>{i}</li>' for i in items)
        svcs += (f'<div class="svc"><div><h3>{t}</h3>'
                 f'<div class="st">{sub}</div></div><ul>{li}</ul></div>')
    tools = ''.join(f'<div class="tool">{t}</div>' for t in d['tools'])
    return f"""<div class="page">{glows('a','b')}
<div class="inner">
  {head(d, d['doc_label'])}
  <div class="kicker">{d['services_kicker']}</div>
  <h2 style="margin:3.4mm 0 6.5mm">{d['services_head']}</h2>
  {svcs}
  <div class="sp"></div>
  <div class="rule" style="width:34mm; margin:0 0 6mm"></div>
  <div class="kicker" style="margin-bottom:2.6mm">{d['tools_kicker']}</div>
  <p style="font-size:8.4pt; line-height:1.66; margin-bottom:4mm;
     max-width:150mm">{d['tools_lead']}</p>
  <div class="tools">{tools}</div>
  <div class="sp"></div>
</div>
{foot(d, n, tot)}</div>"""


def page_proof(d, n, tot):
    pf = ''
    for t, sector, body in d['proof']:
        pf += (f'<div class="pf"><div class="top"><h3>{t}</h3>'
               f'<div class="sec">{sector}</div></div>'
               f'<p>{body}</p></div>')
    proc = ''.join(
        f'<div class="c"><div class="w">{w}</div>'
        f'<div class="t">{t}</div><div class="d">{dl}</div></div>'
        for w, t, dl in d['process'])
    stack = ''.join(f'<div><div class="k">{k}</div>'
                    f'<div class="v">{v}</div></div>' for k, v in d['stack'])
    return f"""<div class="page">{glows('a','c')}
<div class="inner">
  {head(d, d['doc_label'])}
  <div class="kicker">{d['proof_kicker']}</div>
  <h2 style="margin:3.4mm 0 6mm">{d['proof_head']}</h2>
  {pf}
  <div class="sp" style="max-height:12mm"></div>
  <div class="rule" style="width:34mm; margin:0 0 6mm"></div>
  <div class="kicker" style="margin-bottom:1.8mm">{d['process_kicker']}</div>
  <h3 style="font-size:10.5pt; margin-bottom:5mm">{d['process_head']}</h3>
  <div class="proc">{proc}</div>
  <div class="hr" style="margin:6mm 0 5mm"></div>
  <div class="kicker" style="margin-bottom:3.6mm">{d['stack_kicker']}</div>
  <div class="stack">{stack}</div>
</div>
{foot(d, n, tot)}</div>"""


def page_contact(d, n, tot):
    L = d['labels']
    def row(k, v, sm=False):
        c = ' sm' if sm else ''
        return (f'<div class="crow"><div class="k">{k}</div>'
                f'<div class="v{c}">{v}</div></div>')
    rows = (row(L['md'], COMMON['md'])
            + row(L['phone'], COMMON['phone'])
            + row(L['email'], COMMON['email'])
            + row(L['web'], COMMON['web'])
            + row(L['linkedin'], COMMON['linkedin'])
            + row(L['uen'], COMMON['uen'])
            + row(L['office'], COMMON['addr'], True)
            + row(L['corr'], COMMON['corr'], True))
    return f"""<div class="page">{glows('a','b')}
<div class="inner">
  {head(d, d['doc_label'])}
  <div class="kicker">{d['cta_kicker']}</div>
  <h2 style="margin:3.4mm 0 6mm">{d['cta_head']}</h2>
  <div class="cta">
    <p class="lead" style="max-width:140mm">{d['cta_body']}</p>
    <div class="rule-gold" style="margin:6mm 0 4mm"></div>
    <div style="font-size:8.2pt; letter-spacing:0.06em; color:{GOLD}">
      {d['cta_offer']}</div>
  </div>
  <div class="sp"></div>
  <div class="rule" style="width:34mm; margin:0 0 6mm"></div>
  <div class="kicker" style="margin-bottom:5mm">{d['contact_kicker']}</div>
  <div class="contact">{rows}</div>
  <div class="crow" style="margin-top:5.5mm">
    <div class="k">{d['labels']['langs']}</div>
    <div class="v sm">{d['langs_value']}</div></div>
  <div class="hr" style="margin:7.5mm 0 5.5mm"></div>
  <div class="note">{d['grants_note']}</div>
  <div class="sp"></div>
  <div style="display:flex; align-items:center; gap:5mm;">
    <img src="{ASSETS['MARK_SVG']}" style="width:19mm" alt="">
    <div style="font-family:'Instrument Serif',Georgia,serif;
         font-style:italic; font-size:11pt; color:{MUTED}">
      {COMMON['tagline']}</div>
  </div>
</div>
{foot(d, n, tot)}</div>"""


def render(d):
    tot = 5
    pages = (page_cover(d) + page_about(d, 2, tot) + page_services(d, 3, tot)
             + page_proof(d, 4, tot) + page_contact(d, 5, tot))
    title = f"{COMMON['legal_name']} — {d['doc_label']}"
    return (f'<!doctype html><html lang="{d["lang"]}"><head>'
            f'<meta charset="utf-8"><title>{title}</title>'
            f'<style>{css()}</style></head><body>{pages}</body></html>')


if __name__ == '__main__':
    out = os.path.join(HERE, 'out')
    os.makedirs(out, exist_ok=True)
    for d, sfx in ((EN, 'EN'), (ID, 'ID')):
        p = os.path.join(out, f'profile-{sfx}.html')
        open(p, 'w', encoding='utf-8').write(render(d))
        print('wrote', p, os.path.getsize(p), 'bytes')
