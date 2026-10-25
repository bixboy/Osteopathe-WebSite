---
name: verifier
description: Contrôle qualité avant livraison ou commit (build, conventions, contenu légal, TODO restants).
---

1. `npm run build` : doit finir avec 0 erreur et 0 warning.
2. Rechercher (Grep, pas de lecture intégrale) dans `src/` :
   - couleurs en dur : `#[0-9a-fA-F]{3,6}` hors `tokens.css`
   - infos cabinet en dur : `Saint-Quentin|14400|doctolib\.fr` hors `src/data/site.ts`
   - vocabulaire interdit : `guéri|soigne|traite|docteur` dans `src/content/`
   - restes : `TODO|BROUILLON`
3. Vérifier que chaque page de `dist/` a un `<title>` et une `meta description` uniques.
4. Rapport court : ✅ / ❌ par point, liste des TODO restants groupés par responsable.
