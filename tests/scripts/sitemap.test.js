import { mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { buildSitemap, staticRoutes } from '../../scripts/generate-sitemap.js';

const SITE_URL = 'https://teddygandon.github.io';
const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc);

describe('generate-sitemap', () => {
  let dir;
  const article = (slug, frontmatter) =>
    writeFileSync(join(dir, `${slug}.md`), `---\n${frontmatter}\n---\n\nBody of ${slug}.\n`);

  beforeEach(() => {
    dir = mkdtempSync(join(tmpdir(), 'sitemap-'));
    article('live', 'title: Live\ndate: 2026-03-01');
    article('today', 'title: Today\ndate: 2026-04-01');
    article('scheduled', 'title: Scheduled\ndate: 2026-05-01');
    article('draft', 'title: Draft\ndate: 2026-01-01\nstatus: draft');
    article('undated', 'title: Undated');
    writeFileSync(join(dir, 'notes.txt'), 'not an article');
  });

  afterEach(() => rmSync(dir, { recursive: true, force: true }));

  it('produces a well-formed urlset', () => {
    const { xml, count } = buildSitemap({ articlesDir: dir, today: '2026-04-01' });
    expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n')).toBe(true);
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml.trimEnd().endsWith('</urlset>')).toBe(true);
    expect(xml.match(/<url>/g)).toHaveLength(count);
    expect(xml.match(/<\/url>/g)).toHaveLength(count);
  });

  it('lists every static route', () => {
    const { xml } = buildSitemap({ articlesDir: dir, today: '2026-04-01' });
    for (const { path } of staticRoutes) expect(locs(xml)).toContain(`${SITE_URL}${path}`);
  });

  it('only lists published articles dated today or earlier, with their date as lastmod', () => {
    const { xml } = buildSitemap({ articlesDir: dir, today: '2026-04-01' });
    const articleLocs = locs(xml).filter((loc) => loc.includes('/articles/'));
    expect(articleLocs.sort()).toEqual([`${SITE_URL}/articles/live`, `${SITE_URL}/articles/today`]);
    expect(xml).toContain(`<loc>${SITE_URL}/articles/live</loc>\n    <lastmod>2026-03-01</lastmod>`);
  });

  it('picks scheduled articles up once their date is reached', () => {
    const { xml } = buildSitemap({ articlesDir: dir, today: '2026-05-01' });
    expect(locs(xml)).toContain(`${SITE_URL}/articles/scheduled`);
  });

  it('only points at routes the app actually defines', async () => {
    // Static routes are hand-maintained; keep them in sync with the router.
    const router = await import('node:fs').then(({ readFileSync }) => readFileSync('src/router/index.js', 'utf-8'));
    const routerPaths = [...router.matchAll(/path: '([^']+)'/g)].map(([, path]) => path);
    for (const { path } of staticRoutes) expect(routerPaths, path).toContain(path);
  });

  it('works on the real articles', () => {
    const articlesDir = resolve('src/content/articles');
    const { count } = buildSitemap({ articlesDir, today: '2999-01-01' });
    const files = readdirSync(articlesDir).filter((file) => file.endsWith('.md'));
    expect(count).toBeLessThanOrEqual(staticRoutes.length + files.length);
    expect(count).toBeGreaterThan(staticRoutes.length);
  });
});
