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
          "Na primeira conversa damos uma faixa e, depois do levantamento, um número firme. Dizemos o valor real antes, não depois. Se não couber no orçamento, cortamos escopo junto com você: um sistema menor que entra no ar vale mais que um grande que empaca. Pequenas empresas de Singapura podem abater até metade pelo PSG, e preparamos essa documentação sem custo.",
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

  contact: {
    eyebrow: "Contato",
    title: "Trinta minutos e uma resposta honesta",
    sub: "Conte quanto esse processo custa hoje e voltamos dizendo o que vale a pena construir.",
    email: "E-mail",
    phone: "Telefone",
    reassurance:
      "Sem compromisso. O resultado do levantamento é seu, continuando conosco ou não.",
    name: "Nome",
    message: "Mensagem",
    messagePlaceholder: "Conte sobre o seu projeto...",
    send: "Enviar mensagem",
    sending: "Enviando...",
    success: "Obrigado pela mensagem. Retornaremos em breve.",
    error:
      "Algo deu errado. Tente novamente ou escreva diretamente para o nosso e-mail.",
  },

  stickyCta: {
    line: "Trinta minutos sobre o seu processo e clareza sobre por onde começar.",
    action: "Vamos conversar",
  },

  footer: {
    location: "Singapura",
    rights: "StarTech Innovation Pte. Ltd.",
  },
};
