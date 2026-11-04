import type { Messages } from "./en";

/**
 * Portuguese.
 *
 * Brazilian rather than European: Brazil is the far larger market and the more
 * likely source of enquiries. That decision shows in "você" over "tu",
 * "time" over "equipa", "arquivo" over "ficheiro", and in the post-Acordo
 * Ortográfico spellings.
 *
 * NEEDS A NATIVE REVIEW before this locale is linked publicly.
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
    ask: "Fale conosco",
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
    ctaDeck: "Baixar o dossiê",
    languagesAvailable: "Também disponível em:",
    readInLanguage: "Ler esta página em {language}",
    ctaAsk: "Fazer uma pergunta",
    note: "Sem custo e sem precisar preparar documento algum: basta trazer o processo que mais consome o seu tempo. Se software não for a resposta, diremos isso.",
    proof: {
      yearsFigure: "20+",
      yearsLabel: "anos, dos dois lados",
      testsFigure: "7.060",
      testsLabel: "testes automatizados",
      jurisdictionsFigure: "2",
      jurisdictionsLabel: "jurisdições",
      languagesFigure: "4",
      languagesLabel: "idiomas de trabalho",
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
    eyebrow: "O que atendemos",
    title: "Onde fazemos o nosso melhor trabalho.",
    sub: "A maior parte dos projetos começa em um destes casos. Se o seu for diferente, ainda vale uma conversa: o formato do problema importa mais do que o setor em que ele acontece.",
    fits: [
      {
        headline: "A operação roda em planilhas e mensagens",
        body: "Estoque em um lugar, pagamentos em outro, decisões em uma conversa. Funcionava com dez pessoas e agora é exatamente o que está segurando a empresa.",
      },
      {
        headline: "Um fornecedor já tentou e não deu certo",
        body: "Você pagou por um sistema que a equipe não usa. Está receoso de recomeçar e quer saber o que muda desta vez.",
      },
      {
        headline: "Você opera em mais de um país",
        body: "Um exportador japonês que envia para o mundo todo. Uma empresa europeia ou americana com filial na Ásia. Um negócio de Singapura que contrata na Indonésia. Moedas, regimes tributários e calendários de entrega diferentes em um só sistema — e nenhum fornecedor que entenda as duas pontas sem precisar aprender no caminho.",
      },
      {
        headline: "Os números precisam estar certos, não aproximados",
        body: "Dinheiro, folha, sinistros: onde quase certo não serve, e errar custa mais do que atrasar.",
      },
    ],
    pricing:
      "Sobre preço: na primeira conversa damos uma faixa e, depois do levantamento, um número firme — nunca um valor inventado por e-mail. E se uma ferramenta pronta já resolver, dizemos qual: sai mais barato do que qualquer coisa que possamos construir.",
    pricingLead: "Sobre preço:",
  },

  work: {
    eyebrow: "Projetos selecionados",
    title: "Sistemas rodando em produção.",
    sub: "Quatro projetos, descritos como o dono do negócio descreveria: o que a empresa realmente fazia antes e o que deu errado no caminho.",
    before: "Antes",
    built: "O que construímos",
    result: "Resultado",
    details: "Detalhes",
    disclaimer:
      "Omitimos o nome do cliente quando há acordo de confidencialidade. Os números vêm dos sistemas entregues e podem ser detalhados em uma conversa.",
    cases: [
      {
        sector: "Comércio internacional",
        market: "Japão",
        title: "Um exportador de veículos que rodava em planilhas e mensagens",
        before:
          "Estoque no Airtable, pagamentos conciliados à mão no Excel, conversas com clientes espalhadas pelo chat. Um fornecedor anterior tinha entregue um CRM que a equipe não conseguia usar, então ele servia apenas para exibir carros.",
        built:
          "Uma reconstrução completa da operação: estoque, CRM com permissões por papel, geração de fatura proforma e comercial, instruções de embarque, importação de extratos bancários e recebimentos em dois níveis.",
        metric: { figure: "2", caption: "falhas com impacto financeiro pegas antes de publicar" },
        detail: [
          "Reimportar um extrato duplicava os recebimentos: a maioria dos bancos japoneses não emite identificador de transferência, então a chave de deduplicação ficava vazia. Trocada por uma chave derivada do conteúdo de cada linha.",
          "A página de clientes expunha o faturamento da empresa inteira a cada vendedor. Encontrado em teste, corrigido e verificado com dois vendedores sobre o mesmo cliente.",
          "Cinco papéis, cada um delimitado: administrador, gestor, vendedor, contador e cliente.",
        ],
      },
      {
        sector: "Sistemas de gestão",
        market: "Singapura e Indonésia",
        title: "Um motor de folha que um contador consegue auditar linha a linha",
        before:
          "A legislação de folha de Singapura não perdoa: o arredondamento em três etapas do CPF, faixas por idade e residência, tetos de salário ordinário, pisos e tetos do SDL. A maioria dos sistemas aproxima e torce para ninguém conferir.",
        built:
          "Um backend multiempresa em Java 21 e Spring Boot, com um motor de conformidade de folha de Singapura verificado caso a caso contra as tabelas do CPF Board.",
        metric: { figure: "7.060", caption: "testes automatizados em 484 classes de cálculo" },
        detail: [
          "48 cenários de CPF documentados como uma tabela de verificação imprimível — faixas etárias, alíquotas de primeiro e segundo ano de residência, limites de arredondamento, comportamento dos tetos — para o contador assinar linha a linha.",
          "Cinco motores contábeis independentes recalculam cada demonstrativo: razão, balancete, DRE, balanço e fluxo de caixa precisam bater.",
          "51 controladores REST. Multimoeda, multiempresa, permissões por papel e registro de auditoria.",
        ],
      },
      {
        sector: "Implantação de IA",
        market: "Singapura",
        title: "Um copiloto que responde a partir dos documentos da própria empresa",
        before:
          "Um chatbot genérico não serve para quem trabalha em uma empresa média: ele não conhece o cargo da pessoa, o setor, nem o que a organização já decidiu.",
        built:
          "Um copiloto em produção com quatro modos de raciocínio, contexto organizacional em camadas (setor, empresa, cargo, pessoa), busca sobre os documentos do próprio cliente e coordenação entre áreas.",
        metric: { figure: "Em produção", caption: "API em produção, cliente pagante" },
        detail: [
          "Roteamento entre vários modelos com camada de abstração: o modelo padrão foi trocado de fornecedor a pedido do cliente sem tocar no código do produto.",
          "Transcrição de reuniões, com extração dos encaminhamentos como tarefas.",
          "Roda em Cloudflare Workers com D1, KV, R2 e Vectorize.",
        ],
      },
      {
        sector: "Saúde",
        market: "Indonésia e Sudeste Asiático",
        title: "Um prontuário que pertence ao paciente, não ao hospital",
        before:
          "Pacientes que circulam entre serviços da Indonésia e de Singapura carregam o histórico em pastas de papel e fotos. Os sistemas dos prestadores não conversam, e as regras de dados transfronteiriços tornam ilegal uma integração ingênua.",
        built:
          "Uma plataforma de saúde trilíngue, de propriedade do paciente, operada de Singapura e com dados hospedados apenas lá. Acompanhamento de hábitos, adesão a seguro e um consultor com IA já estão no ar; o cofre transfronteiriço e o portal clínico estão em construção.",
        metric: { figure: "3", caption: "idiomas, uma base de código" },
        detail: [
          "Modelo de custódia por desenho: a plataforma guarda cópias que pertencem ao paciente e nunca se apresenta como o prontuário do prestador.",
          "A localização dos dados foi decidida no desenho da arquitetura, não acrescentada depois de uma revisão de conformidade.",
          "Rede credenciada de seguradoras e diretório de hospitais organizados em Singapura, Malásia e Indonésia.",
        ],
      },
    ],
  },

  showcase: {
    eyebrow: "Experimente você mesmo",
    title: "Treze projetos. Escolha um e coloque à prova.",
    sub: "Cada cartão abaixo é uma demonstração que funciona de verdade, não uma maquete. Abra um e veja um resultado de amostra na hora.",
    sampleBadge: "Amostra",
    tryIt: "Experimentar",
    seeAll: "Ver todas as soluções",
    disclaimer:
      "Cada amostra usa dados fictícios. Para ver funcionando com o seu próprio processo, envie-nos uma planilha. É gratuito.",
    teasers: {
      invoiceScanner: "escaneada e detalhada em segundos",
      customerChatbot: "confiança da resposta",
      appointmentBooking: "agendada e confirmada automaticamente",
      quotationGenerator: "orçamento gerado, com imposto incluído",
      jobPostingWriter: "requisitos da vaga redigidos",
      inventoryTracker: "itens sinalizados para reposição",
      socialMediaManager: "publicações geradas de uma vez",
      documentTranslator: "idiomas, em um clique",
      employeeOnboarding: "tarefas de integração agendadas",
      salesAssistant: "e-mails de acompanhamento programados",
      complianceChecker: "cláusulas de alto risco identificadas",
      trainingContentGenerator: "módulos de treinamento criados",
      financialReportBuilder: "lucro líquido trimestral, explicado",
    },
  },

  practices: {
    eyebrow: "Serviços",
    title: "Quatro áreas, um único time",
    sub: "Preferimos aprofundar em quatro áreas a espalhar por vinte. Em todas elas o trabalho é conduzido pessoalmente pelo responsável, com especialistas conforme o projeto exigir.",
    details: "Detalhes",
    items: [
      {
        title: "Implantação de IA",
        description:
          "Busca sobre os seus próprios documentos, modelos ajustados ao domínio e automações — com as travas e a citação de fontes que tornam o resultado utilizável em um negócio regulado.",
        details: [
          "Geração aumentada por recuperação com busca vetorial sobre os seus dados",
          "Roteamento entre fornecedores atrás de uma camada de abstração: trocar de modelo sem tocar no produto",
          "Pontuação de confiança com citação de fontes, para as respostas poderem ser conferidas",
          "Travas contra invenções e revisão de conformidade",
        ],
      },
      {
        title: "Software corporativo",
        description:
          "ERP e sistemas de negócio completos — financeiro, pessoas, estoque, compras e produção — construídos para resistir a uma auditoria, não apenas para demonstrar.",
        details: [
          "Razão, contas a pagar e a receber, folha e ativo imobilizado",
          "Multiempresa, multimoeda, permissões por papel e registro de auditoria",
          "Motor de folha de Singapura verificado caso a caso contra as tabelas do CPF Board",
          "Integração com Xero, QuickBooks e planilhas",
        ],
      },
      {
        title: "Sistemas financeiros",
        description:
          "Motores contábeis, IA documental, valuation e conciliação para operadores que respondem a um regulador.",
        details: [
          "Conciliação automática entre contas e moedas, com deduplicação determinística",
          "Importação de extratos bancários, inclusive formatos sem identificador de transferência",
          "Fluxos de KYC e AML, relatórios para MAS e OJK",
          "DCF e análise de comparáveis com simulação de Monte Carlo",
        ],
      },
      {
        title: "Saúde e setor público",
        description:
          "Plataformas de pacientes, prontuários e serviços ao cidadão para ambientes de alto volume e alta exigência, em que as regras de dados vêm primeiro.",
        details: [
          "A localização dos dados é decidida no desenho, não acrescentada depois de uma revisão",
          "Modelo de custódia: cópias do paciente, nunca o prontuário do prestador",
          "Entrega multilíngue em inglês, chinês, malaio e indonésio",
          "Infraestrutura de alta disponibilidade para serviços críticos",
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
        name: "Saúde",
        description:
          "Gestão hospitalar, automação da recepção, análise de prontuários e triagem assistida por IA.",
        details: [
          "Prontuário eletrônico em conformidade com HL7 e FHIR",
          "Triagem com IA que prioriza pela gravidade dos sintomas",
          "Envio e acompanhamento automáticos de pedidos ao convênio",
          "Integração de telemedicina com agenda e faturamento",
        ],
      },
      {
        name: "Finanças e bancos",
        description:
          "Motores contábeis, processamento de documentos de seguro, valuation, conformidade tributária e detecção de fraude.",
        details: [
          "Monitoramento de transações em tempo real e detecção de anomalias",
          "Relatórios regulatórios para MAS, OJK e o regime a que o seu auditor responde",
          "Conciliação automática entre contas e moedas",
          "Score de crédito e avaliação de risco com IA",
        ],
      },
      {
        name: "Educação",
        description:
          "Plataforma de aprendizagem com tutoria por IA, avaliações adaptativas, gestão de certificações e conteúdo multilíngue.",
        details: [
          "Trilhas que se adaptam ao desempenho do aluno",
          "Questionários gerados por IA com correção automática",
          "Distribuição multilíngue com síntese de voz",
          "Controle de certificados e credenciais",
        ],
      },
      {
        name: "Setor público",
        description:
          "Soluções seguras e em conformidade para o setor público. Automação de serviços ao cidadão e aplicações que não podem parar.",
        details: [
          "Portal do cidadão com verificação de identidade digital",
          "Processamento de alvarás, licenças e requerimentos",
          "Registros e relatórios prontos para auditoria",
          "Infraestrutura de alta disponibilidade para serviços críticos",
        ],
      },
      {
        name: "Indústria",
        description:
          "Sistemas ERP, manutenção preditiva, otimização da cadeia de suprimentos e controle de qualidade automatizado.",
        details: [
          "Manutenção preditiva com sensores conectados",
          "Visibilidade e rastreamento da cadeia de suprimentos",
          "Controle de qualidade com visão computacional",
          "Programação da produção e planejamento de capacidade",
        ],
      },
      {
        name: "Varejo e e-commerce",
        description:
          "Recomendações com IA, assistentes virtuais, atendimento automatizado e gestão de estoque.",
        details: [
          "Recomendações personalizadas com filtragem colaborativa",
          "Chatbots que atendem a qualquer hora",
          "Preços dinâmicos conforme demanda e concorrência",
          "Previsão de estoque com sazonalidade",
        ],
      },
    ],
  },

  approach: {
    eyebrow: "Como trabalhamos",
    title: "Da estratégia à produção em 90 dias",
    sub: "Um processo lapidado em projetos corporativos. Nós implementamos, não apenas aconselhamos.",
    deliverable: "Entrega",
    step: "Ir para a etapa",
    previous: "Anterior",
    next: "Próximo",
    items: [
      {
        week: "Semanas 1–2",
        title: "Levantamento e prontidão para IA",
        items: [
          "Análise dos objetivos do negócio e dos gargalos",
          "Avaliação dos sistemas e dados atuais",
          "Identificação das oportunidades de maior impacto",
          "Definição de métricas de sucesso e KPIs",
        ],
        deliverable: "Relatório de oportunidades de IA e projeção de retorno",
      },
      {
        week: "Semanas 3–4",
        title: "Arquitetura da solução",
        items: [
          "Desenho da arquitetura",
          "Escolha de modelo e plataforma",
          "Plano de integração com os sistemas existentes",
          "Desenho do fluxo de dados e da segurança",
        ],
        deliverable: "Arquitetura técnica e plano de implantação",
      },
      {
        week: "Semanas 5–8",
        title: "Prova de conceito",
        items: [
          "Protótipo com dados reais",
          "Treinamento e ajuste do modelo",
          "Implementação das funções centrais",
          "Testes com usuários e coleta de retorno",
        ],
        deliverable: "Protótipo funcional com as capacidades essenciais",
      },
      {
        week: "Semanas 9–11",
        title: "Entrada em produção",
        items: [
          "Escala para produção",
          "Segurança, monitoramento e backup",
          "Testes de carga e ajuste de desempenho",
          "Treinamento da equipe e documentação",
        ],
        deliverable: "Sistema em produção pronto para uso",
      },
      {
        week: "Semana 12 em diante",
        title: "Otimização e suporte",
        items: [
          "Monitoramento e tratamento do retorno dos usuários",
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
    title: "Perguntas que vale fazer antes.",
    sub: "As que mais ouvimos, respondidas com franqueza — inclusive aquelas em que a resposta honesta é esperar.",
    items: [
      {
        said: "Já pagamos por isso uma vez e não conseguimos usar. O que muda agora?",
        answer:
          "Na maioria das vezes o desenvolvimento estava certo e os requisitos errados: ninguém sentou com quem faz o trabalho antes de o código começar. Por isso começamos pelo levantamento, e esse resultado é seu, continuando conosco ou não. Se o sistema atual puder ser aproveitado, diremos isso — reescrever algo que funciona é desperdiçar dinheiro.",
        proof: "A reconstrução do sistema de exportação de veículos começou exatamente assim.",
      },
      {
        said: "O que acontece com o sistema se você não estiver disponível?",
        answer:
          "O núcleo é escrito pelo responsável e especialistas entram conforme o trabalho exige. O que protege você não é o número de pessoas, e sim o sistema estar documentado, testado e implantado em infraestrutura sua: sua conta, seu banco, seu repositório. Outro engenheiro consegue assumir porque os testes descrevem o que o sistema deve fazer.",
        proof: "7.060 testes automatizados em 484 classes de cálculo.",
      },
      {
        said: "Quanto costuma custar algo assim?",
        answer:
          "Na primeira conversa damos uma faixa e, depois do levantamento, um número firme. Dizemos o valor real antes, não depois. Se não couber no orçamento, cortamos escopo junto com você: um sistema menor que entra no ar vale mais que um grande que empaca. Projetos de pequenas empresas de Singapura podem se qualificar para o subsídio EDGE, que substituiu o PSG; verificamos se o seu se encaixa e preparamos sem custo a documentação do fornecedor.",
        proof: "A elegibilidade é conferida com os critérios vigentes da IMDA, não presumida.",
      },
      {
        said: "Perdemos alguma coisa esperando um ou dois trimestres?",
        answer:
          "Às vezes nada, e nesse caso diremos isso. Preferimos que você ligue quando o problema apertar a fechar contrato enquanto não aperta. Dito isso, o custo de esperar quase nunca está no software: está na conciliação manual e nos erros do período. Se quiser, calculamos esse valor na conversa e você decide com o número à frente.",
      },
      {
        said: "Quanto vamos precisar explicar sobre como o negócio funciona?",
        answer:
          "Poupar essa explicação é exatamente a razão de esta empresa existir. Você não vai precisar explicar o que é um balancete, quanto se deve de CPF ou por que um sinistro fecha do jeito que fecha. Conte como contaria ao seu contador.",
        proof:
          "O motor de folha é verificado caso a caso contra as tabelas do CPF Board.",
      },
    ],
  },

  capabilityDeck: {
    eyebrow: "Leve com você",
    title: "Toda a proposta, em um único documento.",
    sub: "Cada prática, cada prova, cada número desta página.",
    cta: "Baixar o dossiê de capacidades",
  },

  contact: {
    eyebrow: "Contato",
    title: "Trinta minutos e uma resposta honesta",
    sub: "Conte quanto esse processo custa hoje e voltamos dizendo o que vale a pena construir.",
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
      "Algo deu errado. Tente novamente ou escreva diretamente para o nosso e-mail.",
    country: "País",
    staff: "Funcionários",
    staffPick: "Quantas pessoas",
    staffOptions: ["Menos de 10", "De 10 a 50", "De 51 a 200", "Mais de 200"],
    spreadsheet: "Sua planilha (opcional)",
    spreadsheetHint:
      "Excel, CSV ou Numbers, até 10 MB. Remova o que for confidencial; uma amostra de linhas basta.",
    fileTooLarge: "Esse arquivo passa de 10 MB. Envie um extrato menor.",
  },

  // O folheto digital em /flyer. Afirma apenas o que a apresentação de
  // capacidades afirma; ver docs/COMPANY.md.
  flyer: {
    eyebrow: "Singapura · Japão · Atuação mundial",
    headline: "Da planilha ao sistema.",
    who: "Para empresas de 10 a 200 pessoas que funcionam com planilhas, ou com um sistema que um fornecedor nunca terminou. Construímos o software que realmente sustenta a sua operação, e cada parte dele é sua.",
    ctaOffer: "Envie-nos uma planilha",
    ctaDeck: "Baixar a apresentação",
    proofEyebrow: "Três coisas que são verdade",
    proof: [
      {
        lead: "Em produção no Japão",
        detail:
          "Um exportador de carros usados opera com um sistema que construímos: estoque, CRM, faturas, documentos de embarque e recebimentos. Em produção, com o cliente, hoje.",
      },
      {
        lead: "7,060 testes",
        detail:
          "Testes automatizados sobre 484 calculadoras do nosso ERP, da execução de agosto de 2026. Um desenvolvimento interno, ainda não implantado, em que cada número é conferido antes de ser entregue.",
      },
      {
        lead: "É seu",
        detail:
          "O fundador escreve o código. A conta na nuvem, o banco de dados e o repositório ficam no seu nome desde a primeira semana, então nenhum fornecedor pode segurar o seu negócio.",
      },
    ],
    demosEyebrow: "Experimente antes de se comprometer",
    demosTitle: "Demos que funcionam, não slides",
    demosSub: "{count} sistemas pequenos que você pode executar no navegador com dados de exemplo. Estes três são os mais universais.",
    demoOpen: "Abrir a demo",
    demosAll: "Ver todas as {count} demos",
    offerEyebrow: "A oferta",
    offerTitle: "Envie-nos uma planilha e nós a mostraremos funcionando como sistema.",
    offerBody:
      "Escolha a planilha que faz o seu negócio girar: orçamentos, estoque, ordens, entregas, qualquer uma. Em duas semanas você a vê como um sistema funcionando, com as suas linhas dentro, e uma resposta direta sobre quanto custaria o desenvolvimento completo.",
    offerPoints: ["Sem custo, sem compromisso", "De 3 a 5 empresas por mês", "O que for construído na demo fica com você"],
    formEyebrow: "Comece aqui",
    formTitle: "Uma planilha, um formulário",
    formSub: "Conte o que essa planilha faz por você hoje. Respondemos em dois dias úteis.",
    formReassurance:
      "Seu arquivo fica guardado em privado, é lido por uma única pessoa e apagado a pedido. Nada é compartilhado nem vendido.",
    formSend: "Enviar a planilha",
    messagePlaceholder: "O que esta planilha faz pelo negócio e onde ela falha?",
    deckLine: "Baixe a apresentação de 8 slides. Sem precisar deixar e-mail.",
    grantsLabel: "Empresas de Singapura:",
    grantsLine: "verificaremos se o seu projeto se qualifica para o apoio EDGE.",
    backHome: "Voltar ao site principal",
  },

  testimonial: {
    eyebrow: "Depoimento",
    title: "Como foi trabalhar com a StarTech?",
    intro: "Uma ou duas frases sobre o projeto ajudam outras empresas a decidir se trabalham conosco. Nada é publicado até você ver e aprovar o texto final.",
    name: "Seu nome",
    role: "Seu cargo",
    company: "Empresa",
    email: "E-mail",
    quote: "Seu depoimento",
    quotePlaceholder: "Do que você precisava, como foi o projeto e o que mudou depois?",
    quoteHint: "Uma a três frases bastam.",
    credit: "Como podemos creditar você?",
    creditFull: "Nome, cargo e empresa",
    creditAnonymous: "Só cargo e setor, sem nome",
    creditPrivate: "Só feedback, não publicar",
    consent: "A StarTech pode encurtar o texto e me mostrará a versão final antes de publicá-la.",
    send: "Enviar depoimento",
    sending: "Enviando…",
    thanksTitle: "Obrigado!",
    thanksBody: "Recebemos e enviaremos o texto final para sua aprovação antes de qualquer publicação.",
    errorRequired: "Preencha este campo.",
    errorEmail: "Informe um e-mail válido.",
    errorQuoteShort: "Escreva pelo menos uma frase (20 caracteres).",
    errorConsent: "Marque esta caixa para continuar.",
    error: "Algo deu errado. Tente novamente.",
  },
  singpass: {
    eyebrow: "Migração do Singpass · FAPI 2.0",
    title: "O login com Singpass precisa migrar para FAPI 2.0 até 31 de dezembro de 2026",
    intro:
      "Se o seu site ou aplicativo tem um botão “Entrar com Singpass”, ou preenche formulários com o Myinfo, ele precisa adotar o novo padrão de segurança do Singpass antes do fim de 2026.",
    source: "O prazo, como o Singpass o publica",
    ctaCheck: "Peça-nos para verificar sua integração",
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
          "Todo token de ID agora é criptografado para a sua chave, e o NRIC passou para um campo novo. Código que lê o formato antigo deixa de funcionar.",
      },
      {
        lead: "Redirecionamentos e erros mais rígidos",
        detail:
          "Links de aplicativo com esquema próprio não são mais aceitos, apps Login precisam informar para que serve cada login e o Singpass agora devolve os erros ao seu site, que precisa tratá-los.",
      },
    ],
    migrationLink: "Guia de migração do Singpass para apps Login e Myinfo (v5)",
    whoEyebrow: "Quem é afetado",
    whoTitle: "Qualquer site ou app que use o Singpass para fazer login ou preencher dados",
    who: [
      "Sites, portais e apps móveis com “Entrar com Singpass”",
      "Formulários que preenchem os dados de uma pessoa a partir do Myinfo",
      "Integrações criadas antes de fevereiro de 2026; apps registrados desde então já precisavam usar FAPI 2.0",
      "Integrações com Myinfo v3 e v4, que o Singpass pediu para migrar ao Myinfo v5 até o fim de setembro de 2026",
    ],
    corppass: "O login com Corppass tem um prazo próprio, mais tarde: 31 de março de 2027.",
    corppassLink: "Cronograma do Corppass",
    riskEyebrow: "Se você não migrar",
    riskTitle: "Planeje-se para o login antigo parar de funcionar",
    riskBody:
      "O Singpass exige que todas as integrações usem FAPI 2.0 até 31 de dezembro de 2026, e retirou a documentação do fluxo antigo em 14 de julho de 2026. Uma integração que continue no fluxo antigo deve esperar que o login com Singpass ou o preenchimento pelo Myinfo falhem depois do prazo: pessoas que não conseguem entrar e formulários que não conseguem concluir.",
    demoEyebrow: "Demo de referência em funcionamento",
    demoTitle: "Todo o fluxo FAPI 2.0, rodando no seu navegador",
    demoIntro:
      "Executa as etapas reais do protocolo contra um servidor Singpass simulado que construímos para a demo. As chaves são criadas no seu navegador, a pessoa é de exemplo e nada é enviado ao Singpass. Todas as solicitações e respostas aparecem, com os tokens encurtados.",
    demoNotice:
      "Servidor simulado: não é o Singpass e não está conectado ao Singpass nem à GovTech. Quando a StarTech estiver registrada no Singpass Developer Portal, o mesmo código cliente roda contra o ambiente de testes do Singpass apenas com uma mudança de configuração.",
    appType: "Tipo de app",
    appLogin: "Login com Singpass",
    appMyinfo: "Myinfo (versão 5)",
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
        body: "O endereço leva apenas client_id e request_uri. No serviço real, a pessoa agora aprova o login no app do Singpass.",
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
        body: "Descriptografa com a sua chave de criptografia, confere a assinatura com as chaves públicas do servidor (JWKS) e depois iss, aud, exp e nonce.",
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
          "Implementamos PAR, PKCE, DPoP e tokens de ID criptografados no seu código, e testamos contra o ambiente de testes do Singpass com o app da sua própria organização.",
      },
      {
        lead: "Entrada em produção",
        detail:
          "Fazemos a troca em produção antes do prazo. O Singpass permite que o fluxo antigo e o novo rodem lado a lado, então a mudança pode ser feita em etapas.",
      },
    ],
    honesty:
      "Para ser claro: esta demo é a nossa implementação de referência contra um servidor simulado. Ainda não concluímos uma migração de Singpass para um cliente e não somos parceiros do Singpass nem da GovTech. O seu app do Singpass continua registrado em nome da sua organização.",
    otherWork: "Veja o que mais construímos",
    flyerLine: "O Singpass precisa migrar para FAPI 2.0 até 31 de dezembro de 2026. Veja nossa demo do novo fluxo de login funcionando.",
    stagingTitle: "Teste contra o ambiente de testes do Singpass",
    stagingBody: "Este botão executa o mesmo cliente contra o próprio serviço de testes do Singpass, com o app de testes da StarTech. Só contas de teste do Singpass conseguem entrar; contas reais não.",
    stagingButton: "Entrar com Singpass (testes)",
    stagingResult: "O ambiente de testes do Singpass devolveu este token de ID, descriptografado e verificado",
    stagingCancelled: "O login de teste foi cancelado.",
    stagingFailed: "O login de teste não foi concluído. Tente de novo mais tarde.",
  },

  stickyCta: {
    line: "Trinta minutos sobre o seu processo e clareza sobre por onde começar.",
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
      signedInAs: "Sessão iniciada como",
      backToSample: "← Voltar à amostra",
    },
  },
};
