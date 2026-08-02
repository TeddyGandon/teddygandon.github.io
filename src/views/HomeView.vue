<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { softSkills } from '../data/experience';
import { linkedinPosts } from '../data/linkedin';
import { getArticles } from '../utils/articles';
import { formatDate } from '../utils/format';

const stats = [
  { value: '20+', label: 'Years of engineering' },
  { value: '5', label: 'Roles, one throughline' },
  { value: '4', label: 'Companies' },
];

const latestArticles = computed(() => getArticles().slice(0, 3));
const recentLinkedInPosts = computed(() => linkedinPosts.slice(0, 3));
</script>

<template>
<div>
  <section class="hero-wrap section pt-6">
    <span class="hero-glow hero-glow--gold" aria-hidden="true"></span>
    <span class="hero-glow hero-glow--teal" aria-hidden="true"></span>

    <div class="container">
      <div class="hero-grid">
        <div class="hero-copy">
          <p class="hero-eyebrow" v-reveal>Engineering Manager</p>
          <h1 class="title hero-title is-1 mt-2" v-reveal>Teddy Gandon</h1>
          <p class="hero-lede mt-4" v-reveal>
            Twenty years of engineering, specialized in multicultural management. I build teams that
            ship calmly and deliberately across languages, time zones, and working styles.
          </p>

          <div class="mt-5 hero-actions" v-reveal>
            <RouterLink to="/experience" class="button is-primary is-outlined mr-3">
              View experience
            </RouterLink>
            <RouterLink to="/articles" class="button is-ghost has-text-grey-light"> Read articles </RouterLink>
          </div>
        </div>

        <div class="hero-medallion-wrap" v-reveal>
          <div class="hero-medallion" aria-hidden="true"><span>TG</span></div>
          <p class="hero-medallion__caption">
            Believe France<br />
            Engineering Manager
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="section stat-section py-6">
    <div class="container">
      <div class="stat-grid">
        <div v-for="stat in stats" :key="stat.label" class="stat-item" v-reveal>
          <p class="stat-item__value">{{ stat.value }}</p>
          <p class="stat-item__label">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>

  <!--
  <section class="section">
    <div class="container container-narrow">
      <p class="section-heading has-text-centered" v-reveal>What I bring</p>
      <div class="has-text-centered" v-reveal>
        <span v-for="skill in softSkills" :key="skill" class="skill-pill">{{ skill }}</span>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container container-narrow">
      <div class="callout-card" v-reveal>
        <p class="section-heading">Currently</p>
        <p class="hero-lede">
          Engineering Manager at <strong class="has-text-white">Believe France</strong>, since 2022 —
          after five years at Jellyfish France (formerly Tradelab), and a startup CTO chapter before
          that.
        </p>
        <RouterLink to="/experience" class="button is-text has-text-grey-light mt-3">
          See the full path →
        </RouterLink>
      </div>
    </div>
  </section>
  -->

  <section v-if="latestArticles.length" class="section">
    <div class="container container-narrow">
      <p class="section-heading" v-reveal>Latest writing</p>
      <div class="card-grid">
        <RouterLink
          v-for="article in latestArticles"
          :key="article.slug"
          :to="{ name: 'article', params: { slug: article.slug } }"
          class="featured-article"
          v-reveal
        >
          <p class="article-card__date">{{ formatDate(article.date) }}</p>
          <h3 class="featured-article__title">{{ article.title }}</h3>
          <p class="article-card__excerpt">{{ article.excerpt }}</p>
          <span class="featured-article__cta">Read the article →</span>
        </RouterLink>
      </div>
      <RouterLink to="/articles" class="button is-text has-text-grey-light mt-3">
        See all articles →
      </RouterLink>
    </div>
  </section>

  <section v-if="recentLinkedInPosts.length" class="section">
    <div class="container container-narrow">
      <p class="section-heading" v-reveal>Latest on LinkedIn</p>
      <div class="card-grid">
        <a
          v-for="post in recentLinkedInPosts"
          :key="post.url"
          :href="post.url"
          target="_blank"
          rel="noopener noreferrer"
          class="featured-article linkedin-card"
          v-reveal
        >
          <img
            v-if="post.image"
            :src="post.image"
            alt="Photo from the LinkedIn post"
            loading="lazy"
            class="linkedin-card__image"
          />
          <div class="linkedin-card__body">
            <p class="article-card__date">{{ formatDate(post.date) }}</p>
            <p class="article-card__excerpt">{{ post.text }}</p>
            <span class="featured-article__cta">View on LinkedIn →</span>
          </div>
        </a>
      </div>
      <a
        href="https://www.linkedin.com/in/teddygandon/recent-activity/all/"
        target="_blank"
        rel="noopener noreferrer"
        class="button is-text has-text-grey-light mt-3"
      >
        See all posts on LinkedIn →
      </a>
    </div>
  </section>
</div>
</template>
