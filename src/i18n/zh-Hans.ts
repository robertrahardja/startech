import type { Messages } from "./en";

/**
 * Simplified Chinese — mainland and Singapore.
 *
 * Mainland vocabulary where it differs from Taiwan usage: 软件 not 軟體,
 * 项目 not 專案, 数据 not 資料. Direct and concrete, which is how Chinese
 * business writing signals competence; the English relies on understatement
 * that would read as vague here.
 *
 * Reviewed for fluency and claims on 9 Nov 2026 (AI review); a native speaker's pass is still welcome.
 */
export const zhHans: Messages = {
  nav: {
    work: "案例",
    practices: "服务",
    solutions: "解决方案",
    industries: "行业",
    approach: "合作流程",
    contact: "联系我们",
    letsTalk: "预约沟通",
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
    sub: "我们开发定制软件，帮助您巩固竞争优势。",
    ctaPrimary: "预约沟通",
    ctaWork: "查看案例",
    ctaDeck: "下载公司介绍",
    languagesAvailable: "其他语言版本：",
    readInLanguage: "以{language}阅读本页",
    ctaAsk: "向我们提问",
    note: "免费，无需事先准备需求文档——带上最耗费您时间的那个流程即可。如果软件并不是合适的解决办法，我们会直接告诉您。",
    proof: {
      yearsFigure: "20+",
      yearsLabel: "年商业与技术经验",
      testsFigure: "7,060",
      testsLabel: "项自动化测试（内部 ERP 项目，未部署）",
      jurisdictionsFigure: "2",
      jurisdictionsLabel: "个司法辖区",
      languagesFigure: "7",
      languagesLabel: "种网站语言版本",
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
    eyebrow: "我们承接的项目",
    title: "我们最能发挥作用的几种情况",
    sub: "我们的项目大多始于以下某种情况。即使您的情况不太一样，也值得通个电话——关键在于问题本身的性质，而不在于所处的行业。",
    fits: [
      {
        headline: "业务还靠电子表格和聊天消息在运转",
        body: "库存记在一处，收付款记在另一处，决策散落在聊天群里。十个人的时候还管用，如今却成了制约发展的瓶颈。",
      },
      {
        headline: "之前找过供应商，结果没能用起来",
        body: "您花钱买了一套系统，团队却不愿意用。您对从头再来心存顾虑，想知道这次究竟有什么不同。",
      },
      {
        headline: "业务横跨多个国家",
        body: "向全球出口的日本企业；在亚洲设有分支机构的欧美企业；在印尼招聘员工的新加坡企业。不同的货币、税制和申报日程要放进同一套系统——而且没有哪家供应商不用从头讲解，就能同时理解两端。",
      },
      {
        headline: "数字必须准确，不能只是大致准确",
        body: "发票、收款、库存——这些环节容不得“差不多”，出错的代价比延误更高。",
      },
    ],
    regions: [
      "在柔佛或柔新经济特区（JS-SEZ）有业务吗？我们开发能够跨境运作的系统，例如目前已在日本客户处上线运行的出口系统。",
      "由新加坡统筹管理的菲律宾和越南团队，我们同样提供支持。",
    ],
    japanSite: null,
    pricing:
      "关于价格：首次通话时我们会给出价格区间，需求梳理之后给出确定报价，而不是凭一封邮件随口报个数字。如果现成工具已经能满足需求，我们会直接告诉您用哪一款——这比我们为您开发任何东西都更省钱。",
    pricingLead: "关于价格：",
  },

  work: {
    eyebrow: "精选案例",
    title: "两套客户系统，外加一套内部自研系统",
    sub: "我们按企业主的视角来介绍：这家公司原先实际是怎么做的，过程中又遇到了哪些问题。第三个是我们自己的内部项目，已完成测试，但尚未部署。",
    before: "此前状况",
    built: "我们做了什么",
    result: "成果",
    details: "详情",
    demosLine:
      "想亲眼看看系统运行，而不只是读介绍？我们准备了 {count} 个可运行的演示，直接在浏览器中用示例数据运行。",
    demosLink: "试用这些演示",
    disclaimer:
      "凡涉及保密约定的项目，均不披露客户名称。文中数字均取自系统本身，可在通话中详细讲解。",
    cases: [
      {
        sector: "跨境贸易",
        market: "日本",
        title: "一家靠电子表格和 WhatsApp 运转的车辆出口商",
        before:
          "库存放在 Airtable，收付款靠人工在 Excel 里对账，客户沟通分散在 WhatsApp 的各个对话中。此前一家离岸外包商交付的 CRM 团队用不起来，最后只拿来展示车辆。",
        built:
          "运营系统全面重建：库存、按角色限定权限的 CRM、形式发票与商业发票的自动生成、装运指示、银行对账单导入，以及两级收款分配。",
        metric: { figure: "2", caption: "个会造成资金损失的缺陷，在上线前被发现" },
        detail: [
          "重复导入银行对账单时，收款会在毫无提示的情况下被重复入账——多数日本银行不提供转账编号，去重键因此一直为空。现已改为由记录内容确定性生成的键。",
          "客户页面会向单个销售人员显示全公司的营收总额。该问题在测试中发现并修复，并由两名销售人员针对同一客户进行了验证。",
          "五种角色，权限各自独立：管理员、经理、销售、税务会计、客户。",
        ],
      },
      {
        sector: "AI 落地实施",
        market: "新加坡",
        title: "基于企业自有文档作答的 AI 助手",
        before:
          "通用聊天机器人对中小企业的知识型员工毫无用处：它不了解员工的岗位、所在行业，也不知道公司已经做出的决定。",
        built:
          "一套 AI 助手，具备四种推理模式、分层的组织上下文（行业、组织、岗位、个人）、基于客户自行上传文档的检索，以及跨部门的点对点协同。",
        metric: { figure: "2026", caption: "已交付客户，项目于当年完成" },
        detail: [
          "通过抽象层实现多大模型路由——应客户要求在不同供应商之间切换默认模型，无需改动任何产品代码。",
          "会议语音转文字，并将行动项提取为任务。",
          "基于 Cloudflare Workers 构建，使用 D1、KV、R2 与 Vectorize。",
        ],
      },
      {
        sector: "内部开发",
        market: "已测试，未部署",
        title: "一套自主开发的 ERP，用来展示我们如何测试",
        before:
          "涉及金额计算的软件，演示容易，取信难：大多只做抽查，有的甚至完全不测。我们希望在任何客户依赖我们的代码之前，先用一个足够大的自有项目，证明我们的测试方法。",
        built:
          "基于 Java 21 与 Spring Boot 的多租户 ERP 后端。这是内部开发项目：已测试，但尚未为任何客户部署。",
        metric: { figure: "7,060", caption: "覆盖 484 个计算类的自动化测试" },
        detail: [
          "测试结果来自 2026 年 8 月的运行，覆盖该系统全部 484 个计算类。",
          "115 个 REST 控制器。多币种、多租户、基于角色的权限控制、审计日志。",
          "仅作为我们如何构建和测试复杂系统的佐证。它不是已部署的客户系统，我们也不对其准确性作任何声明。",
        ],
      },
    ],
  },

  showcase: {
    eyebrow: "亲自试用",
    title: "13 个演示系统，任选一个，看它实际运行。",
    sub: "下方每张卡片都是可实际运行的演示，而非效果图。点开任意一个，即可立即看到示例结果。",
    sampleBadge: "示例",
    tryIt: "立即试用",
    seeAll: "查看全部解决方案",
    disclaimer:
      "所有示例均使用虚构数据。想看它在您自己的流程中如何运作，发给我们一份电子表格即可，完全免费。",
    teasers: {
      invoiceScanner: "几秒内完成扫描与逐项识别",
      customerChatbot: "回答置信度",
      appointmentBooking: "自动预约并确认",
      quotationGenerator: "报价单已生成，含 GST",
      jobPostingWriter: "条岗位要求已拟好",
      inventoryTracker: "项商品已标记需补货",
      socialMediaManager: "条多平台帖子一次起草完成",
      documentTranslator: "种语言，一键翻译",
      employeeOnboarding: "项入职任务已排期",
      salesAssistant: "封跟进邮件已按序排定",
      complianceChecker: "条高风险条款已识别",
      trainingContentGenerator: "个培训模块已生成",
      financialReportBuilder: "季度净利润及解读",
    },
  },

  practices: {
    eyebrow: "服务",
    title: "四大专业领域，同一支交付团队",
    sub: "我们不求铺开二十个方向，只把四个领域做深做透。每个领域都由负责人亲自主导，并根据工作需要配备专业人员。",
    details: "详情",
    items: [
      {
        title: "AI 落地实施",
        description:
          "基于贵司自有文档的检索、针对特定领域调优的模型，以及自动化流程——并配备安全护栏和来源标注，使输出结果能够用于受监管的业务。",
        details: [
          "检索增强生成（RAG），对贵司专有数据进行向量检索",
          "通过抽象层实现多供应商路由——更换模型无需改动产品代码",
          "置信度评分并标注来源，答案可供核查",
          "防止 AI 幻觉的护栏机制与合规审查",
        ],
      },
      {
        title: "业务系统",
        description:
          "运营平台、CRM、库存、单据与工作流，取代电子表格和互不相通的工具——按经得起审计的标准构建，而不只是为了演示。",
        details: [
          "库存、交易、单据与收付款集中在一套系统中，不再依赖电子表格和聊天记录",
          "多租户、多币种、基于角色的访问控制、可供审计的日志",
          "从您现有的电子表格起步，支持 Excel 与 Google 表格的导入导出",
          "部署在贵司自己的云账户、数据库与代码仓库中",
        ],
      },
      {
        title: "财务流程",
        description:
          "开票、银行对账单导入、对账与单据生成，全程保留会计师能够追溯的审计轨迹。",
        details: [
          "跨账户、跨币种的自动对账，并采用确定性去重",
          "银行对账单导入，包括不带转账编号的格式",
          "形式发票、商业发票与装运单据由同一套记录生成",
          "通过经认证的接入点，从您开票所用的系统或电子表格发出 InvoiceNow 电子发票",
        ],
      },
      {
        title: "跨境运营",
        description:
          "为在新加坡、日本及周边地区之间开展贸易的企业构建多币种、多语言系统，始终以各国规则为先。",
        details: [
          "数据存放地点在架构设计阶段就确定，而不是审查之后再补救",
          "多种货币、税制与单据格式集中在同一套系统中",
          "界面与单据支持英文、日文、中文、马来文或印尼文",
          "已在日本一家出口商上线运行：库存、交易、单据与收付款",
        ],
      },
    ],
  },

  industries: {
    eyebrow: "行业",
    title: "行业专长",
    sub: "深入理解您所在行业在监管、运营与技术方面的要求。",
    items: [
      {
        name: "贸易与物流",
        description:
          "面向业务规模已超出电子表格承载能力的贸易、批发与物流企业：库存、交易、装运单据与收付款。",
        details: [
          "库存与交易集中管理，每个角色只看到与自己相关的视图",
          "形式发票、商业发票与装运指示由同一条记录生成",
          "银行对账单导入与跨币种对账",
          "面向海外客户的货运追踪与买家门户",
        ],
      },
      {
        name: "金融与银行",
        description: "为财务团队及服务于他们的机构提供文档处理、对账、保险单据与风险核查。",
        details: [
          "实时交易监控与异常检测",
          "用文档 AI 读取对账单、保单与理赔材料，每个数字都标明出处",
          "跨账户、跨币种的自动对账",
          "AI 驱动的信用评分与风险评估",
        ],
      },
      {
        name: "教育",
        description: "具备 AI 辅导、自适应测评、认证管理与多语言授课的学习管理系统（LMS）。",
        details: [
          "根据学生表现自适应调整的学习路径",
          "AI 生成测验并自动批改",
          "多语言内容分发，配合语音合成",
          "证书追踪与资质管理",
        ],
      },
      {
        name: "政府与公共部门",
        description:
          "面向公共部门的安全、合规解决方案：公共服务自动化，以及不容中断的关键任务应用。",
        details: [
          "支持数字身份认证的市民服务门户",
          "许可、执照及各类申请的文件处理",
          "可供审计的日志与合规报告",
          "面向关键服务的高可用基础设施",
        ],
      },
      {
        name: "制造",
        description: "ERP 系统、预测性维护、供应链优化与质检自动化。",
        details: [
          "接入物联网传感器，实现预测性维护",
          "供应链可视化与实时追踪",
          "基于计算机视觉的质量检验",
          "生产排程与产能规划",
        ],
      },
      {
        name: "电子商务",
        description: "AI 推荐、虚拟助手、客服自动化与库存管理。",
        details: [
          "基于协同过滤的个性化商品推荐",
          "提供 7×24 小时客户支持的 AI 聊天机器人",
          "基于需求与竞品分析的动态定价",
          "结合季节性趋势识别的库存预测",
        ],
      },
    ],
  },

  approach: {
    eyebrow: "合作流程",
    title: "从需求梳理到上线，约十二周",
    sub: "每个项目都遵循同样的五个步骤，动手写代码之前，先以书面形式明确范围和费用。我们负责实施落地，而不只是提供建议。",
    deliverable: "交付物",
    step: "前往步骤",
    previous: "上一步",
    next: "下一步",
    items: [
      {
        week: "第 1–2 周",
        title: "需求梳理与 AI 就绪评估",
        items: [
          "业务目标与痛点分析",
          "现有系统与数据评估",
          "识别影响最大的 AI 应用机会",
          "定义成功指标与 KPI",
        ],
        deliverable: "AI 机会报告与投资回报测算",
      },
      {
        week: "第 3–4 周",
        title: "解决方案架构",
        items: [
          "AI 解决方案架构设计",
          "模型与平台选型",
          "系统集成规划",
          "数据管道与安全规范",
        ],
        deliverable: "技术架构与实施计划",
      },
      {
        week: "第 5–8 周",
        title: "概念验证",
        items: [
          "基于真实数据的可用原型",
          "AI 模型训练与微调",
          "核心功能实现",
          "用户测试与反馈",
        ],
        deliverable: "具备核心功能的可用概念验证（PoC）",
      },
      {
        week: "第 9–11 周",
        title: "上线部署",
        items: [
          "系统扩展至生产级规模",
          "安全、监控与备份",
          "负载测试与性能调优",
          "员工培训与文档编写",
        ],
        deliverable: "可交付用户使用的生产系统",
      },
      {
        week: "第 12 周起",
        title: "优化与支持",
        items: [
          "性能监控与反馈",
          "模型持续改进",
          "功能增强",
          "持续的技术支持",
        ],
        deliverable: "性能报告与优化建议",
      },
    ],
  },

  objections: {
    eyebrow: "坦率回答",
    title: "值得先问清楚的问题",
    sub: "我们最常被问到的问题，如实作答——包括有时诚实的答案是“您应该再等等”。",
    items: [
      {
        said: "我们之前花钱做过一次，结果用不起来。这次有什么不同？",
        answer:
          "通常问题不在开发本身，而在需求——动手写代码之前，没有人坐下来和真正做这份工作的人好好沟通过。所以我们先做需求梳理，无论之后是否继续合作，这份成果都归贵司所有。如果原有系统还能挽救，我们会直说；把一套基本能用的系统推倒重写，是在浪费您的钱。",
        proof: "前面提到的车辆出口系统重建，最初正是这样一个补救项目。",
      },
      {
        said: "万一你们无法继续提供服务，系统怎么办？",
        answer:
          "核心代码由负责人亲自编写，并根据工作需要引入专业人员。真正保障您的不是团队人数，而是系统有文档、有测试，并且部署在您自己拥有的基础设施上——您的 Cloudflare 账户、您的数据库、您的代码仓库。测试写明了系统应该做什么，所以其他工程师也能顺利接手。",
        proof: "我们内部 ERP 项目中，覆盖 484 个计算类的 7,060 项自动化测试。",
      },
      {
        said: "这样一套系统通常要多少钱？",
        answer:
          "首次通话时给出价格区间，需求梳理之后给出确定报价。我们会尽早说出真实的数字，而不是拖到最后；然后与您一起削减范围，直到符合预算——能上线的小系统，胜过半途搁浅的大系统。新加坡中小企业或可获得 EDGE 津贴（已取代 PSG）的支持；我们会协助您确认项目是否符合条件，并免费准备我方的供应商文件。",
        proof: "EDGE 津贴由新加坡企业发展局（Enterprise Singapore）审批，StarTech 并非 EDGE 预先核准的供应商。",
      },
      {
        said: "再等一两个季度，会有什么代价吗？",
        answer:
          "有时并没有，那我们就会直说。与其在问题还不急的时候签约，我们宁可您等到问题真正紧迫时再来找我们。值得一提的是：等待的成本通常不在软件本身，而在这段时间里的手工对账和由此产生的差错。如果您愿意，我们可以在通话中把这笔账算清楚，让您看着具体数字再做决定。",
      },
      {
        said: "我们需要花多少工夫解释自己的业务？",
        answer:
          "这正是我们这家公司存在的意义。您不必解释什么是试算平衡表、税务发票上应列明什么，或者某笔款项为什么要这样对账。像向您的会计师交代工作那样，向我们说明即可。",
        proof: "在商业与技术两方面都有二十多年经验。",
      },
    ],
  },

  capabilityDeck: {
    eyebrow: "随时查阅",
    title: "我们的完整介绍，汇总在一份文档里。",
    sub: "本页的每项服务、每个佐证、每个数字。",
    cta: "下载公司能力介绍",
  },

  contact: {
    eyebrow: "联系我们",
    title: "三十分钟，给您一个坦诚的答复",
    sub: "告诉我们这个流程目前让您付出了多少成本，我们会告诉您哪些值得开发。",
    email: "电子邮箱",
    phone: "电话",
    reassurance:
      "无需任何承诺。无论之后是否继续合作，需求梳理的成果都归您所有。",
    name: "姓名",
    company: "公司名称",
    message: "留言内容",
    messagePlaceholder: "请简单介绍一下您的项目…",
    send: "发送留言",
    sending: "发送中…",
    success: "感谢您的留言，我们会尽快回复您。",
    error: "发送失败，请重试，或直接给我们发邮件。",
    country: "国家或地区",
    staff: "员工人数",
    staffPick: "请选择人数",
    staffOptions: ["10 人以下", "10 至 50 人", "51 至 200 人", "200 人以上"],
    spreadsheet: "您的电子表格（选填）",
    spreadsheetHint:
      "支持 Excel、CSV 或 Numbers 格式，最大 10 MB。请先删除机密内容；提供部分样本行即可。",
    fileTooLarge: "文件超过 10 MB，请只发送其中一部分。",
  },

  // /flyer 数字传单。内容不超出公司能力介绍的范围。
  flyer: {
    eyebrow: "新加坡 · 日本 · 服务全球",
    headline: "从电子表格，到系统。",
    who: "适合 10 至 200 人规模、仍靠电子表格运转，或正在使用一套供应商没做完的系统的企业。我们开发真正支撑您日常运营的软件，每一部分都归您所有。",
    ctaOffer: "发给我们一份电子表格",
    ctaDeck: "下载公司介绍",
    proofEyebrow: "三个事实",
    proof: [
      {
        lead: "已在日本上线",
        detail:
          "一家二手车出口商的业务运行在我们开发的系统上：库存、CRM、发票、出运单据和收款。该系统目前正在客户的生产环境中运行。",
      },
      {
        lead: "7,060 项测试",
        detail:
          "我们自研 ERP 中覆盖 484 个计算类的自动化测试，结果来自 2026 年 8 月的测试运行。这是内部项目，尚未部署，我们不对其准确性作任何声明。",
      },
      {
        lead: "归您所有",
        detail:
          "代码由创始人亲自编写。云账户、数据库和代码仓库从第一周起就在您的名下，任何供应商都无法挟持您的业务。",
      },
    ],
    demosEyebrow: "先试用，再决定",
    demosTitle: "可运行的演示，不是幻灯片",
    demosSub: "{count} 个小型系统，可直接在浏览器中用示例数据运行。以下三个适用面最广。",
    demoOpen: "打开演示",
    demosAll: "查看全部 {count} 个演示",
    invoiceNowLink: "InvoiceNow：查看由电子表格生成的电子发票示例",
    offerEyebrow: "我们的提议",
    offerTitle: "发给我们一份电子表格，我们把它做成可运行的系统给您看。",
    offerBody:
      "选一份支撑您业务运转的表格：报价、库存、工单、配送，什么都行。两周内，您就能看到它变成一套载入了您自己数据的可运行系统，并得到一个明确的答复：完整开发需要多少费用。",
    offerPoints: ["免费，无需承诺", "每月限 3 至 5 家企业", "演示中开发的成果归您所有"],
    formEyebrow: "从这里开始",
    formTitle: "一份电子表格，一张表单",
    formSub: "告诉我们这份表格目前帮您做什么。我们会在两个工作日内回复。",
    formReassurance:
      "您的文件将私密保存，仅由一人查阅，并可应您要求删除。不会与他人共享，也不会出售。",
    formSend: "发送电子表格",
    messagePlaceholder: "这份表格在业务中起什么作用？在哪些地方会出问题？",
    deckLine: "下载 8 页公司能力介绍，无需留下邮箱。",
    grantsLabel: "新加坡企业：",
    grantsLine: "我们会帮您确认项目是否符合 EDGE 津贴的申请条件。",
    backHome: "返回主站",
  },

  testimonial: {
    eyebrow: "客户评价",
    title: "与 StarTech 合作的体验如何？",
    intro: "您对项目的一两句评价，能帮助其他企业判断是否与我们合作。在您查看并认可最终文字之前，我们不会发布任何内容。",
    name: "您的姓名",
    role: "您的职位",
    company: "公司",
    email: "电子邮箱",
    quote: "您的评价",
    quotePlaceholder: "您当时需要解决什么问题？项目进展如何？之后有什么改变？",
    quoteHint: "一到三句话就足够了。",
    credit: "您希望我们如何署名？",
    creditFull: "姓名、职位和公司",
    creditAnonymous: "仅显示职位和行业，不显示姓名",
    creditPrivate: "仅作反馈，请勿发布",
    consent: "我同意 StarTech 因篇幅需要对内容进行删减；StarTech 会在发布前将最终文字交我确认。",
    send: "提交评价",
    sending: "提交中…",
    thanksTitle: "谢谢您！",
    thanksBody: "我们已收到您的评价。在任何内容上线之前，我们会把最终文字发给您确认。",
    errorRequired: "请填写此项。",
    errorEmail: "请输入有效的电子邮箱地址。",
    errorQuoteShort: "请至少写一句话（20 个字符）。",
    errorConsent: "请勾选此项以继续。",
    error: "提交失败，请重试。",
  },
  invoicenow: {
    eyebrow: "InvoiceNow · 新加坡",
    headline: "用您现有的系统，直接发送 InvoiceNow 电子发票",
    lead: "InvoiceNow 是新加坡的电子发票网络，新加坡国内税务局（IRAS）正分阶段要求所有 GST（消费税）注册企业采用。我们把您开票所用的系统或电子表格，连接到 InvoiceNow 接入点。",
    ctaDemo: "试用示例发票",
    ctaFlyer: "发给我们一份电子表格",
    whatEyebrow: "它是什么",
    whatTitle: "InvoiceNow 简明说明",
    what: [
      {
        title: "是数据文件，不是 PDF",
        body: "InvoiceNow 发票是一种结构化文件（Peppol PINT SG，XML 格式），买方系统可以直接读取，无需任何人重新录入。",
      },
      {
        title: "通过 Peppol 网络发送",
        body: "您的发票先发送到接入点，接入点根据买方的 Peppol ID（由其 UEN 生成）找到对方，再投递到买方的接入点。",
      },
      {
        title: "同时抄送 IRAS",
        body: "对于 GST 注册企业，接入点还会把发票数据发送给 IRAS。卖方、买方及双方的接入点构成四角模型，IRAS 是第五角。",
      },
    ],
    whoEyebrow: "谁必须使用，何时开始",
    whoTitle: "IRAS 正在分阶段对所有 GST 注册企业推行",
    whoIntro: "根据 IRAS 的规定，GST 注册企业须自以下日期起，通过 InvoiceNow 向 IRAS 发送发票数据：",
    phases: [
      { date: "2025年11月1日", text: "在注册成立后 6 个月内自愿注册 GST 的公司。" },
      { date: "2026年4月1日", text: "自该日起申请自愿注册 GST 的所有企业。" },
      { date: "2028年4月1日", text: "自该日起申请强制注册 GST 的企业，以及年供应额不超过 S$200,000 的现有 GST 注册企业。" },
      { date: "2029年4月1日", text: "年供应额不超过 S$100 万的现有 GST 注册企业。" },
      { date: "2030年4月1日", text: "年供应额不超过 S$400 万的现有 GST 注册企业。" },
      { date: "2031年4月1日", text: "年供应额超过 S$400 万的现有 GST 注册企业。" },
    ],
    whoNote: "IRAS 根据 2025 年申报的供应额划分档次，并正在通知现有企业各自的开始日期。具体情况请查阅 IRAS 页面。",
    whoSource: "IRAS：GST InvoiceNow 要求（页面最后更新于 2026 年 10 月 8 日）",
    accountant: "我们只做软件集成。InvoiceNow 是否适用于您，以及每一行发票明细的 GST 处理方式，请向您的会计师或 IRAS 确认。",
    offerEyebrow: "我们做什么",
    offerTitle: "我们把您开票所用的系统或电子表格，连接到 InvoiceNow 接入点。",
    offerBody: "如果您用自建系统、旧版 ERP 或电子表格开票，IRAS 给出的做法是通过经认证的接入点进行连接。我们负责搭建这一连接：把您的发票数据映射到 PINT SG，通过接入点的 API 发送，并把投递状态回传到您日常使用的界面。",
    offerPoints: [
      "发票数据映射到 PINT SG",
      "通过接入点的 API 发送",
      "投递状态与错误显示在您日常使用的界面中",
    ],
    offerHonest: "StarTech 不是接入点服务商，也未获得 IMDA 认证。正式连接须通过我们与您共同选定的、经 IMDA 认证的接入点进行。",
    demoEyebrow: "试一试",
    demoTitle: "把示例发票转换成 PINT SG XML",
    demoIntro: "填写发票，或上传 CSV 模板。浏览器会生成 XML，并按部分 PINT SG 规则进行检查。数据不会发送到任何地方。",
    sampleBadge: "示例数据，并非有效的税务发票",
    csvTitle: "从电子表格开始",
    csvHint: "每条发票明细占一行，每行重复填写发票和买方信息。卖方信息仍在下方表单中填写。",
    csvDownload: "下载 CSV 模板",
    csvUpload: "上传 CSV 文件",
    csvLoaded: "已从文件载入 {count} 行。",
    csvSkipped: "文件中另有 {count} 个发票号码；只载入了第一张发票。",
    csvErrorEmpty: "该文件为空。",
    csvErrorColumns: "文件缺少以下列：{columns}",
    csvErrorRows: "文件只有表头行，没有发票明细。",
    csvErrorRead: "无法读取该文件。",
    loadValid: "填入有效示例",
    loadBroken: "填入含错误的示例",
    invoiceSection: "发票信息",
    sellerSection: "卖方（您的企业）",
    buyerSection: "买方",
    linesSection: "发票明细",
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
      lineAmount: "明细金额",
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
      OS: "OS · 不属于征税范围",
      NG: "NG · 卖方未注册 GST",
    },
    categoryNote: "类别代码来自 PINT SG 代码表。某一行明细适用哪个类别，请咨询您的会计师。",
    addLine: "添加明细",
    removeLine: "删除第 {n} 行",
    lineLabel: "第 {n} 行",
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
    checksSummary: "{total} 项检查中，{passed} 项通过",
    pass: "通过",
    fail: "未通过",
    demoCheck: "StarTech 演示用检查，并非 PINT SG 规则",
    checksSource: "规则编号来自 2026 年 5 月 25 日发布的 PINT SG Billing v1.4.1 schematron。这里只是在浏览器中运行的部分检查；正式发送前，接入点会执行完整验证。",
    checks: {
      specIds: "规范标识与业务流程标识均为 PINT SG 开票（Billing）",
      invoiceNumber: "发票有号码",
      issueDate: "有开票日期，且所有日期均为 YYYY-MM-DD 格式",
      dueOrTerms: "有应付金额，因此提供了付款到期日或付款条件",
      buyerReference: "提供了买方参考号或采购订单号",
      currency: "发票币种为 SGD，且没有另设税务币种",
      sellerName: "提供了卖方注册名称",
      buyerName: "提供了买方注册名称",
      sellerEndpoint: "卖方有 Peppol 地址（编码方案 0195，由 UEN 生成）",
      buyerEndpoint: "买方有 Peppol 地址（编码方案 0195，由 UEN 生成）",
      sellerLegalId: "已提供卖方 UEN 作为其法定注册号码",
      sellerGstId: "收取了 GST，因此提供了卖方 GST 注册号码",
      sellerAddress: "提供了卖方街道地址和邮政编码",
      buyerAddress: "提供了买方街道地址和邮政编码",
      countries: "卖方和买方地址都带有国家代码",
      uuid: "发票有格式正确的唯一标识（UUID）",
      linesNamed: "至少有一行明细，且每行都有品名",
      lineCategories: "每行明细都有有效的新加坡 GST 类别代码",
      lineAmounts: "每行金额等于数量 × 单价",
      netTotals: "不含 GST 合计等于各行金额之和",
      gstAmounts: "各类别 GST 等于应税金额 × 税率，并与 GST 总额相符",
      payable: "含 GST 合计与应付金额相符",
      decimals: "所有金额都不超过 2 位小数",
      noGst: "未注册 GST（NG）的明细行没有与 GST 明细行混用",
      noGstNumber: "含 NG 明细行的发票没有填写卖方 GST 号码",
      uenFormat: "两个 UEN 的格式都正确",
    },
    xmlTitle: "生成的 XML",
    download: "下载 XML",
    nextEyebrow: "接下来会发生什么",
    nextTitle: "这个文件实际如何发送",
    next: [
      {
        title: "您的系统生成文件",
        body: "在正式连接中，每次开具发票时，XML 都由您自己的发票数据生成，无需手工录入。",
      },
      {
        title: "发送到接入点",
        body: "您的系统通过该服务商的 API，把文件发送到经 IMDA 认证的接入点。接入点会执行完整的 PINT SG 验证。",
      },
      {
        title: "买方收到发票",
        body: "接入点通过 Peppol 目录找到买方的接入点，把发票投递到买方的系统中。",
      },
      {
        title: "IRAS 收到副本",
        body: "提交功能开启后，接入点还会把发票数据发送给 IRAS，这就是第五角。",
      },
    ],
    nextNote: "本页面没有连接任何接入点。正式连接会使用我们与您共同选定的、经 IMDA 认证的接入点。",
    ctaTitle: "您现在用电子表格开发票吗？",
    ctaBody: "把您开票用的电子表格发给我们。我们会展示它如何映射到 InvoiceNow，并坦率告诉您连接需要做哪些工作。免费，无需承诺。",
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
    ctaCheck: "申请检查您的集成",
    ctaDemo: "运行演示",
    changesEyebrow: "有哪些变化",
    changesTitle: "登录方式的五项变化",
    changes: [
      {
        lead: "请求提前发送",
        detail:
          "您的服务器先把登录请求发送给 Singpass（PAR），用户的浏览器只携带一个简短的引用值，地址栏中没有任何可被篡改的内容。",
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
          "每个 ID 令牌现在都用您的密钥加密，NRIC 也改到了新字段。读取旧格式的代码将会失效。",
      },
      {
        lead: "更严格的跳转与错误处理",
        detail:
          "不再接受自定义协议的应用链接；Login 应用必须说明每次登录的用途；Singpass 现在还会把错误返回到您的网站，网站必须处理这些错误。",
      },
    ],
    migrationLink: "Singpass 针对 Login 和 Myinfo（v5）应用的迁移指南",
    whoEyebrow: "受影响的对象",
    whoTitle: "所有使用 Singpass 登录或自动填写个人信息的网站和应用",
    who: [
      "带有“使用 Singpass 登录”的网站、门户和移动应用",
      "从 Myinfo 预填个人信息的表单",
      "2026 年 2 月之前搭建的集成；此后注册的应用从一开始就必须使用 FAPI 2.0",
      "Myinfo v3 和 v4 集成，Singpass 要求它们在 2026 年 9 月底前迁移到 Myinfo v5",
    ],
    corppass: "Corppass 登录另有更晚的截止日期：2027 年 3 月 31 日。",
    corppassLink: "Corppass 时间表",
    riskEyebrow: "如果不迁移",
    riskTitle: "请做好旧登录方式失效的准备",
    riskBody:
      "Singpass 要求所有集成在 2026 年 12 月 31 日前采用 FAPI 2.0，并已于 2026 年 7 月 14 日下线旧流程的文档。仍在使用旧流程的集成，应预计在截止日期后 Singpass 登录或 Myinfo 预填会失败：用户无法登录，表单也无法完成。",
    demoEyebrow: "可运行的参考演示",
    demoTitle: "完整的 FAPI 2.0 流程，在您的浏览器中运行",
    demoIntro:
      "演示针对我们专门搭建的模拟 Singpass 服务器，执行真实的协议步骤。密钥在您的浏览器中全新生成，人物为示例，不会向 Singpass 发送任何内容。每个请求和响应都会显示，令牌已截短。",
    demoNotice:
      "模拟服务器：不是 Singpass，也未与 Singpass 或 GovTech 连接。同一套客户端代码也能对接 Singpass 官方的预发布环境：请用下方按钮试试。",
    appType: "应用类型",
    appLogin: "Singpass 登录",
    appMyinfo: "Myinfo（v5）",
    run: "运行流程",
    runAgain: "再运行一次",
    running: "正在运行流程…",
    allPassed: "所有步骤均已通过。以下数据经由绑定此浏览器密钥的授权码和令牌，以加密并签名的形式送达。",
    failed: "有一个步骤失败，其请求和响应显示在下方。",
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
        title: "生成本次登录专用的机密参数",
        body: "全新的 state、nonce、PKCE verifier（S256）和 DPoP 密钥，只用于这一次登录，用完即弃。",
      },
      par: {
        title: "提前发送请求（PAR）",
        body: "登录请求连同签名的客户端断言（private_key_jwt）和 DPoP 证明，先发送到服务器。服务器返回一个短时有效的 request_uri。",
      },
      authorize: {
        title: "将用户重定向到 Singpass",
        body: "地址中只包含 client_id 和 request_uri。在真实服务中，用户此时会在 Singpass 应用中批准登录。",
      },
      redirect: {
        title: "处理回调",
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
        title: "获取 Myinfo 数据",
        body: "使用 Authorization: DPoP，并附上绑定访问令牌的证明（ath）。响应同样经过加密和签名，并放在 person_info 中。",
      },
      replay: {
        title: "尝试使用被盗的授权码",
        body: "有人复制了授权码和 PKCE verifier，在另一台设备上用自己的密钥尝试使用。服务器必须拒绝。",
        refused: "已按预期拒绝：授权码只能配合申请它的那把密钥使用。",
        accepted: "服务器接受了被盗的授权码。这是一个缺陷。",
      },
    },
    loginTitle: "模拟 Singpass 登录",
    loginBody: "在真实的 Singpass 中，用户此时会用 Singpass 应用扫描二维码。在这里，由您代示例人物做出选择。",
    loginRequested: "请求的数据",
    loginPurpose: "用途",
    approve: "以示例人物身份登录",
    cancel: "取消登录",
    sample: "示例人物，并非真人",
    resultTitle: "您的网站收到的内容",
    errorGeneric: "出现问题，请稍等片刻再运行一次流程。",
    offerEyebrow: "我们提供的服务",
    offerTitle: "我们检查并升级您的 Singpass 集成",
    offerSteps: [
      {
        lead: "检查",
        detail: "我们审阅您现有的 Singpass 或 Myinfo 代码，并以书面形式说明需要修改哪些地方、需要多长时间。",
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
    otherWork: "看看我们还开发哪些系统",
    formEyebrow: "Singpass 检查",
    formTitle: "请我们检查您的 Singpass 登录",
    formSub: "告诉我们哪个网站或应用使用了 Singpass 登录。我们会在两个工作日内回复，说明 FAPI 2.0 变更对它有何影响。",
    formPlaceholder: "哪个网站或应用有 Singpass 登录？由谁开发？是否使用 Myinfo 或 Corppass？",
    formSend: "申请 Singpass 检查",
    flyerLine: "Singpass 必须在 2026 年 12 月 31 日前升级到 FAPI 2.0。查看新登录流程的可运行演示。",
    stagingTitle: "在 Singpass 预发布环境中试用",
    stagingBody: "这个按钮以 StarTech 的预发布应用身份，对 Singpass 官方的预发布服务运行同一套客户端。只有 Singpass 预发布测试账户可以登录，真实的 Singpass 账户无法登录。",
    stagingButton: "使用 Singpass 登录（预发布）",
    stagingResult: "Singpass 预发布环境返回的 ID 令牌（已解密并验证）",
    stagingCancelled: "预发布登录已取消。",
    stagingFailed: "预发布登录未能完成，请稍后再试。",
  },

  stickyCta: {
    line: "用三十分钟梳理您的流程，明确应该先开发什么。",
    action: "预约沟通",
  },

  footer: {
    location: "新加坡",
    rights: "StarTech Innovation Pte. Ltd.",
  },

  demos: {
    signIn: {
      title: "自定义{title}",
      subtitle: "使用 Google 登录，即可用您自己的数据生成定制结果。",
      notConfigured: "登录功能尚未开通，请稍后再来查看。",
      signedInAs: "已登录：",
      backToSample: "← 返回示例",
    },
  },
};
