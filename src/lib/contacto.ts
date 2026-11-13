// ── Contacto y destinos ────────────────────────────────────────────────────
// El alta es asistida (un club por vez): la landing no manda a registrarse,
// manda a probar la demo y a hablar.
//   contactWhatsApp: número en formato internacional sin "+"
//   contactEmail:    casilla del proyecto en el dominio propio
//   adminAppUrl:     login del panel
//   demoUrl:         demo guiada (recorrido de 7 pasos, sin registrarse)
export const contactWhatsApp = '5491165916614';
export const contactEmail = 'contacto@raketsense.com';
export const adminAppUrl = 'https://app.raketsense.com/login';
// Pasa a 'https://demo.raketsense.com' cuando ese dominio esté sumado al proyecto de Pages de la demo
// (el CNAME ya existe; hasta entonces responde 403).
export const demoUrl = 'https://raketsense-demo.pages.dev';

// Cada CTA abre WhatsApp con su propio mensaje; sin WhatsApp, mail; sin nada,
// la página de Clubes Semilla.
export const contactHref = (message: string, subject: string) =>
  contactWhatsApp
    ? `https://wa.me/${contactWhatsApp}?text=${encodeURIComponent(message)}`
    : contactEmail
      ? `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}`
      : '/club-semilla';

export const waitlistHref = contactHref(
  'Hola, administro un club de tenis/pádel y quiero sumarme a la lista de espera de RaketSense.',
  'Lista de espera de RaketSense',
);
export const helloHref = contactHref(
  'Hola, vi la página de RaketSense y quiero hacer una consulta.',
  'Consulta sobre RaketSense',
);
