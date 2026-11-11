import { getCollection } from 'astro:content';

export const workTabs = [
  { id: 'ads', label: 'Ad Creatives' },
  { id: 'tracking', label: 'Tracking Projects' },
  { id: 'cases', label: 'Case Studies' },
] as const;

export async function getWork() {
  const items = await getCollection('work');
  return items
    .map((w) => ({ slug: w.id, ...w.data }))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}
