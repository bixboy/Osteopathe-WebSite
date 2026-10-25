// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO(domaine): remplacer par le domaine définitif avant la mise en ligne.
export default defineConfig({
  site: 'https://www.osteopathe-bayeux.example',
  trailingSlash: 'never',
  // CSS intégré dans chaque page : supprime les requêtes bloquantes (≈ 0,7 s gagnées sur mobile)
  build: { format: 'file', inlineStylesheets: 'always' },
  integrations: [
    // Pages en noindex exclues du sitemap
    sitemap({ filter: (page) => !/\/(mentions-legales|confidentialite)$/.test(page) }),
  ],
});
