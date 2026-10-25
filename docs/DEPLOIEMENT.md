# Déploiement

Deux cibles, même code (adresse et sous-chemin lus dans l'environnement, voir `astro.config.mjs`) :

| | GitHub Pages (actuel) | OVH (plus tard) |
|---|---|---|
| Workflow | `.github/workflows/pages.yml`, à chaque push sur `main` | `.github/workflows/deploy.yml`, manuel |
| Adresse | `https://bixboy.github.io/Osteopathe-WebSite/` | domaine définitif, à la racine |
| Indexation | **non** (`SITE_PREVIEW=true` : noindex + robots `Disallow`) | oui |

## GitHub Pages (prévisualisation)

Mise en place, une seule fois :

1. **Visibilité du dépôt** : GitHub Pages n'est disponible sur un dépôt **privé** qu'avec un
   abonnement payant (Pro, Team…). Compte gratuit : passer le dépôt en public
   (*Settings > General > Danger Zone > Change visibility*). Le site publié est public dans tous les cas.
2. **Activer Pages** : dépôt → *Settings > Pages* → *Build and deployment* → Source :
   **GitHub Actions**.
3. Pousser sur `main` → onglet *Actions* → « GitHub Pages » doit être vert → site en ligne à
   l'adresse ci-dessus (lien aussi affiché dans le résumé du job).

Pour qu'elle soit indexée (si elle devient le site officiel) : `SITE_PREVIEW: false` dans `pages.yml`.

## OVH (mise en ligne définitive)

```
Run workflow ──► deploy.yml : npm ci + npm run build, publie dist/ sur la branche `production`
                       │
                       ▼ webhook
               Hébergement web OVH (intégration Git, branche `production`)
```

On ne travaille **jamais** sur `production` : elle est réécrite à chaque déploiement.
Le dépôt est privé → adresse SSH + clé côté OVH.

1. **Domaine** : remplacer le domaine provisoire dans `astro.config.mjs`. Tant qu'il est là,
   `deploy.yml` échoue volontairement.
2. **Premier build** : onglet *Actions* → « Déploiement » → *Run workflow* → la branche
   `production` apparaît. (Pour automatiser ensuite : remettre `push: branches: [main]`.)
3. **OVH, dossier vide** : vider le dossier racine de l'hébergement (souvent `www/`).
4. **OVH, associer Git** : *Web Cloud > Hébergements > (l'hébergement) > Mes sites* → **⁝** →
   **Associer Git** : dépôt `git@github.com:bixboy/Osteopathe-WebSite.git`, branche `production`.
   Copier la **clé SSH** et l'**URL de webhook**, puis **Appliquez la configuration**.
5. **GitHub, clé SSH** : *Settings (profil) > SSH and GPG keys > New SSH key* → coller la clé.
6. **OVH** : **⁝** → **Déployer Git** → Confirmer. La colonne Git passe à **Activé**.
7. **GitHub, webhook** : dépôt → *Settings > Webhooks > Add webhook* : URL OVH,
   `application/json`, *Just the push event* ; vérifier une réponse **200**.
8. **HTTPS** : activer le certificat SSL gratuit dans l'espace client OVH (`.htaccess` redirige
   ensuite vers HTTPS).
9. **SEO** : suivre `docs/SEO.md § À faire hors du site` (Search Console, Bing, fiche Google…).

Référence : https://docs.ovhcloud.com/fr/guides/web-cloud/web-hosting/git-integration-webhosting

`public/.htaccess` (Apache OVH, ignoré par GitHub Pages) : page 404, HTTPS, cache long pour
`/_astro/`, compression, en-têtes de sécurité. Les adresses en dossier (`/a-propos/`) sont servies
nativement, sans réécriture.

## En cas de problème

- Liens cassés uniquement sur GitHub Pages : un lien écrit `href="/..."` au lieu de `link()`
  (`src/lib/paths.ts`).
- Action « Déploiement » rouge « Domaine provisoire » : OVH, étape 1.
- Git « Erreur » côté OVH : *⁝ > Informations du dernier déploiement* ; souvent clé SSH absente
  de GitHub ou dossier non vide.
- Build local sous Git Bash avec `BASE_PATH=/...` : préfixer de `MSYS_NO_PATHCONV=1`
  (sinon Git Bash transforme le chemin en `C:/Program Files/Git/...`).
