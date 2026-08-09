<script setup>
import { computed, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';
import { getArticleBySlug } from '../utils/articles';
import { formatDate } from '../utils/format';
import { flags } from '../data/flags';
import { setPageMeta } from '../utils/seo';

const props = defineProps({
  slug: { type: String, required: true },
});

const article = computed(() => getArticleBySlug(props.slug));

watchEffect(() => {
  setPageMeta(
    article.value
      ? { title: article.value.title, description: article.value.excerpt, path: `/articles/${props.slug}` }
      : { title: 'Article not found', path: `/articles/${props.slug}` },
  );
});
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
        <div v-if="flags.displayArticlesTags && article.tags.length" class="mb-5">
          <RouterLink
            v-for="tag in article.tags"
            :key="tag"
            :to="{ name: 'articles', query: { tag } }"
            class="tag is-dark mr-2"
          >
            {{ tag }}
          </RouterLink>
        </div>
        <div v-if="!flags.displayArticlesTags && article.tags.length" class="mb-5">
          <span v-for="tag in article.tags" :key="tag" class="tag is-dark mr-2">{{ tag }}</span>
        </div>
        <div class="prose mt-5" v-html="article.html" />
        <div class="mt-5">
          <i class="has-text-grey-light" style="font-size: 0.9rem">The views expressed here are entirely my own and do not reflect the views of my employer.</i>
        </div>
      </template>

      <template v-else>
        <h1 class="title hero-title is-3 mt-5">Article not found</h1>
        <p class="hero-lede mt-3">This one may have moved or never existed.</p>
      </template>
    </div>
  </section>
</template>
