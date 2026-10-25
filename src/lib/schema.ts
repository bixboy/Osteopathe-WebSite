import type { CollectionEntry } from 'astro:content';
import portrait from '../assets/images/portrait-fanny-gerszkourez.webp';
import { formations } from '../data/parcours';
import { site } from '../data/site';
import { formatPrice } from './format';
import { absoluteUrl } from './paths';

/**
 * Données structurées schema.org, publiées en un seul graphe JSON-LD par page (BaseLayout).
 * Entités reliées par @id : site ↔ cabinet ↔ praticienne, + Doctolib et Google Maps en sameAs.
 * C'est ce qui permet à Google et aux moteurs IA d'identifier le cabinet sans ambiguïté.
 * Les champs `undefined` (infos pas encore fournies) sont omis par JSON.stringify.
 * Jamais d'aggregateRating : interdit par Google pour des avis affichés par l'établissement.
 */

type Thing = Record<string, unknown>;

const ids = (siteUrl: URL) => ({
  website: `${absoluteUrl('/', siteUrl)}#site`,
  business: `${absoluteUrl('/', siteUrl)}#cabinet`,
  person: `${absoluteUrl('/', siteUrl)}#praticienne`,
});

const offers = () =>
  site.prices.map(({ label, detail, amount }) => ({
    '@type': 'Offer',
    name: label,
    description: detail,
    price: amount,
    priceCurrency: 'EUR',
  }));

/** Entités communes à toutes les pages. */
export function siteGraph(siteUrl: URL): Thing[] {
  const { address, contact, google, legal } = site;
  const id = ids(siteUrl);
  const diploma = formations.find((formation) => formation.diploma);
  const portraitUrl = new URL(portrait.src, siteUrl).href;

  return [
    {
      '@type': 'WebSite',
      '@id': id.website,
      url: absoluteUrl('/', siteUrl),
      name: site.title,
      inLanguage: ['fr-FR', 'en-GB'],
      publisher: { '@id': id.business },
    },
    {
      // MedicalOrganization : nécessaire pour isAcceptingNewPatients
      '@type': ['MedicalBusiness', 'MedicalOrganization'],
      '@id': id.business,
      // Même nom que la fiche Google Business Profile (cohérence NAP)
      name: `Cabinet d’ostéopathie ${site.name}`,
      alternateName: `${site.name}, ${site.profession}`,
      description: site.description,
      url: absoluteUrl('/', siteUrl),
      telephone: contact.phone || undefined,
      email: contact.email || undefined,
      image: [absoluteUrl('/og.png', siteUrl), portraitUrl],
      logo: absoluteUrl('/apple-touch-icon.png', siteUrl),
      address: {
        '@type': 'PostalAddress',
        name: address.building,
        streetAddress: address.street,
        postalCode: address.postalCode,
        addressLocality: address.city,
        addressRegion: address.region,
        addressCountry: address.country,
      },
      geo: { '@type': 'GeoCoordinates', latitude: address.geo.lat, longitude: address.geo.lng },
      hasMap: google.mapsUrl,
      areaServed: { '@type': 'City', name: address.city },
      openingHoursSpecification: site.openingHours.map((slot) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: slot.days,
        opens: slot.opens,
        closes: slot.closes,
      })),
      priceRange: formatPrice(Math.min(...site.prices.map((price) => price.amount))),
      currenciesAccepted: 'EUR',
      paymentAccepted: site.payment.join(', '),
      knowsLanguage: site.languages,
      isAcceptingNewPatients: site.acceptsNewPatients,
      makesOffer: offers(),
      founder: { '@id': id.person },
      employee: { '@id': id.person },
      sameAs: [site.booking.url, google.mapsUrl],
      potentialAction: {
        '@type': 'ReserveAction',
        target: { '@type': 'EntryPoint', urlTemplate: site.booking.url },
        name: site.booking.label,
      },
    },
    {
      '@type': 'Person',
      '@id': id.person,
      name: site.name,
      jobTitle: site.profession,
      image: portraitUrl,
      url: absoluteUrl('/a-propos', siteUrl),
      worksFor: { '@id': id.business },
      knowsLanguage: site.languages,
      knowsAbout: site.expertises,
      alumniOf: diploma?.place ? { '@type': 'EducationalOrganization', name: diploma.place } : undefined,
      hasCredential: diploma
        ? {
            '@type': 'EducationalOccupationalCredential',
            name: diploma.title,
            credentialCategory: 'diploma',
            dateCreated: diploma.period,
            recognizedBy: diploma.place ? { '@type': 'EducationalOrganization', name: diploma.place } : undefined,
          }
        : undefined,
      identifier: legal.rppsOrAdeli
        ? { '@type': 'PropertyValue', propertyID: 'RPPS', value: legal.rppsOrAdeli }
        : undefined,
      sameAs: [site.booking.url],
    },
  ];
}

/** Fil d'Ariane, pour les pages intérieures : [{ name: 'Soins', path: '/soins' }, …] */
export function breadcrumbSchema(items: { name: string; path: string }[], siteUrl: URL): Thing {
  const trail = [{ name: 'Accueil', path: '/' }, ...items];
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(({ name, path }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name,
      item: absoluteUrl(path, siteUrl),
    })),
  };
}

/** Une consultation (page /soins/<id>) décrite comme un service proposé par le cabinet. */
export function serviceSchema(soin: CollectionEntry<'soins'>, siteUrl: URL): Thing {
  const { business } = ids(siteUrl);
  return {
    '@type': 'Service',
    name: soin.data.title,
    description: soin.data.description,
    serviceType: 'Ostéopathie',
    url: absoluteUrl(`/soins/${soin.id}`, siteUrl),
    provider: { '@id': business },
    areaServed: { '@type': 'City', name: site.address.city },
    offers: offers(),
  };
}

export function faqSchema(items: { question: string; answer: string }[]): Thing {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}
