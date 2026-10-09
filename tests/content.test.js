// Guards the content the site is built from — articles and the generated
// data files — so a bad edit or a bad scrape is caught before deploying.
import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseFrontmatter } from '../src/utils/frontmatter.js';
import { linkedinPosts } from '../src/data/linkedin.js';
import { officialPublications } from '../src/data/official-publications.js';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const isRealDate = (date) => ISO_DATE.test(date) && new Date(date).toISOString().slice(0, 10) === date;

const articlesDir = resolve('src/content/articles');
const articles = readdirSync(articlesDir)
  .filter((file) => file.endsWith('.md'))
  .map((file) => ({ file, ...parseFrontmatter(readFileSync(join(articlesDir, file), 'utf-8')) }));

describe('articles', () => {
  it.each(articles.map((article) => [article.file, article]))('%s has a valid front matter', (file, { data, content }) => {
    expect(file).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*\.md$/);
    expect(data.title, 'title').toBeTruthy();
    expect(isRealDate(data.date), `date "${data.date}"`).toBe(true);
    expect(data.excerpt, 'excerpt').toBeTruthy();
    expect(Array.isArray(data.tags), 'tags must be a [list]').toBe(true);
    for (const tag of data.tags) expect(tag).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    if (data.status) expect(['published', 'draft']).toContain(data.status);
    expect(content.length, 'body').toBeGreaterThan(0);
  });

  it('have unique titles', () => {
    const titles = articles.map(({ data }) => data.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});

function expectSortedUniqueByUrl(entries) {
  const urls = entries.map((entry) => entry.url.replace(/\/$/, ''));
  expect(new Set(urls).size).toBe(urls.length);
  const dates = entries.map((entry) => entry.date);
  expect(dates).toEqual([...dates].sort().reverse());
}

describe('official-publications.js', () => {
  it.each(officialPublications.map((entry) => [entry.url, entry]))('%s is well-formed', (url, entry) => {
    expect(url).toMatch(/^https:\/\//);
    expect(entry.title).toBeTruthy();
    expect(entry.sourceLabel).toBeTruthy();
    expect(isRealDate(entry.date), `date "${entry.date}"`).toBe(true);
    if (entry.image) expect(entry.image).toMatch(/^https:\/\//);
  });

  it('is sorted most recent first, without duplicates', () => expectSortedUniqueByUrl(officialPublications));
});

describe('linkedin.js', () => {
  it.each(linkedinPosts.map((post) => [post.url, post]))('%s is well-formed', (url, post) => {
    expect(url).toMatch(/^https:\/\/www\.linkedin\.com\/posts\//);
    expect(post.text).toBeTruthy();
    expect(isRealDate(post.date), `date "${post.date}"`).toBe(true);
    if (post.image) expect(post.image).toMatch(/^https:\/\//);
    if (post.reactions) {
      expect(Number.isInteger(post.reactions.total)).toBe(true);
      expect(Array.isArray(post.reactions.types)).toBe(true);
    }
    if (post.comments !== undefined) expect(Number.isInteger(post.comments)).toBe(true);
  });

  it('is sorted most recent first, without duplicates', () => expectSortedUniqueByUrl(linkedinPosts));
});
