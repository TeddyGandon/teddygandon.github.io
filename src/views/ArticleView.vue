<script setup>
import { computed, ref, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';
import { getArticleBySlug } from '../utils/articles';
import { formatDate } from '../utils/format';
import { flags } from '../data/flags';
import { setPageMeta, SITE_URL } from '../utils/seo';

const props = defineProps({
  slug: { type: String, required: true },
});

const article = computed(() => getArticleBySlug(props.slug));

const articleUrl = computed(() => `${SITE_URL}/articles/${props.slug}`);

const shareLinks = computed(() => {
  if (!article.value) return [];
  const url = encodeURIComponent(articleUrl.value);
  const title = encodeURIComponent(article.value.title);
  return [
    { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
    { name: 'X', icon: 'fa-brands fa-x-twitter', href: `https://twitter.com/intent/tweet?url=${url}&text=${title}` },
    { name: 'Email', icon: 'fa-solid fa-envelope', href: `mailto:?subject=${title}&body=${url}` },
  ];
});

const copied = ref(false);

async function copyLink() {
  try {
    await navigator.clipboard.writeText(articleUrl.value);
    copied.value = true;
  } catch {
    copied.value = false;
  }
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}

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

        <div class="article-share">
          <a
            v-for="link in shareLinks"
            :key="link.name"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Share on ${link.name}`"
            :title="`Share on ${link.name}`"
            class="article-share__icon"
          >
            <i :class="link.icon" aria-hidden="true" />
          </a>
          <button
            type="button"
            class="article-share__icon"
            :aria-label="copied ? 'Link copied' : 'Copy link'"
            :title="copied ? 'Link copied' : 'Copy link'"
            @click="copyLink"
          >
            <i class="fa-solid" :class="copied ? 'fa-check' : 'fa-link'" aria-hidden="true" />
          </button>
        </div>
      </template>

      <template v-else>
        <h1 class="title hero-title is-3 mt-5">Article not found</h1>
        <p class="hero-lede mt-3">This one may have moved or never existed.</p>
      </template>
    </div>
  </section>
</template>
