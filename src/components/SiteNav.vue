<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { theme, getAutoTheme } from '../utils/theme';

const isMenuOpen = ref(false);
const route = useRoute();

watch(
  () => route.fullPath,
  () => {
    isMenuOpen.value = false;
  },
);

function applyAutoTheme() {
  theme.value = getAutoTheme(now.value).value;
}

const now = ref(new Date());
const autoTheme = computed(() => getAutoTheme(now.value));
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
        <button
          type="button"
          class="site-nav__auto-theme"
          :title="`Switch to the ${autoTheme.value} theme`"
          :aria-label="`Switch to the ${autoTheme.value} theme`"
          v-if="autoTheme && displayChangingTheme"
          @click="applyAutoTheme"
        >
          {{ autoTheme.emoji }}
        </button>
      </div>
    </div>
  </nav>
</template>
