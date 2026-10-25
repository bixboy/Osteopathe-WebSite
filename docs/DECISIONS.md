# Décisions techniques

Format : date · décision · raison. Ajouter une ligne à chaque choix structurant ; ne pas réécrire l'historique.

| Date | Décision | Raison |
|---|---|---|
| 2026-10-25 | Astro 7 en site statique | HTML pur (0 JS), SEO et performances maximales, composants + Markdown, hébergement gratuit |
| 2026-10-25 | CSS natif + design tokens, pas de Tailwind | Pas de dépendance, styles scopés lisibles, un seul fichier pour réthémer |
| 2026-10-25 | Contenu en Markdown (content collections + Zod) | Rédaction séparée du code, frontmatter validé au build, peu coûteux à éditer pour une IA |
| 2026-10-25 | `src/data/site.ts` source unique des infos cabinet | Cohérence NAP (SEO local), une seule modification à faire |
| 2026-10-25 | RDV via lien Doctolib, pas de widget intégré | Aucun script tiers ni cookie, page plus légère, pas de bandeau de consentement |
| 2026-10-25 | URLs sans slash final (`build.format: 'file'`) | URLs courtes et canoniques uniques |
| 2026-10-25 | `AGENTS.md` canonique, `CLAUDE.md` l'importe | Un seul fichier d'instructions, compatible avec tous les outils IA |
| 2026-10-25 | Polices Fraunces + Inter via `@fontsource-variable` | Auto-hébergées au build (pas de Google Fonts = pas de transfert de données), sous-ensembles latin |
| 2026-10-25 | Icônes `@lucide/astro` | SVG inline au build, 0 JS, tree-shaking. Nommage Lucide v1 : `Smile` → `FaceSlightlySmiling` |
| 2026-10-25 | Carte Google Maps chargée au clic (façade) | Pas de cookie Google sans action de l'utilisateur (RGPD), pas de bandeau de consentement |
| 2026-10-25 | ~~Avis Google via Places API (New) au build~~ → remplacé ci-dessous | — |
| 2026-10-25 | Avis Google recopiés à la main (collection `avis`), aucune API | Aucun compte de facturation ni clé, aucun risque de coût ; les conditions de l'API interdisent de toute façon de stocker les avis |
| 2026-10-25 | Menu mobile via l'API Popover HTML | Natif, accessible (Échap, focus), aucun JavaScript |
| 2026-10-25 | Animations en CSS pur (scroll-driven animations + keyframes) | 0 JS ; navigateurs non compatibles : contenu simplement visible ; coupées si `prefers-reduced-motion` |
| 2026-10-25 | Favicon et image de partage générés au build (satori + sharp, devDependencies) | Toujours à jour avec le nom et les couleurs ; faille `fflate` signalée par npm audit sans impact (ne lit que nos polices, au build) |
| 2026-10-25 | Une seule page anglaise (`/en`) plutôt qu'un site bilingue | Cible : patients anglophones ; header/footer restent en français ; extension possible via `Lang` |
| 2026-10-25 | CSS intégré dans les pages (`inlineStylesheets: 'always'`) | Supprime les requêtes bloquantes, Lighthouse mobile 100 |
| 2026-10-25 | `--color-accent-text` pour le texte cuivre | Contraste AA ; `--color-accent` réservé aux décors |
