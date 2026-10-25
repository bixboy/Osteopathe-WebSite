import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { soinIconKeys } from './lib/icons';

/** Un fichier .md dans src/content/soins/ = une page /soins/<nom-du-fichier>. */
const soins = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/soins' }),
  schema: z.object({
    title: z.string(),
    /** Titre court pour les cartes et le menu. */
    shortTitle: z.string(),
    /** Clé d'icône, voir src/lib/icons.ts. */
    icon: z.enum(soinIconKeys),
    /** Meta description SEO, 150-160 caractères. */
    description: z.string().max(170),
    /** Ordre d'affichage dans les listes. */
    order: z.number().int(),
    /** Phrase courte pour les cartes de la page d'accueil. */
    summary: z.string(),
    draft: z.boolean().default(false),
    /** Traduction pour la page /en (facultative : sans elle, le soin n'y apparaît pas). */
    en: z.object({ title: z.string(), summary: z.string() }).optional(),
  }),
});

/** Questions fréquentes, affichées sur /osteopathie et balisées FAQPage. */
const faq = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faq' }),
  schema: z.object({
    question: z.string(),
    order: z.number().int(),
  }),
});

/**
 * Avis Google recopiés à la main (aucune API). 1 fichier = 1 avis, texte dans le corps.
 * Les fichiers commençant par « _ » (ex. _modele.md) sont ignorés.
 */
const avis = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/avis' }),
  schema: z.object({
    /** Prénom + initiale du nom (« Franck S. »), ou pseudonyme Google tel quel. */
    author: z.string(),
    rating: z.number().int().min(1).max(5),
    /** Mois de visite indiqué par Google (« Visité en décembre 2024 ») au format AAAA-MM. */
    visited: z.string().regex(/^\d{4}-\d{2}$/),
    /** true = avis non affiché (ex. allégation de guérison, voir docs/GOOGLE.md). */
    draft: z.boolean().default(false),
  }),
});

export const collections = { soins, faq, avis };
