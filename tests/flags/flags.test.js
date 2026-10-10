// @vitest-environment happy-dom
// Each flag in src/data/flags.js is checked in both states, on every view that reads it.
import { readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { parseFrontmatter } from '../../src/utils/frontmatter.js';
import { importWithFlags, mountComponent, mountView, setToday } from './helpers.js';

const HOME = '../../src/views/HomeView.vue';
const EXPERIENCE = '../../src/views/ExperienceView.vue';
const ARTICLES = '../../src/views/ArticlesView.vue';
const ARTICLE = '../../src/views/ArticleView.vue';
const FOOTER = '../../src/components/SiteFooter.vue';

// import.meta.url isn't a file: URL under happy-dom; vitest runs from the project root.
const articlesDir = resolve('src/content/articles');
const articleFiles = readdirSync(articlesDir)
  .filter((file) => file.endsWith('.md'))
  .map((file) => ({
    slug: file.replace(/\.md$/, ''),
    ...parseFrontmatter(readFileSync(join(articlesDir, file), 'utf-8')).data,
  }))
  .filter((article) => (article.status ?? 'published') === 'published');

async function importRealFlags() {
  vi.resetModules();
  vi.doUnmock('../../src/data/flags.js');
  return (await import('../../src/data/flags.js')).flags;
}

afterEach(() => {
  vi.useRealTimers();
  document.documentElement.removeAttribute('data-palette');
});

describe('displayCertifications', () => {
  it('shows the certifications section and mentions when on', async () => {
    const experience = await mountView(EXPERIENCE, { displayCertifications: true });
    expect(experience.text()).toContain('Certifications');
    expect(experience.findAll('.cert-card').length).toBeGreaterThan(0);

    const home = await mountView(HOME, { displayCertifications: true });
    expect(home.text()).toContain('Certified PSM I');
    expect(home.text()).toContain('View experience & certifications');
  });

  it('hides them when off', async () => {
    const experience = await mountView(EXPERIENCE, { displayCertifications: false });
    expect(experience.text()).not.toContain('Certifications');
    expect(experience.find('.cert-card').exists()).toBe(false);

    const home = await mountView(HOME, { displayCertifications: false });
    expect(home.text()).not.toContain('Certified PSM I');
    expect(home.text()).not.toContain('certifications');
    expect(home.text()).toContain('View experience');
  });
});

describe('displayNewRole', () => {
  const timeline = async (flags) => {
    const wrapper = await mountView(EXPERIENCE, flags);
    return wrapper.findAll('.timeline-item').map((item) => ({
      period: item.find('.timeline-item__period').text(),
      role: item.find('.timeline-item__role').text(),
    }));
  };

  it('puts the new role on top of the timeline and closes the previous one when on', async () => {
    const items = await timeline({ displayNewRole: true });
    expect(items[0]).toEqual({ period: '2026 // Today', role: 'Head Of BTech Alliance' });
    expect(items[1]).toEqual({ period: '2022 // 2026', role: 'Engineering Manager' });
  });

  it('keeps the current role open-ended when off', async () => {
    const items = await timeline({ displayNewRole: false });
    expect(items[0]).toEqual({ period: '2022 // Today', role: 'Engineering Manager' });
    expect(items.map((item) => item.role)).not.toContain('Head Of BTech Alliance');
  });
});

describe('displayFutureArticles', () => {
  // A date where some articles are already published and others still scheduled.
  const today = '2026-08-10';
  const published = articleFiles.filter((article) => article.date <= today);
  const scheduled = articleFiles.filter((article) => article.date > today);

  it('has both published and scheduled articles to test with', () => {
    expect(published.length).toBeGreaterThan(0);
    expect(scheduled.length).toBeGreaterThan(0);
  });

  it('lists scheduled articles too when on', async () => {
    setToday(new Date(`${today}T12:00:00Z`));
    const list = await mountView(ARTICLES, { displayFutureArticles: true }, { route: '/articles' });
    expect(list.text()).toContain(`${articleFiles.length} pieces`);
    for (const article of scheduled) expect(list.text()).toContain(article.title);
  });

  it('only lists articles dated today or earlier when off', async () => {
    setToday(new Date(`${today}T12:00:00Z`));
    const list = await mountView(ARTICLES, { displayFutureArticles: false }, { route: '/articles' });
    expect(list.text()).toContain(`${published.length} ${published.length === 1 ? 'piece' : 'pieces'}`);
    for (const article of published) expect(list.text()).toContain(article.title);
    for (const article of scheduled) expect(list.text()).not.toContain(article.title);

    const home = await mountView(HOME, { displayFutureArticles: false });
    for (const article of scheduled) expect(home.text()).not.toContain(article.title);
  });
});

describe('displayDrafts', () => {
  const drafts = readdirSync(articlesDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({
      slug: file.replace(/\.md$/, ''),
      ...parseFrontmatter(readFileSync(join(articlesDir, file), 'utf-8')).data,
    }))
    .filter((article) => article.status === 'draft');

  it('has a draft article to test with', () => {
    expect(drafts.length).toBeGreaterThan(0);
  });

  it('lists drafts and opens them at their URL when on', async () => {
    const list = await mountView(ARTICLES, { displayDrafts: true, displayFutureArticles: true }, { route: '/articles' });
    for (const draft of drafts) {
      expect(list.text()).toContain(draft.title);
      const page = await mountView(ARTICLE, { displayDrafts: true }, { props: { slug: draft.slug } });
      expect(page.text()).not.toContain('Article not found');
    }
  });

  it('hides drafts from the lists and their URL when off', async () => {
    const list = await mountView(ARTICLES, { displayDrafts: false, displayFutureArticles: true }, { route: '/articles' });
    const home = await mountView(HOME, { displayDrafts: false, displayFutureArticles: true });
    for (const draft of drafts) {
      expect(list.text()).not.toContain(draft.title);
      expect(home.text()).not.toContain(draft.title);
      const page = await mountView(ARTICLE, { displayDrafts: false }, { props: { slug: draft.slug } });
      expect(page.text()).toContain('Article not found');
    }
  });
});
