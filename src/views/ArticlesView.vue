<script setup>
import { computed, watchEffect } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { getArticles, getAllArticles } from '../utils/articles';
import { formatDate, formatTag } from '../utils/format';
import { flags } from '../data/flags';
import { setPageMeta } from '../utils/seo';

const route = useRoute();
const articles = flags.displayFutureArticles ? getAllArticles() : getArticles();
const allTags = computed(() => [...new Set(articles.flatMap((article) => article.tags))].sort());
const activeTag = computed(() => route.query.tag ?? null);
const filteredArticles = computed(() =>
  activeTag.value ? articles.filter((article) => article.tags.includes(activeTag.value)) : articles,
);
const featuredArticle = computed(() => filteredArticles.value[0] ?? null);
const restArticles = computed(() => filteredArticles.value.slice(1));

watchEffect(() => {
  setPageMeta(
    activeTag.value
      ? {
          title: `Articles tagged "${formatTag(activeTag.value)}"`,
          description: `Articles tagged "${formatTag(activeTag.value)}" — writing by Teddy Gandon, Senior Engineering Manager.`,
          path: '/articles',
        }
      : {
          title: 'Articles',
          description: 'Writing on multicultural management, engineering leadership, and frameworks.',
          path: '/articles',
        },
  );
});
</script>

<template>
  <section class="section pt-6">
    <div class="container container-narrow">
      <p class="hero-eyebrow" v-reveal><i class="fa-solid fa-feather-pointed heading-icon" aria-hidden="true"></i>Writing</p>
      <h1 class="title hero-title is-3 mt-2" v-reveal>Articles</h1>
      <p v-if="articles.length" class="hero-lede is-size-6 mt-2" v-reveal>
        {{ articles.length }} {{ articles.length === 1 ? 'piece' : 'pieces' }} on multicultural management,
        engineering leadership, and the frameworks I keep coming back to.
      </p>

      <div v-if="allTags.length" class="pill-list mt-5" v-reveal>
        <RouterLink :to="{ name: 'articles' }" class="pill" :class="{ 'is-active': !activeTag }">
          All
        </RouterLink>
          <RouterLink
            v-for="tag in allTags"
            :key="tag"
            :to="{ name: 'articles', query: { tag } }"
            class="pill"
            :class="{ 'is-active': activeTag === tag }"
          >
            {{ formatTag(tag) }}
          </RouterLink>
      </div>

      <p v-if="!filteredArticles.length" class="hero-lede mt-5" v-reveal>
        <template v-if="activeTag">No articles tagged &ldquo;{{ formatTag(activeTag) }}&rdquo; yet.</template>
        <template v-else>Nothing published yet — check back soon.</template>
      </p>

      <template v-else>
        <RouterLink
          :to="{ name: 'article', params: { slug: featuredArticle.slug } }"
          class="surface-card article-feature mt-6"
          v-reveal
        >
          <p class="text-meta">
            {{ formatDate(featuredArticle.date) }} <span aria-hidden="true">·</span> {{ featuredArticle.readingTime }}
          </p>
          <div v-if="featuredArticle.tags.length" class="pill-list article-card__tags">
            <span class="pill pill--solid">{{ activeTag ? 'Top match' : 'Latest' }}</span>
            <span v-if="featuredArticle.status == 'draft'" class="pill pill--solid">Draft</span>
            <span v-for="tag in featuredArticle.tags" :key="tag" class="pill">{{ formatTag(tag) }}</span>
          </div>
          <h2 class="card-title">{{ featuredArticle.title }}</h2>
          <p class="card-text">{{ featuredArticle.excerpt }}</p>
          <span class="card-cta">Read the article <span class="card-cta__arrow" aria-hidden="true">→</span></span>
        </RouterLink>

        <div v-if="restArticles.length" class="card-grid mt-5">
          <RouterLink
            v-for="article in restArticles"
            :key="article.slug"
            :to="{ name: 'article', params: { slug: article.slug } }"
            class="surface-card"
            v-reveal
          >
            <p class="text-meta">
              {{ formatDate(article.date) }} <span aria-hidden="true">·</span> {{ article.readingTime }}
            </p>
            <div v-if="article.tags.length" class="pill-list article-card__tags">
              <span v-if="article.status == 'draft'" class="pill pill--solid">Draft</span>
              <span v-for="tag in article.tags" :key="tag" class="pill">{{ formatTag(tag) }}</span>
            </div>
            <h3 class="card-title">{{ article.title }}</h3>
            <p class="card-text">{{ article.excerpt }}</p>
          </RouterLink>
        </div>
      </template>
    </div>
  </section>
</template>
