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
  },

  practices: {
    eyebrow: "Servicios",
    title: "Cuatro áreas, un solo equipo",
    sub: "Preferimos profundizar en cuatro áreas antes que abarcar veinte. En todas ellas el trabajo lo dirige personalmente el responsable, con especialistas según lo exija el proyecto.",
    details: "Detalles",
  },

  industries: {
    eyebrow: "Sectores",
    title: "Conocimiento del sector",
    sub: "Entendemos a fondo los requisitos regulatorios, operativos y técnicos de su sector.",
  },

  approach: {
    eyebrow: "Cómo trabajamos",
    title: "De la estrategia a producción en 90 días",
    sub: "Un proceso depurado en proyectos empresariales. Lo implementamos nosotros; no nos limitamos a asesorar.",
    deliverable: "Entregable",
    step: "Ir al paso",
    previous: "Anterior",
    next: "Siguiente",
  },

  objections: {
    eyebrow: "Respuestas directas",
    title: "Preguntas que conviene hacer primero.",
    sub: "Las que más nos hacen, respondidas con franqueza, incluidas aquellas cuya respuesta honesta es que conviene esperar.",
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
