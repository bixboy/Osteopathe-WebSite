---
name: nouveau-soin
description: Ajoute une page de soin / public (ex. seniors, femmes enceintes) dans la collection soins. Utiliser quand on demande une nouvelle spécialité ou un nouveau public.
---

1. Lire `src/content.config.ts` (schéma `soins`) et un exemple : `src/content/soins/sportifs.md`. Rien d'autre.
2. Créer `src/content/soins/<slug-kebab-sans-accent>.md` :
   - `title`, `description` (150-160 car., contient « Bayeux »), `summary` (1 phrase), `order` (suivant).
   - Valeurs texte entre guillemets.
   - Corps : intro courte, `## Quand consulter ?` (liste), éventuel `## Bon à savoir`.
3. Respecter `docs/SEO.md § Contraintes légales` : aucune promesse de guérison, pas de pathologie médicale.
4. Si le texte n'est pas fourni par la cliente : ajouter `<!-- BROUILLON : texte à valider avec la cliente -->`.
5. `npm run build` puis résumer en 2 lignes.
