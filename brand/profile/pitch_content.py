# -*- coding: utf-8 -*-
"""Customer-facing pitch deck content, EN. Singapore + Japan audience.

Positioning: custom software house, not an ERP vendor. The ERP work
appears only as evidence of capability on complex systems, never as
the headline offer.

Every claim here is checkable on a call — no invented numbers. Claims
were re-checked against docs/COMPANY.md on 2026-11-02: only the
exporter system is live with a client; the AI co-pilot engagement is
complete; the payroll engine is an internal build, not deployed; the
health platform belongs to Alliance Digital Concierge, not a StarTech
client, so it is not shown. No accounting or payroll-accuracy claims.
"""
from content import COMMON  # noqa: F401  (re-exported for the renderer)

EN = {
    "lang": "en",
    "doc_label": "Capability Deck",

    # 1 — cover
    "cover_kicker": "Capability Deck",
    "cover_head_1": "We build the software",
    "cover_head_2": "your business runs on.",
    "cover_sub": (
        "A Singapore-based custom software house. We design and build "
        "production systems for companies that have outgrown "
        "spreadsheets, off-the-shelf tools, or a vendor that did not "
        "deliver."
    ),
    "cover_meta": ["Singapore", "Japan", "20+ years"],

    # 2 — positioning
    "pos_kicker": "Who we are",
    "pos_head": "Founder-led, start to finish.",
    "pos_body": (
        "StarTech Innovation is a custom software house, not a "
        "product vendor. We do not sell you a shelf system and hope "
        "it fits — we build the system around how your business "
        "actually runs."
    ),
    "pos_body2": (
        "Every engagement is led personally by the Managing Director, "
        "start to finish, with specialists brought in as the work "
        "demands. You deal with the person who writes the code and "
        "signs the delivery."
    ),
    "pos_stats": [
        (
            "12",
            "Weeks from discovery to deployment, for a typical full build",
        ),
        (
            "7,060",
            "Automated tests in our Singapore payroll engine",
        ),
        (
            "2",
            (
                "Money-losing bugs caught before release on a live client "
                "system"
            ),
        ),
        (
            "20+",
            "Years combined business and engineering experience",
        ),
    ],

    # 3 — evidence (rescue / quality discipline)
    "ev_kicker": "How we work",
    "ev_head": "We are hired to fix what did not work the first time.",
    "ev_lead": (
        (
        "Much of our work starts because an earlier vendor, or an "
        "off-the-shelf tool, did not hold up. That shapes how we "
        "build."
    )
    ),
    "ev_cards": [
        (
            "Discovery first",
            "Week 1",
            (
                "We sit with the people doing the work before writing code. "
                "You own the output either way."
            ),
        ),
        (
            "Fixed scope, clear cost",
            "Before build",
            (
                "A price range on the first call, a firm number after "
                "discovery — agreed in writing before work starts."
            ),
        ),
        (
            "Tested, not demoed",
            "Every build",
            (
                "Tests written against the real business rules, not the happy "
                "path. Our payroll engine alone carries 7,060."
            ),
        ),
        (
            "You own the build",
            "At delivery",
            (
                "Deployed on your cloud account, your database, your "
                "repository. Any engineer can take it over."
            ),
        ),
    ],
    "ev_case_kicker": "What that discipline catches",
    "ev_case": (
        "Rebuilding a cross-border trading system, a re-imported bank "
        "statement was silently doubling receipts — the bank issued "
        "no transfer ID to key a duplicate check on. Caught in "
        "testing, not by a customer."
    ),

    # 4 — what sets us apart (risk mitigation / trust, esp. for a
    # first-time offshore vendor relationship)
    "arch_kicker": "Working with us",
    "arch_head": "What a first engagement with us looks like.",
    "arch_items": [
        (
            "One accountable point of contact",
            (
                "The Managing Director scopes, builds and delivers your system "
                "personally. No account manager relaying between you and the "
                "engineers — you talk to the person doing the work."
            ),
        ),
        (
            "Written scope before code",
            (
                "A paid two-week scoping sprint produces a document you can "
                "circulate for sign-off — what is being built, what it costs, "
                "by when — and a clickable demo. The fee is credited against "
                "the build."
            ),
        ),
        (
            "Cross-border by default",
            (
                "Our live client work runs between Singapore and Japan — "
                "different time zones, currencies, languages and banking "
                "conventions in one system is our normal case, not a special "
                "request."
            ),
        ),
        (
            "Support does not end at launch",
            (
                "Delivery includes documentation and a support period. After "
                "that, a monthly care plan covers hosting, fixes and small "
                "changes — or hand the system to your own team. Your choice, "
                "stated up front."
            ),
        ),
    ],

    # 5 — selected work (case studies, Japan first)
    "work_kicker": "Selected work",
    "work_head": "What we have built, and where it stands.",
    "work_lead": (
        (
        "Client names withheld under confidentiality. Each card says "
        "where the work stands; every figure can be walked through on "
        "a call."
    )
    ),
    "work": [
        (
            "An exporter running its operations on spreadsheets and chat",
            "Cross-border trade &middot; Japan",
            (
                "Inventory in a spreadsheet, payments reconciled by hand. An "
                "earlier offshore vendor had delivered a CRM the team could "
                "not use. We rebuilt it: inventory, role-scoped CRM, invoice "
                "and shipping documents, bank-statement import."
            ),
            (
                "2 money-losing bugs caught before release &middot; live "
                "&middot; bilingual JP / EN"
            ),
        ),
        (
            "An AI co-pilot that answers from the company's own documents",
            "AI implementation &middot; Singapore",
            (
                "A generic chatbot is worthless to an SME knowledge worker — "
                "it knows nothing about their role or sector. We built a "
                "co-pilot with retrieval over the client's own documents."
            ),
            (
                "Delivered for a client; engagement completed in 2026 &middot; "
                "multi-LLM routing"
            ),
        ),
        (
            "A payroll engine built to be audited line by line",
            "Internal build &middot; Singapore",
            (
                "Singapore payroll rules are unforgiving — CPF rounding, age "
                "bands, SDL floors and caps. We are building an engine that "
                "shows its working for every figure, tested scenario by "
                "scenario."
            ),
            (
                "In development, not yet deployed &middot; 7,060 automated "
                "tests"
            ),
        ),
        (
            "Demos you can try before you commit",
            "Pre-sales &middot; Japan &amp; Singapore",
            (
                "We show a system working before a client signs. Our Japan "
                "site runs demos for used-car exporters — auction, shipping "
                "tracking, export quotes — and our Singapore site runs "
                "thirteen more."
            ),
            (
                "japan.startech-innovation.com &middot; "
                "startech-innovation.com/solutions"
            ),
        ),
    ],

    # 6 — what we build (services, ERP reframed as evidence not flagship)
    "stack_kicker": "What we build",
    "stack_head": "Custom software across four practices.",
    "stack_groups": [
        (
            "Business systems",
            (
                "Operations platforms, CRM, inventory, document generation and "
                "workflow — replacing spreadsheets and disconnected tools with "
                "one system your team will actually use."
            ),
        ),
        (
            "AI implementation",
            (
                "Assistants that answer from your own documents, and "
                "automation pipelines — with guardrails and source attribution "
                "so the output can be checked."
            ),
        ),
        (
            "Finance workflows",
            (
                "Invoicing, bank-statement import, reconciliation and document "
                "generation — with an audit trail so your accountant can check "
                "every figure."
            ),
        ),
        (
            "Cross-border operations",
            (
                "Multi-currency, multi-language systems for companies trading "
                "between Singapore, Japan and the region — one system, not "
                "three."
            ),
        ),
    ],

    # 7 — process
    "proc_kicker": "How we work",
    "proc_head": "Discovery to production, on a schedule you can plan around.",
    "process": [
        (
            "Week 1&ndash;2",
            "Scoping sprint",
            (
                "Sit with the people doing the work &middot; written scope, "
                "cost and a clickable demo"
            ),
        ),
        (
            "Week 3&ndash;4",
            "Architecture",
            (
                "Technical design &middot; firm price and delivery date agreed "
                "in writing"
            ),
        ),
        (
            "Week 5&ndash;8",
            "Build",
            (
                "Working system against real data &middot; weekly check-ins, "
                "not a reveal at the end"
            ),
        ),
        (
            "Week 9&ndash;11",
            "Deployment",
            (
                "Testing, staff handover &middot; deployed on infrastructure "
                "you own"
            ),
        ),
        (
            "Week 12+",
            "Care plan",
            (
                "Monthly hosting, fixes and small changes &middot; "
                "documentation so any engineer can take over"
            ),
        ),
    ],
    "proc_note": (
        (
        "Timelines scale with scope — this is the shape of a mid-size "
        "engagement, not a fixed promise. You get the real schedule "
        "after discovery, in writing. For Singapore companies, we "
        "check whether the project qualifies for EDGE Grant support "
        "before you commit."
    )
    ),

    # 8 — contact
    "cta_kicker": "Contact",
    "cta_head": "Send us one spreadsheet.",
    "cta_body": (
        (
        "Pick the spreadsheet you would most like to replace, and we "
        "will show it working as a system — free, no commitment. If "
        "software is not the answer, we will tell you that too."
    )
    ),
    "labels": {
        "md": "Managing Director", "phone": "Phone / WhatsApp",
        "email": "Email", "web": "Web", "linkedin": "LinkedIn",
        "office": "Registered office", "uen": "UEN",
    },
    "footer_conf": (
        "This document contains commercially confidential information "
        "and is intended solely for the named recipient."
    ),
}

