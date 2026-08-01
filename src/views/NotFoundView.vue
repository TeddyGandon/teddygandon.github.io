<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="section pt-6">
    <div class="container container-narrow has-text-centered">
      <p class="hero-eyebrow">404</p>
      <h1 class="title hero-title is-3 mt-2">Nothing here</h1>
      <p class="hero-lede mt-3">The page you're looking for doesn't exist.</p>
      <RouterLink to="/" class="button is-primary is-outlined mt-5">Back home</RouterLink>
    </div>
  </section>
</template>
