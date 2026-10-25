# Design

> Statut : **première version** en place, à valider avec la cliente (palette, typos, ton).

## Cible et objectif

- Visiteurs : parents de nourrissons, femmes enceintes, sportifs, actifs, majoritairement **sur mobile**, souvent depuis Google Maps ou une recherche « ostéopathe Bayeux ».
- Objectif n°1 du site : **clic sur « Prendre rendez-vous »** (Doctolib). Objectif n°2 : appel téléphonique.
- Le bouton RDV doit être visible sans défiler, sur toutes les pages.

## Ton

Chaleureux, rassurant, professionnel. Vouvoiement. Phrases courtes, vocabulaire simple, sans jargon.
Pas de superlatifs ni de promesses (voir contraintes légales dans `docs/SEO.md`).

## Identité visuelle (v1)

- Ambiance : douceur, nature, sérénité. Fond crème, vert sauge (`--color-primary`), sable/cuivre (`--color-accent`).
- Titres : Fraunces (serif douce, italique pour les mots mis en valeur). Texte : Inter.
- Formes organiques arrondies (blobs) en décor ; cartes blanches à bord fin, ombre au survol.
- Rythme : sections alternées crème / sauge clair (`.section--alt`), bandeau vert d'appel à l'action, footer vert foncé.
- Placeholders à remplacer par de vraies photos : forme du hero, portrait « À propos », carte d'accès.

## Composants d'UI

`Button`, `BookingButton`, `Logo`, `Header`, `Footer`, `PageHeader` (en-tête des pages intérieures), `SectionHeader` (eyebrow + h2 + lead), `SoinCard`/`SoinGrid`, `SoinIcon`, `PracticalInfo`, `SessionSteps`, `CtaBand`, `StarRating`, `GoogleReviews`, `GoogleMap`, `TrustBar` (points forts sous le hero), `MobileBookingBar` (barre RDV fixe sur mobile), `OpenStatus` (badge Ouvert / Fermé). `PracticalInfo`, `SessionSteps`, `CtaBand`, `BookingButton` acceptent une langue ou un libellé pour la page /en.

## Animations

Sans JavaScript, utilitaires de `global.css` : `.enter` (au chargement, `style="--delay: n"`), `.reveal` / `.reveal-children` (au défilement, CSS scroll-driven animations). Toujours désactivées si `prefers-reduced-motion`. Animer `translate`/`opacity`, jamais `transform` (réservé aux effets de survol). Réutiliser avant d'en créer un nouveau.

## Règles

- Contraste texte/fond ≥ 4.5:1 (AA), ≥ 3:1 pour les gros titres et éléments d'interface.
- Zones cliquables ≥ 44×44 px.
- Respect de `prefers-reduced-motion`.
- Largeur de texte ≤ 42rem (`.prose`).
