import { getCollection } from 'astro:content';

export const categories = ['Meta Ads', 'Tracking', 'Content', 'Case Studies', 'Tips'] as const;

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function readMinutes(body = '') {
  return Math.max(1, Math.round(body.split(/\s+/).length / 200));
}

export const formatDate = (d: Date) =>
  d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
