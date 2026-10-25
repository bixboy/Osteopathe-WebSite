// @ts-check
import { defineConfig, envField } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/*
 * Adresse publique du site. Sur GitHub Pages, le workflow pages.yml fournit SITE_URL et BASE_PATH
 * (https://bixboy.github.io + /Osteopathe-WebSite). Sinon : domaine définitif, à la racine.
 * TODO(domaine): remplacer le domaine provisoire avant la mise en ligne sur OVH.
 */
const site = process.env.SITE_URL || 'https://www.osteopathe-bayeux.example';
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site,
  base,
  // Adresses en dossier (/a-propos/ -> a-propos/index.html) : servies telles quelles par
  // GitHub Pages comme par Apache (OVH), sans règle de réécriture
  trailingSlash: 'always',
  // CSS intégré dans chaque page : supprime les requêtes bloquantes (≈ 0,7 s gagnées sur mobile)
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    // Pages en noindex exclues du sitemap
    sitemap({ filter: (page) => !/\/(mentions-legales|confidentialite)\/$/.test(page) }),
  ],
  env: {
    schema: {
      // true = version de prévisualisation (GitHub Pages) : non indexée par les moteurs
      SITE_PREVIEW: envField.boolean({ context: 'server', access: 'public', default: false }),
    },
  },
});
