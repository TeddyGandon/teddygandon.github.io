import MarkdownIt from 'markdown-it';
import { parseFrontmatter } from './frontmatter';

// Every .md file under content/articles/ becomes an article. Filename (minus
// extension) is the slug, so `writing-calmly.md` renders at /articles/writing-calmly.
// `eager: true` + `?raw` bundles the source text at build time — no runtime fetch,
// works the same in dev and on the static GitHub Pages build.
const modules = import.meta.glob('../content/articles/*.md', { query: '?raw', import: 'default', eager: true });

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

function slugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '');
}

const today = new Date().toISOString().slice(0, 10);

const articles = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const slug = slugFromPath(path);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      excerpt: data.excerpt ?? '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      html: md.render(content),
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

// Scheduled posts (date in the future, relative to the visitor's clock)
// are excluded from both the list and direct slug lookup until then.
const scheduledArticles = articles
  .filter((article) => article.date <= today)

export function getAllArticles() {
  return articles;
}

export function getArticles() {
  return scheduledArticles;
}

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug);
}
