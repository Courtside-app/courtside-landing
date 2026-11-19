// ── Contacto y destinos ────────────────────────────────────────────────────
// El alta es asistida (un club por vez): la landing no manda a registrarse,
// manda a probar la demo y a hablar.
//   contactWhatsApp: número en formato internacional sin "+"
//   contactEmail:    casilla del proyecto en el dominio propio
//   adminAppUrl:     login del panel
//   demoUrl:         demo guiada (recorrido de 7 pasos, sin registrarse)
//   apiUrl:          backend que responde a Sensei, el chat del sitio
export const contactWhatsApp = '5491165916614';
export const contactEmail = 'contacto@raketsense.com';
export const adminAppUrl = 'https://app.raketsense.com/login';
export const demoUrl = 'https://demo.raketsense.com';
// Sensei (el chat) le pregunta a este backend. Por defecto, producción; para
// probar contra otro, `PUBLIC_API_URL=http://localhost:3100/api npm run dev`.
// Si ese backend no tiene el bot prendido, el chat no aparece y queda WhatsApp.
export const apiUrl: string =
  import.meta.env.PUBLIC_API_URL || 'https://app.raketsense.com/api';

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
