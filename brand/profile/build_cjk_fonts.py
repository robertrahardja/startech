#!/usr/bin/env python3
"""Rebuild the per-language CJK font subsets embedded in the capability deck.

render_pitch.py embeds fonts/fonts-{ja,ko,zhs,zht}-embedded.css, each holding
Noto Sans CJK Regular and Bold cut down to the characters that language's
deck actually uses. Run this whenever pitch_content.py's CJK text changes,
after `python3 render_pitch.py`, then render again:

    python3 render_pitch.py
    uvx --from fonttools --with brotli python build_cjk_fonts.py
    python3 render_pitch.py

Source fonts: the system Noto Sans CJK collections (Arch: noto-fonts-cjk).
Subsets keep one glyph per character and no OpenType feature closure, as the
originals did; "*" features tripled the size.
"""
import base64
import html
import io
import os
import re

from fontTools import subset
from fontTools.ttLib import TTCollection

HERE = os.path.dirname(os.path.abspath(__file__))
TTC = {
    400: "/usr/share/fonts/noto-cjk/NotoSansCJK-Regular.ttc",
    700: "/usr/share/fonts/noto-cjk/NotoSansCJK-Bold.ttc",
}
LANGS = {
    # css suffix: (rendered html, index in the collection, CSS family)
    "ja": ("pitch-JA.html", 0, "Noto Sans JP Subset"),
    "ko": ("pitch-KO.html", 1, "Noto Sans KR Subset"),
    "zhs": ("pitch-ZH-Hans.html", 2, "Noto Sans SC Subset"),
    "zht": ("pitch-ZH-Hant.html", 3, "Noto Sans TC Subset"),
}


def text_chars(path):
    doc = open(path, encoding="utf-8").read()
    doc = re.sub(r"<style.*?</style>", " ", doc, flags=re.S)
    doc = html.unescape(re.sub(r"<[^>]+>", " ", doc))
    chars = {c for c in doc if not c.isspace()}
    return chars | {chr(c) for c in range(0x20, 0x7F)}


def woff2_subset(weight, index, chars):
    font = TTCollection(TTC[weight]).fonts[index]
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = []
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=[ord(c) for c in chars])
    sub.subset(font)
    font.flavor = "woff2"
    font.recalcTimestamp = False  # same input, same bytes: no churn in git
    buf = io.BytesIO()
    font.save(buf)
    return buf.getvalue()


def main():
    for lang, (html_name, index, family) in LANGS.items():
        chars = text_chars(os.path.join(HERE, "out", html_name))
        faces = []
        for weight, css_weight in ((400, "400"), (700, "600 700")):
            b64 = base64.b64encode(woff2_subset(weight, index, chars)).decode()
            faces.append(
                "@font-face {\n"
                f"  font-family: '{family}';\n"
                f"  src: url(data:font/woff2;base64,{b64}) format('woff2');\n"
                f"  font-weight: {css_weight};\n"
                "  font-style: normal;\n"
                "  font-display: swap;\n"
                "}"
            )
        css = os.path.join(HERE, "fonts", f"fonts-{lang}-embedded.css")
        with open(css, "w", encoding="utf-8") as f:
            f.write("\n".join(faces) + "\n")
        print(f"{lang}: {len(chars)} characters -> {os.path.basename(css)}")


if __name__ == "__main__":
    main()
