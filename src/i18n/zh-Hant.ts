import type { Messages } from "./en";

/**
 * Traditional Chinese — Taiwan and Hong Kong.
 *
 * Not a character conversion of the Simplified file. Taiwan technical
 * vocabulary differs in substance: 軟體 not 软件, 專案 not 项目, 資料 not 数据,
 * 網路 not 网络. Converting characters alone produces text that is readable
 * but obviously written for the mainland.
 *
 * NEEDS A NATIVE REVIEW before this locale is linked publicly.
 */
export const zhHant: Messages = {
  nav: {
    work: "案例",
    practices: "服務",
    solutions: "解決方案",
    industries: "產業",
    approach: "合作流程",
    contact: "聯絡我們",
    letsTalk: "聊一聊",
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
    sub: "我們開發客製化軟體，鞏固您的競爭優勢。",
    ctaPrimary: "聊一聊",
    ctaWork: "查看案例",
    ctaDeck: "下載介紹文件",
    languagesAvailable: "支援語言：",
    readInLanguage: "以{language}閱讀本頁",
    ctaAsk: "提出問題",
    note: "免費諮詢，不需要準備任何資料。告訴我們最耗時的那個流程就好。如果軟體不是答案，我們會直說。",
    proof: {
      yearsFigure: "20+",
      yearsLabel: "年，業務與技術",
      testsFigure: "7,060",
      testsLabel: "項自動化測試（內部 ERP 專案，未部署）",
      jurisdictionsFigure: "2",
      jurisdictionsLabel: "個司法管轄區",
      languagesFigure: "7",
      languagesLabel: "種網站語言",
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
    eyebrow: "我們承接的工作",
    title: "我們最擅長的領域",
    sub: "多數專案都從這四種情況之一開始。即使您的情況不同，也值得聊一聊——問題的形態比所處產業更重要。",
    fits: [
      {
        headline: "業務靠試算表和聊天訊息在運作",
        body: "庫存在一份試算表裡，收付款在另一份裡，決策在聊天記錄裡。十個人的時候還行得通，現在它成了拖住您的那件事。",
      },
      {
        headline: "已經找人做過一次，但沒用起來",
        body: "錢花了，做出來的系統團隊卻不用。您對重新開始有顧慮，想知道這次會有什麼不同。",
      },
      {
        headline: "業務跨越多個國家",
        body: "向全球出口的日本企業，在亞洲設有據點的歐美公司，在印尼招募的新加坡企業。貨幣、稅制和申報期限各不相同，卻要放進同一套系統，而且很難找到不用從頭教就懂兩端的廠商。",
      },
      {
        headline: "數字必須正確，而不是大致正確",
        body: "發票、收款、庫存——差不多就不行的地方，算錯的代價比遲交更高。",
      },
    ],
    regions: [
      "在柔佛或柔新經濟特區（JS-SEZ）有營運據點嗎？我們打造跨境運作的系統，例如正在日本客戶端運行的車輛出口系統。",
      "我們也為由新加坡管理的菲律賓與越南團隊提供支援。",
    ],
    japanSite: null,
    pricing:
      "關於價格：第一次通話我們會給出區間，需求盤點之後給出確定金額，不會只憑一封信報價。如果現成工具已經能解決，我們會告訴您是哪一款——那比我們開發任何東西都便宜。",
    pricingLead: "關於價格：",
  },

  work: {
    eyebrow: "精選案例",
    title: "兩套客戶系統，加一項內部開發",
    sub: "用業務負責人的角度描述——客戶先前實際是怎麼做的，以及過程中出了什麼問題。第三項是我們自己的內部開發，已測試，但尚未部署。",
    before: "先前狀況",
    built: "我們做了什麼",
    result: "成果",
    details: "詳情",
    demosLine:
      "想親眼看到系統運作，而不只是讀介紹？{count} 個展示在瀏覽器中以範例資料執行。",
    demosLink: "試用展示",
    disclaimer:
      "涉及保密協議的專案不揭露客戶名稱。文中數據來自各系統本身，可在通話中詳細說明。",
    cases: [
      {
        sector: "跨境貿易",
        market: "日本",
        title: "一家靠試算表和聊天訊息運作的車輛出口公司",
        before:
          "庫存在 Airtable，收付款靠人工在 Excel 裡核對，客戶溝通散落在聊天記錄中。先前廠商交付的 CRM 團隊用不起來，最後只拿來展示車輛。",
        built:
          "整套業務系統重建：庫存、依角色劃分權限的客戶管理、預估發票與商業發票自動產生、裝運指示、銀行對帳單匯入，以及兩階段收款處理。",
        metric: { figure: "2", caption: "上線前發現的涉及金額的缺陷" },
        detail: [
          "重複匯入同一份銀行對帳單會讓收款重複計算。多數日本銀行不提供轉帳編號，去重鍵始終為空。改用依行內容決定性產生的鍵後解決。",
          "客戶頁面把全公司的營收顯示給了單一業務。測試中發現並修正，隨後用兩名業務對同一客戶驗證。",
          "五種角色各自隔離：管理員、主管、業務、稅務會計、客戶。",
        ],
      },
      {
        sector: "AI 導入",
        market: "新加坡",
        title: "從公司自己的文件裡作答的 AI 助理",
        before:
          "通用聊天機器人對中小企業的員工沒有價值：它不了解這個人的職務、所在產業，也不知道公司已經定下的決策。",
        built:
          "一套助理，具備四種推理模式、分層的組織脈絡（產業、組織、職務、個人）、對客戶自有文件的檢索，以及跨部門協作。",
        metric: { figure: "2026", caption: "已交付客戶，專案於當年完成" },
        detail: [
          "帶抽象層的多模型路由——依客戶要求把預設模型換到另一家供應商，未更動任何業務程式碼。",
          "會議語音轉文字，並把待辦事項擷取為任務。",
          "以 Cloudflare Workers 打造，使用 D1、KV、R2 與 Vectorize。",
        ],
      },
      {
        sector: "內部開發",
        market: "已測試，未部署",
        title: "一套用來展示我們如何測試的內部 ERP",
        before:
          "計算金額的軟體展示起來容易，贏得信任卻難：多半只做抽查，甚至不查。我們需要一個夠大的內部專案，在任何客戶依賴我們的程式碼之前，證明我們的測試方法。",
        built:
          "以 Java 21 與 Spring Boot 打造的多租戶 ERP 後端。這是內部開發專案：已測試，但尚未為任何客戶部署。",
        metric: { figure: "7,060", caption: "涵蓋 484 個計算類別的自動化測試" },
        detail: [
          "測試數據來自 2026 年 8 月的執行，涵蓋該版本全部 484 個計算類別。",
          "115 個 REST 介面。多幣別、多租戶、角色權限、完整稽核紀錄。",
          "這是展示我們如何打造與測試複雜系統的例子，並非已為客戶部署的系統，我們也不就其計算準確性做任何聲明。",
        ],
      },
    ],
  },

  showcase: {
    eyebrow: "親自試用",
    title: "13個真實專案，選一個，親自試試看。",
    sub: "下方每張卡片都是真實可用的示範，不是效果圖。點開即可看到即時範例結果。",
    sampleBadge: "範例",
    tryIt: "立即試用",
    seeAll: "查看全部解決方案",
    disclaimer:
      "每個範例均使用虛構資料。想看看它如何處理您自己的業務，請傳給我們一份試算表（免費）。",
    teasers: {
      invoiceScanner: "數秒內完成掃描與逐項辨識",
      customerChatbot: "回答信心度",
      appointmentBooking: "自動預約並確認",
      quotationGenerator: "已生成含稅報價單",
      jobPostingWriter: "已撰寫的職缺要求",
      inventoryTracker: "需要補貨的項目",
      socialMediaManager: "同時生成的平台貼文數",
      documentTranslator: "種語言，一鍵翻譯",
      employeeOnboarding: "已安排的入職任務",
      salesAssistant: "已排定的跟進郵件",
      complianceChecker: "發現的高風險條款",
      trainingContentGenerator: "已生成的培訓模組",
      financialReportBuilder: "季度淨利潤解讀",
    },
  },

  practices: {
    eyebrow: "服務",
    title: "四個專業領域，一支團隊",
    sub: "我們不鋪開做二十個方向，而是把四個領域做深。每個專案都由負責人親自主導，並視需要引入專家。",
    details: "詳情",
    items: [
      {
        title: "AI 導入",
        description:
          "針對貴公司自有文件的檢索、依業務調校的模型，以及自動化流程——配有讓輸出可用於受監管業務的防護與來源標註。",
        details: [
          "以向量檢索為基礎的檢索增強生成，作用於貴公司自有資料",
          "帶抽象層的多供應商路由——更換模型無需更動業務程式碼",
          "附來源標註的信心分數，答案可以被查證",
          "防止臆造的防護與法遵複核",
        ],
      },
      {
        title: "業務系統",
        description:
          "取代試算表與零散工具的營運平台、客戶管理、庫存、文件與工作流程——以經得起稽核而非僅供展示的標準打造。",
        details: [
          "庫存、交易、文件與收款整合在一套系統，不再靠試算表和聊天記錄",
          "多租戶、多幣別、角色權限、完整稽核紀錄",
          "從您現有的試算表起步，支援 Excel 與 Google 試算表的匯入匯出",
          "部署在貴公司名下的雲端帳戶、資料庫與程式碼儲存庫",
        ],
      },
      {
        title: "財務流程",
        description:
          "開立發票、銀行對帳單匯入、對帳與單據產生，留下會計師可以追溯的稽核軌跡。",
        details: [
          "跨帳戶與跨幣別的自動對帳，含決定性去重",
          "銀行對帳單匯入，包括不提供轉帳編號的格式",
          "預估發票、商業發票與裝運單據由同一筆紀錄產生",
          "從您開立發票所用的系統或試算表，經認證存取點發送 InvoiceNow 電子發票",
        ],
      },
      {
        title: "跨境營運",
        description:
          "為在新加坡、日本及區域內其他國家之間進行貿易的企業打造多幣別、多語言系統，以各國規則為先。",
        details: [
          "資料存放地在架構階段確定，而不是複核後再補",
          "多種貨幣、稅制與單據格式整合在同一套系統",
          "介面與單據支援英文、日文、中文、馬來文或印尼文",
          "已在日本一家出口公司上線運作：庫存、交易、單據與收款",
        ],
      },
    ],
  },

  industries: {
    eyebrow: "產業",
    title: "產業理解",
    sub: "深入理解貴產業在法規、營運與技術層面的具體要求。",
    items: [
      {
        name: "貿易與物流",
        description:
          "為試算表已不敷使用的貿易、批發與物流企業管理庫存、交易、裝運單據與收款。",
        details: [
          "庫存與交易集中管理，每個角色只看到自己的畫面",
          "預估發票、商業發票與裝運指示由同一筆紀錄產生",
          "銀行對帳單匯入與跨幣別對帳",
          "面向海外客戶的貨運追蹤與買家入口網站",
        ],
      },
      {
        name: "金融與銀行",
        description: "文件處理、對帳、保險單據與風險核查，服務財務團隊及為其提供服務的機構。",
        details: [
          "即時交易監控與異常偵測",
          "以文件 AI 讀取對帳單、保單與理賠資料，每個數字都標明出處",
          "跨帳戶與跨幣別的自動對帳",
          "AI 驅動的信用評分與風險評估",
        ],
      },
      {
        name: "教育",
        description: "含 AI 輔導、適性測驗、認證管理與多語授課的學習管理系統。",
        details: [
          "依學習表現調整的學習路徑",
          "自動批改的 AI 生成測驗",
          "搭配語音合成的多語內容遞送",
          "證照與資格追蹤",
        ],
      },
      {
        name: "公共部門",
        description:
          "面向公共部門的安全法遵方案。政務流程自動化，以及不能中斷的關鍵應用。",
        details: [
          "含數位身分驗證的市民入口",
          "許可、執照與申請文件的處理",
          "可供稽核的紀錄與報表",
          "關鍵服務的高可用架構",
        ],
      },
      {
        name: "製造",
        description: "ERP 系統、預測性維護、供應鏈最佳化與品檢自動化。",
        details: [
          "接上物聯網感測器的預測性維護",
          "供應鏈可視化與即時追蹤",
          "以機器視覺進行的品質檢驗",
          "生產排程與產能規劃",
        ],
      },
      {
        name: "零售與電商",
        description: "AI 推薦、虛擬助理、客服自動化與庫存管理。",
        details: [
          "以協同過濾為基礎的個人化商品推薦",
          "全天候的 AI 客服對話",
          "依需求與競品價格的動態定價",
          "含季節性趨勢的庫存預測",
        ],
      },
    ],
  },

  approach: {
    eyebrow: "合作流程",
    title: "從需求盤點到上線，約十二週",
    sub: "每個專案都依同樣的五個步驟進行，寫程式之前先提供書面的範圍與費用。我們負責落地，而不只是提供建議。",
    deliverable: "交付成果",
    step: "前往第",
    previous: "上一步",
    next: "下一步",
    items: [
      {
        week: "第 1–2 週",
        title: "現況盤點與 AI 就緒度",
        items: [
          "業務目標與痛點分析",
          "既有系統與資料評估",
          "找出影響最大的 AI 切入點",
          "定義成功指標與 KPI",
        ],
        deliverable: "AI 機會報告與投資報酬試算",
      },
      {
        week: "第 3–4 週",
        title: "方案設計",
        items: [
          "整體架構設計",
          "模型與平台選型",
          "與既有系統的整合規劃",
          "資料流與資安方案",
        ],
        deliverable: "技術架構與實作計畫",
      },
      {
        week: "第 5–8 週",
        title: "概念驗證",
        items: [
          "使用真實資料的雛型",
          "AI 模型訓練與調校",
          "核心功能實作",
          "使用者測試與回饋",
        ],
        deliverable: "具備核心能力的可用雛型",
      },
      {
        week: "第 9–11 週",
        title: "上線部署",
        items: [
          "擴展到正式規模",
          "資安、監控與備份",
          "壓力測試與效能調校",
          "人員訓練與文件",
        ],
        deliverable: "可供使用的正式系統",
      },
      {
        week: "第 12 週起",
        title: "最佳化與支援",
        items: [
          "運行監控與回饋處理",
          "模型持續改進",
          "功能增強",
          "持續的技術支援",
        ],
        deliverable: "運行報告與改進建議",
      },
    ],
  },

  objections: {
    eyebrow: "直接的答案",
    title: "值得先問清楚的問題",
    sub: "我們最常被問到的問題，據實回答——包括那些答案是「現在還不必做」的情況。",
    items: [
      {
        said: "我們之前找人做過一次，但用不起來。這次有什麼不一樣？",
        answer:
          "多數情況下問題不在開發，而在需求：動工之前沒有人和真正做這件事的同事坐下來談過。所以我們先做需求盤點，而且這份成果歸貴公司所有，無論之後是否繼續合作。如果現有系統還能救，我們會直說——重寫一個大致還能跑的東西是在浪費錢。",
        proof: "那套車輛出口系統的重建，起點正是這種情況。",
      },
      {
        said: "如果負責人無法繼續，系統會怎麼樣？",
        answer:
          "核心由負責人親自撰寫，視需要引入專家。真正保護貴公司的不是人數，而是系統有文件、有測試，而且部署在貴公司自己的帳號裡。測試說明了系統應該做什麼，所以另一位工程師接得下去。",
        proof: "我們內部 ERP 專案中，涵蓋 484 個計算類別的 7,060 項自動化測試。",
      },
      {
        said: "這樣一套系統通常要多少錢？",
        answer:
          "第一次通話給區間，需求盤點之後給確定金額。真實的數字我們提前說，而不是事後說。如果超出預算，我們會一起縮減範圍——能上線的小系統勝過停在半路的大系統。新加坡中小企業的專案可能符合取代 PSG 的 EDGE 補助金資格，我們會協助您確認是否符合資格，並免費準備我方的供應商文件。",
        proof: "EDGE 補助由新加坡企業發展局（Enterprise Singapore）決定，StarTech 並非 EDGE 預先認可的供應商。",
      },
      {
        said: "再等一兩季會有損失嗎？",
        answer:
          "有時候沒有，那我們就直說。與其在不急的時候簽約，不如等問題真正緊迫時再聯絡我們。不過等待的成本通常不在軟體本身，而在這段期間的人工核對和因此產生的錯誤。如果需要，我們可以把這筆帳算出來，您再決定。",
      },
      {
        said: "我們需要花多少工夫解釋自己的業務？",
        answer:
          "省掉這些解釋正是這家公司存在的理由。您不必解釋什麼是試算表、稅務發票上要寫什麼、收款為什麼這樣對得上帳。像跟自己的會計師說話那樣告訴我們就好。",
        proof: "在商業與技術兩方面都有二十多年經驗。",
      },
    ],
  },

  capabilityDeck: {
    eyebrow: "帶走這份資料",
    title: "整套方案，濃縮成一份文件。",
    sub: "每項服務、每個案例、本頁所有數據。",
    cta: "下載能力介紹文件",
  },

  contact: {
    eyebrow: "聯絡我們",
    title: "三十分鐘，一個誠實的答覆",
    sub: "告訴我們目前哪個流程最耗成本，我們會回覆什麼值得開發。",
    email: "電子郵件",
    phone: "電話",
    reassurance:
      "沒有任何承諾義務。需求盤點的成果歸貴公司所有，無論之後是否繼續合作。",
    name: "姓名",
    company: "公司名稱",
    message: "諮詢內容",
    messagePlaceholder: "請介紹一下您的專案",
    send: "送出",
    sending: "傳送中...",
    success: "感謝您的來信，我們會盡快回覆。",
    error: "傳送失敗，請重試，或直接寄信給我們。",
    country: "國家或地區",
    staff: "員工人數",
    staffPick: "請選擇人數",
    staffOptions: ["10人以下", "10至50人", "51至200人", "200人以上"],
    spreadsheet: "您的試算表（選填）",
    spreadsheetHint:
      "Excel、CSV或Numbers，最大10MB。請刪除機密內容，幾列樣本即可。",
    fileTooLarge: "檔案超過10MB，請傳送較小的摘錄。",
  },

  // /flyer 數位傳單。內容不超出公司能力簡介的範圍。
  flyer: {
    eyebrow: "新加坡 · 日本 · 服務全球",
    headline: "從試算表，到系統。",
    who: "為10至200人、靠試算表運作，或靠一套供應商沒做完的系統運作的公司而設。我們打造真正支撐您營運的軟體，而每一部分都歸您所有。",
    ctaOffer: "寄一份試算表給我們",
    ctaDeck: "下載簡介資料",
    proofEyebrow: "三件真實的事",
    proof: [
      {
        lead: "在日本運作中",
        detail:
          "一家中古車出口商的業務運作在我們打造的系統上：庫存、客戶管理、發票、船運文件與收款。今天仍在客戶的正式環境中運作。",
      },
      {
        lead: "7,060項測試",
        detail:
          "涵蓋我們ERP建置中484個計算類別的自動化測試，來自2026年8月的執行結果。屬於內部建置，尚未部署；每一個數字在交付前都經過核對。",
      },
      {
        lead: "歸您所有",
        detail:
          "程式碼由創辦人親自撰寫。雲端帳戶、資料庫與程式庫從第一週起就在您的名下，沒有任何供應商能夠挾持您的業務。",
      },
    ],
    demosEyebrow: "先試用，再決定",
    demosTitle: "能運作的展示，不是投影片",
    demosSub: "{count}個小型系統，可在瀏覽器中用範例資料直接執行。這三個最為通用。",
    demoOpen: "開啟展示",
    demosAll: "查看全部{count}個展示",
    invoiceNowLink: "InvoiceNow：查看由試算表產生的電子發票範例",
    offerEyebrow: "我們的提議",
    offerTitle: "寄一份試算表給我們，我們把它做成能運作的系統給您看。",
    offerBody:
      "選一份支撐您業務的試算表：報價、庫存、工單、配送，都可以。兩週內，您會看到它變成一套裝著您真實資料的可運作系統，並得到完整開發費用的直接答覆。",
    offerPoints: ["不收費，無須承諾", "每月3至5家公司", "展示中建置的成果歸您保留"],
    formEyebrow: "從這裡開始",
    formTitle: "一份試算表，一份表單",
    formSub: "告訴我們這份試算表今天為您做什麼。我們在兩個工作天內回覆。",
    formReassurance:
      "您的檔案私密保存，僅一人查看，應要求即刪除。不會分享，也不會出售。",
    formSend: "傳送試算表",
    messagePlaceholder: "這份試算表在業務中扮演什麼角色？在哪裡出問題？",
    deckLine: "下載8頁能力簡介資料，無需留下電子郵件。",
    grantsLabel: "新加坡企業：",
    grantsLine: "我們會確認您的專案是否符合EDGE補助條件。",
    backHome: "返回主站",
  },

  testimonial: {
    eyebrow: "客戶評價",
    title: "與 StarTech 合作的體驗如何？",
    intro: "您對專案的一兩句評價，能幫助其他企業決定是否與我們合作。在您查看並核准最終文字之前，我們不會發布任何內容。",
    name: "您的姓名",
    role: "您的職位",
    company: "公司",
    email: "電子郵件",
    quote: "您的評價",
    quotePlaceholder: "您當時需要解決什麼問題？專案進展如何？之後有什麼改變？",
    quoteHint: "一到三句話就足夠了。",
    credit: "我們可以如何署名？",
    creditFull: "姓名、職位和公司",
    creditAnonymous: "僅職位和產業，不顯示姓名",
    creditPrivate: "僅作回饋，請勿發布",
    consent: "我同意 StarTech 可因篇幅刪減內容，並會在發布前向我展示最終文字。",
    send: "送出評價",
    sending: "送出中…",
    thanksTitle: "謝謝您！",
    thanksBody: "我們已收到，在任何內容上線之前，會把最終文字寄給您確認。",
    errorRequired: "請填寫此欄。",
    errorEmail: "請輸入有效的電子郵件。",
    errorQuoteShort: "請至少寫一句話（20 個字元）。",
    errorConsent: "請勾選此項以繼續。",
    error: "發生問題，請再試一次。",
  },
  invoicenow: {
    eyebrow: "InvoiceNow · 新加坡",
    headline: "用您現有的系統，直接傳送 InvoiceNow 電子發票",
    lead: "InvoiceNow 是新加坡的電子發票網路，IRAS 正在分階段對所有 GST 註冊企業推行。我們把您開發票所用的系統或試算表，連接到 InvoiceNow 接入點。",
    ctaDemo: "試用範例發票",
    ctaFlyer: "發給我們一份試算表",
    whatEyebrow: "它是什麼",
    whatTitle: "用簡單的話說明 InvoiceNow",
    what: [
      {
        title: "是資料檔案，不是 PDF",
        body: "InvoiceNow 發票是一種結構化檔案（Peppol PINT SG，XML 格式），買方系統可以直接讀取，無需任何人重新輸入。",
      },
      {
        title: "透過 Peppol 網路傳送",
        body: "發票先送到接入點，接入點按買方的 Peppol ID（由其 UEN 產生）找到對方，再送到買方的接入點。",
      },
      {
        title: "同時抄送 IRAS",
        body: "對 GST 註冊企業，接入點還會把發票資料傳送給 IRAS。賣方、買方及雙方接入點是四個角，IRAS 是第五個角。",
      },
    ],
    whoEyebrow: "誰必須使用，何時開始",
    whoTitle: "IRAS 正在分階段對所有 GST 註冊企業推行",
    whoIntro: "根據 IRAS，GST 註冊企業須從以下日期起，透過 InvoiceNow 向 IRAS 傳送發票資料：",
    phases: [
      { date: "2025年11月1日", text: "在註冊成立後 6 個月內自願註冊 GST 的公司。" },
      { date: "2026年4月1日", text: "自該日起申請自願註冊 GST 的所有企業。" },
      { date: "2028年4月1日", text: "自該日起申請強制註冊 GST 的企業，以及年供應額不超過 S$200,000 的現有 GST 註冊企業。" },
      { date: "2029年4月1日", text: "年供應額不超過 S$100 萬的現有 GST 註冊企業。" },
      { date: "2030年4月1日", text: "年供應額不超過 S$400 萬的現有 GST 註冊企業。" },
      { date: "2031年4月1日", text: "年供應額超過 S$400 萬的現有 GST 註冊企業。" },
    ],
    whoNote: "IRAS 按 2025 年申報的供應額劃分級距，並正在通知現有企業各自的開始日期。實際情況請查看 IRAS 頁面。",
    whoSource: "IRAS：GST InvoiceNow 要求（頁面最後更新於 2026 年 10 月 8 日）",
    accountant: "我們只做軟體整合。InvoiceNow 是否適用於您，以及每個發票明細的 GST 處理方式，請向您的會計師或 IRAS 確認。",
    offerEyebrow: "我們做什麼",
    offerTitle: "我們把您開發票所用的系統或試算表，連接到 InvoiceNow 接入點。",
    offerBody: "如果您用自建系統、舊版 ERP 或試算表開發票，IRAS 給出的途徑是透過經認證的接入點連線。我們負責搭建這個連線：把您的發票資料對應到 PINT SG，透過接入點的 API 傳送，並把傳送狀態帶回您日常使用的介面。",
    offerPoints: [
      "發票資料對應到 PINT SG",
      "透過接入點的 API 傳送",
      "傳送狀態和錯誤顯示在您日常的介面",
    ],
    offerHonest: "StarTech 不是接入點服務商，也沒有獲得 IMDA 認證。真正的連線要透過我們與您共同選定的 IMDA 認證接入點進行。",
    demoEyebrow: "試一試",
    demoTitle: "把範例發票轉換成 PINT SG XML",
    demoIntro: "填寫發票或上傳 CSV 範本。瀏覽器會產生 XML，並按一部分 PINT SG 規則進行檢查。資料不會發送到任何地方。",
    sampleBadge: "範例資料，不是有效的稅務發票",
    csvTitle: "從試算表開始",
    csvHint: "每個發票明細一列，每列重複發票和買方資訊。賣方資訊保留在下方表單中。",
    csvDownload: "下載 CSV 範本",
    csvUpload: "上傳 CSV 檔案",
    csvLoaded: "已從檔案載入 {count} 列。",
    csvSkipped: "檔案中還有 {count} 個發票號碼，只載入了第一張發票。",
    csvErrorEmpty: "檔案是空的。",
    csvErrorColumns: "檔案缺少以下欄位：{columns}",
    csvErrorRows: "檔案只有標題列，沒有發票明細。",
    csvErrorRead: "無法讀取該檔案。",
    loadValid: "填入正確的範例",
    loadBroken: "填入有錯誤的範例",
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
      postalCode: "郵政編碼",
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
      OS: "OS · 不在徵稅範圍",
      NG: "NG · 賣方未註冊 GST",
    },
    categoryNote: "類別代碼來自 PINT SG 代碼表。某個明細適用哪一類，請諮詢您的會計師。",
    addLine: "新增明細",
    removeLine: "刪除第 {n} 項",
    lineLabel: "第 {n} 項",
    errorNumber: "請輸入數字，例如 12.50，最多 4 位小數。",
    errorQuantity: "請輸入大於零的數量，最多 4 位小數。",
    errorDate: "請按 YYYY-MM-DD 格式輸入日期。",
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
    checksSummary: "{total} 項檢查中透過 {passed} 項",
    pass: "通過",
    fail: "未通過",
    demoCheck: "StarTech 示範用檢查，不是 PINT SG 規則",
    checksSource: "規則編號來自 2026 年 5 月 25 日發佈的 PINT SG Billing v1.4.1 schematron。這裡只是在瀏覽器中執行的一部分檢查；傳送前接入點會進行完整驗證。",
    checks: {
      specIds: "規範識別碼和業務流程識別碼為 PINT SG 開票所用",
      invoiceNumber: "發票有號碼",
      issueDate: "有開票日期，且所有日期均為 YYYY-MM-DD 格式",
      dueOrTerms: "有應付金額，因此提供了付款到期日或付款條件",
      buyerReference: "提供了買方參考號或採購訂單號",
      currency: "發票幣別為 SGD，且沒有另設稅務幣別",
      sellerName: "提供了賣方註冊名稱",
      buyerName: "提供了買方註冊名稱",
      sellerEndpoint: "賣方有 Peppol 地址（方案 0195，由 UEN 產生）",
      buyerEndpoint: "買方有 Peppol 地址（方案 0195，由 UEN 產生）",
      sellerLegalId: "賣方 UEN 作為法定註冊號碼給出",
      sellerGstId: "收取了 GST，因此提供了賣方 GST 註冊號碼",
      sellerAddress: "提供了賣方街道地址和郵政編碼",
      buyerAddress: "提供了買方街道地址和郵政編碼",
      countries: "賣方和買方地址都帶有國家代碼",
      uuid: "發票有格式正確的唯一識別碼（UUID）",
      linesNamed: "至少有一個明細，且每個明細都有品名",
      lineCategories: "每個明細都有有效的新加坡 GST 類別代碼",
      lineAmounts: "每個明細金額等於數量 × 單價",
      netTotals: "不含 GST 合計等於各明細金額之和",
      gstAmounts: "各類別 GST 等於應稅金額 × 稅率，並與 GST 總額相符",
      payable: "含 GST 合計與應付金額相符",
      decimals: "沒有金額超過 2 位小數",
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
        body: "在真正的連線中，每次開具發票時，XML 都由您自己的發票資料產生，不需要手工輸入。",
      },
      {
        title: "傳送到接入點",
        body: "您的系統透過 IMDA 認證接入點的 API 傳送檔案。接入點會進行完整的 PINT SG 驗證。",
      },
      {
        title: "買方收到發票",
        body: "接入點透過 Peppol 目錄找到買方的接入點，把發票送進買方的系統。",
      },
      {
        title: "IRAS 收到副本",
        body: "開啟提交功能後，接入點還會把發票資料傳送給 IRAS，這就是第五個角。",
      },
    ],
    nextNote: "本頁面沒有連線任何接入點。真正的連線會使用我們與您共同選定的 IMDA 認證接入點。",
    ctaTitle: "您現在用試算表開發票嗎？",
    ctaBody: "把您開發票用的試算表發給我們。我們會展示它如何對應到 InvoiceNow，並坦率告訴您連線需要做哪些工作。免費，無需承諾。",
    ctaButton: "傳送一份試算表",
    sourcesTitle: "資料來源",
    sourceIras: "IRAS：GST InvoiceNow 要求",
    sourcePint: "Peppol：PINT SG Billing v1.4.1 規範",
    sourceImda: "IMDA：InvoiceNow 介紹",
    backHome: "返回主站",
  },

  singpass: {
    eyebrow: "Singpass 升級 · FAPI 2.0",
    title: "Singpass 登入必須在 2026 年 12 月 31 日前升級到 FAPI 2.0",
    intro:
      "如果您的網站或應用有「使用 Singpass 登入」按鈕，或透過 Myinfo 自動填寫表單，就必須在 2026 年底前升級到 Singpass 的新安全標準。",
    source: "Singpass 官方公佈的截止日期",
    ctaCheck: "請我們檢查您的整合",
    ctaDemo: "執行示範",
    changesEyebrow: "有哪些變化",
    changesTitle: "登入方式的五項變化",
    changes: [
      {
        lead: "請求提前傳送",
        detail:
          "您的伺服器先把登入請求傳送給 Singpass（PAR），使用者瀏覽器只攜帶一個簡短的引用值。位址列中的內容無法被篡改。",
      },
      {
        lead: "每次登入一次性證明",
        detail:
          "您的伺服器證明登入由它發起（PKCE），因此被截獲的登入授權碼對他人毫無用處。",
      },
      {
        lead: "權杖繫結您的金鑰",
        detail:
          "授權碼和權杖只有配合您伺服器持有的金鑰才能使用（DPoP）。洩露的權杖無法被重複使用。",
      },
      {
        lead: "身份資訊加密",
        detail:
          "每個 ID 權杖現在都用您的金鑰加密，NRIC 也移到了新欄位。讀取舊格式的程式碼將無法執行。",
      },
      {
        lead: "更嚴格的跳轉與錯誤處理",
        detail:
          "不再接受自訂協定的應用連結，Login 應用必須說明每次登入的用途，Singpass 現在還會把錯誤傳回您的網站，網站必須處理這些錯誤。",
      },
    ],
    migrationLink: "Singpass 針對 Login 和 Myinfo（v5）應用的遷移指南",
    whoEyebrow: "受影響的對象",
    whoTitle: "所有使用 Singpass 登入或填寫資料的網站和應用",
    who: [
      "帶有「使用 Singpass 登入」的網站、入口網站和行動應用程式",
      "從 Myinfo 預填個人資料的表單",
      "2026 年 2 月之前搭建的整合；此後註冊的應用從一開始就必須使用 FAPI 2.0",
      "Myinfo v3 和 v4 整合，Singpass 要求它們在 2026 年 9 月底前遷移到 Myinfo v5",
    ],
    corppass: "Corppass 登入有單獨且更晚的截止日期：2027 年 3 月 31 日。",
    corppassLink: "Corppass 時間表",
    riskEyebrow: "如果不遷移",
    riskTitle: "請按舊登入方式將會失效來規劃",
    riskBody:
      "Singpass 要求所有整合在 2026 年 12 月 31 日前採用 FAPI 2.0，並已於 2026 年 7 月 14 日下架舊流程的文件。仍在使用舊流程的整合，應預計在截止日期後 Singpass 登入或 Myinfo 預填會失敗：使用者無法登入，表單也無法完成。",
    demoEyebrow: "可執行的參考示範",
    demoTitle: "完整的 FAPI 2.0 流程，在您的瀏覽器中執行",
    demoIntro:
      "示範針對我們為此搭建的模擬 Singpass 伺服器，執行真實的協定步驟。金鑰在您的瀏覽器中重新生成，人物是樣例，不會向 Singpass 傳送任何內容。每個請求和回應都會顯示，權杖已縮短。",
    demoNotice:
      "模擬伺服器：不是 Singpass，也未與 Singpass 或 GovTech 連線。同一套客戶端程式碼也可對接 Singpass 自己的預備（staging）環境：請用下方按鈕試試。",
    appType: "應用程式類型",
    appLogin: "Singpass 登入",
    appMyinfo: "Myinfo（v5）",
    run: "執行流程",
    runAgain: "再執行一次",
    running: "正在執行流程…",
    allPassed: "所有步驟均已通過。以下資料經由繫結此瀏覽器金鑰的授權碼和權杖，以加密並簽名的形式送達。",
    failed: "有一個步驟失敗了。它的請求和回應顯示在下方。",
    cancelled: "登入已取消。Singpass 會把錯誤傳回您的網站，網站顯示自己的提示資訊，而不是 Singpass 的錯誤原文。",
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
        title: "註冊應用",
        body: "瀏覽器生成一把簽名金鑰和一把加密金鑰，並把公鑰部分註冊到模擬伺服器，相當於在 Singpass Developer Portal 上的操作。",
      },
      discovery: {
        title: "讀取伺服器設定",
        body: "端點和演算法來自 OpenID 設定，而不是寫死的地址。",
      },
      session: {
        title: "生成本次登入的密值",
        body: "全新的 state、nonce、PKCE verifier（S256）和 DPoP 金鑰，只用於這一次登入，用完即棄。",
      },
      par: {
        title: "提前傳送請求（PAR）",
        body: "登入請求連同簽名的客戶端斷言（private_key_jwt）和 DPoP 證明先發送到伺服器。伺服器返回一個短時有效的 request_uri。",
      },
      authorize: {
        title: "把使用者轉到 Singpass",
        body: "地址中只包含 client_id 和 request_uri。在真實服務中，使用者此時會在 Singpass 應用中批准登入。",
      },
      redirect: {
        title: "處理返回的跳轉",
        body: "在信任授權碼之前，先檢查 state 和 iss。",
      },
      token: {
        title: "用授權碼換取權杖",
        body: "傳送授權碼、PKCE verifier、新的客戶端斷言和新的 DPoP 證明。返回的權杖繫結在 DPoP 金鑰上。",
      },
      idToken: {
        title: "解密並驗證 ID 權杖",
        body: "用您的加密金鑰解密，用伺服器公佈的金鑰（JWKS）驗證簽名，再檢查 iss、aud、exp 和 nonce。",
      },
      userinfo: {
        title: "取得 Myinfo 資料",
        body: "使用 Authorization: DPoP，並附上繫結存取權杖的證明（ath）。回應同樣經過加密和簽名，並放在 person_info 中。",
      },
      replay: {
        title: "嘗試被盜的授權碼",
        body: "有人複製了授權碼和 PKCE verifier，在另一臺裝置上用自己的金鑰嘗試使用。伺服器必須拒絕。",
        refused: "已按預期拒絕：授權碼只能配合申請它的那把金鑰使用。",
        accepted: "伺服器接受了被盜的授權碼。這是一個缺陷。",
      },
    },
    loginTitle: "模擬 Singpass 登入",
    loginBody: "在真實的 Singpass 中，使用者此時會用 Singpass 應用掃描QR 碼。在這裡由您代替樣例人物做出選擇。",
    loginRequested: "請求的資料",
    loginPurpose: "用途",
    approve: "以樣例人物身份登入",
    cancel: "取消登入",
    sample: "樣例人物，並非真人",
    resultTitle: "您的網站收到的內容",
    errorGeneric: "出現問題。請稍後再執行一次流程。",
    offerEyebrow: "我們提供",
    offerTitle: "我們檢查並升級您的 Singpass 整合",
    offerSteps: [
      {
        lead: "檢查",
        detail: "我們閱讀您現有的 Singpass 或 Myinfo 程式碼，並以書面形式說明需要修改什麼、需要多長時間。",
      },
      {
        lead: "升級",
        detail: "我們在您的程式碼庫中實現 PAR、PKCE、DPoP 和加密 ID 權杖，並用貴機構自己的應用在 Singpass 預備（staging）環境中測試。",
      },
      {
        lead: "上線",
        detail: "我們在截止日期前完成生產環境切換。Singpass 允許新舊流程並行執行，因此可以分階段切換。",
      },
    ],
    honesty:
      "坦白說：這個示範是我們針對模擬伺服器的參考實現。我們尚未為客戶完成過 Singpass 遷移，也不是 Singpass 或 GovTech 的合作夥伴。您的 Singpass 應用始終註冊在貴機構名下。",
    otherWork: "看看我們還做什麼",
    formEyebrow: "Singpass 檢查",
    formTitle: "請我們檢查您的 Singpass 登入",
    formSub: "告訴我們哪個網站或應用程式使用了 Singpass 登入。我們會在兩個工作天內回覆 FAPI 2.0 變更對它的影響。",
    formPlaceholder: "哪個網站或應用程式有 Singpass 登入？由誰開發？是否使用 Myinfo 或 Corppass？",
    formSend: "申請 Singpass 檢查",
    flyerLine: "Singpass 必須在 2026 年 12 月 31 日前升級到 FAPI 2.0。檢視新登入流程的可執行示範。",
    stagingTitle: "在 Singpass 預備（staging）環境中試用",
    stagingBody: "這個按鈕以 StarTech 的預備環境應用身分，對 Singpass 自己的預備服務執行同一套客戶端。只有 Singpass 預備環境測試帳戶可以登入，真實的 Singpass 帳戶不行。",
    stagingButton: "使用 Singpass 登入（預備環境）",
    stagingResult: "Singpass 預備環境傳回的 ID 權杖（已解密並驗證）",
    stagingCancelled: "預備環境登入已取消。",
    stagingFailed: "預備環境登入未能完成。請稍後再試。",
  },

  stickyCta: {
    line: "三十分鐘了解現況，理清應該先做什麼。",
    action: "聊一聊",
  },

  footer: {
    location: "新加坡",
    rights: "StarTech Innovation Pte. Ltd.",
  },

  demos: {
    signIn: {
      title: "自訂{title}",
      subtitle: "使用 Google 登入，即可用您自己的資料產生客製化結果。",
      notConfigured: "登入功能尚未設定，請稍後再回來查看。",
      signedInAs: "已登入：",
      backToSample: "← 返回範例",
    },
  },
};
