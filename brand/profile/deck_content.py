# -*- coding: utf-8 -*-
"""Landscape capability deck content, EN + ID.

Technical-depth framing: written for an engineering audience that will
probe the claims. Every number here is verifiable from the repositories.
Shares COMMON with content.py.
"""
from content import COMMON  # noqa: F401  (re-exported for the renderer)

EN = {
    "lang": "en",
    "doc_label": "Company Profile",

    # 1 — cover
    "cover_kicker": "Company Profile",
    "cover_head_1": "We engineer businesses,",
    "cover_head_2": "not just software.",
    "cover_sub": (
        "Enterprise AI implementation and software engineering for "
        "organisations across Singapore and Southeast Asia."
    ),
    "cover_meta": ["Singapore", "Indonesia", "20+ years"],

    # 2 — positioning
    "pos_kicker": "Who we are",
    "pos_head": "A Singapore software house that ships.",
    "pos_body": (
        "We design and build production systems — enterprise AI, ERP, "
        "financial platforms and healthcare software."
    ),
    "pos_body2": (
        "We are implementers, not advisors. Every engagement ends in "
        "running software. We work natively across Singapore and "
        "Indonesia, in five languages."
    ),
    "pos_stats": [
        ("20", "Bounded contexts in our ERP platform"),
        ("9,839", "Automated tests, all passing"),
        ("300+", "Edge locations for sub-100ms inference"),
        ("5", "Languages delivered natively"),
    ],

    # 3 — engineering evidence  (the core "we are technically competent")
    "ev_kicker": "Engineering evidence",
    "ev_head": "Numbers you can audit, not adjectives.",
    "ev_lead": (
        "Measured by running the system. Every figure is reproducible "
        "from the build."
    ),
    "ev_cards": [
        ("Test suite", "9,839",
         "9,273 unit · 549 integration · 17 architecture. Integration "
         "runs against real PostgreSQL — no mocks."),
        ("Codebase", "1,329",
         "Java files across 102 REST controllers and 461 calculation "
         "classes, in 20 bounded contexts."),
        ("Verification", "5 engines",
         "The same transactions recomputed by Java, PostgreSQL, Python, "
         "hledger and Odoo. Any disagreement fails the build."),
        ("Static analysis", "0 findings",
         "SpotBugs and OWASP scanning on the build gate, plus ArchUnit "
         "tests that fail on a layer breach."),
    ],
    "ev_case_kicker": "What that discipline catches",
    "ev_case": (
        "A signing error had accumulated depreciation <em>increasing</em> "
        "the book value of equipment instead of reducing it. A conformance "
        "test caught it against an accountant's own figure — 337,590 "
        "expected, 342,390 reported. Found by the harness, not a customer."
    ),

    # 4 — architecture
    "arch_kicker": "How we build",
    "arch_head": "Architecture that survives contact with production.",
    "arch_items": [
        ("Domain-driven, modular",
         "Hexagonal architecture with explicit bounded contexts. ArchUnit "
         "tests enforce layer boundaries, so the design cannot erode."),
        ("Multi-tenant by design",
         "Schema-per-tenant isolation, OAuth2 / JWT via Keycloak, and "
         "Hibernate Envers auditing every state change."),
        ("Correctness as a build gate",
         "Pure calculation classes with no I/O, verified against "
         "independent engines and fuzz-tested for reconciliation."),
        ("Edge-native deployment",
         "Cloudflare Workers with D1, R2, KV and Vectorize — sub-100ms "
         "inference across 300+ locations, no cold starts."),
    ],

    # 5 — data & AI platform
    "ai_kicker": "Data & AI",
    "ai_head": "Production AI, not demos.",
    "ai_lead": (
        "Multi-model systems in production — the model is chosen per "
        "task, not locked to one vendor."
    ),
    "ai_items": [
        ("Multi-LLM routing",
         "A routing layer over Claude, GPT and Gemini. Switching the "
         "default model on a live system is configuration, not a rewrite."),
        ("Retrieval over your data",
         "Vector embeddings with hybrid semantic and keyword search, plus "
         "source attribution on every answer."),
        ("Multimodal pipelines",
         "Vision models for documents and screens, Whisper speech-to-text, "
         "voice synthesis in 50+ languages."),
        ("Guardrails and evaluation",
         "Hallucination controls, token-cost optimisation, and versioned "
         "evaluation before anything ships."),
    ],

    # 6 — selected work
    "work_kicker": "Selected work",
    "work_head": "Systems running in production.",
    "work": [
        ("Multi-tenant ERP platform",
         "Enterprise · Singapore &amp; Indonesia",
         "Java 21 / Spring Boot with a Singapore payroll compliance "
         "engine. 20 bounded contexts across finance, HR, inventory, "
         "manufacturing and logistics.",
         "9,839 tests · 102 controllers · 5-engine verification"),
        ("AI performance co-pilot",
         "Professional services · Singapore",
         "A personal AI co-pilot for knowledge workers — four reasoning "
         "modes, peer coordination across departments, layered context.",
         "Multi-LLM · Whisper STT · vision capture · D1 / R2 / Vectorize"),
        ("Patient-owned health platform",
         "Healthcare · Indonesia &amp; SEA",
         "Trilingual platform run from Singapore under Singapore-only "
         "data residency. Lifestyle tracking, insurance onboarding and an "
         "AI advisor are live.",
         "API-first · encrypted at rest · PWA"),
        ("Vehicle trading &amp; logistics OS",
         "Cross-border trade · Japan",
         "Full operational rebuild for a vehicle exporter — inventory, "
         "role-scoped CRM, invoice and shipping document generation, "
         "two-level payment routing.",
         "Live in production · bilingual JP / EN"),
    ],

    # 7 — stack
    "stack_kicker": "Technology",
    "stack_head": "The stack we actually run.",
    "stack_groups": [
        ("Languages",
         "Java 21 · TypeScript · Python · SQL"),
        ("Backend",
         "Spring Boot · Hono · Node.js · PostgreSQL · Redis · Drizzle"),
        ("Cloud &amp; edge",
         "Cloudflare Workers, D1, R2, KV, Vectorize · AWS Bedrock, "
         "SageMaker, Lambda · Neon"),
        ("AI",
         "Anthropic Claude · OpenAI GPT · Gemini · Whisper · ElevenLabs "
         "· HeyGen"),
        ("Frontend",
         "React 19 · TanStack Start / Router / Query · Tailwind"),
        ("Quality &amp; ops",
         "JUnit 5 · Testcontainers · ArchUnit · Playwright · SpotBugs · "
         "OWASP · Flyway · Keycloak"),
    ],

    # 8 — process
    "proc_kicker": "How we work",
    "proc_head": "Strategy to production in 90 days.",
    "process": [
        ("Week 1–2", "Discovery &amp; readiness",
         "Opportunity report &amp; ROI projections"),
        ("Week 3–4", "Solution architecture",
         "Technical architecture &amp; implementation plan"),
        ("Week 5–8", "Proof of concept",
         "Working PoC with core capabilities"),
        ("Week 9–11", "Production deployment",
         "Production system ready for users"),
        ("Week 12+", "Optimisation &amp; support",
         "Performance reports &amp; recommendations"),
    ],
    "proc_note": (
        "Compliance is designed in from week one — Singapore Employment "
        "Act, PDPA, MAS, GST, CPF, IRAS; Indonesia BPJS and OJK."
    ),

    # 9 — contact
    "cta_kicker": "Contact",
    "cta_head": "Startech Innovation Pte Ltd",
    "cta_body": (
        "Singapore-based. Building production software for organisations "
        "across Singapore, Indonesia and Southeast Asia."
    ),
    "labels": {
        "md": "Managing Director", "phone": "Phone / WhatsApp",
        "email": "Email", "web": "Web", "linkedin": "LinkedIn",
        "office": "Registered office", "uen": "UEN",
    },
    "footer_conf": (
        "This document contains commercially confidential information and "
        "is intended solely for the named recipient."
    ),
}

