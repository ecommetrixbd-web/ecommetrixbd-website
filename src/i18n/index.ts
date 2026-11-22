// Language helpers. English lives at /, Bangla at /bn/.
export type Lang = 'en' | 'bn';

export const getLang = (astro: { currentLocale?: string }): Lang => (astro.currentLocale === 'bn' ? 'bn' : 'en');

/** Read a content field in the current language: uses `<key>_bn` on Bangla pages when it is filled in. */
export function pick<T = string>(obj: Record<string, any> | undefined | null, key: string, lang: Lang): T {
  if (!obj) return '' as T;
  if (lang === 'bn') {
    const v = obj[`${key}_bn`];
    if (v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0)) return v as T;
  }
  return obj[key] as T;
}

/** Turn an English path into the same page in the other language. */
export function switchPath(path: string, to: Lang) {
  const clean = path.replace(/^\/bn(?=\/|$)/, '') || '/';
  return to === 'bn' ? (clean === '/' ? '/bn/' : `/bn${clean}`) : clean;
}

export const formatDateLang = (d: Date, lang: Lang) =>
  d.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export const minRead = (n: number, lang: Lang) => (lang === 'bn' ? `${n} মিনিটে পড়া` : `${n} min read`);
