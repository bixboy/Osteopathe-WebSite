# Conventions de code

## Général

- Indentation 2 espaces, LF, UTF-8 (voir `.editorconfig`). Guillemets simples en TS.
- TypeScript strict : pas de `any` ; typer les `Props` de chaque composant avec `interface Props`.
- Code (variables, fonctions, composants) en **anglais** ; contenu, commentaires, commits en **français**.
- Commentaires : seulement pour le *pourquoi* ou une contrainte non évidente.
- Pas de code mort, pas de fichier inutilisé, pas de dépendance non utilisée.

## Nommage

| Élément | Convention | Exemple |
|---|---|---|
| Composant / layout | PascalCase.astro | `BookingButton.astro` |
| Page / contenu .md | kebab-case, sans accent (= URL) | `femmes-enceintes.md` |
| Module TS | camelCase.ts | `format.ts` |
| Classe CSS | BEM léger, scopée | `.header__nav`, `.btn--primary` |
| TODO | `TODO(qui|phase): action` | `TODO(cliente): tarifs` |

## Astro

- Données en haut dans le frontmatter `---` ; le template reste déclaratif (pas de logique lourde).
- Logique réutilisable → fonction pure dans `src/lib/`.
- Lister une collection : filtrer `!data.draft` et trier par `data.order`.
- Liens externes : `target="_blank" rel="noopener"` + mention « nouvel onglet » pour les lecteurs d'écran.

## CSS

- Mobile first ; media queries en `min-width`.
- Valeurs uniquement via `var(--token)` ; un token manque → l'ajouter dans `tokens.css`.
- Unités : `rem` pour les tailles, `clamp()` pour la typo fluide, pas de `px` sauf bordures.
- Pas de `!important`, pas d'`id` pour le style.

## HTML / accessibilité

- Un seul `<h1>` par page, hiérarchie de titres sans saut.
- Sections avec `aria-labelledby` vers leur titre.
- Toute image : `alt` descriptif (ou `alt=""` si purement décorative).

## Commits

Format : `type: description` en français. Types : `feat`, `fix`, `content`, `style`, `refactor`, `docs`, `chore`.
Exemple : `content: ajoute la page soins sportifs`.
