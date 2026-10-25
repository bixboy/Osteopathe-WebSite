# SEO et contraintes légales

## SEO local

- Requêtes cibles : « ostéopathe Bayeux », « ostéopathe nourrisson Bayeux », « ostéopathe femme enceinte Bayeux », « ostéopathe sport Bayeux », + communes voisines (Port-en-Bessin, Saint-Vigor-le-Grand, Arromanches…).
- Une page par public = une requête ciblée (d'où la collection `soins`).
- `<title>` ≤ 60 caractères, `description` 150-160 caractères, uniques par page.
- **NAP** (nom, adresse, téléphone) strictement identique à la fiche Google Business Profile et à Doctolib → toujours via `site.ts`.
- JSON-LD : `MedicalBusiness` sur toutes les pages (avec `geo`), `FAQPage` sur `/osteopathie`. Jamais d'`aggregateRating` (voir `docs/GOOGLE.md`).
- Maillage interne : chaque page soin renvoie vers la prise de RDV et vers les infos pratiques.
- Performances : 0 JS, images `astro:assets` (AVIF/WebP, dimensions explicites), polices auto-hébergées.

## Contraintes légales (santé)

L'ostéopathe n'est pas médecin : le contenu ne doit jamais laisser croire le contraire.

- **Pas d'allégation thérapeutique** : ne pas écrire « soigne », « guérit », « traite la maladie X ». Préférer « accompagne », « peut soulager », « troubles fonctionnels ».
- Ne pas citer de pathologies médicales comme indications (ex. otites, reflux pathologique, scoliose « soignée »).
- Rappeler que l'ostéopathie ne remplace pas un suivi médical.
- **Nourrissons de moins de 6 mois** : manipulations du crâne, de la face et du rachis seulement après attestation médicale de non-contre-indication (décret n° 2007-435, art. 3). Le mentionner sur la page nourrissons.
- Pas de faux avis ni de témoignages fabriqués ; pas de comparaison avec d'autres praticiens.
- Titre : « Ostéopathe D.O. », jamais « Docteur ».

## Mentions obligatoires (LCEN + RGPD)

Page `/mentions-legales` : identité de l'éditeur, adresse, SIRET, n° ADELI/RPPS, directeur de publication, hébergeur (nom, adresse, téléphone), crédits photos.
Page `/confidentialite` : aucune donnée collectée ni cookie tant qu'il n'y a ni formulaire ni analytics. **Toute évolution (formulaire, carte intégrée, statistiques) impose de la mettre à jour, et éventuellement d'ajouter un bandeau de consentement.**
