import { formations } from '../data/parcours';
import { site } from '../data/site';
import { formatList, formatOpeningHours, formatPrice } from './format';

/** « Diplôme d’ostéopathie (D.O.) » -> « diplôme d’ostéopathie (D.O.) » (sigles conservés) */
const lowerFirst = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * Questions pratiques générées depuis src/data/site.ts : elles restent à jour toutes seules.
 * Ne pas les recopier dans src/content/faq/ (règle « aucune info du cabinet en dur »).
 */
export function getPracticalFaq(): FaqItem[] {
  const { address, payment, languages, acceptsNewPatients, prices, acceptsCarteVitale } = site;
  const priceText = prices.map(({ label, detail, amount }) => `${label} : ${formatPrice(amount)} (${detail.toLowerCase()})`).join(' ; ');
  const items: FaqItem[] = [
    {
      question: 'Où se trouve le cabinet ?',
      answer: `Le cabinet se situe dans le ${address.building}, ${address.street}, ${address.postalCode} ${address.city}.`,
    },
    {
      question: 'Quels sont les horaires d’ouverture ?',
      answer: `${formatOpeningHours(site.openingHours).join(' ; ')}. Les rendez-vous se prennent en ligne sur Doctolib.`,
    },
    {
      question: 'Combien coûte une consultation ?',
      answer: `${priceText}. La consultation n’est pas remboursée par l’Assurance Maladie${acceptsCarteVitale ? '' : ' et la carte Vitale n’est pas acceptée'}, mais de nombreuses mutuelles la prennent en charge en tout ou partie.`,
    },
    {
      question: 'Quels moyens de paiement sont acceptés ?',
      answer: `Les moyens de paiement acceptés sont : ${formatList(payment)}.`,
    },
    {
      question: 'Dans quelles langues se déroulent les consultations ?',
      answer: `Les consultations peuvent se dérouler en ${formatList(languages)}.`,
    },
  ];

  items.push({
    question: 'Comment prendre rendez-vous ?',
    answer: `Les rendez-vous se prennent en ligne sur Doctolib, à tout moment : ${site.booking.url}`,
  });

  const diploma = formations.find((formation) => formation.diploma);
  if (diploma) {
    const others = formations.filter((formation) => !formation.diploma).map(({ title, period }) => `${lowerFirst(title)} (${period})`);
    items.push({
      question: `Quelle est la formation de ${site.name} ?`,
      answer: `${site.name} est titulaire du ${lowerFirst(diploma.title)} de l’${diploma.place} (${diploma.period}). Elle a complété sa formation par : ${others.join(', ')}.`,
    });
  }

  if (acceptsNewPatients) {
    items.push({
      question: 'Le cabinet accepte-t-il de nouveaux patients ?',
      answer: 'Oui, le cabinet accueille de nouveaux patients. Vous pouvez prendre rendez-vous directement sur Doctolib.',
    });
  }

  return items;
}
