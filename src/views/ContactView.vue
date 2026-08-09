<script setup>
import { computed } from 'vue';

// Split so the address never appears as one literal string in the built
// bundle — a cheap deterrent against basic regex email scrapers.
const user = 'moi';
const domain = 'teddygandon.com';
const email = computed(() => `${user}@${domain}`);
const mailto = computed(() => `mailto:${email.value}`);
</script>

<template>
<div>
  <section class="section pt-6">
    <div class="container container-narrow">
      <p class="hero-eyebrow" v-reveal>Get in touch</p>
      <h1 class="title hero-title is-3 mt-2" v-reveal>Contact</h1>
      <p class="hero-lede mt-4" v-reveal>
        Whether it's about a role, a talk, or just comparing notes on multicultural engineering teams —
        reach out. I read everything that lands here.
      </p>
      <p class="hero-lede has-text-grey-light is-size-6 mt-2" v-reveal>
        Always quietly open to a good conversation about Engineering Manager / Director-level roles
        around distributed, multicultural teams — no rush, just say hello.
      </p>

      <div class="mt-6 callout-card" v-reveal>
        <p class="section-heading">Email</p>
        <a :href="mailto" class="hero-lede has-text-white">{{ email }}</a>
      </div>
    </div>
  </section>
</div>
</template>
