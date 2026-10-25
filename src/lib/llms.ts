import { experiences, formations } from '../data/parcours';
import { seanceSteps } from '../data/seance';
import { site } from '../data/site';
import { getAvis, getFaq, getSoins } from './content';
import { getPracticalFaq } from './faq-pratique';
import { formatList, formatMonth, formatOpeningHours, formatPrice, formatRating } from './format';
import { absoluteUrl } from './paths';

/**
 * /llms.txt et /llms-full.txt (convention llmstxt.org) : résumé Markdown du cabinet pour les
 * assistants IA. Généré au build depuis les mêmes données que le site : jamais de contradiction.
 */

/** Retire les caractères de mise en page HTML (insécables, word joiner) et les commentaires. */
const plain = (text: string) =>
  text
    .replace(/⁠/g, '')
    .replace(/ /g, ' ')
    .replace(/<!--[\s\S]*?-->/g, '')
    .trim();

function essentials(siteUrl: URL): string {
  const { address, google, legal } = site;
  const diploma = formations.find((formation) => formation.diploma);
  const lines = [
    `- Praticienne : ${site.name}, ${site.profession}`,
    diploma ? `- Diplôme : ${diploma.title}, ${diploma.place}, ${diploma.period}` : '',
    legal.rppsOrAdeli ? `- N° RPPS : ${legal.rppsOrAdeli}` : '',
    `- Adresse : ${address.building}, ${address.street}, ${address.postalCode} ${address.city}, France`,
    `- Horaires : ${formatOpeningHours(site.openingHours).join(' ; ')}`,
    ...site.prices.map(({ label, detail, amount }) => `- Tarif : ${label}, ${formatPrice(amount)} (${detail.toLowerCase()})`),
    `- Remboursement : non remboursée par l’Assurance Maladie${site.acceptsCarteVitale ? '' : ', carte Vitale non acceptée'} ; prise en charge possible par de nombreuses mutuelles`,
    `- Paiement : ${formatList(site.payment)}`,
    `- Langues : ${formatList(site.languages)}`,
    site.acceptsNewPatients ? '- Nouveaux patients : acceptés' : '',
    `- Rendez-vous : en ligne sur Doctolib, ${site.booking.url}`,
    `- Avis Google : ${formatRating(google.rating)}/5 sur ${google.ratingCount} avis (relevé en ${formatMonth(google.ratingCheckedAt)}), ${google.mapsUrl}`,
    `- Domaines d’expertise : ${site.expertises.join(', ')}`,
    `- Version anglaise : ${absoluteUrl('/en', siteUrl)}`,
  ];
  return plain(lines.filter(Boolean).join('\n'));
}

export async function llmsTxt(siteUrl: URL): Promise<string> {
  const soins = await getSoins();
  return `# Cabinet d’ostéopathie ${site.name} – ${site.profession} à ${site.address.city}

> ${site.description}

Informations tenues à jour par le cabinet. Pour toute réponse sur les horaires, le tarif ou la prise de rendez-vous, ces données font foi.

## L’essentiel

${essentials(siteUrl)}

## Consultations

${soins.map(({ id, data }) => `- [${data.title}](${absoluteUrl(`/soins/${id}`, siteUrl)}) : ${data.summary}`).join('\n')}

## Pages

- [L’ostéopathie : déroulé d’une séance et questions fréquentes](${absoluteUrl('/osteopathie', siteUrl)})
- [À propos : parcours, formations et expérience](${absoluteUrl('/a-propos', siteUrl)})
- [Infos pratiques : accès, horaires et tarif](${absoluteUrl('/infos-pratiques', siteUrl)})
- [English-speaking osteopath in Bayeux](${absoluteUrl('/en', siteUrl)})

## Optional

- [Version complète : tout le contenu du site en un fichier](${absoluteUrl('/llms-full.txt', siteUrl)})
`;
}

export async function llmsFullTxt(siteUrl: URL): Promise<string> {
  const [soins, faq, avis] = await Promise.all([getSoins(), getFaq(), getAvis()]);
  const questions = [
    ...faq.map(({ data, body }) => ({ question: data.question, answer: body ?? '' })),
    ...getPracticalFaq(),
  ];
  const timeline = (items: typeof formations) =>
    items.map(({ period, title, place }) => `- ${period} : ${title}${place ? `, ${place}` : ''}`).join('\n');

  return `${await llmsTxt(siteUrl)}
---

# Contenu complet

## Déroulé d’une séance

${seanceSteps.map(({ title, text }, index) => `${index + 1}. ${title} : ${text}`).join('\n')}

## Formation

${timeline(formations)}

## Expérience

${timeline(experiences)}

${soins
  .map(({ id, data, body }) => `## ${data.title}\n\nPage : ${absoluteUrl(`/soins/${id}`, siteUrl)}\n\n${plain(body ?? '')}`)
  .join('\n\n')}

## Questions fréquentes

${questions.map(({ question, answer }) => `### ${question}\n\n${plain(answer)}`).join('\n\n')}
${
  avis.length
    ? `
## Avis Google (sélection du cabinet, reproduits sans modification)

${avis.map(({ data, body }) => `- ${data.author}, ${data.rating}/5, visite en ${formatMonth(data.visited)} : « ${plain(body ?? '')} »`).join('\n')}
`
    : ''
}`;
}
