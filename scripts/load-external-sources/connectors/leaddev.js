// LeadDev has no public API either. A contributor's community profile page
// (leaddev.com/community/<username>) lists their articles as cards, but the
// listing itself carries no publish date or image — only each article's own
// page exposes those, as `article:published_time` / `og:image` meta tags —
// so every linked article is fetched once more to fill those in.
import { decodeEntities, stripHtml } from '../html-utils.js';

const CARD_RE =
  /<a href="([^"]+)" class="ld-card__title-link">([^<]+)<\/a>[\s\S]*?<div class="ld-card__excerpt">\s*<p>([\s\S]*?)<\/p>/g;

function extractMetaContent(html, property) {
  const match = new RegExp(`<meta property="${property}" content="([^"]*)"`).exec(html);
  return match ? match[1] : null;
}

async function fetchArticleMeta(url) {
  const res = await fetch(url);
  if (!res.ok) return { date: '', image: null };
  const html = await res.text();
  const publishedTime = extractMetaContent(html, 'article:published_time');
  return {
    date: publishedTime ? publishedTime.slice(0, 10) : '',
    image: extractMetaContent(html, 'og:image'),
  };
}

export async function fetchLeadDevArticles({ username }) {
  const profileUrl = `https://leaddev.com/community/${username}`;
  const res = await fetch(profileUrl);
  if (!res.ok) {
    throw new Error(`LeadDev profile request failed: ${res.status} ${res.statusText}`);
  }
  const html = await res.text();

  const cards = [];
  let match;
  while ((match = CARD_RE.exec(html)) !== null) {
    cards.push({
      url: match[1],
      title: decodeEntities(match[2]).trim(),
      excerpt: stripHtml(match[3]),
    });
  }

  const metas = await Promise.all(cards.map((card) => fetchArticleMeta(card.url)));

  return cards.map((card, index) => ({
    source: 'leaddev',
    sourceLabel: 'LeadDev',
    title: card.title,
    excerpt: card.excerpt,
    url: card.url,
    date: metas[index].date,
    // image: metas[index].image,
  }));
}
