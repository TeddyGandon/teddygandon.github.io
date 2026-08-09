// Updates the per-page head tags declared (with ids) in index.html. Real
// browsers and Google (which renders JS) see these; link-preview bots do not
// — see the comment on those tags in index.html for why that's a known gap.
const SITE_URL = 'https://teddygandon.github.io';
const DEFAULT_TITLE = 'Teddy Gandon — Engineering Manager';
const DEFAULT_DESCRIPTION =
  'Teddy Gandon — Engineering Manager. Twenty years of engineering, specialized in multicultural management.';

function setMetaContent(id, content) {
  document.getElementById(id)?.setAttribute('content', content);
}

export function setPageMeta({ title, description, path = '/' } = {}) {
  const fullTitle = title ? `${title} — Teddy Gandon` : DEFAULT_TITLE;
  const fullDescription = description ?? DEFAULT_DESCRIPTION;
  const url = `${SITE_URL}${path}`;

  document.title = fullTitle;
  setMetaContent('meta-description', fullDescription);
  setMetaContent('meta-og-title', fullTitle);
  setMetaContent('meta-og-description', fullDescription);
  setMetaContent('meta-og-url', url);
  setMetaContent('meta-twitter-title', fullTitle);
  setMetaContent('meta-twitter-description', fullDescription);
  document.getElementById('meta-canonical')?.setAttribute('href', url);
}
