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

export function getArticles() {
  return articles;
}

export function getArticleBySlug(slug) {
  return articles.find((article) => article.slug === slug);
}
