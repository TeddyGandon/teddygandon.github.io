<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { flags } from '../data/flags';

const isMenuOpen = ref(false);
const route = useRoute();

// Article pages are not nested under /articles in the router, so active-class
// alone would drop the highlight when reading one.
const isArticlesSection = computed(() => route.path === '/articles' || route.path.startsWith('/articles/'));
const isStudiesSection = computed(() => route.path === '/studies' || route.path.startsWith('/studies/'));

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
  },
);
</script>

<template>
  <nav class="site-nav" aria-label="Main navigation">
    <div class="container is-flex is-justify-content-space-between is-align-items-center">
      <RouterLink to="/" class="site-nav__brand">Teddy Gandon</RouterLink>

      <button
        type="button"
        class="site-nav__burger"
        :class="{ 'is-active': isMenuOpen }"
        :aria-expanded="isMenuOpen"
        aria-label="Toggle navigation menu"
        aria-controls="site-nav-links"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div id="site-nav-links" class="site-nav__links" :class="{ 'is-active': isMenuOpen }">
        <RouterLink to="/" exact-active-class="is-active">Home</RouterLink>
        <RouterLink to="/experience" active-class="is-active">Experience</RouterLink>
        <RouterLink to="/articles" :class="{ 'is-active': isArticlesSection }">Articles</RouterLink>
        <RouterLink v-if="flags.displayStudies" to="/studies" :class="{ 'is-active': isStudiesSection }">Studies</RouterLink>
        <RouterLink to="/projects" active-class="is-active">Side projects</RouterLink>
        <span class="site-nav__separator" aria-hidden="true"></span>
        <a href="https://www.linkedin.com/in/teddygandon/" target="_blank" rel="noopener noreferrer">
          <i class="fa-brands fa-linkedin site-nav__icon" aria-hidden="true"></i>Contact me on LinkedIn
        </a>
        <a href="/teddy-gandon-resume.pdf" download rel="noopener noreferrer">
          <i class="fa-solid fa-file-arrow-down site-nav__icon" aria-hidden="true"></i>Download resume
        </a>
      </div>
    </div>
  </nav>
</template>
