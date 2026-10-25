---
name: nouvelle-page
description: Crée une page fixe du site (.astro) et l'ajoute au menu. Utiliser pour toute nouvelle page hors soins.
---

1. Prendre pour modèle `src/pages/infos-pratiques.astro` (ne pas explorer d'autres fichiers sauf besoin).
2. Créer `src/pages/<slug>.astro` : `BaseLayout` avec `title` + `description` uniques, un seul `<h1>`, contenu dans `.prose` si c'est du texte.
3. Infos du cabinet uniquement via `import { site } from '../data/site'`.
4. Ajouter l'entrée dans `src/data/navigation.ts` (menu ou footer selon la demande).
5. Si la page est légale/technique : prop `noindex` + exclusion dans le filtre sitemap de `astro.config.mjs`.
6. `npm run build`, puis cocher l'étape dans `docs/PLAN.md` si elle y figure.
