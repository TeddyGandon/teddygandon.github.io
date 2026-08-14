// Updates the per-page head tags declared (with ids) in index.html. Real
// browsers and Google (which renders JS) see these; link-preview bots do not
// — see the comment on those tags in index.html for why that's a known gap.
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_URL } from "../constants";

function setMetaContent(id, content) {
  document.getElementById(id)?.setAttribute('content', content);
}

export function setPageMeta({ title, description, path = '/' } = {}) {
  const fullTitle = title ? `${title} - Teddy Gandon` : DEFAULT_TITLE;
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
