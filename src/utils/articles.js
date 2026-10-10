import MarkdownIt from 'markdown-it';
import { parseFrontmatter } from './frontmatter';
import { estimateReadingTime } from './format';
import { flags } from '../data/flags';

// Every .md file under content/articles/ becomes an article. Filename (minus
// extension) is the slug, so `writing-calmly.md` renders at /articles/writing-calmly.
// `eager: true` + `?raw` bundles the source text at build time — no runtime fetch,
// works the same in dev and on the static GitHub Pages build.
const modules = import.meta.glob('../content/articles/*.md', { query: '?raw', import: 'default', eager: true });

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

// ```chart fences hold a JSON config ({ type, title, labels, series }). They render
// to a placeholder that ArticleView turns into a Chart.js canvas once mounted.
// Invalid JSON falls back to the default code block, so the mistake stays visible.
const defaultFence = md.renderer.rules.fence;
md.renderer.rules.fence = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  if (token.info.trim() !== 'chart') return defaultFence(tokens, idx, options, env, self);
  try {
    const config = JSON.parse(token.content);
    const title = config.title ? `<figcaption>${md.utils.escapeHtml(config.title)}</figcaption>` : '';
    return `<figure class="md-chart" data-chart="${md.utils.escapeHtml(JSON.stringify(config))}"><div class="md-chart__canvas"></div>${title}</figure>\n`;
  } catch {
    return defaultFence(tokens, idx, options, env, self);
  }
};

function slugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '');
}

const today = new Date().toISOString().slice(0, 10);

const articles = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const slug = slugFromPath(path);
    const html = md.render(content);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? '',
      excerpt: data.excerpt ?? '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      html,
      readingTime: estimateReadingTime(html),
      status: data.status ?? 'published',
    };
  })
  // Drafts stay hidden everywhere (list and direct URL) unless the displayDrafts flag is on.
  .filter((p) => p.status === 'published' || flags.displayDrafts)
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
