<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { getArticleBySlug } from '../utils/articles';
import { formatDate } from '../utils/format';

const props = defineProps({
  slug: { type: String, required: true },
});

const article = computed(() => getArticleBySlug(props.slug));
</script>

<template>
  <section class="section pt-6">
    <div class="container container-narrow">
      <RouterLink to="/articles" class="has-text-grey-light" style="font-size: 0.9rem">
        ← All articles
      </RouterLink>

      <template v-if="article">
        <p class="article-card__date mt-5">{{ formatDate(article.date) }}</p>
        <h1 class="title hero-title is-3 mt-2">{{ article.title }}</h1>
        <div v-if="article.tags.length" class="mb-5">
          <span v-for="tag in article.tags" :key="tag" class="tag is-dark mr-2">{{ tag }}</span>
        </div>
        <div class="prose mt-5" v-html="article.html" />
      </template>

      <template v-else>
        <h1 class="title hero-title is-3 mt-5">Article not found</h1>
        <p class="hero-lede mt-3">This one may have moved or never existed.</p>
      </template>
    </div>
  </section>
</template>
