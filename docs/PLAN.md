# Feuille de route

Légende : `[x]` fait · `[ ]` à faire · 👤 dépend de la cliente

## Phase 0 – Cadrage

- [ ] 👤 Rendez-vous de lancement : remplir le questionnaire de `docs/CONTENT.md`
- [ ] 👤 Valider l'arborescence ci-dessous
- [ ] 👤 Devis / périmètre signé (nb de pages, rédaction incluse ou non, maintenance)
- [ ] Choisir le nom de domaine (ex. `osteopathe-bayeux-gerszkourez.fr`) et vérifier sa disponibilité

Arborescence proposée :

```
/                     Accueil : accroche, CTA Doctolib, « Pour qui ? », infos pratiques
/osteopathie          L'ostéopathie, déroulé d'une séance, FAQ
/soins                Liste des publics
/soins/<public>       Une page par public (nourrissons, femmes enceintes, sportifs, adultes, ATM)
/a-propos             Parcours, formations, approche, photo
/infos-pratiques      Adresse, accès, carte, horaires, tarifs, paiement
/mentions-legales     (noindex)
/confidentialite      (noindex)
```

## Phase 1 – Fondations techniques ✅

- [x] Projet Astro 7 + TypeScript strict + sitemap
- [x] Source de vérité `src/data/site.ts`, content collections `soins` et `faq`
- [x] Design tokens + CSS global minimal
- [x] `BaseLayout` : SEO, Open Graph, JSON-LD `MedicalBusiness`, lien d'évitement
- [x] Squelette de toutes les pages, `robots.txt` généré, sitemap sans pages noindex
- [x] Fichiers IA : `AGENTS.md`, `CLAUDE.md`, `docs/`, skills, permissions
- [ ] `git init` + premier commit + dépôt GitHub privé

## Phase 2 – Design

