<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch, watchEffect } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import ArticleCard from '../components/ArticleCard.vue';
import { getArticleBySlug, getRelatedArticles } from '../utils/articles';
import { mountCharts } from '../utils/charts';
import { formatDate, formatTag } from '../utils/format';
import { setPageMeta } from '../utils/seo';
import { SITE_URL } from "../constants";

const props = defineProps({
  slug: { type: String, required: true },
  // 'articles' or 'studies'. Studies share this template but have no list page to go back to.
  collection: { type: String, default: 'articles' },
});

const article = computed(() => getArticleBySlug(props.slug));

// Coming from the list, step back in history so its tag filter and scroll
// position are restored; otherwise (direct visit, related article) link to it.
const router = useRouter();

function goBack(event, navigate) {
  const previous = window.history.state?.back;
  if (previous && previous.split('?')[0] === '/articles') {
    event.preventDefault();
    router.back();
  } else {
    navigate(event);
  }
}

const relatedArticles = computed(() => (article.value ? getRelatedArticles(article.value) : []));

const path = computed(() => `/${props.collection}/${props.slug}`);

const articleUrl = computed(() => `${SITE_URL}${path.value}`);

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

// Charts are mounted after v-html has rendered, and torn down when the article
// changes. `run` guards against a slow lazy import finishing after navigation.
const prose = ref(null);
let destroyCharts = () => {};
let run = 0;

async function renderCharts() {
  destroyCharts();
  destroyCharts = () => {};
  const current = ++run;
  const destroy = await mountCharts(prose.value);
  if (current === run) destroyCharts = destroy;
  else destroy();
}

onMounted(renderCharts);
watch(() => article.value?.html, renderCharts, { flush: 'post' });

onBeforeUnmount(() => {
  run++;
  destroyCharts();
});

watchEffect(() => {
  setPageMeta({ title: article.value.title, description: article.value.excerpt, path: path.value });
});
</script>

<template>
<div>
  <section class="section pt-6 pb-4">
    <div class="container container-narrow">
      <RouterLink v-if="collection === 'articles'" v-slot="{ href, navigate }" :to="{ name: 'articles' }" custom>
        <a :href="href" class="back-link" @click="goBack($event, navigate)">
          <i class="fa-solid fa-arrow-left" aria-hidden="true"></i> All articles
        </a>
      </RouterLink>
      <template v-if="article">
        <p class="text-meta mt-5">
          {{ formatDate(article.date) }} <span aria-hidden="true">·</span> {{ article.readingTime }}
        </p>
        <h1 class="title hero-title is-3 mt-2">{{ article.title }}</h1>
        <div class="article-toolbar">
          <div v-if="article.tags.length" class="pill-list">
            <RouterLink
              v-for="tag in article.tags"
              :key="tag"
              :to="{ name: 'articles', query: { tag } }"
              class="pill"
            >
              {{ formatTag(tag) }}
            </RouterLink>
          </div>
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
        </div>

        <div ref="prose" class="prose mt-5" v-html="article.html" />
      </template>

      <template v-else>
        <h1 class="title hero-title is-3 mt-5">Article not found</h1>
        <p class="hero-lede mt-3">This one may have moved or never existed.</p>
      </template>
    </div>
  </section>

  <section v-if="relatedArticles.length" class="section pt-4">
    <div class="container article-related">
      <p class="section-heading" v-reveal><i class="fa-solid fa-feather-pointed heading-icon" aria-hidden="true"></i>Keep reading</p>
      <div class="card-grid card-grid--three">
        <ArticleCard v-for="related in relatedArticles" :key="related.slug" :article="related" />
      </div>
    </div>
  </section>
</div>
</template>
