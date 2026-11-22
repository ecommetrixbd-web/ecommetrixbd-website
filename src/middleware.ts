import { defineMiddleware } from 'astro:middleware';
import bnText from './i18n/bn.json';

// On Bangla pages (/bn/...):
// 1. internal links point to the Bangla version of each page
// 2. fixed interface text written in code is swapped for its Bangla version from src/i18n/bn.json
//    (content edited in the dashboard uses its own "(বাংলা)" fields instead)
const dict = bnText as Record<string, string>;
const SKIP = /^\/(bn(\/|$)|images\/|videos\/|js\/|_astro\/|favicon)/;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const unesc = (s: string) => s.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

export const onRequest = defineMiddleware(async (context, next) => {
  const res = await next();
  if (!context.url.pathname.startsWith('/bn') || !(res.headers.get('content-type') || '').includes('text/html')) return res;
  let html = await res.text();

  // links (skip any <a> that carries hreflang: the language switch)
  html = html.replace(/<a\b([^>]*?)\shref="(\/[^"]*)"([^>]*)>/g, (m, pre, href, post) => {
    if (/hreflang=/.test(pre + post) || SKIP.test(href)) return m;
    return `<a${pre} href="/bn${href === '/' ? '/' : href}"${post}>`;
  });

  // text between tags, e.g. >Services< (scripts and styles are left alone)
  html = html.replace(/(<(script|style)\b[\s\S]*?<\/\2>)|>([^<>]+)</g, (m, block, _t, text) => {
    if (block) return block;
    const key = unesc(text.trim());
    if (!key || !dict[key]) return m;
    return '>' + text.replace(text.trim(), esc(dict[key])) + '<';
  });

  // readable attributes
  html = html.replace(/\s(aria-label|placeholder|title|alt|content|data-video|data-cat)="([^"]+)"/g, (m, attr, val) => {
    const t = dict[unesc(val)];
    return t ? ` ${attr}="${esc(t).replace(/"/g, '&quot;')}"` : m;
  });

  return new Response(html, { status: res.status, headers: res.headers });
});
