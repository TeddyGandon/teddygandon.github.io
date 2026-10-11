<script setup>
import { sideProjects } from '../data/projects';

const projects = sideProjects.map((project) => ({
  ...project,
  // "Game · Steam · Early Access" → one chip per part.
  labels: project.kind.split('·').map((label) => label.trim()),
}));
</script>

<template>
<div>
  <section class="section pt-6">
    <div class="container container-narrow">
      <p class="hero-eyebrow" v-reveal>Free time</p>
      <h1 class="title hero-title is-3 mt-2" v-reveal>Side projects</h1>

      <div class="project-list mt-6" v-reveal>
        <a
          v-for="project in projects"
          :key="project.name"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="project-card"
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
            <div class="project-card__labels">
              <span v-for="label in project.labels" :key="label" class="project-card__label">{{ label }}</span>
            </div>
            <h2 class="project-card__name">{{ project.name }}</h2>
            <p class="project-card__desc">{{ project.description }}</p>
            <div class="project-card__footer">
              <p class="project-card__note">{{ project.note }}</p>
              <span class="project-card__cta">{{ project.cta }} <span aria-hidden="true">→</span></span>
            </div>
          </div>
        </a>
      </div>
    </div>
  </section>
</div>
</template>
