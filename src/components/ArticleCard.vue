<script setup>
import { RouterLink } from 'vue-router';
import { formatDate, formatTag } from '../utils/format';

defineProps({
  article: { type: Object, required: true },
  // Heading level, so the card fits the outline of the page it sits on.
  headingTag: { type: String, default: 'h3' },
});
</script>

<template>
  <RouterLink
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
    <component :is="headingTag" class="card-title">{{ article.title }}</component>
    <p class="card-text">{{ article.excerpt }}</p>
  </RouterLink>
</template>
