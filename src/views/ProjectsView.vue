<script setup>
import { sideProjects } from '../data/projects';
</script>

<template>
<div>
  <section class="section pt-6">
    <div class="container container-narrow">
      <p class="hero-eyebrow" v-reveal>Free time</p>
      <h1 class="title hero-title is-3 mt-2" v-reveal>Side projects</h1>
      <p class="hero-lede mt-4" v-reveal>
        A narrative card game, a PvP arena, and the open-source platform underneath both.
      </p>

      <div class="card-grid mt-6">
        <a
          v-for="project in sideProjects"
          :key="project.name"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="featured-article"
          v-reveal
        >
          <p class="info-card__name">{{ project.name }}</p>
          <p class="info-card__meta">{{ project.kind }}</p>
          <p class="info-card__desc">{{ project.description }}</p>
          <p class="info-card__note">{{ project.note }}</p>
        </a>
      </div>
    </div>
  </section>
</div>
</template>
