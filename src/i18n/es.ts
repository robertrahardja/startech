import type { Messages } from "./en";

/**
 * Spanish.
 *
 * Uses "usted" throughout — a first approach to a company decision-maker takes
 * the formal register, and "tú" would read as presumptuous in a B2B context.
 * Neutral vocabulary rather than regional: "software" and "empresa" over the
 * Iberian-specific alternatives, since the audience spans Spain and Latin
 * America.
 *
 * NEEDS A NATIVE REVIEW before this locale is linked publicly.
 */
export const es: Messages = {
  nav: {
    work: "Proyectos",
    practices: "Servicios",
    solutions: "Soluciones",
    industries: "Sectores",
    approach: "Cómo trabajamos",
    contact: "Contacto",
    letsTalk: "Hablemos",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
    ask: "Consúltanos",
  },

  hero: {
    eyebrowShort: "Singapur · Trabajamos en todo el mundo",
    eyebrowFull: "Singapur · Desde 2021 · Trabajamos en todo el mundo",
    headlineLead: "Hablamos",
    headlineBusiness: "negocios",
    headlineAnd: "y",
    headlineTech: "tecnología",
    sub: "Desarrollamos el software a medida que protege su ventaja competitiva.",
    ctaPrimary: "Hablemos",
    ctaWork: "Ver proyectos",
    ctaDeck: "Descargar el dossier",
    languagesAvailable: "También disponible en:",
    readInLanguage: "Leer esta página en {language}",
    ctaAsk: "Hacer una pregunta",
    note: "Sin coste y sin necesidad de preparar documentación: basta con el proceso que más tiempo le consume. Si el software no es la respuesta, se lo diremos.",
    proof: {
      yearsFigure: "20+",
      yearsLabel: "años, ambos lados",
      testsFigure: "7.060",
      testsLabel: "pruebas automatizadas",
      jurisdictionsFigure: "2",
      jurisdictionsLabel: "jurisdicciones",
      languagesFigure: "4",
      languagesLabel: "idiomas de trabajo",
    },
    card: {
      role: "Director General",
      tagline: "Negocio. Finanzas. Tecnología.",
      country: "Singapur",
      uen: "UEN 202110461R",
      workingIn: "Idiomas",
    },
  },

  qualify: {
    eyebrow: "Lo que hacemos",
    title: "Donde mejor trabajamos.",
    sub: "La mayoría de nuestros proyectos empiezan en alguno de estos casos. Si el suyo es distinto, la conversación sigue mereciendo la pena: importa más la forma del problema que el sector en el que ocurre.",
    fits: [
      {
        headline: "Su operación funciona con hojas de cálculo y mensajes",
        body: "El inventario en un sitio, los pagos en otro, las decisiones en un hilo de chat. Funcionaba con diez personas y ahora es justo lo que le frena.",
      },
      {
        headline: "Ya lo intentó un proveedor y no funcionó",
        body: "Pagó por un sistema que su equipo no usa. Le da reparo empezar de nuevo y quiere saber qué será distinto esta vez.",
      },
      {
        headline: "Opera en varios países",
        body: "Un exportador japonés que envía a todo el mundo. Una empresa europea o estadounidense con filial en Asia. Un negocio de Singapur que contrata en Indonesia. Monedas, regímenes fiscales y calendarios de presentación distintos en un mismo sistema, y ningún proveedor que entienda ambos extremos sin que se lo expliquen.",
      },
      {
        headline: "Las cifras tienen que estar bien, no aproximadas",
        body: "Dinero, nóminas, siniestros: donde lo aproximado no sirve y equivocarse cuesta más que llegar tarde.",
      },
    ],
    pricing:
      "Sobre el precio: en la primera llamada le damos un rango y, tras la fase de descubrimiento, una cifra firme. Nunca una cantidad improvisada por correo. Y si una herramienta que ya existe resuelve su caso, le diremos cuál: sale más barato que cualquier cosa que podamos construirle.",
    pricingLead: "Sobre el precio:",
  },

  work: {
    eyebrow: "Proyectos seleccionados",
    title: "Sistemas en producción.",
    sub: "Cuatro proyectos, contados como los contaría el dueño del negocio: qué hacía la empresa antes y qué salió mal por el camino.",
    before: "Antes",
    built: "Lo que construimos",
    result: "Resultado",
    details: "Detalles",
    disclaimer:
      "Omitimos el nombre del cliente cuando el acuerdo está sujeto a confidencialidad. Las cifras proceden de los sistemas entregados y podemos detallarlas en una llamada.",
    cases: [
      {
        sector: "Comercio transfronterizo",
        market: "Japón",
        title: "Un exportador de vehículos que funcionaba con hojas de cálculo y mensajes",
        before:
          "El inventario en Airtable, los cobros conciliados a mano en Excel, las conversaciones con clientes repartidas por el chat. Un proveedor anterior había entregado un CRM que el equipo no podía usar, así que solo lo usaban para mostrar coches.",
        built:
          "Una reconstrucción completa de la operación: inventario, CRM con permisos por rol, generación de facturas proforma y comerciales, instrucciones de embarque, importación de extractos bancarios y cobros en dos niveles.",
        metric: { figure: "2", caption: "fallos con impacto económico detectados antes de publicar" },
        detail: [
          "Reimportar un extracto duplicaba los cobros: la mayoría de bancos japoneses no emiten identificador de transferencia, así que la clave para detectar duplicados quedaba vacía. Se sustituyó por una clave derivada del contenido de cada línea.",
          "La página de clientes mostraba la facturación de toda la empresa a cada comercial. Detectado en pruebas, corregido y verificado con dos comerciales sobre un mismo cliente.",
          "Cinco roles, cada uno acotado: administrador, responsable, comercial, asesor fiscal y cliente.",
        ],
      },
      {
        sector: "Sistemas de gestión",
        market: "Singapur e Indonesia",
        title: "Un motor de nóminas que un contable puede auditar línea a línea",
        before:
          "El cumplimiento de nóminas en Singapur no perdona: el redondeo en tres pasos del CPF, los tramos por edad y residencia, los topes de salario ordinario, los mínimos y máximos del SDL. La mayoría de sistemas lo aproximan y confían en que nadie lo compruebe.",
        built:
          "Un backend multiempresa en Java 21 y Spring Boot, con un motor de cumplimiento de nóminas de Singapur verificado caso por caso contra las tablas del CPF Board.",
        metric: { figure: "7.060", caption: "pruebas automatizadas en 484 clases de cálculo" },
        detail: [
          "48 escenarios de CPF documentados como una tabla de verificación imprimible —tramos de edad, tarifas de primer y segundo año de residencia, límites de redondeo, comportamiento de los topes— para que un contable los firme fila a fila.",
          "Cinco motores contables independientes recalculan cada estado: libro mayor, balance de comprobación, cuenta de resultados, balance y flujo de caja deben coincidir.",
          "51 controladores REST. Multidivisa, multiempresa, permisos por rol y registro de auditoría.",
        ],
      },
      {
        sector: "Implantación de IA",
        market: "Singapur",
        title: "Un copiloto que responde con los documentos de la propia empresa",
        before:
          "Un chatbot genérico no sirve a quien trabaja en una pyme: no conoce su puesto, ni su sector, ni lo que la organización ya ha decidido.",
        built:
          "Un copiloto en producción con cuatro modos de razonamiento, contexto organizativo por capas (sector, empresa, puesto, persona), búsqueda sobre los documentos del propio cliente y coordinación entre departamentos.",
        metric: { figure: "En producción", caption: "API en producción, cliente de pago" },
        detail: [
          "Enrutado entre varios modelos con una capa de abstracción: el modelo por defecto se cambió de proveedor por indicación del cliente sin tocar el código del producto.",
          "Transcripción de reuniones, con extracción de los acuerdos como tareas.",
          "Funciona sobre Cloudflare Workers con D1, KV, R2 y Vectorize.",
        ],
      },
      {
        sector: "Salud",
        market: "Indonesia y Sudeste Asiático",
        title: "Un historial de salud que pertenece al paciente, no al hospital",
        before:
          "Los pacientes que se mueven entre centros de Indonesia y Singapur llevan su historial en carpetas de papel y fotografías. Los sistemas de los centros no se hablan entre sí, y la normativa de datos transfronterizos hace ilegal una integración ingenua.",
        built:
          "Una plataforma de salud trilingüe, propiedad del paciente, operada desde Singapur y con los datos alojados únicamente allí. El seguimiento de hábitos, el alta de seguros y un asesor con IA ya están en marcha; el archivo transfronterizo y el portal clínico están en desarrollo.",
        metric: { figure: "3", caption: "idiomas, una sola base de código" },
        detail: [
          "Modelo de custodia por diseño: la plataforma guarda copias que pertenecen al paciente y nunca se presenta como el sistema de registro del centro.",
          "La ubicación de los datos se decidió al diseñar la arquitectura, no se añadió después de una revisión de cumplimiento.",
          "Cuadros médicos aseguradores y directorio de centros recopilados en Singapur, Malasia e Indonesia.",
        ],
      },
    ],
  },

  showcase: {
    eyebrow: "Pruébalo tú mismo",
    title: "Trece proyectos. Elige uno y ponlo a prueba.",
    sub: "Cada tarjeta de abajo es una demo que funciona de verdad, no una maqueta. Ábrela y verás un resultado de muestra al instante.",
    sampleBadge: "Muestra",
    tryIt: "Probarlo",
    seeAll: "Ver todas las soluciones",
    disclaimer:
      "Cada muestra usa datos ficticios. Para verla funcionando con tu propio proceso, envíanos una hoja de cálculo; es gratis.",
    teasers: {
      invoiceScanner: "escaneada y desglosada en segundos",
      customerChatbot: "confianza de la respuesta",
      appointmentBooking: "reservada y confirmada automáticamente",
      quotationGenerator: "presupuesto redactado, con IVA incluido",
      jobPostingWriter: "requisitos del puesto redactados",
      inventoryTracker: "artículos marcados para reponer",
      socialMediaManager: "publicaciones redactadas a la vez",
      documentTranslator: "idiomas, con un clic",
      employeeOnboarding: "tareas de incorporación programadas",
      salesAssistant: "correos de seguimiento programados",
      complianceChecker: "cláusulas de alto riesgo detectadas",
      trainingContentGenerator: "módulos de formación creados",
      financialReportBuilder: "beneficio neto trimestral, explicado",
    },
  },

  practices: {
    eyebrow: "Servicios",
    title: "Cuatro áreas, un solo equipo",
    sub: "Preferimos profundizar en cuatro áreas antes que abarcar veinte. En todas ellas el trabajo lo dirige personalmente el responsable, con especialistas según lo exija el proyecto.",
    details: "Detalles",
    items: [
      {
        title: "Implantación de IA",
        description:
          "Búsqueda sobre sus propios documentos, modelos ajustados a su dominio y automatizaciones, con las salvaguardas y la atribución de fuentes que hacen utilizable el resultado en un negocio regulado.",
        details: [
          "Generación aumentada por recuperación con búsqueda vectorial sobre sus datos",
          "Enrutado entre proveedores tras una capa de abstracción: cambiar de modelo sin tocar el producto",
          "Puntuación de confianza con atribución de fuentes, para poder comprobar las respuestas",
          "Salvaguardas contra invenciones y revisión de cumplimiento",
        ],
      },
      {
        title: "Software empresarial",
        description:
          "ERP y sistemas de negocio completos —finanzas, personal, inventario, compras y producción— construidos para resistir una auditoría, no solo para una demostración.",
        details: [
          "Libro mayor, cuentas a pagar y a cobrar, nóminas y activos fijos",
          "Multiempresa, multidivisa, permisos por rol y registro de auditoría",
          "Motor de nóminas de Singapur verificado caso por caso contra las tablas del CPF Board",
          "Integración con Xero, QuickBooks y hojas de cálculo",
        ],
      },
      {
        title: "Sistemas financieros",
        description:
          "Motores contables, IA documental, valoración y conciliación para operadores que responden ante un regulador.",
        details: [
          "Conciliación automática entre cuentas y divisas, con detección determinista de duplicados",
          "Importación de extractos bancarios, incluidos formatos sin identificador de transferencia",
          "Flujos de KYC y AML, informes para MAS y OJK",
          "DCF y análisis de comparables con simulación de Montecarlo",
        ],
      },
      {
        title: "Salud y sector público",
        description:
          "Plataformas de pacientes, historiales médicos y servicios al ciudadano para entornos de alto volumen y alta exigencia, donde las normas sobre datos van primero.",
        details: [
          "La ubicación de los datos se decide al diseñar, no se añade tras una revisión",
          "Modelo de custodia: copias del paciente, nunca el registro del centro",
          "Entrega multilingüe en inglés, chino, malayo e indonesio",
          "Infraestructura de alta disponibilidad para servicios críticos",
        ],
      },
    ],
  },

  industries: {
    eyebrow: "Sectores",
    title: "Conocimiento del sector",
    sub: "Entendemos a fondo los requisitos regulatorios, operativos y técnicos de su sector.",
    items: [
      {
        name: "Salud",
        description:
          "Gestión hospitalaria, automatización de la admisión, análisis de historiales y triaje asistido por IA.",
        details: [
          "Historia clínica electrónica conforme a HL7 y FHIR",
          "Triaje con IA que prioriza por gravedad de los síntomas",
          "Presentación y seguimiento automáticos de reclamaciones al seguro",
          "Integración de telemedicina con agenda y facturación",
        ],
      },
      {
        name: "Finanzas y banca",
        description:
          "Motores contables, procesamiento de documentación de seguros, valoración de empresas, cumplimiento fiscal y detección de fraude.",
        details: [
          "Vigilancia de transacciones en tiempo real y detección de anomalías",
          "Informes regulatorios para MAS, OJK y el régimen ante el que responda su auditor",
          "Conciliación automática entre cuentas y divisas",
          "Scoring crediticio y evaluación de riesgo con IA",
        ],
      },
      {
        name: "Educación",
        description:
          "Plataforma de formación con tutoría por IA, evaluaciones adaptativas, gestión de certificaciones y contenidos multilingües.",
        details: [
          "Itinerarios que se adaptan al rendimiento del alumno",
          "Cuestionarios generados por IA con corrección automática",
          "Distribución multilingüe con síntesis de voz",
          "Seguimiento de certificaciones y credenciales",
        ],
      },
      {
        name: "Sector público",
        description:
          "Soluciones seguras y conformes para la administración. Automatización de trámites y aplicaciones que no se pueden detener.",
        details: [
          "Portal ciudadano con verificación de identidad digital",
          "Tramitación de permisos, licencias y solicitudes",
          "Registro y reportes preparados para auditoría",
          "Infraestructura de alta disponibilidad para servicios críticos",
        ],
      },
      {
        name: "Industria",
        description:
          "Sistemas ERP, mantenimiento predictivo, optimización de la cadena de suministro y control de calidad automatizado.",
        details: [
          "Mantenimiento predictivo con sensores conectados",
          "Visibilidad y seguimiento de la cadena de suministro",
          "Control de calidad con visión artificial",
          "Planificación de la producción y de la capacidad",
        ],
      },
      {
        name: "Comercio y ecommerce",
        description:
          "Recomendaciones con IA, asistentes virtuales, atención al cliente automatizada y gestión de inventario.",
        details: [
          "Recomendaciones personalizadas con filtrado colaborativo",
          "Chatbots que atienden a cualquier hora",
          "Precios dinámicos según demanda y competencia",
          "Previsión de inventario con estacionalidad",
        ],
      },
    ],
  },

  approach: {
    eyebrow: "Cómo trabajamos",
    title: "De la estrategia a producción en 90 días",
    sub: "Un proceso depurado en proyectos empresariales. Lo implementamos nosotros; no nos limitamos a asesorar.",
    deliverable: "Entregable",
    step: "Ir al paso",
    previous: "Anterior",
    next: "Siguiente",
    items: [
      {
        week: "Semanas 1–2",
        title: "Descubrimiento y preparación para IA",
        items: [
          "Análisis de objetivos de negocio y puntos de dolor",
          "Evaluación de sistemas y datos actuales",
          "Identificación de las oportunidades de mayor impacto",
          "Definición de métricas de éxito y KPI",
        ],
        deliverable: "Informe de oportunidades de IA y proyección de retorno",
      },
      {
        week: "Semanas 3–4",
        title: "Arquitectura de la solución",
        items: [
          "Diseño de la arquitectura",
          "Selección de modelo y plataforma",
          "Plan de integración con los sistemas existentes",
          "Diseño del flujo de datos y de la seguridad",
        ],
        deliverable: "Arquitectura técnica y plan de implantación",
      },
      {
        week: "Semanas 5–8",
        title: "Prueba de concepto",
        items: [
          "Prototipo con datos reales",
          "Entrenamiento y ajuste del modelo",
          "Implementación de las funciones principales",
          "Pruebas con usuarios y recogida de comentarios",
        ],
        deliverable: "Prototipo funcional con las capacidades esenciales",
      },
      {
        week: "Semanas 9–11",
        title: "Puesta en producción",
        items: [
          "Escalado a producción",
          "Seguridad, monitorización y copias de seguridad",
          "Pruebas de carga y ajuste de rendimiento",
          "Formación del equipo y documentación",
        ],
        deliverable: "Sistema en producción listo para usarse",
      },
      {
        week: "Semana 12 en adelante",
        title: "Optimización y soporte",
        items: [
          "Monitorización y atención a los comentarios",
          "Mejora continua del modelo",
          "Nuevas funcionalidades",
          "Soporte técnico continuado",
        ],
        deliverable: "Informes de rendimiento y recomendaciones",
      },
    ],
  },

  objections: {
    eyebrow: "Respuestas directas",
    title: "Preguntas que conviene hacer primero.",
    sub: "Las que más nos hacen, respondidas con franqueza, incluidas aquellas cuya respuesta honesta es que conviene esperar.",
    items: [
      {
        said: "Ya pagamos por esto una vez y no pudimos usarlo. ¿Qué cambia ahora?",
        answer:
          "Casi siempre el desarrollo estaba bien y los requisitos mal: nadie se sentó con quienes hacen el trabajo antes de escribir código. Por eso empezamos por el descubrimiento, y ese resultado es suyo continúe con nosotros o no. Si el sistema anterior se puede aprovechar, se lo diremos: reescribir algo que en gran parte funciona es tirar el dinero.",
        proof: "La reconstrucción del sistema de exportación de vehículos empezó justo así.",
      },
      {
        said: "¿Qué pasa con el sistema si usted no está disponible?",
        answer:
          "El núcleo lo escribe el responsable y se incorporan especialistas según lo exija el trabajo. Lo que le protege no es el número de personas, sino que el sistema esté documentado, probado y desplegado en infraestructura suya: su cuenta, su base de datos, su repositorio. Otro ingeniero puede retomarlo porque las pruebas describen lo que debe hacer.",
        proof: "7.060 pruebas automatizadas en 484 clases de cálculo.",
      },
      {
        said: "¿Cuánto suele costar algo así?",
        answer:
          "En la primera llamada le damos un rango y, tras el descubrimiento, una cifra firme. Le decimos el número real antes, no después. Si no encaja en el presupuesto, recortamos alcance juntos: un sistema pequeño que se pone en marcha vale más que uno grande que se queda parado. Los proyectos de pymes de Singapur pueden optar a la ayuda EDGE, que sustituyó a PSG; comprobamos si el suyo encaja y preparamos sin coste la documentación del proveedor.",
        proof: "La elegibilidad se comprueba con los criterios vigentes de IMDA, no se presupone.",
      },
      {
        said: "¿Perdemos algo por esperar un trimestre o dos?",
        answer:
          "A veces nada, y así se lo diremos. Preferimos que llame cuando el problema apriete a que se comprometa mientras no lo haga. Dicho esto, el coste de esperar no suele estar en el software, sino en la conciliación manual y los errores de por medio. Si quiere, lo cuantificamos en la llamada y decide con una cifra delante.",
      },
      {
        said: "¿Cuánto tendremos que explicar sobre cómo funciona nuestro negocio?",
        answer:
          "Esa es exactamente la razón de ser de esta firma. No tendrá que explicar qué es un balance de comprobación, cuánto se debe de CPF ni por qué un siniestro cuadra como cuadra. Cuéntenoslo como se lo contaría a su contable.",
        proof:
          "El motor de nóminas está verificado caso por caso contra las tablas del CPF Board.",
      },
    ],
  },

  capabilityDeck: {
    eyebrow: "Llévesela consigo",
    title: "Toda la propuesta, en un solo documento.",
    sub: "Cada servicio, cada caso, cada cifra de esta página.",
    cta: "Descargar el dossier de capacidades",
  },

  contact: {
    eyebrow: "Contacto",
    title: "Treinta minutos y una respuesta honesta",
    sub: "Cuéntenos qué le está costando ese proceso hoy y le diremos qué merece la pena construir.",
    email: "Correo",
    phone: "Teléfono",
    reassurance:
      "Sin compromiso. El resultado de la fase de descubrimiento es suyo, continúe con nosotros o no.",
    name: "Nombre",
    company: "Empresa",
    message: "Mensaje",
    messagePlaceholder: "Cuéntenos sobre su proyecto...",
    send: "Enviar mensaje",
    sending: "Enviando...",
    success: "Gracias por su mensaje. Le responderemos en breve.",
    error:
      "Algo ha fallado. Vuelva a intentarlo o escríbanos directamente por correo.",
    country: "País",
    staff: "Plantilla",
    staffPick: "Cuántas personas",
    staffOptions: ["Menos de 10", "De 10 a 50", "De 51 a 200", "Más de 200"],
    spreadsheet: "Su hoja de cálculo (opcional)",
    spreadsheetHint:
      "Excel, CSV o Numbers, hasta 10 MB. Quite lo confidencial; con una muestra de filas basta.",
    fileTooLarge: "Ese archivo supera los 10 MB. Envíe un extracto más pequeño.",
  },

  // El folleto digital en /flyer. Solo afirma lo que afirma la presentación
  // de capacidades; véase docs/COMPANY.md.
  flyer: {
    eyebrow: "Singapur · Japón · Trabajamos en todo el mundo",
    headline: "De la hoja de cálculo al sistema.",
    who: "Para empresas de 10 a 200 personas que funcionan con hojas de cálculo, o con un sistema que un proveedor nunca terminó. Construimos el software sobre el que realmente opera su negocio, y usted es dueño de cada parte.",
    ctaOffer: "Envíenos una hoja de cálculo",
    ctaDeck: "Descargar la presentación",
    proofEyebrow: "Tres cosas que son ciertas",
    proof: [
      {
        lead: "En producción en Japón",
        detail:
          "Un exportador de vehículos usados opera con un sistema que construimos: inventario, CRM, facturas, documentos de embarque y cobros. En producción, con el cliente, hoy.",
      },
      {
        lead: "7,060 pruebas",
        detail:
          "Pruebas automatizadas sobre 484 calculadoras de nuestro ERP, de la ejecución de agosto de 2026. Un desarrollo interno, aún no desplegado, en el que cada cifra se verifica antes de entregarse.",
      },
      {
        lead: "Es suyo",
        detail:
          "El fundador escribe el código. La cuenta en la nube, la base de datos y el repositorio están a su nombre desde la primera semana, así que ningún proveedor puede retener su negocio.",
      },
    ],
    demosEyebrow: "Pruebe antes de comprometerse",
    demosTitle: "Demos que funcionan, no diapositivas",
    demosSub: "{count} sistemas pequeños que puede ejecutar en el navegador con datos de ejemplo. Estos tres son los más universales.",
    demoOpen: "Abrir la demo",
    demosAll: "Ver las {count} demos",
    offerEyebrow: "La oferta",
    offerTitle: "Envíenos una hoja de cálculo y se la mostraremos funcionando como sistema.",
    offerBody:
      "Elija la hoja con la que funciona su negocio: presupuestos, existencias, trabajos, entregas, lo que sea. En dos semanas la verá como un sistema en marcha, con sus filas dentro, y una respuesta clara sobre lo que costaría el desarrollo completo.",
    offerPoints: ["Sin coste ni compromiso", "De 3 a 5 empresas al mes", "Lo construido en la demo se lo queda usted"],
    formEyebrow: "Empiece aquí",
    formTitle: "Una hoja, un formulario",
    formSub: "Cuéntenos qué hace esa hoja por usted hoy. Respondemos en dos días laborables.",
    formReassurance:
      "Su archivo se guarda en privado, lo lee una sola persona y se borra a petición. No se comparte ni se vende nada.",
    formSend: "Enviar la hoja de cálculo",
    messagePlaceholder: "¿Qué hace esta hoja por el negocio y dónde falla?",
    deckLine: "Descargue la presentación de 8 diapositivas. Sin dejar su correo.",
    grantsLabel: "Empresas de Singapur:",
    grantsLine: "comprobaremos si su proyecto puede optar a la ayuda EDGE.",
    backHome: "Volver al sitio principal",
  },

  testimonial: {
    eyebrow: "Testimonio",
    title: "¿Qué tal fue trabajar con StarTech?",
    intro: "Una o dos frases sobre el proyecto ayudan a otras empresas a decidir si trabajar con nosotros. No publicamos nada hasta que haya visto y aprobado el texto final.",
    name: "Su nombre",
    role: "Su cargo",
    company: "Empresa",
    email: "Correo electrónico",
    quote: "Su testimonio",
    quotePlaceholder: "¿Qué necesitaba, cómo fue el proyecto y qué cambió después?",
    quoteHint: "Con una a tres frases es suficiente.",
    credit: "¿Cómo podemos citarle?",
    creditFull: "Nombre, cargo y empresa",
    creditAnonymous: "Solo cargo y sector, sin nombre",
    creditPrivate: "Solo comentarios, no publicar",
    consent: "StarTech puede acortarlo por extensión y me mostrará el texto final antes de publicarlo.",
    send: "Enviar testimonio",
    sending: "Enviando…",
    thanksTitle: "¡Gracias!",
    thanksBody: "Lo hemos recibido y le enviaremos el texto final para su aprobación antes de publicar nada.",
    errorRequired: "Complete este campo.",
    errorEmail: "Introduzca un correo electrónico válido.",
    errorQuoteShort: "Escriba al menos una frase (20 caracteres).",
    errorConsent: "Marque esta casilla para continuar.",
    error: "Algo salió mal. Inténtelo de nuevo.",
  },
  singpass: {
    eyebrow: "Migración de Singpass · FAPI 2.0",
    title: "El inicio de sesión con Singpass debe pasar a FAPI 2.0 antes del 31 de diciembre de 2026",
    intro:
      "Si su sitio web o su aplicación tiene un botón «Iniciar sesión con Singpass», o rellena formularios con Myinfo, tiene que adoptar el nuevo estándar de seguridad de Singpass antes de que termine 2026.",
    source: "La fecha límite, tal como la publica Singpass",
    ctaCheck: "Pídanos que revisemos su integración",
    ctaDemo: "Ejecutar la demo",
    changesEyebrow: "Qué cambia",
    changesTitle: "Cinco cambios en cómo funciona el inicio de sesión",
    changes: [
      {
        lead: "La solicitud se envía por adelantado",
        detail:
          "Su servidor envía primero la solicitud de inicio de sesión a Singpass (PAR), y el navegador del usuario solo lleva una referencia corta. Nada de la barra de direcciones se puede alterar.",
      },
      {
        lead: "Una prueba de un solo uso por inicio de sesión",
        detail:
          "Su servidor demuestra que fue él quien inició el proceso (PKCE), así que un código interceptado no le sirve a nadie más.",
      },
      {
        lead: "Tokens ligados a su clave",
        detail:
          "Cada código y cada token solo funcionan junto con una clave que guarda su servidor (DPoP). Un token filtrado no se puede reutilizar.",
      },
      {
        lead: "La identidad va cifrada",
        detail:
          "Cada token de ID se cifra ahora con su clave, y el NRIC pasó a un campo nuevo. El código que lee el formato antiguo deja de funcionar.",
      },
      {
        lead: "Redirecciones y errores más estrictos",
        detail:
          "Ya no se aceptan enlaces de aplicación con esquema propio, las apps Login deben indicar para qué es cada inicio de sesión y Singpass ahora devuelve los errores a su sitio, que tiene que gestionarlos.",
      },
    ],
    migrationLink: "Guía de migración de Singpass para apps Login y Myinfo (v5)",
    whoEyebrow: "A quién afecta",
    whoTitle: "A cualquier sitio o app que use Singpass para iniciar sesión o rellenar datos",
    who: [
      "Sitios web, portales y apps móviles con «Iniciar sesión con Singpass»",
      "Formularios que rellenan los datos de una persona desde Myinfo",
      "Integraciones creadas antes de febrero de 2026; las apps registradas desde entonces ya tenían que usar FAPI 2.0",
      "Integraciones con Myinfo v3 y v4, a las que Singpass pidió pasar a Myinfo v5 antes de finales de septiembre de 2026",
    ],
    corppass: "El inicio de sesión con Corppass tiene su propia fecha, posterior: el 31 de marzo de 2027.",
    corppassLink: "Calendario de Corppass",
    riskEyebrow: "Si no migra",
    riskTitle: "Cuente con que el inicio de sesión antiguo dejará de funcionar",
    riskBody:
      "Singpass exige que todas las integraciones usen FAPI 2.0 antes del 31 de diciembre de 2026, y retiró la documentación del flujo antiguo el 14 de julio de 2026. Una integración que siga con el flujo antiguo debe esperar que el inicio de sesión con Singpass o el relleno con Myinfo fallen después de esa fecha: personas que no pueden entrar y formularios que no pueden completar.",
    demoEyebrow: "Demo de referencia funcional",
    demoTitle: "Todo el flujo FAPI 2.0, ejecutándose en su navegador",
    demoIntro:
      "Ejecuta los pasos reales del protocolo contra un servidor Singpass simulado que construimos para la demo. Las claves se crean en su navegador, la persona es de muestra y no se envía nada a Singpass. Se muestran todas las solicitudes y respuestas, con los tokens acortados.",
    demoNotice:
      "Servidor simulado: no es Singpass y no está conectado a Singpass ni a GovTech. Cuando StarTech se registre en el Singpass Developer Portal, el mismo código cliente funcionará contra el entorno de pruebas de Singpass con solo cambiar la configuración.",
    appType: "Tipo de app",
    appLogin: "Inicio de sesión Singpass",
    appMyinfo: "Myinfo (versión 5)",
    run: "Ejecutar el flujo",
    runAgain: "Ejecutarlo otra vez",
    running: "Ejecutando el flujo…",
    allPassed:
      "Todos los pasos se superaron. Los datos de abajo llegaron cifrados y firmados, mediante un código y unos tokens ligados a la clave de este navegador.",
    failed: "Un paso falló. Su solicitud y su respuesta están abajo.",
    cancelled:
      "Inicio de sesión cancelado. Singpass devuelve un error a su sitio, y su sitio muestra su propio mensaje, nunca el texto de error de Singpass.",
    details: "Solicitud y respuesta",
    status: {
      pending: "Sin empezar",
      running: "En curso",
      waiting: "Esperando su decisión",
      done: "Superado",
      error: "Fallido",
    },
    steps: {
      register: {
        title: "Registrar la app",
        body: "Su navegador crea una clave de firma y una de cifrado, y registra las mitades públicas en el servidor simulado, como se haría en el Singpass Developer Portal.",
      },
      discovery: {
        title: "Leer la configuración del servidor",
        body: "Los endpoints y los algoritmos salen de la configuración OpenID, no de direcciones fijas en el código.",
      },
      session: {
        title: "Crear los secretos de este inicio de sesión",
        body: "Un state, un nonce, un verificador PKCE (S256) y una clave DPoP nuevos, usados para este único inicio de sesión y luego descartados.",
      },
      par: {
        title: "Enviar la solicitud por adelantado (PAR)",
        body: "La solicitud va primero al servidor, con una aserción de cliente firmada (private_key_jwt) y una prueba DPoP. El servidor responde con un request_uri de vida corta.",
      },
      authorize: {
        title: "Enviar a la persona a Singpass",
        body: "La dirección solo lleva client_id y request_uri. En el servicio real, la persona aprueba ahora el inicio de sesión en la app de Singpass.",
      },
      redirect: {
        title: "Gestionar la vuelta",
        body: "Comprobar state e iss antes de fiarse del código.",
      },
      token: {
        title: "Cambiar el código por tokens",
        body: "Envía el código, el verificador PKCE, una nueva aserción de cliente y una nueva prueba DPoP. Los tokens vuelven ligados a la clave DPoP.",
      },
      idToken: {
        title: "Descifrar y verificar el token de ID",
        body: "Se descifra con su clave de cifrado, se comprueba la firma con las claves públicas del servidor (JWKS) y luego iss, aud, exp y nonce.",
      },
      userinfo: {
        title: "Obtener los datos de Myinfo",
        body: "Authorization: DPoP, con una prueba ligada al token de acceso (ath). La respuesta también va cifrada y firmada, dentro de person_info.",
      },
      replay: {
        title: "Probar un código robado",
        body: "Alguien que copió el código y el verificador PKCE los prueba desde otro dispositivo, con su propia clave. El servidor debe rechazarlo.",
        refused: "Rechazado, como debe ser: el código solo funciona con la clave que lo pidió.",
        accepted: "El servidor aceptó un código robado. Eso es un error.",
      },
    },
    loginTitle: "Inicio de sesión Singpass simulado",
    loginBody:
      "En Singpass, la persona escanearía ahora un código QR con la app de Singpass. Aquí decide usted por la persona de muestra.",
    loginRequested: "Datos solicitados",
    loginPurpose: "Finalidad",
    approve: "Entrar como la persona de muestra",
    cancel: "Cancelar el inicio de sesión",
    sample: "Persona de muestra, no real",
    resultTitle: "Lo que recibe su sitio",
    errorGeneric: "Algo salió mal. Vuelva a ejecutar el flujo dentro de un minuto.",
    offerEyebrow: "Lo que ofrecemos",
    offerTitle: "Revisamos y actualizamos su integración con Singpass",
    offerSteps: [
      {
        lead: "Revisión",
        detail:
          "Leemos su código actual de Singpass o Myinfo y le decimos por escrito qué tiene que cambiar y cuánto llevará.",
      },
      {
        lead: "Actualización",
        detail:
          "Incorporamos PAR, PKCE, DPoP y tokens de ID cifrados en su código, y probamos contra el entorno de pruebas de Singpass con la app de su propia organización.",
      },
      {
        lead: "Puesta en marcha",
        detail:
          "Cambiamos producción antes de la fecha límite. Singpass permite que el flujo antiguo y el nuevo funcionen en paralelo, así que el cambio puede hacerse por etapas.",
      },
    ],
    honesty:
      "Con claridad: esta demo es nuestra implementación de referencia contra un servidor simulado. Todavía no hemos completado una migración de Singpass para un cliente y no somos socios de Singpass ni de GovTech. Su app de Singpass sigue registrada a nombre de su organización.",
    otherWork: "Vea qué más construimos",
    flyerLine: "Singpass debe pasar a FAPI 2.0 antes del 31 de diciembre de 2026. Vea nuestra demo funcional del nuevo inicio de sesión.",
    stagingTitle: "Pruébelo contra el entorno de pruebas de Singpass",
    stagingBody: "Este botón ejecuta el mismo cliente contra el propio servicio de pruebas de Singpass, con la app de pruebas de StarTech. Solo pueden entrar las cuentas de prueba de Singpass; las cuentas reales no.",
    stagingButton: "Iniciar sesión con Singpass (pruebas)",
    stagingResult: "El entorno de pruebas de Singpass devolvió este token de ID, descifrado y verificado",
    stagingCancelled: "El inicio de sesión de prueba se canceló.",
    stagingFailed: "El inicio de sesión de prueba no se completó. Inténtelo de nuevo más tarde.",
  },

  stickyCta: {
    line: "Treinta minutos sobre su proceso y una idea clara de por dónde empezar.",
    action: "Hablemos",
  },

  footer: {
    location: "Singapur",
    rights: "StarTech Innovation Pte. Ltd.",
  },

  demos: {
    signIn: {
      title: "Personalizar {title}",
      subtitle: "Inicia sesión con Google para generar resultados personalizados con tus propios datos.",
      notConfigured: "El inicio de sesión aún no está disponible — vuelve pronto.",
      signedInAs: "Sesión iniciada como",
      backToSample: "← Volver a la muestra",
    },
  },
};
