<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="site-nav" aria-label="Main navigation">
    <div class="container is-flex is-justify-content-space-between is-align-items-center">
      <RouterLink to="/" class="site-nav__brand">Teddy Gandon</RouterLink>
      <div class="site-nav__links">
        <RouterLink to="/" exact-active-class="is-active">Home</RouterLink>
        <RouterLink to="/experience" active-class="is-active">Experience</RouterLink>
        <RouterLink to="/articles" active-class="is-active">Articles</RouterLink>
      </div>
    </div>
  </nav>
</template>
