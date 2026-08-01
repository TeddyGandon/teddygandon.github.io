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

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and
publishes it to GitHub Pages automatically. In the repo's Settings → Pages, set the
source to **GitHub Actions** (one-time setup).

This repo is a user/organization page (`teddygandon.github.io`), so it's served at the
domain root — no `base` path configuration needed in `vite.config.js`. `public/404.html`
handles the [SPA-on-GitHub-Pages redirect trick](https://github.com/rafgraph/spa-github-pages)
so Vue Router's history mode still serves clean URLs on refresh/direct link.
