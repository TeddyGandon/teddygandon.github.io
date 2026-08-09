<script setup>
import { RouterLink } from 'vue-router';
import { getArticles, getAllArticles } from '../utils/articles';
import { formatDate } from '../utils/format';
import { flags } from '../data/flags';

const articles = flags.displayAllArticles ?
  getAllArticles() :
  getArticles();
</script>

<template>
  <section class="section pt-6">
    <div class="container container-narrow">
      <p class="hero-eyebrow" v-reveal>Writing</p>
      <h1 class="title hero-title is-3 mt-2" v-reveal>Articles</h1>

      <p v-if="!articles.length" class="hero-lede mt-5" v-reveal>Nothing published yet — check back soon.</p>

      <div v-else class="mt-6">
        <article v-for="article in articles" :key="article.slug" class="article-card" v-reveal>
          <p class="article-card__date">{{ formatDate(article.date) }}</p>
          <h2 class="article-card__title">
            <RouterLink :to="{ name: 'article', params: { slug: article.slug } }">
              {{ article.title }}
            </RouterLink>
          </h2>
          <p class="article-card__excerpt">{{ article.excerpt }}</p>
          <div v-if="article.tags.length" class="article-card__tags">
            <span v-for="tag in article.tags" :key="tag" class="tag is-dark mr-2">{{ tag }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
