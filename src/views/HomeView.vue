<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { softSkills } from '../data/experience';
import { linkedinPosts } from '../data/linkedin';
import { officialPublications } from '../data/official-publications';
import { getArticles, getAllArticles } from '../utils/articles';
import { formatDate } from '../utils/format';
import { flags } from '../data/flags';

const stats = [
  { value: '20', label: 'Years of engineering' },
  { value: '15', label: 'Years in leadership' },
  { value: '4', label: 'Companies, one throughline' },
];

const latestArticles = flags.displayFutureArticles ?
  computed(() => getAllArticles().slice(0, 3)) :
  computed(() => getArticles().slice(0, 3));
// Only surface posts that resonated — 50+ reactions.
const MIN_LINKEDIN_REACTIONS = 20;
const recentLinkedInPosts = computed(() =>
  linkedinPosts.filter((post) => (post.reactions?.total ?? 0) >= MIN_LINKEDIN_REACTIONS).slice(0, 10),
);

// LinkedIn's internal reaction names → Font Awesome icon + the label LinkedIn shows.
const reactionIcons = {
  LIKE: { icon: 'fa-thumbs-up', label: 'Like' },
  PRAISE: { icon: 'fa-hands-clapping', label: 'Celebrate' },
  APPRECIATION: { icon: 'fa-hand-holding-heart', label: 'Support' },
  EMPATHY: { icon: 'fa-heart', label: 'Love' },
  INTEREST: { icon: 'fa-lightbulb', label: 'Insightful' },
  ENTERTAINMENT: { icon: 'fa-face-laugh-squint', label: 'Funny' },
};
const postReactions = (post) =>
  (post.reactions?.types ?? []).filter((type) => reactionIcons[type]).map((type) => ({ type, ...reactionIcons[type] }));
const recentPublications = computed(() => officialPublications.slice(0, 5));
</script>

<template>
<div>
  <section class="hero-wrap section pt-6">
    <span class="hero-glow hero-glow--gold" aria-hidden="true"></span>
    <span class="hero-glow hero-glow--teal" aria-hidden="true"></span>

    <div class="container">
      <div class="hero-grid">
        <div class="hero-copy">
          <p class="hero-eyebrow" v-reveal>Leading engineering teams across borders</p>
          <h1 class="title hero-title is-1 mt-2" v-reveal>Teddy Gandon</h1>
          <p class="hero-lede mt-4" v-reveal>
            Twenty years of engineering, specialized in multicultural management. I build teams that ship
            calmly and deliberately across languages, time zones, and working styles.
          </p>
          <p class="hero-lede is-size-6 mt-2" v-if="flags.displayAvailability" v-reveal>
            <strong class="has-text-paper-muted">Opened to new position.</strong>
          </p>
          <p class="hero-lede is-size-6 mt-2" v-if="flags.displayCertifications" v-reveal>
            <strong class="has-text-paper-muted">Certified PSM I &amp; Google Cloud Digital Leader.</strong>
          </p>

          <div class="mt-5 hero-actions" v-reveal>
            <RouterLink to="/experience" class="button is-primary is-outlined mr-3" v-if="!flags.displayCertifications">
              View experience
            </RouterLink>
            <RouterLink to="/experience" class="button is-primary is-outlined mr-3" v-if="flags.displayCertifications">
              View experience & certifications
            </RouterLink>
            <a href="/teddy-gandon-resume.pdf" download class="button is-primary is-outlined mr-3">
              Download resume
            </a>
          </div>
        </div>

        <div class="hero-medallion-wrap" v-reveal>
          <div class="hero-medallion" aria-hidden="true"><span>TG</span></div>
          <p class="hero-medallion__caption" v-if="!flags.displayNewRole">
            Engineering Manager<br />
            @Believe
          </p>
          <p class="hero-medallion__caption" v-if="flags.displayNewRole">
            Head of BTech Alliance<br />
            @Believe
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

  <section v-if="recentPublications.length" class="section">
    <div class="container container-narrow">
      <p class="section-heading" v-reveal>Published elsewhere</p>
      <ul class="publication-list">
        <li
          v-for="publication in recentPublications"
          :key="publication.url"
          class="publication-row"
          v-reveal
        >
          <a :href="publication.url" target="_blank" rel="noopener noreferrer" class="publication-row__link">
            <span class="publication-row__source">{{ publication.sourceLabel }}</span>
            <span class="publication-row__body">
              <span class="publication-row__title">{{ publication.title }}</span>
              <span class="publication-row__excerpt">{{ publication.excerpt }}</span>
            </span>
            <span class="publication-row__date">{{ formatDate(publication.date) }}</span>
            <span class="publication-row__arrow" aria-hidden="true">→</span>
          </a>
        </li>
      </ul>
    </div>
  </section>

  <section v-if="recentLinkedInPosts.length" class="section">
    <div class="container container-narrow">
      <p class="section-heading" v-reveal>Latest on LinkedIn</p>
      <div class="social-feed" v-reveal>
        <a
          v-for="post in recentLinkedInPosts"
          :key="post.url"
          :href="post.url"
          target="_blank"
          rel="noopener noreferrer"
          class="social-post"
        >
          <div class="social-post__header">
            <span class="social-post__badge"><i class="fa-brands fa-linkedin-in" aria-hidden="true"></i></span>
            <span class="social-post__meta">
              <span class="social-post__name">Teddy Gandon</span>
              <span class="social-post__date">{{ formatDate(post.date) }}</span>
            </span>
          </div>
          <p class="social-post__text">&ldquo;{{ post.text }}&rdquo;</p>
          <img
            v-if="post.image"
            :src="post.image"
            alt="Photo from the LinkedIn post"
            loading="lazy"
            class="social-post__image"
          />
          <div v-if="post.reactions?.total || post.comments" class="social-post__reactions">
            <span
              v-if="post.reactions?.total"
              class="social-post__reaction-summary"
              :aria-label="`${post.reactions.total} reactions`"
            >
              <span class="social-post__reaction-icons">
                <span
                  v-for="reaction in postReactions(post)"
                  :key="reaction.type"
                  class="social-post__reaction-icon"
                  :title="reaction.label"
                >
                  <i :class="['fa-solid', reaction.icon]" aria-hidden="true"></i>
                </span>
              </span>
              {{ post.reactions.total }}
            </span>
            <span v-if="post.comments" class="social-post__comments" :aria-label="`${post.comments} comments`">
              <i class="fa-regular fa-comment" aria-hidden="true"></i> {{ post.comments }}
            </span>
          </div>
          <span class="social-post__cta">
            View on LinkedIn <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
          </span>
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
