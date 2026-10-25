# Intégrations Google (carte + avis)

Identifiants de la fiche dans `src/data/site.ts` → `site.google` (Place ID, lien, URL d'intégration).

## Carte (`src/components/GoogleMap.astro`)

- Chargée **uniquement au clic** (« Afficher la carte ») : l'iframe Google dépose des cookies,
  donc pas de chargement sans action de l'utilisateur (RGPD / recommandations CNIL).
- Aucune clé API nécessaire. Seul JavaScript du site : ~10 lignes pour créer l'iframe au clic.
- Si la carte affiche le mauvais lieu : Google Maps → fiche du cabinet → Partager →
  Intégrer une carte → copier l'URL du `src` dans `site.google.embedUrl`.

## Avis (`src/content/avis/` + `src/components/GoogleReviews.astro`)

**Aucune API, aucune clé, aucun coût.** Tout est recopié à la main depuis la fiche Google :

- Note globale et nombre d'avis : `site.google.rating` / `ratingCount` dans `src/data/site.ts`
  (+ `ratingCheckedAt` = date du relevé). À mettre à jour de temps en temps.
- Avis : 1 fichier `src/content/avis/<prenom-nom>.md` par avis, sur le modèle de `_modele.md`
  (`author`, `rating`, `visited`, `draft`, texte dans le corps). Skill `/nouvel-avis`.
- Affichage : de la visite la plus récente à la plus ancienne ; `draft: true` = masqué. Sans aucun avis, la section affiche la note et
  les liens « Voir tous les avis » / « Laisser un avis ».

## Règles

- Mode de sélection et ordre d'affichage indiqués sous les avis (art. L111-7-2 et D111-17
  du Code de la consommation) ; date de chaque avis affichée.
- Recopier les avis **mot pour mot** (même les fautes), avec l'auteur et la date réels.
  Ne jamais en inventer, en reformuler ni en fusionner.
- La mention sous les avis indique qu'il s'agit d'une sélection du cabinet : la garder.
- Jamais d'avis tronqué (« … Plus ») : reproduire l'avis en entier ou ne pas le publier.
- Noms abrégés (prénom + initiale) : les avis évoquent la santé des auteurs (RGPD).
- Avis décrivant la guérison d'un trouble précis ou un résultat chiffré → `draft: true` :
  publiés par la praticienne, ils vaudraient allégation thérapeutique (docs/SEO.md).
  La décision finale de les afficher revient à la cliente.
- Ne pas reprendre de texte obtenu via l'API Google Places (stockage interdit par ses conditions).
- Pas de balisage `aggregateRating` dans le JSON-LD : Google l'interdit pour des avis tiers
  affichés par l'établissement lui-même (avis « auto-promotionnels »).
- Pas de photo de profil des auteurs : elle serait chargée depuis les serveurs de Google
  par le navigateur du visiteur. On affiche des initiales.
