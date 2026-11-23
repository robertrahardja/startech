# -*- coding: utf-8 -*-
"""Technical profile deck content, EN + ID.

Written for the technical lead who will probe the claims. Same positioning
as the capability deck (pitch_content.py); this one goes deeper on how we
build. Rewritten on 2026-11-02.

Engineering figures come from the internal ERP build, which is in
development and not deployed, so every slide that uses them says so.
Source: startech_erp_java/docs/architecture/verification-report-2026-08.md
(9,273 unit + 549 integration + 17 architecture tests, 0 failures; SpotBugs
gate at 0 findings) and calculation-layer-design.md (484 calculation
classes, 7,060 tests, about 12 seconds without a database). That report
also found the "5-engine verification" was really two engines and the
tenancy single-schema, not schema-per-tenant, so neither claim appears.
Re-verify before reuse; the figures grow with the codebase. On 2026-11-08
the ERP card lost its payroll and CPF wording, as the site and capability
deck did: an internal build, tested, not deployed, no accuracy claim. The
115 REST controllers are the site's figure (docs/COMPANY.md).
"""
from content import COMMON  # noqa: F401  (re-exported for the renderer)

EN = {
    "lang": "en",
    "doc_label": "Technical Profile",

    # 1 — cover
    "cover_kicker": "Technical Profile",
    "cover_head_1": "Software built",
    "cover_head_2": "to be checked.",
    "cover_sub": (
        "How StarTech Innovation designs, tests and hands over production "
        "systems — for the technical lead who will review the work. Every "
        "figure can be walked through on a call."
    ),
    "cover_meta": ["Singapore", "Japan", "20+ years"],

    # 2 — positioning
    "pos_kicker": "Who we are",
    "pos_head": "Founder-led, start to finish.",
    "pos_body": (
        "A Singapore-based custom software house, not a product vendor. "
        "We build the system around how the business actually runs, for "
        "companies that have outgrown spreadsheets, off-the-shelf tools, "
        "or a vendor that did not deliver."
    ),
    "pos_body2": (
        "Every engagement is led personally by the Managing Director, "
        "start to finish, with specialists brought in as the work "
        "demands. You review code with the person who wrote it."
    ),
    "pos_stats": [
        ("9,839",
         "Automated tests passing in our internal ERP build, not "
         "deployed (August 2026 run)"),
        ("2",
         "Money-losing bugs caught before release on a live client system"),
        ("12",
         "Weeks from discovery to deployment, for a typical full build"),
        ("20+",
         "Years combined business and engineering experience"),
    ],

    # 3 — engineering evidence
    "ev_kicker": "Engineering evidence",
    "ev_head": "Numbers you can audit, not adjectives.",
    "ev_lead": (
        "From our internal ERP build, in development and not yet "
        "deployed. Measured by running it; the verification report names "
        "the test behind each figure."
    ),
    "ev_cards": [
        ("Test suite", "9,839",
         "9,273 unit · 549 integration · 17 architecture, 0 failures. "
         "Integration tests run against real PostgreSQL in Testcontainers."),
        ("Calculation layer", "7,060",
         "Tests over 484 calculation classes with no I/O. The whole set "
         "runs in about 12 seconds, with no database."),
        ("Architecture", "17",
         "ArchUnit tests that fail the build on a layer breach, so module "
         "boundaries cannot quietly erode."),
        ("Static analysis", "0",
         "SpotBugs findings at threshold. The scan runs in the build, so "
         "a new finding fails it."),
    ],
    "ev_case_kicker": "The same discipline on a live client system",
    "ev_case": (
        "Rebuilding a cross-border trading system, a re-imported bank "
        "statement was silently doubling receipts — the bank issued no "
        "transfer ID to key a duplicate check on. Caught in testing, not "
        "by a customer."
    ),

    # 4 — architecture
    "arch_kicker": "How we build",
    "arch_head": "Architecture that survives contact with production.",
    "arch_items": [
        ("Modular, with enforced boundaries",
         "Explicit module boundaries, checked by ArchUnit tests that fail "
         "the build on a layer breach — so the design cannot quietly "
         "erode."),
        ("Business rules as pure code",
         "Calculations live in classes with no I/O, so each rule is "
         "tested scenario by scenario, in seconds, without a database."),
        ("Real databases in tests",
         "Integration tests run against real PostgreSQL in containers, "
         "not mocks, with schema changes versioned in Flyway."),
        ("Infrastructure you own",
         "Deployed on your cloud account, your database and your "
         "repository, with documentation so any engineer can take it "
         "over."),
    ],

    # 5 — data & AI
    "ai_kicker": "Data & AI",
    "ai_head": "AI that shows its sources.",
    "ai_lead": (
        "The model is chosen per task, not locked to one vendor — and "
        "every answer can be checked against where it came from."
    ),
    "ai_items": [
        ("Multi-LLM routing",
         "A routing layer over Claude, GPT and Gemini, delivered on a "
         "client co-pilot. Changing the default model is configuration, "
         "not a rewrite."),
        ("Answers from your documents",
         "Retrieval over the client's own documents, with the source "
         "shown, so staff can check an answer rather than trust it."),
        ("Documents and speech in",
         "Vision models read receipts, invoices and forms; Whisper turns "
         "speech into text. The structured result goes straight into the "
         "workflow."),
        ("A person signs off",
         "Guardrails against made-up answers, cost controls on model "
         "calls, and human review wherever an answer moves money or "
         "reaches a customer."),
    ],

    # 6 — selected work
    "work_kicker": "Selected work",
    "work_head": "What we have built, and where it stands.",
    "work_lead": (
        "Client names withheld under confidentiality. Each card says "
        "where the work stands."
    ),
    "work": [
        ("Operations system for a vehicle exporter",
         "Cross-border trade · Japan",
         "Replaced spreadsheets and a CRM from an earlier vendor that the "
         "team could not use: inventory, role-scoped CRM, invoice and "
         "shipping documents, bank-statement import.",
         "Live with the client · bilingual JP / EN · 2 money-losing bugs "
         "caught before release"),
        ("AI co-pilot over a company's own documents",
         "AI implementation · Singapore",
         "Answers from the client's own documents rather than a generic "
         "model's guess, with routing across several language models.",
         "Delivered; engagement completed in 2026 · multi-LLM · Whisper "
         "STT · D1 / R2 / Vectorize"),
        ("An ERP we build in-house, to show how we test",
         "Internal build · Tested, not deployed",
         "A multi-tenant ERP backend: 7,060 automated tests across its 484 "
         "calculation classes. Not deployed for any client, and we make "
         "no accuracy claim for it.",
         "Java 21 / Spring Boot · 115 REST controllers · 9,839 tests in "
         "the August 2026 run"),
        ("Demos you can try before you commit",
         "Pre-sales · Japan &amp; Singapore",
         "Used-car export demos on our Japan site — auction, shipping "
         "tracking, export quotes — and thirteen more on our Singapore "
         "site.",
         "japan.startech-innovation.com · "
         "startech-innovation.com/solutions"),
    ],

    # 7 — stack
    "stack_kicker": "Technology",
    "stack_head": "The stack we actually run.",
    "stack_groups": [
        ("Languages",
         "Java 21 · TypeScript · Python · SQL"),
        ("Backend",
         "Spring Boot · Hibernate · Hono · Node.js · PostgreSQL · Drizzle"),
        ("Cloud &amp; edge",
         "Cloudflare Workers, D1, R2, KV, Vectorize · AWS Bedrock, "
         "SageMaker, Lambda · Neon"),
        ("AI",
         "Anthropic Claude · OpenAI GPT · Google Gemini · Whisper"),
        ("Frontend",
         "React 19 · TanStack Start / Router / Query · Tailwind"),
        ("Quality &amp; ops",
         "JUnit 5 · Testcontainers · ArchUnit · Playwright · SpotBugs · "
         "OWASP Dependency-Check · Flyway"),
    ],

    # 8 — process
    "proc_kicker": "How we work",
    "proc_head": "Discovery to production, on a schedule you can plan around.",
    "process": [
        ("Week 1–2", "Scoping sprint",
         "Sit with the people doing the work · written scope, cost and a "
         "clickable demo"),
        ("Week 3–4", "Architecture",
         "Technical design · firm price and delivery date agreed in "
         "writing"),
        ("Week 5–8", "Build",
         "Working system against real data · weekly check-ins, not a "
         "reveal at the end"),
        ("Week 9–11", "Deployment",
         "Testing, staff handover · deployed on infrastructure you own"),
        ("Week 12+", "Care plan",
         "Monthly hosting, fixes and small changes · documentation so any "
         "engineer can take over"),
    ],
    "proc_note": (
        "Timelines scale with scope — this is the shape of a mid-size "
        "engagement, not a fixed promise. You get the real schedule after "
        "discovery, in writing. For Singapore companies, we check whether "
        "the project qualifies for EDGE Grant support before you commit."
    ),

    # 9 — contact
    "cta_kicker": "Contact",
    "cta_head": "Send us one spreadsheet.",
    "cta_body": (
        "Pick the spreadsheet you would most like to replace, and we will "
        "show it working as a system — free, no commitment. Or book a "
        "call, and we will walk you through how the figures in this deck "
        "were measured."
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
    "doc_label": "Profil Teknis",

    "cover_kicker": "Profil Teknis",
    "cover_head_1": "Perangkat lunak yang dibangun",
    "cover_head_2": "untuk diperiksa.",
    "cover_sub": (
        "Cara StarTech Innovation merancang, menguji, dan menyerahkan "
        "sistem produksi — untuk pimpinan teknis yang akan meninjau "
        "pekerjaannya. Setiap angka dapat dijelaskan dalam panggilan."
    ),
    "cover_meta": ["Singapura", "Jepang", "20+ tahun"],

    "pos_kicker": "Siapa kami",
    "pos_head": "Dipimpin langsung oleh pendirinya, dari awal hingga akhir.",
    "pos_body": (
        "Rumah pengembangan perangkat lunak kustom yang berbasis di "
        "Singapura, bukan vendor produk. Kami membangun sistem sesuai cara "
        "bisnis sebenarnya berjalan, untuk perusahaan yang telah melampaui "
        "spreadsheet, aplikasi siap pakai, atau vendor yang gagal."
    ),
    "pos_body2": (
        "Setiap proyek dipimpin langsung oleh Managing Director dari awal "
        "hingga akhir, dengan spesialis dilibatkan sesuai kebutuhan. Anda "
        "meninjau kode bersama orang yang menulisnya."
    ),
    "pos_stats": [
        ("9.839",
         "Uji otomatis lulus pada ERP internal kami, belum diterapkan "
         "(putaran Agustus 2026)"),
        ("2",
         "Bug yang dapat merugikan, ditemukan sebelum rilis pada sistem "
         "klien yang berjalan"),
        ("12",
         "Minggu dari penggalian kebutuhan hingga peluncuran untuk proyek "
         "lengkap pada umumnya"),
        ("20+",
         "Tahun pengalaman gabungan bisnis dan rekayasa"),
    ],

    "ev_kicker": "Bukti teknis",
    "ev_head": "Angka yang dapat diaudit, bukan klaim.",
    "ev_lead": (
        "Dari ERP internal kami, yang masih dalam pengembangan dan belum "
        "diterapkan. Diukur dengan menjalankannya; laporan verifikasi "
        "menyebutkan uji di balik setiap angka."
    ),
    "ev_cards": [
        ("Cakupan pengujian", "9.839",
         "9.273 unit · 549 integrasi · 17 arsitektur, 0 gagal. Uji "
         "integrasi berjalan di atas PostgreSQL nyata dalam Testcontainers."),
        ("Lapisan perhitungan", "7.060",
         "Uji atas 484 kelas perhitungan tanpa I/O. Seluruhnya berjalan "
         "dalam sekitar 12 detik, tanpa basis data."),
        ("Arsitektur", "17",
         "Uji ArchUnit yang menggagalkan build bila batas lapisan "
         "dilanggar, agar batas modul tidak luruh diam-diam."),
        ("Analisis statis", "0",
         "Temuan SpotBugs di atas ambang batas. Pemindaian berjalan di "
         "setiap build, sehingga temuan baru menggagalkannya."),
    ],
    "ev_case_kicker": "Disiplin yang sama pada sistem klien yang berjalan",
    "ev_case": (
        "Saat membangun ulang sistem perdagangan lintas batas, rekening "
        "koran yang diimpor ulang diam-diam menggandakan penerimaan — bank "
        "tidak menerbitkan ID transfer untuk pemeriksaan duplikat. "
        "Ditemukan saat pengujian, bukan oleh pelanggan."
    ),

    "arch_kicker": "Cara kami membangun",
    "arch_head": "Arsitektur yang tahan di kondisi nyata.",
    "arch_items": [
        ("Modular, dengan batas yang ditegakkan",
         "Batas modul yang eksplisit, diperiksa oleh uji ArchUnit yang "
         "menggagalkan build bila batas lapisan dilanggar — agar desain "
         "tidak luruh diam-diam."),
        ("Aturan bisnis sebagai kode murni",
         "Perhitungan berada di kelas tanpa I/O, sehingga setiap aturan "
         "diuji skenario demi skenario, dalam hitungan detik, tanpa basis "
         "data."),
        ("Basis data nyata dalam pengujian",
         "Uji integrasi berjalan di atas PostgreSQL nyata dalam container, "
         "bukan mock, dengan perubahan skema yang diberi versi di Flyway."),
        ("Infrastruktur milik Anda",
         "Diterapkan di akun cloud, basis data, dan repositori Anda "
         "sendiri, dengan dokumentasi agar engineer mana pun dapat "
         "melanjutkannya."),
    ],

    "ai_kicker": "Data & AI",
    "ai_head": "AI yang menunjukkan sumbernya.",
    "ai_lead": (
        "Model dipilih sesuai tugas, tanpa terikat pada satu vendor — dan "
        "setiap jawaban dapat diperiksa terhadap asalnya."
    ),
    "ai_items": [
        ("Perutean multi-LLM",
         "Lapisan perutean di atas Claude, GPT, dan Gemini, yang telah "
         "diserahkan pada ko-pilot klien. Mengganti model default cukup "
         "lewat konfigurasi, bukan penulisan ulang."),
        ("Jawaban dari dokumen Anda",
         "Pencarian atas dokumen milik klien sendiri, dengan sumber yang "
         "ditampilkan, agar staf dapat memeriksa jawaban alih-alih sekadar "
         "memercayainya."),
        ("Dokumen dan suara sebagai masukan",
         "Model visi membaca struk, faktur, dan formulir; Whisper mengubah "
         "suara menjadi teks. Hasil terstruktur langsung masuk ke alur "
         "kerja."),
        ("Ada persetujuan manusia",
         "Pengaman terhadap jawaban karangan, kendali biaya pada panggilan "
         "model, dan tinjauan manusia setiap kali jawaban menyangkut uang "
         "atau sampai ke pelanggan."),
    ],

    "work_kicker": "Karya terpilih",
    "work_head": "Apa yang telah kami bangun, dan statusnya.",
    "work_lead": (
        "Nama klien dirahasiakan. Setiap kartu menyebutkan status "
        "pekerjaan."
    ),
    "work": [
        ("Sistem operasional eksportir kendaraan",
         "Perdagangan lintas batas · Jepang",
         "Menggantikan spreadsheet dan CRM dari vendor sebelumnya yang "
         "tidak dapat dipakai tim: persediaan, CRM sesuai peran, dokumen "
         "faktur dan pengiriman, impor mutasi rekening.",
         "Berjalan di tempat klien · dwibahasa JP / EN · 2 bug berisiko "
         "finansial ditemukan sebelum rilis"),
        ("Ko-pilot AI atas dokumen perusahaan sendiri",
         "Implementasi AI · Singapura",
         "Menjawab dari dokumen milik klien sendiri, bukan tebakan model "
         "generik, dengan perutean ke beberapa model bahasa.",
         "Diserahkan; kerja sama selesai pada 2026 · multi-LLM · Whisper "
         "STT · D1 / R2 / Vectorize"),
        ("ERP internal untuk menunjukkan cara kami menguji",
         "Pengembangan internal · Diuji, belum diterapkan",
         "Backend ERP multi-tenant: 7.060 uji otomatis atas 484 kelas "
         "perhitungannya. Belum diterapkan untuk klien mana pun, dan kami "
         "tidak mengklaim akurasinya.",
         "Java 21 / Spring Boot · 115 REST controller · 9.839 uji pada "
         "putaran Agustus 2026"),
        ("Demo yang dapat dicoba sebelum Anda berkomitmen",
         "Pra-penjualan · Jepang &amp; Singapura",
         "Demo ekspor mobil bekas di situs Jepang kami — lelang, pelacakan "
         "pengiriman, penawaran ekspor — dan tiga belas demo lagi di situs "
         "Singapura kami.",
         "japan.startech-innovation.com · "
         "startech-innovation.com/solutions"),
    ],

    "stack_kicker": "Teknologi",
    "stack_head": "Teknologi yang kami jalankan sehari-hari.",
    "stack_groups": [
        ("Bahasa", "Java 21 · TypeScript · Python · SQL"),
        ("Backend",
         "Spring Boot · Hibernate · Hono · Node.js · PostgreSQL · Drizzle"),
        ("Cloud &amp; edge",
         "Cloudflare Workers, D1, R2, KV, Vectorize · AWS Bedrock, "
         "SageMaker, Lambda · Neon"),
        ("AI",
         "Anthropic Claude · OpenAI GPT · Google Gemini · Whisper"),
        ("Frontend",
         "React 19 · TanStack Start / Router / Query · Tailwind"),
        ("Kualitas &amp; ops",
         "JUnit 5 · Testcontainers · ArchUnit · Playwright · SpotBugs · "
         "OWASP Dependency-Check · Flyway"),
    ],

    "proc_kicker": "Cara kami bekerja",
    "proc_head": (
        "Dari penggalian kebutuhan hingga produksi, dengan jadwal yang "
        "dapat Anda rencanakan."
    ),
    "process": [
        ("Minggu 1–2", "Sprint cakupan",
         "Duduk bersama orang yang menjalankan pekerjaan · cakupan dan "
         "biaya tertulis, serta demo yang dapat diklik"),
        ("Minggu 3–4", "Arsitektur",
         "Desain teknis · harga pasti dan tanggal serah terima disepakati "
         "tertulis"),
        ("Minggu 5–8", "Pembangunan",
         "Sistem berjalan dengan data nyata · laporan mingguan, bukan "
         "hanya pengungkapan di akhir"),
        ("Minggu 9–11", "Penerapan",
         "Pengujian, serah terima staf · diterapkan pada infrastruktur "
         "milik Anda"),
        ("Minggu 12+", "Paket perawatan",
         "Hosting, perbaikan, dan perubahan kecil setiap bulan · "
         "dokumentasi agar engineer mana pun dapat mengambil alih"),
    ],
    "proc_note": (
        "Jadwal menyesuaikan cakupan pekerjaan — ini adalah gambaran "
        "proyek berskala menengah, bukan janji tetap. Jadwal sebenarnya "
        "Anda terima tertulis setelah penggalian kebutuhan. Untuk "
        "perusahaan Singapura, kami memeriksa apakah proyek memenuhi "
        "syarat dukungan EDGE Grant sebelum Anda berkomitmen."
    ),

    "cta_kicker": "Kontak",
    "cta_head": "Kirim satu file Excel Anda kepada kami.",
    "cta_body": (
        "Pilih file Excel yang paling ingin Anda tinggalkan, dan kami akan "
        "menunjukkannya berjalan sebagai sistem — gratis, tanpa komitmen. "
        "Atau jadwalkan panggilan, dan kami akan menjelaskan bagaimana "
        "angka-angka dalam dek ini diukur."
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
