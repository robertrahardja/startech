# -*- coding: utf-8 -*-
"""Image flyer copy: EN, JA, ID. One dict per language, same keys.

The image flyer is the capability deck's cover plus its proof in one frame
(startech_marketing/gtm/playbooks/digital-flyers-and-social.md, 3.2). It
makes no claim the deck and the /flyer page do not make; check
docs/COMPANY.md ("Claims to keep honest") before changing a line:

- the exporter system is live with the client in Japan (client not named);
- the 7,060 tests are in the internal ERP build, which is not deployed;
- the client owns the code, the database and the cloud account.

No payroll, accounting, grant or accuracy claims.

`qr` is what the QR code opens: the written link plus ?utm_source=qr, so
hq can tell a scan from a typed visit (src/lib/utm.ts). The Indonesian
site is still being built; its link is written exactly as agreed.
"""

EN = {
    "lang": "en",
    "headline": ["From spreadsheet", "to system."],
    "who": (
        "For companies of 10 to 200 staff that run on spreadsheets, or on "
        "a system a vendor never finished."
    ),
    "proof": [
        ("Live in Japan",
         "A used-car export system we built, used every day by a Japanese "
         "exporter."),
        ("7,060 tests",
         "Automated tests in our internal ERP build, not deployed."),
        ("You own it",
         "The code, the database and the cloud account are yours."),
    ],
    "offer_head": "Send us one spreadsheet.",
    "offer_body": "We will show it working as a system. Free, no commitment.",
    "link": "startech-innovation.com/flyer",
    "qr": "https://startech-innovation.com/flyer?utm_source=qr",
    "company": "StarTech Innovation Pte. Ltd. · Singapore",
}

JA = {
    "lang": "ja",
    "headline": ["スプレッドシートから、", "システムへ"],
    "who": (
        "従業員10〜200名で、スプレッドシートや、ベンダーが完成させなかった"
        "システムで業務を回している企業向けです。"
    ),
    "proof": [
        ("日本で稼働中",
         "当社が構築した中古車輸出システムを、日本の輸出企業が毎日使って"
         "います。"),
        ("7,060件のテスト",
         "自社開発ERP（未導入）の自動テストです。"),
        ("所有権は御社に",
         "コード、データベース、クラウドアカウントは御社のものです。"),
    ],
    "offer_head": "スプレッドシートを1つお送りください。",
    "offer_body": "システムとして動く様子を、無料・契約義務なしでお見せします。",
    "link": "japan.startech-innovation.com/flyer",
    "qr": "https://japan.startech-innovation.com/flyer?utm_source=qr",
    "company": "StarTech Innovation Pte. Ltd. · シンガポール",
}

# Formal "Anda"; wording reused from brand/profile/content.py's ID profile.
ID = {
    "lang": "id",
    "headline": ["Dari spreadsheet", "ke sistem."],
    "who": (
        "Untuk perusahaan dengan 10–200 karyawan yang bekerja dengan "
        "spreadsheet, atau dengan sistem yang tidak pernah diselesaikan "
        "vendornya."
    ),
    "proof": [
        ("Berjalan di Jepang",
         "Sistem ekspor mobil bekas yang kami bangun, dipakai setiap hari "
         "oleh eksportir Jepang."),
        ("7.060 uji",
         "Uji otomatis pada ERP internal kami, belum diterapkan."),
        ("Milik Anda",
         "Kode, basis data, dan akun cloud sepenuhnya milik Anda."),
    ],
    "offer_head": "Kirimkan satu spreadsheet kepada kami.",
    "offer_body": (
        "Kami akan menunjukkannya berjalan sebagai sistem — gratis, tanpa "
        "komitmen."
    ),
    "link": "indonesia.startech-innovation.com",
    "qr": "https://indonesia.startech-innovation.com/?utm_source=qr",
    "company": "StarTech Innovation Pte. Ltd. · Singapura",
}

FLYERS = (EN, JA, ID)
