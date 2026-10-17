<script setup>
import { computed, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';
import { getStudyBySlug } from '../utils/studies';
import { setPageMeta } from '../utils/seo';

const props = defineProps({
  slug: { type: String, required: true },
});

const study = computed(() => getStudyBySlug(props.slug));

watchEffect(() => {
  setPageMeta({
    title: study.value ? study.value.title : 'Study not found',
    path: `/studies/${props.slug}`,
  });
});
</script>

<template>
<div>
  <section class="section pt-6 pb-0">
    <div class="container container-narrow">
      <RouterLink :to="{ name: 'studies' }" class="back-link">
        <i class="fa-solid fa-arrow-left" aria-hidden="true"></i> All studies
      </RouterLink>
    </div>
  </section>

  <div v-if="study" class="study">
    <component :is="study.component" />
  </div>

  <section v-else class="section pt-5">
    <div class="container container-narrow">
      <h1 class="title hero-title is-3">Study not found</h1>
      <p class="hero-lede mt-3">This one may have moved or never existed.</p>
    </div>
  </section>
</div>
</template>
