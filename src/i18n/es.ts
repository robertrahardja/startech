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
 * Reviewed for fluency and claims on 9 Nov 2026 (AI review); a native speaker's pass is still welcome.
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
    ask: "Consúltenos",
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
    ctaDeck: "Descargar la presentación",
    languagesAvailable: "También disponible en:",
    readInLanguage: "Leer esta página en {language}",
    ctaAsk: "Hacer una pregunta",
    note: "Es gratuito y no necesita preparar ningún documento: traiga el proceso que más tiempo le quita. Si el software no es la solución, se lo diremos.",
    proof: {
      yearsFigure: "20+",
      yearsLabel: "años en ambos mundos",
      testsFigure: "7.060",
      testsLabel: "pruebas automatizadas en nuestro ERP interno, no implantado",
      jurisdictionsFigure: "2",
      jurisdictionsLabel: "jurisdicciones",
      languagesFigure: "7",
      languagesLabel: "idiomas en este sitio",
    },
    card: {
      role: "Director general",
      tagline: "Negocio. Finanzas. Tecnología.",
      country: "Singapur",
      uen: "UEN 202110461R",
      workingIn: "Idiomas",
    },
  },

  qualify: {
    eyebrow: "Qué proyectos asumimos",
    title: "Donde mejor trabajamos.",
    sub: "La mayoría de nuestros proyectos parten de alguno de estos casos. Si el suyo es distinto, igualmente vale la pena hablar: importa más el tipo de problema que el sector en el que se presenta.",
    fits: [
      {
        headline: "Su empresa funciona con hojas de cálculo y mensajes",
        body: "El inventario en un lugar, los pagos en otro, las decisiones en un chat. Funcionaba cuando eran diez personas y hoy es justo lo que frena a la empresa.",
      },
      {
        headline: "Ya lo intentó un proveedor y no funcionó",
        body: "Pagó por un sistema que su equipo no quiere usar. Tiene reservas para empezar de nuevo y quiere saber qué será distinto esta vez.",
      },
      {
        headline: "Opera en varios países",
        body: "Un exportador japonés que vende a todo el mundo. Una empresa europea o estadounidense con filial en Asia. Una empresa de Singapur que contrata en Indonesia. Distintas monedas, regímenes fiscales y calendarios de declaraciones en un mismo sistema, y ningún proveedor que entienda las dos partes sin que haya que explicárselo.",
      },
      {
        headline: "Las cifras tienen que ser exactas, no aproximadas",
        body: "Facturas, pagos, inventario: donde una aproximación no basta y equivocarse cuesta más que llegar tarde.",
      },
    ],
    regions: [
      "¿Tiene operaciones en Johor o en la JS-SEZ? Desarrollamos sistemas que funcionan a ambos lados de una frontera, como el sistema de exportación que ya usa nuestro cliente en Japón.",
      "También damos soporte a equipos en Filipinas y Vietnam dirigidos desde Singapur.",
    ],
    japanSite: null,
    pricing:
      "Sobre el precio: en la primera llamada le damos un rango y, tras el diagnóstico, una cifra en firme, nunca un número inventado a partir de un correo. Y si una herramienta estándar ya resuelve el problema, le diremos cuál: le saldrá más barata que cualquier cosa que podamos desarrollarle.",
    pricingLead: "Sobre el precio:",
  },

  work: {
    eyebrow: "Proyectos seleccionados",
    title: "Dos sistemas para clientes y un desarrollo interno.",
    sub: "Contados como los contaría el dueño del negocio: qué hacía realmente la empresa antes y qué salió mal por el camino. El tercero es un desarrollo interno, probado pero no implantado.",
    before: "Antes",
    built: "Lo que desarrollamos",
    result: "Resultado",
    details: "Detalles",
    demosLine:
      "¿Prefiere ver algo funcionando en lugar de leer sobre ello? {count} demos funcionales se ejecutan en su navegador con datos de ejemplo.",
    demosLink: "Probar las demos",
    disclaimer:
      "Omitimos el nombre del cliente cuando el proyecto está sujeto a confidencialidad. Las cifras proceden de los propios sistemas y podemos revisarlas en detalle en una llamada.",
    cases: [
      {
        sector: "Comercio internacional",
        market: "Japón",
        title: "Un exportador de vehículos que funcionaba con hojas de cálculo y WhatsApp",
        before:
          "El inventario en Airtable, los pagos conciliados a mano en Excel y las conversaciones con clientes dispersas en WhatsApp. Un proveedor externo en el extranjero les había entregado un CRM que el equipo no lograba usar, así que solo les servía para mostrar los vehículos.",
        built:
          "Una reconstrucción completa de la operación: inventario, CRM con permisos por rol, generación de facturas proforma y comerciales, instrucciones de embarque, importación de extractos bancarios y asignación de pagos en dos niveles.",
        metric: { figure: "2", caption: "errores que hacían perder dinero, detectados antes del lanzamiento" },
        detail: [
          "Al volver a importar un extracto bancario, los cobros se duplicaban sin ningún aviso: la mayoría de los bancos japoneses no emite un identificador de transferencia, así que la clave para detectar duplicados nunca se rellenaba. Se sustituyó por una clave determinista derivada del contenido.",
          "La ficha de cliente mostraba a cada vendedor los ingresos totales de toda la empresa. Se detectó en pruebas, se corrigió y se verificó con dos vendedores sobre un mismo cliente.",
          "Cinco roles, cada uno con sus propios permisos: administrador, gerente, vendedor, contador fiscal y cliente.",
        ],
      },
      {
        sector: "Implantación de IA",
        market: "Singapur",
        title: "Un copiloto de IA que responde a partir de los documentos de la propia empresa",
        before:
          "Un chatbot genérico no le sirve de nada a un profesional de una pyme: no sabe nada de su puesto, de su sector ni de lo que su organización ya ha decidido.",
        built:
          "Un copiloto con cuatro modos de razonamiento, contexto organizativo por capas (sector, organización, puesto, persona), búsqueda en los documentos que sube el propio cliente y coordinación directa entre departamentos.",
        metric: { figure: "2026", caption: "entregado al cliente; el proyecto concluyó ese año" },
        detail: [
          "Enrutamiento entre varios modelos mediante una capa de abstracción: a petición del cliente, el modelo predeterminado se cambió de un proveedor a otro sin tocar el código del producto.",
          "Transcripción de voz a texto de las reuniones, con los puntos de acción convertidos en tareas.",
          "Construido sobre Cloudflare Workers con D1, KV, R2 y Vectorize.",
        ],
      },
      {
        sector: "Desarrollo interno",
        market: "Probado, no implantado",
        title: "Un ERP que desarrollamos internamente para demostrar cómo probamos",
        before:
          "El software que calcula importes luce fácilmente en una demo, pero cuesta confiar en él: casi siempre se verifica con pruebas puntuales, si es que se verifica. Queríamos un desarrollo propio de gran envergadura que demostrara cómo hacemos las pruebas antes de que un cliente dependa de nuestro código.",
        built:
          "Un backend de ERP multiempresa en Java 21 y Spring Boot. Es un desarrollo interno: probado, pero no implantado en ningún cliente.",
        metric: { figure: "7.060", caption: "pruebas automatizadas en 484 clases de cálculo" },
        detail: [
          "Las cifras de pruebas corresponden a la ejecución de agosto de 2026 y cubren las 484 clases de cálculo del desarrollo.",
          "115 controladores REST. Multidivisa, multiempresa, permisos por rol y registro de auditoría.",
          "Lo mostramos como evidencia de cómo desarrollamos y probamos sistemas complejos. No es un sistema implantado en ningún cliente y no afirmamos nada sobre la exactitud de sus cálculos.",
        ],
      },
    ],
  },

  showcase: {
    eyebrow: "Pruébelo usted mismo",
    title: "Trece desarrollos. Elija uno y véalo funcionar.",
    sub: "Cada tarjeta es una demo que funciona de verdad, no una maqueta. Abra una y verá al instante un resultado de ejemplo.",
    sampleBadge: "Ejemplo",
    tryIt: "Probar",
    seeAll: "Ver todas las soluciones",
    disclaimer:
      "Cada ejemplo usa datos ficticios. Para ver uno funcionando con su propio proceso, envíenos una hoja de cálculo. Es gratis.",
    teasers: {
      invoiceScanner: "escaneada y desglosada en segundos",
      customerChatbot: "de confianza en la respuesta",
      appointmentBooking: "reservada y confirmada automáticamente",
      quotationGenerator: "presupuesto redactado, GST incluido",
      jobPostingWriter: "requisitos del puesto redactados",
      inventoryTracker: "artículos marcados para reponer",
      socialMediaManager: "publicaciones para redes, redactadas de una vez",
      documentTranslator: "idiomas, con un clic",
      employeeOnboarding: "tareas de incorporación programadas",
      salesAssistant: "correos de seguimiento en secuencia",
      complianceChecker: "cláusulas de alto riesgo detectadas",
      trainingContentGenerator: "módulos de formación creados",
      financialReportBuilder: "beneficio neto trimestral, explicado",
    },
  },

  practices: {
    eyebrow: "Servicios",
    title: "Cuatro áreas, un solo equipo",
    sub: "Preferimos profundizar en cuatro áreas antes que abarcar veinte. Cada una la dirige personalmente nuestro director general, y sumamos especialistas según lo requiera el trabajo.",
    details: "Detalles",
    items: [
      {
        title: "Implantación de IA",
        description:
          "Búsqueda en sus propios documentos, modelos ajustados a su sector y flujos de automatización, con las salvaguardas y la cita de fuentes que hacen que el resultado sea utilizable en un sector regulado.",
        details: [
          "Generación aumentada por recuperación (RAG) con búsqueda vectorial sobre sus datos propios",
          "Enrutamiento entre proveedores mediante una capa de abstracción: cambie de modelo sin tocar el código del producto",
          "Puntuación de confianza con cita de fuentes, para poder comprobar las respuestas",
          "Salvaguardas contra alucinaciones y revisión de cumplimiento normativo",
        ],
      },
      {
        title: "Sistemas de gestión",
        description:
          "Plataformas de operaciones, CRM, inventario, documentos y flujos de trabajo que sustituyen las hojas de cálculo y las herramientas desconectadas, pensados para superar una auditoría, no solo para lucirse en una demo.",
        details: [
          "Inventario, ventas, documentos y pagos en un solo sistema, en lugar de hojas de cálculo y chats",
          "Multiempresa, multidivisa, permisos por rol y registros listos para auditoría",
          "Se parte de las hojas de cálculo que ya usa, con importación y exportación a Excel y Google Sheets",
          "Implantado en su propia cuenta en la nube, su base de datos y su repositorio",
        ],
      },
      {
        title: "Procesos financieros",
        description:
          "Facturación, importación de extractos bancarios, conciliación y generación de documentos, con una pista de auditoría que su contador puede seguir.",
        details: [
          "Conciliación automática entre cuentas y divisas, con detección determinista de duplicados",
          "Importación de extractos bancarios, incluidos los formatos sin identificador de transferencia",
          "Facturas proforma, facturas comerciales y documentos de embarque generados a partir de los mismos registros",
          "Facturas electrónicas InvoiceNow desde el sistema o la hoja de cálculo con la que factura, a través de un punto de acceso acreditado",
        ],
      },
      {
        title: "Operaciones transfronterizas",
        description:
          "Sistemas multidivisa y multilingües para empresas que comercian entre Singapur, Japón y el resto de la región, en los que las normas de cada país son lo primero.",
        details: [
          "La residencia de los datos se decide al diseñar la arquitectura, no se parchea después de una revisión",
          "Varias divisas, regímenes fiscales y formatos de documento en un solo sistema",
          "Pantallas y documentos en inglés, japonés, chino, malayo o indonesio",
          "En funcionamiento hoy en un exportador de Japón: inventario, ventas, documentos y pagos",
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
        name: "Comercio y logística",
        description:
          "Inventario, ventas, documentos de embarque y pagos para empresas de comercio, distribución mayorista y logística a las que las hojas de cálculo ya se les quedaron pequeñas.",
        details: [
          "Inventario y ventas en un solo lugar, con una vista propia para cada rol",
          "Facturas proforma, facturas comerciales e instrucciones de embarque generadas a partir del mismo registro",
          "Importación de extractos bancarios y conciliación entre divisas",
          "Seguimiento de envíos y portales para compradores en el extranjero",
        ],
      },
      {
        name: "Finanzas y banca",
        description:
          "Procesamiento de documentos, conciliación, documentación de seguros y control de riesgos para equipos financieros y las empresas que les prestan servicio.",
        details: [
          "Monitoreo de transacciones en tiempo real y detección de anomalías",
          "Extractos, pólizas y siniestros leídos con IA documental, con la fuente de cada cifra a la vista",
          "Conciliación automática entre cuentas y divisas",
          "Puntuación crediticia y evaluación de riesgos con IA",
        ],
      },
      {
        name: "Educación",
        description:
          "Plataformas de aprendizaje (LMS) con tutoría por IA, evaluaciones adaptativas, gestión de certificaciones y cursos en varios idiomas.",
        details: [
          "Rutas de aprendizaje que se adaptan al desempeño del alumno",
          "Cuestionarios generados por IA con corrección automática",
          "Contenidos en varios idiomas con síntesis de voz",
          "Seguimiento de certificaciones y credenciales",
        ],
      },
      {
        name: "Sector público",
        description:
          "Soluciones seguras y conformes a la normativa para el sector público. Automatización de servicios al ciudadano y aplicaciones críticas.",
        details: [
          "Portal ciudadano con verificación de identidad digital",
          "Tramitación de permisos, licencias y solicitudes",
          "Registros e informes de cumplimiento listos para auditoría",
          "Infraestructura de alta disponibilidad para servicios críticos",
        ],
      },
      {
        name: "Industria",
        description:
          "Sistemas ERP, mantenimiento predictivo, optimización de la cadena de suministro y control de calidad automatizado.",
        details: [
          "Integración de sensores IoT para mantenimiento predictivo",
          "Visibilidad de la cadena de suministro con seguimiento en tiempo real",
          "Control de calidad con inspección por visión artificial",
          "Planificación de la producción y de la capacidad",
        ],
      },
      {
        name: "Comercio electrónico",
        description:
          "Recomendaciones con IA, asistentes virtuales, atención al cliente automatizada y gestión de inventario.",
        details: [
          "Recomendaciones personalizadas con filtrado colaborativo",
          "Chatbots de IA para atención al cliente 24/7",
          "Precios dinámicos según la demanda y la competencia",
          "Previsión de inventario con detección de tendencias estacionales",
        ],
      },
    ],
  },

  approach: {
    eyebrow: "Metodología",
    title: "Del diagnóstico a la producción en unas doce semanas",
    sub: "Los mismos cinco pasos en cada proyecto, con el alcance y el costo por escrito antes de escribir una sola línea de código. Implementamos, no solo asesoramos.",
    deliverable: "Entregable",
    step: "Ir al paso",
    previous: "Anterior",
    next: "Siguiente",
    items: [
      {
        week: "Semanas 1–2",
        title: "Diagnóstico y preparación para la IA",
        items: [
          "Análisis de los objetivos de negocio y de los principales problemas",
          "Evaluación de los sistemas y datos actuales",
          "Identificación de las oportunidades de IA de mayor impacto",
          "Definición de métricas de éxito y KPI",
        ],
        deliverable: "Informe de oportunidades de IA y proyección del retorno de la inversión",
      },
      {
        week: "Semanas 3–4",
        title: "Arquitectura de la solución",
        items: [
          "Diseño de la arquitectura de la solución de IA",
          "Selección de modelo y plataforma",
          "Plan de integración con los sistemas existentes",
          "Flujo de datos y protocolos de seguridad",
        ],
        deliverable: "Arquitectura técnica y plan de implantación",
      },
      {
        week: "Semanas 5–8",
        title: "Prueba de concepto",
        items: [
          "Prototipo funcional con datos reales",
          "Entrenamiento y ajuste del modelo",
          "Implementación de las funciones principales",
          "Pruebas con usuarios y recogida de comentarios",
        ],
        deliverable: "Prueba de concepto funcional con las capacidades principales",
      },
      {
        week: "Semanas 9–11",
        title: "Puesta en producción",
        items: [
          "Escalado del sistema para producción",
          "Seguridad, monitoreo y copias de seguridad",
          "Pruebas de carga y ajuste de rendimiento",
          "Formación del equipo y documentación",
        ],
        deliverable: "Sistema en producción, listo para los usuarios",
      },
      {
        week: "Desde la semana 12",
        title: "Optimización y soporte",
        items: [
          "Monitoreo del rendimiento y comentarios de los usuarios",
          "Mejora continua del modelo",
          "Nuevas funcionalidades",
          "Soporte técnico continuo",
        ],
        deliverable: "Informes de rendimiento y recomendaciones",
      },
    ],
  },

  objections: {
    eyebrow: "Respuestas directas",
    title: "Preguntas que conviene hacer primero.",
    sub: "Las que más nos hacen, respondidas sin rodeos, incluso cuando la respuesta honesta es que le conviene esperar.",
    items: [
      {
        said: "Ya pagamos por esto una vez y no pudimos usarlo. ¿Qué cambia ahora?",
        answer:
          "Normalmente el desarrollo estaba bien y los requisitos no: nadie se sentó con quienes hacen el trabajo antes de empezar a programar. Por eso empezamos por el diagnóstico, y su resultado le pertenece, continúe o no con nosotros. Si el sistema anterior se puede aprovechar, se lo diremos: reescribir algo que en su mayor parte funciona es un mal uso de su dinero.",
        proof: "La reconstrucción del sistema de exportación de vehículos empezó precisamente como un rescate de este tipo.",
      },
      {
        said: "¿Qué pasa con el sistema si usted no está disponible?",
        answer:
          "El núcleo lo escribe nuestro director general y se incorporan especialistas según lo requiera el trabajo. Lo que le protege no es el tamaño del equipo, sino que el sistema esté documentado, probado y desplegado en infraestructura de su propiedad: su cuenta de Cloudflare, su base de datos, su repositorio. Otro ingeniero puede retomarlo porque las pruebas describen lo que el sistema debe hacer.",
        proof: "7.060 pruebas automatizadas en 484 clases de cálculo, en nuestro ERP interno.",
      },
      {
        said: "¿Cuánto suele costar algo así?",
        answer:
          "En la primera llamada le damos un rango y, tras el diagnóstico, una cifra en firme. Le diremos la cifra real pronto, no tarde, y después recortaremos el alcance juntos hasta que encaje: un sistema más pequeño que llega a producción vale más que uno grande que se estanca. Las pymes de Singapur pueden optar a la subvención EDGE, que sustituyó al PSG; le ayudamos a comprobar si su proyecto cumple los requisitos y preparamos sin costo nuestra documentación como proveedor.",
        proof: "Quien concede la subvención EDGE es Enterprise Singapore, y StarTech no es un proveedor preaprobado de EDGE.",
      },
      {
        said: "¿Perdemos algo por esperar un trimestre o dos?",
        answer:
          "A veces nada, y si es así se lo diremos. Preferimos que nos llame cuando el problema sea urgente a que se comprometa antes de tiempo. Conviene saber que el costo de esperar no suele estar en el software, sino en la conciliación manual y en los errores que se acumulan mientras tanto. Si quiere, lo cuantificamos en la llamada y decide con una cifra delante.",
      },
      {
        said: "¿Cuánto tendremos que explicar sobre cómo funciona nuestro negocio?",
        answer:
          "Esa es precisamente la razón de ser de esta firma. No tendrá que explicar qué es un balance de comprobación, qué debe incluir una factura fiscal ni por qué un pago se concilia como se concilia. Explíquenoslo como se lo explicaría a su contador.",
        proof: "Más de 20 años en negocios y tecnología.",
      },
    ],
  },

  capabilityDeck: {
    eyebrow: "Para consultar con calma",
    title: "Toda la propuesta, en un solo documento.",
    sub: "Cada servicio, cada caso, cada cifra de esta página.",
    cta: "Descargar la presentación corporativa",
  },

  contact: {
    eyebrow: "Contacto",
    title: "Treinta minutos y una respuesta honesta",
    sub: "Cuéntenos cuánto le cuesta hoy ese proceso y le diremos qué vale la pena desarrollar.",
    email: "Correo electrónico",
    phone: "Teléfono",
    reassurance:
      "Sin compromiso. El resultado del diagnóstico es suyo, continúe o no con nosotros.",
    name: "Nombre",
    company: "Empresa",
    message: "Mensaje",
    messagePlaceholder: "Cuéntenos sobre su proyecto...",
    send: "Enviar mensaje",
    sending: "Enviando...",
    success: "Gracias por su mensaje. Le responderemos en breve.",
    error:
      "Algo salió mal. Vuelva a intentarlo o escríbanos directamente por correo electrónico.",
    country: "País",
    staff: "Empleados",
    staffPick: "Cuántas personas",
    staffOptions: ["Menos de 10", "De 10 a 50", "De 51 a 200", "Más de 200"],
    spreadsheet: "Su hoja de cálculo (opcional)",
    spreadsheetHint:
      "Excel, CSV o Numbers, hasta 10 MB. Elimine la información confidencial; basta con una muestra de filas.",
    fileTooLarge: "El archivo supera los 10 MB. Envíe un fragmento más pequeño.",
  },

  // El folleto digital en /flyer. Solo afirma lo que afirma la presentación
  // de capacidades; véase docs/COMPANY.md.
  flyer: {
    eyebrow: "Singapur · Japón · Trabajamos en todo el mundo",
    headline: "De la hoja de cálculo al sistema.",
    who: "Para empresas de 10 a 200 personas que funcionan con hojas de cálculo, o con un sistema que un proveedor nunca terminó. Desarrollamos el software con el que realmente funciona su operación, y cada parte es de su propiedad.",
    ctaOffer: "Envíenos una hoja de cálculo",
    ctaDeck: "Descargar la presentación",
    proofEyebrow: "Tres cosas que son ciertas",
    proof: [
      {
        lead: "En producción en Japón",
        detail:
          "Un exportador de vehículos usados trabaja con un sistema que desarrollamos: inventario, CRM, facturas, documentos de embarque y pagos. En producción, en manos del cliente, hoy.",
      },
      {
        lead: "7.060 pruebas",
        detail:
          "Pruebas automatizadas en 484 clases de cálculo de nuestro ERP, según la ejecución de agosto de 2026. Un desarrollo interno, aún no implantado, sobre cuya exactitud no afirmamos nada.",
      },
      {
        lead: "Es suyo",
        detail:
          "El fundador escribe el código. La cuenta en la nube, la base de datos y el repositorio están a su nombre desde la primera semana, así que ningún proveedor puede tener a su negocio como rehén.",
      },
    ],
    demosEyebrow: "Pruebe antes de comprometerse",
    demosTitle: "Demos que funcionan, no diapositivas",
    demosSub: "{count} pequeños sistemas que puede ejecutar en el navegador con datos de ejemplo. Estos tres son los de uso más general.",
    demoOpen: "Abrir la demo",
    demosAll: "Ver las {count} demos",
    invoiceNowLink: "InvoiceNow: vea una factura electrónica de ejemplo creada a partir de una hoja de cálculo",
    offerEyebrow: "La oferta",
    offerTitle: "Envíenos una hoja de cálculo y se la mostraremos funcionando como un sistema.",
    offerBody:
      "Elija la hoja con la que funciona su negocio: presupuestos, inventario, órdenes de trabajo, entregas, lo que sea. En un plazo de dos semanas la verá convertida en un sistema que funciona, con sus propios datos, y tendrá una respuesta clara sobre lo que costaría el desarrollo completo.",
    offerPoints: ["Sin costo ni compromiso", "De 3 a 5 empresas al mes", "Lo que desarrollemos en la demo es suyo"],
    formEyebrow: "Empiece aquí",
    formTitle: "Una hoja de cálculo, un formulario",
    formSub: "Cuéntenos para qué usa hoy esa hoja. Respondemos en un plazo de dos días hábiles.",
    formReassurance:
      "Su archivo se guarda de forma privada, lo lee una sola persona y se elimina si lo solicita. No compartimos ni vendemos nada.",
    formSend: "Enviar la hoja de cálculo",
    messagePlaceholder: "¿Qué hace esta hoja por su negocio y dónde falla?",
    deckLine: "Descargue la presentación corporativa de 8 diapositivas. Sin necesidad de dejar su correo.",
    grantsLabel: "Empresas de Singapur:",
    grantsLine: "comprobaremos si su proyecto puede optar a la subvención EDGE.",
    backHome: "Volver al sitio principal",
  },

  testimonial: {
    eyebrow: "Testimonio",
    title: "¿Qué tal fue trabajar con StarTech?",
    intro: "Una o dos frases sobre el proyecto ayudan a otras empresas a decidir si trabajar con nosotros. No publicamos nada hasta que usted haya visto y aprobado el texto final.",
    name: "Su nombre",
    role: "Su cargo",
    company: "Empresa",
    email: "Correo electrónico",
    quote: "Su testimonio",
    quotePlaceholder: "¿Qué necesitaba, cómo fue el proyecto y qué cambió después?",
    quoteHint: "Bastan de una a tres frases.",
    credit: "¿Cómo quiere que lo firmemos?",
    creditFull: "Nombre, cargo y empresa",
    creditAnonymous: "Solo cargo y sector, sin nombre",
    creditPrivate: "Solo comentarios internos; por favor, no lo publiquen",
    consent: "StarTech puede acortarlo si es demasiado largo y me mostrará el texto final antes de publicarlo.",
    send: "Enviar testimonio",
    sending: "Enviando…",
    thanksTitle: "¡Gracias!",
    thanksBody: "Lo hemos recibido. Le enviaremos el texto final para que lo apruebe antes de publicar nada.",
    errorRequired: "Complete este campo.",
    errorEmail: "Escriba un correo electrónico válido.",
    errorQuoteShort: "Escriba al menos una frase (20 caracteres).",
    errorConsent: "Marque esta casilla para continuar.",
    error: "Algo salió mal. Inténtelo de nuevo.",
  },
  invoicenow: {
    eyebrow: "InvoiceNow · Singapur",
    headline: "Facturas electrónicas InvoiceNow, enviadas desde el sistema que ya usa",
    lead: "InvoiceNow es la red de facturación electrónica de Singapur, e IRAS la está implantando por fases para todas las empresas registradas en el GST. Conectamos el sistema o la hoja de cálculo desde la que factura a un punto de acceso de InvoiceNow.",
    ctaDemo: "Probar la factura de ejemplo",
    ctaFlyer: "Envíenos una hoja de cálculo",
    whatEyebrow: "Qué es",
    whatTitle: "InvoiceNow, explicado de forma sencilla",
    what: [
      {
        title: "Un archivo de datos, no un PDF",
        body: "Una factura InvoiceNow es un archivo estructurado (Peppol PINT SG, en XML) que el sistema del comprador lee directamente. Nadie tiene que volver a teclearla.",
      },
      {
        title: "Enviada por la red Peppol",
        body: "Su factura va a un punto de acceso, que localiza al comprador por su ID de Peppol (creado a partir de su UEN) y la entrega al punto de acceso del comprador.",
      },
      {
        title: "Una copia llega a IRAS",
        body: "En las empresas registradas en el GST, el punto de acceso también envía los datos de la factura a IRAS. Vendedor, comprador y sus dos puntos de acceso son las cuatro esquinas; IRAS es la quinta.",
      },
    ],
    whoEyebrow: "Quién debe usarla y cuándo",
    whoTitle: "IRAS la está implantando por fases para todas las empresas registradas en el GST",
    whoIntro: "Según IRAS, las empresas registradas en el GST deben enviar los datos de sus facturas a IRAS a través de InvoiceNow a partir de estas fechas:",
    phases: [
      { date: "1 nov 2025", text: "Sociedades que se registran voluntariamente en el GST dentro de los 6 meses siguientes a su constitución." },
      { date: "1 abr 2026", text: "Cualquier empresa que solicite el registro voluntario en el GST a partir de esta fecha." },
      { date: "1 abr 2028", text: "Empresas que soliciten el registro obligatorio en el GST a partir de esta fecha, y empresas ya registradas con suministros anuales de hasta S$200.000." },
      { date: "1 abr 2029", text: "Empresas ya registradas en el GST con suministros anuales de hasta S$1 millón." },
      { date: "1 abr 2030", text: "Empresas ya registradas en el GST con suministros anuales de hasta S$4 millones." },
      { date: "1 abr 2031", text: "Empresas ya registradas en el GST con suministros anuales de más de S$4 millones." },
    ],
    whoNote: "IRAS fija los tramos según los suministros declarados de 2025 y está notificando su fecha a cada empresa ya registrada. Consulte la página de IRAS para su caso concreto.",
    whoSource: "IRAS: requisito GST InvoiceNow (página actualizada el 8 de octubre de 2026)",
    accountant: "Nos dedicamos únicamente a la integración de software. Si InvoiceNow le aplica y qué tratamiento de GST corresponde a cada línea de factura son cuestiones que debe confirmar con su contador o con IRAS.",
    offerEyebrow: "Qué hacemos",
    offerTitle: "Conectamos el sistema o la hoja de cálculo desde la que factura a un punto de acceso de InvoiceNow.",
    offerBody: "Si factura desde un sistema propio, un ERP antiguo o una hoja de cálculo, la vía que indica IRAS es conectarse a través de un punto de acceso acreditado. Nosotros desarrollamos esa conexión: sus datos de facturación adaptados a PINT SG, enviados por la API del punto de acceso, y el estado de la entrega visible de nuevo en la herramienta donde usted trabaja.",
    offerPoints: [
      "Sus datos de facturación adaptados a PINT SG",
      "Enviados por la API del punto de acceso",
      "Estado de entrega y errores visibles donde usted trabaja",
    ],
    offerHonest: "StarTech no es proveedor de puntos de acceso ni está acreditada por IMDA. Una conexión real pasa por un punto de acceso acreditado por IMDA que elegimos junto con usted.",
    demoEyebrow: "Pruébelo",
    demoTitle: "Convierta una factura de ejemplo en XML PINT SG",
    demoIntro: "Rellene la factura o suba la plantilla CSV. Su navegador genera el XML y lo comprueba con un conjunto de reglas PINT SG. No se envía nada a ninguna parte.",
    sampleBadge: "Datos de ejemplo, no es una factura fiscal válida",
    csvTitle: "Empezar desde una hoja de cálculo",
    csvHint: "Una fila por línea de factura, con los datos de la factura y del comprador repetidos en cada fila. Los datos del vendedor se quedan en el formulario de abajo.",
    csvDownload: "Descargar la plantilla CSV",
    csvUpload: "Subir un archivo CSV",
    csvLoaded: "Se cargaron {count} líneas del archivo.",
    csvSkipped: "El archivo contiene {count} números de factura más; solo se cargó la primera factura.",
    csvErrorEmpty: "El archivo está vacío.",
    csvErrorColumns: "Faltan estas columnas en el archivo: {columns}",
    csvErrorRows: "El archivo tiene una fila de encabezado, pero ninguna línea de factura.",
    csvErrorRead: "No se pudo leer el archivo.",
    loadValid: "Rellenar con un ejemplo válido",
    loadBroken: "Rellenar con un ejemplo con errores",
    invoiceSection: "Datos de la factura",
    sellerSection: "Vendedor (su empresa)",
    buyerSection: "Comprador",
    linesSection: "Líneas de factura",
    fields: {
      invoiceNumber: "Número de factura",
      issueDate: "Fecha de emisión",
      dueDate: "Fecha de vencimiento",
      buyerReference: "Referencia del comprador o número de pedido",
      paymentTerms: "Condiciones de pago",
      name: "Razón social",
      uen: "UEN (número de entidad única)",
      gstRegNo: "Número de registro del GST",
      street: "Dirección",
      postalCode: "Código postal",
      description: "Descripción",
      quantity: "Cantidad",
      unit: "Unidad de medida",
      unitPrice: "Precio unitario (S$)",
      gstCategory: "Categoría del GST",
      lineAmount: "Importe de la línea",
    },
    units: {
      H87: "Pieza",
      HUR: "Hora",
      DAY: "Día",
      MON: "Mes",
    },
    categories: {
      SR: "SR · Tipo general, 9 %",
      ZR: "ZR · Tipo cero",
      ES33: "ES33 · Exento, reglamento 33",
      ESN33: "ESN33 · Exento, otros",
      OS: "OS · Fuera del ámbito del impuesto",
      NG: "NG · Vendedor no registrado en el GST",
    },
    categoryNote: "Los códigos de categoría proceden de la lista de códigos de PINT SG. Cuál corresponde a cada línea es una pregunta para su contador.",
    addLine: "Añadir una línea",
    removeLine: "Eliminar la línea {n}",
    lineLabel: "Línea {n}",
    errorNumber: "Escriba un número como 12.50, con un máximo de 4 decimales.",
    errorQuantity: "Escriba una cantidad mayor que cero, con un máximo de 4 decimales.",
    errorDate: "Escriba la fecha con el formato AAAA-MM-DD.",
    generate: "Generar el XML y ejecutar las comprobaciones",
    generating: "Generando…",
    resultEyebrow: "Resultado",
    totalsTitle: "Totales",
    totals: {
      net: "Total sin GST",
      gst: "Importe del GST",
      payable: "Importe a pagar",
    },
    checksTitle: "Comprobaciones",
    checksSummary: "{passed} de {total} comprobaciones superadas",
    pass: "Correcto",
    fail: "Error",
    demoCheck: "Comprobación de la demo de StarTech, no es una regla de PINT SG",
    checksSource: "Los ID de regla proceden del schematron de PINT SG Billing v1.4.1, publicado el 25 de mayo de 2026. Es un subconjunto que se ejecuta en su navegador; un punto de acceso realiza la validación completa antes de enviar nada.",
    checks: {
      specIds: "Los identificadores de especificación y de proceso de negocio son los de facturación PINT SG",
      invoiceNumber: "La factura tiene número",
      issueDate: "Hay fecha de emisión y todas las fechas tienen el formato AAAA-MM-DD",
      dueOrTerms: "Hay un importe pendiente de pago, así que figura una fecha de vencimiento o unas condiciones de pago",
      buyerReference: "Figura una referencia del comprador o un número de pedido",
      currency: "La moneda de la factura es SGD, sin una moneda fiscal distinta",
      sellerName: "Figura la razón social del vendedor",
      buyerName: "Figura la razón social del comprador",
      sellerEndpoint: "El vendedor tiene dirección Peppol (esquema 0195, a partir del UEN)",
      buyerEndpoint: "El comprador tiene dirección Peppol (esquema 0195, a partir del UEN)",
      sellerLegalId: "El UEN del vendedor figura como su registro legal",
      sellerGstId: "Se cobra GST, así que figura el número de registro del GST del vendedor",
      sellerAddress: "Figuran la dirección y el código postal del vendedor",
      buyerAddress: "Figuran la dirección y el código postal del comprador",
      countries: "Las direcciones del vendedor y del comprador llevan código de país",
      uuid: "La factura tiene un identificador único (UUID) con el formato correcto",
      linesNamed: "Hay al menos una línea y todas tienen descripción",
      lineCategories: "Cada línea tiene un código de categoría del GST de Singapur válido",
      lineAmounts: "El importe de cada línea es igual a cantidad × precio unitario",
      netTotals: "El total sin GST es igual a la suma de los importes de las líneas",
      gstAmounts: "El GST de cada categoría es igual a base imponible × tipo, y la suma coincide con el total de GST",
      payable: "El total con GST y el importe a pagar cuadran",
      decimals: "Ningún importe tiene más de 2 decimales",
      noGst: "Una línea de vendedor no registrado (NG) no se mezcla con líneas con GST",
      noGstNumber: "Una factura con una línea NG no lleva número de GST del vendedor",
      uenFormat: "Ambos UEN tienen un formato de UEN válido",
    },
    xmlTitle: "El XML generado",
    download: "Descargar el XML",
    nextEyebrow: "Qué pasa después",
    nextTitle: "Cómo se enviaría realmente este archivo",
    next: [
      {
        title: "Su sistema genera el archivo",
        body: "En una conexión real, el XML se genera a partir de sus propios datos de facturación cada vez que emite una factura. Nadie lo teclea.",
      },
      {
        title: "Va a un punto de acceso",
        body: "Su sistema lo envía a un punto de acceso acreditado por IMDA a través de la API de ese proveedor. El punto de acceso realiza la validación PINT SG completa.",
      },
      {
        title: "El comprador lo recibe",
        body: "El punto de acceso localiza el punto de acceso del comprador en el directorio Peppol y entrega la factura en el sistema del comprador.",
      },
      {
        title: "IRAS recibe una copia",
        body: "Cuando se active la función de envío, el punto de acceso también enviará los datos de la factura a IRAS. Esa es la quinta esquina.",
      },
    ],
    nextNote: "Esta página no se conecta a ningún punto de acceso. Una conexión real usa un punto de acceso acreditado por IMDA que se elige junto con usted.",
    ctaTitle: "¿Factura hoy desde una hoja de cálculo?",
    ctaBody: "Envíenos la hoja de cálculo desde la que factura. Le mostraremos cómo se traslada a InvoiceNow y le diremos con claridad qué supondría una conexión. Sin costo y sin compromiso.",
    ctaButton: "Enviar una hoja de cálculo",
    sourcesTitle: "Fuentes",
    sourceIras: "IRAS: requisito GST InvoiceNow",
    sourcePint: "Peppol: especificación PINT SG Billing v1.4.1",
    sourceImda: "IMDA: InvoiceNow",
    backHome: "Volver al sitio principal",
  },

  singpass: {
    eyebrow: "Actualización de Singpass · FAPI 2.0",
    title: "El inicio de sesión con Singpass debe pasar a FAPI 2.0 antes del 31 de diciembre de 2026",
    intro:
      "Si su sitio web o su aplicación tiene un botón «Iniciar sesión con Singpass», o rellena formularios con Myinfo, tiene que adoptar el nuevo estándar de seguridad de Singpass antes de que termine 2026.",
    source: "La fecha límite, tal como la publica Singpass",
    ctaCheck: "Pídanos que revisemos su integración",
    ctaDemo: "Ejecutar la demo",
    changesEyebrow: "Qué cambia",
    changesTitle: "Cinco cambios en el funcionamiento del inicio de sesión",
    changes: [
      {
        lead: "La solicitud se envía por adelantado",
        detail:
          "Su servidor envía primero la solicitud de inicio de sesión a Singpass (PAR), y el navegador del usuario solo lleva una referencia corta. No hay nada en la barra de direcciones que se pueda alterar.",
      },
      {
        lead: "Una prueba de un solo uso por inicio de sesión",
        detail:
          "Su servidor demuestra que fue él quien inició el proceso (PKCE), así que un código interceptado no le sirve a nadie más.",
      },
      {
        lead: "Tokens vinculados a su clave",
        detail:
          "Cada código y cada token solo funcionan junto con una clave que guarda su servidor (DPoP). Un token filtrado no se puede reutilizar.",
      },
      {
        lead: "La identidad va cifrada",
        detail:
          "Ahora cada token de ID se cifra con su clave, y el NRIC pasó a un campo nuevo. El código que lee el formato antiguo deja de funcionar.",
      },
      {
        lead: "Redirecciones y errores más estrictos",
        detail:
          "Ya no se aceptan enlaces de aplicación con esquema propio, las apps de Login deben indicar para qué es cada inicio de sesión, y Singpass ahora devuelve los errores a su sitio, que tiene que gestionarlos.",
      },
    ],
    migrationLink: "Guía de migración de Singpass para apps de Login y Myinfo (v5)",
    whoEyebrow: "A quién afecta",
    whoTitle: "A cualquier sitio o app que use Singpass para iniciar sesión o rellenar datos personales",
    who: [
      "Sitios web, portales y apps móviles con «Iniciar sesión con Singpass»",
      "Formularios que rellenan los datos de una persona desde Myinfo",
      "Integraciones creadas antes de febrero de 2026; las apps registradas desde entonces ya tenían que usar FAPI 2.0",
      "Integraciones con Myinfo v3 y v4, a las que Singpass pidió pasar a Myinfo v5 antes de finales de septiembre de 2026",
    ],
    corppass: "El inicio de sesión con Corppass tiene su propia fecha límite, posterior: el 31 de marzo de 2027.",
    corppassLink: "Calendario de Corppass",
    riskEyebrow: "Si no migra",
    riskTitle: "Cuente con que el inicio de sesión antiguo dejará de funcionar",
    riskBody:
      "Singpass exige que todas las integraciones usen FAPI 2.0 antes del 31 de diciembre de 2026, y retiró la documentación del flujo antiguo el 14 de julio de 2026. Una integración que siga con el flujo antiguo debe contar con que el inicio de sesión con Singpass o el relleno automático con Myinfo fallen después de esa fecha: personas que no pueden entrar y formularios que no pueden completar.",
    demoEyebrow: "Demo de referencia funcional",
    demoTitle: "Todo el flujo FAPI 2.0, ejecutándose en su navegador",
    demoIntro:
      "Ejecuta los pasos reales del protocolo contra un servidor Singpass simulado que construimos para la demo. Las claves se generan en el momento en su navegador, la persona es ficticia y no se envía nada a Singpass. Se muestran todas las solicitudes y respuestas, con los tokens abreviados.",
    demoNotice:
      "Servidor simulado: no es Singpass y no está conectado a Singpass ni a GovTech. El mismo código cliente también funciona contra el entorno de pruebas del propio Singpass: pruébelo con el botón de abajo.",
    appType: "Tipo de app",
    appLogin: "Singpass Login",
    appMyinfo: "Myinfo (v5)",
    run: "Ejecutar el flujo",
    runAgain: "Ejecutarlo otra vez",
    running: "Ejecutando el flujo…",
    allPassed:
      "Se superaron todos los pasos. Los datos de abajo llegaron cifrados y firmados, mediante un código y unos tokens vinculados a la clave de este navegador.",
    failed: "Un paso falló. Su solicitud y su respuesta se muestran abajo.",
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
        body: "Los endpoints y los algoritmos salen de la configuración OpenID, no de direcciones fijadas en el código.",
      },
      session: {
        title: "Crear los secretos de este inicio de sesión",
        body: "Un state, un nonce, un verificador PKCE (S256) y una clave DPoP nuevos, que se usan solo para este inicio de sesión y luego se descartan.",
      },
      par: {
        title: "Enviar la solicitud por adelantado (PAR)",
        body: "La solicitud de inicio de sesión va primero al servidor, con una aserción de cliente firmada (private_key_jwt) y una prueba DPoP. El servidor responde con un request_uri de corta duración.",
      },
      authorize: {
        title: "Enviar a la persona a Singpass",
        body: "La dirección solo lleva client_id y request_uri. En el servicio real, en este punto la persona aprueba el inicio de sesión en la app de Singpass.",
      },
      redirect: {
        title: "Gestionar la vuelta",
        body: "Comprobar state e iss antes de fiarse del código.",
      },
      token: {
        title: "Canjear el código por tokens",
        body: "Envía el código, el verificador PKCE, una nueva aserción de cliente y una nueva prueba DPoP. Los tokens vuelven vinculados a la clave DPoP.",
      },
      idToken: {
        title: "Descifrar y verificar el token de ID",
        body: "Se descifra con su clave de cifrado, se comprueba la firma con las claves publicadas por el servidor (JWKS) y, después, iss, aud, exp y nonce.",
      },
      userinfo: {
        title: "Obtener los datos de Myinfo",
        body: "Authorization: DPoP, con una prueba vinculada al token de acceso (ath). La respuesta también va cifrada y firmada, dentro de person_info.",
      },
      replay: {
        title: "Probar un código robado",
        body: "Alguien que copió el código y el verificador PKCE los prueba desde otro dispositivo, con su propia clave. El servidor debe rechazarlo.",
        refused: "Rechazado, como debe ser: el código solo funciona con la clave que lo solicitó.",
        accepted: "El servidor aceptó un código robado. Eso es un fallo.",
      },
    },
    loginTitle: "Inicio de sesión simulado de Singpass",
    loginBody:
      "En Singpass, la persona escanearía ahora un código QR con la app de Singpass. Aquí decide usted por la persona de ejemplo.",
    loginRequested: "Datos solicitados",
    loginPurpose: "Finalidad",
    approve: "Entrar como la persona de ejemplo",
    cancel: "Cancelar el inicio de sesión",
    sample: "Persona de ejemplo, no real",
    resultTitle: "Lo que recibe su sitio",
    errorGeneric: "Algo salió mal. Vuelva a ejecutar el flujo dentro de un minuto.",
    offerEyebrow: "Lo que ofrecemos",
    offerTitle: "Revisamos y actualizamos su integración con Singpass",
    offerSteps: [
      {
        lead: "Revisión",
        detail:
          "Leemos su código actual de Singpass o Myinfo y le decimos por escrito qué tiene que cambiar y cuánto tiempo llevará.",
      },
      {
        lead: "Actualización",
        detail:
          "Incorporamos PAR, PKCE, DPoP y tokens de ID cifrados en su código, y hacemos las pruebas en el entorno de pruebas de Singpass con la app de su propia organización.",
      },
      {
        lead: "Puesta en marcha",
        detail:
          "Pasamos producción al nuevo flujo antes de la fecha límite. Singpass permite que el flujo antiguo y el nuevo funcionen en paralelo, así que el cambio puede hacerse por etapas.",
      },
    ],
    honesty:
      "Para ser claros: esta demo es nuestra implementación de referencia contra un servidor simulado. Todavía no hemos completado una migración de Singpass para ningún cliente y no somos socios de Singpass ni de GovTech. Su app de Singpass sigue registrada a nombre de su organización.",
    otherWork: "Vea qué más desarrollamos",
    formEyebrow: "Revisión de Singpass",
    formTitle: "Pídanos que revisemos su inicio de sesión con Singpass",
    formSub: "Indíquenos qué sitio web o aplicación tiene el inicio de sesión con Singpass. Le respondemos en un plazo de dos días hábiles explicándole qué supone el cambio a FAPI 2.0 para ese sitio o aplicación.",
    formPlaceholder: "¿Qué sitio o aplicación tiene el inicio de sesión con Singpass? ¿Quién lo desarrolló? ¿Usa Myinfo o Corppass?",
    formSend: "Solicitar una revisión de Singpass",
    flyerLine: "Singpass debe pasar a FAPI 2.0 antes del 31 de diciembre de 2026. Vea nuestra demo funcional del nuevo inicio de sesión.",
    stagingTitle: "Pruébelo en el entorno de pruebas de Singpass",
    stagingBody: "Este botón ejecuta el mismo cliente contra el propio entorno de pruebas de Singpass, con la app de pruebas de StarTech. Solo pueden entrar las cuentas de prueba de Singpass; las cuentas reales no.",
    stagingButton: "Iniciar sesión con Singpass (pruebas)",
    stagingResult: "El entorno de pruebas de Singpass devolvió este token de ID, descifrado y verificado",
    stagingCancelled: "Se canceló el inicio de sesión de prueba.",
    stagingFailed: "El inicio de sesión de prueba no se completó. Inténtelo de nuevo más tarde.",
  },

  stickyCta: {
    line: "Treinta minutos sobre su proceso y una idea clara de qué desarrollar primero.",
    action: "Hablemos",
  },

  footer: {
    location: "Singapur",
    rights: "StarTech Innovation Pte. Ltd.",
  },

  demos: {
    signIn: {
      title: "Personalizar {title}",
      subtitle: "Inicie sesión con Google para generar resultados personalizados con sus propios datos.",
      notConfigured: "El inicio de sesión aún no está disponible. Vuelva a intentarlo pronto.",
      signedInAs: "Sesión iniciada como",
      backToSample: "← Volver al ejemplo",
    },
  },
};
