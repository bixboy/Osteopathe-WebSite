# Déploiement (GitHub → OVH)

```
push sur main ──► GitHub Action (.github/workflows/deploy.yml)
                    npm ci + npm run build
                    publie dist/ sur la branche `production`
                         │
                         ▼ webhook
                  Hébergement web OVH (intégration Git, branche `production`)
```

On ne travaille **jamais** sur `production` : elle est réécrite à chaque déploiement.
Le dépôt GitHub `bixboy/Osteopathe-WebSite` est privé → adresse SSH + clé côté OVH.

## Mise en place (une seule fois)

1. **Domaine** : remplacer `site` dans `astro.config.mjs` par le vrai domaine
   (ex. `https://www.mon-domaine.fr`). Tant que c'est le domaine provisoire, l'Action échoue
   volontairement.
2. **Premier déploiement** : pousser sur `main` → onglet **Actions** du dépôt : le job
   « Déploiement » doit être vert → la branche `production` apparaît.
3. **OVH, dossier vide** : le dossier racine de l'hébergement (souvent `www/`) doit être vide
   (supprimer la page d'attente d'OVH via FTP ou le gestionnaire de fichiers).
4. **OVH, associer Git** : *Web Cloud > Hébergements > (l'hébergement) > Mes sites* →
   **⁝** à droite du site → **Associer Git** :
   - Dépôt : `git@github.com:bixboy/Osteopathe-WebSite.git`
   - Branche : `production`
   - Copier la **clé SSH** affichée et la **URL de webhook**, puis **Appliquez la configuration**.
5. **GitHub, clé SSH** : *Settings (du profil) > SSH and GPG keys > New SSH key* → titre
   « OVHcloud », type *Authentication key*, coller la clé.
6. **OVH, premier déploiement** : *Mes sites* → **⁝** → **Déployer Git** → Confirmer.
   La colonne Git doit passer à **Activé**.
7. **GitHub, webhook** (déploiement automatique) : dépôt → *Settings > Webhooks > Add webhook* :
   Payload URL = URL de webhook OVH, Content type `application/json`, *Just the push event*.
   Vérifier dans *Recent Deliveries* : réponse **200**.
8. **HTTPS** : activer le certificat SSL gratuit (Let's Encrypt) de l'hébergement dans
   l'espace client OVH. `.htaccess` redirige ensuite tout le trafic vers HTTPS.

Référence : https://docs.ovhcloud.com/fr/guides/web-cloud/web-hosting/git-integration-webhosting

## Publier une modification

`git push` sur `main` → l'Action construit et publie → le webhook déclenche le déploiement OVH
(quelques minutes). Relancer à la main : onglet *Actions* → « Déploiement » → *Run workflow*.

## Fichiers concernés

- `.github/workflows/deploy.yml` : build + publication sur `production` (historique continu,
  pas de push forcé : OVH récupère la branche par un simple pull).
- `public/.htaccess` : Apache OVH — adresses sans `.html` ni slash final, page 404, HTTPS,
  cache long pour `/_astro/`, compression, en-têtes de sécurité.

## En cas de problème

- Action rouge « Domaine provisoire » : étape 1.
- Git « Erreur » côté OVH : *⁝ > Informations du dernier déploiement* ; souvent clé SSH absente
  de GitHub ou dossier non vide.
- Page 404 ou 403 sur `/soins` : vérifier que `.htaccess` est bien à la racine du dossier publié.
