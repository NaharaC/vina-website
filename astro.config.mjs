// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://iglesiavinapm.cl',
  integrations: [
    icon(),
    /*
      `/centinela` no se publica: se reparte por enlace y no está en el menú.
      Fuera del mapa del sitio, como el `Disallow` de `robots.txt`.
    */
    sitemap({ filter: (pagina) => !pagina.includes('/centinela') }),
  ],
  image: {
    // Fotos de las actividades subidas a Notion: se descargan y optimizan al
    // construir, porque sus URLs firmadas de S3 caducan en cosa de una hora.
    remotePatterns: [{ protocol: 'https', hostname: '**.amazonaws.com' }],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
