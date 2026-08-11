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

## Themes

Each `src/assets/scss/_variables-*.scss` file defines a full theme under the same set of
variable names: palette (`$ink`, `$paper`, `$gold`, `$teal`, ...), the inputs fed into
Bulma's engine (`$bulma-scheme-h/-s`, `$bulma-accent`, `$bulma-family`), corner radii, and
motion tokens (`$speed-slow/-slower`, `$easing-calm`). Available themes: `paper` (the
default calm/editorial look), `cyberpunk`, `christmas`, `halloween`, `amiga`.

`main.scss` picks one of these at **compile time** via `@use '<file>' as vars;` on its
first line — that file's radii, motion, font, and Bulma's own accent color get baked into
the CSS build and can't change without a rebuild.

The *palette* (just the color variables) is also runtime-switchable, without a rebuild:
`_theme-vars.scss` compiles all five files' colors into CSS custom properties scoped
under `[data-palette="..."]` on `<html>`, and `src/utils/theme.js` exposes a reactive
`theme` ref that sets that attribute. `SiteFooter.vue` uses this to show a small emoji
button that suggests (and applies) a theme based on the current date/time: September →
Amiga (💾), October → Halloween (🎃), December → Christmas (🎄), 11pm–4am any other time →
Cyberpunk (🌆); outside those windows the button doesn't render. Gated by the
`displayChangingTheme` flag (see below).

A few themes also layer a purely decorative, self-contained ambient effect directly in
their own `_variables-*.scss` file (a neon flicker for cyberpunk, thunder flashes for
halloween, falling snow for christmas, a scanline/CRT filter plus greyscale images for
amiga), each scoped to its own `[data-palette=...]` selector and respecting
`prefers-reduced-motion`.

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
- **`linkedin.js`** (`linkedinPosts`) — a hand-curated excerpt of LinkedIn posts, rendered on
  `HomeView`. LinkedIn has no public API for reading a profile's own posts, so this list is
  updated manually whenever there's a new post worth surfacing.

## Flags

`src/data/flags.js` exports simple booleans that gate optional sections of the site,
consumed via `v-if` in the relevant views/components:

- **`displayAllArticles`** — bypass the future-dated article scheduling in `articles.js`
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

This repo is a user/organization page (`teddygandon.github.io`), so it's served at the
domain root — no `base` path configuration needed in `vite.config.js`. `public/404.html`
handles the [SPA-on-GitHub-Pages redirect trick](https://github.com/rafgraph/spa-github-pages)
so Vue Router's history mode still serves clean URLs on refresh/direct link.
