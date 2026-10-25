/**
 * Formation et expérience de la praticienne (source : fiche Doctolib, 2026-10-25).
 * Affichées sur /a-propos, de la plus récente à la plus ancienne.
 */

export interface ParcoursItem {
  /** Année ou période, ex. "2016" ou "2013 – 2015". */
  period: string;
  title: string;
  /** Organisme, lieu ou service. */
  place?: string;
  /** Diplôme principal (repris dans les données structurées de la praticienne). */
  diploma?: boolean;
}

export const formations: ParcoursItem[] = [
  { period: '2022', title: 'Niveau 1+ d’approche tissulaire', place: 'Alain Decouvelaere' },
  { period: '2022', title: 'Niveau 1 d’approche tissulaire', place: 'Pierre Tricot' },
  { period: '2016', title: 'Formation en posturologie', place: 'Institut Supérieur d’Ostéopathie Paris (ISO-Paris)' },
  {
    period: '2016',
    title: 'Formation complémentaire en périnatalité : nourrissons et femmes en période post-partum',
    place: 'Ostéonat',
  },
  {
    period: '2015',
    title: 'Diplôme d’ostéopathie (D.O.)',
    place: 'Institut Supérieur d’Ostéopathie Paris (ISO-Paris)',
    diploma: true,
  },
];

export const experiences: ParcoursItem[] = [
  { period: 'Depuis 2017', title: 'Cabinet', place: 'Bayeux' },
  { period: '2015 – 2017', title: 'Cabinet', place: 'Morsang-sur-Seine' },
  { period: '2013 – 2015', title: 'Assistante en chirurgie orthopédique', place: 'Hôpital Saint-Camille, Bry-sur-Marne' },
  { period: '2013 – 2015', title: 'Assistante associée en maternité', place: 'Clinique Ambroise Paré, Bourg-la-Reine' },
  { period: '2013 – 2015', title: 'Assistante aux urgences traumatiques', place: 'Hôpital Saint-Louis, Paris' },
];
