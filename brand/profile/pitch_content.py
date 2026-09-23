# -*- coding: utf-8 -*-
"""Customer-facing pitch deck content, EN. Singapore + Japan audience.

Positioning: custom software house, not an ERP vendor. The ERP work
appears only as evidence of capability on complex systems, never as
the headline offer.

Every claim here is drawn from src/i18n/en.ts case studies and is
checkable on a call — no invented numbers.
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
    "pos_head": "A small team that ships.",
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
        ("4", "Production systems delivered and live"),
        ("7,060", "Automated tests behind our largest build"),
        ("2", "Markets served natively — Singapore, Japan"),
        ("20+", "Years combined business and engineering experience"),
    ],

    # 3 — evidence (rescue / quality discipline)
    "ev_kicker": "How we work",
    "ev_head": "We are hired to fix what did not work the first time.",
    "ev_lead": (
        "Three of our four production systems started because an "
        "earlier vendor, or an off-the-shelf tool, did not hold up. "
        "That shapes how we build."
    ),
    "ev_cards": [
        ("Discovery first", "Week 1",
         "We sit with the people doing the work before writing code. "
         "You own the output either way."),
        ("Fixed scope, clear cost", "Before build",
         "A price range on the first call, a firm number after "
         "discovery — agreed in writing before work starts."),
        ("Tested, not demoed", "Every build",
         "Tests written against the real business rules, not the "
         "happy path. Our largest system carries 7,060."),
        ("You own the build", "At delivery",
         "Deployed on your cloud account, your database, your "
         "repository. Any engineer can take it over."),
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
        ("One accountable point of contact",
         "The Managing Director scopes, builds and delivers your "
         "system personally. No account manager relaying between you "
         "and the engineers — you talk to the person doing the work."),
        ("Written scope before code",
         "Discovery produces a document you can circulate internally "
         "for sign-off: what is being built, what it costs, and by "
         "when. Changes after that are agreed in writing, not assumed."),
        ("Cross-border by default",
         "We already operate across Singapore, Indonesia and Japan — "
         "different time zones, currencies, banking conventions and "
         "regulatory calendars in one system is our normal case, not "
         "a special request."),
        ("Support does not end at launch",
         "Delivery includes documentation and a support period after "
         "go-live. The system is built to be handed to your own team "
         "or ours to maintain — your choice, stated up front."),
    ],

    # 5 — selected work (case studies, Japan first)
    "work_kicker": "Selected work",
    "work_head": "Systems running in production.",
    "work_lead": (
        "Client names withheld under confidentiality; every figure "
        "can be walked through on a call."
    ),
    "work": [
        ("An exporter running its operations on spreadsheets and chat",
         "Cross-border trade &middot; Japan",
         "Inventory in a spreadsheet, payments reconciled by hand. An "
         "earlier offshore vendor had delivered a CRM the team could "
         "not use. We rebuilt it: inventory, role-scoped CRM, invoice "
         "and shipping documents, bank-statement import.",
         "2 money-losing bugs caught before release &middot; live "
         "&middot; bilingual JP / EN"),
        ("An AI co-pilot that answers from the company's own documents",
         "AI implementation &middot; Singapore",
         "A generic chatbot is worthless to an SME knowledge worker — "
         "it knows nothing about their role or sector. We built a "
         "co-pilot with retrieval over the client's own documents.",
         "Live production API, paying client &middot; multi-LLM "
         "routing"),
        ("A payroll engine an accountant can audit line by line",
         "Financial systems &middot; Singapore &amp; Indonesia",
         "Singapore payroll compliance is unforgiving — CPF rounding, "
         "age bands, SDL floors and caps. Ours is verified against "
         "CPF Board tables scenario by scenario.",
         "7,060 automated tests, 484 calculator classes"),
        ("A health record the patient owns, not the hospital",
         "Healthcare &middot; Indonesia &amp; Southeast Asia",
         "Patients moving between Indonesian and Singaporean "
         "providers carry their history in paper folders. Provider "
         "systems do not talk to each other. We built a trilingual, "
         "patient-owned platform.",
         "3 languages, one codebase &middot; data residency by design"),
    ],

    # 6 — what we build (services, ERP reframed as evidence not flagship)
    "stack_kicker": "What we build",
    "stack_head": "Custom software across four practices.",
    "stack_groups": [
        ("Business systems",
         "Operations platforms, CRM, inventory, document generation "
         "and workflow — replacing spreadsheets and disconnected "
         "tools with one system your team will actually use."),
        ("AI implementation",
         "Retrieval over your own documents, domain-tuned models and "
         "automation pipelines, with guardrails and source "
         "attribution so the output can be checked."),
        ("Financial &amp; compliance systems",
         "Accounting engines, reconciliation, payroll compliance and "
         "regulatory reporting for businesses that answer to a "
         "regulator or an auditor."),
        ("Cross-border operations",
         "Multi-currency, multi-jurisdiction systems for companies "
         "operating across Singapore, Indonesia and Japan — one "
         "system, not three."),
    ],

    # 7 — process
    "proc_kicker": "How we work",
    "proc_head": "Discovery to production, on a schedule you can plan around.",
    "process": [
        ("Week 1&ndash;2", "Discovery",
         "Sit with the people doing the work &middot; written scope "
         "and cost range"),
        ("Week 3&ndash;4", "Architecture",
         "Technical design &middot; firm price and delivery date "
         "agreed in writing"),
        ("Week 5&ndash;8", "Build",
         "Working system against real data &middot; weekly check-ins, "
         "not a reveal at the end"),
        ("Week 9&ndash;11", "Deployment",
         "Testing, staff handover &middot; deployed on infrastructure "
         "you own"),
        ("Week 12+", "Support",
         "Agreed support period &middot; documentation so any "
         "engineer can take over"),
    ],
    "proc_note": (
        "Timelines scale with scope — this is the shape of a mid-size "
        "engagement, not a fixed promise. You get the real schedule "
        "after discovery, in writing."
    ),

    # 8 — contact
    "cta_kicker": "Contact",
    "cta_head": "Let's talk about what you're building.",
    "cta_body": (
        "Free first call, no brief document required — bring the "
        "process that costs you the most time. If software is not "
        "the answer, we will tell you that too."
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
    "pos_head": "小規模でも、確実に納品するチームです。",
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
        ("4", "本番稼働中のシステム数"),
        ("7,060", "最大規模システムの自動テスト数"),
        ("2", "自前対応する市場（シンガポール・日本）"),
        ("20+", "事業・エンジニアリング合計経験年数"),
    ],

    # 3 — evidence (rescue / quality discipline)
    "ev_kicker": "私たちの仕事のやり方",
    "ev_head": "「前回うまくいかなかった」から始まる依頼が大半です。",
    "ev_lead": (
        "現在稼働中の4システムのうち3つは、"
        "以前のベンダーまたは市販ツールが機能しなかったことから始まりました。"
        "この経験が私たちの開発手法を形作っています。"
    ),
    "ev_cards": [
        ("まずはヒアリング", "第1週",
         "コードを書く前に、実際の業務担当者に直接ヒアリング。"
         "結果は契約の有無に関わらず貴社に帰属します。"),
        ("先にスコープと見積もりを確定", "開発前",
         "初回の商談で概算を、ヒアリング後に確定見積を提示。"
         "封入のタイミングもすべて書面で合意します。"),
        ("デモではなくテストで検証", "開発中",
         "表面的な動作確認ではなく、実際の業務ルールに対して自動テストを作成。"
         "最大規模のシステムでは7,060件を実施しています。"),
        ("貴社が基盤を所有", "納品時",
         "貴社のクラウド、データベース、リポジトリ上に構築。"
         "ドキュメントとテストが整っているため、他のエンジニアでも引き継げます。"),
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
        ("窓口一元化",
         "代表自らが要件定義から開発、納品まで一貫して担当。"
         "間に営業担当者を介さず、実際に作業する人物と直接やりとりします。"),
        ("コード作成前の書面化",
         "ヒアリング後、納品物、費用、納期を明記した資料を作成し、"
         "社内稟議や稟認にご活用いただけます。変更は必ず書面で合意します。"),
        ("国境を跨ぐ運営は平常業務",
         "シンガポール、インドネシア、日本をまたがる運営は日常的に対応しており、"
         "異なるタイムゾーン、通貨、銀行慣行、規制カレンダーを一つの"
         "システムで处理できます。"),
        ("稼働後もサポートを継続",
         "納品時にドキュメントと一定期間のサポートを付与。"
         "保守を貴社のチームまたは当方に依頼するかを事前に確定します。"),
    ],

    # 5 — selected work (case studies, Japan first)
    "work_kicker": "実績",
    "work_head": "本番稼働中のシステム。",
    "work_lead": (
        "秘密保持契約により顧客名は伏せております。"
        "数値はすべてご説明可能です。"
    ),
    "work": [
        ("表計算ソフトとチャットで運営していた輸出企業",
         "貿易・国境間取引 &middot; 日本",
         "在庫は表計算ソフトで管理し、入金照合は手作業。"
         "以前の海外ベンダーが構築したCRMは現場で使えず、"
         "在庫管理、権限別CRM、請求・出荷書類作成、入金取込みを再構築。",
         "リリース前に発見した損失バグ2件 &middot; 本番稼働中 "
         "&middot; 日英バイリンガル対応"),
        ("自社資料から回答するAIコパイロット",
         "AI実装 &middot; シンガポール",
         "汎用型AIはSMEの情報なしには無力です。"
         "顧客自身の資料を注中するRetrieval型AIコパイロットを構築。",
         "有料顧客の本番稼働 API &middot; 複数LLMルーティング対応"),
        ("会計士が一行ごと監査できる給与エンジン",
         "金融システム &middot; シンガポール &amp; インドネシア",
         "シンガポールCPFの三段階丸め処理、年齢区分、SDL上下限などの"
         "複雑な規則をCPF当局のテーブルと一致するまで検証。",
         "自動テスト7,060件、4,840以上の計算クラス"),
        ("病院ではなく患者自身が所有する電子カルテ",
         "ヘルスケア &middot; インドネシア &amp; 東南アジア",
         "インドネシアとシンガポールを行き来する患者の病歴は紙ファイルのまま。"
         "3言語対応、患者中心型のプラットフォームを構築。",
         "3言語・単一コードベース &middot; 設計段階からのデータ局地化"),
    ],

    # 6 — what we build
    "stack_kicker": "提供領域",
    "stack_head": "4つの領域にわたるカスタム開発。",
    "stack_groups": [
        ("業務システム",
         "基幹業務プラットフォーム、CRM、在庫、帳票自動作成、ワークフロー。"
         "表計算や分断したツールを、現場が実際に使う一つのシステムに。"),
        ("AI実装",
         "貴社の資料を注中するRetrieval型AI、専門領域に合わせたモデル調整、"
         "自動化パイプライン。出力を検証できるガードレールと出典表示付き。"),
        ("金融・コンプライアンスシステム",
         "会計エンジン、照合自動化、給与コンプライアンス、"
         "規制当局向け報告。監査人や規制当局に対応する企業向け。"),
        ("国境を跨ぐ運営",
         "シンガポール、インドネシア、日本をまたがる"
         "多通貨・多拠点システム。三つではなく、一つのシステムで。"),
    ],

    # 7 — process
    "proc_kicker": "進め方",
    "proc_head": "ヒアリングから本番稼働まで、計画できるスケジュールで。",
    "process": [
        ("第1&ndash;2週", "ヒアリング",
         "現場担当者へのヒアリング &middot; 書面スコープと概算の提示"),
        ("第3&ndash;4週", "設計",
         "技術設計 &middot; 確定価格と納期を書面で合意"),
        ("第5&ndash;8週", "実装",
         "実データでの動作確認 &middot; 週次報告、最終公開のみではない"),
        ("第9&ndash;11週", "導入",
         "テストと引き継ぎ &middot; 貴社所有の基盤上にデプロイ"),
        ("第12週以降", "サポート",
         "合意したサポート期間 &middot; 他のエンジニアでも引き継げるドキュメント"),
    ],
    "proc_note": (
        "スケジュールは規模に応じて変動します。上記は中規模案件の目安であり、"
        "確定スケジュールはヒアリング後に書面でご提示します。"
    ),

    # 8 — contact
    "cta_kicker": "お問い合わせ",
    "cta_head": "まずはご相談ください。",
    "cta_body": (
        "初回のご相談は無料です。企画書は不要です。"
        "最も時間を要している業務をお話しください。"
        "ソフトウェアが解決策でない場合は、その旨も率直にお伝えします。"
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
    "pos_head": "Tim kecil yang benar-benar menuntaskan pekerjaan.",
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
        ("4", "Sistem produksi yang telah diserahkan dan berjalan"),
        ("7.060", "Uji otomatis pada pembangunan terbesar kami"),
        ("2", "Pasar yang kami layani secara langsung — Singapura, Jepang"),
        ("20+", "Tahun pengalaman gabungan bisnis dan rekayasa"),
    ],

    # 3 — evidence (rescue / quality discipline)
    "ev_kicker": "Cara kami bekerja",
    "ev_head": "Kami sering disewa untuk memperbaiki yang gagal sebelumnya.",
    "ev_lead": (
        "Tiga dari empat sistem produksi kami dimulai karena vendor "
        "sebelumnya, atau aplikasi siap pakai, tidak dapat diandalkan. "
        "Pengalaman itu membentuk cara kami membangun."
    ),
    "ev_cards": [
        ("Kebutuhan dulu", "Minggu 1",
         "Bertemu langsung dengan pelaksana pekerjaan sebelum "
         "menulis kode. Hasilnya tetap milik Anda."),
        ("Lingkup &amp; biaya jelas", "Sebelum mulai",
         "Kisaran harga di awal, angka pasti setelah penggalian "
         "kebutuhan — disepakati tertulis."),
        ("Diuji, bukan didemokan", "Tiap proyek",
         "Uji otomatis atas aturan bisnis nyata. Sistem terbesar "
         "kami memiliki 7.060 uji."),
        ("Anda memiliki hasilnya", "Saat serah",
         "Diterapkan di akun cloud dan repositori Anda sendiri. "
         "Insinyur lain dapat melanjutkannya."),
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
        ("Satu titik kontak yang bertanggung jawab",
         "Managing Director menentukan ruang lingkup, membangun, dan "
         "menyerahkan sistem Anda secara langsung. Tidak ada account "
         "manager sebagai perantara — Anda berbicara langsung dengan "
         "orang yang mengerjakannya."),
        ("Ruang lingkup tertulis sebelum kode ditulis",
         "Penggalian kebutuhan menghasilkan dokumen yang dapat Anda "
         "edarkan secara internal untuk persetujuan: apa yang "
         "dibangun, biayanya, dan kapan selesai. Perubahan setelahnya "
         "disepakati tertulis, bukan diasumsikan."),
        ("Lintas batas sudah menjadi standar kami",
         "Kami sudah beroperasi di Singapura, Indonesia, dan Jepang — "
         "zona waktu, mata uang, konvensi perbankan, dan kalender "
         "regulasi yang berbeda dalam satu sistem adalah kasus normal "
         "kami, bukan permintaan khusus."),
        ("Dukungan tidak berhenti setelah peluncuran",
         "Serah terima mencakup dokumentasi dan masa dukungan "
         "pasca-peluncuran. Sistem dibangun agar dapat diserahkan ke "
         "tim Anda sendiri atau tetap dikelola oleh kami — pilihan "
         "Anda, disepakati di awal."),
    ],

    # 5 — selected work (case studies, Japan first)
    "work_kicker": "Karya terpilih",
    "work_head": "Sistem yang berjalan di produksi.",
    "work_lead": (
        "Nama klien dirahasiakan sesuai perjanjian kerahasiaan; "
        "setiap angka dapat dijelaskan lebih lanjut melalui panggilan."
    ),
    "work": [
        ("Eksportir yang beroperasi lewat spreadsheet dan chat",
         "Perdagangan lintas batas &middot; Jepang",
         "Persediaan di spreadsheet, pembayaran direkonsiliasi "
         "manual. Vendor sebelumnya membangun CRM yang tidak "
         "terpakai. Kami membangun ulang: persediaan, CRM sesuai "
         "peran, dokumen faktur, impor rekening koran.",
         "2 bug berisiko finansial ditemukan sebelum rilis &middot; "
         "berjalan &middot; dwibahasa JP / EN"),
        ("Ko-pilot AI yang menjawab dari dokumen perusahaan sendiri",
         "Implementasi AI &middot; Singapura",
         "Chatbot generik tidak berguna bagi pekerja pengetahuan UKM "
         "— ia tidak tahu apa-apa tentang peran atau sektor mereka. "
         "Kami membangun ko-pilot dengan pencarian atas dokumen milik "
         "klien sendiri.",
         "API produksi aktif, klien berbayar &middot; perutean "
         "multi-LLM"),
        ("Mesin penggajian yang dapat diaudit akuntan",
         "Sistem keuangan &middot; Singapura &amp; Indonesia",
         "Kepatuhan penggajian Singapura sangat ketat — pembulatan "
         "tiga tahap CPF, kelompok usia, batas SDL. Sistem kami "
         "diverifikasi terhadap tabel resmi CPF Board.",
         "7.060 uji otomatis, 484 kelas kalkulator"),
        ("Rekam medis yang dimiliki pasien, bukan rumah sakit",
         "Kesehatan &middot; Indonesia &amp; Asia Tenggara",
         "Pasien yang berpindah antara penyedia layanan Indonesia dan "
         "Singapura menyimpan riwayat mereka dalam map kertas. Sistem "
         "penyedia tidak saling terhubung. Kami membangun platform "
         "trilingual berbasis kepemilikan pasien.",
         "3 bahasa, satu basis kode &middot; residensi data sejak "
         "tahap desain"),
    ],

    # 6 — what we build
    "stack_kicker": "Yang kami bangun",
    "stack_head": "Perangkat lunak kustom di empat bidang praktik.",
    "stack_groups": [
        ("Sistem bisnis",
         "Platform operasional, CRM, persediaan, pembuatan dokumen, "
         "dan alur kerja — menggantikan spreadsheet dan aplikasi "
         "terpisah dengan satu sistem yang benar-benar dipakai tim "
         "Anda."),
        ("Implementasi AI",
         "Pencarian atas dokumen Anda sendiri, model yang disesuaikan "
         "dengan domain, dan pipeline otomatisasi, dengan guardrail "
         "dan atribusi sumber agar hasilnya dapat diperiksa."),
        ("Sistem keuangan &amp; kepatuhan",
         "Mesin akuntansi, rekonsiliasi, kepatuhan penggajian, dan "
         "pelaporan regulasi untuk bisnis yang bertanggung jawab "
         "kepada regulator atau auditor."),
        ("Operasi lintas batas",
         "Sistem multi-mata uang, multi-yurisdiksi untuk perusahaan "
         "yang beroperasi di Singapura, Indonesia, dan Jepang — satu "
         "sistem, bukan tiga."),
    ],

    # 7 — process
    "proc_kicker": "Cara kami bekerja",
    "proc_head": (
        "Dari penggalian kebutuhan hingga produksi, dengan jadwal "
        "yang dapat Anda rencanakan."
    ),
    "process": [
        ("Minggu 1&ndash;2", "Penggalian kebutuhan",
         "Bertemu langsung dengan pelaksana pekerjaan &middot; ruang "
         "lingkup tertulis dan kisaran biaya"),
        ("Minggu 3&ndash;4", "Arsitektur",
         "Desain teknis &middot; harga pasti dan tanggal serah "
         "terima disepakati tertulis"),
        ("Minggu 5&ndash;8", "Pembangunan",
         "Sistem berjalan dengan data nyata &middot; laporan "
         "mingguan, bukan hanya pengungkapan di akhir"),
        ("Minggu 9&ndash;11", "Penerapan",
         "Pengujian, serah terima staf &middot; diterapkan pada "
         "infrastruktur milik Anda"),
        ("Minggu 12+", "Dukungan",
         "Masa dukungan yang disepakati &middot; dokumentasi agar "
         "insinyur mana pun dapat melanjutkan"),
    ],
    "proc_note": (
        "Jadwal menyesuaikan cakupan pekerjaan — ini adalah gambaran "
        "proyek berskala menengah, bukan janji tetap. Jadwal "
        "sebenarnya Anda terima tertulis setelah penggalian kebutuhan."
    ),

    # 8 — contact
    "cta_kicker": "Kontak",
    "cta_head": "Mari bicarakan apa yang sedang Anda bangun.",
    "cta_body": (
        "Panggilan pertama gratis, tanpa perlu dokumen brief — "
        "ceritakan proses yang paling menyita waktu Anda. Jika "
        "perangkat lunak bukan jawabannya, kami akan katakan itu "
        "juga."
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
    "pos_head": "작지만 확실하게 납품하는 팀입니다.",
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
        ("4", "실제 운영 중인 프로덕션 시스템 수"),
        ("7,060", "최대 규모 시스템의 자동 테스트 건수"),
        ("2", "직접 대응하는 시장 — 싱가포르, 일본"),
        ("20+", "사업 및 엔지니어링 합산 경력 년수"),
    ],

    # 3 — evidence (rescue / quality discipline)
    "ev_kicker": "일하는 방식",
    "ev_head": "이전에 잘 되지 않은 프로젝트를 바로잡는 의뢰가 많습니다.",
    "ev_lead": (
        "현재 운영 중인 4개 시스템 중 3개는 이전 업체나 기성 "
        "툴이 제대로 작동하지 않았던 경험에서 시작되었습니다. "
        "이 경험이 저희의 개발 방식을 형성했습니다."
    ),
    "ev_cards": [
        ("먼저 청취", "1주차",
         "코드를 쓰기 전에 실제 업무 담당자를 직접 만납니다. "
         "결과물은 계약 여부와 관계없이 귀사에 귀속됩니다."),
        ("사전 범위와 견적 확정", "개발 전",
         "첫 통화에서 개략가를 제시하고, 청취 후 확정 "
         "견적을 서면으로 합의합니다."),
        ("데모가 아닌 테스트로 검증", "개발 중",
         "실제 업무 규칙을 기준으로 자동 테스트를 작성합니다. "
         "최대 규모 시스템은 7,060건을 실행합니다."),
        ("귀사가 인프라를 소유", "납품 시",
         "귀사의 클라우드, 데이터베이스, 저장소에 구축합니다. "
         "문서화되고 테스트된 시스템이라 다른 엔지니어도 "
         "인수인계이 가능합니다."),
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
        ("단일 책임 창구",
         "대표가 직접 범위를 정하고, 개발하고, 납품합니다. "
         "영업 담당자 없이 실제 작업자와 직접 소통합니다."),
        ("코드 작성 전 서면화",
         "청취 후 납품물, 비용, 일정을 명시한 문서를 작성해 "
         "내부 결재에 활용하실 수 있습니다. 변경은 반드시 "
         "서면으로 합의합니다."),
        ("국경 간 운영은 일상 업무",
         "싱가포르, 인도네시아, 일본을 오가는 운영을 이미 "
         "일상적으로 처리하고 있으며, 서로 다른 시간대와 "
         "통화, 은행 관례, 규제 일정을 하나의 시스템으로 "
         "처리합니다."),
        ("론칭 이후도 지원을 지속",
         "납품 시 문서와 합의된 지원 기간을 제공합니다. "
         "유지보수를 귀사 팀이 맡을지, 저희가 계속 맡을지 "
         "사전에 정합니다."),
    ],

    # 5 — selected work (case studies, Japan first)
    "work_kicker": "주요 실적",
    "work_head": "실제 운영 중인 시스템들.",
    "work_lead": (
        "비밀유지 계약에 따라 고객명은 밝히지 않습니다. "
        "모든 수치는 통화로 설명드릴 수 있습니다."
    ),
    "work": [
        ("엑셀과 채팅으로 운영하던 수출 기업",
         "국경 간 거래 &middot; 일본",
         "재고는 엑셀로 관리하고, 입금 대사는 수작업이었습니다. "
         "이전 해외 업체가 납품한 CRM은 현장에서 쓸 수 없었습니다. "
         "재고 관리, 권한별 CRM, 송장 문서 자동 생성, 은행 명세서 "
         "가져오기를 재구축했습니다.",
         "출시 전 발견한 손실 관련 버그 2건 &middot; 운영 중 "
         "&middot; 한일 이중언어 지원"),
        ("자체 문서에서 답하는 AI 코파일럿",
         "AI 구현 &middot; 싱가포르",
         "범용 챗봇은 중소기업 지식 근로자에게 무용합니다. "
         "고객의 자체 문서를 검색하는 코파일럿을 구축했습니다.",
         "유료 고객의 운영 API &middot; 다중 LLM 라우팅 지원"),
        ("회계사가 한 줄씩 감사할 수 있는 급여 엔진",
         "금융 시스템 &middot; 싱가포르 &amp; 인도네시아",
         "싱가포르 급여 규정은 까다롭습니다 — CPF 단계별 반올림, "
         "연령대, SDL 상하한선. CPF 위원회 공식 표와 일치할 "
         "때까지 검증합니다.",
         "자동 테스트 7,060건, 계산 클래스 484개"),
        ("병원이 아닌 환자가 소유하는 건강 기록",
         "헬스케어 &middot; 인도네시아 &amp; 동남아시아",
         "인도네시아와 싱가포르 의료기관을 오가는 환자는 "
         "종이 파일로 병력을 가지고 다닙니다. 제공자 시스템은 "
         "서로 연결되지 않습니다. 환자 중심의 3개 국어 플랫폼을 "
         "구축했습니다.",
         "3개 국어, 단일 코드베이스 &middot; 설계 단계부터 "
         "데이터 지역성"),
    ],

    # 6 — what we build
    "stack_kicker": "제공 분야",
    "stack_head": "4개 분야의 맞춤형 개발.",
    "stack_groups": [
        ("업무 시스템",
         "운영 플랫폼, CRM, 재고, 문서 자동 생성, 워크플로우. "
         "엑셀과 분산된 툴을 현장이 실제로 쓰는 하나의 "
         "시스템으로 대체합니다."),
        ("AI 구현",
         "귀사의 문서를 검색하는 RAG, 도메인에 맞게 조정된 "
         "모델, 자동화 파이프라인. 결과를 검증할 수 있도록 "
         "가드레일과 출처 표시를 제공합니다."),
        ("금융 &amp; 컴플라이언스 시스템",
         "회계 엔진, 대사 자동화, 급여 컴플라이언스, 규제 "
         "보고. 감사인이나 규제기관에 대응해야 하는 기업"
         "을 위한 시스템입니다."),
        ("국경 간 운영",
         "싱가포르, 인도네시아, 일본을 오가는 다통화, "
         "다국적 시스템입니다. 세 개가 아니라 하나의 "
         "시스템으로요."),
    ],

    # 7 — process
    "proc_kicker": "진행 방식",
    "proc_head": "청취부터 운영까지, 계획 가능한 일정으로.",
    "process": [
        ("1&ndash;2주차", "청취",
         "실무 담당자 청취 &middot; 서면 범위와 개략가 제시"),
        ("3&ndash;4주차", "설계",
         "기술 설계 &middot; 확정 가격과 일정을 서면으로 합의"),
        ("5&ndash;8주차", "구현",
         "실제 데이터로 동작 확인 &middot; 매주 보고, 마지막에만 "
         "공개하지 않음"),
        ("9&ndash;11주차", "도입",
         "테스트와 인수인계 &middot; 귀사 소유 인프라에 배포"),
        ("12주차 이후", "지원",
         "합의된 지원 기간 &middot; 다른 엔지니어도 이어받을 수 "
         "있는 문서"),
    ],
    "proc_note": (
        "일정은 규모에 따라 달라집니다. 위 내용은 중규모 "
        "프로젝트의 대략적인 모습이며, 확정된 일정은 청취 "
        "후 서면으로 제공합니다."
    ),

    # 8 — contact
    "cta_kicker": "문의",
    "cta_head": "먼저 상담해 보세요.",
    "cta_body": (
        "첫 상담은 무료이며 기획서는 필요 없습니다. 가장 "
        "시간을 많이 잡아먹는 업무를 말씀해 주세요. 소프트"
        "웨어가 해결책이 아니라면 그 점도 솔직하게 말씀드립"
        "니다."
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
    "pos_head": "团队规模不大，但确实交付。",
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
        ("4", "已交付且正在运行的生产系统"),
        ("7,060", "最大规模系统的自动化测试数"),
        ("2", "直接服务的市场——新加坡、日本"),
        ("20+", "业务与工程合计经验年限"),
    ],

    # 3 — evidence (rescue / quality discipline)
    "ev_kicker": "我们的工作方式",
    "ev_head": "我们常被聘来修复上一次没做成的项目。",
    "ev_lead": (
        "我们目前运行的 4 个生产系统中，有 3 个"
        "源于之前的供应商或现成工具无法胜任。"
        "这段经历塑造了我们的开发方法。"
    ),
    "ev_cards": [
        ("先做调研", "第 1 周",
         "写代码前，先与实际业务人员直接沟通。"
         "无论是否继续合作，成果均归您所有。"),
        ("范围固定，报价清晰", "开发前",
         "首次通话给出估算区间，调研后确定"
         "书面报价，开工前完成确认。"),
        ("用测试验证，非演示", "每个项目",
         "针对真实业务规则编写自动化测试。"
         "我们最大的系统包含 7,060 项测试。"),
        ("交付物归您所有", "交付时",
         "部署在您自己的云账户、数据库和"
         "代码仓库上。任何工程师都能接手。"),
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
        ("单一负责窗口",
         "总经理亲自确定范围、构建并交付系统。"
         "不经销售中间人，您直接与实际干活的人"
         "沟通。"),
        ("写代码前先书面确认",
         "调研后产出一份可内部审批的文档："
         "建什么、花多少钱、什么时候完成。"
         "后续变更均以书面确认。"),
        ("跨境运营是我们的常态",
         "我们已在新加坡、印尼、日本开展业务，"
         "不同时区、货币、银行惯例与监管日历"
         "在一套系统中处理，不是特殊要求。"),
        ("上线后支持不断",
         "交付时提供文档和一段支持期。后续维护"
         "由您自己团队还是我们，事先确认。"),
    ],

    # 5 — selected work (case studies, Japan first)
    "work_kicker": "代表案例",
    "work_head": "正在生产环境中运行的系统。",
    "work_lead": (
        "客户名称因保密协议保密；每个数字均可"
        "在通话中详细说明。"
    ),
    "work": [
        ("以表格和聊天工具运营的出口企业",
         "跨境贸易 &middot; 日本",
         "库存用表格记录，收款人工对账。早期的"
         "境外供应商交付的 CRM 团队无法使用。我们"
         "重建了库存、按角色权限划分的 CRM、发票"
         "与运输文件、银行对账单导入。",
         "上线前发现的金额相关缺陷 2 个 &middot; "
         "运行中 &middot; 中日双语支持"),
        ("从企业自身文档中回答的 AI 副驾驶",
         "AI 实施 &middot; 新加坡",
         "通用机器人对中小企业知识工作者比较无"
         "用。我们构建了可检索客户自身文档的"
         "副驾驶。",
         "付费客户的生产 API &middot; 多模型路由"),
        ("会计可逐行审计的薪资引擎",
         "金融系统 &middot; 新加坡 &amp; 印尼",
         "新加坡薪资合规非常严格——CPF 三步舍入"
         "、年龄档、SDL 上限。我们的系统逐项验证"
         "至与 CPF 局官方表格完全一致。",
         "7,060 项自动化测试，484 个计算类"),
        ("病人自主拥有的健康档案，而非医院",
         "医疗健康 &middot; 印尼 &amp; 东南亚",
         "在印尼和新加坡两地就诊的病人，病历仍"
         "以纸质文件形式存在。我们构建了以病人"
         "为中心的三语平台。",
         "3 种语言，单一代码库 &middot; 设计阶段即确定"
         "数据驻留地"),
    ],

    # 6 — what we build
    "stack_kicker": "我们的业务领域",
    "stack_head": "四大领域的定制开发。",
    "stack_groups": [
        ("业务系统",
         "运营平台、CRM、库存、单据自动生成、"
         "工作流——把表格和分散工具换成团队"
         "真正会用的一套系统。"),
        ("AI 实施",
         "检索您自己的文档、针对领域调整的模型"
         "、自动化流水线，并提供护栏与来源标注"
         "以便验证结果。"),
        ("金融与合规系统",
         "会计引擎、对账自动化、薪资合规、监管"
         "报告——面向需向审计师或监管机构负"
         "责的企业。"),
        ("跨境运营",
         "面向在新加坡、印尼、日本开展业务的"
         "企业，提供多货币、多管辖系统——一"
         "套系统，而非三套。"),
    ],

    # 7 — process
    "proc_kicker": "我们的工作方式",
    "proc_head": "从调研到上线，时间表可提前规划。",
    "process": [
        ("第 1&ndash;2 周", "调研",
         "直接与业务人员沟通 &middot; 提供书面范围"
         "与估算区间"),
        ("第 3&ndash;4 周", "架构设计",
         "技术设计 &middot; 书面确认固定报价与交付"
         "日期"),
        ("第 5&ndash;8 周", "开发",
         "在真实数据上验证 &middot; 每周汇报，非最终"
         "一次性揭晓"),
        ("第 9&ndash;11 周", "部署",
         "测试与交接 &middot; 部署在您自己的基础设施"
         "上"),
        ("第 12 周起", "支持",
         "已约定的支持期 &middot; 便于其他工程师接手"
         "的文档"),
    ],
    "proc_note": (
        "时间表随项目规模而变化，上述仅为中型"
        "项目的大致轮廓；确切时间表将在调研后"
        "以书面形式提供。"
    ),

    # 8 — contact
    "cta_kicker": "联系我们",
    "cta_head": "欢迎先聊聊您的需求。",
    "cta_body": (
        "首次通话免费，无需需求文档——告诉我"
        "们最耗时的那个流程即可。如果软件不是"
        "答案，我们也会直言告知。"
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
    "pos_head": "團隊規模不大，但確實交付。",
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
        ("4", "已交付且正在執行的生產系統"),
        ("7,060", "最大規模系統的自動化測試數"),
        ("2", "直接服務的市場——新加坡、日本"),
        ("20+", "業務與工程合計經驗年限"),
    ],

    # 3 — evidence (rescue / quality discipline)
    "ev_kicker": "我們的工作方式",
    "ev_head": "我們常被聘來修復上一次沒做成的專案。",
    "ev_lead": (
        "我們目前執行的 4 個生產系統中，有 3 個"
        "源於之前的供應商或現成工具無法勝任。"
        "這段經歷塑造了我們的開發方法。"
    ),
    "ev_cards": [
        ("先做調研", "第 1 周",
         "寫程式碼前，先與實際業務人員直接溝通。"
         "無論是否繼續合作，成果均歸您所有。"),
        ("範圍固定，報價清晰", "開發前",
         "首次通話給出估算區間，調研後確定"
         "書面報價，開工前完成確認。"),
        ("用測試驗證，非演示", "每個專案",
         "針對真實業務規則編寫自動化測試。"
         "我們最大的系統包含 7,060 項測試。"),
        ("交付物歸您所有", "交付時",
         "部署在您自己的雲帳戶、資料庫和"
         "程式碼倉庫上。任何工程師都能接手。"),
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
        ("單一負責視窗",
         "總經理親自確定範圍、打造並交付系統。"
         "不經銷售中間人，您直接與實際幹活的人"
         "溝通。"),
        ("寫程式碼前先書面確認",
         "調研後產出一份可內部審批的文件："
         "建什麼、花多少錢、什麼時候完成。"
         "後續變更均以書面確認。"),
        ("跨境運營是我們的常態",
         "我們已在新加坡、印尼、日本開展業務，"
         "不同時區、貨幣、銀行慣例與監管日曆"
         "在一套系統中處理，不是特殊要求。"),
        ("上線後支援不斷",
         "交付時提供文件和一段支援期。後續維護"
         "由您自己團隊還是我們，事先確認。"),
    ],

    # 5 — selected work (case studies, Japan first)
    "work_kicker": "代表案例",
    "work_head": "正在生產環境中執行的系統。",
    "work_lead": (
        "客戶名稱因保密協議保密；每個數字均可"
        "在通話中詳細說明。"
    ),
    "work": [
        ("以表格和聊天工具運營的出口企業",
         "跨境貿易 &middot; 日本",
         "庫存用表格記錄，收款人工對帳。早期的"
         "境外供應商交付的 CRM 團隊無法使用。我們"
         "重建了庫存、按角色權限劃分的 CRM、發票"
         "與運輸文件、銀行對帳單匯入。",
         "上線前發現的金額相關缺陷 2 個 &middot; "
         "執行中 &middot; 中日雙語支援"),
        ("從企業自身文件中回答的 AI 副駕駛",
         "AI 實施 &middot; 新加坡",
         "通用機器人對中小企業知識工作者比較無"
         "用。我們打造了可檢索客戶自身文件的"
         "副駕駛。",
         "付費客戶的生產 API &middot; 多模型路由"),
        ("會計可逐行審計的薪資引擎",
         "金融系統 &middot; 新加坡 &amp; 印尼",
         "新加坡薪資合規非常嚴格——CPF 三步舍入"
         "、年齡段、SDL 上限。我們的系統逐項驗證"
         "至與 CPF 局官方表格完全一致。",
         "7,060 項自動化測試，484 個計算類"),
        ("病人自主擁有的健康文件，而非醫院",
         "醫療健康 &middot; 印尼 &amp; 東南亞",
         "在印尼和新加坡兩地就診的病人，病歷仍"
         "以紙質文件形式存在。我們打造了以病人"
         "為中心的三語平臺。",
         "3 種語言，單一程式碼庫 &middot; 設計階段即確定"
         "資料駐留地"),
    ],

    # 6 — what we build
    "stack_kicker": "我們的業務領域",
    "stack_head": "四大領域的定製開發。",
    "stack_groups": [
        ("業務系統",
         "運營平臺、CRM、庫存、單據自動生成、"
         "工作流——把表格和分散工具換成團隊"
         "真正會用的一套系統。"),
        ("AI 實施",
         "檢索您自己的文件、針對領域調整的模型"
         "、自動化流水線，並提供護欄與來源標註"
         "以便驗證結果。"),
        ("金融與合規系統",
         "會計引擎、對帳自動化、薪資合規、監管"
         "報告——面向需向審計師或監管機構負"
         "責的企業。"),
        ("跨境運營",
         "面向在新加坡、印尼、日本開展業務的"
         "企業，提供多貨幣、多管轄系統——一"
         "套系統，而非三套。"),
    ],

    # 7 — process
    "proc_kicker": "我們的工作方式",
    "proc_head": "從調研到上線，時間表可提前規劃。",
    "process": [
        ("第 1&ndash;2 周", "調研",
         "直接與業務人員溝通 &middot; 提供書面範圍"
         "與估算區間"),
        ("第 3&ndash;4 周", "架構設計",
         "技術設計 &middot; 書面確認固定報價與交付"
         "日期"),
        ("第 5&ndash;8 周", "開發",
         "在真實資料上驗證 &middot; 每週彙報，非最終"
         "一次性揭曉"),
        ("第 9&ndash;11 周", "部署",
         "測試與交接 &middot; 部署在您自己的基礎設施"
         "上"),
        ("第 12 周起", "支援",
         "已約定的支援期 &middot; 便於其他工程師接手"
         "的文件"),
    ],
    "proc_note": (
        "時間表隨專案規模而變化，上述僅為中型"
        "專案的大致輪廓；確切時間表將在調研後"
        "以書面形式提供。"
    ),

    # 8 — contact
    "cta_kicker": "聯絡我們",
    "cta_head": "歡迎先聊聊您的需求。",
    "cta_body": (
        "首次通話免費，無需需求文件——告訴我"
        "們最耗時的那個流程即可。如果軟體不是"
        "答案，我們也會直言告知。"
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
    "pos_head": "Un equipo pequeño que entrega de verdad.",
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
        ("4", "Sistemas en producción entregados y activos"),
        ("7.060", "Pruebas automatizadas en nuestro mayor proyecto"),
        ("2", "Mercados atendidos directamente — Singapur, Japón"),
        ("20+", "Años de experiencia combinada en negocio e ingeniería"),
    ],

    # 3 — evidence (rescue / quality discipline)
    "ev_kicker": "Cómo trabajamos",
    "ev_head": "Nos suelen contratar para arreglar lo que no funcionó antes.",
    "ev_lead": (
        "Tres de nuestros cuatro sistemas en producción nacieron "
        "porque un proveedor anterior, o una herramienta genérica, no "
        "dio la talla. Esa experiencia marca cómo construimos."
    ),
    "ev_cards": [
        ("Primero, descubrimiento", "Semana 1",
         "Nos sentamos con quien hace el trabajo antes de escribir "
         "código. El resultado es suyo, decida lo que decida después."),
        ("Alcance fijo, coste claro", "Antes de construir",
         "Un rango de precio en la primera llamada, una cifra firme "
         "tras el descubrimiento — acordado por escrito antes de "
         "empezar."),
        ("Probado, no demostrado", "En cada proyecto",
         "Pruebas automatizadas sobre las reglas de negocio reales, "
         "no solo el camino feliz. Nuestro sistema más grande tiene "
         "7.060."),
        ("Usted es dueño del resultado", "En la entrega",
         "Desplegado en su propia cuenta de nube, base de datos y "
         "repositorio. Cualquier ingeniero puede continuarlo."),
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
        ("Un único punto de contacto responsable",
         "El Director General define el alcance, construye y entrega "
         "su sistema personalmente. Sin gestor de cuenta de por "
         "medio — habla directamente con quien hace el trabajo."),
        ("Alcance por escrito antes del código",
         "El descubrimiento produce un documento que puede circular "
         "internamente para su aprobación: qué se construye, cuánto "
         "cuesta y cuándo. Los cambios posteriores se acuerdan por "
         "escrito, nunca se asumen."),
        ("Lo transfronterizo es nuestro caso normal",
         "Ya operamos en Singapur, Indonesia y Japón — distintas "
         "zonas horarias, monedas, convenciones bancarias y "
         "calendarios regulatorios en un solo sistema es lo habitual "
         "para nosotros, no una petición especial."),
        ("El soporte no termina en el lanzamiento",
         "La entrega incluye documentación y un periodo de soporte "
         "posterior. El sistema está pensado para pasar a su equipo "
         "o quedarse con el nuestro — usted decide, y se acuerda "
         "de antemano."),
    ],

    # 5 — selected work (case studies, Japan first)
    "work_kicker": "Proyectos seleccionados",
    "work_head": "Sistemas funcionando en producción.",
    "work_lead": (
        "Los nombres de los clientes se omiten por confidencialidad; "
        "cada cifra se puede explicar en detalle en una llamada."
    ),
    "work": [
        ("Un exportador que operaba con hojas de cálculo y chat",
         "Comercio transfronterizo &middot; Japón",
         "Inventario en una hoja de cálculo, pagos conciliados a "
         "mano. Un proveedor anterior entregó un CRM inservible. Lo "
         "reconstruimos: inventario, CRM por rol, facturas y envío, "
         "importación de extractos bancarios.",
         "2 fallos con impacto económico detectados antes de "
         "publicar &middot; en producción &middot; bilingüe JP / EN"),
        ("Un copiloto de IA que responde desde los documentos de "
         "la empresa",
         "Implementación de IA &middot; Singapur",
         "Un chatbot genérico no sirve a un trabajador del "
         "conocimiento de una pyme — no sabe nada de su rol ni "
         "sector. Construimos un copiloto con búsqueda sobre los "
         "documentos propios del cliente.",
         "API en producción, cliente de pago &middot; enrutamiento "
         "multi-LLM"),
        ("Un motor de nóminas auditable línea a línea",
         "Sistemas financieros &middot; Singapur &amp; Indonesia",
         "El cumplimiento de nóminas en Singapur es exigente — "
         "redondeo en tres pasos del CPF, franjas de edad, límites "
         "del SDL. Verificado contra las tablas oficiales del CPF "
         "Board escenario por escenario.",
         "7.060 pruebas automatizadas, 484 clases de cálculo"),
        ("Un historial médico que posee el paciente, no el hospital",
         "Sanidad &middot; Indonesia &amp; Sudeste Asiático",
         "Los pacientes que se mueven entre proveedores indonesios y "
         "singapurenses llevan su historial en papel. Los sistemas "
         "no se comunican entre sí. Construimos una plataforma "
         "trilingüe centrada en el paciente.",
         "3 idiomas, una sola base de código &middot; residencia de "
         "datos decidida desde el diseño"),
    ],

    # 6 — what we build
    "stack_kicker": "Qué construimos",
    "stack_head": "Software a medida en cuatro áreas.",
    "stack_groups": [
        ("Sistemas de negocio",
         "Plataformas operativas, CRM, inventario, generación de "
         "documentos y flujos de trabajo — sustituyendo hojas de "
         "cálculo y herramientas dispersas por un sistema que su "
         "equipo realmente usará."),
        ("Implementación de IA",
         "Búsqueda sobre sus propios documentos, modelos ajustados "
         "al dominio y pipelines de automatización, con salvaguardas "
         "y atribución de fuentes para que el resultado se pueda "
         "verificar."),
        ("Sistemas financieros y de cumplimiento",
         "Motores contables, conciliación, cumplimiento de nóminas "
         "e informes regulatorios para empresas que responden ante "
         "un regulador o un auditor."),
        ("Operaciones transfronterizas",
         "Sistemas multidivisa y multijurisdicción para empresas que "
         "operan en Singapur, Indonesia y Japón — un solo sistema, "
         "no tres."),
    ],

    # 7 — process
    "proc_kicker": "Cómo trabajamos",
    "proc_head": "Del descubrimiento a producción, con un calendario planificable.",
    "process": [
        ("Semana 1&ndash;2", "Descubrimiento",
         "Reunión con quien hace el trabajo &middot; alcance por "
         "escrito y rango de coste"),
        ("Semana 3&ndash;4", "Arquitectura",
         "Diseño técnico &middot; precio firme y fecha de entrega "
         "acordados por escrito"),
        ("Semana 5&ndash;8", "Construcción",
         "Sistema funcionando con datos reales &middot; seguimiento "
         "semanal, no una revelación al final"),
        ("Semana 9&ndash;11", "Despliegue",
         "Pruebas y traspaso &middot; desplegado en su propia "
         "infraestructura"),
        ("Semana 12+", "Soporte",
         "Periodo de soporte acordado &middot; documentación para "
         "que cualquier ingeniero pueda continuar"),
    ],
    "proc_note": (
        "El calendario varía según el alcance — esto es la forma de "
        "un proyecto mediano, no una promesa fija. El calendario "
        "real lo recibe por escrito tras el descubrimiento."
    ),

    # 8 — contact
    "cta_kicker": "Contacto",
    "cta_head": "Hablemos de lo que está construyendo.",
    "cta_body": (
        "Primera llamada gratuita, sin necesidad de un documento de "
        "brief — cuéntenos el proceso que más tiempo le cuesta. Si "
        "el software no es la respuesta, se lo diremos también."
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
    "pos_head": "Uma equipe pequena que entrega de verdade.",
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
        ("4", "Sistemas em produção entregues e ativos"),
        ("7.060", "Testes automatizados no nosso maior projeto"),
        ("2", "Mercados atendidos diretamente — Singapura, Japão"),
        ("20+", "Anos de experiência combinada em negócios e engenharia"),
    ],

    # 3 — evidence (rescue / quality discipline)
    "ev_kicker": "Como trabalhamos",
    "ev_head": "Somos contratados com frequência para consertar o que não deu certo antes.",
    "ev_lead": (
        "Três dos nossos quatro sistemas em produção começaram "
        "porque um fornecedor anterior, ou uma ferramenta pronta, "
        "não se sustentou. Essa experiência molda como construímos."
    ),
    "ev_cards": [
        ("Descoberta primeiro", "Semana 1",
         "Sentamos com quem faz o trabalho antes de escrever código. "
         "O resultado é seu, independente da decisão seguinte."),
        ("Escopo fixo, custo claro", "Antes de construir",
         "Uma faixa de preço na primeira ligação, um número firme "
         "após a descoberta — acordado por escrito antes de começar."),
        ("Testado, não demonstrado", "Em cada projeto",
         "Testes automatizados sobre as regras de negócio reais, não "
         "só o caminho feliz. Nosso maior sistema tem 7.060."),
        ("Você é dono do resultado", "Na entrega",
         "Implantado na sua própria conta de nuvem, banco de dados "
         "e repositório. Qualquer engenheiro pode continuar."),
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
        ("Um único ponto de contato responsável",
         "O Diretor-Geral define o escopo, constrói e entrega o seu "
         "sistema pessoalmente. Sem gerente de contas no meio — você "
         "fala direto com quem faz o trabalho."),
        ("Escopo por escrito antes do código",
         "A descoberta gera um documento que pode circular "
         "internamente para aprovação: o que será construído, o "
         "custo e o prazo. Mudanças depois disso são acordadas por "
         "escrito, nunca presumidas."),
        ("Operação transfronteiriça já é padrão",
         "Já operamos em Singapura, Indonésia e Japão — fusos "
         "horários, moedas, convenções bancárias e calendários "
         "regulatórios diferentes em um único sistema é o nosso caso "
         "normal, não um pedido especial."),
        ("O suporte não termina no lançamento",
         "A entrega inclui documentação e um período de suporte "
         "pós-lançamento. O sistema é construído para ser repassado "
         "à sua equipe ou permanecer com a nossa — você escolhe, "
         "combinado desde o início."),
    ],

    # 5 — selected work (case studies, Japan first)
    "work_kicker": "Projetos selecionados",
    "work_head": "Sistemas em produção.",
    "work_lead": (
        "Nomes de clientes omitidos por confidencialidade; cada "
        "número pode ser detalhado em uma ligação."
    ),
    "work": [
        ("Um exportador que operava com planilhas e chat",
         "Comércio internacional &middot; Japão",
         "Estoque em planilha, pagamentos conciliados manualmente. "
         "Um fornecedor anterior entregou um CRM inutilizável. "
         "Reconstruímos: estoque, CRM por papel, fatura e embarque, "
         "importação de extratos bancários.",
         "2 falhas com impacto financeiro encontradas antes do "
         "lançamento &middot; em produção &middot; bilíngue JP / EN"),
        ("Um copiloto de IA que responde a partir dos documentos "
         "da própria empresa",
         "Implementação de IA &middot; Singapura",
         "Um chatbot genérico não serve para um trabalhador do "
         "conhecimento de PME — ele não sabe nada sobre o papel ou "
         "setor dela. Construímos um copiloto com busca sobre os "
         "documentos do próprio cliente.",
         "API em produção, cliente pagante &middot; roteamento "
         "multi-LLM"),
        ("Um motor de folha auditável linha a linha",
         "Sistemas financeiros &middot; Singapura &amp; Indonésia",
         "A conformidade de folha em Singapura é rigorosa — "
         "arredondamento em três etapas do CPF, faixas etárias, "
         "limites do SDL. Verificado contra as tabelas oficiais do "
         "CPF Board cenário por cenário.",
         "7.060 testes automatizados, 484 classes de cálculo"),
        ("Um prontuário que pertence ao paciente, não ao hospital",
         "Saúde &middot; Indonésia &amp; Sudeste Asiático",
         "Pacientes que circulam entre provedores indonésios e "
         "cingapurianos carregam seu histórico em pastas de papel. "
         "Os sistemas dos provedores não se comunicam. Construímos "
         "uma plataforma trilíngue centrada no paciente.",
         "3 idiomas, uma única base de código &middot; residência de "
         "dados decidida desde o design"),
    ],

    # 6 — what we build
    "stack_kicker": "O que construímos",
    "stack_head": "Software sob medida em quatro áreas.",
    "stack_groups": [
        ("Sistemas de negócio",
         "Plataformas operacionais, CRM, estoque, geração de "
         "documentos e fluxos de trabalho — substituindo planilhas e "
         "ferramentas dispersas por um único sistema que sua equipe "
         "realmente vai usar."),
        ("Implementação de IA",
         "Busca sobre os seus próprios documentos, modelos ajustados "
         "ao domínio e pipelines de automação, com salvaguardas e "
         "atribuição de fonte para que o resultado seja verificável."),
        ("Sistemas financeiros e de conformidade",
         "Motores contábeis, reconciliação, conformidade de folha de "
         "pagamento e relatórios regulatórios para empresas que "
         "respondem a um regulador ou auditor."),
        ("Operações transfronteiriças",
         "Sistemas multimoeda e multijurisdição para empresas que "
         "operam em Singapura, Indonésia e Japão — um único sistema, "
         "não três."),
    ],

    # 7 — process
    "proc_kicker": "Como trabalhamos",
    "proc_head": "Da descoberta à produção, com um cronograma planejável.",
    "process": [
        ("Semana 1&ndash;2", "Descoberta",
         "Reunião com quem faz o trabalho &middot; escopo por "
         "escrito e faixa de custo"),
        ("Semana 3&ndash;4", "Arquitetura",
         "Design técnico &middot; preço firme e data de entrega "
         "combinados por escrito"),
        ("Semana 5&ndash;8", "Construção",
         "Sistema funcionando com dados reais &middot; relatórios "
         "semanais, não uma revelação só no final"),
        ("Semana 9&ndash;11", "Implantação",
         "Testes e repasse &middot; implantado na sua própria "
         "infraestrutura"),
        ("Semana 12+", "Suporte",
         "Período de suporte combinado &middot; documentação para "
         "que qualquer engenheiro possa continuar"),
    ],
    "proc_note": (
        "O cronograma varia com o escopo — isto é a forma de um "
        "projeto de porte médio, não uma promessa fixa. O cronograma "
        "real você recebe por escrito após a descoberta."
    ),

    # 8 — contact
    "cta_kicker": "Contato",
    "cta_head": "Vamos conversar sobre o que você está construindo.",
    "cta_body": (
        "Primeira ligação gratuita, sem necessidade de documento de "
        "briefing — conte o processo que mais consome seu tempo. Se "
        "software não for a resposta, diremos isso também."
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
