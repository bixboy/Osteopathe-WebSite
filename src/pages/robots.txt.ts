import type { APIRoute } from 'astro';
import { SITE_PREVIEW } from 'astro:env/server';
import { absoluteUrl } from '../lib/paths';

/** Robots des moteurs de réponse IA, autorisés explicitement : le site est fait pour être cité. */
const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
];

export const GET: APIRoute = ({ site }) => {
  // Prévisualisation (GitHub Pages) : rien à indexer
  if (SITE_PREVIEW) return new Response('User-agent: *\nDisallow: /\n');

  return new Response(
    [
      'User-agent: *',
      'Allow: /',
      '',
      '# Assistants IA (déjà couverts ci-dessus, listés pour être explicite)',
      ...AI_BOTS.map((bot) => `User-agent: ${bot}`),
      'Allow: /',
      '',
      `Sitemap: ${absoluteUrl('/sitemap-index.xml', site)}`,
      `# Résumé du cabinet pour les assistants IA : ${absoluteUrl('/llms.txt', site)}`,
      '',
    ].join('\n'),
  );
};
