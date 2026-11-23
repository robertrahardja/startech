# -*- coding: utf-8 -*-
"""Company profile content, EN + ID. One dict per language, same keys.

Rewritten on 2026-11-02 to match the capability deck (pitch_content.py)
and docs/COMPANY.md: Singapore and Japan, founder-led, the scoping sprint
and care plan, the spreadsheet offer. Only the exporter system is live
with a client; the AI co-pilot was delivered and the engagement completed
in 2026; the ERP is an internal build, tested and not deployed (7,060
tests across 484 calculation classes). Re-checked on 2026-11-08: no
payroll, CPF, accounting or accuracy claims.
PSG closed on 29 September 2026: the grant note describes EDGE, with no
percentage until Enterprise Singapore confirms one for the project.
"""

COMMON = {
    "legal_name": "StarTech Innovation Pte Ltd",
    "uen": "202110461R",
    "addr": "1003 Bukit Merah Central #06-07, Singapore 159836",
    "corr": "7500A Beach Road, Singapore 199591",
    "md": "Robert Rahardja",
    "phone": "+65 9069 3236",
    "email": "robert.rahardja@startech-innovation.com",
    "web": "startech-innovation.com",
    "linkedin": "linkedin.com/in/robertrahardja",
    "tagline": "Business. Finance. Tech.",
}

