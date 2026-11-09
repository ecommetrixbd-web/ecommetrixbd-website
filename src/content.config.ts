import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Each blog post is one Markdown file in src/content/blog/
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),          // one or two lines, shown on cards and Google
    date: z.coerce.date(),
    category: z.enum(['Meta Ads', 'Tracking', 'Content', 'Case Studies', 'Tips']),
    author: z.string().default('Ecommetrix Team'),
    cover: z.string().optional(),     // e.g. /images/blog/my-post.jpg
    draft: z.boolean().default(false),// true = hidden from the site
  }),
});

export const collections = { blog };