JA = {
    "lang": "ja",
    "doc_label": "会社概要資料",

    # 1 — cover
    "cover_kicker": "会社概要資料",
    "cover_head_1": "貴社の事業を支える",
    "cover_head_2": "ソフトウェアを、一から。",
    "cover_sub": (
        "シンガポールを拠点とするカスタムソフトウェア開発会社です。"
        "表計算ソフトや市販のツールでは対応しきれなくなった企業、"
        "または以前の発注先が期待通りの成果を出せなかった企業向けに、"
        "本番環境で稼働するシステムを設計・開発しております。"
    ),
    "cover_meta": ["シンガポール", "日本", "20年以上の経験"],

    # 2 — positioning
    "pos_kicker": "会社概要",
    "pos_head": "創業者が最初から最後まで担当します。",
    "pos_body": (
        "StarTech Innovationはパッケージ製品を販売するベンダーではなく、"
        "カスタムソフトウェア開発会社です。"
        "既存のパッケージを提供するのではなく、"
        "貴社の実際の業務フローに合わせてシステムを構築いたします。"
    ),
    "pos_body2": (
        "すべてのプロジェクトは代表自らが最初から最後まで責任をもって担当し、"
        "必要に応じて専門スタッフが加わります。"
        "窓口担当者を介さず、実際にコードを書き、納品に責任を持つ人物と"
        "直接やりとりできます。"
    ),
    "pos_stats": [
        ("12", "標準的な開発の、要件定義から本番稼働までの週数"),
        ("7,060", "シンガポール給与計算エンジンの自動テスト数"),
        ("2", "稼働中の顧客システムでリリース前に発見した、損失につながる不具合"),
        ("20+", "事業・エンジニアリング合計経験年数"),
    ],

    # 3 — evidence (rescue / quality discipline)
    "ev_kicker": "私たちの仕事のやり方",
    "ev_head": "「前回うまくいかなかった」から始まる依頼が大半です。",
    "ev_lead": (
        (
        "私たちの仕事の多くは、以前のベンダーや市販ツールがうまく機能"
        "しなかったことから始まります。この経験が私たちの開発手法を形"
        "作っています。"
    )
    ),
    "ev_cards": [
        (
            "まずはヒアリング",
            "第1週",
            "コードを書く前に、実際の業務担当者に直接ヒアリング。結果は契約の有無に関わらず貴社に帰属します。",
        ),
        (
            "先にスコープと見積もりを確定",
            "開発前",
            "初回の商談で概算を、ヒアリング後に確定見積を提示。封入のタイミングもすべて書面で合意します。",
        ),
        (
            "デモではなくテストで検証",
            "開発中",
            "テストは都合のよいケースだけでなく、実際の業務ルールに基づいて書きます。給与計算エンジンだけで7,060件あります。",
        ),
        (
            "貴社が基盤を所有",
            "納品時",
            "貴社のクラウド、データベース、リポジトリ上に構築。ドキュメントとテストが整っているため、他のエンジニアでも引き継げます。",
        ),
    ],
    "ev_case_kicker": "この体制が発見した事例",
    "ev_case": (
        "国境間取引システムの再構築中、銀行が振込IDを発行しないため"
        "入金が二重計上されるバグを発見。顧客に届く前にテストで捕捉。"
    ),

    # 4 — working with us (risk mitigation / trust)
    "arch_kicker": "ご発注の流れ",
    "arch_head": "初回のご依頼から納品まで。",
    "arch_items": [
        (
            "窓口一元化",
            "代表自らが要件定義から開発、納品まで一貫して担当。間に営業担当者を介さず、実際に作業する人物と直接やりとりします。",
        ),
        (
            "コード作成前の書面化",
            (
                "2週間の有償スコーピングで、何を・いくらで・いつまでに作るか"
                "をまとめた社内承認用の文書と、操作できるデモをお渡しします。"
                "費用は開発費に充当します。"
            ),
        ),
        (
            "国境を跨ぐ運営は平常業務",
            (
                "稼働中の顧客案件はシンガポールと日本をまたいでいます。異なる"
                "タイムゾーン、通貨、言語、銀行の慣習を一つのシステムで扱うの"
                "が、私たちの標準です。"
            ),
        ),
        (
            "稼働後もサポートを継続",
            (
                "納品時にドキュメントと一定期間のサポートを付与します。その後"
                "は、ホスティング・修正・小さな変更を含む月額のケアプランをご"
                "利用いただくか、貴社のチームに引き継ぐかを事前に決めます。"
            ),
        ),
    ],

    # 5 — selected work (case studies, Japan first)
    "work_kicker": "実績",
    "work_head": "これまでの実績と、その現状。",
    "work_lead": (
        "守秘義務により顧客名は伏せています。各カードに現状を記載しており、すべての数字はお打ち合わせで詳しくご説明できます。"
    ),
    "work": [
        (
            "表計算ソフトとチャットで運営していた輸出企業",
            "貿易・国境間取引 &middot; 日本",
            (
                "在庫は表計算ソフトで管理し、入金照合は手作業。以前の海外ベン"
                "ダーが構築したCRMは現場で使えず、在庫管理、権限別CRM、"
                "請求・出荷書類作成、入金取込みを再構築。"
            ),
            "リリース前に発見した損失バグ2件 &middot; 本番稼働中 &middot; 日英バイリンガル対応",
        ),
        (
            "自社資料から回答するAIコパイロット",
            "AI実装 &middot; シンガポール",
            "汎用型AIはSMEの情報なしには無力です。顧客自身の資料を注中するRetrieval型AIコパイロットを構築。",
            "顧客向けに納品、2026年に契約完了 &middot; マルチLLMルーティング",
        ),
        (
            "一行ずつ監査できる給与計算エンジン",
            "自社開発 &middot; シンガポール",
            (
                "シンガポールの給与計算ルールは厳格です。CPFの端数処理、年"
                "齢区分、SDLの下限と上限。すべての金額の計算過程を示すエン"
                "ジンを、シナリオごとにテストしながら開発しています。"
            ),
            "開発中・未導入 &middot; 自動テスト7,060件",
        ),
        (
            "契約前に試せるデモ",
            "プレセールス &middot; 日本・シンガポール",
            (
                "契約前に、実際に動くシステムをお見せします。日本向けサイトで"
                "は中古車輸出業者向けのデモ（オークション、配送追跡、輸出見積"
                "）を、シンガポール向けサイトではさらに13種類のデモを公開し"
                "ています。"
            ),
            (
                "japan.startech-innovation.com &middot; "
                "startech-innovation.com/solutions"
            ),
        ),
    ],

    # 6 — what we build
    "stack_kicker": "提供領域",
    "stack_head": "4つの領域にわたるカスタム開発。",
    "stack_groups": [
        (
            "業務システム",
            (
                "基幹業務プラットフォーム、CRM、在庫、帳票自動作成、ワーク"
                "フロー。表計算や分断したツールを、現場が実際に使う一つのシス"
                "テムに。"
            ),
        ),
        (
            "AI実装",
            "貴社の文書をもとに回答するアシスタントや自動化パイプラインを、出力を検証できるガードレールと出典表示付きで構築します。",
        ),
        (
            "経理・財務ワークフロー",
            "請求書発行、銀行明細の取り込み、照合、書類作成。会計担当者がすべての数字を確認できる監査証跡付きです。",
        ),
        (
            "国境を跨ぐ運営",
            "シンガポール、日本、そして周辺地域の間で取引する企業のための、多通貨・多言語システム。三つではなく、一つのシステムで。",
        ),
    ],

    # 7 — process
    "proc_kicker": "進め方",
    "proc_head": "ヒアリングから本番稼働まで、計画できるスケジュールで。",
    "process": [
        ("第1&ndash;2週", "スコーピング", "現場の担当者に同席 &middot; 書面での範囲・費用と操作できるデモ"),
        ("第3&ndash;4週", "設計", "技術設計 &middot; 確定価格と納期を書面で合意"),
        ("第5&ndash;8週", "実装", "実データでの動作確認 &middot; 週次報告、最終公開のみではない"),
        ("第9&ndash;11週", "導入", "テストと引き継ぎ &middot; 貴社所有の基盤上にデプロイ"),
        (
            "第12週以降",
            "ケアプラン",
            "月額でホスティング・修正・小さな変更に対応 &middot; 他のエンジニアも引き継げるドキュメント",
        ),
    ],
    "proc_note": (
        (
        "スケジュールは規模に応じて変動します。上記は中規模案件の目安"
        "であり、確定スケジュールはヒアリング後に書面でご提示します。"
        "シンガポール企業の場合は、ご契約前にEDGE補助金の対象とな"
        "るかを確認します。"
    )
    ),

    # 8 — contact
    "cta_kicker": "お問い合わせ",
    "cta_head": "スプレッドシートを1つお送りください。",
    "cta_body": (
        (
        "置き換えたいスプレッドシートを1つお選びください。それがシス"
        "テムとして動く様子を、無料・契約義務なしでお見せします。ソフ"
        "トウェアが解決策でない場合は、その旨も率直にお伝えします。"
    )
    ),
    "labels": {
        "md": "代表取締役", "phone": "電話 / WhatsApp",
        "email": "メール", "web": "ウェブサイト", "linkedin": "LinkedIn",
        "office": "登録住所", "uen": "法人登録番号（UEN）",
    },
    "footer_conf": (
        "本資料には営業上の機密情報が含まれており、"
        "宛先として指定された方のみのご利用を想定しています。"
    ),
}

