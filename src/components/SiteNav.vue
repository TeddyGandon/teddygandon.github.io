<script setup>
import { ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const isMenuOpen = ref(false);
const route = useRoute();

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
        <RouterLink to="/articles" active-class="is-active">Articles</RouterLink>
        <RouterLink to="/projects" active-class="is-active">Side projects</RouterLink>
        <RouterLink to="/contact" active-class="is-active">Contact</RouterLink>
      </div>
    </div>
  </nav>
</template>
