import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// GitHub Pages serve o site em https://<usuario>.github.io/<repositorio>/
export default defineConfig({
  site: 'https://luccas-souza7.github.io',
  base: '/corretora-de-seguros',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