ID = {
    "lang": "id",
    "doc_label": "Profil Kapabilitas",

    # 1 — cover
    "cover_kicker": "Profil Kapabilitas",
    "cover_head_1": "Kami membangun perangkat lunak",
    "cover_head_2": "yang menjalankan bisnis Anda.",
    "cover_sub": (
        "Rumah pengembangan perangkat lunak kustom yang berbasis di "
        "Singapura. Kami merancang dan membangun sistem produksi "
        "untuk perusahaan yang telah melampaui kemampuan spreadsheet, "
        "aplikasi siap pakai, atau vendor yang gagal memenuhi janji."
    ),
    "cover_meta": ["Singapura", "Jepang", "20+ tahun"],

    # 2 — positioning
    "pos_kicker": "Siapa kami",
    "pos_head": "Dipimpin langsung oleh pendirinya, dari awal hingga akhir.",
    "pos_body": (
        "StarTech Innovation adalah rumah pengembangan perangkat "
        "lunak kustom, bukan vendor produk. Kami tidak menjual sistem "
        "siap pakai dan berharap cocok — kami membangun sistem sesuai "
        "cara bisnis Anda sebenarnya berjalan."
    ),
    "pos_body2": (
        "Setiap proyek dipimpin langsung oleh Managing Director dari "
        "awal hingga akhir, dengan spesialis dilibatkan sesuai "
        "kebutuhan. Anda berkomunikasi langsung dengan orang yang "
        "menulis kode dan menandatangani serah terima."
    ),
    "pos_stats": [
        (
            "12",
            (
                "Minggu dari penggalian kebutuhan hingga peluncuran untuk "
                "proyek lengkap pada umumnya"
            ),
        ),
        (
            "7.060",
            "Uji otomatis pada mesin penggajian Singapura kami",
        ),
        (
            "2",
            (
                "Bug yang dapat merugikan, ditemukan sebelum rilis pada sistem "
                "klien yang berjalan"
            ),
        ),
        (
            "20+",
            "Tahun pengalaman gabungan bisnis dan rekayasa",
        ),
    ],

    # 3 — evidence (rescue / quality discipline)
    "ev_kicker": "Cara kami bekerja",
    "ev_head": "Kami sering disewa untuk memperbaiki yang gagal sebelumnya.",
    "ev_lead": (
        (
        "Banyak pekerjaan kami bermula karena vendor sebelumnya, atau "
        "aplikasi siap pakai, tidak dapat diandalkan. Pengalaman itu "
        "membentuk cara kami membangun."
    )
    ),
    "ev_cards": [
        (
            "Kebutuhan dulu",
            "Minggu 1",
            (
                "Bertemu langsung dengan pelaksana pekerjaan sebelum menulis "
                "kode. Hasilnya tetap milik Anda."
            ),
        ),
        (
            "Lingkup &amp; biaya jelas",
            "Sebelum mulai",
            (
                "Kisaran harga di awal, angka pasti setelah penggalian "
                "kebutuhan — disepakati tertulis."
            ),
        ),
        (
            "Diuji, bukan didemokan",
            "Tiap proyek",
            (
                "Uji ditulis berdasarkan aturan bisnis yang sebenarnya, bukan "
                "hanya skenario ideal. Mesin penggajian kami saja memiliki "
                "7.060 uji."
            ),
        ),
        (
            "Anda memiliki hasilnya",
            "Saat serah",
            (
                "Diterapkan di akun cloud dan repositori Anda sendiri. "
                "Insinyur lain dapat melanjutkannya."
            ),
        ),
    ],
    "ev_case_kicker": "Yang ditemukan disiplin ini",
    "ev_case": (
        "Saat membangun ulang sistem perdagangan lintas batas, "
        "rekening koran yang diimpor ulang diam-diam menggandakan "
        "penerimaan — bank tidak menerbitkan ID transfer. Ditemukan "
        "saat pengujian, bukan oleh pelanggan."
    ),

    # 4 — working with us (risk mitigation / trust)
    "arch_kicker": "Bekerja sama dengan kami",
    "arch_head": "Seperti apa proyek pertama bersama kami.",
    "arch_items": [
        (
            "Satu titik kontak yang bertanggung jawab",
            (
                "Managing Director menentukan ruang lingkup, membangun, dan "
                "menyerahkan sistem Anda secara langsung. Tidak ada account "
                "manager sebagai perantara — Anda berbicara langsung dengan "
                "orang yang mengerjakannya."
            ),
        ),
        (
            "Ruang lingkup tertulis sebelum kode ditulis",
            (
                "Sprint penentuan cakupan berbayar selama dua minggu "
                "menghasilkan dokumen yang dapat Anda edarkan untuk "
                "persetujuan internal — apa yang dibangun, berapa biayanya, "
                "kapan selesai — serta demo yang dapat diklik. Biayanya "
                "diperhitungkan ke biaya pembangunan."
            ),
        ),
        (
            "Lintas batas sudah menjadi standar kami",
            (
                "Pekerjaan klien kami yang sedang berjalan menghubungkan "
                "Singapura dan Jepang — zona waktu, mata uang, bahasa, dan "
                "kebiasaan perbankan yang berbeda dalam satu sistem adalah hal "
                "biasa bagi kami, bukan permintaan khusus."
            ),
        ),
        (
            "Dukungan tidak berhenti setelah peluncuran",
            (
                "Serah terima mencakup dokumentasi dan masa dukungan. Setelah "
                "itu, paket perawatan bulanan mencakup hosting, perbaikan, dan "
                "perubahan kecil — atau serahkan sistem ke tim Anda sendiri. "
                "Pilihan Anda, disepakati di awal."
            ),
        ),
    ],

    # 5 — selected work (case studies, Japan first)
    "work_kicker": "Karya terpilih",
    "work_head": "Apa yang telah kami bangun, dan statusnya.",
    "work_lead": (
        (
        "Nama klien dirahasiakan. Setiap kartu menyebutkan status "
        "pekerjaan; setiap angka dapat dijelaskan dalam panggilan."
    )
    ),
    "work": [
        (
            "Eksportir yang beroperasi lewat spreadsheet dan chat",
            "Perdagangan lintas batas &middot; Jepang",
            (
                "Persediaan di spreadsheet, pembayaran direkonsiliasi manual. "
                "Vendor sebelumnya membangun CRM yang tidak terpakai. Kami "
                "membangun ulang: persediaan, CRM sesuai peran, dokumen "
                "faktur, impor rekening koran."
            ),
            (
                "2 bug berisiko finansial ditemukan sebelum rilis &middot; "
                "berjalan &middot; dwibahasa JP / EN"
            ),
        ),
        (
            "Ko-pilot AI yang menjawab dari dokumen perusahaan sendiri",
            "Implementasi AI &middot; Singapura",
            (
                "Chatbot generik tidak berguna bagi pekerja pengetahuan UKM — "
                "ia tidak tahu apa-apa tentang peran atau sektor mereka. Kami "
                "membangun ko-pilot dengan pencarian atas dokumen milik klien "
                "sendiri."
            ),
            (
                "Diserahkan kepada klien; kerja sama selesai pada 2026 "
                "&middot; perutean multi-LLM"
            ),
        ),
        (
            "Mesin penggajian yang dapat diaudit baris per baris",
            "Pengembangan internal &middot; Singapura",
            (
                "Aturan penggajian Singapura tidak kenal kompromi — pembulatan "
                "CPF, kelompok usia, batas bawah dan atas SDL. Kami sedang "
                "membangun mesin yang menunjukkan perhitungan setiap angka, "
                "diuji skenario demi skenario."
            ),
            (
                "Dalam pengembangan, belum diterapkan &middot; 7.060 uji "
                "otomatis"
            ),
        ),
        (
            "Demo yang dapat dicoba sebelum Anda berkomitmen",
            "Pra-penjualan &middot; Jepang &amp; Singapura",
            (
                "Kami menunjukkan sistem yang berjalan sebelum klien "
                "menandatangani. Situs Jepang kami menjalankan demo untuk "
                "eksportir mobil bekas — lelang, pelacakan pengiriman, "
                "penawaran ekspor — dan situs Singapura kami menjalankan tiga "
                "belas demo lagi."
            ),
            (
                "japan.startech-innovation.com &middot; "
                "startech-innovation.com/solutions"
            ),
        ),
    ],

    # 6 — what we build
    "stack_kicker": "Yang kami bangun",
    "stack_head": "Perangkat lunak kustom di empat bidang praktik.",
    "stack_groups": [
        (
            "Sistem bisnis",
            (
                "Platform operasional, CRM, persediaan, pembuatan dokumen, dan "
                "alur kerja — menggantikan spreadsheet dan aplikasi terpisah "
                "dengan satu sistem yang benar-benar dipakai tim Anda."
            ),
        ),
        (
            "Implementasi AI",
            (
                "Asisten yang menjawab berdasarkan dokumen Anda sendiri dan "
                "alur otomatisasi, dengan pengaman dan atribusi sumber agar "
                "hasilnya dapat diperiksa."
            ),
        ),
        (
            "Alur kerja keuangan",
            (
                "Penagihan, impor mutasi rekening, rekonsiliasi, dan pembuatan "
                "dokumen — dengan jejak audit agar akuntan Anda dapat "
                "memeriksa setiap angka."
            ),
        ),
        (
            "Operasi lintas batas",
            (
                "Sistem multi-mata uang dan multibahasa untuk perusahaan yang "
                "berdagang antara Singapura, Jepang, dan kawasan sekitarnya — "
                "satu sistem, bukan tiga."
            ),
        ),
    ],

    # 7 — process
    "proc_kicker": "Cara kami bekerja",
    "proc_head": (
        "Dari penggalian kebutuhan hingga produksi, dengan jadwal "
        "yang dapat Anda rencanakan."
    ),
    "process": [
        (
            "Minggu 1&ndash;2",
            "Sprint cakupan",
            (
                "Duduk bersama orang yang menjalankan pekerjaan &middot; "
                "cakupan dan biaya tertulis, serta demo yang dapat diklik"
            ),
        ),
        (
            "Minggu 3&ndash;4",
            "Arsitektur",
            (
                "Desain teknis &middot; harga pasti dan tanggal serah terima "
                "disepakati tertulis"
            ),
        ),
        (
            "Minggu 5&ndash;8",
            "Pembangunan",
            (
                "Sistem berjalan dengan data nyata &middot; laporan mingguan, "
                "bukan hanya pengungkapan di akhir"
            ),
        ),
        (
            "Minggu 9&ndash;11",
            "Penerapan",
            (
                "Pengujian, serah terima staf &middot; diterapkan pada "
                "infrastruktur milik Anda"
            ),
        ),
        (
            "Minggu 12+",
            "Paket perawatan",
            (
                "Hosting, perbaikan, dan perubahan kecil setiap bulan &middot; "
                "dokumentasi agar engineer mana pun dapat mengambil alih"
            ),
        ),
    ],
    "proc_note": (
        (
        "Jadwal menyesuaikan cakupan pekerjaan — ini adalah gambaran "
        "proyek berskala menengah, bukan janji tetap. Jadwal "
        "sebenarnya Anda terima tertulis setelah penggalian kebutuhan. "
        "Untuk perusahaan Singapura, kami memeriksa apakah proyek "
        "memenuhi syarat dukungan EDGE Grant sebelum Anda berkomitmen."
    )
    ),

    # 8 — contact
    "cta_kicker": "Kontak",
    "cta_head": "Kirimkan satu spreadsheet kepada kami.",
    "cta_body": (
        (
        "Pilih spreadsheet yang paling ingin Anda ganti, dan kami akan "
        "menunjukkannya berjalan sebagai sistem — gratis, tanpa "
        "komitmen. Jika perangkat lunak bukan jawabannya, kami akan "
        "katakan itu juga."
    )
    ),
    "labels": {
        "md": "Managing Director", "phone": "Telepon / WhatsApp",
        "email": "Email", "web": "Situs web", "linkedin": "LinkedIn",
        "office": "Kantor terdaftar", "uen": "UEN",
    },
    "footer_conf": (
        "Dokumen ini memuat informasi rahasia komersial dan "
        "ditujukan khusus untuk penerima yang disebutkan."
    ),
}

