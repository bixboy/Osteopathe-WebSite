import { site } from '../data/site';
import { formatPrice } from './format';

/**
 * JSON-LD du cabinet (SEO local). Injecté sur toutes les pages par BaseLayout.
 * Les champs `undefined` (infos pas encore fournies) sont omis par JSON.stringify.
 */
export function businessSchema(siteUrl: URL) {
  const { address, contact } = site;
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': new URL('/#cabinet', siteUrl).href,
    name: `${site.name} – ${site.profession}`,
    description: site.description,
    url: siteUrl.href,
    telephone: contact.phone || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      postalCode: address.postalCode,
      addressLocality: address.city,
      addressRegion: address.region,
      addressCountry: address.country,
    },
    geo: address.geo.lat
      ? { '@type': 'GeoCoordinates', latitude: address.geo.lat, longitude: address.geo.lng }
      : undefined,
    openingHoursSpecification: site.openingHours.map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
    hasMap: site.google.mapsUrl,
    priceRange: formatPrice(Math.min(...site.prices.map((p) => p.amount))),
    paymentAccepted: site.payment.join(', '),
    knowsLanguage: site.languages,
    potentialAction: {
      '@type': 'ReserveAction',
      target: site.booking.url,
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}
