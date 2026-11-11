import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog posts: one Markdown file per post in src/content/blog/
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    category: z.enum(['Meta Ads', 'Tracking', 'Content', 'Case Studies', 'Tips']),
    author: z.string().default('Ecommetrix Team'),
    cover: z.string().optional().nullable(),
    draft: z.boolean().default(false),
  }),
});

// Portfolio projects: one JSON file per project in src/content/work/
const work = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['ads', 'tracking', 'cases']),
    order: z.number().default(99),
    client: z.string().default(''),
    tags: z.array(z.string()).default([]),
    summary: z.string().default(''),
    image: z.string().optional().nullable(),
    challenge: z.string().default(''),
    approach: z.array(z.string()).default([]),
    results: z.array(z.string()).default([]),
    sample: z.boolean().default(false),
  }),
});

export const collections = { blog, work };
