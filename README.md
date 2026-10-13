# teddygandon.github.io

Personal portfolio — Vue 3 + Vite + Bulma, dark theme, EB Garamond typography.

## Stack

- **Vue 3** (`<script setup>` SFCs) + **Vue Router** (history mode)
- **Bulma 1.x**, reconfigured at build time for a warm, muted dark palette
- **EB Garamond**, self-hosted via `@fontsource`
- **markdown-it**, for the articles system (see below)

## Develop

```sh
npm install
npm run dev
```

## Build

```sh
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```

## Test

```sh
npm test              # unit tests: flags, scripts, content (Vitest)
npm run test:spelling # typos in articles, views and data (cspell)
npm run test:e2e      # smoke-tests every page of dist/ in headless Chrome — build first
npm run test:all      # all of the above, build included
```

- **`tests/flags/`** — mounts the views with each flag on and off, and checks what's shown.
- **`tests/scripts/`** — sitemap generation, the upsert merge, the Medium / LeadDev / LinkedIn
  connectors (against fixtures, with `fetch` mocked) and the load-external-sources orchestration.
- **`tests/content.test.js`** — article front matter and the shape of the generated data files.
- **`tests/e2e/`** — serves the build with `vite preview` and visits every sitemap URL, every
  article (scheduled ones included) and every internal link: no JS/console error, no failed
  request, no broken image, no 404 view. Third-party requests are stubbed.

Unknown-but-correct words (names, jargon) go in the `words` list of `cspell.json`. The deploy
workflow runs all of these and doesn't publish if one fails.

## Writing articles

Drop a Markdown file into `src/content/articles/`. The filename (minus `.md`) becomes the
URL slug — `my-post.md` → `/articles/my-post`. Each file needs a small front-matter block:

```md
---
title: My Post Title
date: 2026-01-15
excerpt: One or two sentences shown on the articles list.
tags: [tag-one, tag-two]
---

Body content in regular Markdown.
```

Articles are picked up automatically (`src/utils/articles.js`) — no registration step,
no rebuild-time config. Sort order is by `date`, descending.

## Resume generation

Resume templates and their PDF export live in [`../job-hunting-tools`](../job-hunting-tools)
(`npm run export-cv-to-pdf` there). `public/teddy-gandon-resume.pdf` is the copy the site offers
for download; replace it with a fresh export when the resume changes.

## Data

Content that isn't a Markdown article lives in `src/data/` as plain exported arrays/objects,
imported directly by the views that render them:

- **`experience.js`** — the experience timeline and the flat list of soft skills, both
  rendered on `ExperienceView`.
- **`skills.js`** — hard skills, grouped (Management, Languages, Frameworks, ...) and rated
  1–3, rendered as dot meters on `ExperienceView`.
- **`certifications.js`** — certifications with issuer, description, and a note on how each
  applies in practice, rendered on `ExperienceView`. `url` is a `'#'` placeholder per entry
  until the real verification badge links (Credly / Scrum.org / Coursera) are added.
- **`projects.js`** (`sideProjects`) — personal side projects, rendered on `ProjectsView`.
- **`linkedin.js`** (`linkedinPosts`) — LinkedIn posts, rendered on `HomeView`. LinkedIn has
  no public API for reading a profile's own posts, so `npm run load-external-sources`
  (`scripts/load-external-sources/connectors/linkedin.js`) scrapes the latest ones (with reaction and comment counts) from the public
  profile page and merges them into this file; entries can still be added by hand.
- **`official-publications.js`** (`officialPublications`) — articles published on Medium and
  LeadDev, loaded by the same script (`scripts/load-external-sources.js`).

Both loaded files are upserted, never rewritten from scratch (`scripts/load-external-sources/merge.js`):
fetched entries are matched to stored ones by URL and updated in place or added. Stored entries
are never deleted, even when a source fails or stops listing them, and empty fetched values don't
overwrite stored ones. Hand-added entries are kept too.

## Flags

`src/data/flags.js` exports simple booleans that gate optional sections of the site,
consumed via `v-if` in the relevant views/components:

- **`displayDrafts`** — shows articles with `status: draft` in the lists and at their URL;
  off by default, for local/dev use.
- **`displayFutureArticles`** — bypass the future-dated article scheduling in `articles.js`
  (see "Writing articles" above); for local/dev use.
- **`displayCertifications`** — shows the Certifications section (and related mentions
  elsewhere); date-gated to flip on `2026-10-01`.
- **`displayArticlesTags`** — shows tag filtering on the articles list; date-gated to flip
  on `2026-09-14`.
- **`displayChangingTheme`** — shows the date/time-based theme emoji toggle in the footer
  (see "Themes" above).

Note: the file currently ends with a blanket override that forces every flag to `true`
regardless of the logic above it — remove that line to restore the date-gated behavior.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes it to GitHub Pages automatically. In the repo's Settings → Pages, set the
source to **GitHub Actions** (one-time setup).

`.github/workflows/update-external-sources.yml` runs `npm run load-external-sources` every day
at 05:00 UTC (or on demand from the Actions tab). If `src/data/` changed, it commits the update
to `main` and starts the deploy workflow.

This repo is a user/organization page (`teddygandon.github.io`), so it's served at the
domain root — no `base` path configuration needed in `vite.config.js`. `public/404.html`
handles the [SPA-on-GitHub-Pages redirect trick](https://github.com/rafgraph/spa-github-pages)
so Vue Router's history mode still serves clean URLs on refresh/direct link.
