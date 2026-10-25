# SEO et contraintes légales

## SEO local

- Requêtes cibles : « ostéopathe Bayeux », « ostéopathe bébé / nourrisson Bayeux », « ostéopathe femme enceinte Bayeux », « ostéopathe sport Bayeux », « English-speaking osteopath Bayeux ».
- Une page par public = une requête ciblée (collection `soins`, champ `seoTitle`).
- `title` : mots-clés en premier, ≤ 55 caractères (Seo.astro ajoute « | Fanny Gerszkourez ») ; `description` 150-160 caractères, uniques par page.
- **NAP** (nom, adresse, téléphone) strictement identique à la fiche Google Business Profile et à Doctolib → toujours via `site.ts`.
- Balise robots : `max-image-preview:large, max-snippet:-1` (extraits longs autorisés, utiles aux réponses IA).
- hreflang fr / en / x-default entre l'accueil et `/en`.
- Maillage interne : chaque page soin renvoie vers les autres soins et la prise de RDV.
- Performances : Lighthouse mobile 99-100, images `astro:assets`, polices auto-hébergées.

## Données structurées (`src/lib/schema.ts`)

Un seul graphe JSON-LD par page, entités reliées par `@id` :

- `WebSite`, `MedicalBusiness` + `MedicalOrganization` (nom identique à la fiche Google, adresse, `geo`, horaires, tarif `makesOffer`, `isAcceptingNewPatients`, `sameAs` Doctolib + Google Maps, `ReserveAction` vers Doctolib) et `Person` (diplôme, RPPS, langues, `knowsAbout` = domaines d'expertise) : sur toutes les pages.
- `BreadcrumbList` sur les pages intérieures (prop `breadcrumbs` du layout), `Service` sur chaque page soin, `FAQPage` sur `/osteopathie`.
- Jamais d'`aggregateRating` (avis affichés par l'établissement : interdit par Google, voir `docs/GOOGLE.md`).
- Tester après mise en ligne : https://search.google.com/test/rich-results et https://validator.schema.org

## Référencement IA (ChatGPT, Perplexity, Gemini, Copilot, Claude)

Les assistants citent des sources **cohérentes, factuelles et faciles à extraire**.

- `/llms.txt` et `/llms-full.txt` (`src/lib/llms.ts`) : résumé Markdown du cabinet généré depuis `site.ts`, les soins, la FAQ et le parcours.
- `robots.txt` autorise explicitement les robots IA (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended…).
- FAQ pratique générée depuis les données (`src/lib/faq-pratique.ts`) : réponses courtes, chiffrées, sans ambiguïté.
- Faits clés visibles en texte sur les pages (tarif, horaires, adresse, langues), pas seulement dans des images.
- **La cohérence hors du site compte autant que le site** : les IA croisent les sources (Google, Doctolib, annuaires). Voir ci-dessous.

## À faire hors du site (plus fort impact sur le référencement local et IA)

1. **Google Business Profile** : catégorie principale « Ostéopathe », description, photos (façade, entrée), horaires identiques à `site.ts`, lien vers le site **et** lien de rendez-vous Doctolib, réponse aux avis.
2. **Corriger les annuaires incohérents** (ils induisent les IA en erreur) : doqi.fr affiche 9h-20h, lemedecin.fr une autre adresse (31 rue de Beauvais) → revendiquer / faire corriger les fiches.
3. **Bing Webmaster Tools + Bing Places** : Bing alimente ChatGPT Search et Copilot. Soumettre le sitemap.
4. **Google Search Console** : propriété du domaine, envoi du sitemap, suivi des requêtes.
5. **Apple Business Connect** (Plans, Siri) et **Doctolib** : ajouter le lien du site.
6. Avis : inviter les patients satisfaits à laisser un avis (bouton « Laisser un avis »), sans contrepartie.

Ces actions ne sont utiles qu'une fois le site sur son **domaine définitif** : la prévisualisation GitHub Pages est volontairement non indexée.

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