KO = {
    "lang": "ko",
    "doc_label": "역량 소개서",

    # 1 — cover
    "cover_kicker": "역량 소개서",
    "cover_head_1": "귀사의 사업을 지키는",
    "cover_head_2": "소프트웨어를, 처음부터.",
    "cover_sub": (
        "싱가포르를 거점으로 하는 맞춤형 소프트웨어 "
        "개발사입니다. 엑셀이나 기성 툴로는 더 이상 "
        "대응하기 어려워진 기업, 또는 이전 업체가 기대에 "
        "미치지 못한 기업을 위해 실제 운영되는 시스템을 "
        "설계하고 구축합니다."
    ),
    "cover_meta": ["싱가포르", "일본", "20년 이상의 경험"],

    # 2 — positioning
    "pos_kicker": "회사 소개",
    "pos_head": "창업자가 처음부터 끝까지 직접 맡습니다.",
    "pos_body": (
        "StarTech Innovation은 패키지 제품을 파는 벤더가 아니라 "
        "맞춤형 소프트웨어 개발사입니다. 기성 제품을 "
        "제공하는 것이 아니라, 귀사의 실제 업무 흐름에 맞게 "
        "시스템을 구축합니다."
    ),
    "pos_body2": (
        "모든 프로젝트는 대표가 처음부터 끝까지 직접 "
        "책임지며, 필요에 따라 전문 인력이 합류합니다. "
        "중간 담당자 없이 실제 코드를 작성하고 납품을 "
        "책임지는 사람과 직접 소통합니다."
    ),
    "pos_stats": [
        ("12", "일반적인 전체 구축의 요건 정의부터 배포까지 주 수"),
        ("7,060", "싱가포르 급여 계산 엔진의 자동 테스트 건수"),
        ("2", "운영 중인 고객 시스템에서 출시 전에 잡은 손실성 버그"),
        ("20+", "사업 및 엔지니어링 합산 경력 년수"),
    ],

    # 3 — evidence (rescue / quality discipline)
    "ev_kicker": "일하는 방식",
    "ev_head": "이전에 잘 되지 않은 프로젝트를 바로잡는 의뢰가 많습니다.",
    "ev_lead": (
        (
        "저희 일의 상당수는 이전 업체나 기성 툴이 제대로 작동"
        "하지 않으면서 시작됩니다. 이 경험이 저희의 개발 방식"
        "을 형성했습니다."
    )
    ),
    "ev_cards": [
        (
            "먼저 청취",
            "1주차",
            "코드를 쓰기 전에 실제 업무 담당자를 직접 만납니다. 결과물은 계약 여부와 관계없이 귀사에 귀속됩니다.",
        ),
        (
            "사전 범위와 견적 확정",
            "개발 전",
            "첫 통화에서 개략가를 제시하고, 청취 후 확정 견적을 서면으로 합의합니다.",
        ),
        (
            "데모가 아닌 테스트로 검증",
            "개발 중",
            (
                "테스트는 편한 경우만이 아니라 실제 업무 규칙을 기준으"
                "로 작성합니다. 급여 계산 엔진 하나에만 7,060건이"
                " 있습니다."
            ),
        ),
        (
            "귀사가 인프라를 소유",
            "납품 시",
            (
                "귀사의 클라우드, 데이터베이스, 저장소에 구축합니다. "
                "문서화되고 테스트된 시스템이라 다른 엔지니어도 인수인계"
                "이 가능합니다."
            ),
        ),
    ],
    "ev_case_kicker": "이 체계가 발견한 사례",
    "ev_case": (
        "국경 간 거래 시스템을 재구축하던 중, 은행이 이체 ID를 "
        "발급하지 않아 재가져온 명세가 입금을 이중으로 계상하는 "
        "버그를 발견했습니다. 고객에게 도달하기 전 테스트 "
        "단계에서 잡았습니다."
    ),

    # 4 — working with us (risk mitigation / trust)
    "arch_kicker": "함께 일하는 방식",
    "arch_head": "첫 프로젝트는 이렇게 진행됩니다.",
    "arch_items": [
        (
            "단일 책임 창구",
            "대표가 직접 범위를 정하고, 개발하고, 납품합니다. 영업 담당자 없이 실제 작업자와 직접 소통합니다.",
        ),
        (
            "코드 작성 전 서면화",
            (
                "2주간의 유료 스코핑으로, 무엇을 얼마에 언제까지 만드"
                "는지 정리한 내부 승인용 문서와 클릭해 볼 수 있는 데"
                "모를 드립니다. 비용은 구축비에서 차감합니다."
            ),
        ),
        (
            "국경 간 운영은 일상 업무",
            (
                "운영 중인 고객 프로젝트는 싱가포르와 일본을 오갑니다."
                " 서로 다른 시간대, 통화, 언어, 은행 관행을 하나의"
                " 시스템에서 다루는 것이 저희에게는 일상입니다."
            ),
        ),
        (
            "론칭 이후도 지원을 지속",
            (
                "납품 시 문서와 합의된 지원 기간을 제공합니다. 이후에"
                "는 호스팅, 수정, 소규모 변경을 포함한 월간 케어 플"
                "랜을 이용하시거나 귀사 팀에 넘기실 수 있으며, 사전에"
                " 정합니다."
            ),
        ),
    ],

    # 5 — selected work (case studies, Japan first)
    "work_kicker": "주요 실적",
    "work_head": "구축한 것과 현재 상태.",
    "work_lead": (
        (
        "고객명은 기밀 유지로 밝히지 않습니다. 각 카드에 현재"
        " 상태를 적었으며, 모든 수치는 통화로 자세히 설명드릴"
        " 수 있습니다."
    )
    ),
    "work": [
        (
            "엑셀과 채팅으로 운영하던 수출 기업",
            "국경 간 거래 &middot; 일본",
            (
                "재고는 엑셀로 관리하고, 입금 대사는 수작업이었습니다."
                " 이전 해외 업체가 납품한 CRM은 현장에서 쓸 수 없"
                "었습니다. 재고 관리, 권한별 CRM, 송장 문서 자동"
                " 생성, 은행 명세서 가져오기를 재구축했습니다."
            ),
            "출시 전 발견한 손실 관련 버그 2건 &middot; 운영 중 &middot; 한일 이중언어 지원",
        ),
        (
            "자체 문서에서 답하는 AI 코파일럿",
            "AI 구현 &middot; 싱가포르",
            "범용 챗봇은 중소기업 지식 근로자에게 무용합니다. 고객의 자체 문서를 검색하는 코파일럿을 구축했습니다.",
            "고객에게 납품, 2026년 계약 완료 &middot; 멀티 LLM 라우팅",
        ),
        (
            "한 줄씩 감사할 수 있는 급여 계산 엔진",
            "자체 개발 &middot; 싱가포르",
            (
                "싱가포르 급여 규정은 엄격합니다. CPF 반올림, 연령"
                " 구간, SDL 하한과 상한. 모든 금액의 계산 과정을"
                " 보여 주는 엔진을 시나리오별로 테스트하며 개발하고 있"
                "습니다."
            ),
            "개발 중, 아직 미배포 &middot; 자동 테스트 7,060건",
        ),
        (
            "계약 전에 직접 써 보는 데모",
            "사전 영업 &middot; 일본 · 싱가포르",
            (
                "계약 전에 실제로 작동하는 시스템을 보여 드립니다. 일"
                "본 사이트에서는 중고차 수출업체용 데모(경매, 배송 추"
                "적, 수출 견적)를, 싱가포르 사이트에서는 13가지 데"
                "모를 더 운영합니다."
            ),
            (
                "japan.startech-innovation.com &middot; "
                "startech-innovation.com/solutions"
            ),
        ),
    ],

    # 6 — what we build
    "stack_kicker": "제공 분야",
    "stack_head": "4개 분야의 맞춤형 개발.",
    "stack_groups": [
        (
            "업무 시스템",
            (
                "운영 플랫폼, CRM, 재고, 문서 자동 생성, 워크플"
                "로우. 엑셀과 분산된 툴을 현장이 실제로 쓰는 하나의 "
                "시스템으로 대체합니다."
            ),
        ),
        (
            "AI 구현",
            (
                "귀사의 문서를 바탕으로 답하는 어시스턴트와 자동화 파이"
                "프라인을, 결과를 검증할 수 있도록 가드레일과 출처 표"
                "시를 갖춰 구축합니다."
            ),
        ),
        (
            "재무 워크플로",
            (
                "청구서 발행, 은행 거래내역 가져오기, 대사, 문서 생"
                "성. 회계 담당자가 모든 수치를 확인할 수 있는 감사 "
                "추적을 갖춥니다."
            ),
        ),
        (
            "국경 간 운영",
            (
                "싱가포르, 일본 및 주변 지역을 오가며 거래하는 기업을"
                " 위한 다통화·다국어 시스템. 세 개가 아닌 하나의 시"
                "스템."
            ),
        ),
    ],

    # 7 — process
    "proc_kicker": "진행 방식",
    "proc_head": "청취부터 운영까지, 계획 가능한 일정으로.",
    "process": [
        (
            "1&ndash;2주차",
            "스코핑",
            "실무자와 함께 앉아 확인 &middot; 서면 범위·비용과 클릭해 볼 수 있는 데모",
        ),
        ("3&ndash;4주차", "설계", "기술 설계 &middot; 확정 가격과 일정을 서면으로 합의"),
        (
            "5&ndash;8주차",
            "구현",
            "실제 데이터로 동작 확인 &middot; 매주 보고, 마지막에만 공개하지 않음",
        ),
        ("9&ndash;11주차", "도입", "테스트와 인수인계 &middot; 귀사 소유 인프라에 배포"),
        (
            "12주차 이후",
            "케어 플랜",
            "월간 호스팅·수정·소규모 변경 &middot; 다른 엔지니어도 인수할 수 있는 문서",
        ),
    ],
    "proc_note": (
        (
        "일정은 규모에 따라 달라집니다. 위 내용은 중규모 프로"
        "젝트의 대략적인 모습이며, 확정된 일정은 청취 후 서면"
        "으로 제공합니다. 싱가포르 기업이라면 계약 전에 EDG"
        "E 보조금 대상 여부를 확인해 드립니다."
    )
    ),

    # 8 — contact
    "cta_kicker": "문의",
    "cta_head": "스프레드시트 하나를 보내 주세요.",
    "cta_body": (
        (
        "가장 바꾸고 싶은 스프레드시트 하나를 골라 주세요. 그"
        "것이 시스템으로 작동하는 모습을 무료로, 부담 없이 보"
        "여 드립니다. 소프트웨어가 해결책이 아니라면 그 점도 "
        "솔직하게 말씀드립니다."
    )
    ),
    "labels": {
        "md": "대표이사", "phone": "전화 / WhatsApp",
        "email": "이메일", "web": "웹사이트", "linkedin": "LinkedIn",
        "office": "등록 주소", "uen": "법인등록번호(UEN)",
    },
    "footer_conf": (
        "본 문서에는 상업상 기밀 정보가 포함되어 있으며, "
        "지정된 수신자만을 위한 것입니다."
    ),
}

