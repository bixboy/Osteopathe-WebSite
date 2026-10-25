# Architecture

## Arborescence

```
astro.config.mjs          Domaine (`site`), URLs sans slash final, sitemap
src/
  data/
    site.ts               Source unique : identité, adresse, horaires, Doctolib, légal
    navigation.ts         Menu principal + liens footer
    seance.ts             Étapes et durée d'une séance (+ version anglaise)
    parcours.ts           Formations et expérience (page À propos)
  content.config.ts       Schémas Zod des collections (validés au build)
  content/
    soins/*.md            1 fichier = 1 page /soins/<nom-fichier>
    faq/*.md              1 fichier = 1 question (balisée FAQPage)
    avis/*.md             1 fichier = 1 avis Google recopié (« _ » en tête = ignoré)
  lib/
    content.ts            getSoins(), getAvis(), getFaq() : lecture triée des collections
    faq-pratique.ts       Questions pratiques de la FAQ (adresse, horaires…) générées depuis site.ts
    format.ts             Formatage FR (horaires, téléphone, initiales, lien carte) : fonctions pures
    icons.ts              Clés d'icônes autorisées pour les soins
    schema.ts             Générateurs JSON-LD (MedicalBusiness, FAQPage)
    i18n.ts               Type Lang, libellés FR/EN du layout, traduction des valeurs de site.ts
    tokens.ts             Lecture d'une variable de tokens.css depuis TS (images, theme-color)
    brand-images.ts       Favicon / icône Apple / image de partage générés au build (satori + sharp)
  layouts/
    BaseLayout.astro      <html>, <head>, Header, <main>, Footer, JSON-LD
  components/             Composants d'UI, un fichier = un composant, styles scopés (liste : docs/DESIGN.md)
  pages/                  Routage par fichier (+ robots.txt.ts généré)
  styles/
    tokens.css            Variables CSS (couleurs, typo, espacements)
    global.css            Reset + utilitaires (.container, .prose, .visually-hidden)
  assets/images/          Images optimisées au build via astro:assets
public/                   Fichiers copiés tels quels (favicon)
docs/                     Documentation projet (pour humains et IA)
```

## Flux de données

```
site.ts ─────────────┬─► composants (Header, Footer, OpeningHours, BookingButton)
                     └─► lib/schema.ts ─► BaseLayout (JSON-LD)
content/*.md ─► content.config.ts (validation) ─► getCollection() dans pages/
tokens.css ─► global.css ─► <style> scopés des composants
```

Tout est résolu **au build** : la sortie est du HTML/CSS statique, sans JavaScript.

## Recettes

**Ajouter un soin** : créer `src/content/soins/<slug>.md` avec le frontmatter défini dans
`content.config.ts` (`title`, `shortTitle`, `icon`, `description`, `order`, `summary`).
Nouvelle icône : clé dans `src/lib/icons.ts` + correspondance dans `src/components/SoinIcon.astro`. La page, la carte d'accueil
et la liste `/soins` se mettent à jour automatiquement. Voir le skill `/nouveau-soin`.

**Ajouter une page fixe** : `src/pages/<slug>.astro` utilisant `BaseLayout` (avec `title` et
`description`), puis ajouter l'entrée dans `src/data/navigation.ts`. Skill `/nouvelle-page`.

**Ajouter un type de contenu** (ex. actualités) : nouvelle collection dans `content.config.ts`,
dossier `src/content/<nom>/`, pages `src/pages/<nom>/index.astro` + `[id].astro` sur le modèle
de `soins`.

**Ajouter un composant** : `src/components/<NomPascalCase>.astro` avec `interface Props` typée
et `<style>` scopé utilisant uniquement les tokens.

**Changer une info du cabinet** : uniquement `src/data/site.ts`.

**JSON-LD propre à une page** : passer un objet à la prop `schema` de `BaseLayout`
(générateur à ajouter dans `lib/schema.ts`).