- [ ] 👤 Recueillir les goûts de la cliente (3 sites qu'elle aime / n'aime pas)
- [x] Palette v1 sauge / sable / crème → `tokens.css`
- [ ] 👤 Validation de la direction visuelle par la cliente
- [ ] Vérifier les contrastes AA de la palette finale
- [x] Typographies auto-hébergées (Fraunces + Inter via fontsource)
- [x] Favicon, icône Apple et image de partage générés au build (monogramme « FG »)
- [ ] 👤 Logo de la cliente (s'il existe) pour remplacer le monogramme
- [x] Design responsive de toutes les pages (vérifié 390px et 1440px)
- [x] Menu mobile (API Popover, sans JS)
- [x] Composants : Hero, cartes soins, étapes de séance, bandeau CTA, infos pratiques, FAQ
- [x] Animations sans JS : entrée du hero, apparitions au défilement, forme qui ondule, survols, ombre du header
- [x] Bandeau de confiance sous le hero + barre RDV fixe sur mobile

## Phase 3 – Contenu

- [x] Photos intégrées : portrait (À propos), façade et entrée (Infos pratiques)
- [ ] 👤 Portrait professionnel en meilleure qualité + photo de la salle de soin (pour le hero)
- [ ] Rédaction / relecture des 5 pages soins (supprimer les `<!-- BROUILLON -->`)
- [ ] Page L'ostéopathie : définition, déroulé d'une séance, contre-indications
- [x] Page À propos : formations, expérience, domaines d'expertise (Doctolib)
- [ ] 👤 Texte de présentation / approche dans ses mots
- [x] Horaires, paiement, langues, nouveaux patients confirmés via Doctolib → `site.ts`
- [x] FAQ pratique générée depuis `site.ts` (adresse, horaires, paiement, langues, nouveaux patients)
- [x] Tarifs (55 €), RPPS, carte Vitale → `site.ts`
- [ ] 👤 Téléphone, SIRET → `site.ts`
- [x] Carte Google Maps chargée au clic (page Infos pratiques)
- [x] Section avis Google (accueil), saisie manuelle sans API (note 5,0 ★ · 48 avis relevée le 2026-10-25)
- [x] 9 avis complets saisis (4 affichés, 5 en `draft` pour allégations de résultat)
- [ ] 👤 Cliente : valider la sélection d'avis, et fournir le texte complet des avis tronqués si souhaité
- [ ] 👤 Supprimer la clé API Google devenue inutile (Google Cloud → Identifiants)
- [ ] Vérifier dans un navigateur que la carte intégrée pointe bien sur la fiche du cabinet
- [ ] Enrichir la FAQ (6-10 questions réellement posées par les patients)

## Phase 4 – Qualité, SEO, légal

- [ ] Mentions légales complètes + politique de confidentialité (voir `docs/SEO.md`)
- [ ] Relecture « contraintes légales santé » de tout le contenu
- [ ] Lighthouse mobile ≥ 95 sur les 4 axes, toutes pages
- [ ] Accessibilité : navigation clavier, contrastes, `alt`, titres hiérarchisés
- [ ] Valider le JSON-LD (Rich Results Test), titres et descriptions uniques
- [ ] Test sur vrais appareils : iPhone Safari, Android Chrome, desktop

## Phase 5 – Mise en ligne

- [ ] Achat du domaine (au nom de la cliente) + `site` dans `astro.config.mjs`
- [x] Hébergement OVH via GitHub : Action + branche `production` (procédure : `docs/DEPLOIEMENT.md`)
- [x] En-têtes de sécurité, redirection HTTPS, adresses propres (`public/.htaccess`)
- [ ] 👤 Associer Git dans l'espace OVH, clé SSH sur GitHub, webhook, certificat SSL
- [ ] Google Search Console + envoi du sitemap
- [ ] 👤 Fiche Google Business Profile : lien vers le site, NAP identique à `site.ts`
- [ ] Mettre à jour le lien « site web » sur Doctolib et les annuaires
- [ ] Livraison : document de passation à la cliente

## Phase 6 – Évolutions possibles (hors périmètre initial)

- [ ] Collection `actualites` (blog / conseils) pour le SEO longue traîne
- [ ] Version anglaise (la cliente parle anglais ; Bayeux est très touristique)
- [ ] Mesure d'audience sans cookie (Plausible, Umami) si demandée
- [ ] Bandeau d'information (congés, fermeture exceptionnelle) piloté depuis `site.ts`

## Fait hors plan initial

- [x] Page anglaise `/en` (patients anglophones), lien de langue dans le header, balises hreflang
- [x] Badge « Ouvert / Fermé » (heure de Paris, calculé dans le navigateur)
- [x] Audit Lighthouse mobile : 100 / 100 / 100 / 100 sur accueil, /en, soin, infos pratiques
- [x] Passe mobile : carrousels (soins, avis), menu animé, frise des étapes, bandeau 2×2, barre RDV au défilement, retours tactiles
- [x] Correctif : les animations au défilement ne s'appliquaient pas en production (minification)
- [x] Aucun débordement horizontal à 360 et 390 px sur les 11 pages ; Lighthouse mobile 99-100 partout
- [x] Déploiement préparé : GitHub Action → branche `production`, `.htaccess` Apache, hébergeur dans les mentions légales
- [ ] 👤 Domaine définitif dans `astro.config.mjs`, puis étapes de `docs/DEPLOIEMENT.md`
- [ ] 👤 Téléphone de l'hébergeur (LCEN) dans `site.legal.host.phone`
- [x] GitHub Pages : workflow `pages.yml`, liens via `link()`, adresses en dossier, prévisualisation non indexée
- [x] SEO / IA : graphe JSON-LD relié, Service + fil d'Ariane, titres orientés recherche, robots IA, `llms.txt`, FAQ enrichie, tarif visible
- [ ] 👤 Activer GitHub Pages (Settings > Pages > GitHub Actions) ; dépôt public si compte gratuit
- [ ] 👤 Actions hors site : `docs/SEO.md § À faire hors du site` (après mise en ligne sur le domaine)