ZH_HANS = {
    "lang": "zh-Hans",
    "doc_label": "能力介绍",

    # 1 — cover
    "cover_kicker": "能力介绍",
    "cover_head_1": "我们构建支撑您业务的",
    "cover_head_2": "软件。",
    "cover_sub": (
        "一家总部设在新加坡的定制软件开发公司。"
        "我们为那些表格、现成工具已无法胜任，"
        "或之前的供应商未能交付预期成果的企业，"
        "设计并构建在生产环境中稳定运行的系统。"
    ),
    "cover_meta": ["新加坡", "日本", "20年以上经验"],

    # 2 — positioning
    "pos_kicker": "关于我们",
    "pos_head": "创始人亲自负责，从头到尾。",
    "pos_body": (
        "StarTech Innovation 是定制软件开发公司，而非"
        "标准产品供应商。我们不提供现成系统"
        "并希望它恰好适用，而是根据您企业的"
        "实际运作方式来构建系统。"
    ),
    "pos_body2": (
        "每个项目都由总经理亲自从头到尾负责，"
        "并根据需要引入专业人员。您直接与编写"
        "代码、签字交付的人沟通，中间没有客户"
        "经理转述。"
    ),
    "pos_stats": [
        ("12", "典型完整项目从调研到上线所需周数"),
        ("7,060", "我们新加坡薪资引擎中的自动化测试数"),
        ("2", "在客户正式运行的系统中，发布前发现的会造成损失的缺陷"),
        ("20+", "业务与工程合计经验年限"),
    ],

    # 3 — evidence (rescue / quality discipline)
    "ev_kicker": "我们的工作方式",
    "ev_head": "我们常被聘来修复上一次没做成的项目。",
    "ev_lead": (
        "我们的很多项目，都始于之前的供应商或现成工具无法胜任。这段经历塑造了我们的开发方法。"
    ),
    "ev_cards": [
        ("先做调研", "第 1 周", "写代码前，先与实际业务人员直接沟通。无论是否继续合作，成果均归您所有。"),
        ("范围固定，报价清晰", "开发前", "首次通话给出估算区间，调研后确定书面报价，开工前完成确认。"),
        (
            "用测试验证，非演示",
            "每个项目",
            "测试依据真实的业务规则编写，而不只覆盖顺利的情况。仅我们的薪资引擎就有 7,060 个测试。",
        ),
        ("交付物归您所有", "交付时", "部署在您自己的云账户、数据库和代码仓库上。任何工程师都能接手。"),
    ],
    "ev_case_kicker": "这套体系发现的问题",
    "ev_case": (
        "重建一套跨境贸易系统时，我们发现重新"
        "导入的银行对账单正在重复计算收款——"
        "该银行不提供转账编号作为去重依据。"
        "在测试阶段就被捕获，而非客户发现。"
    ),

    # 4 — working with us (risk mitigation / trust)
    "arch_kicker": "与我们合作",
    "arch_head": "首次合作将会这样展开。",
    "arch_items": [
        ("单一负责窗口", "总经理亲自确定范围、构建并交付系统。不经销售中间人，您直接与实际干活的人沟通。"),
        (
            "写代码前先书面确认",
            (
                "为期两周的付费范围梳理，产出一份可在内部传阅签批的文件——做"
                "什么、多少钱、何时完成——以及一个可点击的演示。费用可抵扣开"
                "发费用。"
            ),
        ),
        (
            "跨境运营是我们的常态",
            "我们正在运行的客户项目横跨新加坡与日本——在同一系统中处理不同时区、货币、语言和银行惯例，对我们来说是常态，而非特殊要求。",
        ),
        (
            "上线后支持不断",
            "交付时提供文档和一段支持期。之后可选择包含托管、修复和小改动的月度维护计划，或交由您自己的团队接手。事先确认。",
        ),
    ],

    # 5 — selected work (case studies, Japan first)
    "work_kicker": "代表案例",
    "work_head": "我们做过什么，以及现状。",
    "work_lead": (
        "因保密协议不公开客户名称。每张卡片都注明了项目现状，所有数字都可以在通话中逐一说明。"
    ),
    "work": [
        (
            "以表格和聊天工具运营的出口企业",
            "跨境贸易 &middot; 日本",
            (
                "库存用表格记录，收款人工对账。早期的境外供应商交付的 CRM"
                " 团队无法使用。我们重建了库存、按角色权限划分的 CRM、发"
                "票与运输文件、银行对账单导入。"
            ),
            "上线前发现的金额相关缺陷 2 个 &middot; 运行中 &middot; 中日双语支持",
        ),
        (
            "从企业自身文档中回答的 AI 副驾驶",
            "AI 实施 &middot; 新加坡",
            "通用机器人对中小企业知识工作者比较无用。我们构建了可检索客户自身文档的副驾驶。",
            "已为客户交付，合作于 2026 年结束 &middot; 多模型路由",
        ),
        (
            "一个可逐行审计的薪资引擎",
            "自主研发 &middot; 新加坡",
            (
                "新加坡的薪资规则毫不宽容——公积金取整、年龄分档、技能发展税"
                "的下限与上限。我们正在开发一个能展示每个数字计算过程的引擎，"
                "并逐个场景测试。"
            ),
            "开发中，尚未部署 &middot; 7,060 个自动化测试",
        ),
        (
            "签约前就能试用的演示",
            "售前 &middot; 日本与新加坡",
            (
                "在客户签约前，我们先展示系统实际运行。我们的日本网站为二手车"
                "出口商提供演示——拍卖、运输追踪、出口报价——新加坡网站另有"
                " 13 个演示。"
            ),
            (
                "japan.startech-innovation.com &middot; "
                "startech-innovation.com/solutions"
            ),
        ),
    ],

    # 6 — what we build
    "stack_kicker": "我们的业务领域",
    "stack_head": "四大领域的定制开发。",
    "stack_groups": [
        (
            "业务系统",
            "运营平台、CRM、库存、单据自动生成、工作流——把表格和分散工具换成团队真正会用的一套系统。",
        ),
        (
            "AI 实施",
            "基于您自有文档回答问题的助手和自动化流程，配备防护措施和来源标注，输出结果可核查。",
        ),
        (
            "财务工作流程",
            "开票、银行流水导入、对账和文件生成——附带审计轨迹，您的会计可以核对每一个数字。",
        ),
        (
            "跨境运营",
            "为往来于新加坡、日本及周边地区的企业打造多币种、多语言系统——一个系统，而不是三个。",
        ),
    ],

    # 7 — process
    "proc_kicker": "我们的工作方式",
    "proc_head": "从调研到上线，时间表可提前规划。",
    "process": [
        ("第 1&ndash;2 周", "范围梳理", "与一线人员坐在一起 &middot; 书面范围、费用和可点击的演示"),
        ("第 3&ndash;4 周", "架构设计", "技术设计 &middot; 书面确认固定报价与交付日期"),
        ("第 5&ndash;8 周", "开发", "在真实数据上验证 &middot; 每周汇报，非最终一次性揭晓"),
        ("第 9&ndash;11 周", "部署", "测试与交接 &middot; 部署在您自己的基础设施上"),
        ("第 12 周起", "维护计划", "按月托管、修复和小改动 &middot; 任何工程师都能接手的文档"),
    ],
    "proc_note": (
        (
        "时间表随项目规模而变化，上述仅为中型项目的大致轮廓；确切时间"
        "表将在调研后以书面形式提供。新加坡企业：签约前，我们会确认项"
        "目是否符合 EDGE 补助金的资助条件。"
    )
    ),

    # 8 — contact
    "cta_kicker": "联系我们",
    "cta_head": "发给我们一份电子表格。",
    "cta_body": (
        "选一份您最想替换的电子表格，我们会免费展示它变成系统后的运行效果，没有任何承诺要求。如果软件不是答案，我们也会直言告知。"
    ),
    "labels": {
        "md": "总经理", "phone": "电话 / WhatsApp",
        "email": "邮箱", "web": "网站", "linkedin": "LinkedIn",
        "office": "注册地址", "uen": "公司注册号（UEN）",
    },
    "footer_conf": (
        "本文件含商业机密信息，仅供指定收件人"
        "使用。"
    ),
}

