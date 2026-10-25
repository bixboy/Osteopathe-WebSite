/**
 * Liens internes : TOUJOURS passer par link(), jamais href="/..." en dur.
 * Le site peut être servi sous un sous-chemin (GitHub Pages : /Osteopathe-WebSite/) ou à la
 * racine d'un domaine (OVH) : `base` dans astro.config.mjs, lu ici via BASE_URL.
 */
const base = import.meta.env.BASE_URL.replace(/\/?$/, '/');

/**
 * "/a-propos" -> "/Osteopathe-WebSite/a-propos/" (slash final : trailingSlash 'always')
 * "/og.png"   -> "/Osteopathe-WebSite/og.png"   (fichier : pas de slash final)
 */
export function link(path: string): string {
  const clean = path.replace(/^\/+/, '');
  const isFile = /\.[a-z0-9]+$/i.test(clean);
  return `${base}${clean === '' || isFile || clean.endsWith('/') ? clean : `${clean}/`}`;
}

/** URL absolue, pour canonical, Open Graph, sitemap, JSON-LD : absoluteUrl('/a-propos', Astro.site) */
export function absoluteUrl(path: string, site: URL | undefined): string {
  return new URL(link(path), site).href;
}
