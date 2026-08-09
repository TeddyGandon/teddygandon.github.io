<script setup>
import { experience, softSkills } from '../data/experience';
import { hardSkills } from '../data/skills';
import { certifications } from '../data/certifications';
import { flags } from '../data/flags';
</script>

<template>
<div>
  <section class="section pt-6">
    <div class="container container-narrow">
      <p class="hero-eyebrow" v-reveal>Path</p>
      <h1 class="title hero-title is-3 mt-2" v-reveal>Experience</h1>

      <div class="timeline mt-6">
        <div v-for="job in experience" :key="job.period" class="timeline-item" v-reveal>
          <p class="timeline-item__period">{{ job.period }}</p>
          <p class="timeline-item__role">{{ job.role }}</p>
          <p class="timeline-item__org">{{ job.org }}</p>
          <p class="timeline-item__desc">{{ job.description }}</p>
        </div>
      </div>
    </div>
  </section>
  
  <section class="section" v-if="flags.displayCertifications">
    <div class="container container-narrow">
      <p class="section-heading" v-reveal>Certifications & Frameworks</p>
      <div class="card-grid">
        <component
          :is="cert.url ? 'a' : 'div'"
          v-for="cert in certifications"
          :key="cert.name"
          v-bind="cert.url ? { href: cert.url, target: '_blank', rel: 'noopener noreferrer' } : {}"
          class="featured-article cert-card"
          v-reveal
        >
          <p class="cert-card__name">{{ cert.name }}</p>
          <p class="cert-card__issuer">{{ cert.issuer }}</p>
          <p class="cert-card__desc">{{ cert.description }}</p>
          <p class="cert-card__applied">{{ cert.appliedNote }}</p>
        </component>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container container-narrow">
      <p class="section-heading" v-reveal>Soft skills</p>
      <div v-reveal>
        <span v-for="skill in softSkills" :key="skill" class="skill-pill">{{ skill }}</span>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container container-narrow">
      <p class="section-heading" v-reveal>Hard skills</p>

      <div v-for="group in hardSkills" :key="group.group" class="skill-group" v-reveal>
        <p class="skill-group__title">{{ group.group }}</p>
        <div class="skill-meter" v-for="item in group.items" :key="item.name">
          <span class="skill-meter__name">{{ item.name }}</span>
          <span class="skill-meter__dots" :aria-label="`${item.name}: ${item.level} out of 3`">
            <span
              v-for="dot in 3"
              :key="dot"
              class="skill-meter__dot"
              :class="{ 'is-filled': dot <= item.level }"
            />
          </span>
        </div>
      </div>
    </div>
  </section>
</div>
</template>