ZH_HANT = {
    "lang": "zh-Hant",
    "doc_label": "能力介紹",

    # 1 — cover
    "cover_kicker": "能力介紹",
    "cover_head_1": "我們打造支撐您業務的",
    "cover_head_2": "軟體。",
    "cover_sub": (
        "一家總部設在新加坡的定製軟體開發公司。"
        "我們為那些表格、現成工具已無法勝任，"
        "或之前的供應商未能交付預期成果的企業，"
        "設計並打造在生產環境中穩定執行的系統。"
    ),
    "cover_meta": ["新加坡", "日本", "20年以上經驗"],

    # 2 — positioning
    "pos_kicker": "關於我們",
    "pos_head": "創辦人親自負責，從頭到尾。",
    "pos_body": (
        "StarTech Innovation 是定製軟體開發公司，而非"
        "標準產品供應商。我們不提供現成系統"
        "並希望它恰好適用，而是根據您企業的"
        "實際運作方式來打造系統。"
    ),
    "pos_body2": (
        "每個專案都由總經理親自從頭到尾負責，"
        "並根據需要引入專業人員。您直接與編寫"
        "程式碼、簽字交付的人溝通，中間沒有客戶"
        "經理轉述。"
    ),
    "pos_stats": [
        ("12", "典型完整專案從調研到上線所需週數"),
        ("7,060", "我們新加坡薪資引擎中的自動化測試數"),
        ("2", "在客戶正式運行的系統中，發布前發現的會造成損失的缺陷"),
        ("20+", "業務與工程合計經驗年限"),
    ],

    # 3 — evidence (rescue / quality discipline)
    "ev_kicker": "我們的工作方式",
    "ev_head": "我們常被聘來修復上一次沒做成的專案。",
    "ev_lead": (
        "我們的許多專案，都始於先前的供應商或現成工具無法勝任。這段經歷塑造了我們的開發方法。"
    ),
    "ev_cards": [
        ("先做調研", "第 1 週", "寫程式碼前，先與實際業務人員直接溝通。無論是否繼續合作，成果均歸您所有。"),
        ("範圍固定，報價清晰", "開發前", "首次通話給出估算區間，調研後確定書面報價，開工前完成確認。"),
        (
            "用測試驗證，非演示",
            "每個專案",
            "測試依據真實的業務規則撰寫，而不只涵蓋順利的情況。光是我們的薪資引擎就有 7,060 個測試。",
        ),
        ("交付物歸您所有", "交付時", "部署在您自己的雲帳戶、資料庫和程式碼倉庫上。任何工程師都能接手。"),
    ],
    "ev_case_kicker": "這套體系發現的問題",
    "ev_case": (
        "重建一套跨境貿易系統時，我們發現重新"
        "匯入的銀行對帳單正在重複計算收款——"
        "該銀行不提供轉帳編號作為去重依據。"
        "在測試階段就被捕獲，而非客戶發現。"
    ),

    # 4 — working with us (risk mitigation / trust)
    "arch_kicker": "與我們合作",
    "arch_head": "首次合作將會這樣展開。",
    "arch_items": [
        ("單一負責視窗", "總經理親自確定範圍、打造並交付系統。不經銷售中間人，您直接與實際幹活的人溝通。"),
        (
            "寫程式碼前先書面確認",
            (
                "為期兩週的付費範圍盤點，產出一份可在內部傳閱簽核的文件——做"
                "什麼、多少錢、何時完成——以及一個可點擊的示範。費用可折抵開"
                "發費用。"
            ),
        ),
        (
            "跨境運營是我們的常態",
            "我們正在運行的客戶專案橫跨新加坡與日本——在同一系統中處理不同時區、貨幣、語言和銀行慣例，對我們來說是常態，而非特殊要求。",
        ),
        (
            "上線後支援不斷",
            "交付時提供文件和一段支援期。之後可選擇包含代管、修正和小幅調整的月度維護方案，或交由您自己的團隊接手。事先確認。",
        ),
    ],

    # 5 — selected work (case studies, Japan first)
    "work_kicker": "代表案例",
    "work_head": "我們做過什麼，以及現況。",
    "work_lead": (
        "因保密協議不公開客戶名稱。每張卡片都註明了專案現況，所有數字都可以在通話中逐一說明。"
    ),
    "work": [
        (
            "以表格和聊天工具運營的出口企業",
            "跨境貿易 &middot; 日本",
            (
                "庫存用表格記錄，收款人工對帳。早期的境外供應商交付的 CRM"
                " 團隊無法使用。我們重建了庫存、按角色權限劃分的 CRM、發"
                "票與運輸文件、銀行對帳單匯入。"
            ),
            "上線前發現的金額相關缺陷 2 個 &middot; 執行中 &middot; 中日雙語支援",
        ),
        (
            "從企業自身文件中回答的 AI 副駕駛",
            "AI 實施 &middot; 新加坡",
            "通用機器人對中小企業知識工作者比較無用。我們打造了可檢索客戶自身文件的副駕駛。",
            "已為客戶交付，合作於 2026 年結束 &middot; 多模型路由",
        ),
        (
            "一個可逐行稽核的薪資引擎",
            "自主研發 &middot; 新加坡",
            (
                "新加坡的薪資規則毫不寬容——公積金進位、年齡分級、技能發展稅"
                "的下限與上限。我們正在開發一個能呈現每個數字計算過程的引擎，"
                "並逐一情境測試。"
            ),
            "開發中，尚未部署 &middot; 7,060 個自動化測試",
        ),
        (
            "簽約前就能試用的示範",
            "售前 &middot; 日本與新加坡",
            (
                "在客戶簽約前，我們先展示系統實際運作。我們的日本網站為中古車"
                "出口商提供示範——拍賣、運輸追蹤、出口報價——新加坡網站另有"
                " 13 個示範。"
            ),
            (
                "japan.startech-innovation.com &middot; "
                "startech-innovation.com/solutions"
            ),
        ),
    ],

    # 6 — what we build
    "stack_kicker": "我們的業務領域",
    "stack_head": "四大領域的定製開發。",
    "stack_groups": [
        (
            "業務系統",
            "運營平臺、CRM、庫存、單據自動生成、工作流——把表格和分散工具換成團隊真正會用的一套系統。",
        ),
        (
            "AI 實施",
            "根據您自有文件回答問題的助理與自動化流程，配備防護機制與來源標註，輸出結果可查核。",
        ),
        (
            "財務工作流程",
            "開立發票、銀行明細匯入、對帳與文件產生——附帶稽核軌跡，您的會計可以核對每一個數字。",
        ),
        (
            "跨境運營",
            "為往來於新加坡、日本及周邊地區的企業打造多幣別、多語言系統——一個系統，而不是三個。",
        ),
    ],

    # 7 — process
    "proc_kicker": "我們的工作方式",
    "proc_head": "從調研到上線，時間表可提前規劃。",
    "process": [
        ("第 1&ndash;2 週", "範圍盤點", "與第一線人員坐在一起 &middot; 書面範圍、費用和可點擊的示範"),
        ("第 3&ndash;4 週", "架構設計", "技術設計 &middot; 書面確認固定報價與交付日期"),
        ("第 5&ndash;8 週", "開發", "在真實資料上驗證 &middot; 每週彙報，非最終一次性揭曉"),
        ("第 9&ndash;11 週", "部署", "測試與交接 &middot; 部署在您自己的基礎設施上"),
        ("第 12 周起", "維護方案", "按月代管、修正和小幅調整 &middot; 任何工程師都能接手的文件"),
    ],
    "proc_note": (
        (
        "時間表隨專案規模而變化，上述僅為中型專案的大致輪廓；確切時間"
        "表將在調研後以書面形式提供。新加坡企業：簽約前，我們會確認專"
        "案是否符合 EDGE 補助金的資助條件。"
    )
    ),

    # 8 — contact
    "cta_kicker": "聯絡我們",
    "cta_head": "傳給我們一份試算表。",
    "cta_body": (
        "選一份您最想取代的試算表，我們會免費展示它變成系統後的運作效果，沒有任何承諾要求。如果軟體不是答案，我們也會直言告知。"
    ),
    "labels": {
        "md": "總經理", "phone": "電話 / WhatsApp",
        "email": "電子郵件", "web": "網站", "linkedin": "LinkedIn",
        "office": "註冊地址", "uen": "公司註冊號（UEN）",
    },
    "footer_conf": (
        "本文件含商業機密資訊，僅供指定收件人"
        "使用。"
    ),
}

