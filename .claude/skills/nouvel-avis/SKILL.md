---
name: nouvel-avis
description: Ajoute un ou plusieurs avis Google recopiés à la main dans src/content/avis/, et met à jour la note globale si fournie. Utiliser quand l'utilisateur colle des avis Google.
---

1. Lire uniquement `src/content/avis/_modele.md`.
2. Pour chaque avis : créer `src/content/avis/<prenom-nom-kebab-sans-accent>.md`.
   - `author` : prénom + initiale du nom (« Franck S. ») ; pseudonyme gardé tel quel.
   - `rating` : 1 à 5 ; `visited` : mois de « Visité en … » au format `AAAA-MM`
     (sans année = année en cours).
   - Corps : texte **mot pour mot**, sans corriger fautes ni émojis. Valeurs texte entre guillemets.
   - `draft: true` si l'avis décrit la guérison d'un trouble précis ou un résultat chiffré
     (« en une séance », « la douleur a disparu en 2 jours ») : docs/GOOGLE.md § Règles.
3. Avis tronqué (« … Plus ») : ne pas le créer, demander le texte complet. Ne rien inventer.
4. Si une nouvelle note globale / un nombre d'avis est donné : mettre à jour `rating`,
   `ratingCount` et `ratingCheckedAt` (date du jour) dans `site.google` de `src/data/site.ts`.
5. `npm run build`, puis lister les avis ajoutés en une ligne chacun.
