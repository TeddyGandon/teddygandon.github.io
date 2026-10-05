// LinkedIn has no public API for reading a personal profile's own posts, but
// the logged-out public profile page (linkedin.com/in/<username>) embeds an
// "Activity" section linking to the latest posts. Those links are collected,
// then every post page is fetched once more — they're public too — to read its
// text and image from the `og:description` / `og:image` meta tags, and its
// reactions from the embedded JSON-LD / social-actions bar. Entries are
// normalized into the shape src/data/linkedin.js expects (date, text, url,
// image, reactions: { total, types }, comments).
import { decodeEntities } from '../html-utils.js';

// LinkedIn's internal reaction names, as used in `data-reaction-type`.
const REACTION_TYPES = ['LIKE', 'PRAISE', 'EMPATHY', 'APPRECIATION', 'INTEREST', 'ENTERTAINMENT'];

const POST_URL_RE = /https:\/\/(?:[a-z]{2,3}\.)?linkedin\.com\/posts\/[A-Za-z0-9_%-]+/g;

// LinkedIn rejects requests without a browser-like user agent.
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
};

function extractMetaContent(html, property) {
  const match = new RegExp(`<meta (?:property|name)="${property}" content="([^"]*)"`).exec(html);
  return match ? decodeEntities(match[1]) : null;
}

function canonicalUrl(url) {
  // Country subdomains (in.linkedin.com, fr.linkedin.com, ...) all point to the same post.
  return url.replace(/^https:\/\/(?:[a-z]{2,3}\.)?linkedin\.com/, 'https://www.linkedin.com');
}

// Activity/share ids are snowflakes: their top 41 bits are the creation
// timestamp in milliseconds, which is more reliable than any markup.
function dateFromUrl(url) {
  const match = /(?:activity|share|ugcPost)-(\d{19})/.exec(url);
  if (!match) return '';
  const ms = Number(BigInt(match[1]) >> 22n);
  return new Date(ms).toISOString().slice(0, 10);
}

function parseCount(text) {
  const count = Number(String(text).replace(/[^\d]/g, ''));
  return Number.isFinite(count) ? count : 0;
}

// The post page embeds a schema.org SocialMediaPosting whose
// `interactionStatistic` carries the like (= all reactions) and comment counts.
function countsFromJsonLd(html) {
  const blocks = html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
  for (const [, json] of blocks) {
    let data;
    try {
      data = JSON.parse(json);
    } catch {
      continue;
    }
    const nodes = [data, ...(data['@graph'] ?? [])];
    const posting = nodes.find((node) => node.interactionStatistic);
    if (!posting) continue;
    const stats = [posting.interactionStatistic].flat();
    const countFor = (action) =>
      stats.find((stat) => String(stat.interactionType).endsWith(action))?.userInteractionCount;
    return {
      reactions: countFor('LikeAction'),
      comments: countFor('CommentAction') ?? posting.commentCount,
    };
  }
  return {};
}

function parseReactions(html) {
  const fromJsonLd = countsFromJsonLd(html);
  const reactionCount = /data-num-reactions="(\d+)"/.exec(html);
  const commentCount = /data-num-comments="(\d+)"/.exec(html);

  // Only the top (up to 3) reaction types are shown on the public page, as icons.
  const types = [...new Set(
    [...html.matchAll(/data-reaction-type="([A-Z_]+)"/g)].map(([, type]) => type),
  )].filter((type) => REACTION_TYPES.includes(type));

  return {
    reactions: {
      total: parseCount(fromJsonLd.reactions ?? reactionCount?.[1] ?? 0),
      types: types.length ? types : ['LIKE'],
    },
    comments: parseCount(fromJsonLd.comments ?? commentCount?.[1] ?? 0),
  };
}

async function fetchPost(url) {
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) return null;
  const html = await res.text();
  const publishedTime = /"datePublished":"([^"]+)"/.exec(html);
  return {
    date: dateFromUrl(url) || (publishedTime ? publishedTime[1].slice(0, 10) : ''),
    text: extractMetaContent(html, 'og:description') ?? extractMetaContent(html, 'description') ?? '',
    url,
    image: extractMetaContent(html, 'og:image'),
    ...parseReactions(html),
  };
}

export async function fetchLinkedInPosts({ username }) {
  const profileUrl = `https://www.linkedin.com/in/${username}/`;
  const res = await fetch(profileUrl, { headers: HEADERS });
  if (!res.ok) {
    throw new Error(`LinkedIn profile request failed: ${res.status} ${res.statusText}`);
  }
  const html = await res.text();

  // Only the profile owner's posts — the Activity section can also list posts they reacted to.
  const urls = [...new Set((html.match(POST_URL_RE) ?? []).map(canonicalUrl))].filter((url) =>
    url.startsWith(`https://www.linkedin.com/posts/${username}_`),
  );
  if (urls.length === 0) {
    throw new Error('LinkedIn profile page listed no posts (likely served an auth wall)');
  }

  const posts = await Promise.all(urls.map(fetchPost));
  return posts.filter((post) => post && post.text);
}