ES = {
    "lang": "es",
    "doc_label": "Dossier de capacidades",

    # 1 — cover
    "cover_kicker": "Dossier de capacidades",
    "cover_head_1": "Desarrollamos el software",
    "cover_head_2": "que hace funcionar su negocio.",
    "cover_sub": (
        "Una empresa de desarrollo de software a medida con sede en "
        "Singapur. Diseñamos y construimos sistemas en producción "
        "para empresas que han superado las hojas de cálculo, las "
        "herramientas genéricas, o un proveedor que no cumplió."
    ),
    "cover_meta": ["Singapur", "Japón", "20+ años"],

    # 2 — positioning
    "pos_kicker": "Quiénes somos",
    "pos_head": "Dirigido por su fundador, de principio a fin.",
    "pos_body": (
        "StarTech Innovation es una empresa de software a medida, no "
        "un proveedor de producto. No le vendemos un sistema "
        "genérico esperando que encaje — construimos el sistema "
        "alrededor de cómo funciona realmente su negocio."
    ),
    "pos_body2": (
        "Cada proyecto lo dirige personalmente el Director General, "
        "de principio a fin, con especialistas que se suman según lo "
        "requiera el trabajo. Trata directamente con quien escribe el "
        "código y firma la entrega."
    ),
    "pos_stats": [
        (
            "12",
            (
                "Semanas del descubrimiento a la puesta en marcha en un "
                "proyecto completo típico"
            ),
        ),
        (
            "7.060",
            "Pruebas automatizadas en nuestro motor de nóminas de Singapur",
        ),
        (
            "2",
            (
                "Errores costosos detectados antes del lanzamiento en un "
                "sistema de cliente activo"
            ),
        ),
        (
            "20+",
            "Años de experiencia combinada en negocio e ingeniería",
        ),
    ],

    # 3 — evidence (rescue / quality discipline)
    "ev_kicker": "Cómo trabajamos",
    "ev_head": "Nos suelen contratar para arreglar lo que no funcionó antes.",
    "ev_lead": (
        (
        "Gran parte de nuestro trabajo empieza porque un proveedor "
        "anterior, o una herramienta genérica, no dio la talla. Esa "
        "experiencia marca cómo construimos."
    )
    ),
    "ev_cards": [
        (
            "Primero, descubrimiento",
            "Semana 1",
            (
                "Nos sentamos con quien hace el trabajo antes de escribir "
                "código. El resultado es suyo, decida lo que decida después."
            ),
        ),
        (
            "Alcance fijo, coste claro",
            "Antes de construir",
            (
                "Un rango de precio en la primera llamada, una cifra firme "
                "tras el descubrimiento — acordado por escrito antes de "
                "empezar."
            ),
        ),
        (
            "Probado, no demostrado",
            "En cada proyecto",
            (
                "Pruebas escritas contra las reglas reales del negocio, no "
                "solo el caso ideal. Solo nuestro motor de nóminas tiene "
                "7.060."
            ),
        ),
        (
            "Usted es dueño del resultado",
            "En la entrega",
            (
                "Desplegado en su propia cuenta de nube, base de datos y "
                "repositorio. Cualquier ingeniero puede continuarlo."
            ),
        ),
    ],
    "ev_case_kicker": "Lo que detecta esta disciplina",
    "ev_case": (
        "Al reconstruir un sistema de comercio transfronterizo, un "
        "extracto bancario reimportado duplicaba silenciosamente los "
        "cobros — el banco no emitía identificador de transferencia "
        "para detectar duplicados. Detectado en pruebas, no por un "
        "cliente."
    ),

    # 4 — working with us (risk mitigation / trust)
    "arch_kicker": "Trabajar con nosotros",
    "arch_head": "Así es un primer proyecto con nosotros.",
    "arch_items": [
        (
            "Un único punto de contacto responsable",
            (
                "El Director General define el alcance, construye y entrega su "
                "sistema personalmente. Sin gestor de cuenta de por medio — "
                "habla directamente con quien hace el trabajo."
            ),
        ),
        (
            "Alcance por escrito antes del código",
            (
                "Un sprint de alcance de dos semanas, de pago, produce un "
                "documento que puede circular internamente para su aprobación "
                "—qué se construye, cuánto cuesta y para cuándo— y una demo "
                "navegable. El importe se descuenta del desarrollo."
            ),
        ),
        (
            "Lo transfronterizo es nuestro caso normal",
            (
                "Nuestro trabajo activo con clientes se mueve entre Singapur y "
                "Japón: distintas zonas horarias, monedas, idiomas y prácticas "
                "bancarias en un mismo sistema es nuestro caso habitual, no "
                "una petición especial."
            ),
        ),
        (
            "El soporte no termina en el lanzamiento",
            (
                "La entrega incluye documentación y un periodo de soporte. "
                "Después, un plan de mantenimiento mensual cubre alojamiento, "
                "correcciones y pequeños cambios, o puede pasar el sistema a "
                "su propio equipo. Usted decide, y se acuerda de antemano."
            ),
        ),
    ],

    # 5 — selected work (case studies, Japan first)
    "work_kicker": "Proyectos seleccionados",
    "work_head": "Lo que hemos construido y en qué punto está.",
    "work_lead": (
        (
        "Nombres de clientes omitidos por confidencialidad. Cada "
        "tarjeta indica el estado del trabajo; cualquier cifra puede "
        "explicarse en una llamada."
    )
    ),
    "work": [
        (
            "Un exportador que operaba con hojas de cálculo y chat",
            "Comercio transfronterizo &middot; Japón",
            (
                "Inventario en una hoja de cálculo, pagos conciliados a mano. "
                "Un proveedor anterior entregó un CRM inservible. Lo "
                "reconstruimos: inventario, CRM por rol, facturas y envío, "
                "importación de extractos bancarios."
            ),
            (
                "2 fallos con impacto económico detectados antes de publicar "
                "&middot; en producción &middot; bilingüe JP / EN"
            ),
        ),
        (
            (
                "Un copiloto de IA que responde desde los documentos de la "
                "empresa"
            ),
            "Implementación de IA &middot; Singapur",
            (
                "Un chatbot genérico no sirve a un trabajador del conocimiento "
                "de una pyme — no sabe nada de su rol ni sector. Construimos "
                "un copiloto con búsqueda sobre los documentos propios del "
                "cliente."
            ),
            (
                "Entregado a un cliente; proyecto finalizado en 2026 &middot; "
                "enrutamiento entre varios LLM"
            ),
        ),
        (
            "Un motor de nóminas que se puede auditar línea a línea",
            "Desarrollo propio &middot; Singapur",
            (
                "Las reglas de nómina de Singapur no perdonan: redondeo del "
                "CPF, tramos de edad, mínimos y topes del SDL. Estamos "
                "construyendo un motor que muestra el cálculo de cada cifra, "
                "probado escenario por escenario."
            ),
            (
                "En desarrollo, aún no implantado &middot; 7.060 pruebas "
                "automatizadas"
            ),
        ),
        (
            "Demos que puede probar antes de comprometerse",
            "Preventa &middot; Japón y Singapur",
            (
                "Mostramos el sistema funcionando antes de que el cliente "
                "firme. Nuestro sitio de Japón tiene demos para exportadores "
                "de coches usados —subastas, seguimiento de envíos, "
                "presupuestos de exportación— y nuestro sitio de Singapur, "
                "trece más."
            ),
            (
                "japan.startech-innovation.com &middot; "
                "startech-innovation.com/solutions"
            ),
        ),
    ],

    # 6 — what we build
    "stack_kicker": "Qué construimos",
    "stack_head": "Software a medida en cuatro áreas.",
    "stack_groups": [
        (
            "Sistemas de negocio",
            (
                "Plataformas operativas, CRM, inventario, generación de "
                "documentos y flujos de trabajo — sustituyendo hojas de "
                "cálculo y herramientas dispersas por un sistema que su equipo "
                "realmente usará."
            ),
        ),
        (
            "Implementación de IA",
            (
                "Asistentes que responden a partir de sus propios documentos y "
                "flujos de automatización, con salvaguardas y citas de fuentes "
                "para que el resultado pueda verificarse."
            ),
        ),
        (
            "Flujos financieros",
            (
                "Facturación, importación de extractos bancarios, conciliación "
                "y generación de documentos, con un registro de auditoría para "
                "que su contable pueda comprobar cada cifra."
            ),
        ),
        (
            "Operaciones transfronterizas",
            (
                "Sistemas multimoneda y multilingües para empresas que "
                "comercian entre Singapur, Japón y la región: un sistema, no "
                "tres."
            ),
        ),
    ],

    # 7 — process
    "proc_kicker": "Cómo trabajamos",
    "proc_head": "Del descubrimiento a producción, con un calendario planificable.",
    "process": [
        (
            "Semana 1&ndash;2",
            "Sprint de alcance",
            (
                "Sentarnos con quienes hacen el trabajo &middot; alcance y "
                "coste por escrito, y una demo navegable"
            ),
        ),
        (
            "Semana 3&ndash;4",
            "Arquitectura",
            (
                "Diseño técnico &middot; precio firme y fecha de entrega "
                "acordados por escrito"
            ),
        ),
        (
            "Semana 5&ndash;8",
            "Construcción",
            (
                "Sistema funcionando con datos reales &middot; seguimiento "
                "semanal, no una revelación al final"
            ),
        ),
        (
            "Semana 9&ndash;11",
            "Despliegue",
            (
                "Pruebas y traspaso &middot; desplegado en su propia "
                "infraestructura"
            ),
        ),
        (
            "Semana 12+",
            "Plan de mantenimiento",
            (
                "Alojamiento, correcciones y pequeños cambios cada mes "
                "&middot; documentación para que cualquier ingeniero pueda "
                "continuar"
            ),
        ),
    ],
    "proc_note": (
        (
        "El calendario varía según el alcance — esto es la forma de un "
        "proyecto mediano, no una promesa fija. El calendario real lo "
        "recibe por escrito tras el descubrimiento. Para empresas de "
        "Singapur, comprobamos si el proyecto puede optar a la ayuda "
        "EDGE antes de que se comprometa."
    )
    ),

    # 8 — contact
    "cta_kicker": "Contacto",
    "cta_head": "Envíenos una hoja de cálculo.",
    "cta_body": (
        (
        "Elija la hoja de cálculo que más le gustaría sustituir y le "
        "mostraremos cómo funciona como sistema, gratis y sin "
        "compromiso. Si el software no es la respuesta, se lo diremos "
        "también."
    )
    ),
    "labels": {
        "md": "Director General", "phone": "Teléfono / WhatsApp",
        "email": "Correo electrónico", "web": "Web", "linkedin": "LinkedIn",
        "office": "Domicilio social", "uen": "UEN",
    },
    "footer_conf": (
        "Este documento contiene información comercial confidencial "
        "y está destinado exclusivamente al destinatario indicado."
    ),
}

