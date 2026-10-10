<script setup>
import { computed, watchEffect } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { getArticles, getAllArticles } from '../utils/articles';
import { formatDate } from '../utils/format';
import { flags } from '../data/flags';
import { setPageMeta } from '../utils/seo';

const route = useRoute();
const articles = flags.displayAllArticles ? getAllArticles() : getArticles();
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
          title: `Articles tagged "${activeTag.value}"`,
          description: `Articles tagged "${activeTag.value}" — writing by Teddy Gandon, Senior Engineering Manager.`,
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
      <p class="hero-eyebrow" v-reveal>Writing</p>
      <h1 class="title hero-title is-3 mt-2" v-reveal>Articles</h1>
      <p v-if="articles.length" class="hero-lede is-size-6 mt-2" v-reveal>
        {{ articles.length }} {{ articles.length === 1 ? 'piece' : 'pieces' }} on multicultural management,
        engineering leadership, and the frameworks I keep coming back to.
      </p>

      <div v-if="allTags.length" class="article-tags-filter mt-5" v-reveal>
        <RouterLink :to="{ name: 'articles' }" class="tag is-dark mr-2" :class="{ 'is-active': !activeTag }">
          All
        </RouterLink>
          <RouterLink
            v-for="tag in allTags"
            :key="tag"
            :to="{ name: 'articles', query: { tag } }"
            class="tag is-dark mr-2"
            :class="{ 'is-active': activeTag === tag }"
          >
            {{ tag }}
          </RouterLink>
      </div>

      <p v-if="!filteredArticles.length" class="hero-lede mt-5" v-reveal>
        <template v-if="activeTag">No articles tagged &ldquo;{{ activeTag }}&rdquo; yet.</template>
        <template v-else>Nothing published yet — check back soon.</template>
      </p>

      <template v-else>
        <RouterLink
          :to="{ name: 'article', params: { slug: featuredArticle.slug } }"
          class="article-feature mt-6"
          v-reveal
        >
          <span class="article-feature__badge">{{ activeTag ? 'Top match' : 'Latest' }}</span>
          <p class="article-card__date">
            {{ formatDate(featuredArticle.date) }} <span aria-hidden="true">·</span> {{ featuredArticle.readingTime }}
          </p>
          <h2 class="article-feature__title">{{ featuredArticle.title }}</h2>
          <p class="article-feature__excerpt">{{ featuredArticle.excerpt }}</p>
          <div v-if="featuredArticle.tags.length" class="article-card__tags">
            <span v-for="tag in featuredArticle.tags" :key="tag" class="tag is-dark mr-2">{{ tag }}</span>
          </div>
          <span class="featured-article__cta">Read the article →</span>
        </RouterLink>

        <div v-if="restArticles.length" class="card-grid mt-6">
          <RouterLink
            v-for="article in restArticles"
            :key="article.slug"
            :to="{ name: 'article', params: { slug: article.slug } }"
            class="featured-article"
            v-reveal
          >
            <p class="article-card__date">
              {{ formatDate(article.date) }} <span aria-hidden="true">·</span> {{ article.readingTime }}
            </p>
            <div v-if="article.tags.length" class="article-card__tags">
              <span v-for="tag in article.tags" :key="tag" class="tag is-dark mr-2">{{ tag }}</span>
            </div>
            <h3 class="featured-article__title">{{ article.title }}</h3>
            <p class="article-card__excerpt">{{ article.excerpt }}</p>
          </RouterLink>
        </div>
      </template>
    </div>
  </section>
</template>
