// Portfolio items. Each one gets its own page at /work/<slug>.
// category: 'ads' (Ad Creatives) | 'tracking' (Tracking Projects) | 'cases' (Case Studies)
// Replace the placeholder text with real projects. Set `image` to a file in public/images/work/.

export type WorkItem = {
  slug: string;
  category: 'ads' | 'tracking' | 'cases';
  title: string;
  client: string;
  tags: string[];
  summary: string; // one line, shown on cards
  image: string;
  challenge: string;
  approach: string[];
  results: string[];
  placeholder?: boolean;
};

const ph = {
  client: 'Client name',
  challenge: 'What problem the client had when they came to us.',
  approach: ['What we did first.', 'What we changed or built.', 'How we tested and improved it.'],
  results: ['Verified result 1', 'Verified result 2', 'Verified result 3'],
  image: '',
  placeholder: true,
};

export const work: WorkItem[] = [
  { slug: 'meta-ads-creative-1', category: 'ads', title: 'Meta Ads creative', tags: ['Meta Ads', 'Static'], summary: 'Short line about this ad and who it was for.', ...ph },
  { slug: 'meta-ads-video-ad', category: 'ads', title: 'Video ad for Meta', tags: ['Meta Ads', 'Video'], summary: 'Short line about this ad and who it was for.', ...ph },
  { slug: 'tiktok-ad-creative', category: 'ads', title: 'TikTok ad creative', tags: ['TikTok', '9:16'], summary: 'Short line about this ad and who it was for.', ...ph },
  { slug: 'pixel-capi-setup', category: 'tracking', title: 'Pixel + Conversions API setup', tags: ['Meta Pixel', 'CAPI', 'Dedup'], summary: 'Browser and server events sent to Meta without double counting.', ...ph },
  { slug: 'server-side-gtm', category: 'tracking', title: 'Server-side GTM setup', tags: ['sGTM', 'First-party'], summary: 'Tracking moved to a first-party server container.', ...ph },
  { slug: 'ga4-ecommerce-tracking', category: 'tracking', title: 'GA4 ecommerce tracking', tags: ['GA4', 'Ecommerce'], summary: 'Full purchase funnel events in GA4, from product view to order.', ...ph },
  { slug: 'case-study-meta-ads', category: 'cases', title: 'Case study title', tags: ['Meta Ads', 'Video'], summary: 'Client, problem and result in one line.', ...ph },
  { slug: 'case-study-website', category: 'cases', title: 'Case study title', tags: ['Website', 'CRO'], summary: 'Client, problem and result in one line.', ...ph },
  { slug: 'case-study-tracking', category: 'cases', title: 'Case study title', tags: ['Tracking', 'Google Ads'], summary: 'Client, problem and result in one line.', ...ph },
];

export const workTabs = [
  { id: 'ads', label: 'Ad Creatives' },
  { id: 'tracking', label: 'Tracking Projects' },
  { id: 'cases', label: 'Case Studies' },
] as const;
