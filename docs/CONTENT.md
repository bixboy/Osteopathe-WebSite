# Contenu cliente : faits et statut de validation

Statuts : ✅ validé par la cliente · ✅ Doctolib = renseigné par la cliente sur sa fiche Doctolib · ⚠️ trouvé en ligne, à confirmer · ❌ manquant

Sources des ⚠️ : annuaires lemedecin.fr et doqi.fr (consultés le 25/10/2026), qui se contredisent par endroits.
La page Doctolib : https://www.doctolib.fr/osteopathe/bayeux/fanny-gerszkourez

| Info | Valeur actuelle | Statut |
|---|---|---|
| Nom | Fanny Gerszkourez | ⚠️ (orthographe à confirmer) |
| Titre | Ostéopathe D.O. | ⚠️ |
| Adresse | 31 bis rue Saint-Quentin, 14400 Bayeux | ✅ Doctolib |
| Accès | 1er étage avec ascenseur, parking gratuit | ⚠️ |
| Téléphone | — | ❌ |
| E-mail | — | ❌ |
| Horaires | Lun-Ven 9h-12h et 13h-19h, Sam 9h-12h | ✅ Doctolib |
| Nouveaux patients | Acceptés (`acceptsNewPatients`) | ✅ Doctolib (peut changer) |
| Tarifs | 55 € toutes consultations (1re ou suivi, tous publics) ; non remboursé AM ; carte Vitale non acceptée | ✅ Doctolib |
| Paiement | Espèces, chèque, CB | ✅ Doctolib |
| Langues | Français, anglais | ✅ Doctolib |
| Formation | Voir `src/data/parcours.ts` (D.O. ISO-Paris 2015, périnatalité Ostéonat 2016, posturologie 2016, approche tissulaire 2022) | ✅ Doctolib |
| Parcours | Voir `src/data/parcours.ts` (hôpitaux 2013-2015, Morsang-sur-Seine 2015-2017, Bayeux depuis 2017) | ✅ Doctolib |
| Domaines d'expertise | Enfant, cervico-crânien, sportif, prénatal, tissulaire (`site.expertises`) | ✅ Doctolib |
| Bâtiment | Centre de Spécialités Médicales Saint-Quentin | ✅ photo de l'entrée |
| SIRET | — | ❌ |
| N° RPPS | 10010121324 | ✅ fourni |
| Fiche Google | https://maps.app.goo.gl/zqFMnabszfATfBSc8 (Place ID `ChIJ_UfrdlqrC0gRpG5_bH-cxnc`, confirmé via l'API) | ✅ fourni |
| Coordonnées GPS | 49.2810461, -0.7047485 (fiche Google) | ✅ |
| Photos | Portrait (selfie, 499×700), façade et entrée du bâtiment → `src/assets/images/` | ✅ fournies (portrait pro conseillé) |
| Logo | — | ❌ |

## Questionnaire de lancement (à poser à la cliente)

1. Confirmer chaque ligne ⚠️ du tableau ci-dessus.
2. Quels publics veut-elle mettre en avant (ordre de priorité) ? En ajouter ou en retirer ?
3. Son approche en 3 phrases : qu'est-ce qui la distingue ?
4. Tarifs (adulte, enfant, nourrisson, domicile ?) et durée d'une séance.
5. Consultations à domicile ? Urgences ? Délai habituel de rendez-vous ?
6. Rédige-t-elle les textes ou faut-il les rédiger (puis lui faire valider) ?
7. Photos disponibles ? D'accord pour un shooting ?
8. Couleurs, ambiance, sites qu'elle aime ou n'aime pas.
9. Domaine : en a-t-elle déjà un ? Qui doit en être propriétaire (elle) ?
10. Fiche Google Business Profile existante ? Accès ?
11. Veut-elle un formulaire de contact, ou uniquement Doctolib et le téléphone ?
12. Une version anglaise l'intéresse-t-elle ?

> Une fois une info validée : mettre à jour `src/data/site.ts`, retirer le `TODO(cliente)`, passer le statut à ✅.
