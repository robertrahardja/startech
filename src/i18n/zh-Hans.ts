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
    ask: "咨询我们",
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
    ctaDeck: "下载介绍文档",
    languagesAvailable: "支持语言：",
    readInLanguage: "以{language}阅读本页",
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
    fits: [
      {
        headline: "业务靠表格和聊天记录在运转",
        body: "库存在一个表格里，收付款在另一个表格里，决策在聊天记录里。十个人的时候还行得通，现在它成了拖住您的那件事。",
      },
      {
        headline: "已经找人做过一次，但没用起来",
        body: "钱花了，做出来的系统团队却不用。您对重新开始有顾虑，想知道这次会有什么不同。",
      },
      {
        headline: "业务跨越多个国家",
        body: "向全球出口的日本企业，在亚洲设有实体的欧美公司，在印尼招聘的新加坡企业。货币、税制和申报周期各不相同，却要放进同一套系统，而且很难找到不用从头教就能理解两端的供应商。",
      },
      {
        headline: "数字必须准确，而不是大致准确",
        body: "资金、薪酬、理赔——差不多就不行的地方，算错的代价比迟交更高。",
      },
    ],
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
    result: "成果",
    details: "详情",
    disclaimer:
      "涉及保密协议的项目不披露客户名称。文中数据来自已交付的系统，可在通话中详细说明。",
    cases: [
      {
        sector: "跨境贸易",
        market: "日本",
        title: "一家靠表格和聊天记录运转的车辆出口公司",
        before:
          "库存在 Airtable，收付款靠人工在 Excel 里核对，客户沟通散落在聊天记录中。之前的供应商交付的 CRM 团队用不起来，最后只拿来展示车辆。",
        built:
          "整套业务系统重建：库存、按角色划分权限的客户管理、形式发票与商业发票自动生成、装运指示、银行对账单导入，以及两级收款处理。",
        metric: { figure: "2", caption: "上线前发现的涉及金额的缺陷" },
        detail: [
          "重复导入同一份银行对账单会让收款翻倍。多数日本银行不提供转账编号，去重键始终为空。改用按行内容确定性生成的键后解决。",
          "客户页面把全公司的营收展示给了单个销售。测试中发现并修复，随后用两名销售对同一客户验证。",
          "五种角色各自隔离：管理员、经理、销售、税务会计、客户。",
        ],
      },
      {
        sector: "企业资源管理",
        market: "新加坡与印尼",
        title: "会计师可以逐行核对的薪酬引擎",
        before:
          "新加坡的薪酬合规毫不留情：CPF 的三步取整、年龄与居留身份分档、普通工资上限、SDL 的上下限。多数系统用近似值处理，指望没人去核。",
        built:
          "基于 Java 21 与 Spring Boot 的多租户后端，其中新加坡薪酬合规引擎按 CPF Board 表格逐项验证。",
        metric: { figure: "7,060", caption: "覆盖 484 个计算类的自动化测试" },
        detail: [
          "48 个 CPF 场景整理成可打印的核验表——年龄分档、永久居民第一年与第二年费率、取整边界、上限处理——供会计师逐行签核。",
          "五个独立的会计引擎各自重算每一张报表：总账、试算表、损益表、资产负债表、现金流量表必须一致。",
          "51 个 REST 接口。多币种、多租户、基于角色的权限、完整审计日志。",
        ],
      },
      {
        sector: "AI 落地",
        market: "新加坡",
        title: "从公司自己的文档里作答的 AI 助手",
        before:
          "通用聊天机器人对中小企业的员工没有价值：它不了解这个人的岗位、所在行业，也不知道公司已经定下的决策。",
        built:
          "一套已上线的助手，具备四种推理模式、分层的组织上下文（行业、组织、岗位、个人）、对客户自有文档的检索，以及跨部门协同。",
        metric: { figure: "已上线", caption: "生产环境 API，付费客户" },
        detail: [
          "带抽象层的多模型路由——按客户要求把默认模型换到另一家供应商，未改动任何业务代码。",
          "会议语音转文字，并把行动项提取为任务。",
          "运行在 Cloudflare Workers 上，使用 D1、KV、R2 与 Vectorize。",
        ],
      },
      {
        sector: "医疗",
        market: "印尼与东南亚",
        title: "归患者所有、而非归医院所有的健康档案",
        before:
          "往返于印尼与新加坡医疗机构的患者，靠纸质文件和手机照片携带病史。机构之间的系统互不相通，而跨境数据规定又让简单打通并不合法。",
        built:
          "由新加坡运营、数据仅存放在新加坡的三语患者自持健康平台。生活方式记录、保险开通与 AI 顾问已上线，跨境档案库与临床端正在开发。",
        metric: { figure: "3", caption: "种语言，一套代码" },
        detail: [
          "设计上作为托管方保存患者自有的副本，从不自称医疗机构的原始记录系统。",
          "数据存放地在架构阶段就已确定，而不是合规检查之后再补。",
          "整理了新加坡、马来西亚和印尼的保险合作网络与医疗机构目录。",
        ],
      },
    ],
  },

  showcase: {
    eyebrow: "亲自试用",
    title: "13个真实项目，选一个，亲自试试看。",
    sub: "下面每张卡片都是真实可用的演示，不是效果图。点开即可看到即时样例结果。",
    sampleBadge: "示例",
    tryIt: "立即试用",
    seeAll: "查看全部解决方案",
    disclaimer:
      "每个示例均使用虚构数据。想看看它如何处理您自己的业务，请发给我们一份电子表格（免费）。",
    teasers: {
      invoiceScanner: "几秒内完成扫描与逐项识别",
      customerChatbot: "回答置信度",
      appointmentBooking: "自动预约并确认",
      quotationGenerator: "已生成含税报价单",
      jobPostingWriter: "已撰写的岗位要求",
      inventoryTracker: "需要补货的项目",
      socialMediaManager: "同时生成的平台帖子数",
      documentTranslator: "种语言，一键翻译",
      employeeOnboarding: "已安排的入职任务",
      salesAssistant: "已排定的跟进邮件",
      complianceChecker: "发现的高风险条款",
      trainingContentGenerator: "已生成的培训模块",
      financialReportBuilder: "季度净利润解读",
    },
  },

  practices: {
    eyebrow: "服务",
    title: "四个专业领域，一支团队",
    sub: "我们不铺开做二十个方向，而是把四个领域做深。每个项目都由负责人亲自主导，并按需要引入专家。",
    details: "详情",
    items: [
      {
        title: "AI 落地",
        description:
          "面向贵司自有文档的检索、按业务调校的模型，以及自动化流程——配有让输出可用于受监管业务的护栏与来源标注。",
        details: [
          "基于向量检索的检索增强生成，作用于贵司自有数据",
          "带抽象层的多供应商路由——更换模型无需改动业务代码",
          "带来源标注的置信度评分，答案可以被核查",
          "防止臆造的护栏与合规复核",
        ],
      },
      {
        title: "企业软件",
        description:
          "完整的 ERP 与业务系统——财务、人事、库存、采购与生产——按经得起审计而非仅供演示的标准构建。",
        details: [
          "总账、应付、应收、薪酬与固定资产",
          "多租户、多币种、基于角色的权限、完整审计日志",
          "新加坡薪酬合规引擎按 CPF Board 表格逐项验证",
          "对接 Xero、QuickBooks 与表格工具",
        ],
      },
      {
        title: "财务系统",
        description:
          "会计引擎、文档 AI、估值与对账，面向需要向监管机构交代的经营者。",
        details: [
          "跨账户与跨币种的自动对账，含确定性去重",
          "银行对账单导入，包括不提供转账编号的格式",
          "KYC 与 AML 流程，MAS 与 OJK 报送",
          "含蒙特卡洛模拟的 DCF 与可比公司分析",
        ],
      },
      {
        title: "医疗与公共部门",
        description:
          "患者平台、医疗记录与公共服务，面向高并发、高确定性且数据规定优先的场景。",
        details: [
          "数据存放地在架构阶段确定，而不是复核后再补",
          "以托管方身份保存患者自有副本，不自称机构原始记录",
          "提供英文、中文、马来文与印尼文",
          "关键业务的高可用架构",
        ],
      },
    ],
  },

  industries: {
    eyebrow: "行业",
    title: "行业理解",
    sub: "深入理解贵行业在监管、运营与技术层面的具体要求。",
    items: [
      {
        name: "医疗",
        description: "医院管理、患者接诊自动化、病历分析与 AI 辅助分诊。",
        details: [
          "符合 HL7 与 FHIR 的电子病历",
          "按症状严重程度排序的 AI 分诊",
          "保险理赔的自动提交与跟踪",
          "含预约与结算的远程医疗对接",
        ],
      },
      {
        name: "金融与银行",
        description: "会计引擎、保险文档处理、企业估值、税务合规与欺诈识别。",
        details: [
          "实时交易监控与异常识别",
          "面向 MAS、OJK 以及贵司审计方所依据制度的合规报送",
          "跨账户与跨币种的自动对账",
          "AI 驱动的信用评分与风险评估",
        ],
      },
      {
        name: "教育",
        description: "含 AI 辅导、自适应测评、认证管理与多语言授课的学习管理系统。",
        details: [
          "依据学习表现调整的学习路径",
          "自动批改的 AI 生成测验",
          "配语音合成的多语言内容分发",
          "证书与资质追踪",
        ],
      },
      {
        name: "公共部门",
        description:
          "面向公共部门的安全合规方案。政务流程自动化，以及不能中断的关键应用。",
        details: [
          "含电子身份核验的市民门户",
          "许可、执照与申请材料的处理",
          "可供审计的日志与报表",
          "关键服务的高可用架构",
        ],
      },
      {
        name: "制造",
        description: "ERP 系统、预测性维护、供应链优化与质检自动化。",
        details: [
          "接入物联网传感器的预测性维护",
          "供应链可视化与实时追踪",
          "基于机器视觉的质量检验",
          "生产排程与产能规划",
        ],
      },
      {
        name: "零售与电商",
        description: "AI 推荐、虚拟助手、客服自动化与库存管理。",
        details: [
          "基于协同过滤的个性化商品推荐",
          "全天候的 AI 客服对话",
          "依据需求与竞品价格的动态定价",
          "含季节性趋势的库存预测",
        ],
      },
    ],
  },

  approach: {
    eyebrow: "合作流程",
    title: "90 天，从策略到上线",
    sub: "在企业级项目中反复打磨的流程。我们负责落地，而不只是提供建议。",
    deliverable: "交付物",
    step: "前往第",
    previous: "上一步",
    next: "下一步",
    items: [
      {
        week: "第 1–2 周",
        title: "现状盘点与 AI 就绪度",
        items: [
          "业务目标与痛点分析",
          "现有系统与数据评估",
          "识别影响最大的 AI 切入点",
          "定义成功指标与 KPI",
        ],
        deliverable: "AI 机会报告与投资回报测算",
      },
      {
        week: "第 3–4 周",
        title: "方案设计",
        items: [
          "整体架构设计",
          "模型与平台选型",
          "与既有系统的集成规划",
          "数据管道与安全方案",
        ],
        deliverable: "技术架构与实施计划",
      },
      {
        week: "第 5–8 周",
        title: "概念验证",
        items: [
          "使用真实数据的原型",
          "AI 模型训练与调优",
          "核心功能实现",
          "用户测试与反馈",
        ],
        deliverable: "具备核心能力的可用原型",
      },
      {
        week: "第 9–11 周",
        title: "上线部署",
        items: [
          "扩展到生产规模",
          "安全、监控与备份",
          "压力测试与性能调优",
          "人员培训与文档",
        ],
        deliverable: "可供使用的生产系统",
      },
      {
        week: "第 12 周起",
        title: "优化与支持",
        items: [
          "运行监控与反馈处理",
          "模型持续改进",
          "功能增强",
          "持续的技术支持",
        ],
        deliverable: "运行报告与改进建议",
      },
    ],
  },

  objections: {
    eyebrow: "直接的答案",
    title: "值得先问清楚的问题",
    sub: "我们最常被问到的问题，如实回答——包括那些答案是「现在还不必做」的情况。",
    items: [
      {
        said: "我们之前找人做过一次，但用不起来。这次有什么不一样？",
        answer:
          "多数情况下问题不在开发，而在需求：动工之前没有人和真正做这件事的同事坐下来聊过。所以我们先做需求梳理，而且这份成果归贵司所有，无论之后是否继续合作。如果现有系统还能救，我们会直说——重写一个基本能跑的东西是在浪费钱。",
        proof: "那套车辆出口系统的重建，起点正是这种情况。",
      },
      {
        said: "如果负责人无法继续，系统会怎么样？",
        answer:
          "核心由负责人亲自编写，按需要引入专家。真正保护贵司的不是人数，而是系统有文档、有测试，并且部署在贵司自己的账号里。测试说明了系统应该做什么，所以另一位工程师能接手。",
        proof: "484 个计算类中的 7,060 项自动化测试。",
      },
      {
        said: "这样一套系统通常要多少钱？",
        answer:
          "第一次通话给区间，需求梳理之后给确定金额。真实的数字我们提前说，而不是事后说。如果超出预算，我们会一起缩减范围——能上线的小系统胜过停在半路的大系统。新加坡中小企业的项目可能符合取代 PSG 的 EDGE 补助金资格，我们会帮您确认，并免费准备供应商方面的文件。",
        proof: "是否符合条件按现行 IMDA 标准核对，不靠猜测。",
      },
      {
        said: "再等一两个季度会有损失吗？",
        answer:
          "有时候没有，那我们就直说。与其在不急的时候签约，不如等问题真正紧迫时再联系我们。不过等待的成本通常不在软件本身，而在这期间的手工核对和由此产生的差错。如果需要，我们可以把这笔账算出来，您再决定。",
      },
      {
        said: "我们需要花多少工夫解释自己的业务？",
        answer:
          "省掉这些解释正是这家公司存在的理由。您不必解释什么是试算表、该缴多少 CPF、理赔为什么这样对得上。像跟自己的会计师说话那样告诉我们就行。",
        proof: "薪酬计算引擎按 CPF Board 表格逐项验证。",
      },
    ],
  },

  capabilityDeck: {
    eyebrow: "带走这份资料",
    title: "整套方案，浓缩成一份文档。",
    sub: "每项服务、每个案例、本页所有数据。",
    cta: "下载能力介绍文档",
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
    company: "公司名称",
    message: "咨询内容",
    messagePlaceholder: "请介绍一下您的项目",
    send: "发送",
    sending: "发送中...",
    success: "感谢您的留言，我们会尽快回复。",
    error: "发送失败，请重试，或直接发送邮件给我们。",
    country: "国家或地区",
    staff: "员工人数",
    staffPick: "请选择人数",
    staffOptions: ["10人以下", "10至50人", "51至200人", "200人以上"],
    spreadsheet: "您的表格（可选）",
    spreadsheetHint:
      "Excel、CSV或Numbers，最大10MB。请删除机密内容，几行样本即可。",
    fileTooLarge: "文件超过10MB，请发送更小的摘录。",
  },

  // /flyer 数字传单。内容不超出公司能力介绍的范围。
  flyer: {
    eyebrow: "新加坡 · 日本 · 服务全球",
    headline: "从表格，到系统。",
    who: "面向10至200人、靠表格运转，或靠一套供应商没做完的系统运转的公司。我们构建真正支撑您业务运行的软件，而每一部分都归您所有。",
    ctaOffer: "发给我们一张表格",
    ctaDeck: "下载介绍资料",
    proofEyebrow: "三件真实的事",
    proof: [
      {
        lead: "在日本运行中",
        detail:
          "一家二手车出口商的业务运行在我们构建的系统上：库存、客户管理、发票、船运单据和收款。今天仍在客户的生产环境中运行。",
      },
      {
        lead: "7,060项测试",
        detail:
          "覆盖我们ERP构建中484个计算类的自动化测试，来自2026年8月的运行结果。属于内部构建，尚未部署；每一个数字在交付前都经过核对。",
      },
      {
        lead: "归您所有",
        detail:
          "代码由创始人亲自编写。云账户、数据库和代码仓库从第一周起就在您的名下，没有任何供应商能够挟持您的业务。",
      },
    ],
    demosEyebrow: "先试用，再决定",
    demosTitle: "能运行的演示，不是幻灯片",
    demosSub: "{count}个小型系统，可在浏览器中用示例数据直接运行。这三个最为通用。",
    demoOpen: "打开演示",
    demosAll: "查看全部{count}个演示",
    invoiceNowLink: "InvoiceNow：查看由电子表格生成的电子发票示例",
    offerEyebrow: "我们的提议",
    offerTitle: "发给我们一张表格，我们把它做成能运行的系统给您看。",
    offerBody:
      "选一张支撑您业务的表格：报价、库存、工单、配送，都可以。两周内，您会看到它变成一套装着您真实数据的可运行系统，并得到完整开发费用的直接答复。",
    offerPoints: ["不收费，无须承诺", "每月3至5家公司", "演示中构建的成果归您保留"],
    formEyebrow: "从这里开始",
    formTitle: "一张表格，一份表单",
    formSub: "告诉我们这张表格今天为您做什么。我们在两个工作日内回复。",
    formReassurance:
      "您的文件私密保存，仅一人查看，应要求即删除。不会共享，也不会出售。",
    formSend: "发送表格",
    messagePlaceholder: "这张表格在业务中起什么作用？在哪里出问题？",
    deckLine: "下载8页能力介绍资料，无需留下邮箱。",
    grantsLabel: "新加坡企业：",
    grantsLine: "我们会核实您的项目是否符合EDGE资助条件。",
    backHome: "返回主站",
  },

  testimonial: {
    eyebrow: "客户评价",
    title: "与 StarTech 合作的体验如何？",
    intro: "您对项目的一两句评价，能帮助其他企业决定是否与我们合作。在您查看并批准最终文字之前，我们不会发布任何内容。",
    name: "您的姓名",
    role: "您的职位",
    company: "公司",
    email: "电子邮箱",
    quote: "您的评价",
    quotePlaceholder: "您当时需要解决什么问题？项目进展如何？之后有什么改变？",
    quoteHint: "一到三句话就足够了。",
    credit: "我们可以如何署名？",
    creditFull: "姓名、职位和公司",
    creditAnonymous: "仅职位和行业，不显示姓名",
    creditPrivate: "仅作反馈，请勿发布",
    consent: "我同意 StarTech 可因篇幅删减内容，并会在发布前向我展示最终文字。",
    send: "提交评价",
    sending: "提交中…",
    thanksTitle: "谢谢您！",
    thanksBody: "我们已收到，在任何内容上线之前，会把最终文字发给您确认。",
    errorRequired: "请填写此项。",
    errorEmail: "请输入有效的电子邮箱。",
    errorQuoteShort: "请至少写一句话（20 个字符）。",
    errorConsent: "请勾选此项以继续。",
    error: "出了点问题，请重试。",
  },
  invoicenow: {
    eyebrow: "InvoiceNow · 新加坡",
    headline: "用您现有的系统，直接发送 InvoiceNow 电子发票",
    lead: "InvoiceNow 是新加坡的电子发票网络，IRAS 正在分阶段对所有 GST 注册企业推行。我们把您开发票所用的系统或电子表格，连接到 InvoiceNow 接入点。",
    ctaDemo: "试用示例发票",
    ctaFlyer: "发给我们一份电子表格",
    whatEyebrow: "它是什么",
    whatTitle: "用大白话讲 InvoiceNow",
    what: [
      {
        title: "是数据文件，不是 PDF",
        body: "InvoiceNow 发票是一种结构化文件（Peppol PINT SG，XML 格式），买方系统可以直接读取，无需任何人重新录入。",
      },
      {
        title: "通过 Peppol 网络发送",
        body: "发票先送到接入点，接入点按买方的 Peppol ID（由其 UEN 生成）找到对方，再送到买方的接入点。",
      },
      {
        title: "同时抄送 IRAS",
        body: "对 GST 注册企业，接入点还会把发票数据发送给 IRAS。卖方、买方及双方接入点是四个角，IRAS 是第五个角。",
      },
    ],
    whoEyebrow: "谁必须使用，何时开始",
    whoTitle: "IRAS 正在分阶段对所有 GST 注册企业推行",
    whoIntro: "根据 IRAS，GST 注册企业须从以下日期起，通过 InvoiceNow 向 IRAS 发送发票数据：",
    phases: [
      { date: "2025年11月1日", text: "在注册成立后 6 个月内自愿注册 GST 的公司。" },
      { date: "2026年4月1日", text: "自该日起申请自愿注册 GST 的所有企业。" },
      { date: "2028年4月1日", text: "自该日起申请强制注册 GST 的企业，以及年供应额不超过 S$200,000 的现有 GST 注册企业。" },
      { date: "2029年4月1日", text: "年供应额不超过 S$100 万的现有 GST 注册企业。" },
      { date: "2030年4月1日", text: "年供应额不超过 S$400 万的现有 GST 注册企业。" },
      { date: "2031年4月1日", text: "年供应额超过 S$400 万的现有 GST 注册企业。" },
    ],
    whoNote: "IRAS 按 2025 年申报的供应额划分档次，并正在通知现有企业各自的开始日期。具体情况请查看 IRAS 页面。",
    whoSource: "IRAS：GST InvoiceNow 要求（页面最后更新于 2026 年 10 月 8 日）",
    accountant: "我们只做软件集成。InvoiceNow 是否适用于您，以及每个发票项目的 GST 处理方式，请向您的会计师或 IRAS 确认。",
    offerEyebrow: "我们做什么",
    offerTitle: "我们把您开发票所用的系统或电子表格，连接到 InvoiceNow 接入点。",
    offerBody: "如果您用自建系统、旧版 ERP 或电子表格开发票，IRAS 给出的途径是通过经认证的接入点连接。我们负责搭建这个连接：把您的发票数据映射到 PINT SG，通过接入点的 API 发送，并把投递状态带回您日常使用的界面。",
    offerPoints: [
      "发票数据映射到 PINT SG",
      "通过接入点的 API 发送",
      "投递状态和错误显示在您日常的界面",
    ],
    offerHonest: "StarTech 不是接入点服务商，也没有获得 IMDA 认证。真正的连接要通过我们与您共同选定的 IMDA 认证接入点进行。",
    demoEyebrow: "试一试",
    demoTitle: "把示例发票转换成 PINT SG XML",
    demoIntro: "填写发票或上传 CSV 模板。浏览器会生成 XML，并按一部分 PINT SG 规则进行检查。数据不会发送到任何地方。",
    sampleBadge: "示例数据，不是有效的税务发票",
    csvTitle: "从电子表格开始",
    csvHint: "每个发票项目一行，每行重复发票和买方信息。卖方信息保留在下方表单中。",
    csvDownload: "下载 CSV 模板",
    csvUpload: "上传 CSV 文件",
    csvLoaded: "已从文件载入 {count} 行。",
    csvSkipped: "文件中还有 {count} 个发票号码，只载入了第一张发票。",
    csvErrorEmpty: "文件是空的。",
    csvErrorColumns: "文件缺少以下列：{columns}",
    csvErrorRows: "文件只有表头行，没有发票项目。",
    csvErrorRead: "无法读取该文件。",
    loadValid: "填入正确的示例",
    loadBroken: "填入有错误的示例",
    invoiceSection: "发票信息",
    sellerSection: "卖方（您的企业）",
    buyerSection: "买方",
    linesSection: "发票项目",
    fields: {
      invoiceNumber: "发票号码",
      issueDate: "开票日期",
      dueDate: "付款到期日",
      buyerReference: "买方参考号或采购订单号",
      paymentTerms: "付款条件",
      name: "注册名称",
      uen: "UEN（唯一实体编号）",
      gstRegNo: "GST 注册号码",
      street: "街道地址",
      postalCode: "邮政编码",
      description: "品名",
      quantity: "数量",
      unit: "单位",
      unitPrice: "单价（S$）",
      gstCategory: "GST 类别",
      lineAmount: "项目金额",
    },
    units: {
      H87: "件",
      HUR: "小时",
      DAY: "天",
      MON: "月",
    },
    categories: {
      SR: "SR · 标准税率 9%",
      ZR: "ZR · 零税率",
      ES33: "ES33 · 免税（第 33 条）",
      ESN33: "ESN33 · 免税（其他）",
      OS: "OS · 不在征税范围",
      NG: "NG · 卖方未注册 GST",
    },
    categoryNote: "类别代码来自 PINT SG 代码表。某个项目适用哪一类，请咨询您的会计师。",
    addLine: "添加项目",
    removeLine: "删除第 {n} 项",
    lineLabel: "第 {n} 项",
    errorNumber: "请输入数字，例如 12.50，最多 4 位小数。",
    errorQuantity: "请输入大于零的数量，最多 4 位小数。",
    errorDate: "请按 YYYY-MM-DD 格式输入日期。",
    generate: "生成 XML 并运行检查",
    generating: "正在生成…",
    resultEyebrow: "结果",
    totalsTitle: "合计",
    totals: {
      net: "不含 GST 合计",
      gst: "GST 金额",
      payable: "应付金额",
    },
    checksTitle: "检查项",
    checksSummary: "{total} 项检查中通过 {passed} 项",
    pass: "通过",
    fail: "未通过",
    demoCheck: "StarTech 演示用检查，不是 PINT SG 规则",
    checksSource: "规则编号来自 2026 年 5 月 25 日发布的 PINT SG Billing v1.4.1 schematron。这里只是在浏览器中运行的一部分检查；发送前接入点会进行完整验证。",
    checks: {
      specIds: "规范标识和业务流程标识为 PINT SG 开票所用",
      invoiceNumber: "发票有号码",
      issueDate: "有开票日期，且所有日期均为 YYYY-MM-DD 格式",
      dueOrTerms: "有应付金额，因此提供了付款到期日或付款条件",
      buyerReference: "提供了买方参考号或采购订单号",
      currency: "发票币种为 SGD，且没有另设税务币种",
      sellerName: "提供了卖方注册名称",
      buyerName: "提供了买方注册名称",
      sellerEndpoint: "卖方有 Peppol 地址（方案 0195，由 UEN 生成）",
      buyerEndpoint: "买方有 Peppol 地址（方案 0195，由 UEN 生成）",
      sellerLegalId: "卖方 UEN 作为法定注册号码给出",
      sellerGstId: "收取了 GST，因此提供了卖方 GST 注册号码",
      sellerAddress: "提供了卖方街道地址和邮政编码",
      buyerAddress: "提供了买方街道地址和邮政编码",
      countries: "卖方和买方地址都带有国家代码",
      uuid: "发票有格式正确的唯一标识（UUID）",
      linesNamed: "至少有一个项目，且每个项目都有品名",
      lineCategories: "每个项目都有有效的新加坡 GST 类别代码",
      lineAmounts: "每个项目金额等于数量 × 单价",
      netTotals: "不含 GST 合计等于各项目金额之和",
      gstAmounts: "各类别 GST 等于应税金额 × 税率，并与 GST 总额相符",
      payable: "含 GST 合计与应付金额相符",
      decimals: "没有金额超过 2 位小数",
      noGst: "未注册 GST（NG）的项目没有与 GST 项目混用",
      noGstNumber: "含 NG 项目的发票没有填写卖方 GST 号码",
      uenFormat: "两个 UEN 的格式都正确",
    },
    xmlTitle: "生成的 XML",
    download: "下载 XML",
    nextEyebrow: "接下来会发生什么",
    nextTitle: "这个文件实际上如何发送",
    next: [
      {
        title: "您的系统生成文件",
        body: "在真正的连接中，每次开具发票时，XML 都由您自己的发票数据生成，不需要手工录入。",
      },
      {
        title: "发送到接入点",
        body: "您的系统通过 IMDA 认证接入点的 API 发送文件。接入点会进行完整的 PINT SG 验证。",
      },
      {
        title: "买方收到发票",
        body: "接入点通过 Peppol 目录找到买方的接入点，把发票送进买方的系统。",
      },
      {
        title: "IRAS 收到副本",
        body: "开启提交功能后，接入点还会把发票数据发送给 IRAS，这就是第五个角。",
      },
    ],
    nextNote: "本页面没有连接任何接入点。真正的连接会使用我们与您共同选定的 IMDA 认证接入点。",
    ctaTitle: "您现在用电子表格开发票吗？",
    ctaBody: "把您开发票用的电子表格发给我们。我们会展示它如何映射到 InvoiceNow，并坦率告诉您连接需要做哪些工作。免费，无需承诺。",
    ctaButton: "发送一份电子表格",
    sourcesTitle: "资料来源",
    sourceIras: "IRAS：GST InvoiceNow 要求",
    sourcePint: "Peppol：PINT SG Billing v1.4.1 规范",
    sourceImda: "IMDA：InvoiceNow 介绍",
    backHome: "返回主站",
  },

  singpass: {
    eyebrow: "Singpass 升级 · FAPI 2.0",
    title: "Singpass 登录必须在 2026 年 12 月 31 日前升级到 FAPI 2.0",
    intro:
      "如果您的网站或应用有“使用 Singpass 登录”按钮，或通过 Myinfo 自动填写表单，就必须在 2026 年底前升级到 Singpass 的新安全标准。",
    source: "Singpass 官方公布的截止日期",
    ctaCheck: "请我们检查您的集成",
    ctaDemo: "运行演示",
    changesEyebrow: "有哪些变化",
    changesTitle: "登录方式的五项变化",
    changes: [
      {
        lead: "请求提前发送",
        detail:
          "您的服务器先把登录请求发送给 Singpass（PAR），用户浏览器只携带一个简短的引用值。地址栏中的内容无法被篡改。",
      },
      {
        lead: "每次登录一次性证明",
        detail:
          "您的服务器证明登录由它发起（PKCE），因此被截获的登录授权码对他人毫无用处。",
      },
      {
        lead: "令牌绑定您的密钥",
        detail:
          "授权码和令牌只有配合您服务器持有的密钥才能使用（DPoP）。泄露的令牌无法被重复使用。",
      },
      {
        lead: "身份信息加密",
        detail:
          "每个 ID 令牌现在都用您的密钥加密，NRIC 也移到了新字段。读取旧格式的代码将无法运行。",
      },
      {
        lead: "更严格的跳转与错误处理",
        detail:
          "不再接受自定义协议的应用链接，Login 应用必须说明每次登录的用途，Singpass 现在还会把错误返回到您的网站，网站必须处理这些错误。",
      },
    ],
    migrationLink: "Singpass 针对 Login 和 Myinfo（v5）应用的迁移指南",
    whoEyebrow: "受影响的对象",
    whoTitle: "所有使用 Singpass 登录或填写资料的网站和应用",
    who: [
      "带有“使用 Singpass 登录”的网站、门户和移动应用",
      "从 Myinfo 预填个人资料的表单",
      "2026 年 2 月之前搭建的集成；此后注册的应用从一开始就必须使用 FAPI 2.0",
      "Myinfo v3 和 v4 集成，Singpass 要求它们在 2026 年 9 月底前迁移到 Myinfo v5",
    ],
    corppass: "Corppass 登录有单独且更晚的截止日期：2027 年 3 月 31 日。",
    corppassLink: "Corppass 时间表",
    riskEyebrow: "如果不迁移",
    riskTitle: "请按旧登录方式将会失效来规划",
    riskBody:
      "Singpass 要求所有集成在 2026 年 12 月 31 日前采用 FAPI 2.0，并已于 2026 年 7 月 14 日下线旧流程的文档。仍在使用旧流程的集成，应预计在截止日期后 Singpass 登录或 Myinfo 预填会失败：用户无法登录，表单也无法完成。",
    demoEyebrow: "可运行的参考演示",
    demoTitle: "完整的 FAPI 2.0 流程，在您的浏览器中运行",
    demoIntro:
      "演示针对我们为此搭建的模拟 Singpass 服务器，执行真实的协议步骤。密钥在您的浏览器中重新生成，人物是样例，不会向 Singpass 发送任何内容。每个请求和响应都会显示，令牌已缩短。",
    demoNotice:
      "模拟服务器：不是 Singpass，也未与 Singpass 或 GovTech 连接。同一套客户端代码也可对接 Singpass 自己的预发布环境：请用下方按钮试试。",
    appType: "应用类型",
    appLogin: "Singpass 登录",
    appMyinfo: "Myinfo（v5）",
    run: "运行流程",
    runAgain: "再运行一次",
    running: "正在运行流程…",
    allPassed: "所有步骤均已通过。以下资料经由绑定此浏览器密钥的授权码和令牌，以加密并签名的形式送达。",
    failed: "有一个步骤失败了。它的请求和响应显示在下方。",
    cancelled: "登录已取消。Singpass 会把错误返回到您的网站，网站显示自己的提示信息，而不是 Singpass 的错误原文。",
    details: "请求与响应",
    status: {
      pending: "未开始",
      running: "运行中",
      waiting: "等待操作",
      done: "通过",
      error: "失败",
    },
    steps: {
      register: {
        title: "注册应用",
        body: "浏览器生成一把签名密钥和一把加密密钥，并把公钥部分注册到模拟服务器，相当于在 Singpass Developer Portal 上的操作。",
      },
      discovery: {
        title: "读取服务器配置",
        body: "端点和算法来自 OpenID 配置，而不是写死的地址。",
      },
      session: {
        title: "生成本次登录的密值",
        body: "全新的 state、nonce、PKCE verifier（S256）和 DPoP 密钥，只用于这一次登录，用完即弃。",
      },
      par: {
        title: "提前发送请求（PAR）",
        body: "登录请求连同签名的客户端断言（private_key_jwt）和 DPoP 证明先发送到服务器。服务器返回一个短时有效的 request_uri。",
      },
      authorize: {
        title: "把用户转到 Singpass",
        body: "地址中只包含 client_id 和 request_uri。在真实服务中，用户此时会在 Singpass 应用中批准登录。",
      },
      redirect: {
        title: "处理返回的跳转",
        body: "在信任授权码之前，先检查 state 和 iss。",
      },
      token: {
        title: "用授权码换取令牌",
        body: "发送授权码、PKCE verifier、新的客户端断言和新的 DPoP 证明。返回的令牌绑定在 DPoP 密钥上。",
      },
      idToken: {
        title: "解密并验证 ID 令牌",
        body: "用您的加密密钥解密，用服务器公布的密钥（JWKS）验证签名，再检查 iss、aud、exp 和 nonce。",
      },
      userinfo: {
        title: "获取 Myinfo 资料",
        body: "使用 Authorization: DPoP，并附上绑定访问令牌的证明（ath）。响应同样经过加密和签名，并放在 person_info 中。",
      },
      replay: {
        title: "尝试被盗的授权码",
        body: "有人复制了授权码和 PKCE verifier，在另一台设备上用自己的密钥尝试使用。服务器必须拒绝。",
        refused: "已按预期拒绝：授权码只能配合申请它的那把密钥使用。",
        accepted: "服务器接受了被盗的授权码。这是一个缺陷。",
      },
    },
    loginTitle: "模拟 Singpass 登录",
    loginBody: "在真实的 Singpass 中，用户此时会用 Singpass 应用扫描二维码。在这里由您代替样例人物做出选择。",
    loginRequested: "请求的资料",
    loginPurpose: "用途",
    approve: "以样例人物身份登录",
    cancel: "取消登录",
    sample: "样例人物，并非真人",
    resultTitle: "您的网站收到的内容",
    errorGeneric: "出现问题。请稍后再运行一次流程。",
    offerEyebrow: "我们提供",
    offerTitle: "我们检查并升级您的 Singpass 集成",
    offerSteps: [
      {
        lead: "检查",
        detail: "我们阅读您现有的 Singpass 或 Myinfo 代码，并以书面形式说明需要修改什么、需要多长时间。",
      },
      {
        lead: "升级",
        detail: "我们在您的代码库中实现 PAR、PKCE、DPoP 和加密 ID 令牌，并用贵机构自己的应用在 Singpass 预发布环境中测试。",
      },
      {
        lead: "上线",
        detail: "我们在截止日期前完成生产环境切换。Singpass 允许新旧流程并行运行，因此可以分阶段切换。",
      },
    ],
    honesty:
      "坦白说：这个演示是我们针对模拟服务器的参考实现。我们尚未为客户完成过 Singpass 迁移，也不是 Singpass 或 GovTech 的合作伙伴。您的 Singpass 应用始终注册在贵机构名下。",
    otherWork: "看看我们还做什么",
    formEyebrow: "Singpass 检查",
    formTitle: "请我们检查您的 Singpass 登录",
    formSub: "告诉我们哪个网站或应用使用了 Singpass 登录。我们会在两个工作日内答复 FAPI 2.0 变更对它的影响。",
    formPlaceholder: "哪个网站或应用有 Singpass 登录？由谁开发？是否使用 Myinfo 或 Corppass？",
    formSend: "申请 Singpass 检查",
    flyerLine: "Singpass 必须在 2026 年 12 月 31 日前升级到 FAPI 2.0。查看新登录流程的可运行演示。",
    stagingTitle: "在 Singpass 预发布环境中试用",
    stagingBody: "这个按钮以 StarTech 的预发布应用身份，对 Singpass 自己的预发布服务运行同一套客户端。只有 Singpass 预发布测试账户可以登录，真实的 Singpass 账户不行。",
    stagingButton: "使用 Singpass 登录（预发布）",
    stagingResult: "Singpass 预发布环境返回的 ID 令牌（已解密并验证）",
    stagingCancelled: "预发布登录已取消。",
    stagingFailed: "预发布登录未能完成。请稍后再试。",
  },

  stickyCta: {
    line: "三十分钟了解现状，理清应该先做什么。",
    action: "聊一聊",
  },

  footer: {
    location: "新加坡",
    rights: "StarTech Innovation Pte. Ltd.",
  },

  demos: {
    signIn: {
      title: "自定义{title}",
      subtitle: "使用 Google 登录，即可用您自己的数据生成定制结果。",
      notConfigured: "登录功能尚未配置，请稍后再来查看。",
      signedInAs: "已登录：",
      backToSample: "← 返回示例",
    },
  },
};
