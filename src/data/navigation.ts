export interface NavItem {
  label: string;
  href: string;
}

/** Menu principal. Ajouter une page = ajouter une entrée ici. */
export const mainNav: NavItem[] = [
  { label: 'Accueil', href: '/' },
  { label: 'L’ostéopathie', href: '/osteopathie' },
  { label: 'Soins', href: '/soins' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Infos pratiques', href: '/infos-pratiques' },
];

export const footerNav: NavItem[] = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Confidentialité', href: '/confidentialite' },
];
