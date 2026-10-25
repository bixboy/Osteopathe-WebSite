# Site vitrine – Fanny Gerszkourez, ostéopathe à Bayeux

Site statique Astro 7 + TypeScript strict + CSS natif (aucun framework JS ; JS client limité à la carte Google au clic et au badge « Ouvert / Fermé »).
Dépendances : `@astrojs/sitemap`, `@lucide/astro` (icônes), `@fontsource-variable/*` (polices).
Langue du site, du contenu et des commits : **français**.

## Commandes

- `npm run dev` : serveur local (préférer `astro dev --background`, puis `astro dev stop`)
- `npm run check` : vérif. types + contenu (rapide, à lancer après chaque modif)
- `npm run build` : check + build dans `dist/` (= définition de « terminé »)

## Où modifier quoi (lire ceci AVANT de chercher dans le code)

| Besoin | Fichier |
|---|---|
| Nom, adresse, tél., horaires, lien Doctolib, mentions légales | `src/data/site.ts` (source unique) |
| Menu / liens du footer | `src/data/navigation.ts` |
| Formations, expérience | `src/data/parcours.ts` |
| Page anglaise, libellés FR/EN | `src/pages/en.astro`, `src/lib/i18n.ts`, champ `en` des soins |
| Favicon, image de partage (générés au build) | `src/lib/brand-images.ts` + `src/pages/*.png.ts|*.svg.ts|*.ico.ts` |
| Ajouter/modifier un soin (= une page `/soins/<fichier>`) | `src/content/soins/*.md` |
| FAQ | `src/content/faq/*.md` (questions générales) ; questions pratiques générées par `src/lib/faq-pratique.ts` |
| Schéma des contenus (champs frontmatter) | `src/content.config.ts` |
| Couleurs, typos, espacements | `src/styles/tokens.css` |
| Composants d'UI existants (à réutiliser) | `docs/DESIGN.md § Composants` |
| Lister les soins / la FAQ | `getSoins()` / `getFaq()` de `src/lib/content.ts` |
| `<head>`, SEO, JSON-LD (graphe site / cabinet / praticienne) | `src/layouts/BaseLayout.astro`, `src/components/Seo.astro`, `src/lib/schema.ts` |
| Référencement IA (`llms.txt`), robots | `src/lib/llms.ts`, `src/pages/llms*.txt.ts`, `src/pages/robots.txt.ts` |
| Liens internes (sous-chemin GitHub Pages) | `src/lib/paths.ts` (`link`, `absoluteUrl`) |
| Pages fixes | `src/pages/*.astro` |
| Domaine du site | `astro.config.mjs` (`site`) |
| Déploiement | `.github/workflows/pages.yml` (GitHub Pages, actuel), `deploy.yml` (OVH, manuel), `public/.htaccess` |
| Avis Google (1 fichier = 1 avis) | `src/content/avis/*.md` (modèle : `_modele.md`) |
| Note Google globale, Place ID, carte | `site.google` dans `site.ts`, `docs/GOOGLE.md` |

## Règles impératives

1. **Jamais d'info du cabinet en dur** dans une page : importer `site` depuis `src/data/site.ts`.
2. **Jamais de couleur/taille en dur** : uniquement `var(--…)` de `tokens.css`.
3. Styles dans un `<style>` scopé du composant ; `global.css` = reset + utilitaires de layout seulement.
4. Toute page passe par `BaseLayout` avec `title` + `description` uniques.
5. Pas de dépendance npm ni de script tiers (analytics, widget, police CDN) sans validation : le site ne dépose **aucun cookie**. Tout contenu tiers (iframe, etc.) se charge au clic, comme `GoogleMap`.
6. Contenu santé : respecter `docs/SEO.md § Contraintes légales` (aucune promesse de guérison, pas de vocabulaire médical de diagnostic).
7. Info cliente non confirmée → `TODO(cliente): …` dans le code + statut dans `docs/CONTENT.md`. Ne jamais inventer une donnée (tarif, diplôme, tél.).
8. Frontmatter YAML : valeurs texte **entre guillemets** (les « : » cassent le parseur).
9. Images via `astro:assets` (`<Image />`) depuis `src/assets/images/`, avec `alt` descriptif en français.
   `widths` jamais supérieures à la largeur d'origine (`image.width`).
10. Changement minimal : ne pas reformater ni refactorer ce qui n'est pas demandé.
11. **Liens internes via `link()`** de `src/lib/paths.ts` (jamais `href="/..."` en dur) : le site
    tourne sous un sous-chemin sur GitHub Pages. URL absolues : `absoluteUrl()`.
12. SEO : chaque page a un `title` mots-clés en premier (le nom est ajouté automatiquement) et des
    `breadcrumbs` ; les faits (tarif, horaires…) viennent de `site.ts`, jamais recopiés.

## Docs (à lire seulement si la tâche le nécessite)

- `docs/PLAN.md` : feuille de route et avancement (à cocher au fil de l'eau)
- `docs/ARCHITECTURE.md` : arborescence, flux de données, recettes « comment ajouter X »
- `docs/CONVENTIONS.md` : style de code détaillé
- `docs/DESIGN.md` : identité visuelle, ton, accessibilité
- `docs/SEO.md` : SEO local, données structurées, contraintes légales santé
- `docs/CONTENT.md` : faits sur la cliente + statut de validation
- `docs/GOOGLE.md` : carte Google Maps (au clic) et avis Google (saisis à la main, sans API)
- `docs/DEPLOIEMENT.md` : GitHub Pages (prévisualisation actuelle) et mise en ligne OVH
- `docs/DECISIONS.md` : choix techniques et leur raison (ajouter une ligne à chaque décision structurante)

## Ne pas lire

`node_modules/`, `dist/`, `.astro/`, `package-lock.json` : générés, inutiles et coûteux en tokens.