EN = {
    "lang": "en",
    "doc_label": "Company Profile",
    "cover_kicker": "Company Profile",
    "cover_head_1": "We build the software",
    "cover_head_2": "your business runs on.",
    "cover_sub": (
        "A Singapore-based custom software house. We design and build "
        "production systems for companies that have outgrown "
        "spreadsheets, off-the-shelf tools, or a vendor that did not "
        "deliver."
    ),
    "cover_meta": ["Singapore", "Japan", "20+ years"],

    # ---- page 2 : who we are -------------------------------------------
    "about_kicker": "Who we are",
    "about_head": "Founder-led, start to finish.",
    "about_body": [
        "StarTech Innovation is a custom software house, not a product "
        "vendor. We do not sell you a shelf system and hope it fits — we "
        "build the system around how your business actually runs: "
        "operations, customers, stock, invoices and the documents in "
        "between.",
        "Every engagement is led personally by the Managing Director, "
        "start to finish, with specialists brought in as the work "
        "demands. You deal with the person who writes the code and signs "
        "the delivery.",
        "Much of our work starts because an earlier vendor, or an "
        "off-the-shelf tool, did not hold up. Our live client work runs "
        "between Singapore and Japan, so different currencies, languages "
        "and banking conventions in one system are our normal case, not "
        "a special request.",
    ],
    "about_pillars_kicker": "Working with us",
    "about_pillars": [
        ("One accountable point of contact",
         "The Managing Director scopes, builds and delivers your system "
         "personally. No account manager relaying between you and the "
         "engineers."),
        ("Written scope before code",
         "A paid two-week scoping sprint produces a written scope, a cost "
         "and a clickable demo you can circulate for sign-off. The fee is "
         "credited against the build."),
        ("Tested, not demoed",
         "Tests are written against your real business rules, not the "
         "happy path. On a live client system they caught two "
         "money-losing bugs before release."),
        ("You own the build",
         "Deployed on your cloud account, your database and your "
         "repository, with documentation so any engineer can take it "
         "over. A monthly care plan is optional."),
    ],

    "markets_kicker": "Where we work",
    "markets": [
        ("Singapore",
         "Home base · SMEs replacing spreadsheets, chat threads and "
         "disconnected tools"),
        ("Japan",
         "Live client work in cross-border trade · Japanese and English "
         "in one system"),
        ("Across the region",
         "Multi-currency systems for companies trading between offices "
         "and time zones"),
    ],

    # ---- page 3 : what we do -------------------------------------------
    "services_kicker": "What we build",
    "services_head": "Custom software across four practices.",
    "services": [
        ("Business systems",
         "Operations platforms, CRM, inventory, document generation and "
         "workflow — one system your team will actually use.",
         ["Operations platforms built around your process",
          "Role-scoped CRM and customer records",
          "Inventory, quotations and document generation",
          "Imports from the spreadsheets you already keep"]),
        ("AI implementation",
         "Assistants that answer from your own documents, and automation "
         "pipelines — with sources shown so the output can be checked.",
         ["Answers drawn from your documents, with sources",
          "Claude, GPT or Gemini, chosen per task",
          "Reading receipts, invoices and forms",
          "A person signs off where money or customers are involved"]),
        ("Finance workflows",
         "Invoicing, bank-statement import, reconciliation and document "
         "generation — with an audit trail your accountant can check.",
         ["Proforma and commercial invoices",
          "Bank-statement import with duplicate checks",
          "Reconciliation your team reviews and signs off",
          "An audit trail behind every figure"]),
        ("Cross-border operations",
         "Multi-currency, multi-language systems for companies trading "
         "between Singapore, Japan and the region — one system, not "
         "three.",
         ["Multi-currency pricing, payments and documents",
          "Japanese and English interfaces, in production",
          "Shipping instructions and export paperwork",
          "One system across offices and time zones"]),
    ],
    "tools_kicker": "Try before you commit",
    "tools_lead": (
        "Thirteen working demos at startech-innovation.com/solutions show "
        "the kind of tools we build, each with a sample you can open and "
        "download. Pick one, and we will build it around your own data:"
    ),
    "tools": [
        "Receipt &amp; Invoice Scanner", "Customer Support Chatbot",
        "Appointment Booking", "Quotation Generator", "Job Posting Writer",
        "Inventory Tracker", "Social Media Manager", "Document Translator",
        "Employee Onboarding", "Sales Assistant", "Compliance Checker",
        "Training Content Generator", "Financial Report Builder",
    ],

    # ---- page 4 : proof + process --------------------------------------
    "proof_kicker": "Selected work",
    "proof_head": "What we have built, and where it stands.",
    "proof": [
        ("Operations system for a vehicle exporter",
         "Cross-border trade, Japan",
         "Inventory lived in a spreadsheet and payments were reconciled by "
         "hand; an earlier offshore vendor had delivered a CRM the team "
         "could not use. We rebuilt it: inventory, role-scoped CRM, "
         "invoice and shipping documents, bank-statement import. Two "
         "money-losing bugs were caught before release. Live with the "
         "client, in Japanese and English."),
        ("AI co-pilot over a company's own documents",
         "AI implementation, Singapore",
         "A generic chatbot knows nothing about an SME knowledge worker's "
         "role or sector. We built a co-pilot that answers from the "
         "client's own documents, with routing across several language "
         "models. Delivered; the engagement completed in 2026."),
        ("An ERP we build in-house, to show how we test",
         "Internal build, tested, not deployed",
         "Software that calculates money is easy to demo and hard to "
         "trust, so we built a large ERP of our own to show how we test: "
         "7,060 automated tests across its 484 calculation classes. It is "
         "not deployed for any client, and we make no accuracy claim for "
         "it."),
        ("Demos you can try before you commit",
         "Pre-sales, Japan &amp; Singapore",
         "We show a system working before a client signs. Our Japan site "
         "runs demos for used-car exporters — auction, shipping tracking, "
         "export quotes — and our Singapore site runs thirteen more."),
    ],
    "process_kicker": "How we work",
    "process_head": (
        "Discovery to production, on a schedule you can plan around."
    ),
    "process": [
        ("Week 1–2", "Scoping sprint",
         "Written scope, cost and a clickable demo"),
        ("Week 3–4", "Architecture",
         "Technical design; firm price and date in writing"),
        ("Week 5–8", "Build",
         "Working system on real data, with weekly check-ins"),
        ("Week 9–11", "Deployment",
         "Testing and staff handover, on infrastructure you own"),
        ("Week 12+", "Care plan",
         "Monthly hosting, fixes and small changes"),
    ],
    "stack_kicker": "Technology",
    "stack": [
        ("AI", "Anthropic Claude · OpenAI GPT · Google Gemini · Whisper"),
        ("Cloud", "Cloudflare Workers · AWS Bedrock, SageMaker, Lambda"),
        ("Backend", "TypeScript · Java Spring Boot · PostgreSQL"),
        ("Frontend", "React · TanStack Start · Tailwind"),
    ],

    # ---- page 5 : contact ----------------------------------------------
    "cta_kicker": "Next step",
    "cta_head": "Send us one spreadsheet.",
    "cta_body": (
        "Pick the spreadsheet you would most like to replace, and we will "
        "show it working as a system — free, no commitment. If software "
        "is not the answer, we will tell you that too."
    ),
    "cta_offer": "Free demo built from your spreadsheet · No commitment",
    "contact_kicker": "Contact",
    "labels": {
        "md": "Managing Director",
        "phone": "Phone / WhatsApp",
        "email": "Email",
        "web": "Web",
        "linkedin": "LinkedIn",
        "office": "Registered office",
        "corr": "Correspondence",
        "uen": "UEN",
        "langs": "Working languages",
    },
    "langs_value": "English · 中文 (简/繁) · Bahasa Melayu · Bahasa Indonesia",
    "grants_note": (
        "Singapore grants: PSG closed on 29 September 2026 and was "
        "replaced by the EDGE Grant from Enterprise Singapore. A business "
        "system with at least three functions, such as sales, inventory "
        "and finance, can be supported even when the vendor is not on the "
        "pre-approved list. Apply before the project starts; the grant is "
        "paid back once the project is finished and paid for. We check "
        "whether your project may qualify, and prepare the vendor "
        "documents at no charge, before you commit."
    ),
    "footer_conf": (
        "This document contains commercially confidential information and "
        "is intended solely for the named recipient."
    ),
}

