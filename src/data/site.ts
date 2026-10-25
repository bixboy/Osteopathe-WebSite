/**
 * Source de vérité unique pour toutes les infos du cabinet.
 * Ne jamais recopier ces valeurs en dur ailleurs : importer `site`.
 * Statut de validation de chaque info : voir docs/CONTENT.md.
 */

export type Day =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface OpeningSlot {
  days: Day[];
  opens: string; // "HH:MM"
  closes: string; // "HH:MM"
}

export const site = {
  name: 'Fanny Gerszkourez',
  title: 'Fanny Gerszkourez – Ostéopathe D.O. à Bayeux',
  description:
    'Cabinet d’ostéopathie à Bayeux : nourrissons, femmes enceintes, sportifs et adultes. Prise de rendez-vous en ligne sur Doctolib.',
  locale: 'fr-FR',
  profession: 'Ostéopathe D.O.',

  contact: {
    phone: '', // TODO(cliente): numéro du cabinet, format "02 31 00 00 00"
    email: '', // TODO(cliente): optionnel
  },

  address: {
    street: '31 bis rue Saint-Quentin',
    postalCode: '14400',
    city: 'Bayeux',
    region: 'Normandie',
    country: 'FR',
    /** Nom du bâtiment (source : panneau visible sur la photo de l'entrée). */
    building: 'Centre de Spécialités Médicales Saint-Quentin',
    /** Infos d'accès (source : annuaires en ligne) — TODO(cliente): à confirmer. */
    access: ['1er étage avec ascenseur', 'Parking gratuit à proximité'],
    geo: { lat: 49.2810461, lng: -0.7047485 }, // source : fiche Google Maps
  },

  /** Fiche Google Business Profile du cabinet. */
  google: {
    placeId: 'ChIJ_UfrdlqrC0gRpG5_bH-cxnc',
    /** Lien de partage de la fiche (bouton « Partager » dans Google Maps). */
    mapsUrl: 'https://maps.app.goo.gl/zqFMnabszfATfBSc8',
    /**
     * src de l'iframe. Pour le régénérer : Google Maps > fiche du cabinet > Partager >
     * Intégrer une carte > copier uniquement l'URL du src.
     */
    embedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1300!2d-0.7047485!3d49.2810461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480bab5a76eb47fd%3A0x77c69c7f6c7f6ea4!2sCabinet%20d%27ost%C3%A9opathie%20Fanny%20Gerszkourez!5e0!3m2!1sfr!2sfr',
    /** Note affichée sur la fiche Google, recopiée à la main (pas d'API). */
    rating: 5,
    ratingCount: 48,
    /** Date du dernier relevé de la note : la mettre à jour à chaque modification. */
    ratingCheckedAt: '2026-10-25',
  },

  // Source : fiche Doctolib (relevé du 2026-10-25). Plusieurs créneaux possibles pour les mêmes jours.
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '12:00' },
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '13:00', closes: '19:00' },
    { days: ['Saturday'], opens: '09:00', closes: '12:00' },
  ] satisfies OpeningSlot[],

  /** Source : fiche Doctolib (2026-10-25). Peut changer : à vérifier avant chaque mise en ligne. */
  acceptsNewPatients: true,

  booking: {
    url: 'https://www.doctolib.fr/osteopathe/bayeux/fanny-gerszkourez',
    label: 'Prendre rendez-vous sur Doctolib',
  },

  payment: ['Espèces', 'Chèque', 'Carte bancaire'],

  /** Tarifs (source : Doctolib, 2026-10-25). Un tarif différent = une entrée de plus. */
  prices: [
    {
      label: 'Consultation d’ostéopathie',
      detail: 'Première consultation ou suivi : adultes, enfants, nourrissons, femmes enceintes et sportifs',
      amount: 55,
    },
  ],
  /** Carte Vitale acceptée ? (source : Doctolib) */
  acceptsCarteVitale: false,

  /** Domaines d’expertise affichés sur Doctolib (2026-10-25). */
  expertises: [
    'Ostéopathie de l’enfant',
    'Ostéopathie des troubles fonctionnels cervico-crâniens',
    'Ostéopathie du sportif',
    'Ostéopathie prénatale',
    'Ostéopathie tissulaire',
  ],
  languages: ['Français', 'Anglais'],

  // Mentions légales (obligatoires) — TODO(cliente)
  legal: {
    siret: '',
    rppsOrAdeli: '10010121324', // n° RPPS (source : Doctolib)
    host: { name: '', address: '' }, // hébergeur
  },
} as const;

export type Site = typeof site;
