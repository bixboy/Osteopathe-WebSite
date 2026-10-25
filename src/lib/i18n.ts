/**
 * Le site est en français ; seule la page /en existe en anglais (patients anglophones).
 * Ce fichier regroupe les libellés partagés par le layout dans les deux langues.
 */
export type Lang = 'fr' | 'en';

export const ui = {
  fr: { skipLink: 'Aller au contenu', bookShort: 'Prendre RDV' },
  en: { skipLink: 'Skip to content', bookShort: 'Book online' },
} satisfies Record<Lang, Record<string, string>>;

/** Traductions des valeurs de site.ts (paiements, langues) pour la page /en. */
const EN_VALUES: Record<string, string> = {
  Espèces: 'cash',
  Chèque: 'cheque',
  'Carte bancaire': 'card',
  Français: 'French',
  Anglais: 'English',
};

/** Valeur absente du dictionnaire : renvoyée telle quelle (à ajouter ci-dessus). */
export function toEnglish(value: string): string {
  return EN_VALUES[value] ?? value;
}
