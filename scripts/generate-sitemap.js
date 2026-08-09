// Post-build step: writes dist/sitemap.xml from the same article front matter
// used at runtime, so it can't drift from what the site actually serves.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseFrontmatter } from '../src/utils/frontmatter.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const articlesDir = join(__dirname, '../src/content/articles');
const distDir = join(__dirname, '../dist');
const SITE_URL = 'https://teddygandon.github.io';

const today = new Date().toISOString().slice(0, 10);

const articleEntries = readdirSync(articlesDir)
  .filter((file) => file.endsWith('.md'))
  .map((file) => {
    const { data } = parseFrontmatter(readFileSync(join(articlesDir, file), 'utf-8'));
    return { slug: file.replace(/\.md$/, ''), date: data.date ?? '' };
  })
  // Scheduled (future-dated) articles aren't live yet — keep them out of the sitemap too.
  .filter((article) => article.date && article.date <= today);

const staticRoutes = [
  { path: '/', priority: '1.0' },
  { path: '/experience', priority: '0.8' },
  { path: '/projects', priority: '0.6' },
  { path: '/articles', priority: '0.8' },
  { path: '/contact', priority: '0.5' },
];

const urlEntries = [
  ...staticRoutes.map(
    ({ path, priority }) => `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <priority>${priority}</priority>\n  </url>`,
  ),
  ...articleEntries.map(
    ({ slug, date }) =>
      `  <url>\n    <loc>${SITE_URL}/articles/${slug}</loc>\n    <lastmod>${date}</lastmod>\n    <priority>0.7</priority>\n  </url>`,
  ),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries.join('\n')}\n</urlset>\n`;

writeFileSync(join(distDir, 'sitemap.xml'), xml);
console.log(`sitemap.xml written with ${urlEntries.length} URLs`);
