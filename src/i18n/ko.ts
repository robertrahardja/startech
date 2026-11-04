import type { Messages } from "./en";

/**
 * Korean.
 *
 * Written in 합쇼체 (합니다/습니다) — the register a Korean company uses when
 * addressing a prospective client. Slightly more direct than the Japanese,
 * which suits Korean business writing.
 *
 * NEEDS A NATIVE REVIEW before this locale is linked publicly.
 */
export const ko: Messages = {
  nav: {
    work: "사례",
    practices: "서비스",
    solutions: "솔루션",
    industries: "산업",
    approach: "진행 방식",
    contact: "문의",
    letsTalk: "상담 요청",
    openMenu: "메뉴 열기",
    closeMenu: "메뉴 닫기",
    language: "언어",
    ask: "문의하기",
  },

  hero: {
    eyebrowShort: "싱가포르 · 전 세계 대응",
    eyebrowFull: "싱가포르 · 2021년 설립 · 전 세계 대응",
    headlineLead: "비즈니스와 기술,",
    headlineBusiness: "두 언어를",
    headlineAnd: "모두",
    headlineTech: "구사합니다",
    sub: "귀사의 경쟁력을 지키는 맞춤형 소프트웨어를 개발합니다.",
    ctaPrimary: "상담 요청",
    ctaWork: "사례 보기",
    ctaDeck: "소개서 다운로드",
    languagesAvailable: "지원 언어:",
    readInLanguage: "{language}로 이 페이지 보기",
    ctaAsk: "질문하기",
    note: "무료로 상담해 드립니다. 사전 자료는 필요하지 않습니다. 가장 많은 시간이 드는 업무를 알려주십시오. 소프트웨어가 답이 아니라면 그렇게 말씀드리겠습니다.",
    proof: {
      yearsFigure: "20년+",
      yearsLabel: "비즈니스와 기술 양쪽",
      testsFigure: "7,060",
      testsLabel: "자동화 테스트",
      jurisdictionsFigure: "2",
      jurisdictionsLabel: "관할 지역",
      languagesFigure: "4",
      languagesLabel: "지원 언어",
    },
    card: {
      role: "대표이사",
      tagline: "비즈니스 · 재무 · 기술",
      country: "싱가포르",
      uen: "UEN 202110461R",
      workingIn: "지원 언어",
    },
  },

  qualify: {
    eyebrow: "저희가 맡는 일",
    title: "가장 잘하는 영역",
    sub: "대부분의 프로젝트는 이 네 가지 중 하나로 시작합니다. 해당되지 않더라도 상담해 볼 가치가 있습니다. 산업보다 문제의 형태가 더 중요합니다.",
    fits: [
      {
        headline: "업무가 스프레드시트와 메신저로 돌아갑니다",
        body: "재고는 스프레드시트에, 결제는 다른 파일에, 결정은 대화 기록 속에 있습니다. 열 명일 때는 굴러갔지만 지금은 성장을 가로막고 있습니다.",
      },
      {
        headline: "이미 한 번 맡겼지만 쓰지 못했습니다",
        body: "비용을 지불했는데 현장에서 쓰지 않는 시스템이 나왔습니다. 다시 시작하기가 조심스럽고, 이번에는 무엇이 다른지 알고 싶으십니다.",
      },
      {
        headline: "국경을 넘어 사업을 하십니다",
        body: "전 세계로 수출하는 일본 기업, 아시아에 법인을 둔 유럽·미국 기업, 인도네시아에서 채용하는 싱가포르 기업. 통화도 세제도 신고 일정도 다른 것을 한 시스템에서 다뤄야 하는데, 양쪽을 설명 없이 이해하는 업체를 찾기 어렵습니다.",
      },
      {
        headline: "숫자는 대충 맞아서는 안 됩니다",
        body: "자금, 급여, 청구. 근사치로는 넘어갈 수 없고, 늦는 것보다 틀리는 것이 더 비싼 영역입니다.",
      },
    ],
    pricing:
      "비용에 관하여: 첫 상담에서 대략적인 범위를, 요건 정의 후에 정확한 금액을 알려드립니다. 이메일만 보고 금액을 제시하지 않습니다. 기성 제품으로 해결된다면 어떤 제품인지 알려드리겠습니다. 저희가 개발하는 것보다 저렴한 답입니다.",
    pricingLead: "비용에 관하여:",
  },

  work: {
    eyebrow: "주요 사례",
    title: "운영 중인 시스템",
    sub: "네 건의 개발 사례입니다. 도입 전에 무엇이 문제였는지, 개발 과정에서 어떤 문제가 있었는지까지 적었습니다.",
    before: "도입 전",
    built: "구축한 내용",
    result: "성과",
    details: "상세 내용",
    disclaimer:
      "비밀 유지 계약이 적용되는 프로젝트는 고객사명을 밝히지 않습니다. 기재된 수치는 납품된 시스템에 근거하며, 상담 시 자세히 설명해 드릴 수 있습니다.",
    cases: [
      {
        sector: "무역",
        market: "일본",
        title: "스프레드시트와 메신저로 운영되던 차량 수출 회사",
        before:
          "재고는 Airtable에, 입금 대사는 수작업 엑셀에, 고객 대화는 메신저에 흩어져 있었습니다. 이전 업체가 납품한 CRM은 현장에서 쓰지 못해 차량 게시용으로만 쓰이고 있었습니다.",
        built:
          "업무 전반의 재구축입니다. 재고 관리, 권한을 나눈 고객 관리, 견적 송장과 상업 송장 자동 생성, 선적 지시, 은행 명세 가져오기, 2단계 입금 처리.",
        metric: { figure: "2", caption: "출시 전에 잡아낸 금액 관련 결함" },
        detail: [
          "같은 은행 명세를 다시 가져오면 입금이 두 번 잡혔습니다. 일본 은행 대부분이 이체 ID를 주지 않아 중복 판별 키가 비어 있던 것이 원인입니다. 명세 행의 내용으로 결정적으로 생성하는 키로 교체했습니다.",
          "고객 화면이 회사 전체 매출을 개별 영업 담당자에게 노출하고 있었습니다. 테스트에서 발견해 수정한 뒤 담당자 두 명으로 검증했습니다.",
          "관리자, 매니저, 영업, 세무사, 고객까지 다섯 권한을 각각 분리했습니다.",
        ],
      },
      {
        sector: "전사 시스템",
        market: "싱가포르·인도네시아",
        title: "회계사가 한 줄씩 검증할 수 있는 급여 엔진",
        before:
          "싱가포르 급여 규정은 봐주는 법이 없습니다. CPF의 3단계 반올림, 연령과 체류 구분, 통상임금 상한, SDL의 하한과 상한. 대부분의 시스템은 근사치로 처리하고 아무도 검산하지 않기를 바랍니다.",
        built:
          "Java 21과 Spring Boot 기반의 멀티테넌트 전사 시스템입니다. 싱가포르 급여 엔진은 CPF Board 표에 대해 항목별로 검증했습니다.",
        metric: { figure: "7,060", caption: "484개 계산 클래스에 걸친 자동화 테스트" },
        detail: [
          "CPF 48개 시나리오를 인쇄 가능한 검증표로 문서화했습니다. 연령 구간, 영주권 1년차·2년차 요율, 반올림 경계, 상한 처리를 회계사가 한 줄씩 확인하고 서명할 수 있는 형태입니다.",
          "다섯 개의 독립된 회계 엔진이 모든 재무제표를 다시 계산합니다. 원장, 시산표, 손익계산서, 재무상태표, 현금흐름이 일치해야 통과합니다.",
          "51개의 REST 컨트롤러. 다통화, 멀티테넌트, 권한 관리, 감사 로그.",
        ],
      },
      {
        sector: "AI 도입",
        market: "싱가포르",
        title: "회사 자체 문서에서 답하는 AI 어시스턴트",
        before:
          "범용 챗봇은 중소기업 실무자에게 쓸모가 없습니다. 그 사람의 직무도, 업계도, 조직이 이미 정한 방침도 모르기 때문입니다.",
        built:
          "네 가지 사고 모드, 계층화된 조직 맥락(업계·조직·직무·개인), 고객이 직접 올린 문서 검색, 부서 간 연계를 갖춘 운영 중인 어시스턴트입니다.",
        metric: { figure: "운영 중", caption: "운영 API, 유료 고객" },
        detail: [
          "추상화 계층을 둔 다중 LLM 전환. 고객 지시에 따라 제품 코드를 건드리지 않고 기본 모델을 다른 제공사로 바꿨습니다.",
          "회의 음성을 텍스트로 옮기고 결정 사항을 업무로 추출합니다.",
          "Cloudflare Workers 위에서 D1, KV, R2, Vectorize를 사용합니다.",
        ],
      },
      {
        sector: "의료",
        market: "인도네시아·동남아시아",
        title: "병원이 아니라 환자가 소유하는 진료 기록",
        before:
          "인도네시아와 싱가포르 의료기관을 오가는 환자는 종이 파일과 사진으로 기록을 들고 다닙니다. 의료기관 시스템끼리 연결되지 않고, 국경 간 데이터 규제 때문에 단순한 연동은 위법입니다.",
        built:
          "싱가포르에서 운영하고 데이터를 싱가포르 안에만 두는 3개 언어 환자 소유형 의료 플랫폼입니다. 생활 습관 기록, 보험 가입, AI 상담이 운영 중이고 국경 간 보관과 임상의 화면을 개발 중입니다.",
        metric: { figure: "3", caption: "개 언어, 하나의 코드베이스" },
        detail: [
          "설계상 환자가 소유한 사본을 보관하는 수탁자에 머물며, 의료기관의 원본 시스템을 자처하지 않습니다.",
          "데이터 보관 위치는 설계 단계에서 정했으며, 감사 이후에 덧붙인 것이 아닙니다.",
          "싱가포르, 말레이시아, 인도네시아의 보험 제휴사와 의료기관 정보를 정리했습니다.",
        ],
      },
    ],
  },

  showcase: {
    eyebrow: "직접 사용해 보세요",
    title: "13가지 구축 사례. 하나를 골라 직접 실행해 보세요.",
    sub: "아래 카드는 모두 목업이 아니라 실제로 작동하는 데모입니다. 열어보면 바로 샘플 결과가 나타납니다.",
    sampleBadge: "샘플",
    tryIt: "체험하기",
    seeAll: "모든 솔루션 보기",
    disclaimer:
      "각 샘플은 가상의 데이터를 사용합니다. 귀사의 업무로 작동하는 모습을 보고 싶다면 스프레드시트 하나를 보내 주세요(무료).",
    teasers: {
      invoiceScanner: "몇 초 만에 스캔 및 항목화",
      customerChatbot: "답변 신뢰도",
      appointmentBooking: "자동으로 예약 및 확정",
      quotationGenerator: "GST 포함 견적서 작성",
      jobPostingWriter: "작성된 직무 요건",
      inventoryTracker: "재주문이 필요한 항목",
      socialMediaManager: "한 번에 작성된 게시물 수",
      documentTranslator: "언어, 클릭 한 번으로 번역",
      employeeOnboarding: "예약된 온보딩 작업",
      salesAssistant: "자동 구성된 후속 이메일",
      complianceChecker: "발견된 고위험 조항",
      trainingContentGenerator: "제작된 교육 모듈",
      financialReportBuilder: "분기 순이익 분석",
    },
  },

  practices: {
    eyebrow: "서비스",
    title: "네 개의 전문 영역, 하나의 팀",
    sub: "스무 개 분야로 넓히기보다 네 개 영역을 깊이 다룹니다. 모든 프로젝트를 대표가 직접 담당하며, 필요에 따라 전문가를 투입합니다.",
    details: "자세히",
    items: [
      {
        title: "AI 도입",
        description:
          "자사 문서를 대상으로 한 검색, 업무에 맞춘 모델, 자동화 파이프라인. 규제 업무에서도 쓸 수 있도록 근거 표시와 안전장치를 갖춥니다.",
        details: [
          "자사 데이터를 대상으로 한 벡터 검색 기반 검색 증강 생성",
          "추상화 계층을 둔 다중 제공사 전환. 제품 코드를 건드리지 않고 모델을 교체합니다",
          "확신도와 출처 표시로 답변을 검증할 수 있습니다",
          "환각 방지와 규정 검토를 위한 안전장치",
        ],
      },
      {
        title: "전사 시스템",
        description:
          "재무, 인사, 재고, 구매, 생산까지. 시연용이 아니라 감사를 견디도록 만듭니다.",
        details: [
          "총계정원장, 매입채무, 매출채권, 급여, 고정자산",
          "멀티테넌트, 다통화, 권한 관리, 감사 로그",
          "싱가포르 급여 엔진을 CPF Board 표에 대해 항목별로 검증",
          "Xero, QuickBooks, 스프레드시트 연동",
        ],
      },
      {
        title: "재무 시스템",
        description:
          "회계 엔진, 문서 AI 처리, 기업 가치 평가, 대사. 감독 기관에 설명할 책임이 있는 사업자를 위한 것입니다.",
        details: [
          "계좌와 통화를 넘나드는 자동 대사, 결정적 중복 판별 포함",
          "이체 ID가 없는 형식을 포함한 은행 명세 가져오기",
          "KYC와 AML 절차, MAS 및 OJK 보고",
          "몬테카를로 시뮬레이션을 적용한 DCF와 유사기업 비교",
        ],
      },
      {
        title: "의료·공공",
        description:
          "환자 플랫폼, 진료 기록, 시민 서비스. 처리량이 많고 확실성이 요구되며 데이터 규정이 최우선인 영역입니다.",
        details: [
          "데이터 보관 위치는 설계 단계에서 결정합니다. 감사 후에 덧붙이지 않습니다",
          "환자 소유 사본을 보관하는 수탁자에 머물며 의료기관 원본을 자처하지 않습니다",
          "영어, 중국어, 말레이어, 인도네시아어로 제공",
          "핵심 업무를 위한 고가용성 구성",
        ],
      },
    ],
  },

  industries: {
    eyebrow: "산업",
    title: "산업 전문성",
    sub: "귀사가 속한 산업의 규제, 운영, 기술 요건을 깊이 이해하고 있습니다.",
    items: [
      {
        name: "의료",
        description: "병원 운영, 환자 접수 자동화, 진료 기록 분석, AI 중증도 분류.",
        details: [
          "HL7 및 FHIR를 준수하는 전자 의무기록",
          "증상의 위중도로 우선순위를 정하는 AI 트리아지",
          "보험 청구 자동 제출과 진행 관리",
          "예약과 청구를 포함한 원격 진료 연동",
        ],
      },
      {
        name: "금융·은행",
        description: "회계 엔진, 보험 서류 처리, 기업 가치 평가, 세무 대응, 이상 거래 탐지.",
        details: [
          "실시간 거래 감시와 이상 탐지",
          "MAS 및 OJK 규제 보고, 그리고 감사인이 요구하는 제도",
          "계좌와 통화를 넘나드는 자동 대사",
          "AI 기반 신용 평가와 리스크 분석",
        ],
      },
      {
        name: "교육",
        description: "AI 개별 지도, 적응형 평가, 자격 관리, 다국어 제공을 갖춘 학습 관리.",
        details: [
          "학습자 수준에 따라 달라지는 학습 경로",
          "자동 채점이 붙은 AI 생성 문제",
          "음성 합성을 통한 다국어 제공",
          "자격과 수료증 관리",
        ],
      },
      {
        name: "공공",
        description:
          "공공 부문을 위한 안전하고 규정에 맞는 구조. 행정 절차 자동화와 멈출 수 없는 업무를 위한 시스템.",
        details: [
          "전자 신원 확인을 포함한 시민 포털",
          "인허가, 면허, 신청 서류 처리",
          "감사에 대응하는 로그와 보고",
          "핵심 업무를 위한 고가용성 구성",
        ],
      },
      {
        name: "제조",
        description: "전사 시스템, 예지 보전, 공급망 최적화, 품질 검사 자동화.",
        details: [
          "IoT 센서와 연동한 예지 보전",
          "공급망 가시성과 추적",
          "영상 인식 기반 품질 검사",
          "생산 계획과 능력 관리",
        ],
      },
      {
        name: "유통·이커머스",
        description: "AI 추천, 대화형 어시스턴트, 문의 응대 자동화, 재고 관리.",
        details: [
          "협업 필터링 기반 개인화 상품 추천",
          "24시간 대응하는 AI 챗봇 고객 응대",
          "수요와 경쟁 가격에 따른 동적 가격 책정",
          "계절성을 반영한 재고 예측",
        ],
      },
    ],
  },

  approach: {
    eyebrow: "진행 방식",
    title: "90일, 전략에서 운영까지",
    sub: "엔터프라이즈 프로젝트에서 다듬어 온 절차입니다. 조언에 그치지 않고 직접 구축합니다.",
    deliverable: "산출물",
    step: "단계로 이동",
    previous: "이전",
    next: "다음",
    items: [
      {
        week: "1~2주차",
        title: "현황 파악과 AI 적합성 확인",
        items: [
          "사업 목표와 병목 분석",
          "현행 시스템과 데이터 평가",
          "효과가 큰 AI 활용 지점 도출",
          "성공 지표와 KPI 정의",
        ],
        deliverable: "AI 활용 기회 보고서와 투자 대비 효과 추정",
      },
      {
        week: "3~4주차",
        title: "설계",
        items: [
          "AI를 포함한 전체 설계",
          "모델과 플랫폼 선정",
          "기존 시스템 연동 방침",
          "데이터 처리와 보안 설계",
        ],
        deliverable: "기술 설계서와 구현 계획",
      },
      {
        week: "5~8주차",
        title: "시제품",
        items: [
          "실제 데이터를 활용한 시제품",
          "AI 모델 학습과 조정",
          "핵심 기능 구현",
          "사용자 검증과 개선",
        ],
        deliverable: "핵심 기능을 갖춘 동작하는 시제품",
      },
      {
        week: "9~11주차",
        title: "운영 도입",
        items: [
          "운영 규모로 확장",
          "보안, 모니터링, 백업",
          "부하 시험과 성능 조정",
          "운영 교육과 문서화",
        ],
        deliverable: "사용을 시작할 수 있는 운영 시스템",
      },
      {
        week: "12주차 이후",
        title: "개선과 유지보수",
        items: [
          "운영 상황 모니터링과 피드백 반영",
          "모델의 지속적 개선",
          "기능 추가",
          "지속적인 기술 지원",
        ],
        deliverable: "운영 보고서와 개선 제안",
      },
    ],
  },

  objections: {
    eyebrow: "솔직한 답변",
    title: "먼저 확인해야 할 질문",
    sub: "가장 많이 받는 질문에 솔직하게 답합니다. 지금은 기다리시는 편이 낫다는 답변까지 포함해서입니다.",
    items: [
      {
        said: "전에 한 번 맡겼는데 쓰지 못했습니다. 이번에는 무엇이 다릅니까?",
        answer:
          "대개 개발이 아니라 요건이 문제였습니다. 실제로 그 업무를 하는 분들과 이야기하지 않은 채 착수하기 때문입니다. 그래서 저희는 요건 정의를 먼저 하고, 그 결과물은 이후 거래 여부와 관계없이 귀사의 것입니다. 기존 시스템을 살릴 수 있다면 그렇게 말씀드립니다. 돌아가는 것을 다시 만드는 것은 비용 낭비입니다.",
        proof: "차량 수출 시스템 재구축도 바로 이런 상황에서 시작했습니다.",
      },
      {
        said: "담당자가 대응할 수 없게 되면 시스템은 어떻게 됩니까?",
        answer:
          "핵심은 대표가 직접 개발하고 필요에 따라 전문가를 투입합니다. 귀사를 지키는 것은 인원수가 아니라, 시스템이 문서화되고 테스트되며 귀사 명의의 환경에 배포되어 있다는 사실입니다. 테스트가 사양을 설명하므로 다른 개발자가 이어받을 수 있습니다.",
        proof: "484개 계산 클래스에 걸친 7,060건의 자동화 테스트.",
      },
      {
        said: "이런 시스템은 보통 얼마나 듭니까?",
        answer:
          "첫 상담에서 범위를, 요건 정의 후에 확정 금액을 알려드립니다. 실제 숫자를 나중이 아니라 먼저 말씀드립니다. 예산에 맞지 않으면 함께 범위를 줄입니다. 멈추는 큰 시스템보다 돌아가는 작은 시스템이 낫습니다. 싱가포르 중소기업의 프로젝트는 PSG를 대체한 EDGE 보조금 대상이 될 수 있습니다. 해당 여부를 확인하고 공급업체 측 서류는 무상으로 준비해 드립니다.",
        proof: "지원 가능 여부는 현행 IMDA 기준에 따라 확인합니다. 추측하지 않습니다.",
      },
      {
        said: "한두 분기 기다리면 손해가 있습니까?",
        answer:
          "없을 때도 있고, 그러면 그렇게 말씀드립니다. 급하지 않은데 계약하시는 것보다 문제가 절실해졌을 때 연락 주시는 편이 낫습니다. 다만 기다리는 비용은 소프트웨어가 아니라 그동안의 수작업과 실수에서 발생하는 경우가 많습니다. 원하시면 그 금액을 계산해 드리고 판단하시면 됩니다.",
      },
      {
        said: "저희 업무에 대해 얼마나 설명해야 합니까?",
        answer:
          "그 설명을 덜어드리려고 이 회사가 있습니다. 시산표가 무엇인지, CPF를 얼마나 내야 하는지, 청구가 왜 그렇게 맞아떨어지는지 설명하실 필요가 없습니다. 회계사에게 말씀하시듯 알려주시면 됩니다.",
        proof: "급여 엔진은 CPF Board 표에 대해 항목별로 검증했습니다.",
      },
    ],
  },

  capabilityDeck: {
    eyebrow: "가져가서 검토하세요",
    title: "제안 전체를 하나의 문서로.",
    sub: "모든 서비스, 실적, 그리고 이 페이지의 모든 수치를.",
    cta: "역량 소개서 다운로드",
  },

  contact: {
    eyebrow: "문의",
    title: "30분, 그리고 솔직한 답변",
    sub: "현재 어떤 업무에 비용이 들고 있는지 알려주십시오. 무엇을 만들 가치가 있는지 말씀드리겠습니다.",
    email: "이메일",
    phone: "전화",
    reassurance:
      "계약 의무는 없습니다. 요건 정의 결과물은 이후 거래 여부와 관계없이 귀사의 것입니다.",
    name: "성함",
    company: "회사명",
    message: "문의 내용",
    messagePlaceholder: "프로젝트에 대해 알려주십시오",
    send: "보내기",
    sending: "전송 중...",
    success: "문의해 주셔서 감사합니다. 곧 연락드리겠습니다.",
    error:
      "전송에 실패했습니다. 다시 시도하시거나 이메일로 연락해 주십시오.",
    country: "국가",
    staff: "직원 수",
    staffPick: "인원 선택",
    staffOptions: ["10명 미만", "10~50명", "51~200명", "200명 이상"],
    spreadsheet: "스프레드시트 (선택)",
    spreadsheetHint:
      "Excel, CSV 또는 Numbers, 최대 10MB. 기밀 정보는 삭제해 주십시오. 몇 행의 샘플이면 충분합니다.",
    fileTooLarge: "파일이 10MB를 초과합니다. 더 작은 발췌본을 보내 주십시오.",
  },

  // /flyer 디지털 전단. 내용은 회사 소개 자료의 범위를 넘지 않습니다.
  flyer: {
    eyebrow: "싱가포르 · 일본 · 전 세계 대응",
    headline: "스프레드시트에서 시스템으로.",
    who: "스프레드시트로, 또는 공급업체가 끝내지 못한 시스템으로 운영되는 10~200명 규모의 회사를 위해. 실제로 업무가 돌아가는 소프트웨어를 만들고, 그 전부를 귀사가 소유합니다.",
    ctaOffer: "스프레드시트 한 장 보내기",
    ctaDeck: "소개 자료 다운로드",
    proofEyebrow: "사실 세 가지",
    proof: [
      {
        lead: "일본에서 가동 중",
        detail:
          "중고차 수출 회사가 저희가 만든 시스템으로 운영됩니다. 재고, CRM, 인보이스, 선적 서류, 입금 관리. 오늘도 고객사의 실제 운영 환경에서 돌아갑니다.",
      },
      {
        lead: "7,060건의 테스트",
        detail:
          "ERP 개발의 484개 계산 클래스를 대상으로 한 자동 테스트, 2026년 8월 실행 결과입니다. 내부 개발 버전으로 아직 배포 전이지만, 모든 숫자는 출시 전에 검증됩니다.",
      },
      {
        lead: "소유권은 귀사에",
        detail:
          "코드는 창업자가 직접 작성합니다. 클라우드 계정, 데이터베이스, 저장소는 첫 주부터 귀사 명의입니다. 어떤 공급업체도 귀사의 사업을 붙잡을 수 없습니다.",
      },
    ],
    demosEyebrow: "계약 전에 직접 써 보기",
    demosTitle: "슬라이드가 아니라 작동하는 데모",
    demosSub: "브라우저에서 샘플 데이터로 실행해 볼 수 있는 {count}개의 작은 시스템. 이 세 가지가 가장 범용적입니다.",
    demoOpen: "데모 열기",
    demosAll: "{count}개 데모 모두 보기",
    invoiceNowLink: "InvoiceNow: 스프레드시트로 만든 전자 인보이스 샘플 보기",
    offerEyebrow: "제안",
    offerTitle: "스프레드시트 한 장을 보내 주시면 시스템으로 작동하는 모습을 보여 드립니다.",
    offerBody:
      "사업의 중심이 되는 시트 한 장을 고르십시오. 견적, 재고, 작업, 배송, 무엇이든 좋습니다. 2주 안에 귀사의 데이터가 들어간 작동하는 시스템으로 확인하시고, 전체 구축 비용도 솔직하게 말씀드립니다.",
    offerPoints: ["비용도 계약 의무도 없습니다", "한 달에 3~5개 회사", "데모에서 만든 것은 귀사의 것입니다"],
    formEyebrow: "여기서 시작",
    formTitle: "시트 한 장, 양식 하나",
    formSub: "그 시트가 지금 어떤 일을 하는지 알려 주십시오. 영업일 2일 안에 답변드립니다.",
    formReassurance:
      "파일은 비공개로 보관되며 한 사람만 열람합니다. 요청하시면 삭제합니다. 공유도 판매도 하지 않습니다.",
    formSend: "스프레드시트 보내기",
    messagePlaceholder: "이 시트는 업무에서 어떤 역할을 하며, 어디서 문제가 생깁니까?",
    deckLine: "8장짜리 회사 소개 자료 다운로드. 이메일 입력 없음.",
    grantsLabel: "싱가포르 기업:",
    grantsLine: "프로젝트가 EDGE 지원 대상인지 확인해 드립니다.",
    backHome: "메인 사이트로 돌아가기",
  },

  testimonial: {
    eyebrow: "고객 후기",
    title: "StarTech와의 작업은 어떠셨나요?",
    intro: "프로젝트에 대한 한두 문장은 다른 기업이 저희와 일할지 결정하는 데 큰 도움이 됩니다. 최종 문구를 확인하고 승인하시기 전에는 아무것도 게시하지 않습니다.",
    name: "성함",
    role: "직책",
    company: "회사명",
    email: "이메일",
    quote: "후기",
    quotePlaceholder: "어떤 문제가 있었고, 프로젝트는 어떻게 진행되었으며, 이후 무엇이 달라졌나요?",
    quoteHint: "한두 문장이면 충분합니다.",
    credit: "어떻게 표기할까요?",
    creditFull: "성함, 직책, 회사명",
    creditAnonymous: "직책과 업종만 (성함 제외)",
    creditPrivate: "피드백만, 게시하지 마세요",
    consent: "StarTech가 길이에 맞게 내용을 줄일 수 있으며, 게시 전에 최종 문구를 보여 주는 것에 동의합니다.",
    send: "후기 보내기",
    sending: "보내는 중…",
    thanksTitle: "감사합니다!",
    thanksBody: "잘 받았습니다. 온라인에 게시하기 전에 승인하실 최종 문구를 보내 드리겠습니다.",
    errorRequired: "이 항목을 입력해 주세요.",
    errorEmail: "올바른 이메일 주소를 입력해 주세요.",
    errorQuoteShort: "한 문장 이상(20자 이상) 작성해 주세요.",
    errorConsent: "계속하려면 이 상자를 선택해 주세요.",
    error: "문제가 발생했습니다. 다시 시도해 주세요.",
  },
  invoicenow: {
    eyebrow: "InvoiceNow · 싱가포르",
    headline: "지금 쓰는 시스템에서 바로 보내는 InvoiceNow 전자 인보이스",
    lead: "InvoiceNow는 싱가포르의 전자 인보이스 네트워크이며, IRAS는 모든 GST 등록 사업자에게 단계적으로 도입하고 있습니다. 저희는 귀사가 청구서를 발행하는 시스템이나 스프레드시트를 InvoiceNow 액세스 포인트에 연결합니다.",
    ctaDemo: "샘플 청구서 체험하기",
    ctaFlyer: "스프레드시트 하나 보내기",
    whatEyebrow: "InvoiceNow란",
    whatTitle: "쉽게 풀어 쓴 InvoiceNow",
    what: [
      {
        title: "PDF가 아닌 데이터 파일",
        body: "InvoiceNow 청구서는 구매자의 시스템이 바로 읽는 구조화된 파일(Peppol PINT SG, XML 형식)입니다. 아무도 다시 입력하지 않습니다.",
      },
      {
        title: "Peppol 네트워크로 전송",
        body: "청구서는 액세스 포인트로 가고, 액세스 포인트는 구매자의 Peppol ID(UEN으로 만들어짐)로 상대를 찾아 구매자 측 액세스 포인트에 전달합니다.",
      },
      {
        title: "IRAS에도 사본이 전달",
        body: "GST 등록 사업자의 경우 액세스 포인트가 청구 데이터를 IRAS에도 보냅니다. 판매자, 구매자, 양측 액세스 포인트가 네 모서리이고 IRAS가 다섯 번째입니다.",
      },
    ],
    whoEyebrow: "대상과 시기",
    whoTitle: "IRAS는 모든 GST 등록 사업자에게 단계적으로 도입 중",
    whoIntro: "IRAS에 따르면 GST 등록 사업자는 다음 날짜부터 InvoiceNow를 통해 청구 데이터를 IRAS에 보내야 합니다.",
    phases: [
      { date: "2025년 11월 1일", text: "설립 후 6개월 이내에 자발적으로 GST에 등록하는 회사." },
      { date: "2026년 4월 1일", text: "이 날짜부터 자발적 GST 등록을 신청하는 모든 사업자." },
      { date: "2028년 4월 1일", text: "이 날짜부터 의무 GST 등록을 신청하는 사업자, 그리고 연간 공급액 S$200,000 이하의 기존 GST 등록 사업자." },
      { date: "2029년 4월 1일", text: "연간 공급액 S$100만 이하의 기존 GST 등록 사업자." },
      { date: "2030년 4월 1일", text: "연간 공급액 S$400만 이하의 기존 GST 등록 사업자." },
      { date: "2031년 4월 1일", text: "연간 공급액 S$400만 초과의 기존 GST 등록 사업자." },
    ],
    whoNote: "구간은 2025년분으로 신고된 공급액을 기준으로 하며, IRAS가 기존 사업자에게 시작일을 통지하고 있습니다. 귀사의 경우는 IRAS 페이지에서 확인하세요.",
    whoSource: "IRAS: GST InvoiceNow 요건 (페이지 최종 업데이트 2026년 10월 8일)",
    accountant: "저희는 소프트웨어 연동만 합니다. InvoiceNow가 귀사에 적용되는지, 각 청구 항목의 GST 처리는 회계사나 IRAS에 확인하세요.",
    offerEyebrow: "저희가 하는 일",
    offerTitle: "귀사가 청구서를 발행하는 시스템이나 스프레드시트를 InvoiceNow 액세스 포인트에 연결합니다.",
    offerBody: "자체 시스템, 오래된 ERP, 스프레드시트로 청구서를 발행한다면 IRAS가 안내하는 방법은 인증된 액세스 포인트를 통한 연결입니다. 저희가 그 연결을 만듭니다. 청구 데이터를 PINT SG에 맞게 매핑하고, 액세스 포인트의 API로 전송하며, 전달 상태를 평소 쓰는 화면으로 가져옵니다.",
    offerPoints: [
      "청구 데이터를 PINT SG에 매핑",
      "액세스 포인트의 API로 전송",
      "전달 상태와 오류를 평소 화면에 표시",
    ],
    offerHonest: "StarTech는 액세스 포인트 사업자가 아니며 IMDA 인증을 받지 않았습니다. 실제 연결은 귀사와 함께 고르는 IMDA 인증 액세스 포인트를 통해 이루어집니다.",
    demoEyebrow: "체험하기",
    demoTitle: "샘플 청구서를 PINT SG XML로 변환",
    demoIntro: "청구서를 입력하거나 CSV 템플릿을 업로드하세요. 브라우저가 XML을 만들고 PINT SG 규칙 일부로 확인합니다. 어디에도 전송되지 않습니다.",
    sampleBadge: "샘플 데이터이며 유효한 세금 계산서가 아닙니다",
    csvTitle: "스프레드시트로 시작하기",
    csvHint: "청구 항목 하나당 한 행이며, 청구서와 구매자 정보를 각 행에 반복합니다. 판매자 정보는 아래 양식에 그대로 남습니다.",
    csvDownload: "CSV 템플릿 다운로드",
    csvUpload: "CSV 파일 업로드",
    csvLoaded: "파일에서 {count}개 행을 불러왔습니다.",
    csvSkipped: "파일에 청구서 번호가 {count}개 더 있습니다. 첫 번째 청구서만 불러왔습니다.",
    csvErrorEmpty: "파일이 비어 있습니다.",
    csvErrorColumns: "파일에 다음 열이 없습니다: {columns}",
    csvErrorRows: "파일에 머리글 행은 있지만 청구 항목이 없습니다.",
    csvErrorRead: "파일을 읽을 수 없습니다.",
    loadValid: "올바른 샘플로 채우기",
    loadBroken: "오류가 있는 샘플로 채우기",
    invoiceSection: "청구서 정보",
    sellerSection: "판매자 (귀사)",
    buyerSection: "구매자",
    linesSection: "청구 항목",
    fields: {
      invoiceNumber: "청구서 번호",
      issueDate: "발행일",
      dueDate: "지급 기한",
      buyerReference: "구매자 참조 번호 또는 발주 번호",
      paymentTerms: "지급 조건",
      name: "등록 상호",
      uen: "UEN (사업자 고유 번호)",
      gstRegNo: "GST 등록 번호",
      street: "주소",
      postalCode: "우편번호",
      description: "품목",
      quantity: "수량",
      unit: "단위",
      unitPrice: "단가 (S$)",
      gstCategory: "GST 구분",
      lineAmount: "항목 금액",
    },
    units: {
      H87: "개",
      HUR: "시간",
      DAY: "일",
      MON: "월",
    },
    categories: {
      SR: "SR · 표준 세율 9%",
      ZR: "ZR · 영세율",
      ES33: "ES33 · 면세 (규정 33)",
      ESN33: "ESN33 · 면세 (기타)",
      OS: "OS · 과세 대상 외",
      NG: "NG · 판매자 GST 미등록",
    },
    categoryNote: "구분 코드는 PINT SG 코드 목록에서 가져왔습니다. 어떤 구분이 적용되는지는 회계사에게 확인하세요.",
    addLine: "항목 추가",
    removeLine: "{n}번 항목 삭제",
    lineLabel: "{n}번 항목",
    errorNumber: "12.50 같은 숫자를 소수점 4자리까지 입력하세요.",
    errorQuantity: "0보다 큰 수량을 소수점 4자리까지 입력하세요.",
    errorDate: "날짜는 YYYY-MM-DD 형식으로 입력하세요.",
    generate: "XML 생성 및 확인 실행",
    generating: "생성 중…",
    resultEyebrow: "결과",
    totalsTitle: "합계",
    totals: {
      net: "GST 제외 합계",
      gst: "GST 금액",
      payable: "지급 금액",
    },
    checksTitle: "확인 항목",
    checksSummary: "{total}개 중 {passed}개 통과",
    pass: "통과",
    fail: "실패",
    demoCheck: "StarTech 데모용 확인이며 PINT SG 규칙이 아닙니다",
    checksSource: "규칙 ID는 2026년 5월 25일 공개된 PINT SG Billing v1.4.1 스키마트론에서 가져왔습니다. 브라우저에서 실행하는 일부 확인이며, 전송 전에는 액세스 포인트가 전체 검증을 수행합니다.",
    checks: {
      specIds: "사양 ID와 업무 프로세스 ID가 PINT SG 청구용이다",
      invoiceNumber: "청구서 번호가 있다",
      issueDate: "발행일이 있고 모든 날짜가 YYYY-MM-DD 형식이다",
      dueOrTerms: "지급할 금액이 있으므로 지급 기한이나 지급 조건이 있다",
      buyerReference: "구매자 참조 번호나 발주 번호가 있다",
      currency: "청구 통화가 SGD이며 별도 세금 통화가 없다",
      sellerName: "판매자의 등록 상호가 있다",
      buyerName: "구매자의 등록 상호가 있다",
      sellerEndpoint: "판매자에게 Peppol 주소가 있다 (스킴 0195, UEN 기반)",
      buyerEndpoint: "구매자에게 Peppol 주소가 있다 (스킴 0195, UEN 기반)",
      sellerLegalId: "판매자의 UEN이 법인 등록 번호로 기재되어 있다",
      sellerGstId: "GST를 부과하므로 판매자의 GST 등록 번호가 있다",
      sellerAddress: "판매자의 주소와 우편번호가 있다",
      buyerAddress: "구매자의 주소와 우편번호가 있다",
      countries: "판매자와 구매자 주소에 국가 코드가 있다",
      uuid: "올바른 형식의 고유 ID(UUID)가 있다",
      linesNamed: "항목이 하나 이상 있고 모든 항목에 품목이 있다",
      lineCategories: "모든 항목에 유효한 싱가포르 GST 구분 코드가 있다",
      lineAmounts: "각 항목 금액이 수량 × 단가와 같다",
      netTotals: "GST 제외 합계가 항목 금액의 합과 같다",
      gstAmounts: "구분별 GST가 과세 금액 × 세율과 같고 GST 합계와 맞는다",
      payable: "GST 포함 합계와 지급 금액이 맞는다",
      decimals: "소수점 2자리를 넘는 금액이 없다",
      noGst: "GST 미등록(NG) 항목이 GST 항목과 섞여 있지 않다",
      noGstNumber: "NG 항목이 있는 청구서에 판매자 GST 번호가 없다",
      uenFormat: "두 UEN 모두 올바른 UEN 형식이다",
    },
    xmlTitle: "생성된 XML",
    download: "XML 다운로드",
    nextEyebrow: "다음 단계",
    nextTitle: "이 파일이 실제로 전송되는 방식",
    next: [
      {
        title: "귀사 시스템이 파일을 만듭니다",
        body: "실제 연결에서는 청구서를 발행할 때마다 귀사의 청구 데이터로 XML이 만들어집니다. 직접 입력하지 않습니다.",
      },
      {
        title: "액세스 포인트로 전송됩니다",
        body: "귀사 시스템이 IMDA 인증 액세스 포인트의 API로 파일을 보냅니다. 액세스 포인트가 PINT SG 전체 검증을 수행합니다.",
      },
      {
        title: "구매자가 받습니다",
        body: "액세스 포인트가 Peppol 디렉터리에서 구매자의 액세스 포인트를 찾아 구매자 시스템으로 청구서를 전달합니다.",
      },
      {
        title: "IRAS가 사본을 받습니다",
        body: "제출 기능을 켜면 액세스 포인트가 청구 데이터를 IRAS에도 보냅니다. 이것이 다섯 번째 모서리입니다.",
      },
    ],
    nextNote: "이 페이지는 어떤 액세스 포인트에도 연결하지 않습니다. 실제 연결에는 귀사와 함께 고르는 IMDA 인증 액세스 포인트를 사용합니다.",
    ctaTitle: "지금 스프레드시트로 청구서를 발행하고 계신가요?",
    ctaBody: "청구서를 발행하는 스프레드시트를 보내 주세요. InvoiceNow에 어떻게 매핑되는지 보여 드리고, 연결에 무엇이 필요한지 솔직하게 알려 드립니다. 비용도 약정도 없습니다.",
    ctaButton: "스프레드시트 하나 보내기",
    sourcesTitle: "출처",
    sourceIras: "IRAS: GST InvoiceNow 요건",
    sourcePint: "Peppol: PINT SG Billing v1.4.1 사양",
    sourceImda: "IMDA: InvoiceNow 안내",
    backHome: "메인 사이트로 돌아가기",
  },

  singpass: {
    eyebrow: "Singpass 전환 · FAPI 2.0",
    title: "Singpass 로그인은 2026년 12월 31일까지 FAPI 2.0으로 전환해야 합니다",
    intro:
      "웹사이트나 앱에 “Singpass로 로그인” 버튼이 있거나 Myinfo로 양식을 자동 입력한다면, 2026년 말 전에 Singpass의 새 보안 표준으로 전환해야 합니다.",
    source: "Singpass가 공지한 마감일",
    ctaCheck: "연동 점검 요청하기",
    ctaDemo: "데모 실행하기",
    changesEyebrow: "무엇이 바뀌나",
    changesTitle: "로그인 방식의 다섯 가지 변화",
    changes: [
      {
        lead: "요청을 먼저 보냅니다",
        detail:
          "서버가 로그인 요청을 먼저 Singpass에 보내고(PAR), 사용자의 브라우저는 짧은 참조값만 전달합니다. 주소창의 내용은 바꿀 수 없습니다.",
      },
      {
        lead: "로그인마다 일회용 증명",
        detail:
          "서버가 로그인을 시작한 주체임을 증명하므로(PKCE), 중간에 가로챈 로그인 코드는 다른 사람에게 쓸모가 없습니다.",
      },
      {
        lead: "토큰을 우리 키에 묶습니다",
        detail:
          "코드와 토큰은 서버가 보관한 키와 함께여야만 작동합니다(DPoP). 유출된 토큰은 재사용할 수 없습니다.",
      },
      {
        lead: "신원 정보는 암호화됩니다",
        detail:
          "모든 ID 토큰이 우리 키로 암호화되고, NRIC는 새 필드로 옮겨졌습니다. 기존 형식을 읽는 코드는 작동을 멈춥니다.",
      },
      {
        lead: "더 엄격한 리디렉션과 오류 처리",
        detail:
          "사용자 정의 앱 링크는 더 이상 허용되지 않고, Login 앱은 로그인마다 목적을 밝혀야 하며, Singpass가 이제 오류를 사이트로 돌려보내므로 이를 처리해야 합니다.",
      },
    ],
    migrationLink: "Login 및 Myinfo(v5) 앱을 위한 Singpass 전환 가이드",
    whoEyebrow: "영향을 받는 대상",
    whoTitle: "Singpass로 로그인하거나 정보를 입력하는 모든 사이트와 앱",
    who: [
      "“Singpass로 로그인”이 있는 웹사이트, 포털, 모바일 앱",
      "Myinfo에서 개인 정보를 자동 입력하는 양식",
      "2026년 2월 이전에 구축한 연동. 그 이후 등록된 앱은 처음부터 FAPI 2.0을 써야 했습니다",
      "Myinfo v3·v4 연동. Singpass는 2026년 9월 말까지 Myinfo v5로 옮기도록 요청했습니다",
    ],
    corppass: "Corppass 로그인은 별도의, 더 늦은 마감일이 있습니다: 2027년 3월 31일.",
    corppassLink: "Corppass 일정",
    riskEyebrow: "전환하지 않으면",
    riskTitle: "기존 로그인이 멈출 것에 대비하세요",
    riskBody:
      "Singpass는 2026년 12월 31일까지 모든 연동이 FAPI 2.0을 따르도록 요구하며, 기존 방식의 문서는 2026년 7월 14일에 내렸습니다. 기존 방식에 머문 연동은 마감 후 Singpass 로그인이나 Myinfo 자동 입력이 실패할 것으로 봐야 합니다. 사용자는 로그인하지 못하고, 양식도 완료하지 못하게 됩니다.",
    demoEyebrow: "작동하는 참조 데모",
    demoTitle: "FAPI 2.0 전체 흐름을 브라우저에서 실행",
    demoIntro:
      "이 데모를 위해 만든 모의 Singpass 서버를 상대로 실제 프로토콜 단계를 실행합니다. 키는 브라우저에서 매번 새로 만들어지고, 인물은 샘플이며, Singpass로는 아무것도 보내지 않습니다. 모든 요청과 응답을 토큰을 줄인 형태로 보여 줍니다.",
    demoNotice:
      "모의 서버입니다. Singpass가 아니며 Singpass나 GovTech와 연결되어 있지 않습니다. StarTech가 Singpass Developer Portal에 등록하면, 같은 클라이언트 코드가 설정 변경만으로 Singpass 스테이징 환경에서 작동합니다.",
    appType: "앱 유형",
    appLogin: "Singpass 로그인",
    appMyinfo: "Myinfo (v5) 앱",
    run: "흐름 실행하기",
    runAgain: "다시 실행하기",
    running: "흐름을 실행하는 중…",
    allPassed:
      "모든 단계를 통과했습니다. 아래 정보는 이 브라우저의 키에 묶인 코드와 토큰을 거쳐, 암호화되고 서명된 상태로 도착했습니다.",
    failed: "한 단계가 실패했습니다. 해당 요청과 응답이 아래에 있습니다.",
    cancelled:
      "로그인이 취소되었습니다. Singpass는 오류를 사이트로 돌려보내고, 사이트는 Singpass의 오류 문구가 아닌 자체 메시지를 보여 줍니다.",
    details: "요청과 응답",
    status: {
      pending: "시작 전",
      running: "실행 중",
      waiting: "입력 대기",
      done: "통과",
      error: "실패",
    },
    steps: {
      register: {
        title: "앱 등록하기",
        body: "브라우저가 서명 키와 암호화 키를 만들고, 공개 부분을 모의 서버에 등록합니다. Singpass Developer Portal에서 하는 작업에 해당합니다.",
      },
      discovery: {
        title: "서버 구성 읽기",
        body: "엔드포인트와 알고리즘은 고정 주소가 아니라 OpenID 구성에서 가져옵니다.",
      },
      session: {
        title: "이번 로그인의 비밀값 만들기",
        body: "새 state, nonce, PKCE verifier(S256), DPoP 키를 이번 로그인 한 번만을 위해 만들고, 끝나면 버립니다.",
      },
      par: {
        title: "요청을 먼저 보내기 (PAR)",
        body: "서명된 클라이언트 어서션(private_key_jwt)과 DPoP 증명을 붙여 로그인 요청을 먼저 서버로 보냅니다. 서버는 수명이 짧은 request_uri로 답합니다.",
      },
      authorize: {
        title: "사용자를 Singpass로 보내기",
        body: "주소에는 client_id와 request_uri만 담깁니다. 실제 서비스라면 사용자는 여기서 Singpass 앱으로 로그인을 승인합니다.",
      },
      redirect: {
        title: "돌아오는 리디렉션 처리하기",
        body: "코드를 믿기 전에 state와 iss를 확인합니다.",
      },
      token: {
        title: "코드를 토큰으로 교환하기",
        body: "코드, PKCE verifier, 새 클라이언트 어서션, 새 DPoP 증명을 보냅니다. 토큰은 DPoP 키에 묶인 상태로 돌아옵니다.",
      },
      idToken: {
        title: "ID 토큰 복호화와 검증",
        body: "우리 암호화 키로 복호화하고, 서버가 공개한 키(JWKS)로 서명을 확인한 뒤 iss, aud, exp, nonce를 확인합니다.",
      },
      userinfo: {
        title: "Myinfo 데이터 가져오기",
        body: "Authorization: DPoP에 액세스 토큰에 묶인 증명(ath)을 함께 보냅니다. 응답도 암호화·서명되어 있고 person_info 안에 담겨 있습니다.",
      },
      replay: {
        title: "훔친 코드로 시도하기",
        body: "코드와 PKCE verifier를 몰래 복사한 사람이 다른 기기에서 자기 키로 사용해 봅니다. 서버는 거부해야 합니다.",
        refused: "예상대로 거부되었습니다. 코드는 그것을 요청한 키로만 쓸 수 있습니다.",
        accepted: "서버가 훔친 코드를 받아들였습니다. 이것은 버그입니다.",
      },
    },
    loginTitle: "모의 Singpass 로그인",
    loginBody:
      "실제 Singpass에서는 사용자가 지금 Singpass 앱으로 QR 코드를 스캔합니다. 여기서는 샘플 인물을 대신해 직접 선택합니다.",
    loginRequested: "요청된 데이터",
    loginPurpose: "목적",
    approve: "샘플 인물로 로그인",
    cancel: "로그인 취소",
    sample: "샘플 인물, 실존하지 않음",
    resultTitle: "사이트가 받는 정보",
    errorGeneric: "문제가 발생했습니다. 잠시 후 흐름을 다시 실행해 주세요.",
    offerEyebrow: "제공 서비스",
    offerTitle: "Singpass 연동을 점검하고 전환해 드립니다",
    offerSteps: [
      {
        lead: "점검",
        detail:
          "현재의 Singpass 또는 Myinfo 코드를 읽고, 무엇을 바꿔야 하는지와 얼마나 걸리는지를 문서로 알려 드립니다.",
      },
      {
        lead: "전환",
        detail:
          "PAR, PKCE, DPoP, 암호화된 ID 토큰을 고객의 코드에 구현하고, 고객 조직의 앱으로 Singpass 스테이징 환경에서 테스트합니다.",
      },
      {
        lead: "운영 전환",
        detail:
          "마감 전에 운영 환경을 전환합니다. Singpass는 기존 방식과 새 방식을 나란히 운영할 수 있게 하므로 단계적으로 바꿀 수 있습니다.",
      },
    ],
    honesty:
      "분명히 말씀드립니다. 이 데모는 모의 서버를 상대로 한 저희의 참조 구현입니다. 저희는 아직 고객의 Singpass 전환을 완료한 적이 없으며, Singpass나 GovTech의 파트너도 아닙니다. Singpass 앱은 계속 고객 조직 명의로 등록되어 있습니다.",
    otherWork: "그 밖에 만드는 것 보기",
    flyerLine: "Singpass는 2026년 12월 31일까지 FAPI 2.0으로 전환해야 합니다. 새 로그인 흐름의 작동 데모를 확인하세요.",
    stagingTitle: "Singpass 스테이징 환경에서 시험하기",
    stagingBody: "이 버튼은 같은 클라이언트를 StarTech의 스테이징 앱으로 Singpass 자체 스테이징 서비스에 연결해 실행합니다. Singpass 스테이징 테스트 계정만 로그인할 수 있으며, 실제 Singpass 계정은 사용할 수 없습니다.",
    stagingButton: "Singpass로 로그인 (스테이징)",
    stagingResult: "Singpass 스테이징이 반환한 ID 토큰 (복호화 및 검증 완료)",
    stagingCancelled: "스테이징 로그인이 취소되었습니다.",
    stagingFailed: "스테이징 로그인이 완료되지 않았습니다. 나중에 다시 시도해 주세요.",
  },

  stickyCta: {
    line: "30분 동안 현황을 듣고, 무엇부터 만들지 정리해 드립니다.",
    action: "상담 요청",
  },

  footer: {
    location: "싱가포르",
    rights: "StarTech Innovation Pte. Ltd.",
  },

  demos: {
    signIn: {
      title: "{title} 맞춤 설정",
      subtitle: "Google로 로그인하면 나만의 데이터로 맞춤 결과를 생성할 수 있습니다.",
      notConfigured: "로그인 기능이 아직 준비되지 않았습니다 — 곧 다시 확인해 주세요.",
      signedInAs: "로그인 계정:",
      backToSample: "← 샘플로 돌아가기",
    },
  },
};
