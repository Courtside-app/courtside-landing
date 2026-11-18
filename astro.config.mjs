// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Hace falta para armar direcciones absolutas: WhatsApp no muestra la miniatura si `og:image` es relativa.
  site: 'https://raketsense.com',
});
