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
    ctaAsk: "提出問題",
    note: "免費諮詢，不需要準備任何資料。告訴我們最耗時的那個流程就好。如果軟體不是答案，我們會直說。",
    proof: {
      yearsFigure: "20+",
      yearsLabel: "年，業務與技術",
      testsFigure: "7,060",
      testsLabel: "項自動化測試",
      jurisdictionsFigure: "2",
      jurisdictionsLabel: "個司法管轄區",
      languagesFigure: "4",
      languagesLabel: "種工作語言",
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
    pricing:
      "關於價格：第一次通話我們會給出區間，需求盤點之後給出確定金額，不會只憑一封信報價。如果現成工具已經能解決，我們會告訴您是哪一款——那比我們開發任何東西都便宜。",
    pricingLead: "關於價格：",
  },

  work: {
    eyebrow: "精選案例",
    title: "已在正式環境運行的系統",
    sub: "四個專案，用業務負責人的角度描述——客戶先前實際是怎麼做的，以及過程中出了什麼問題。",
    before: "先前狀況",
    built: "我們做了什麼",
    disclaimer:
      "涉及保密協議的專案不揭露客戶名稱。文中數據來自已交付的系統，可在通話中詳細說明。",
  },

  practices: {
    eyebrow: "服務",
    title: "四個專業領域，一支團隊",
    sub: "我們不鋪開做二十個方向，而是把四個領域做深。每個專案都由負責人親自主導，並視需要引入專家。",
    details: "詳情",
  },

  industries: {
    eyebrow: "產業",
    title: "產業理解",
    sub: "深入理解貴產業在法規、營運與技術層面的具體要求。",
  },

  approach: {
    eyebrow: "合作流程",
    title: "90 天，從策略到上線",
    sub: "在企業級專案中反覆打磨的流程。我們負責落地，而不只是提供建議。",
    deliverable: "交付成果",
    step: "前往第",
    previous: "上一步",
    next: "下一步",
  },

  objections: {
    eyebrow: "直接的答案",
    title: "值得先問清楚的問題",
    sub: "我們最常被問到的問題，據實回答——包括那些答案是「現在還不必做」的情況。",
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
    message: "諮詢內容",
    messagePlaceholder: "請介紹一下您的專案",
    send: "送出",
    sending: "傳送中...",
    success: "感謝您的來信，我們會盡快回覆。",
    error: "傳送失敗，請重試，或直接寄信給我們。",
  },

  stickyCta: {
    line: "三十分鐘了解現況，理清應該先做什麼。",
    action: "聊一聊",
  },

  footer: {
    location: "新加坡",
    rights: "StarTech Innovation Pte. Ltd.",
  },
};
