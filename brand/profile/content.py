# -*- coding: utf-8 -*-
"""Company profile content, EN + ID. One dict per language, same keys."""

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
    "cover_head_1": "We engineer businesses,",
    "cover_head_2": "not just software.",
    "cover_sub": (
        "Enterprise AI implementation and software engineering for "
        "organisations across Singapore and Southeast Asia. "
        "Strategy to production in 90 days."
    ),
    "cover_meta": ["Singapore", "Indonesia", "20+ years"],

    # ---- page 2 : who we are -------------------------------------------
    "about_kicker": "Who we are",
    "about_head": "A Singapore software house that ships.",
    "about_body": [
        "StarTech Innovation is a Singapore-based custom software house. We "
        "design and build production systems — enterprise AI, ERP, financial "
        "platforms and healthcare software — for organisations that have "
        "outgrown off-the-shelf tools.",
        "We are implementers, not advisors. Every engagement ends in "
        "running software that your people use, not a slide deck. Our work "
        "is delivered by a specialist team and a vetted partner network, "
        "led directly by our Managing Director on every project.",
        "We work natively across Singapore and Indonesia — Employment Act, "
        "PDPA, MAS, GST, CPF and IRAS on one side; BPJS and OJK on the "
        "other — and deliver in English, Chinese, Malay and Bahasa "
        "Indonesia.",
    ],
    "about_pillars_kicker": "What sets us apart",
    "about_pillars": [
        ("Implementation, not just strategy",
         "We write the code, run the deployment and train your team. "
         "Delivery is the product."),
        ("90 days to production",
         "A proven five-phase method that reaches a live system in a "
         "quarter, not a financial year."),
        ("Regulated-market fluency",
         "Singapore and Indonesian compliance is built into the "
         "architecture from day one — never bolted on."),
        ("Grant handling included",
         "For Singapore SMEs we run the full PSG and SFEC application "
         "process at no extra charge."),
    ],

    # ---- page 3 : what we do -------------------------------------------
    "markets_kicker": "Markets &amp; compliance",
    "markets": [
        ("Singapore",
         "Employment Act · PDPA · MAS · GST · CPF · IRAS · IMDA"),
        ("Indonesia",
         "BPJS · OJK · cross-border data residency"),
        ("Wider SEA",
         "Malaysia and regional deployments on request"),
    ],
    "services_kicker": "What we do",
    "services_head": "Four practices, one delivery team.",
    "services": [
        ("AI Implementation",
         "Custom GPT-4 and Claude implementations, RAG systems over your "
         "proprietary data, and intelligent automation pipelines.",
         ["Retrieval-augmented generation with vector search",
          "Fine-tuned domain models with evaluation and versioning",
          "Guardrails for hallucination prevention and compliance",
          "Confidence scoring with source attribution"]),
        ("Enterprise Software",
         "Full ERP and line-of-business systems — financials, HR, "
         "inventory, procurement and manufacturing.",
         ["General ledger, AP, AR, payroll and fixed assets",
          "Multi-tenant, multi-currency, role-based access",
          "Audit-ready logging and compliance reporting",
          "Integrates with Xero, QuickBooks, Sheets and Excel"]),
        ("Financial Systems",
         "Accounting engines, insurance document AI, startup valuation and "
         "fraud detection for regulated operators.",
         ["DCF and comparable analysis with Monte Carlo simulation",
          "Automated reconciliation across accounts and currencies",
          "KYC and AML workflows, MAS and OJK reporting",
          "Real-time transaction monitoring and anomaly detection"]),
        ("Healthcare &amp; Public Sector",
         "Patient platforms, medical records and citizen services built "
         "for high-volume, high-assurance environments.",
         ["Electronic medical records with HL7 and FHIR compliance",
          "AI-assisted triage by symptom severity",
          "BPJS claim integration for Indonesian providers",
          "High-availability infrastructure for critical services"]),
    ],
    "tools_kicker": "Also available",
    "tools_lead": (
        "Packaged AI solutions for smaller teams — deployable in days and "
        "eligible for Singapore government grants:"
    ),
    "tools": [
        "Receipt &amp; Invoice Scanner", "Customer Support Chatbot",
        "Appointment Booking", "Quotation Generator", "Inventory Tracker",
        "Document Translator", "Employee Onboarding", "Sales Assistant",
        "Compliance Checker", "Financial Report Builder",
        "Training Content Generator", "AI Avatar Studio",
    ],

    # ---- page 4 : proof + process --------------------------------------
    "proof_kicker": "Selected work",
    "proof_head": "Systems running in production.",
    "proof": [
        ("AI performance co-pilot",
         "Professional services, Singapore",
         "A personal AI co-pilot for SME knowledge workers, with four "
         "reasoning modes and peer-to-peer coordination across "
         "departments. Production API live on Cloudflare Workers with "
         "multi-LLM routing, speech-to-text and layered organisational "
         "context."),
        ("Multi-tenant ERP platform",
         "Enterprise, Singapore &amp; Indonesia",
         "A Java 21 / Spring Boot ERP backend with a Singapore payroll "
         "compliance engine. 51 REST controllers and 484 calculation "
         "classes, verified by 7,060 automated tests and a five-engine "
         "accounting harness that independently recomputes every "
         "statement."),
        ("Patient-owned health platform",
         "Healthcare, Indonesia &amp; SEA",
         "A trilingual health platform operated from Singapore with "
         "Singapore-only data residency. Lifestyle tracking, insurance "
         "onboarding and an AI advisor are live, with a cross-border "
         "health vault and clinician portal in build."),
        ("Vehicle trading &amp; logistics OS",
         "Cross-border trade, Japan",
         "A full operational rebuild for an international vehicle "
         "exporter — inventory, role-scoped CRM, document generation for "
         "proforma and commercial invoices, shipping instructions and "
         "two-level payment routing. Live in production."),
    ],
    "process_kicker": "How we work",
    "process_head": "Strategy to production in 90 days.",
    "process": [
        ("Week 1–2", "Discovery &amp; AI readiness",
         "AI Opportunity Report &amp; ROI projections"),
        ("Week 3–4", "Solution architecture",
         "Technical architecture &amp; implementation plan"),
        ("Week 5–8", "Proof of concept",
         "Working PoC with core capabilities"),
        ("Week 9–11", "Production deployment",
         "Production system ready for users"),
        ("Week 12+", "Optimisation &amp; support",
         "Performance reports &amp; recommendations"),
    ],
    "stack_kicker": "Technology",
    "stack": [
        ("AI", "OpenAI GPT-4 · Anthropic Claude · ElevenLabs · HeyGen"),
        ("Cloud", "Cloudflare Workers · AWS Bedrock, SageMaker, Lambda"),
        ("Backend", "TypeScript · Java Spring Boot · PostgreSQL · Redis"),
        ("Frontend", "React · TanStack Start · Tailwind"),
    ],

    # ---- page 5 : contact ----------------------------------------------
    "cta_kicker": "Next step",
    "cta_head": "Let's scope your first 90 days.",
    "cta_body": (
        "Tell us about the process that is costing you the most time or "
        "money. We will come back with an honest view of what AI and "
        "custom software can and cannot do for it — including a grant "
        "plan if you qualify."
    ),
    "cta_offer": "Free 30-minute consultation · No commitment",
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
        "Singapore SMEs may offset up to 50% of qualifying project costs "
        "through the Productivity Solutions Grant (PSG), with a further "
        "SGD 10,000 available via the SkillsFuture Enterprise Credit "
        "(SFEC). We prepare and submit the paperwork at no extra charge. "
        "Eligibility is confirmed against current IMDA and Enterprise "
        "Singapore criteria at the time of application."
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
    "cover_head_1": "We engineer businesses,",
    "cover_head_2": "not just software.",
    "cover_sub": (
        "Implementasi AI dan rekayasa perangkat lunak tingkat enterprise "
        "untuk organisasi di Singapura dan Asia Tenggara. "
        "Dari strategi ke produksi dalam 90 hari."
    ),
    "cover_meta": ["Singapura", "Indonesia", "20+ tahun"],

    "about_kicker": "Profil singkat",
    "about_head": "Perusahaan perangkat lunak Singapura dengan pengalaman lebih dari 20 tahun.",
    "about_body": [
        "StarTech Innovation adalah perusahaan pengembang perangkat lunak "
        "asal Singapura. Kami merancang dan membangun sistem produksi — AI "
        "enterprise, ERP, platform keuangan, dan perangkat lunak kesehatan "
        "— bagi organisasi yang kebutuhannya melampaui aplikasi siap pakai.",
        "Kami pelaksana, bukan sekadar pemberi saran. Setiap kerja sama "
        "berakhir dengan sistem yang beroperasi dan digunakan tim Anda, "
        "bukan sekadar presentasi. Pekerjaan kami ditangani oleh tim "
        "spesialis dan jaringan mitra terpilih, dipimpin langsung oleh "
        "Managing Director kami di setiap proyek.",
        "Kami menguasai regulasi Singapura dan Indonesia — Employment "
        "Act, PDPA, MAS, GST, CPF, dan IRAS di satu sisi; BPJS dan OJK di "
        "sisi lain — serta melayani dalam bahasa Inggris, Mandarin, "
        "Melayu, dan Indonesia.",
    ],
    "about_pillars_kicker": "Yang membedakan kami",
    "about_pillars": [
        ("Pelaksanaan, bukan sekadar strategi",
         "Kami menulis kodenya, menjalankan penerapannya, dan melatih tim "
         "Anda. Hasil kerja yang beroperasi itulah produknya."),
        ("90 hari menuju produksi",
         "Metode lima fase yang teruji, menghasilkan sistem beroperasi "
         "dalam satu kuartal — bukan satu tahun anggaran."),
        ("Menguasai pasar teregulasi",
         "Kepatuhan Singapura dan Indonesia dirancang ke dalam arsitektur "
         "sejak hari pertama, bukan ditambahkan di akhir."),
        ("Pengurusan hibah termasuk",
         "Untuk UKM Singapura, kami mengurus seluruh proses pengajuan PSG "
         "dan SFEC tanpa biaya tambahan."),
    ],

    "markets_kicker": "Pasar &amp; kepatuhan",
    "markets": [
        ("Singapura",
         "Employment Act · PDPA · MAS · GST · CPF · IRAS · IMDA"),
        ("Indonesia",
         "BPJS · OJK · residensi data lintas negara"),
        ("Asia Tenggara",
         "Malaysia dan penerapan regional sesuai permintaan"),
    ],
    "services_kicker": "Layanan kami",
    "services_head": "Empat praktik, satu tim pelaksana.",
    "services": [
        ("Implementasi AI",
         "Implementasi GPT-4 dan Claude khusus, sistem RAG di atas data "
         "internal Anda, serta alur otomatisasi cerdas.",
         ["Retrieval-augmented generation dengan pencarian vektor",
          "Model domain hasil fine-tuning dengan evaluasi dan versioning",
          "Guardrail untuk mencegah halusinasi dan menjaga kepatuhan",
          "Skor keyakinan dengan atribusi sumber"]),
        ("Perangkat Lunak Enterprise",
         "Sistem ERP dan lini bisnis lengkap — keuangan, SDM, "
         "persediaan, pengadaan, dan manufaktur.",
         ["Buku besar, utang, piutang, penggajian, dan aset tetap",
          "Multi-tenant, multi-mata uang, akses berbasis peran",
          "Pencatatan siap audit dan pelaporan kepatuhan",
          "Terhubung dengan Xero, QuickBooks, Sheets, dan Excel"]),
        ("Sistem Keuangan",
         "Mesin akuntansi, AI dokumen asuransi, valuasi startup, dan "
         "deteksi kecurangan untuk pelaku usaha teregulasi.",
         ["Analisis DCF dan pembanding dengan simulasi Monte Carlo",
          "Rekonsiliasi otomatis lintas akun dan mata uang",
          "Alur KYC dan AML, pelaporan MAS dan OJK",
          "Pemantauan transaksi real-time dan deteksi anomali"]),
        ("Kesehatan &amp; Sektor Publik",
         "Platform pasien, rekam medis, dan layanan warga untuk "
         "lingkungan bervolume tinggi dengan tuntutan keandalan tinggi.",
         ["Rekam medis elektronik sesuai standar HL7 dan FHIR",
          "Triase berbantuan AI berdasarkan tingkat keparahan gejala",
          "Integrasi klaim BPJS untuk penyedia layanan di Indonesia",
          "Infrastruktur ketersediaan tinggi untuk layanan kritis"]),
    ],
    "tools_kicker": "Tersedia juga",
    "tools_lead": (
        "Solusi AI terpaket untuk tim berskala lebih kecil — dapat "
        "diterapkan dalam hitungan hari dan memenuhi syarat hibah "
        "pemerintah Singapura:"
    ),
    "tools": [
        "Pemindai Struk &amp; Faktur", "Chatbot Layanan Pelanggan",
        "Pemesanan Janji Temu", "Pembuat Penawaran", "Pelacak Persediaan",
        "Penerjemah Dokumen", "Onboarding Karyawan", "Asisten Penjualan",
        "Pemeriksa Kepatuhan", "Penyusun Laporan Keuangan",
        "Pembuat Materi Pelatihan", "Studio Avatar AI",
    ],

    "proof_kicker": "Pekerjaan terpilih",
    "proof_head": "Sistem yang telah beroperasi.",
    "proof": [
        ("Co-pilot AI untuk kinerja tim",
         "Jasa profesional, Singapura",
         "Co-pilot AI personal bagi pekerja pengetahuan di UKM, dengan "
         "empat mode penalaran dan koordinasi antar-rekan lintas "
         "departemen. API produksi beroperasi di Cloudflare Workers "
         "dengan perutean multi-LLM, speech-to-text, dan konteks "
         "organisasi berlapis."),
        ("Platform ERP multi-tenant",
         "Enterprise, Singapura &amp; Indonesia",
         "Backend ERP Java 21 / Spring Boot dengan mesin kepatuhan "
         "penggajian Singapura. 51 REST controller dan 484 kelas "
         "perhitungan, diverifikasi oleh 7.060 pengujian otomatis serta "
         "harness akuntansi lima mesin yang menghitung ulang setiap "
         "laporan secara independen."),
        ("Platform kesehatan milik pasien",
         "Kesehatan, Indonesia &amp; Asia Tenggara",
         "Platform kesehatan trilingual yang dioperasikan dari Singapura "
         "dengan residensi data khusus Singapura. Pelacakan gaya hidup, "
         "pendaftaran asuransi, dan penasihat AI telah beroperasi; "
         "brankas kesehatan lintas negara dan portal dokter sedang "
         "dibangun."),
        ("Sistem operasi perdagangan kendaraan",
         "Perdagangan lintas negara, Jepang",
         "Pembangunan ulang menyeluruh sistem operasional eksportir "
         "kendaraan internasional — persediaan, CRM berbasis peran, "
         "pembuatan dokumen proforma dan faktur komersial, instruksi "
         "pengiriman, serta perutean pembayaran dua tingkat. Telah "
         "beroperasi penuh."),
    ],
    "process_kicker": "Cara kami bekerja",
    "process_head": "Dari strategi ke produksi dalam 90 hari.",
    "process": [
        ("Minggu 1–2", "Penemuan &amp; kesiapan AI",
         "Laporan Peluang AI &amp; proyeksi ROI"),
        ("Minggu 3–4", "Arsitektur solusi",
         "Arsitektur teknis &amp; rencana implementasi"),
        ("Minggu 5–8", "Bukti konsep",
         "PoC berfungsi dengan kapabilitas inti"),
        ("Minggu 9–11", "Penerapan produksi",
         "Sistem produksi siap digunakan"),
        ("Minggu 12+", "Optimalisasi &amp; dukungan",
         "Laporan kinerja &amp; rekomendasi"),
    ],
    "stack_kicker": "Teknologi",
    "stack": [
        ("AI", "OpenAI GPT-4 · Anthropic Claude · ElevenLabs · HeyGen"),
        ("Cloud", "Cloudflare Workers · AWS Bedrock, SageMaker, Lambda"),
        ("Backend", "TypeScript · Java Spring Boot · PostgreSQL · Redis"),
        ("Frontend", "React · TanStack Start · Tailwind"),
    ],

    "cta_kicker": "Langkah berikutnya",
    "cta_head": "Mari susun 90 hari pertama Anda.",
    "cta_body": (
        "Ceritakan proses mana yang paling menguras waktu atau biaya "
        "Anda. Kami akan kembali dengan pandangan jujur tentang apa yang "
        "bisa dan tidak bisa dilakukan AI serta perangkat lunak khusus "
        "untuk masalah itu — termasuk rencana hibah bila Anda memenuhi "
        "syarat."
    ),
    "cta_offer": "Konsultasi gratis 30 menit · Tanpa komitmen",
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
        "UKM Singapura dapat memperoleh potongan hingga 50% dari biaya "
        "proyek yang memenuhi syarat melalui Productivity Solutions Grant "
        "(PSG), ditambah SGD 10.000 melalui SkillsFuture Enterprise "
        "Credit (SFEC). Kami menyiapkan dan mengajukan dokumennya tanpa "
        "biaya tambahan. Kelayakan dipastikan terhadap kriteria IMDA dan "
        "Enterprise Singapore yang berlaku pada saat pengajuan."
    ),
    "footer_conf": (
        "Dokumen ini memuat informasi rahasia komersial dan ditujukan "
        "hanya untuk penerima yang disebutkan."
    ),
}
