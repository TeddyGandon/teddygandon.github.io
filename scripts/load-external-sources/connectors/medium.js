// Medium has no public API for reading a profile's own posts, but it exposes
// an RSS feed for every profile at /feed/@<username>. This connector fetches
// that feed and normalizes entries into the shape src/data/official-publications.js
// expects (title, excerpt, url, date, image).
import { excerptFrom } from '../html-utils.js';

const RSS_ITEM_RE = /<item>([\s\S]*?)<\/item>/g;

function extractTag(xml, tag) {
  const cdata = new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>`).exec(xml);
  if (cdata) return cdata[1];
  const plain = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`).exec(xml);
  return plain ? plain[1] : '';
}

function firstImage(html) {
  const match = /<img[^>]+src="([^"]+)"/.exec(html);
  return match ? match[1] : null;
}

function cleanUrl(url) {
  // Strips Medium's "?source=rss----..." tracking query, keeping the link readable.
  return url.split('?')[0];
}

export async function fetchMediumArticles({ username }) {
  const feedUrl = `https://medium.com/feed/@${username}`;
  const res = await fetch(feedUrl);
  if (!res.ok) {
    throw new Error(`Medium feed request failed: ${res.status} ${res.statusText}`);
  }
  const xml = await res.text();

  const articles = [];
  let match;
  while ((match = RSS_ITEM_RE.exec(xml)) !== null) {
    const item = match[1];
    const title = extractTag(item, 'title').trim();
    const link = extractTag(item, 'link').trim();
    const pubDate = extractTag(item, 'pubDate').trim();
    const content = extractTag(item, 'content:encoded');
    if (!title || !link) continue;

    articles.push({
      source: 'medium',
      sourceLabel: 'Medium',
      title,
      excerpt: excerptFrom(content),
      url: cleanUrl(link),
      date: pubDate ? new Date(pubDate).toISOString().slice(0, 10) : '',
      // image: firstImage(content),
    });
  }
  return articles;
}
