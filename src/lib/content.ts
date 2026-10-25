import { getCollection } from 'astro:content';

/** Soins publiés, triés par `order`. */
export async function getSoins() {
  const soins = await getCollection('soins', ({ data }) => !data.draft);
  return soins.sort((a, b) => a.data.order - b.data.order);
}

/** Avis publiés, de la visite la plus récente à la plus ancienne. */
export async function getAvis() {
  const avis = await getCollection('avis', ({ data }) => !data.draft);
  return avis.sort((a, b) => b.data.visited.localeCompare(a.data.visited));
}

/** Questions de la FAQ, triées par `order`. */
export async function getFaq() {
  const faq = await getCollection('faq');
  return faq.sort((a, b) => a.data.order - b.data.order);
}
