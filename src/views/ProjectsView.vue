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
      <p class="hero-eyebrow" v-reveal><i class="fa-solid fa-flask heading-icon" aria-hidden="true"></i>Free time</p>
      <h1 class="title hero-title is-3 mt-2" v-reveal>Side projects</h1>

      <div class="project-list mt-6" v-reveal>
        <a
          v-for="project in projects"
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
              <span v-for="label in project.labels" :key="label" class="pill">{{ label }}</span>
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
