// Smoke-tests the production build: serves dist/ with `vite preview`, then
// visits every page listed in the sitemap, every article (scheduled ones
// too, so they're checked before they go live) and every internal link
// found along the way, in headless Chrome. A page is broken if it throws,
// logs an error, renders the 404 view, or links to something missing.
// Third-party requests are stubbed so the test never depends on the network.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import puppeteer from 'puppeteer';
import { parseFrontmatter } from '../../src/utils/frontmatter.js';
import { preview } from 'vite';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const SITE_URL = 'https://teddygandon.github.io';
const distDir = resolve('dist');
const TRANSPARENT_GIF = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
// The analytics script loaded from index.html; the router calls it on every navigation.
const SIRUP_STUB = 'window.sirup = { persistantSession: () => Promise.resolve(), event: () => {} };';

if (!existsSync(join(distDir, 'index.html'))) {
  throw new Error('dist/ is missing — run `npm run build` before the e2e tests.');
}

const sitemapPaths = [...readFileSync(join(distDir, 'sitemap.xml'), 'utf-8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  ([, loc]) => loc.replace(SITE_URL, '') || '/',
);
const articlePaths = readdirSync(resolve('src/content/articles'))
  .filter((file) => file.endsWith('.md'))
  // Drafts aren't built into the site unless the displayDrafts flag is on, so they'd 404.
  .filter((file) => parseFrontmatter(readFileSync(resolve('src/content/articles', file), 'utf-8')).data.status !== 'draft')
  .map((file) => `/articles/${file.replace(/\.md$/, '')}`);

let server;
let browser;
let baseUrl;

beforeAll(async () => {
  server = await preview({ preview: { port: 4173, strictPort: false, open: false }, logLevel: 'silent' });
  baseUrl = server.resolvedUrls.local[0].replace(/\/$/, '');
  browser = await puppeteer.launch({ args: ['--no-sandbox'] });
});

afterAll(async () => {
  await browser?.close();
  await new Promise((done) => server?.httpServer.close(done));
});

async function visit(path) {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console.error: ${message.text()}`);
  });
  page.on('requestfailed', (request) => errors.push(`request failed: ${request.url()}`));
  page.on('response', (response) => {
    if (response.status() >= 400) errors.push(`HTTP ${response.status()}: ${response.url()}`);
  });

  await page.setRequestInterception(true);
  page.on('request', (request) => {
    const url = request.url();
    if (url.startsWith(baseUrl) || url.startsWith('data:')) return request.continue();
    if (url.includes('sirup.js')) return request.respond({ status: 200, contentType: 'text/javascript', body: SIRUP_STUB });
    if (request.resourceType() === 'image') return request.respond({ status: 200, contentType: 'image/gif', body: TRANSPARENT_GIF });
    return request.respond({ status: 204, body: '' });
  });

  const response = await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle0' });
  await page.waitForSelector('main h1');

  const result = await page.evaluate(() => ({
    title: document.title,
    h1: document.querySelector('main h1')?.textContent.trim(),
    eyebrow: document.querySelector('main .hero-eyebrow')?.textContent.trim(),
    canonical: document.getElementById('meta-canonical')?.getAttribute('href'),
    description: document.getElementById('meta-description')?.getAttribute('content'),
    links: [...document.querySelectorAll('a[href]')].map((link) => link.getAttribute('href')),
    brokenImages: [...document.querySelectorAll('img')]
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.src),
    mainText: document.querySelector('main')?.innerText ?? '',
  }));
  await page.close();
  return { status: response.status(), errors, ...result };
}

function expectHealthy(path, result) {
  expect(result.status, 'HTTP status').toBe(200);
  expect(result.errors, 'errors while loading').toEqual([]);
  expect(result.brokenImages, 'broken images').toEqual([]);
  expect(result.h1, 'h1').toBeTruthy();
  expect(result.eyebrow, 'rendered the 404 view').not.toBe('404');
  expect(result.h1).not.toBe('Article not found');
  expect(result.mainText, 'unrendered template text').not.toMatch(/\{\{|\}\}|undefined|NaN|\[object Object\]/);
  expect(result.title).toMatch(/Teddy Gandon/);
  expect(result.description, 'meta description').toBeTruthy();
  expect(result.canonical).toBe(`${SITE_URL}${path.split('?')[0]}`);
}

const isInternal = (href) => href.startsWith('/') && !href.startsWith('//');
const isAsset = (href) => /\.[a-z0-9]+$/i.test(href.split(/[?#]/)[0]);

describe('pages', () => {
  const pages = [...new Set([...sitemapPaths, ...articlePaths])];
  const internalLinks = new Set();

  it('has a sitemap listing the main pages', () => {
    for (const path of ['/', '/experience', '/projects', '/articles']) expect(sitemapPaths).toContain(path);
  });

  it.each(pages)('%s renders without errors', async (path) => {
    const result = await visit(path);
    expectHealthy(path, result);
    for (const href of result.links.filter(isInternal)) internalLinks.add(href);
  });

  it('every internal page link leads to a working page', async () => {
    const pageLinks = [...internalLinks].filter((href) => !isAsset(href)).map((href) => href.split('#')[0]);
    const unvisited = [...new Set(pageLinks)].filter((href) => !pages.includes(href));
    for (const path of unvisited) expectHealthy(path, await visit(path));
  });

  it('every internal file link exists in the build', () => {
    const files = [...internalLinks].filter(isAsset).map((href) => href.split(/[?#]/)[0]);
    for (const file of files) expect(existsSync(join(distDir, decodeURI(file))), file).toBe(true);
  });

  it('shows the 404 view for an unknown URL', async () => {
    const result = await visit('/this/page/does-not-exist');
    expect(result.errors).toEqual([]);
    expect(result.eyebrow).toBe('404');
  });

  it('serves the static files the site relies on', () => {
    for (const file of ['404.html', 'robots.txt', 'sitemap.xml', 'favicon.svg']) {
      expect(existsSync(join(distDir, file)), file).toBe(true);
    }
    expect(readFileSync(join(distDir, 'robots.txt'), 'utf-8')).toMatch(/Sitemap: https:\/\/teddygandon\.github\.io\/sitemap\.xml/i);
  });
});