PT = {
    "lang": "pt",
    "doc_label": "Dossiê de capacidades",

    # 1 — cover
    "cover_kicker": "Dossiê de capacidades",
    "cover_head_1": "Desenvolvemos o software",
    "cover_head_2": "que faz o seu negócio funcionar.",
    "cover_sub": (
        "Uma casa de desenvolvimento de software sob medida com sede "
        "em Singapura. Projetamos e construímos sistemas em produção "
        "para empresas que já superaram planilhas, ferramentas "
        "prontas, ou um fornecedor que não entregou."
    ),
    "cover_meta": ["Singapura", "Japão", "20+ anos"],

    # 2 — positioning
    "pos_kicker": "Quem somos",
    "pos_head": "Conduzido pelo fundador, do início ao fim.",
    "pos_body": (
        "A StarTech Innovation é uma casa de software sob medida, "
        "não um fornecedor de produto. Não vendemos um sistema "
        "pronto na esperança de que sirva — construímos o sistema em "
        "torno de como o seu negócio realmente funciona."
    ),
    "pos_body2": (
        "Cada projeto é conduzido pessoalmente pelo Diretor-Geral, "
        "do início ao fim, com especialistas entrando conforme a "
        "necessidade. Você lida diretamente com quem escreve o "
        "código e assina a entrega."
    ),
    "pos_stats": [
        (
            "12",
            (
                "Semanas da descoberta à implantação em um projeto completo "
                "típico"
            ),
        ),
        (
            "7.060",
            (
                "Testes automatizados no nosso motor de folha de pagamento de "
                "Singapura"
            ),
        ),
        (
            "2",
            (
                "Bugs que causariam prejuízo detectados antes do lançamento em "
                "um sistema de cliente ativo"
            ),
        ),
        (
            "20+",
            "Anos de experiência combinada em negócios e engenharia",
        ),
    ],

    # 3 — evidence (rescue / quality discipline)
    "ev_kicker": "Como trabalhamos",
    "ev_head": "Somos contratados com frequência para consertar o que não deu certo antes.",
    "ev_lead": (
        (
        "Boa parte do nosso trabalho começa porque um fornecedor "
        "anterior, ou uma ferramenta pronta, não se sustentou. Essa "
        "experiência molda como construímos."
    )
    ),
    "ev_cards": [
        (
            "Descoberta primeiro",
            "Semana 1",
            (
                "Sentamos com quem faz o trabalho antes de escrever código. O "
                "resultado é seu, independente da decisão seguinte."
            ),
        ),
        (
            "Escopo fixo, custo claro",
            "Antes de construir",
            (
                "Uma faixa de preço na primeira ligação, um número firme após "
                "a descoberta — acordado por escrito antes de começar."
            ),
        ),
        (
            "Testado, não demonstrado",
            "Em cada projeto",
            (
                "Testes escritos com base nas regras reais do negócio, não só "
                "no caminho feliz. Só o nosso motor de folha de pagamento tem "
                "7.060."
            ),
        ),
        (
            "Você é dono do resultado",
            "Na entrega",
            (
                "Implantado na sua própria conta de nuvem, banco de dados e "
                "repositório. Qualquer engenheiro pode continuar."
            ),
        ),
    ],
    "ev_case_kicker": "O que essa disciplina encontra",
    "ev_case": (
        "Ao reconstruir um sistema de comércio internacional, um "
        "extrato bancário reimportado duplicava silenciosamente os "
        "recebimentos — o banco não emitia identificador de "
        "transferência para detectar duplicidade. Encontrado em "
        "teste, não por um cliente."
    ),

    # 4 — working with us (risk mitigation / trust)
    "arch_kicker": "Trabalhar conosco",
    "arch_head": "Assim é um primeiro projeto conosco.",
    "arch_items": [
        (
            "Um único ponto de contato responsável",
            (
                "O Diretor-Geral define o escopo, constrói e entrega o seu "
                "sistema pessoalmente. Sem gerente de contas no meio — você "
                "fala direto com quem faz o trabalho."
            ),
        ),
        (
            "Escopo por escrito antes do código",
            (
                "Um sprint de escopo pago, de duas semanas, produz um "
                "documento que você pode circular internamente para aprovação "
                "— o que será construído, quanto custa e para quando — e uma "
                "demonstração clicável. O valor é abatido do desenvolvimento."
            ),
        ),
        (
            "Operação transfronteiriça já é padrão",
            (
                "Nosso trabalho ativo com clientes acontece entre Singapura e "
                "Japão — fusos horários, moedas, idiomas e práticas bancárias "
                "diferentes em um único sistema são o nosso caso normal, não "
                "um pedido especial."
            ),
        ),
        (
            "O suporte não termina no lançamento",
            (
                "A entrega inclui documentação e um período de suporte. "
                "Depois, um plano mensal de manutenção cobre hospedagem, "
                "correções e pequenas mudanças — ou você repassa o sistema à "
                "sua equipe. Você escolhe, combinado desde o início."
            ),
        ),
    ],

    # 5 — selected work (case studies, Japan first)
    "work_kicker": "Projetos selecionados",
    "work_head": "O que construímos e em que pé está.",
    "work_lead": (
        (
        "Nomes de clientes omitidos por confidencialidade. Cada cartão "
        "indica o status do trabalho; qualquer número pode ser "
        "explicado em uma ligação."
    )
    ),
    "work": [
        (
            "Um exportador que operava com planilhas e chat",
            "Comércio internacional &middot; Japão",
            (
                "Estoque em planilha, pagamentos conciliados manualmente. Um "
                "fornecedor anterior entregou um CRM inutilizável. "
                "Reconstruímos: estoque, CRM por papel, fatura e embarque, "
                "importação de extratos bancários."
            ),
            (
                "2 falhas com impacto financeiro encontradas antes do "
                "lançamento &middot; em produção &middot; bilíngue JP / EN"
            ),
        ),
        (
            (
                "Um copiloto de IA que responde a partir dos documentos da "
                "própria empresa"
            ),
            "Implementação de IA &middot; Singapura",
            (
                "Um chatbot genérico não serve para um trabalhador do "
                "conhecimento de PME — ele não sabe nada sobre o papel ou "
                "setor dela. Construímos um copiloto com busca sobre os "
                "documentos do próprio cliente."
            ),
            (
                "Entregue a um cliente; projeto concluído em 2026 &middot; "
                "roteamento entre vários LLMs"
            ),
        ),
        (
            "Um motor de folha de pagamento auditável linha a linha",
            "Desenvolvimento próprio &middot; Singapura",
            (
                "As regras de folha de pagamento de Singapura não perdoam — "
                "arredondamento do CPF, faixas etárias, pisos e tetos do SDL. "
                "Estamos construindo um motor que mostra o cálculo de cada "
                "valor, testado cenário por cenário."
            ),
            (
                "Em desenvolvimento, ainda não implantado &middot; 7.060 "
                "testes automatizados"
            ),
        ),
        (
            "Demonstrações que você testa antes de fechar",
            "Pré-venda &middot; Japão e Singapura",
            (
                "Mostramos o sistema funcionando antes de o cliente assinar. "
                "Nosso site do Japão tem demonstrações para exportadores de "
                "carros usados — leilões, rastreamento de envios, cotações de "
                "exportação — e nosso site de Singapura tem mais treze."
            ),
            (
                "japan.startech-innovation.com &middot; "
                "startech-innovation.com/solutions"
            ),
        ),
    ],

    # 6 — what we build
    "stack_kicker": "O que construímos",
    "stack_head": "Software sob medida em quatro áreas.",
    "stack_groups": [
        (
            "Sistemas de negócio",
            (
                "Plataformas operacionais, CRM, estoque, geração de documentos "
                "e fluxos de trabalho — substituindo planilhas e ferramentas "
                "dispersas por um único sistema que sua equipe realmente vai "
                "usar."
            ),
        ),
        (
            "Implementação de IA",
            (
                "Assistentes que respondem com base nos seus próprios "
                "documentos e fluxos de automação, com salvaguardas e "
                "indicação de fontes para que o resultado possa ser conferido."
            ),
        ),
        (
            "Fluxos financeiros",
            (
                "Faturamento, importação de extratos bancários, conciliação e "
                "geração de documentos — com trilha de auditoria para que seu "
                "contador confira cada número."
            ),
        ),
        (
            "Operações transfronteiriças",
            (
                "Sistemas multimoeda e multilíngues para empresas que negociam "
                "entre Singapura, Japão e a região — um sistema, não três."
            ),
        ),
    ],

    # 7 — process
    "proc_kicker": "Como trabalhamos",
    "proc_head": "Da descoberta à produção, com um cronograma planejável.",
    "process": [
        (
            "Semana 1&ndash;2",
            "Sprint de escopo",
            (
                "Sentar com quem faz o trabalho &middot; escopo e custo por "
                "escrito, e uma demonstração clicável"
            ),
        ),
        (
            "Semana 3&ndash;4",
            "Arquitetura",
            (
                "Design técnico &middot; preço firme e data de entrega "
                "combinados por escrito"
            ),
        ),
        (
            "Semana 5&ndash;8",
            "Construção",
            (
                "Sistema funcionando com dados reais &middot; relatórios "
                "semanais, não uma revelação só no final"
            ),
        ),
        (
            "Semana 9&ndash;11",
            "Implantação",
            (
                "Testes e repasse &middot; implantado na sua própria "
                "infraestrutura"
            ),
        ),
        (
            "Semana 12+",
            "Plano de manutenção",
            (
                "Hospedagem, correções e pequenas mudanças todo mês &middot; "
                "documentação para qualquer engenheiro assumir"
            ),
        ),
    ],
    "proc_note": (
        (
        "O cronograma varia com o escopo — isto é a forma de um "
        "projeto de porte médio, não uma promessa fixa. O cronograma "
        "real você recebe por escrito após a descoberta. Para empresas "
        "de Singapura, verificamos se o projeto pode se qualificar "
        "para o subsídio EDGE antes de você fechar."
    )
    ),

    # 8 — contact
    "cta_kicker": "Contato",
    "cta_head": "Envie-nos uma planilha.",
    "cta_body": (
        (
        "Escolha a planilha que você mais gostaria de substituir e "
        "mostraremos como ela funciona como sistema — grátis, sem "
        "compromisso. Se software não for a resposta, diremos isso "
        "também."
    )
    ),
    "labels": {
        "md": "Diretor-Geral", "phone": "Telefone / WhatsApp",
        "email": "E-mail", "web": "Site", "linkedin": "LinkedIn",
        "office": "Endereço registrado", "uen": "UEN",
    },
    "footer_conf": (
        "Este documento contém informações comerciais confidenciais "
        "e destina-se exclusivamente ao destinatário indicado."
    ),
}
