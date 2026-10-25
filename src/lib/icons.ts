/**
 * Clés d'icônes autorisées pour le champ `icon` des soins.
 * Nouvelle clé : l'ajouter ici ET dans la table de src/components/SoinIcon.astro.
 */
export const soinIconKeys = ['baby', 'pregnancy', 'sport', 'adult', 'jaw'] as const;

export type SoinIconKey = (typeof soinIconKeys)[number];
