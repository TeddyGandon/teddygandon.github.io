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

watchEffect(() => {
  setPageMeta(
    activeTag.value
      ? {
          title: `Articles tagged "${activeTag.value}"`,
          description: `Articles tagged "${activeTag.value}" — writing by Teddy Gandon, Engineering Manager.`,
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

      <div v-if="flags.displayArticlesTags && allTags.length" class="article-tags-filter mt-5" v-reveal>
        <RouterLink :to="{ name: 'articles' }" class="tag is-dark mr-2" :class="{ 'is-active': !activeTag }">
          All
        </RouterLink>
          <RouterLink
            v-if="flags.displayArticlesTags"
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

      <div v-else class="mt-6">
        <article v-for="article in filteredArticles" :key="article.slug" class="article-card" v-reveal>
          <p class="article-card__date">{{ formatDate(article.date) }}</p>
          <h2 class="article-card__title">
            <RouterLink :to="{ name: 'article', params: { slug: article.slug } }">
              {{ article.title }}
            </RouterLink>
          </h2>
          <p class="article-card__excerpt">{{ article.excerpt }}</p>
          <div v-if="flags.displayArticlesTags && article.tags.length" class="article-card__tags">
            <RouterLink
              v-for="tag in article.tags"
              :key="tag"
              :to="{ name: 'articles', query: { tag } }"
              class="tag is-dark mr-2"
              :class="{ 'is-active': activeTag === tag }"
            >
              {{ tag }}
            </RouterLink>
          </div>
          <div v-if="!flags.displayArticlesTags && article.tags.length" class="article-card__tags">
            <span v-for="tag in article.tags" :key="tag" class="tag is-dark mr-2">{{ tag }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
