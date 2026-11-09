import type { Messages } from "./en";

/**
 * Portuguese.
 *
 * Brazilian rather than European: Brazil is the far larger market and the more
 * likely source of enquiries. That decision shows in "você" over "tu",
 * "time" over "equipa", "arquivo" over "ficheiro", and in the post-Acordo
 * Ortográfico spellings.
 *
 * Reviewed for fluency and claims on 9 Nov 2026 (AI review); a native speaker's pass is still welcome.
 */
export const pt: Messages = {
  nav: {
    work: "Projetos",
    practices: "Serviços",
    solutions: "Soluções",
    industries: "Setores",
    approach: "Como trabalhamos",
    contact: "Contato",
    letsTalk: "Vamos conversar",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    language: "Idioma",
    ask: "Tire suas dúvidas",
  },

  hero: {
    eyebrowShort: "Singapura · Atuação global",
    eyebrowFull: "Singapura · Desde 2021 · Atuação global",
    headlineLead: "Falamos",
    headlineBusiness: "negócios",
    headlineAnd: "e",
    headlineTech: "tecnologia",
    sub: "Desenvolvemos o software sob medida que protege a sua vantagem competitiva.",
    ctaPrimary: "Vamos conversar",
    ctaWork: "Ver projetos",
    ctaDeck: "Baixar a apresentação",
    languagesAvailable: "Também disponível em:",
    readInLanguage: "Ler esta página em {language}",
    ctaAsk: "Fazer uma pergunta",
    note: "É gratuito e não exige nenhum documento prévio: traga o processo que mais toma o seu tempo. Se a resposta não for software, nós avisamos.",
    proof: {
      yearsFigure: "20+",
      yearsLabel: "anos nos dois mundos",
      testsFigure: "7.060",
      testsLabel: "testes automatizados no nosso ERP interno, não implantado",
      jurisdictionsFigure: "2",
      jurisdictionsLabel: "jurisdições",
      languagesFigure: "7",
      languagesLabel: "idiomas neste site",
    },
    card: {
      role: "Diretor-Geral",
      tagline: "Negócios. Finanças. Tecnologia.",
      country: "Singapura",
      uen: "UEN 202110461R",
      workingIn: "Idiomas",
    },
  },

  qualify: {
    eyebrow: "Projetos que assumimos",
    title: "Onde fazemos o nosso melhor trabalho.",
    sub: "A maior parte dos nossos projetos começa em um destes cenários. Se o seu for diferente, ainda vale a conversa: o tipo de problema importa mais do que o setor em que ele aparece.",
    fits: [
      {
        headline: "Sua operação roda em planilhas e mensagens",
        body: "Estoque em um lugar, pagamentos em outro, decisões em um chat. Funcionava com dez pessoas e agora é justamente o que trava a empresa.",
      },
      {
        headline: "Um fornecedor já tentou e não deu certo",
        body: "Você pagou por um sistema que a equipe se recusa a usar. Tem receio de recomeçar e quer saber o que vai ser diferente desta vez.",
      },
      {
        headline: "Você opera em mais de um país",
        body: "Um exportador japonês que vende para o mundo todo. Uma empresa europeia ou americana com uma filial na Ásia. Uma empresa de Singapura que contrata na Indonésia. Moedas, regimes tributários e calendários de obrigações fiscais diferentes em um só sistema — e nenhum fornecedor que entenda os dois lados sem que alguém precise explicar.",
      },
      {
        headline: "Os números precisam estar certos, não aproximados",
        body: "Faturas, pagamentos, estoque: onde chegar perto não basta, e errar custa mais do que atrasar.",
      },
    ],
    regions: [
      "Tem operações em Johor ou na JS-SEZ? Construímos sistemas que funcionam dos dois lados de uma fronteira, como o sistema de exportação que o nosso cliente no Japão já usa em produção.",
      "Também apoiamos equipes nas Filipinas e no Vietnã gerenciadas a partir de Singapura.",
    ],
    japanSite: null,
    pricing:
      "Sobre preço: na primeira conversa damos uma faixa de valores e, depois do levantamento, um valor fechado — nunca um número inventado a partir de um e-mail. E se uma ferramenta pronta já resolver, dizemos qual: sai mais barato do que qualquer coisa que pudéssemos construir para você.",
    pricingLead: "Sobre preço:",
  },

  work: {
    eyebrow: "Projetos selecionados",
    title: "Dois sistemas para clientes e um desenvolvimento interno.",
    sub: "Descritos como o dono do negócio descreveria: o que a empresa realmente fazia antes e o que deu errado no caminho. O terceiro é um desenvolvimento interno, testado, mas não implantado.",
    before: "Antes",
    built: "O que construímos",
    result: "Resultado",
    details: "Detalhes",
    demosLine:
      "Prefere ver algo funcionando em vez de ler a respeito? {count} demos funcionais rodam no seu navegador com dados de exemplo.",
    demosLink: "Experimentar as demos",
    disclaimer:
      "Omitimos o nome do cliente quando o projeto está coberto por confidencialidade. Os números vêm dos próprios sistemas e podem ser apresentados em detalhe em uma conversa.",
    cases: [
      {
        sector: "Comércio internacional",
        market: "Japão",
        title: "Um exportador de veículos que rodava em planilhas e WhatsApp",
        before:
          "Estoque no Airtable, pagamentos conciliados à mão no Excel, conversas com clientes espalhadas pelo WhatsApp. Um fornecedor estrangeiro contratado antes tinha entregado um CRM que a equipe não conseguia usar, e ele acabou servindo só para exibir os carros.",
        built:
          "Uma reconstrução completa da operação: estoque, CRM com permissões por perfil, geração de faturas proforma e comerciais, instruções de embarque, importação de extratos bancários e roteamento de pagamentos em dois níveis.",
        metric: { figure: "2", caption: "bugs que causavam prejuízo, detectados antes do lançamento" },
        detail: [
          "Reimportar um extrato bancário duplicava os recebimentos sem nenhum aviso: a maioria dos bancos japoneses não emite identificador de transferência, então a chave de deduplicação nunca era preenchida. Ela foi substituída por uma chave determinística derivada do conteúdo.",
          "A página do cliente mostrava a cada vendedor o faturamento total da empresa. O problema foi encontrado em teste, corrigido e verificado com dois vendedores atendendo o mesmo cliente.",
          "Cinco perfis, cada um com o próprio escopo de acesso: administrador, gerente, vendedor, contador e cliente.",
        ],
      },
      {
        sector: "Implantação de IA",
        market: "Singapura",
        title: "Um copiloto de IA que responde a partir dos documentos da própria empresa",
        before:
          "Um chatbot genérico não serve para nada a um profissional de uma PME: ele não conhece o cargo da pessoa, o setor nem o que a organização já decidiu.",
        built:
          "Um copiloto com quatro modos de raciocínio, contexto organizacional em camadas (setor, organização, cargo, pessoa), busca nos documentos enviados pelo próprio cliente e coordenação direta entre áreas.",
        metric: { figure: "2026", caption: "entregue ao cliente; o projeto foi concluído naquele ano" },
        detail: [
          "Roteamento entre vários modelos com uma camada de abstração: a pedido do cliente, o modelo padrão foi trocado de um fornecedor para outro sem mexer no código do produto.",
          "Transcrição de fala para texto nas reuniões, com os encaminhamentos extraídos como tarefas.",
          "Construído sobre Cloudflare Workers com D1, KV, R2 e Vectorize.",
        ],
      },
      {
        sector: "Desenvolvimento interno",
        market: "Testado, não implantado",
        title: "Um ERP que desenvolvemos internamente para mostrar como testamos",
        before:
          "Software que lida com dinheiro impressiona na demo, mas é difícil confiar nele: quase sempre é conferido por amostragem, quando é. Queríamos um desenvolvimento próprio de grande porte que provasse como testamos, antes de qualquer cliente depender do nosso código.",
        built:
          "Um backend de ERP multiempresa em Java 21 e Spring Boot. É um desenvolvimento interno: testado, mas não implantado em nenhum cliente.",
        metric: { figure: "7.060", caption: "testes automatizados em 484 classes de cálculo" },
        detail: [
          "Os números de testes são da execução de agosto de 2026 e cobrem todas as 484 classes de cálculo do desenvolvimento.",
          "115 controladores REST. Multimoeda, multiempresa, permissões por perfil e registro de auditoria.",
          "Apresentado como evidência de como construímos e testamos sistemas complexos. Não é um sistema implantado em nenhum cliente, e não fazemos nenhuma afirmação sobre a exatidão dos seus cálculos.",
        ],
      },
    ],
  },

  showcase: {
    eyebrow: "Experimente você mesmo",
    title: "Treze sistemas. Escolha um e veja funcionando.",
    sub: "Cada cartão abaixo é uma demonstração que funciona de verdade, não um mockup. Abra um e veja um resultado de exemplo na hora.",
    sampleBadge: "Exemplo",
    tryIt: "Experimentar",
    seeAll: "Ver todas as soluções",
    disclaimer:
      "Cada exemplo usa dados fictícios. Para ver um deles funcionando com o seu próprio processo, envie-nos uma planilha. É grátis.",
    teasers: {
      invoiceScanner: "escaneada e detalhada em segundos",
      customerChatbot: "de confiança na resposta",
      appointmentBooking: "agendada e confirmada automaticamente",
      quotationGenerator: "orçamento redigido, GST incluído",
      jobPostingWriter: "requisitos da vaga redigidos",
      inventoryTracker: "itens sinalizados para reposição",
      socialMediaManager: "posts para redes sociais redigidos de uma vez",
      documentTranslator: "idiomas, em um clique",
      employeeOnboarding: "tarefas de integração agendadas",
      salesAssistant: "e-mails de acompanhamento em sequência",
      complianceChecker: "cláusulas de alto risco identificadas",
      trainingContentGenerator: "módulos de treinamento criados",
      financialReportBuilder: "lucro líquido trimestral, explicado",
    },
  },

  practices: {
    eyebrow: "Serviços",
    title: "Quatro áreas, um único time",
    sub: "Preferimos ir fundo em quatro áreas a atuar superficialmente em vinte. Cada uma é conduzida pessoalmente pelo nosso diretor-geral, com especialistas conforme o trabalho exigir.",
    details: "Detalhes",
    items: [
      {
        title: "Implantação de IA",
        description:
          "Busca nos seus próprios documentos, modelos ajustados ao seu setor e fluxos de automação — com as proteções e a citação de fontes que tornam o resultado utilizável em um negócio regulado.",
        details: [
          "Geração aumentada por recuperação (RAG) com busca vetorial sobre os seus dados proprietários",
          "Roteamento entre fornecedores por meio de uma camada de abstração: troque de modelo sem mexer no código do produto",
          "Pontuação de confiança com citação de fontes, para que as respostas possam ser conferidas",
          "Proteções contra alucinações e revisão de conformidade",
        ],
      },
      {
        title: "Sistemas de gestão",
        description:
          "Plataformas de operação, CRM, estoque, documentos e fluxos de trabalho que substituem planilhas e ferramentas desconectadas — pensados para passar por uma auditoria, não só para fazer bonito na demo.",
        details: [
          "Estoque, vendas, documentos e pagamentos em um só sistema, no lugar de planilhas e conversas de chat",
          "Multiempresa, multimoeda, permissões por perfil e registros prontos para auditoria",
          "Começa pelas planilhas que você já usa, com importação e exportação para Excel e Google Sheets",
          "Implantado na sua própria conta de nuvem, banco de dados e repositório",
        ],
      },
      {
        title: "Processos financeiros",
        description:
          "Faturamento, importação de extratos bancários, conciliação e geração de documentos, com uma trilha de auditoria que o seu contador consegue acompanhar.",
        details: [
          "Conciliação automática entre contas e moedas, com deduplicação determinística",
          "Importação de extratos bancários, inclusive formatos sem identificador de transferência",
          "Faturas proforma, faturas comerciais e documentos de embarque gerados a partir dos mesmos registros",
          "Faturas eletrônicas InvoiceNow a partir do sistema ou da planilha em que você fatura, por meio de um ponto de acesso credenciado",
        ],
      },
      {
        title: "Operações internacionais",
        description:
          "Sistemas multimoeda e multilíngues para empresas que fazem negócios entre Singapura, Japão e a região, em que as regras de cada país vêm em primeiro lugar.",
        details: [
          "A residência dos dados é definida já na arquitetura, não adaptada às pressas depois de uma revisão",
          "Várias moedas, regimes tributários e formatos de documento em um só sistema",
          "Telas e documentos em inglês, japonês, chinês, malaio ou indonésio",
          "Em produção hoje em um exportador no Japão: estoque, vendas, documentos e pagamentos",
        ],
      },
    ],
  },

  industries: {
    eyebrow: "Setores",
    title: "Conhecimento do setor",
    sub: "Entendemos a fundo as exigências regulatórias, operacionais e técnicas do seu setor.",
    items: [
      {
        name: "Comércio e logística",
        description:
          "Estoque, vendas, documentos de embarque e pagamentos para empresas de comércio, atacado e logística que já não cabem em planilhas.",
        details: [
          "Estoque e vendas em um só lugar, com cada perfil vendo apenas a sua parte",
          "Faturas proforma, faturas comerciais e instruções de embarque geradas a partir do mesmo registro",
          "Importação de extratos bancários e conciliação entre moedas",
          "Rastreamento de cargas e portais para compradores no exterior",
        ],
      },
      {
        name: "Finanças e bancos",
        description:
          "Processamento de documentos, conciliação, documentação de seguros e verificação de riscos para equipes financeiras e as empresas que as atendem.",
        details: [
          "Monitoramento de transações em tempo real e detecção de anomalias",
          "Extratos, apólices e sinistros lidos por IA documental, com a fonte de cada número à vista",
          "Conciliação automática entre contas e moedas",
          "Score de crédito e avaliação de risco com IA",
        ],
      },
      {
        name: "Educação",
        description:
          "Plataformas de ensino (LMS) com tutoria por IA, avaliações adaptativas, gestão de certificações e cursos em vários idiomas.",
        details: [
          "Trilhas de aprendizagem que se adaptam ao desempenho do aluno",
          "Questionários gerados por IA com correção automática",
          "Conteúdo em vários idiomas com síntese de voz",
          "Controle de certificados e credenciais",
        ],
      },
      {
        name: "Setor público",
        description:
          "Soluções seguras e em conformidade para o setor público. Automação de serviços ao cidadão e aplicações de missão crítica.",
        details: [
          "Portal do cidadão com verificação de identidade digital",
          "Processamento de alvarás, licenças e requerimentos",
          "Registros e relatórios de conformidade prontos para auditoria",
          "Infraestrutura de alta disponibilidade para serviços críticos",
        ],
      },
      {
        name: "Indústria",
        description:
          "Sistemas ERP, manutenção preditiva, otimização da cadeia de suprimentos e controle de qualidade automatizado.",
        details: [
          "Integração de sensores IoT para manutenção preditiva",
          "Visibilidade da cadeia de suprimentos com rastreamento em tempo real",
          "Controle de qualidade com inspeção por visão computacional",
          "Programação da produção e planejamento de capacidade",
        ],
      },
      {
        name: "E-commerce",
        description:
          "Recomendações com IA, assistentes virtuais, atendimento automatizado e gestão de estoque.",
        details: [
          "Recomendações personalizadas com filtragem colaborativa",
          "Chatbots com IA para atendimento 24/7",
          "Preços dinâmicos conforme a demanda e a concorrência",
          "Previsão de estoque com detecção de tendências sazonais",
        ],
      },
    ],
  },

  approach: {
    eyebrow: "Metodologia",
    title: "Do levantamento à produção em cerca de doze semanas",
    sub: "Os mesmos cinco passos em todo projeto, com escopo e custo por escrito antes de qualquer linha de código. Nós implementamos, não ficamos só na consultoria.",
    deliverable: "Entrega",
    step: "Ir para a etapa",
    previous: "Anterior",
    next: "Próxima",
    items: [
      {
        week: "Semanas 1–2",
        title: "Levantamento e prontidão para IA",
        items: [
          "Análise dos objetivos do negócio e dos principais gargalos",
          "Avaliação dos sistemas e dados atuais",
          "Identificação das oportunidades de IA de maior impacto",
          "Definição de métricas de sucesso e KPIs",
        ],
        deliverable: "Relatório de oportunidades de IA e projeção de ROI",
      },
      {
        week: "Semanas 3–4",
        title: "Arquitetura da solução",
        items: [
          "Desenho da arquitetura da solução de IA",
          "Escolha de modelo e plataforma",
          "Planejamento da integração com os sistemas existentes",
          "Pipeline de dados e protocolos de segurança",
        ],
        deliverable: "Arquitetura técnica e plano de implantação",
      },
      {
        week: "Semanas 5–8",
        title: "Prova de conceito",
        items: [
          "Protótipo funcional com dados reais",
          "Treinamento e ajuste fino do modelo",
          "Implementação das funcionalidades centrais",
          "Testes com usuários e coleta de feedback",
        ],
        deliverable: "Prova de conceito funcional com as capacidades essenciais",
      },
      {
        week: "Semanas 9–11",
        title: "Entrada em produção",
        items: [
          "Preparação do sistema para escalar em produção",
          "Segurança, monitoramento e backup",
          "Testes de carga e ajuste de desempenho",
          "Treinamento da equipe e documentação",
        ],
        deliverable: "Sistema em produção, pronto para os usuários",
      },
      {
        week: "Semana 12 em diante",
        title: "Otimização e suporte",
        items: [
          "Monitoramento de desempenho e feedback dos usuários",
          "Melhoria contínua do modelo",
          "Novas funcionalidades",
          "Suporte técnico contínuo",
        ],
        deliverable: "Relatórios de desempenho e recomendações",
      },
    ],
  },

  objections: {
    eyebrow: "Respostas diretas",
    title: "Perguntas que vale a pena fazer primeiro.",
    sub: "As que mais ouvimos, respondidas com franqueza — inclusive quando a resposta honesta é que você deveria esperar.",
    items: [
      {
        said: "Já pagamos por isso uma vez e não conseguimos usar. O que muda agora?",
        answer:
          "Na maioria das vezes o desenvolvimento estava certo e os requisitos estavam errados: ninguém sentou com quem faz o trabalho antes de o código começar a ser escrito. Por isso começamos pelo levantamento, e o resultado dele é seu, continuando conosco ou não. Se o sistema anterior puder ser aproveitado, vamos dizer — reescrever algo que funciona na maior parte é desperdiçar o seu dinheiro.",
        proof: "A reconstrução do sistema de exportação de veículos começou justamente como um resgate desse tipo.",
      },
      {
        said: "O que acontece com o sistema se você não estiver disponível?",
        answer:
          "O núcleo é escrito pelo nosso diretor-geral, e especialistas entram conforme o trabalho exige. O que protege você não é o tamanho da equipe, e sim o fato de o sistema estar documentado, testado e implantado em uma infraestrutura que é sua: sua conta na Cloudflare, seu banco de dados, seu repositório. Outro engenheiro consegue assumir porque os testes descrevem o que o sistema deve fazer.",
        proof: "7.060 testes automatizados em 484 classes de cálculo, no nosso ERP interno.",
      },
      {
        said: "Quanto costuma custar algo assim?",
        answer:
          "Na primeira conversa damos uma faixa de valores e, depois do levantamento, um valor fechado. Dizemos o valor real cedo, não tarde, e depois cortamos o escopo junto com você até caber: um sistema menor que entra em produção vale mais do que um grande que empaca. PMEs de Singapura podem se qualificar para o subsídio EDGE, que substituiu o PSG; ajudamos a verificar se o seu projeto se qualifica e preparamos sem custo a nossa documentação de fornecedor.",
        proof: "Quem decide o apoio do EDGE é a Enterprise Singapore, e a StarTech não é um fornecedor pré-aprovado do EDGE.",
      },
      {
        said: "Perdemos alguma coisa esperando um ou dois trimestres?",
        answer:
          "Às vezes, nada — e, nesse caso, vamos dizer. Preferimos que você nos procure quando o problema for urgente a fechar contrato antes da hora. Vale saber: o custo de esperar quase nunca está no software, e sim na conciliação manual e nos erros que acontecem nesse meio-tempo. Se quiser, calculamos esse custo na conversa e você decide com o número na mão.",
      },
      {
        said: "Quanto vamos precisar explicar sobre como o nosso negócio funciona?",
        answer:
          "É justamente para isso que esta empresa existe. Você não vai precisar explicar o que é um balancete, o que deve constar em uma nota fiscal ou por que um pagamento é conciliado do jeito que é. Explique para nós como explicaria ao seu contador.",
        proof: "Mais de 20 anos em negócios e tecnologia.",
      },
    ],
  },

  capabilityDeck: {
    eyebrow: "Leve com você",
    title: "Toda a proposta, em um único documento.",
    sub: "Cada área, cada evidência, cada número desta página.",
    cta: "Baixar a apresentação institucional",
  },

  contact: {
    eyebrow: "Contato",
    title: "Trinta minutos e uma resposta honesta",
    sub: "Conte quanto esse processo custa hoje para você, e respondemos com o que vale a pena desenvolver.",
    email: "E-mail",
    phone: "Telefone",
    reassurance:
      "Sem compromisso. O resultado do levantamento é seu, continuando conosco ou não.",
    name: "Nome",
    company: "Empresa",
    message: "Mensagem",
    messagePlaceholder: "Conte sobre o seu projeto...",
    send: "Enviar mensagem",
    sending: "Enviando...",
    success: "Obrigado pela mensagem. Retornaremos em breve.",
    error:
      "Algo deu errado. Tente novamente ou envie um e-mail diretamente para nós.",
    country: "País",
    staff: "Funcionários",
    staffPick: "Quantas pessoas",
    staffOptions: ["Menos de 10", "De 10 a 50", "De 51 a 200", "Mais de 200"],
    spreadsheet: "Sua planilha (opcional)",
    spreadsheetHint:
      "Excel, CSV ou Numbers, até 10 MB. Remova o que for confidencial; uma amostra de linhas basta.",
    fileTooLarge: "O arquivo passa de 10 MB. Envie um recorte menor da planilha.",
  },

  // O folheto digital em /flyer. Afirma apenas o que a apresentação de
  // capacidades afirma; ver docs/COMPANY.md.
  flyer: {
    eyebrow: "Singapura · Japão · Atuação global",
    headline: "Da planilha ao sistema.",
    who: "Para empresas de 10 a 200 pessoas que funcionam com planilhas, ou com um sistema que um fornecedor nunca terminou. Construímos o software que realmente sustenta a sua operação, e cada parte dele é sua.",
    ctaOffer: "Envie-nos uma planilha",
    ctaDeck: "Baixar a apresentação",
    proofEyebrow: "Três coisas que são verdade",
    proof: [
      {
        lead: "Em produção no Japão",
        detail:
          "Um exportador de carros usados opera com um sistema que construímos: estoque, CRM, faturas, documentos de embarque e pagamentos. Em produção, nas mãos do cliente, hoje.",
      },
      {
        lead: "7.060 testes",
        detail:
          "Testes automatizados em 484 classes de cálculo do nosso ERP, na execução de agosto de 2026. Um desenvolvimento interno, ainda não implantado, sem nenhuma afirmação sobre a sua exatidão.",
      },
      {
        lead: "É seu",
        detail:
          "O fundador escreve o código. A conta na nuvem, o banco de dados e o repositório ficam no seu nome desde a primeira semana, então nenhum fornecedor consegue deixar o seu negócio refém.",
      },
    ],
    demosEyebrow: "Experimente antes de se comprometer",
    demosTitle: "Demos que funcionam, não slides",
    demosSub: "{count} pequenos sistemas que você pode rodar no navegador com dados de exemplo. Estes três são os de uso mais geral.",
    demoOpen: "Abrir a demo",
    demosAll: "Ver todas as {count} demos",
    invoiceNowLink: "InvoiceNow: veja uma fatura eletrônica de exemplo criada a partir de uma planilha",
    offerEyebrow: "A oferta",
    offerTitle: "Envie-nos uma planilha e mostraremos a planilha funcionando como um sistema.",
    offerBody:
      "Escolha a planilha que faz o seu negócio girar: orçamentos, estoque, ordens de serviço, entregas, qualquer uma. Em até duas semanas você a vê como um sistema funcionando, com os seus dados dentro, e recebe uma resposta direta sobre quanto custaria o desenvolvimento completo.",
    offerPoints: ["Sem custo, sem compromisso", "De 3 a 5 empresas por mês", "O que for construído na demo fica com você"],
    formEyebrow: "Comece aqui",
    formTitle: "Uma planilha, um formulário",
    formSub: "Conte o que essa planilha faz por você hoje. Respondemos em até dois dias úteis.",
    formReassurance:
      "Seu arquivo é armazenado de forma privada, lido por uma única pessoa e apagado quando você pedir. Nada é compartilhado e nada é vendido.",
    formSend: "Enviar a planilha",
    messagePlaceholder: "O que esta planilha faz pelo negócio e onde ela falha?",
    deckLine: "Baixe a apresentação institucional de 8 slides. Sem precisar informar seu e-mail.",
    grantsLabel: "Empresas de Singapura:",
    grantsLine: "verificaremos se o seu projeto se qualifica para o apoio EDGE.",
    backHome: "Voltar ao site principal",
  },

  testimonial: {
    eyebrow: "Depoimento",
    title: "Como foi trabalhar com a StarTech?",
    intro: "Uma ou duas frases sobre o projeto ajudam outras empresas a decidir se querem trabalhar conosco. Nada é publicado antes de você ver e aprovar o texto final.",
    name: "Seu nome",
    role: "Seu cargo",
    company: "Empresa",
    email: "E-mail",
    quote: "Seu depoimento",
    quotePlaceholder: "Do que você precisava, como foi o projeto e o que mudou depois?",
    quoteHint: "De uma a três frases já basta.",
    credit: "Como devemos identificar você?",
    creditFull: "Nome, cargo e empresa",
    creditAnonymous: "Só cargo e setor, sem nome",
    creditPrivate: "Apenas feedback; por favor, não publiquem",
    consent: "A StarTech pode encurtar o texto, se for longo, e me mostrará a versão final antes de publicá-la.",
    send: "Enviar depoimento",
    sending: "Enviando…",
    thanksTitle: "Obrigado!",
    thanksBody: "Recebemos o seu depoimento e enviaremos o texto final para sua aprovação antes de qualquer publicação.",
    errorRequired: "Preencha este campo.",
    errorEmail: "Informe um e-mail válido.",
    errorQuoteShort: "Escreva pelo menos uma frase (20 caracteres).",
    errorConsent: "Marque esta caixa para continuar.",
    error: "Algo deu errado. Tente novamente.",
  },
  invoicenow: {
    eyebrow: "InvoiceNow · Singapura",
    headline: "Faturas eletrônicas InvoiceNow, enviadas do sistema que você já usa",
    lead: "O InvoiceNow é a rede de faturamento eletrônico de Singapura, e a IRAS vem implantando a rede em fases para todas as empresas registradas no GST. Conectamos o sistema ou a planilha de onde você fatura a um ponto de acesso InvoiceNow.",
    ctaDemo: "Experimentar a fatura de exemplo",
    ctaFlyer: "Envie-nos uma planilha",
    whatEyebrow: "O que é",
    whatTitle: "InvoiceNow em palavras simples",
    what: [
      {
        title: "Um arquivo de dados, não um PDF",
        body: "Uma fatura InvoiceNow é um arquivo estruturado (Peppol PINT SG, em XML) que o sistema do comprador lê diretamente. Ninguém precisa digitar de novo.",
      },
      {
        title: "Enviada pela rede Peppol",
        body: "Sua fatura vai para um ponto de acesso, que encontra o comprador pelo ID Peppol dele (criado a partir do UEN) e a entrega ao ponto de acesso do comprador.",
      },
      {
        title: "Uma cópia vai para a IRAS",
        body: "Para empresas registradas no GST, o ponto de acesso também envia os dados da fatura à IRAS. Vendedor, comprador e seus dois pontos de acesso são os quatro cantos; a IRAS é o quinto.",
      },
    ],
    whoEyebrow: "Quem deve usar e quando",
    whoTitle: "A IRAS está implantando o InvoiceNow em fases para todas as empresas registradas no GST",
    whoIntro: "Segundo a IRAS, as empresas registradas no GST devem enviar os dados das faturas à IRAS pelo InvoiceNow a partir destas datas:",
    phases: [
      { date: "1 nov. 2025", text: "Empresas que se registram voluntariamente no GST em até 6 meses após a constituição." },
      { date: "1 abr. 2026", text: "Qualquer empresa que solicite o registro voluntário no GST a partir desta data." },
      { date: "1 abr. 2028", text: "Empresas que solicitem o registro obrigatório no GST a partir desta data, e empresas já registradas com fornecimentos anuais de até S$200.000." },
      { date: "1 abr. 2029", text: "Empresas já registradas no GST com fornecimentos anuais de até S$1 milhão." },
      { date: "1 abr. 2030", text: "Empresas já registradas no GST com fornecimentos anuais de até S$4 milhões." },
      { date: "1 abr. 2031", text: "Empresas já registradas no GST com fornecimentos anuais acima de S$4 milhões." },
    ],
    whoNote: "A IRAS define as faixas pelos fornecimentos declarados de 2025 e está notificando cada empresa já registrada sobre a sua data. Consulte a página da IRAS para o seu caso.",
    whoSource: "IRAS: requisito GST InvoiceNow (página atualizada em 8 de outubro de 2026)",
    accountant: "Fazemos apenas a integração de software. Se o InvoiceNow se aplica a você e qual o tratamento de GST de cada item da fatura são questões a confirmar com o seu contador ou com a IRAS.",
    offerEyebrow: "O que fazemos",
    offerTitle: "Conectamos o sistema ou a planilha de onde você fatura a um ponto de acesso InvoiceNow.",
    offerBody: "Se você fatura a partir de um sistema próprio, um ERP antigo ou uma planilha, o caminho indicado pela IRAS é conectar-se por meio de um ponto de acesso credenciado. Nós construímos essa conexão: seus dados de faturamento mapeados para o PINT SG, enviados pela API do ponto de acesso, e o status de entrega exibido de volta na ferramenta em que você trabalha.",
    offerPoints: [
      "Seus dados de faturamento mapeados para o PINT SG",
      "Enviados pela API do ponto de acesso",
      "Status de entrega e erros exibidos onde você trabalha",
    ],
    offerHonest: "A StarTech não é provedora de ponto de acesso e não é credenciada pela IMDA. Uma conexão real passa por um ponto de acesso credenciado pela IMDA que escolhemos junto com você.",
    demoEyebrow: "Experimente",
    demoTitle: "Transforme uma fatura de exemplo em XML PINT SG",
    demoIntro: "Preencha a fatura ou envie o modelo CSV. Seu navegador gera o XML e o verifica com um conjunto de regras PINT SG. Nada é enviado para lugar nenhum.",
    sampleBadge: "Dados de exemplo, não é uma fatura fiscal válida",
    csvTitle: "Começar por uma planilha",
    csvHint: "Uma linha por item da fatura, com os dados da fatura e do comprador repetidos em cada linha. Os dados do vendedor ficam no formulário abaixo.",
    csvDownload: "Baixar o modelo CSV",
    csvUpload: "Enviar um arquivo CSV",
    csvLoaded: "{count} linhas carregadas do arquivo.",
    csvSkipped: "O arquivo tem mais {count} números de fatura; só a primeira fatura foi carregada.",
    csvErrorEmpty: "O arquivo está vazio.",
    csvErrorColumns: "Estas colunas estão faltando no arquivo: {columns}",
    csvErrorRows: "O arquivo tem uma linha de cabeçalho, mas nenhum item de fatura.",
    csvErrorRead: "Não foi possível ler o arquivo.",
    loadValid: "Preencher com um exemplo válido",
    loadBroken: "Preencher com um exemplo com erros",
    invoiceSection: "Dados da fatura",
    sellerSection: "Vendedor (sua empresa)",
    buyerSection: "Comprador",
    linesSection: "Itens da fatura",
    fields: {
      invoiceNumber: "Número da fatura",
      issueDate: "Data de emissão",
      dueDate: "Data de vencimento",
      buyerReference: "Referência do comprador ou número do pedido",
      paymentTerms: "Condições de pagamento",
      name: "Razão social",
      uen: "UEN (número único de entidade)",
      gstRegNo: "Número de registro no GST",
      street: "Endereço",
      postalCode: "Código postal",
      description: "Descrição do item",
      quantity: "Quantidade",
      unit: "Unidade de medida",
      unitPrice: "Preço unitário (S$)",
      gstCategory: "Categoria do GST",
      lineAmount: "Valor do item",
    },
    units: {
      H87: "Peça",
      HUR: "Hora",
      DAY: "Dia",
      MON: "Mês",
    },
    categories: {
      SR: "SR · Alíquota padrão, 9%",
      ZR: "ZR · Alíquota zero",
      ES33: "ES33 · Isento, regulamento 33",
      ESN33: "ESN33 · Isento, outros",
      OS: "OS · Fora do escopo do imposto",
      NG: "NG · Vendedor não registrado no GST",
    },
    categoryNote: "Os códigos de categoria vêm da lista de códigos do PINT SG. Qual se aplica a cada item é uma pergunta para o seu contador.",
    addLine: "Adicionar um item",
    removeLine: "Remover o item {n}",
    lineLabel: "Item {n}",
    errorNumber: "Digite um número como 12.50, com até 4 casas decimais.",
    errorQuantity: "Digite uma quantidade maior que zero, com até 4 casas decimais.",
    errorDate: "Digite a data no formato AAAA-MM-DD.",
    generate: "Gerar o XML e executar as verificações",
    generating: "Gerando…",
    resultEyebrow: "Resultado",
    totalsTitle: "Totais",
    totals: {
      net: "Total sem GST",
      gst: "Valor do GST",
      payable: "Valor a pagar",
    },
    checksTitle: "Verificações",
    checksSummary: "{passed} de {total} verificações aprovadas",
    pass: "Aprovado",
    fail: "Reprovado",
    demoCheck: "Verificação da demo da StarTech, não é uma regra do PINT SG",
    checksSource: "Os IDs das regras vêm do schematron do PINT SG Billing v1.4.1, publicado em 25 de maio de 2026. É um subconjunto executado no seu navegador; um ponto de acesso faz a validação completa antes de qualquer envio.",
    checks: {
      specIds: "Os identificadores de especificação e de processo de negócio são os de faturamento PINT SG",
      invoiceNumber: "A fatura tem número",
      issueDate: "Há data de emissão e todas as datas estão no formato AAAA-MM-DD",
      dueOrTerms: "Há valor a pagar, então consta uma data de vencimento ou condições de pagamento",
      buyerReference: "Consta uma referência do comprador ou um número de pedido",
      currency: "A moeda da fatura é SGD, sem moeda fiscal separada",
      sellerName: "Consta a razão social do vendedor",
      buyerName: "Consta a razão social do comprador",
      sellerEndpoint: "O vendedor tem endereço Peppol (esquema 0195, a partir do UEN)",
      buyerEndpoint: "O comprador tem endereço Peppol (esquema 0195, a partir do UEN)",
      sellerLegalId: "O UEN do vendedor consta como seu registro legal",
      sellerGstId: "Há cobrança de GST, então consta o número de registro no GST do vendedor",
      sellerAddress: "Constam o endereço e o código postal do vendedor",
      buyerAddress: "Constam o endereço e o código postal do comprador",
      countries: "Os endereços do vendedor e do comprador têm código de país",
      uuid: "A fatura tem um identificador único (UUID) no formato correto",
      linesNamed: "Há pelo menos um item e todos têm descrição",
      lineCategories: "Cada item tem um código de categoria do GST de Singapura válido",
      lineAmounts: "O valor de cada item é igual a quantidade × preço unitário",
      netTotals: "O total sem GST é igual à soma dos valores dos itens",
      gstAmounts: "O GST de cada categoria é igual a base tributável × alíquota, e a soma bate com o total de GST",
      payable: "O total com GST e o valor a pagar batem",
      decimals: "Nenhum valor tem mais de 2 casas decimais",
      noGst: "Um item de vendedor não registrado (NG) não se mistura com itens com GST",
      noGstNumber: "Uma fatura com um item NG não traz número de GST do vendedor",
      uenFormat: "Os dois UEN têm um formato de UEN válido",
    },
    xmlTitle: "O XML gerado",
    download: "Baixar o XML",
    nextEyebrow: "O que acontece depois",
    nextTitle: "Como este arquivo seria enviado de fato",
    next: [
      {
        title: "Seu sistema gera o arquivo",
        body: "Numa conexão real, o XML é gerado a partir dos seus próprios dados de faturamento toda vez que você emite uma fatura. Ninguém digita nada.",
      },
      {
        title: "Ele vai para um ponto de acesso",
        body: "Seu sistema o envia a um ponto de acesso credenciado pela IMDA pela API desse provedor. O ponto de acesso faz a validação PINT SG completa.",
      },
      {
        title: "O comprador recebe",
        body: "O ponto de acesso encontra o ponto de acesso do comprador no diretório Peppol e entrega a fatura no sistema do comprador.",
      },
      {
        title: "A IRAS recebe uma cópia",
        body: "Quando a função de envio for ativada, o ponto de acesso também enviará os dados da fatura à IRAS. Esse é o quinto canto.",
      },
    ],
    nextNote: "Esta página não se conecta a nenhum ponto de acesso. Uma conexão real usa um ponto de acesso credenciado pela IMDA escolhido junto com você.",
    ctaTitle: "Você fatura hoje a partir de uma planilha?",
    ctaBody: "Envie-nos a planilha de onde você fatura. Mostraremos como ela se encaixa no InvoiceNow e diremos com franqueza o que uma conexão envolveria. Sem custo e sem compromisso.",
    ctaButton: "Enviar uma planilha",
    sourcesTitle: "Fontes",
    sourceIras: "IRAS: requisito GST InvoiceNow",
    sourcePint: "Peppol: especificação PINT SG Billing v1.4.1",
    sourceImda: "IMDA: InvoiceNow",
    backHome: "Voltar ao site principal",
  },

  singpass: {
    eyebrow: "Atualização do Singpass · FAPI 2.0",
    title: "O login com Singpass precisa migrar para FAPI 2.0 até 31 de dezembro de 2026",
    intro:
      "Se o seu site ou aplicativo tem um botão “Entrar com Singpass”, ou preenche formulários com o Myinfo, ele precisa adotar o novo padrão de segurança do Singpass antes do fim de 2026.",
    source: "O prazo, conforme publicado pelo Singpass",
    ctaCheck: "Peça uma verificação da sua integração",
    ctaDemo: "Executar a demo",
    changesEyebrow: "O que muda",
    changesTitle: "Cinco mudanças no funcionamento do login",
    changes: [
      {
        lead: "A solicitação é enviada antes",
        detail:
          "Seu servidor envia primeiro a solicitação de login ao Singpass (PAR), e o navegador do usuário leva só uma referência curta. Nada na barra de endereço pode ser alterado.",
      },
      {
        lead: "Uma prova de uso único por login",
        detail:
          "Seu servidor prova que foi ele quem iniciou o login (PKCE), então um código interceptado não serve para mais ninguém.",
      },
      {
        lead: "Tokens vinculados à sua chave",
        detail:
          "Cada código e cada token só funcionam junto com uma chave que o seu servidor guarda (DPoP). Um token vazado não pode ser reutilizado.",
      },
      {
        lead: "A identidade é criptografada",
        detail:
          "Todo token de ID agora é criptografado com a sua chave, e o NRIC passou para um campo novo. Código que lê o formato antigo deixa de funcionar.",
      },
      {
        lead: "Redirecionamentos e erros mais rígidos",
        detail:
          "Links de aplicativo com esquema próprio não são mais aceitos, apps de Login precisam informar para que serve cada login, e o Singpass agora devolve os erros ao seu site, que precisa tratá-los.",
      },
    ],
    migrationLink: "Guia de migração do Singpass para apps de Login e Myinfo (v5)",
    whoEyebrow: "Quem é afetado",
    whoTitle: "Qualquer site ou app que use o Singpass para fazer login ou preencher dados pessoais",
    who: [
      "Sites, portais e apps móveis com “Entrar com Singpass”",
      "Formulários que preenchem os dados de uma pessoa a partir do Myinfo",
      "Integrações criadas antes de fevereiro de 2026; apps registrados desde então já precisavam usar FAPI 2.0",
      "Integrações com Myinfo v3 e v4, que o Singpass pediu para migrar para o Myinfo v5 até o fim de setembro de 2026",
    ],
    corppass: "O login com Corppass tem um prazo próprio, posterior: 31 de março de 2027.",
    corppassLink: "Cronograma do Corppass",
    riskEyebrow: "Se você não migrar",
    riskTitle: "Planeje-se para o login antigo parar de funcionar",
    riskBody:
      "O Singpass exige que todas as integrações usem FAPI 2.0 até 31 de dezembro de 2026, e retirou a documentação do fluxo antigo em 14 de julho de 2026. Uma integração que continue no fluxo antigo deve contar com falhas no login com Singpass ou no preenchimento pelo Myinfo depois do prazo: pessoas que não conseguem entrar e formulários que não conseguem concluir.",
    demoEyebrow: "Demo de referência em funcionamento",
    demoTitle: "Todo o fluxo FAPI 2.0, rodando no seu navegador",
    demoIntro:
      "Executa as etapas reais do protocolo contra um servidor Singpass simulado que construímos para a demo. As chaves são geradas na hora no seu navegador, a pessoa é fictícia e nada é enviado ao Singpass. Todas as solicitações e respostas aparecem, com os tokens encurtados.",
    demoNotice:
      "Servidor simulado: não é o Singpass e não está conectado ao Singpass nem à GovTech. O mesmo código cliente também roda contra o ambiente de homologação do próprio Singpass: experimente com o botão abaixo.",
    appType: "Tipo de app",
    appLogin: "Singpass Login",
    appMyinfo: "Myinfo (v5)",
    run: "Executar o fluxo",
    runAgain: "Executar de novo",
    running: "Executando o fluxo…",
    allPassed:
      "Todas as etapas passaram. Os dados abaixo chegaram criptografados e assinados, por meio de um código e de tokens vinculados à chave deste navegador.",
    failed: "Uma etapa falhou. A solicitação e a resposta dela estão abaixo.",
    cancelled:
      "Login cancelado. O Singpass devolve um erro ao seu site, e o site mostra a própria mensagem, nunca o texto de erro do Singpass.",
    details: "Solicitação e resposta",
    status: {
      pending: "Não iniciado",
      running: "Em execução",
      waiting: "Aguardando você",
      done: "Aprovado",
      error: "Falhou",
    },
    steps: {
      register: {
        title: "Registrar o app",
        body: "Seu navegador cria uma chave de assinatura e uma de criptografia, e registra as metades públicas no servidor simulado, como seria feito no Singpass Developer Portal.",
      },
      discovery: {
        title: "Ler a configuração do servidor",
        body: "Endpoints e algoritmos vêm da configuração OpenID, não de endereços fixos no código.",
      },
      session: {
        title: "Criar os segredos deste login",
        body: "Um state, um nonce, um verificador PKCE (S256) e uma chave DPoP novos, usados só neste login e depois descartados.",
      },
      par: {
        title: "Enviar a solicitação antes (PAR)",
        body: "A solicitação de login vai primeiro ao servidor, com uma asserção de cliente assinada (private_key_jwt) e uma prova DPoP. O servidor responde com um request_uri de curta duração.",
      },
      authorize: {
        title: "Enviar a pessoa ao Singpass",
        body: "O endereço leva apenas client_id e request_uri. No serviço real, é nesse momento que a pessoa aprova o login no app do Singpass.",
      },
      redirect: {
        title: "Tratar o retorno",
        body: "Verificar state e iss antes de confiar no código.",
      },
      token: {
        title: "Trocar o código por tokens",
        body: "Envia o código, o verificador PKCE, uma nova asserção de cliente e uma nova prova DPoP. Os tokens voltam vinculados à chave DPoP.",
      },
      idToken: {
        title: "Descriptografar e verificar o token de ID",
        body: "Descriptografa com a sua chave de criptografia, confere a assinatura com as chaves publicadas pelo servidor (JWKS) e depois verifica iss, aud, exp e nonce.",
      },
      userinfo: {
        title: "Buscar os dados do Myinfo",
        body: "Authorization: DPoP, com uma prova vinculada ao token de acesso (ath). A resposta também é criptografada e assinada, dentro de person_info.",
      },
      replay: {
        title: "Testar um código roubado",
        body: "Alguém que copiou o código e o verificador PKCE tenta usá-los de outro dispositivo, com a própria chave. O servidor precisa recusar.",
        refused: "Recusado, como deve ser: o código só funciona com a chave que o pediu.",
        accepted: "O servidor aceitou um código roubado. Isso é um bug.",
      },
    },
    loginTitle: "Login simulado do Singpass",
    loginBody:
      "No Singpass, a pessoa agora escanearia um QR code com o app do Singpass. Aqui você decide pela pessoa de exemplo.",
    loginRequested: "Dados solicitados",
    loginPurpose: "Finalidade",
    approve: "Entrar como a pessoa de exemplo",
    cancel: "Cancelar o login",
    sample: "Pessoa de exemplo, não real",
    resultTitle: "O que o seu site recebe",
    errorGeneric: "Algo deu errado. Execute o fluxo de novo daqui a um minuto.",
    offerEyebrow: "O que oferecemos",
    offerTitle: "Verificamos e atualizamos sua integração com o Singpass",
    offerSteps: [
      {
        lead: "Verificação",
        detail:
          "Lemos o seu código atual de Singpass ou Myinfo e dizemos por escrito o que precisa mudar e quanto tempo vai levar.",
      },
      {
        lead: "Atualização",
        detail:
          "Implementamos PAR, PKCE, DPoP e tokens de ID criptografados no seu código, e testamos no ambiente de homologação do Singpass com o app da sua própria organização.",
      },
      {
        lead: "Entrada em produção",
        detail:
          "Fazemos a troca em produção antes do prazo. O Singpass permite que o fluxo antigo e o novo rodem lado a lado, então a mudança pode ser feita em etapas.",
      },
    ],
    honesty:
      "Para ser claro: esta demo é a nossa implementação de referência contra um servidor simulado. Ainda não concluímos uma migração de Singpass para nenhum cliente e não somos parceiros do Singpass nem da GovTech. O seu app do Singpass continua registrado em nome da sua organização.",
    otherWork: "Veja o que mais construímos",
    formEyebrow: "Verificação do Singpass",
    formTitle: "Peça para verificarmos seu login com Singpass",
    formSub: "Diga qual site ou aplicativo tem o login com Singpass. Respondemos em até dois dias úteis explicando o que a mudança para FAPI 2.0 significa para ele.",
    formPlaceholder: "Qual site ou aplicativo tem o login com Singpass? Quem o desenvolveu? Ele usa Myinfo ou Corppass?",
    formSend: "Pedir verificação do Singpass",
    flyerLine: "O Singpass precisa migrar para FAPI 2.0 até 31 de dezembro de 2026. Veja nossa demo do novo fluxo de login funcionando.",
    stagingTitle: "Teste no ambiente de homologação do Singpass",
    stagingBody: "Este botão executa o mesmo cliente contra o próprio ambiente de homologação do Singpass, com o app de homologação da StarTech. Só contas de teste do Singpass conseguem entrar; contas reais não.",
    stagingButton: "Entrar com Singpass (homologação)",
    stagingResult: "O ambiente de homologação do Singpass devolveu este token de ID, descriptografado e verificado",
    stagingCancelled: "O login de teste foi cancelado.",
    stagingFailed: "O login de teste não foi concluído. Tente de novo mais tarde.",
  },

  stickyCta: {
    line: "Trinta minutos sobre o seu processo e uma visão clara do que desenvolver primeiro.",
    action: "Vamos conversar",
  },

  footer: {
    location: "Singapura",
    rights: "StarTech Innovation Pte. Ltd.",
  },

  demos: {
    signIn: {
      title: "Personalizar {title}",
      subtitle: "Entre com o Google para gerar resultados personalizados com os seus próprios dados.",
      notConfigured: "O login ainda não está configurado — volte em breve.",
      signedInAs: "Conectado como",
      backToSample: "← Voltar ao exemplo",
    },
  },
};
