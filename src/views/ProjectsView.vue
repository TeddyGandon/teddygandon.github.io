<script setup>
import { computed, watchEffect } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { sideProjects } from '../data/projects';
import { setPageMeta } from '../utils/seo';

const route = useRoute();
const allTags = [...new Set(sideProjects.flatMap((project) => project.tags))].sort();
const activeTag = computed(() => route.query.tag ?? null);
const filteredProjects = computed(() =>
  activeTag.value ? sideProjects.filter((project) => project.tags.includes(activeTag.value)) : sideProjects,
);

watchEffect(() => {
  setPageMeta(
    activeTag.value
      ? {
          title: `Side projects tagged "${activeTag.value}"`,
          description: `Side projects tagged "${activeTag.value}" — games, tools, and open source by Teddy Gandon.`,
          path: '/projects',
        }
      : {
          title: 'Side projects',
          description: 'Personal games and the open-source platform behind them, built in my free time.',
          path: '/projects',
        },
  );
});
</script>

<template>
<div>
  <section class="section pt-6">
    <div class="container container-narrow">
      <p class="hero-eyebrow" v-reveal><i class="fa-solid fa-flask heading-icon" aria-hidden="true"></i>Free time</p>
      <h1 class="title hero-title is-3 mt-2" v-reveal>Side projects</h1>
      <p v-if="sideProjects.length" class="hero-lede is-size-6 mt-2" v-reveal>
        {{ sideProjects.length }} {{ sideProjects.length === 1 ? 'project' : 'projects' }} built in my free time: games,
        tools, and open-source code, anything that sparks my curiosity.
      </p>

      <div class="pill-list mt-5" v-reveal>
        <RouterLink :to="{ name: 'projects' }" class="pill" :class="{ 'is-active': !activeTag }">
          All
        </RouterLink>
        <RouterLink
          v-for="tag in allTags"
          :key="tag"
          :to="{ name: 'projects', query: { tag } }"
          class="pill"
          :class="{ 'is-active': activeTag === tag }"
        >
          {{ tag }}
        </RouterLink>
      </div>

      <p v-if="!filteredProjects.length" class="hero-lede mt-5" v-reveal>
        No projects tagged &ldquo;{{ activeTag }}&rdquo; yet.
      </p>

      <div v-else class="project-list mt-6" v-reveal>
        <a
          v-for="project in filteredProjects"
          :key="project.name"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="surface-card project-card"
        >
          <div class="project-card__media">
            <img
              :src="project.image"
              :alt="project.imageAlt"
              loading="lazy"
              decoding="async"
              width="1920"
              height="1080"
            />
          </div>
          <div class="project-card__body">
            <div class="pill-list">
              <span v-for="tag in project.tags" :key="tag" class="pill">{{ tag }}</span>
            </div>
            <h2 class="card-title">{{ project.name }}</h2>
            <p class="card-text">{{ project.description }}</p>
            <div class="project-card__footer">
              <p class="project-card__note">{{ project.note }}</p>
              <span class="card-cta">{{ project.cta }} <span class="card-cta__arrow" aria-hidden="true">→</span></span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</div>
</template>
