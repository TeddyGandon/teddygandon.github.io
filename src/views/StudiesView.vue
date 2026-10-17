<script setup>
import { RouterLink } from 'vue-router';
import { getStudies } from '../utils/studies';

const studies = getStudies();
</script>

<template>
  <section class="section pt-6">
    <div class="container container-narrow">
      <p class="hero-eyebrow" v-reveal><i class="fa-solid fa-microscope heading-icon" aria-hidden="true"></i>Research</p>
      <h1 class="title hero-title is-3 mt-2" v-reveal>Studies</h1>
      <p class="hero-lede is-size-6 mt-2" v-reveal>
        I conducted studies in engineering and management: a question, a method, and what came out of it. 
        These are open source and helped me to shape my journey leading teams across borders.
      </p>
    </div>

    <!-- Wider than the text column above, so three pages still leave room for big titles. -->
    <div class="container">
      <div class="study-list mt-6" v-reveal>
        <RouterLink
          v-for="study in studies"
          :key="study.slug"
          :to="{ name: 'study', params: { slug: study.slug } }"
          class="study-card"
        >
          <!-- A miniature of the study itself, laid out wide then scaled down to the page. -->
          <div class="study-card__page">
            <h2 class="study-card__title">{{ study.title }}</h2>
            <div class="study-card__viewport">
              <div class="study-card__preview" inert aria-hidden="true">
                <div class="study">
                  <component :is="study.component" />
                </div>
              </div>
            </div>
          </div>
          <span class="card-cta">Read the study <span class="card-cta__arrow" aria-hidden="true">→</span></span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>