ID = {
    "lang": "id",
    "doc_label": "Profil Perusahaan",
    "cover_kicker": "Profil Perusahaan",
    "cover_head_1": "Kami membangun perangkat lunak",
    "cover_head_2": "yang menjalankan bisnis Anda.",
    "cover_sub": (
        "Rumah pengembangan perangkat lunak kustom yang berbasis di "
        "Singapura. Kami merancang dan membangun sistem produksi untuk "
        "perusahaan yang telah melampaui kemampuan spreadsheet, aplikasi "
        "siap pakai, atau vendor yang gagal memenuhi janji."
    ),
    "cover_meta": ["Singapura", "Jepang", "20+ tahun"],

    "about_kicker": "Siapa kami",
    "about_head": "Dipimpin langsung oleh pendirinya, dari awal hingga akhir.",
    "about_body": [
        "StarTech Innovation adalah rumah pengembangan perangkat lunak "
        "kustom, bukan vendor produk. Kami tidak menjual sistem siap pakai "
        "dan berharap cocok — kami membangun sistem sesuai cara bisnis "
        "Anda sebenarnya berjalan: operasional, pelanggan, stok, faktur, "
        "dan dokumen di antaranya.",
        "Setiap proyek dipimpin langsung oleh Managing Director dari awal "
        "hingga akhir, dengan spesialis dilibatkan sesuai kebutuhan. Anda "
        "berkomunikasi langsung dengan orang yang menulis kode dan "
        "menandatangani serah terima.",
        "Banyak pekerjaan kami bermula karena vendor sebelumnya, atau "
        "aplikasi siap pakai, tidak dapat diandalkan. Pekerjaan klien kami "
        "yang sedang berjalan menghubungkan Singapura dan Jepang — mata "
        "uang, bahasa, dan kebiasaan perbankan yang berbeda dalam satu "
        "sistem adalah hal biasa bagi kami, bukan permintaan khusus.",
    ],
    "about_pillars_kicker": "Bekerja sama dengan kami",
    "about_pillars": [
        ("Satu titik kontak yang bertanggung jawab",
         "Managing Director menentukan cakupan, membangun, dan menyerahkan "
         "sistem Anda secara langsung. Tidak ada account manager sebagai "
         "perantara."),
        ("Cakupan tertulis sebelum kode ditulis",
         "Sprint penentuan cakupan berbayar selama dua minggu menghasilkan "
         "cakupan dan biaya tertulis, serta demo yang dapat diklik untuk "
         "persetujuan internal. Biayanya diperhitungkan ke biaya "
         "pembangunan."),
        ("Diuji, bukan didemokan",
         "Uji ditulis berdasarkan aturan bisnis Anda yang sebenarnya, "
         "bukan hanya skenario ideal. Pada sistem klien yang berjalan, uji "
         "ini menemukan dua bug yang dapat merugikan sebelum rilis."),
        ("Anda memiliki hasilnya",
         "Diterapkan di akun cloud, basis data, dan repositori Anda "
         "sendiri, dengan dokumentasi agar engineer mana pun dapat "
         "melanjutkannya. Paket perawatan bulanan bersifat opsional."),
    ],

    "markets_kicker": "Tempat kami bekerja",
    "markets": [
        ("Singapura",
         "Basis kami · UKM yang mengganti spreadsheet, percakapan chat, "
         "dan aplikasi terpisah"),
        ("Jepang",
         "Pekerjaan klien yang berjalan di perdagangan lintas batas · "
         "bahasa Jepang dan Inggris dalam satu sistem"),
        ("Kawasan sekitarnya",
         "Sistem multi-mata uang untuk perusahaan yang berdagang lintas "
         "kantor dan zona waktu"),
    ],

    "services_kicker": "Yang kami bangun",
    "services_head": "Perangkat lunak kustom di empat bidang praktik.",
    "services": [
        ("Sistem bisnis",
         "Platform operasional, CRM, persediaan, pembuatan dokumen, dan "
         "alur kerja — satu sistem yang benar-benar dipakai tim Anda.",
         ["Platform operasional sesuai proses Anda",
          "CRM dan data pelanggan sesuai peran",
          "Persediaan, penawaran, dan pembuatan dokumen",
          "Impor dari spreadsheet yang sudah Anda miliki"]),
        ("Implementasi AI",
         "Asisten yang menjawab berdasarkan dokumen Anda sendiri dan alur "
         "otomatisasi — dengan sumber yang ditampilkan agar hasilnya dapat "
         "diperiksa.",
         ["Jawaban dari dokumen Anda, beserta sumbernya",
          "Claude, GPT, atau Gemini, dipilih sesuai tugas",
          "Membaca struk, faktur, dan formulir",
          "Persetujuan manusia bila menyangkut uang atau pelanggan"]),
        ("Alur kerja keuangan",
         "Penagihan, impor mutasi rekening, rekonsiliasi, dan pembuatan "
         "dokumen — dengan jejak audit yang dapat diperiksa akuntan Anda.",
         ["Faktur proforma dan faktur komersial",
          "Impor mutasi rekening dengan pemeriksaan duplikat",
          "Rekonsiliasi yang ditinjau dan disetujui tim Anda",
          "Jejak audit di balik setiap angka"]),
        ("Operasi lintas batas",
         "Sistem multi-mata uang dan multibahasa untuk perusahaan yang "
         "berdagang antara Singapura, Jepang, dan kawasan sekitarnya — "
         "satu sistem, bukan tiga.",
         ["Harga, pembayaran, dan dokumen multi-mata uang",
          "Antarmuka Jepang dan Inggris, sudah berjalan",
          "Instruksi pengiriman dan dokumen ekspor",
          "Satu sistem lintas kantor dan zona waktu"]),
    ],
    "tools_kicker": "Coba sebelum berkomitmen",
    "tools_lead": (
        "Tiga belas demo yang berfungsi di startech-innovation.com/solutions "
        "menunjukkan jenis alat yang kami bangun, masing-masing dengan "
        "contoh yang dapat dibuka dan diunduh. Pilih satu, dan kami akan "
        "membangunnya dengan data Anda sendiri:"
    ),
    "tools": [
        "Pemindai Struk &amp; Faktur", "Chatbot Layanan Pelanggan",
        "Pemesanan Janji Temu", "Pembuat Penawaran",
        "Penulis Lowongan Kerja", "Pelacak Persediaan",
        "Pengelola Media Sosial", "Penerjemah Dokumen",
        "Onboarding Karyawan", "Asisten Penjualan", "Pemeriksa Kepatuhan",
        "Pembuat Materi Pelatihan", "Penyusun Laporan Keuangan",
    ],

    "proof_kicker": "Karya terpilih",
    "proof_head": "Apa yang telah kami bangun, dan statusnya.",
    "proof": [
        ("Sistem operasional eksportir kendaraan",
         "Perdagangan lintas batas, Jepang",
         "Persediaan tercatat di spreadsheet dan pembayaran direkonsiliasi "
         "manual; vendor luar negeri sebelumnya membangun CRM yang tidak "
         "dapat dipakai tim. Kami membangun ulang: persediaan, CRM sesuai "
         "peran, dokumen faktur dan pengiriman, impor mutasi rekening. Dua "
         "bug yang dapat merugikan ditemukan sebelum rilis. Berjalan di "
         "tempat klien, dalam bahasa Jepang dan Inggris."),
        ("Ko-pilot AI atas dokumen perusahaan sendiri",
         "Implementasi AI, Singapura",
         "Chatbot generik tidak tahu apa-apa tentang peran atau sektor "
         "pekerja pengetahuan di UKM. Kami membangun ko-pilot yang menjawab "
         "dari dokumen milik klien sendiri, dengan perutean ke beberapa "
         "model bahasa. Telah diserahkan; kerja sama selesai pada 2026."),
        ("ERP internal untuk menunjukkan cara kami menguji",
         "Pengembangan internal, diuji, belum diterapkan",
         "Perangkat lunak yang menghitung uang mudah didemokan, tetapi "
         "sulit dipercaya. Karena itu kami membangun ERP berskala besar "
         "sendiri untuk menunjukkan cara kami menguji: 7.060 uji otomatis "
         "atas 484 kelas perhitungannya. ERP ini belum diterapkan untuk "
         "klien mana pun, dan kami tidak mengklaim akurasinya."),
        ("Demo yang dapat dicoba sebelum Anda berkomitmen",
         "Pra-penjualan, Jepang &amp; Singapura",
         "Kami menunjukkan sistem yang berjalan sebelum klien "
         "menandatangani. Situs Jepang kami menjalankan demo untuk "
         "eksportir mobil bekas — lelang, pelacakan pengiriman, penawaran "
         "ekspor — dan situs Singapura kami menjalankan tiga belas demo "
         "lagi."),
    ],
    "process_kicker": "Cara kami bekerja",
    "process_head": (
        "Dari penggalian kebutuhan hingga produksi, dengan jadwal yang "
        "dapat Anda rencanakan."
    ),
    "process": [
        ("Minggu 1–2", "Sprint cakupan",
         "Cakupan, biaya, dan demo yang dapat diklik"),
        ("Minggu 3–4", "Arsitektur",
         "Desain teknis; harga dan tanggal pasti secara tertulis"),
        ("Minggu 5–8", "Pembangunan",
         "Sistem berjalan dengan data nyata, laporan mingguan"),
        ("Minggu 9–11", "Penerapan",
         "Pengujian dan serah terima staf, di infrastruktur Anda"),
        ("Minggu 12+", "Paket perawatan",
         "Hosting, perbaikan, dan perubahan kecil setiap bulan"),
    ],
    "stack_kicker": "Teknologi",
    "stack": [
        ("AI", "Anthropic Claude · OpenAI GPT · Google Gemini · Whisper"),
        ("Cloud", "Cloudflare Workers · AWS Bedrock, SageMaker, Lambda"),
        ("Backend", "TypeScript · Java Spring Boot · PostgreSQL"),
        ("Frontend", "React · TanStack Start · Tailwind"),
    ],

    "cta_kicker": "Langkah berikutnya",
    "cta_head": "Kirim satu file Excel Anda kepada kami.",
    "cta_body": (
        "Pilih file Excel yang paling ingin Anda tinggalkan, dan kami akan "
        "menunjukkannya berjalan sebagai sistem — gratis, tanpa komitmen. "
        "Jika perangkat lunak bukan jawabannya, kami akan katakan itu "
        "juga."
    ),
    "cta_offer": "Demo gratis dari file Excel Anda · Tanpa komitmen",
    "contact_kicker": "Kontak",
    "labels": {
        "md": "Managing Director",
        "phone": "Telepon / WhatsApp",
        "email": "Surel",
        "web": "Situs",
        "linkedin": "LinkedIn",
        "office": "Kantor terdaftar",
        "corr": "Korespondensi",
        "uen": "UEN",
        "langs": "Bahasa yang kami gunakan",
    },
    "langs_value": "Inggris · 中文 (简/繁) · Melayu · Indonesia",
    "grants_note": (
        "Hibah Singapura: PSG ditutup pada 29 September 2026 dan "
        "digantikan oleh EDGE Grant dari Enterprise Singapore. Sistem "
        "bisnis dengan sedikitnya tiga fungsi, misalnya penjualan, "
        "persediaan, dan keuangan, dapat didukung meskipun vendornya tidak "
        "termasuk daftar pra-persetujuan. Ajukan sebelum proyek dimulai; "
        "hibah dibayarkan kembali setelah proyek selesai dan dilunasi. "
        "Kami memeriksa apakah proyek Anda mungkin memenuhi syarat, dan "
        "menyiapkan dokumen vendor tanpa biaya, sebelum Anda berkomitmen."
    ),
    "footer_conf": (
        "Dokumen ini memuat informasi rahasia komersial dan ditujukan "
        "hanya untuk penerima yang disebutkan."
    ),
}
