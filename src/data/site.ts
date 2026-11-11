// Content is edited in the dashboard (Pages CMS) and saved to src/content/settings/*.json
import siteJson from '../content/settings/site.json';
import homeJson from '../content/settings/home.json';
import servicesJson from '../content/settings/services.json';
import videosJson from '../content/settings/videos.json';
import teamJson from '../content/settings/team.json';
import faqJson from '../content/settings/faq.json';

const digits = (s = '') => s.replace(/\D/g, '');

export const site = {
  ...siteJson,
  phoneRaw: digits(siteJson.whatsapp || siteJson.phone),
  addressShort: siteJson.address_short,
  web3formsKey: siteJson.web3forms_key,
  mapQuery: siteJson.address,
  facebook: siteJson.socials?.facebook || '',
};
// Empty lists saved by the dashboard can come back as null, so default them here.
export const home = {
  ...homeJson,
  rotator_words: homeJson.rotator_words ?? [],
  slides: homeJson.slides ?? [],
  stats: homeJson.stats ?? [],
  client_logos: homeJson.client_logos ?? [],
  testimonial: homeJson.testimonial ?? { quote: '', name: '', role: '' },
};
export const services = { ...servicesJson, items: (servicesJson.items ?? []).map((s) => ({ ...s, bullets: s.bullets ?? [] })) };
export const videos = { ...videosJson, items: videosJson.items ?? [] };
export const team = { members: teamJson.members ?? [] };
export const faq = { items: faqJson.items ?? [] };
export const heroSlides = home.slides;
