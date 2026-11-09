import type { Messages } from "./en";

/**
 * Traditional Chinese — Taiwan and Hong Kong.
 *
 * Not a character conversion of the Simplified file. Taiwan technical
 * vocabulary differs in substance: 軟體 not 软件, 專案 not 项目, 資料 not 数据,
 * 網路 not 网络. Converting characters alone produces text that is readable
 * but obviously written for the mainland.
 *
 * Reviewed for fluency and claims on 9 Nov 2026 (AI review); a native speaker's pass is still welcome.
 */
export const zhHant: Messages = {
  nav: {
    work: "案例",
    practices: "服務",
    solutions: "解決方案",
    industries: "產業",
    approach: "合作流程",
    contact: "聯絡我們",
    letsTalk: "預約洽談",
    openMenu: "開啟選單",
    closeMenu: "關閉選單",
    language: "語言",
    ask: "諮詢我們",
  },

  hero: {
    eyebrowShort: "新加坡 · 服務全球",
    eyebrowFull: "新加坡 · 成立於 2021 年 · 服務全球",
    headlineLead: "我們既懂",
    headlineBusiness: "業務",
    headlineAnd: "也懂",
    headlineTech: "技術",
    sub: "我們開發客製化軟體，協助您鞏固競爭優勢。",
    ctaPrimary: "預約洽談",
    ctaWork: "查看案例",
    ctaDeck: "下載公司簡介",
    languagesAvailable: "其他語言版本：",
    readInLanguage: "以{language}閱讀本頁",
    ctaAsk: "向我們提問",
    note: "免費，無需事先準備需求文件——帶著最耗費您時間的那個流程來就好。如果軟體並不是合適的解決辦法，我們會直接告訴您。",
    proof: {
      yearsFigure: "20+",
      yearsLabel: "年商業與技術經驗",
      testsFigure: "7,060",
      testsLabel: "項自動化測試（內部 ERP 專案，未部署）",
      jurisdictionsFigure: "2",
      jurisdictionsLabel: "個司法管轄區",
      languagesFigure: "7",
      languagesLabel: "種網站語言版本",
    },
    card: {
      role: "董事總經理",
      tagline: "業務 · 財務 · 技術",
      country: "新加坡",
      uen: "UEN 202110461R",
      workingIn: "工作語言",
    },
  },

  qualify: {
    eyebrow: "我們承接的專案",
    title: "我們最能發揮作用的幾種情況",
    sub: "我們的專案大多始於以下某種情況。即使您的情況不太一樣，也值得通個電話——關鍵在於問題本身的性質，而不在於所屬的產業。",
    fits: [
      {
        headline: "營運還靠試算表和聊天訊息在運作",
        body: "庫存記在一處，收付款記在另一處，決策散落在群組對話裡。十個人的時候還行得通，如今卻成了阻礙成長的瓶頸。",
      },
      {
        headline: "之前找過廠商，結果沒能用起來",
        body: "您花錢買了一套系統，團隊卻不願意用。您對從頭再來心存顧慮，想知道這次究竟有什麼不同。",
      },
      {
        headline: "業務橫跨多個國家",
        body: "向全球出口的日本企業；在亞洲設有據點的歐美公司；在印尼聘用人員的新加坡企業。不同的貨幣、稅制與申報時程要放進同一套系統——而且沒有哪家廠商不必從頭解釋，就能同時理解兩端。",
      },
      {
        headline: "數字必須正確，不能只是大致正確",
        body: "發票、收款、庫存——這些環節容不得「差不多」，出錯的代價比延誤更高。",
      },
    ],
    regions: [
      "在柔佛或柔新經濟特區（JS-SEZ）設有營運據點嗎？我們開發能夠跨境運作的系統，例如目前已在日本客戶那裡上線使用的出口系統。",
      "由新加坡統籌管理的菲律賓與越南團隊，我們同樣提供支援。",
    ],
    japanSite: null,
    pricing:
      "關於價格：第一次通話時我們會給出價格區間，需求盤點之後給出確定報價，而不是憑一封電子郵件隨口報個數字。如果現成工具已經能滿足需求，我們會直接告訴您用哪一套——這比我們為您開發任何東西都更省錢。",
    pricingLead: "關於價格：",
  },

  work: {
    eyebrow: "精選案例",
    title: "兩套客戶系統，外加一套內部自行開發的系統",
    sub: "我們以企業主的角度來介紹：這家公司原本實際上是怎麼做的，過程中又遇到了哪些問題。第三個是我們自己的內部專案，已完成測試，但尚未部署。",
    before: "先前狀況",
    built: "我們做了什麼",
    result: "成果",
    details: "詳情",
    demosLine:
      "想親眼看看系統運作，而不只是讀介紹？我們準備了 {count} 個可實際操作的示範，直接在瀏覽器中以範例資料執行。",
    demosLink: "試用這些示範",
    disclaimer:
      "凡涉及保密約定的專案，均不揭露客戶名稱。文中數字均取自系統本身，可在通話中詳細說明。",
    cases: [
      {
        sector: "跨境貿易",
        market: "日本",
        title: "一家靠試算表和 WhatsApp 運作的車輛出口商",
        before:
          "庫存放在 Airtable，收付款靠人工在 Excel 裡對帳，客戶溝通分散在 WhatsApp 的各個對話中。先前一家海外外包廠商交付的 CRM，團隊用不起來，最後只拿來展示車輛。",
        built:
          "營運系統全面重建：庫存、依角色限定權限的 CRM、形式發票與商業發票的自動產生、裝運指示、銀行對帳單匯入，以及兩層收款分配。",
        metric: { figure: "2", caption: "個會造成金錢損失的缺陷，在上線前就被發現" },
        detail: [
          "重複匯入銀行對帳單時，收款會在毫無提示的情況下重複入帳——多數日本銀行不提供轉帳編號，因此去重鍵一直是空的。現已改為依紀錄內容決定性產生的鍵值。",
          "客戶頁面會向個別業務人員顯示全公司的營收總額。此問題在測試中發現並修正，並由兩名業務針對同一客戶完成驗證。",
          "五種角色，權限各自獨立：管理員、主管、業務、稅務會計、客戶。",
        ],
      },
      {
        sector: "AI 導入",
        market: "新加坡",
        title: "依據公司自有文件作答的 AI 助理",
        before:
          "通用聊天機器人對中小企業的知識工作者毫無用處：它不了解對方的職務、所屬產業，也不知道公司已經做出的決定。",
        built:
          "一套 AI 助理，具備四種推理模式、分層的組織脈絡（產業、組織、職務、個人）、針對客戶自行上傳文件的檢索，以及跨部門的點對點協作。",
        metric: { figure: "2026", caption: "已交付客戶，專案於當年完成" },
        detail: [
          "透過抽象層實現多 LLM 路由——依客戶指示在不同供應商之間切換預設模型，不必更動任何產品程式碼。",
          "會議語音轉文字，並將待辦事項擷取為任務。",
          "以 Cloudflare Workers 打造，使用 D1、KV、R2 與 Vectorize。",
        ],
      },
      {
        sector: "內部開發",
        market: "已測試，未部署",
        title: "一套自行開發的 ERP，用來展示我們如何測試",
        before:
          "涉及金額計算的軟體，展示容易，要讓人信任卻很難：多半只做抽測，有些甚至完全不測。我們希望在任何客戶倚賴我們的程式碼之前，先用一個夠大的自有專案，證明我們的測試方法。",
        built:
          "以 Java 21 與 Spring Boot 打造的多租戶 ERP 後端。這是內部開發專案：已測試，但尚未為任何客戶部署。",
        metric: { figure: "7,060", caption: "涵蓋 484 個計算類別的自動化測試" },
        detail: [
          "測試結果來自 2026 年 8 月的執行，涵蓋該系統全部 484 個計算類別。",
          "115 個 REST 控制器。多幣別、多租戶、角色權限控管、稽核紀錄。",
          "僅作為我們如何打造與測試複雜系統的佐證。它並非已部署的客戶系統，我們也不對其準確性做任何聲明。",
        ],
      },
    ],
  },

  showcase: {
    eyebrow: "親自試用",
    title: "13 個示範系統，任選一個，看它實際運作。",
    sub: "下方每張卡片都是可實際操作的示範，而不是示意圖。點開任一個，即可立即看到範例結果。",
    sampleBadge: "範例",
    tryIt: "立即試用",
    seeAll: "查看全部解決方案",
    disclaimer:
      "所有範例均使用虛構資料。想看它在您自己的流程中如何運作，傳一份試算表給我們即可，完全免費。",
    teasers: {
      invoiceScanner: "數秒內完成掃描與逐項辨識",
      customerChatbot: "回答可信度",
      appointmentBooking: "自動預約並確認",
      quotationGenerator: "報價單已產生，含 GST",
      jobPostingWriter: "條職缺要求已擬好",
      inventoryTracker: "項商品已標記需補貨",
      socialMediaManager: "則多平台貼文一次擬好",
      documentTranslator: "種語言，一鍵翻譯",
      employeeOnboarding: "項到職任務已排定",
      salesAssistant: "封後續追蹤郵件已排程",
      complianceChecker: "條高風險條款已找出",
      trainingContentGenerator: "個訓練模組已建立",
      financialReportBuilder: "季度淨利與解讀",
    },
  },

  practices: {
    eyebrow: "服務",
    title: "四大專業領域，同一支交付團隊",
    sub: "我們不求廣泛涉獵二十個方向，只把四個領域做深做透。每個領域都由負責人親自主導，並視工作需要配置專業人員。",
    details: "詳情",
    items: [
      {
        title: "AI 導入",
        description:
          "針對貴公司自有文件的檢索、依特定領域調校的模型，以及自動化流程——並配備防護機制與來源標註，讓輸出結果能用於受監管的業務。",
        details: [
          "檢索增強生成（RAG），以向量搜尋查找貴公司的專屬資料",
          "透過抽象層實現多供應商路由——更換模型不必更動產品程式碼",
          "信心分數並標註來源，答案可供查證",
          "防止 AI 幻覺的防護機制與法遵審查",
        ],
      },
      {
        title: "業務系統",
        description:
          "營運平台、CRM、庫存、文件與工作流程，取代試算表與彼此不相通的工具——依經得起稽核的標準打造，而不只是為了展示。",
        details: [
          "庫存、交易、文件與收付款集中在一套系統，不再仰賴試算表和聊天紀錄",
          "多租戶、多幣別、角色存取控管、可供稽核的日誌紀錄",
          "從您現有的試算表起步，支援 Excel 與 Google 試算表的匯入匯出",
          "部署在貴公司自己的雲端帳戶、資料庫與程式碼儲存庫",
        ],
      },
      {
        title: "財務流程",
        description:
          "開立發票、銀行對帳單匯入、對帳與單據產生，全程保留會計師可追溯的稽核軌跡。",
        details: [
          "跨帳戶、跨幣別的自動對帳，並採用決定性去重",
          "銀行對帳單匯入，包括不帶轉帳編號的格式",
          "形式發票、商業發票與裝運文件由同一筆紀錄產生",
          "透過經認證的存取點，從您開立發票所用的系統或試算表發送 InvoiceNow 電子發票",
        ],
      },
      {
        title: "跨境營運",
        description:
          "為在新加坡、日本及鄰近地區之間進行貿易的企業打造多幣別、多語言系統，始終以各國規則為優先。",
        details: [
          "資料存放地點在架構設計階段就確定，而不是等審查後才回頭補救",
          "多種貨幣、稅制與單據格式整合在同一套系統",
          "介面與單據支援英文、日文、中文、馬來文或印尼文",
          "已在日本一家出口商上線運作：庫存、交易、單據與收付款",
        ],
      },
    ],
  },

  industries: {
    eyebrow: "產業",
    title: "產業專長",
    sub: "深入了解您所屬產業在法規、營運與技術層面的要求。",
    items: [
      {
        name: "貿易與物流",
        description:
          "為業務規模已超出試算表負荷的貿易、批發與物流企業，管理庫存、交易、裝運文件與收付款。",
        details: [
          "庫存與交易集中管理，每個角色只看到與自己相關的畫面",
          "形式發票、商業發票與裝運指示由同一筆紀錄產生",
          "銀行對帳單匯入與跨幣別對帳",
          "面向海外客戶的貨運追蹤與買家入口網站",
        ],
      },
      {
        name: "金融與銀行",
        description: "為財務團隊及服務他們的機構，提供文件處理、對帳、保險文件與風險核查。",
        details: [
          "即時交易監控與異常偵測",
          "以文件 AI 讀取對帳單、保單與理賠資料，每個數字都標明出處",
          "跨帳戶、跨幣別的自動對帳",
          "AI 驅動的信用評分與風險評估",
        ],
      },
      {
        name: "教育",
        description: "具備 AI 輔導、適性測驗、認證管理與多語授課的學習管理系統（LMS）。",
        details: [
          "依學生表現調整的適性學習路徑",
          "AI 產生測驗並自動批改",
          "多語內容傳遞，搭配語音合成",
          "證照追蹤與資格管理",
        ],
      },
      {
        name: "政府與公部門",
        description:
          "為公部門打造安全、符合法規的解決方案：民眾服務自動化，以及不容中斷的關鍵任務系統。",
        details: [
          "具數位身分驗證的民眾服務入口網站",
          "許可、執照及各類申請的文件處理",
          "可供稽核的紀錄與法遵報告",
          "關鍵服務的高可用性基礎架構",
        ],
      },
      {
        name: "製造",
        description: "ERP 系統、預測性維護、供應鏈最佳化與品檢自動化。",
        details: [
          "整合物聯網感測器，實現預測性維護",
          "供應鏈可視化與即時追蹤",
          "以電腦視覺進行品質檢驗",
          "生產排程與產能規劃",
        ],
      },
      {
        name: "電子商務",
        description: "AI 推薦、虛擬助理、客服自動化與庫存管理。",
        details: [
          "以協同過濾為基礎的個人化商品推薦",
          "全年無休、24 小時提供客服的 AI 聊天機器人",
          "依需求與競品分析進行動態定價",
          "結合季節性趨勢偵測的庫存預測",
        ],
      },
    ],
  },

  approach: {
    eyebrow: "合作流程",
    title: "從需求盤點到正式上線，約十二週",
    sub: "每個專案都依循同樣的五個步驟，動手寫程式之前，先以書面確認範圍與費用。我們負責實際執行，而不只是提供建議。",
    deliverable: "交付成果",
    step: "前往步驟",
    previous: "上一步",
    next: "下一步",
    items: [
      {
        week: "第 1–2 週",
        title: "需求盤點與 AI 準備度評估",
        items: [
          "業務目標與痛點分析",
          "既有系統與資料評估",
          "找出影響最大的 AI 應用機會",
          "定義成功指標與 KPI",
        ],
        deliverable: "AI 機會報告與投資報酬試算",
      },
      {
        week: "第 3–4 週",
        title: "解決方案架構",
        items: [
          "AI 解決方案架構設計",
          "模型與平台選型",
          "系統整合規劃",
          "資料管線與資安規範",
        ],
        deliverable: "技術架構與導入計畫",
      },
      {
        week: "第 5–8 週",
        title: "概念驗證",
        items: [
          "以真實資料建立的可用雛型",
          "AI 模型訓練與微調",
          "核心功能實作",
          "使用者測試與回饋",
        ],
        deliverable: "具備核心功能的可用概念驗證（PoC）",
      },
      {
        week: "第 9–11 週",
        title: "正式上線",
        items: [
          "系統擴充至正式環境規模",
          "資安、監控與備份",
          "負載測試與效能調校",
          "人員教育訓練與文件撰寫",
        ],
        deliverable: "可供使用者使用的正式系統",
      },
      {
        week: "第 12 週起",
        title: "最佳化與支援",
        items: [
          "效能監控與回饋",
          "模型持續改進",
          "功能強化",
          "持續的技術支援",
        ],
        deliverable: "效能報告與改善建議",
      },
    ],
  },

  objections: {
    eyebrow: "坦白回答",
    title: "值得先問清楚的問題",
    sub: "我們最常被問到的問題，據實回答——包括有時誠實的答案是「您應該再等等」。",
    items: [
      {
        said: "我們之前花錢做過一次，結果用不起來。這次有什麼不同？",
        answer:
          "通常問題不在開發本身，而在需求——動手寫程式之前，沒有人坐下來跟實際做這份工作的人好好談過。所以我們先做需求盤點，無論之後是否繼續合作，這份成果都歸貴公司所有。如果原有系統還有救，我們會直說；把一套大致堪用的系統打掉重寫，是在浪費您的錢。",
        proof: "前面提到的車輛出口系統重建，一開始正是這樣的補救專案。",
      },
      {
        said: "萬一你們無法繼續服務，系統怎麼辦？",
        answer:
          "核心程式由負責人親自撰寫，並視工作需要引入專業人員。真正保障您的不是團隊人數，而是系統有文件、有測試，並且部署在您自己擁有的基礎架構上——您的 Cloudflare 帳戶、您的資料庫、您的程式碼儲存庫。測試寫明了系統應該做什麼，所以其他工程師也接得下去。",
        proof: "我們內部 ERP 專案中，涵蓋 484 個計算類別的 7,060 項自動化測試。",
      },
      {
        said: "這樣一套系統通常要多少錢？",
        answer:
          "第一次通話時給出價格區間，需求盤點之後給出確定報價。我們會盡早說出真實的數字，而不是拖到最後；接著與您一起縮減範圍，直到符合預算——能上線的小系統，勝過半途停擺的大系統。新加坡中小企業或可獲得 EDGE 補助（已取代 PSG）；我們會協助您確認專案是否符合資格，並免費準備我方的供應商文件。",
        proof: "EDGE 補助由新加坡企業發展局（Enterprise Singapore）審核決定，StarTech 並非 EDGE 預先核准的供應商。",
      },
      {
        said: "再等一兩季，會有什麼代價嗎？",
        answer:
          "有時並沒有，那我們就會直說。與其在問題還不急的時候簽約，我們寧可您等到問題真正緊迫時再來找我們。值得一提的是：等待的成本通常不在軟體本身，而在這段期間的人工對帳和因此產生的錯誤。如果您願意，我們可以在通話中把這筆帳算清楚，讓您看著具體數字再做決定。",
      },
      {
        said: "我們需要花多少工夫解釋自己的業務？",
        answer:
          "這正是我們這家公司存在的意義。您不必解釋什麼是試算平衡表、稅務發票上該列哪些項目，或某筆款項為什麼要這樣對帳。就像跟您的會計師交代事情那樣，跟我們說明即可。",
        proof: "在商業與技術兩方面都有二十多年經驗。",
      },
    ],
  },

  capabilityDeck: {
    eyebrow: "隨時查閱",
    title: "我們的完整介紹，彙整在一份文件裡。",
    sub: "本頁的每項服務、每個佐證、每個數字。",
    cta: "下載公司能力簡介",
  },

  contact: {
    eyebrow: "聯絡我們",
    title: "三十分鐘，給您一個坦白的答覆",
    sub: "告訴我們這個流程目前讓您付出多少成本，我們會告訴您哪些值得開發。",
    email: "電子郵件",
    phone: "電話",
    reassurance:
      "無需任何承諾。無論之後是否繼續合作，需求盤點的成果都歸您所有。",
    name: "姓名",
    company: "公司名稱",
    message: "留言內容",
    messagePlaceholder: "請簡單介紹一下您的專案…",
    send: "送出留言",
    sending: "傳送中…",
    success: "感謝您的來信，我們會盡快回覆。",
    error: "傳送失敗，請再試一次，或直接寄電子郵件給我們。",
    country: "國家或地區",
    staff: "員工人數",
    staffPick: "請選擇人數",
    staffOptions: ["10 人以下", "10 至 50 人", "51 至 200 人", "200 人以上"],
    spreadsheet: "您的試算表（選填）",
    spreadsheetHint:
      "支援 Excel、CSV 或 Numbers 格式，最大 10 MB。請先刪除機密內容；提供部分樣本資料列即可。",
    fileTooLarge: "檔案超過 10 MB，請只傳送其中一部分。",
  },

  // /flyer 數位傳單。內容不超出公司能力簡介的範圍。
  flyer: {
    eyebrow: "新加坡 · 日本 · 服務全球",
    headline: "從試算表，到系統。",
    who: "適合 10 至 200 人規模、仍靠試算表運作，或正在使用一套廠商沒做完的系統的企業。我們開發真正支撐您日常營運的軟體，每一部分都歸您所有。",
    ctaOffer: "傳一份試算表給我們",
    ctaDeck: "下載公司簡介",
    proofEyebrow: "三個事實",
    proof: [
      {
        lead: "已在日本上線",
        detail:
          "一家中古車出口商的業務運作在我們開發的系統上：庫存、CRM、發票、出貨文件與收款。目前正在客戶的正式環境中運作。",
      },
      {
        lead: "7,060 項測試",
        detail:
          "我們自行開發的 ERP 中，涵蓋 484 個計算類別的自動化測試，結果來自 2026 年 8 月的測試執行。這是內部專案，尚未部署，我們不對其準確性做任何聲明。",
      },
      {
        lead: "歸您所有",
        detail:
          "程式碼由創辦人親自撰寫。雲端帳戶、資料庫與程式碼儲存庫從第一週起就在您的名下，任何廠商都無法挾持您的業務。",
      },
    ],
    demosEyebrow: "先試用，再決定",
    demosTitle: "可實際操作的示範，不是投影片",
    demosSub: "{count} 個小型系統，可直接在瀏覽器中以範例資料執行。以下三個適用範圍最廣。",
    demoOpen: "開啟示範",
    demosAll: "查看全部 {count} 個示範",
    invoiceNowLink: "InvoiceNow：查看由試算表產生的電子發票範例",
    offerEyebrow: "我們的提議",
    offerTitle: "傳一份試算表給我們，我們把它做成可運作的系統給您看。",
    offerBody:
      "選一份支撐您業務運作的試算表：報價、庫存、工單、配送，什麼都可以。兩週內，您就能看到它變成一套載入您自己資料的可運作系統，並得到明確答覆：完整開發要花多少費用。",
    offerPoints: ["免費，無需承諾", "每月限 3 至 5 家企業", "示範中建置的成果歸您所有"],
    formEyebrow: "從這裡開始",
    formTitle: "一份試算表，一張表單",
    formSub: "告訴我們這份試算表目前幫您處理什麼。我們會在兩個工作天內回覆。",
    formReassurance:
      "您的檔案將私密保存，僅由一人查閱，並可應您要求刪除。不會與他人分享，也不會出售。",
    formSend: "傳送試算表",
    messagePlaceholder: "這份試算表在業務中扮演什麼角色？在哪些地方會出問題？",
    deckLine: "下載 8 頁公司能力簡介，無需留下電子郵件。",
    grantsLabel: "新加坡企業：",
    grantsLine: "我們會協助您確認專案是否符合 EDGE 補助的申請條件。",
    backHome: "返回主網站",
  },

  testimonial: {
    eyebrow: "客戶評價",
    title: "與 StarTech 合作的體驗如何？",
    intro: "您對專案的一兩句評價，能幫助其他企業判斷是否與我們合作。在您查看並核准最終文字之前，我們不會發布任何內容。",
    name: "您的姓名",
    role: "您的職位",
    company: "公司",
    email: "電子郵件",
    quote: "您的評價",
    quotePlaceholder: "您當時需要解決什麼問題？專案進展如何？之後有什麼改變？",
    quoteHint: "一到三句話就足夠了。",
    credit: "您希望我們如何署名？",
    creditFull: "姓名、職位和公司",
    creditAnonymous: "僅顯示職位和產業，不顯示姓名",
    creditPrivate: "僅作回饋，請勿發布",
    consent: "我同意 StarTech 因篇幅需要刪減內容；StarTech 會在發布前讓我確認最終文字。",
    send: "送出評價",
    sending: "送出中…",
    thanksTitle: "謝謝您！",
    thanksBody: "我們已收到您的評價。在任何內容上線之前，我們會把最終文字寄給您確認。",
    errorRequired: "請填寫此欄。",
    errorEmail: "請輸入有效的電子郵件地址。",
    errorQuoteShort: "請至少寫一句話（20 個字元）。",
    errorConsent: "請勾選此項以繼續。",
    error: "發生問題，請再試一次。",
  },
  invoicenow: {
    eyebrow: "InvoiceNow · 新加坡",
    headline: "用您現有的系統，直接傳送 InvoiceNow 電子發票",
    lead: "InvoiceNow 是新加坡的電子發票網路，新加坡國內稅務局（IRAS）正分階段要求所有 GST（消費稅）註冊企業採用。我們把您開立發票所用的系統或試算表，連接到 InvoiceNow 存取點。",
    ctaDemo: "試用範例發票",
    ctaFlyer: "傳一份試算表給我們",
    whatEyebrow: "它是什麼",
    whatTitle: "InvoiceNow 簡明說明",
    what: [
      {
        title: "是資料檔案，不是 PDF",
        body: "InvoiceNow 發票是一種結構化檔案（Peppol PINT SG，XML 格式），買方系統可以直接讀取，無需任何人重新輸入。",
      },
      {
        title: "透過 Peppol 網路傳送",
        body: "您的發票先傳送到存取點，存取點依買方的 Peppol ID（由其 UEN 產生）找到對方，再遞送到買方的存取點。",
      },
      {
        title: "同時抄送 IRAS",
        body: "對於 GST 註冊企業，存取點還會把發票資料傳送給 IRAS。賣方、買方及雙方的存取點構成四角模型，IRAS 是第五角。",
      },
    ],
    whoEyebrow: "誰必須使用，何時開始",
    whoTitle: "IRAS 正在分階段對所有 GST 註冊企業推行",
    whoIntro: "根據 IRAS 的規定，GST 註冊企業須自以下日期起，透過 InvoiceNow 向 IRAS 傳送發票資料：",
    phases: [
      { date: "2025年11月1日", text: "在註冊成立後 6 個月內自願註冊 GST 的公司。" },
      { date: "2026年4月1日", text: "自該日起申請自願註冊 GST 的所有企業。" },
      { date: "2028年4月1日", text: "自該日起申請強制註冊 GST 的企業，以及年供應額不超過 S$200,000 的現有 GST 註冊企業。" },
      { date: "2029年4月1日", text: "年供應額不超過 S$100 萬的現有 GST 註冊企業。" },
      { date: "2030年4月1日", text: "年供應額不超過 S$400 萬的現有 GST 註冊企業。" },
      { date: "2031年4月1日", text: "年供應額超過 S$400 萬的現有 GST 註冊企業。" },
    ],
    whoNote: "IRAS 依 2025 年申報的供應額劃分級距，並正在通知現有企業各自的開始日期。實際情況請查閱 IRAS 頁面。",
    whoSource: "IRAS：GST InvoiceNow 要求（頁面最後更新於 2026 年 10 月 8 日）",
    accountant: "我們只做軟體整合。InvoiceNow 是否適用於您，以及每一筆發票明細的 GST 處理方式，請向您的會計師或 IRAS 確認。",
    offerEyebrow: "我們做什麼",
    offerTitle: "我們把您開立發票所用的系統或試算表，連接到 InvoiceNow 存取點。",
    offerBody: "如果您用自建系統、舊版 ERP 或試算表開立發票，IRAS 給出的做法是透過經認證的存取點連線。我們負責建置這個連線：把您的發票資料對應到 PINT SG，透過存取點的 API 傳送，並把傳送狀態回傳到您日常使用的介面。",
    offerPoints: [
      "發票資料對應到 PINT SG",
      "透過存取點的 API 傳送",
      "傳送狀態與錯誤顯示在您日常使用的介面",
    ],
    offerHonest: "StarTech 不是存取點服務商，也未獲得 IMDA 認證。正式連線須透過我們與您共同選定、經 IMDA 認證的存取點進行。",
    demoEyebrow: "試一試",
    demoTitle: "把範例發票轉換成 PINT SG XML",
    demoIntro: "填寫發票，或上傳 CSV 範本。瀏覽器會產生 XML，並依部分 PINT SG 規則進行檢查。資料不會傳送到任何地方。",
    sampleBadge: "範例資料，並非有效的稅務發票",
    csvTitle: "從試算表開始",
    csvHint: "每筆發票明細占一列，每列重複填寫發票與買方資訊。賣方資訊仍在下方表單中填寫。",
    csvDownload: "下載 CSV 範本",
    csvUpload: "上傳 CSV 檔案",
    csvLoaded: "已從檔案載入 {count} 列。",
    csvSkipped: "檔案中另有 {count} 個發票號碼；只載入了第一張發票。",
    csvErrorEmpty: "該檔案是空的。",
    csvErrorColumns: "檔案缺少以下欄位：{columns}",
    csvErrorRows: "檔案只有標題列，沒有發票明細。",
    csvErrorRead: "無法讀取該檔案。",
    loadValid: "填入有效範例",
    loadBroken: "填入含錯誤的範例",
    invoiceSection: "發票資訊",
    sellerSection: "賣方（您的企業）",
    buyerSection: "買方",
    linesSection: "發票明細",
    fields: {
      invoiceNumber: "發票號碼",
      issueDate: "開票日期",
      dueDate: "付款到期日",
      buyerReference: "買方參考號或採購訂單號",
      paymentTerms: "付款條件",
      name: "註冊名稱",
      uen: "UEN（唯一實體編號）",
      gstRegNo: "GST 註冊號碼",
      street: "街道地址",
      postalCode: "郵遞區號",
      description: "品名",
      quantity: "數量",
      unit: "單位",
      unitPrice: "單價（S$）",
      gstCategory: "GST 類別",
      lineAmount: "明細金額",
    },
    units: {
      H87: "件",
      HUR: "小時",
      DAY: "天",
      MON: "月",
    },
    categories: {
      SR: "SR · 標準稅率 9%",
      ZR: "ZR · 零稅率",
      ES33: "ES33 · 免稅（第 33 條）",
      ESN33: "ESN33 · 免稅（其他）",
      OS: "OS · 不在課稅範圍",
      NG: "NG · 賣方未註冊 GST",
    },
    categoryNote: "類別代碼來自 PINT SG 代碼表。某一筆明細適用哪個類別，請諮詢您的會計師。",
    addLine: "新增明細",
    removeLine: "刪除第 {n} 筆",
    lineLabel: "第 {n} 筆",
    errorNumber: "請輸入數字，例如 12.50，最多 4 位小數。",
    errorQuantity: "請輸入大於零的數量，最多 4 位小數。",
    errorDate: "請依 YYYY-MM-DD 格式輸入日期。",
    generate: "產生 XML 並執行檢查",
    generating: "正在產生…",
    resultEyebrow: "結果",
    totalsTitle: "合計",
    totals: {
      net: "不含 GST 合計",
      gst: "GST 金額",
      payable: "應付金額",
    },
    checksTitle: "檢查項",
    checksSummary: "{total} 項檢查中，{passed} 項通過",
    pass: "通過",
    fail: "未通過",
    demoCheck: "StarTech 示範用檢查，並非 PINT SG 規則",
    checksSource: "規則編號來自 2026 年 5 月 25 日發布的 PINT SG Billing v1.4.1 schematron。這裡只是在瀏覽器中執行的部分檢查；正式傳送前，存取點會執行完整驗證。",
    checks: {
      specIds: "規範識別碼與業務流程識別碼均為 PINT SG 開票（Billing）",
      invoiceNumber: "發票有號碼",
      issueDate: "有開票日期，且所有日期均為 YYYY-MM-DD 格式",
      dueOrTerms: "有應付金額，因此提供了付款到期日或付款條件",
      buyerReference: "提供了買方參考號或採購訂單號",
      currency: "發票幣別為 SGD，且沒有另設稅務幣別",
      sellerName: "提供了賣方註冊名稱",
      buyerName: "提供了買方註冊名稱",
      sellerEndpoint: "賣方有 Peppol 位址（編碼方案 0195，由 UEN 產生）",
      buyerEndpoint: "買方有 Peppol 位址（編碼方案 0195，由 UEN 產生）",
      sellerLegalId: "已提供賣方 UEN 作為其法定註冊號碼",
      sellerGstId: "收取了 GST，因此提供了賣方 GST 註冊號碼",
      sellerAddress: "提供了賣方街道地址和郵遞區號",
      buyerAddress: "提供了買方街道地址和郵遞區號",
      countries: "賣方和買方地址都帶有國家代碼",
      uuid: "發票有格式正確的唯一識別碼（UUID）",
      linesNamed: "至少有一筆明細，且每筆都有品名",
      lineCategories: "每筆明細都有有效的新加坡 GST 類別代碼",
      lineAmounts: "每筆明細金額等於數量 × 單價",
      netTotals: "不含 GST 合計等於各明細金額之和",
      gstAmounts: "各類別 GST 等於應稅金額 × 稅率，並與 GST 總額相符",
      payable: "含 GST 合計與應付金額相符",
      decimals: "所有金額都不超過 2 位小數",
      noGst: "未註冊 GST（NG）的明細沒有與 GST 明細混用",
      noGstNumber: "含 NG 明細的發票沒有填寫賣方 GST 號碼",
      uenFormat: "兩個 UEN 的格式都正確",
    },
    xmlTitle: "產生的 XML",
    download: "下載 XML",
    nextEyebrow: "接下來會發生什麼",
    nextTitle: "這個檔案實際上如何傳送",
    next: [
      {
        title: "您的系統產生檔案",
        body: "在正式連線中，每次開立發票時，XML 都由您自己的發票資料產生，不需要手動輸入。",
      },
      {
        title: "傳送到存取點",
        body: "您的系統透過該服務商的 API，把檔案傳送到經 IMDA 認證的存取點。存取點會執行完整的 PINT SG 驗證。",
      },
      {
        title: "買方收到發票",
        body: "存取點透過 Peppol 目錄找到買方的存取點，把發票送進買方的系統。",
      },
      {
        title: "IRAS 收到副本",
        body: "提交功能開啟後，存取點還會把發票資料傳送給 IRAS，這就是第五角。",
      },
    ],
    nextNote: "本頁面沒有連線到任何存取點。正式連線會使用我們與您共同選定、經 IMDA 認證的存取點。",
    ctaTitle: "您現在用試算表開發票嗎？",
    ctaBody: "把您開立發票用的試算表傳給我們。我們會展示它如何對應到 InvoiceNow，並坦白告訴您連線需要做哪些工作。免費，無需承諾。",
    ctaButton: "傳送一份試算表",
    sourcesTitle: "資料來源",
    sourceIras: "IRAS：GST InvoiceNow 要求",
    sourcePint: "Peppol：PINT SG Billing v1.4.1 規範",
    sourceImda: "IMDA：InvoiceNow 介紹",
    backHome: "返回主網站",
  },

  singpass: {
    eyebrow: "Singpass 升級 · FAPI 2.0",
    title: "Singpass 登入必須在 2026 年 12 月 31 日前升級到 FAPI 2.0",
    intro:
      "如果您的網站或應用程式有「使用 Singpass 登入」按鈕，或透過 Myinfo 自動填寫表單，就必須在 2026 年底前升級到 Singpass 的新安全標準。",
    source: "Singpass 官方公布的截止日期",
    ctaCheck: "申請檢查您的整合",
    ctaDemo: "執行示範",
    changesEyebrow: "有哪些變化",
    changesTitle: "登入方式的五項變化",
    changes: [
      {
        lead: "請求提前傳送",
        detail:
          "您的伺服器先把登入請求傳送給 Singpass（PAR），使用者的瀏覽器只攜帶一個簡短的參照值，網址列中沒有任何可被竄改的內容。",
      },
      {
        lead: "每次登入一次性證明",
        detail:
          "您的伺服器證明登入由它發起（PKCE），因此被攔截的登入授權碼對他人毫無用處。",
      },
      {
        lead: "權杖繫結您的金鑰",
        detail:
          "授權碼和權杖只有搭配您伺服器持有的金鑰才能使用（DPoP）。外洩的權杖無法被重複使用。",
      },
      {
        lead: "身分資訊加密",
        detail:
          "每個 ID 權杖現在都以您的金鑰加密，NRIC 也改到了新欄位。讀取舊格式的程式碼將會失效。",
      },
      {
        lead: "更嚴格的重新導向與錯誤處理",
        detail:
          "不再接受自訂協定的應用程式連結；Login 應用程式必須說明每次登入的用途；Singpass 現在還會把錯誤傳回您的網站，網站必須處理這些錯誤。",
      },
    ],
    migrationLink: "Singpass 針對 Login 和 Myinfo（v5）應用程式的遷移指南",
    whoEyebrow: "受影響的對象",
    whoTitle: "所有使用 Singpass 登入或自動填寫個人資料的網站和應用程式",
    who: [
      "帶有「使用 Singpass 登入」的網站、入口網站和行動應用程式",
      "從 Myinfo 預先填入個人資料的表單",
      "2026 年 2 月之前建置的整合；此後註冊的應用程式從一開始就必須使用 FAPI 2.0",
      "Myinfo v3 和 v4 整合，Singpass 要求它們在 2026 年 9 月底前遷移到 Myinfo v5",
    ],
    corppass: "Corppass 登入另有較晚的截止日期：2027 年 3 月 31 日。",
    corppassLink: "Corppass 時間表",
    riskEyebrow: "如果不遷移",
    riskTitle: "請預先為舊登入方式失效做好準備",
    riskBody:
      "Singpass 要求所有整合在 2026 年 12 月 31 日前採用 FAPI 2.0，並已於 2026 年 7 月 14 日下架舊流程的文件。仍在使用舊流程的整合，應預計在截止日期後 Singpass 登入或 Myinfo 預填會失敗：使用者無法登入，表單也無法完成。",
    demoEyebrow: "可執行的參考示範",
    demoTitle: "完整的 FAPI 2.0 流程，在您的瀏覽器中執行",
    demoIntro:
      "示範針對我們專為此建置的模擬 Singpass 伺服器，執行真實的協定步驟。金鑰在您的瀏覽器中全新產生，人物為範例，不會向 Singpass 傳送任何內容。每個請求和回應都會顯示，權杖已截短。",
    demoNotice:
      "模擬伺服器：不是 Singpass，也未與 Singpass 或 GovTech 連線。同一套用戶端程式碼也能串接 Singpass 官方的 staging 環境：請用下方按鈕試試。",
    appType: "應用程式類型",
    appLogin: "Singpass 登入",
    appMyinfo: "Myinfo（v5）",
    run: "執行流程",
    runAgain: "再執行一次",
    running: "正在執行流程…",
    allPassed: "所有步驟均已通過。以下資料經由繫結此瀏覽器金鑰的授權碼和權杖，以加密並簽章的形式送達。",
    failed: "有一個步驟失敗，其請求和回應顯示在下方。",
    cancelled: "登入已取消。Singpass 會把錯誤傳回您的網站，網站顯示自己的提示訊息，而不是 Singpass 的錯誤原文。",
    details: "請求與回應",
    status: {
      pending: "未開始",
      running: "執行中",
      waiting: "等待操作",
      done: "通過",
      error: "失敗",
    },
    steps: {
      register: {
        title: "註冊應用程式",
        body: "瀏覽器產生一把簽章金鑰和一把加密金鑰，並把公鑰部分註冊到模擬伺服器，相當於在 Singpass Developer Portal 上的操作。",
      },
      discovery: {
        title: "讀取伺服器設定",
        body: "端點和演算法來自 OpenID 設定，而不是寫死的網址。",
      },
      session: {
        title: "產生本次登入專用的機密參數",
        body: "全新的 state、nonce、PKCE verifier（S256）和 DPoP 金鑰，只用於這一次登入，用完即丟棄。",
      },
      par: {
        title: "提前傳送請求（PAR）",
        body: "登入請求連同已簽章的用戶端斷言（private_key_jwt）和 DPoP 證明，先傳送到伺服器。伺服器傳回一個短時效的 request_uri。",
      },
      authorize: {
        title: "將使用者導向 Singpass",
        body: "網址中只包含 client_id 和 request_uri。在正式服務中，使用者此時會在 Singpass App 中核准登入。",
      },
      redirect: {
        title: "處理返回的導向",
        body: "在信任授權碼之前，先檢查 state 和 iss。",
      },
      token: {
        title: "用授權碼換取權杖",
        body: "傳送授權碼、PKCE verifier、新的用戶端斷言和新的 DPoP 證明。傳回的權杖繫結在 DPoP 金鑰上。",
      },
      idToken: {
        title: "解密並驗證 ID 權杖",
        body: "用您的加密金鑰解密，以伺服器公布的金鑰（JWKS）驗證簽章，再檢查 iss、aud、exp 和 nonce。",
      },
      userinfo: {
        title: "取得 Myinfo 資料",
        body: "使用 Authorization: DPoP，並附上繫結存取權杖的證明（ath）。回應同樣經過加密和簽章，並包在 person_info 中。",
      },
      replay: {
        title: "嘗試使用被盜的授權碼",
        body: "有人複製了授權碼和 PKCE verifier，在另一台裝置上用自己的金鑰嘗試使用。伺服器必須拒絕。",
        refused: "已依預期拒絕：授權碼只能搭配申請它的那把金鑰使用。",
        accepted: "伺服器接受了被盜的授權碼。這是一個缺陷。",
      },
    },
    loginTitle: "模擬 Singpass 登入",
    loginBody: "在正式的 Singpass 中，使用者此時會用 Singpass App 掃描 QR Code。在這裡，由您代替範例人物做出選擇。",
    loginRequested: "請求的資料",
    loginPurpose: "用途",
    approve: "以範例人物身分登入",
    cancel: "取消登入",
    sample: "範例人物，並非真人",
    resultTitle: "您的網站收到的內容",
    errorGeneric: "發生問題，請稍候再執行一次流程。",
    offerEyebrow: "我們提供的服務",
    offerTitle: "我們檢查並升級您的 Singpass 整合",
    offerSteps: [
      {
        lead: "檢查",
        detail: "我們審閱您現有的 Singpass 或 Myinfo 程式碼，並以書面說明需要修改哪些地方、需要多長時間。",
      },
      {
        lead: "升級",
        detail: "我們在您的程式碼庫中實作 PAR、PKCE、DPoP 和加密 ID 權杖，並以貴機構自己的應用程式在 Singpass staging 環境中測試。",
      },
      {
        lead: "上線",
        detail: "我們在截止日期前完成正式環境切換。Singpass 允許新舊流程並行運作，因此可以分階段切換。",
      },
    ],
    honesty:
      "坦白說：這個示範是我們針對模擬伺服器的參考實作。我們尚未為客戶完成過 Singpass 遷移，也不是 Singpass 或 GovTech 的合作夥伴。您的 Singpass 應用程式始終註冊在貴機構名下。",
    otherWork: "看看我們還開發哪些系統",
    formEyebrow: "Singpass 檢查",
    formTitle: "請我們檢查您的 Singpass 登入",
    formSub: "告訴我們哪個網站或應用程式使用了 Singpass 登入。我們會在兩個工作天內回覆，說明 FAPI 2.0 變更對它有何影響。",
    formPlaceholder: "哪個網站或應用程式有 Singpass 登入？由誰開發？是否使用 Myinfo 或 Corppass？",
    formSend: "申請 Singpass 檢查",
    flyerLine: "Singpass 必須在 2026 年 12 月 31 日前升級到 FAPI 2.0。查看新登入流程的可執行示範。",
    stagingTitle: "在 Singpass staging 環境中試用",
    stagingBody: "這個按鈕以 StarTech 的 staging 應用程式身分，對 Singpass 官方的 staging 服務執行同一套用戶端。只有 Singpass staging 測試帳號可以登入，真實的 Singpass 帳號無法登入。",
    stagingButton: "使用 Singpass 登入（staging）",
    stagingResult: "Singpass staging 環境傳回的 ID 權杖（已解密並驗證）",
    stagingCancelled: "Staging 登入已取消。",
    stagingFailed: "Staging 登入未能完成，請稍後再試。",
  },

  stickyCta: {
    line: "用三十分鐘了解您的流程，釐清應該先開發什麼。",
    action: "預約洽談",
  },

  footer: {
    location: "新加坡",
    rights: "StarTech Innovation Pte. Ltd.",
  },

  demos: {
    signIn: {
      title: "自訂{title}",
      subtitle: "使用 Google 登入，即可用您自己的資料產生客製化結果。",
      notConfigured: "登入功能尚未開通，請稍後再回來查看。",
      signedInAs: "已登入：",
      backToSample: "← 返回範例",
    },
  },
};