ID = {
    "lang": "id",
    "doc_label": "Profil Perusahaan",

    "cover_kicker": "Profil Perusahaan",
    "cover_head_1": "We engineer businesses,",
    "cover_head_2": "not just software.",
    "cover_sub": (
        "Implementasi AI dan rekayasa perangkat lunak tingkat enterprise "
        "untuk organisasi di Singapura dan Asia Tenggara."
    ),
    "cover_meta": ["Singapura", "Indonesia", "20+ tahun"],

    "pos_kicker": "Profil singkat",
    "pos_head": "Perusahaan perangkat lunak Singapura dengan pengalaman lebih dari 20 tahun.",
    "pos_body": (
        "Kami merancang dan membangun sistem produksi — AI enterprise, "
        "ERP, platform keuangan, dan perangkat lunak kesehatan."
    ),
    "pos_body2": (
        "Kami pelaksana, bukan sekadar pemberi saran. Setiap kerja sama "
        "berakhir dengan sistem yang beroperasi. Kami menguasai pasar "
        "Singapura dan Indonesia, serta melayani dalam lima bahasa."
    ),
    "pos_stats": [
        ("20", "Bounded context dalam platform ERP kami"),
        ("9.839", "Pengujian otomatis, semuanya lulus"),
        ("300+", "Lokasi edge untuk inferensi di bawah 100ms"),
        ("5", "Bahasa yang kami gunakan dalam pelayanan"),
    ],

    "ev_kicker": "Bukti teknis",
    "ev_head": "Angka yang dapat diaudit, bukan klaim.",
    "ev_lead": (
        "Seluruh angka berikut diperoleh dari menjalankan sistemnya, "
        "dan dapat direproduksi dari proses build."
    ),
    "ev_cards": [
        ("Cakupan pengujian", "9.839",
         "9.273 unit · 549 integrasi · 17 arsitektur. Pengujian integrasi "
         "berjalan di atas PostgreSQL nyata — tanpa mock."),
        ("Basis kode", "1.329",
         "Berkas Java mencakup 102 REST controller dan 461 kelas "
         "perhitungan, dalam 20 bounded context."),
        ("Verifikasi", "5 mesin",
         "Transaksi yang sama dihitung ulang oleh Java, PostgreSQL, "
         "Python, hledger, dan Odoo. Setiap selisih menggagalkan build."),
        ("Analisis statis", "0 temuan",
         "SpotBugs dan pemindaian OWASP dijalankan pada setiap build, "
         "ditambah ArchUnit yang gagal bila batas lapisan dilanggar."),
    ],
    "ev_case_kicker": "Yang ditangkap oleh disiplin ini",
    "ev_case": (
        "Kesalahan tanda membuat akumulasi penyusutan justru "
        "<em>menambah</em> nilai buku peralatan, bukan menguranginya. "
        "Pengujian konformansi menangkapnya terhadap angka akuntan — "
        "337.590 seharusnya, 342.390 dilaporkan. Ditemukan oleh harness, "
        "bukan oleh pelanggan."
    ),

    "arch_kicker": "Cara kami membangun",
    "arch_head": "Arsitektur yang tahan di kondisi nyata.",
    "arch_items": [
        ("Modular, berbasis domain",
         "Arsitektur heksagonal dengan bounded context eksplisit. "
         "ArchUnit menegakkan batas lapisan agar desain tidak luruh."),
        ("Multi-tenant sejak desain",
         "Isolasi schema-per-tenant, OAuth2 / JWT melalui Keycloak, dan "
         "Hibernate Envers yang mengaudit setiap perubahan status."),
        ("Ketepatan hitung yang diverifikasi",
         "Kelas perhitungan murni tanpa I/O, diverifikasi terhadap mesin "
         "independen dan diuji fuzz untuk memastikan laporan seimbang."),
        ("Penerapan langsung di edge",
         "Cloudflare Workers dengan D1, R2, KV, dan Vectorize — inferensi "
         "di bawah 100ms dari 300+ lokasi, tanpa cold start."),
    ],

    "ai_kicker": "Data & AI",
    "ai_head": "AI yang teruji di lapangan, bukan demo.",
    "ai_lead": (
        "Sistem multi-model yang berjalan pada penggunaan nyata — model "
        "dipilih sesuai kebutuhan tugas, tanpa terikat pada satu vendor."
    ),
    "ai_items": [
        ("Perutean multi-LLM",
         "Lapisan perutean di atas Claude, GPT, dan Gemini. Mengganti "
         "model default cukup lewat konfigurasi, bukan penulisan ulang."),
        ("Pencarian di atas data Anda",
         "Embedding vektor dengan pencarian hibrida semantik dan kata "
         "kunci, serta atribusi sumber pada setiap jawaban."),
        ("Alur multimodal",
         "Model visi untuk dokumen dan layar, Whisper speech-to-text, "
         "sintesis suara dalam 50+ bahasa."),
        ("Guardrail dan evaluasi",
         "Kendali halusinasi, optimalisasi biaya token, dan evaluasi "
         "berversi sebelum apa pun dirilis."),
    ],

    "work_kicker": "Pekerjaan terpilih",
    "work_head": "Sistem yang sudah digunakan sehari-hari.",
    "work": [
        ("Platform ERP multi-tenant",
         "Enterprise · Singapura &amp; Indonesia",
         "Java 21 / Spring Boot dengan mesin kepatuhan penggajian "
         "Singapura. 20 bounded context mencakup keuangan, SDM, "
         "persediaan, manufaktur, dan logistik.",
         "9.839 pengujian · 102 controller · verifikasi 5 mesin"),
        ("Co-pilot AI untuk kinerja tim",
         "Jasa profesional · Singapura",
         "Co-pilot AI personal untuk pekerja pengetahuan — empat mode "
         "penalaran, koordinasi antar-rekan, konteks berlapis.",
         "Multi-LLM · Whisper STT · tangkapan visi · D1 / R2 / Vectorize"),
        ("Platform kesehatan milik pasien",
         "Kesehatan · Indonesia &amp; Asia Tenggara",
         "Platform trilingual yang dioperasikan dari Singapura dengan "
         "residensi data khusus Singapura. Pelacakan gaya hidup, "
         "pendaftaran asuransi, dan penasihat AI telah beroperasi.",
         "API-first · terenkripsi saat disimpan · PWA"),
        ("Sistem operasi perdagangan kendaraan",
         "Perdagangan lintas negara · Jepang",
         "Pembangunan ulang sistem operasional eksportir kendaraan — "
         "persediaan, CRM berbasis peran, pembuatan dokumen faktur dan "
         "pengiriman, perutean pembayaran dua tingkat.",
         "Beroperasi penuh · dwibahasa JP / EN"),
    ],

    "stack_kicker": "Teknologi",
    "stack_head": "Teknologi yang kami jalankan sehari-hari.",
    "stack_groups": [
        ("Bahasa", "Java 21 · TypeScript · Python · SQL"),
        ("Backend",
         "Spring Boot · Hono · Node.js · PostgreSQL · Redis · Drizzle"),
        ("Cloud &amp; edge",
         "Cloudflare Workers, D1, R2, KV, Vectorize · AWS Bedrock, "
         "SageMaker, Lambda · Neon"),
        ("AI",
         "Anthropic Claude · OpenAI GPT · Gemini · Whisper · ElevenLabs "
         "· HeyGen"),
        ("Frontend",
         "React 19 · TanStack Start / Router / Query · Tailwind"),
        ("Kualitas &amp; ops",
         "JUnit 5 · Testcontainers · ArchUnit · Playwright · SpotBugs · "
         "OWASP · Flyway · Keycloak"),
    ],

    "proc_kicker": "Cara kami bekerja",
    "proc_head": "Dari strategi ke produksi dalam 90 hari.",
    "process": [
        ("Minggu 1–2", "Penemuan &amp; kesiapan",
         "Laporan peluang &amp; proyeksi ROI"),
        ("Minggu 3–4", "Arsitektur solusi",
         "Arsitektur teknis &amp; rencana implementasi"),
        ("Minggu 5–8", "Bukti konsep",
         "PoC berfungsi dengan kapabilitas inti"),
        ("Minggu 9–11", "Penerapan produksi",
         "Sistem produksi siap digunakan"),
        ("Minggu 12+", "Optimalisasi &amp; dukungan",
         "Laporan kinerja &amp; rekomendasi"),
    ],
    "proc_note": (
        "Kepatuhan dirancang sejak minggu pertama — Employment Act, "
        "PDPA, MAS, GST, CPF, IRAS di Singapura; BPJS dan OJK di "
        "Indonesia."
    ),

    "cta_kicker": "Kontak",
    "cta_head": "Startech Innovation Pte Ltd",
    "cta_body": (
        "Berkedudukan di Singapura. Membangun perangkat lunak produksi "
        "bagi organisasi di Singapura, Indonesia, dan Asia Tenggara."
    ),
    "labels": {
        "md": "Managing Director", "phone": "Telepon / WhatsApp",
        "email": "Surel", "web": "Situs", "linkedin": "LinkedIn",
        "office": "Kantor terdaftar", "uen": "UEN",
    },
    "footer_conf": (
        "Dokumen ini memuat informasi rahasia komersial dan ditujukan "
        "hanya untuk penerima yang disebutkan."
    ),
}
