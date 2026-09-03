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
          "En la primera llamada le damos un rango y, tras el descubrimiento, una cifra firme. Le decimos el número real antes, no después. Si no encaja en el presupuesto, recortamos alcance juntos: un sistema pequeño que se pone en marcha vale más que uno grande que se queda parado. Las pymes de Singapur pueden cubrir hasta la mitad con la ayuda PSG, y preparamos ese trámite sin coste.",
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

  contact: {
    eyebrow: "Contacto",
    title: "Treinta minutos y una respuesta honesta",
    sub: "Cuéntenos qué le está costando ese proceso hoy y le diremos qué merece la pena construir.",
    email: "Correo",
    phone: "Teléfono",
    reassurance:
      "Sin compromiso. El resultado de la fase de descubrimiento es suyo, continúe con nosotros o no.",
    name: "Nombre",
    message: "Mensaje",
    messagePlaceholder: "Cuéntenos sobre su proyecto...",
    send: "Enviar mensaje",
    sending: "Enviando...",
    success: "Gracias por su mensaje. Le responderemos en breve.",
    error:
      "Algo ha fallado. Vuelva a intentarlo o escríbanos directamente por correo.",
  },

  stickyCta: {
    line: "Treinta minutos sobre su proceso y una idea clara de por dónde empezar.",
    action: "Hablemos",
  },

  footer: {
    location: "Singapur",
    rights: "StarTech Innovation Pte. Ltd.",
  },
};
