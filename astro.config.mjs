import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://ecommetrixbd.com',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'bn'],
    routing: { prefixDefaultLocale: false },
  },
});
