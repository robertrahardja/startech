import type { Messages } from "./en";

/**
 * Simplified Chinese — mainland and Singapore.
 *
 * Mainland vocabulary where it differs from Taiwan usage: 软件 not 軟體,
 * 项目 not 專案, 数据 not 資料. Direct and concrete, which is how Chinese
 * business writing signals competence; the English relies on understatement
 * that would read as vague here.
 *
 * NEEDS A NATIVE REVIEW before this locale is linked publicly.
 */
export const zhHans: Messages = {
  nav: {
    work: "案例",
    practices: "服务",
    solutions: "解决方案",
    industries: "行业",
    approach: "合作流程",
    contact: "联系我们",
    letsTalk: "聊一聊",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    language: "语言",
  },

  hero: {
    eyebrowShort: "新加坡 · 服务全球",
    eyebrowFull: "新加坡 · 成立于 2021 年 · 服务全球",
    headlineLead: "我们既懂",
    headlineBusiness: "业务",
    headlineAnd: "也懂",
    headlineTech: "技术",
    sub: "我们开发定制软件，巩固您的竞争优势。",
    ctaPrimary: "聊一聊",
    ctaWork: "查看案例",
    ctaAsk: "提出问题",
    note: "免费咨询，无需准备任何材料。告诉我们最耗时的那个流程即可。如果软件不是答案，我们会直说。",
    proof: {
      yearsFigure: "20+",
      yearsLabel: "年，业务与技术",
      testsFigure: "7,060",
      testsLabel: "项自动化测试",
      jurisdictionsFigure: "2",
      jurisdictionsLabel: "个司法辖区",
      languagesFigure: "4",
      languagesLabel: "种工作语言",
    },
    card: {
      role: "董事总经理",
      tagline: "业务 · 财务 · 技术",
      country: "新加坡",
      uen: "UEN 202110461R",
      workingIn: "工作语言",
    },
  },

  qualify: {
    eyebrow: "我们承接的工作",
    title: "我们最擅长的领域",
    sub: "多数项目都从这四种情况之一开始。即使您的情况不同，也值得聊一聊——问题的形态比所处行业更重要。",
    pricing:
      "关于价格：第一次通话我们会给出区间，需求梳理之后给出确定金额，不会仅凭一封邮件报价。如果现成工具已能解决，我们会告诉您是哪一款——那比我们开发任何东西都便宜。",
    pricingLead: "关于价格：",
  },

  work: {
    eyebrow: "精选案例",
    title: "已在生产环境运行的系统",
    sub: "四个项目，用业务负责人的角度描述——客户此前实际是怎么做的，以及过程中出了什么问题。",
    before: "此前状况",
    built: "我们做了什么",
    disclaimer:
      "涉及保密协议的项目不披露客户名称。文中数据来自已交付的系统，可在通话中详细说明。",
  },

  practices: {
    eyebrow: "服务",
    title: "四个专业领域，一支团队",
    sub: "我们不铺开做二十个方向，而是把四个领域做深。每个项目都由负责人亲自主导，并按需要引入专家。",
    details: "详情",
  },

  industries: {
    eyebrow: "行业",
    title: "行业理解",
    sub: "深入理解贵行业在监管、运营与技术层面的具体要求。",
  },

  approach: {
    eyebrow: "合作流程",
    title: "90 天，从策略到上线",
    sub: "在企业级项目中反复打磨的流程。我们负责落地，而不只是提供建议。",
    deliverable: "交付物",
    step: "前往第",
    previous: "上一步",
    next: "下一步",
  },

  objections: {
    eyebrow: "直接的答案",
    title: "值得先问清楚的问题",
    sub: "我们最常被问到的问题，如实回答——包括那些答案是「现在还不必做」的情况。",
  },

  contact: {
    eyebrow: "联系我们",
    title: "三十分钟，一个诚实的答复",
    sub: "告诉我们目前哪个流程最耗成本，我们会回复什么值得开发。",
    email: "邮箱",
    phone: "电话",
    reassurance:
      "没有任何承诺义务。需求梳理的成果归贵司所有，无论之后是否继续合作。",
    name: "姓名",
    message: "咨询内容",
    messagePlaceholder: "请介绍一下您的项目",
    send: "发送",
    sending: "发送中...",
    success: "感谢您的留言，我们会尽快回复。",
    error: "发送失败，请重试，或直接发送邮件给我们。",
  },

  stickyCta: {
    line: "三十分钟了解现状，理清应该先做什么。",
    action: "聊一聊",
  },

  footer: {
    location: "新加坡",
    rights: "StarTech Innovation Pte. Ltd.",
  },
};
