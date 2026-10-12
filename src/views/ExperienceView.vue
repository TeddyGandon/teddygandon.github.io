<script setup>
import { computed, reactive } from 'vue';
import { experience, softSkills } from '../data/experience';
import { hardSkills } from '../data/skills';
import { certifications } from '../data/certifications';
import { flags } from '../data/flags';
import { parseMonthYear } from '../utils/format';

const sortedCertifications = computed(() =>
  [...certifications].sort((a, b) => parseMonthYear(b.date) - parseMonthYear(a.date)),
);

// Each group shows its level-3 skills; the lower ones sit behind a per-group
// "See more" toggle. A group with no level-3 skill shows everything.
const TOP_LEVEL = 3;
const expandedGroups = reactive({});

const skillGroups = computed(() =>
  hardSkills.map((group) => {
    const hasTop = group.items.some((item) => item.level >= TOP_LEVEL);
    const hidden = hasTop ? group.items.filter((item) => item.level < TOP_LEVEL).length : 0;
    const expanded = Boolean(expandedGroups[group.group]);
    return {
      ...group,
      id: `skills-${group.group.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      hidden,
      expanded,
      visibleItems: expanded || !hidden ? group.items : group.items.filter((item) => item.level >= TOP_LEVEL),
    };
  }),
);

function toggleGroup(name) {
  expandedGroups[name] = !expandedGroups[name];
}
</script>

<template>
<div>
  <section class="section pt-6">
    <div class="container container-narrow">
      <p class="hero-eyebrow" v-reveal><i class="fa-solid fa-briefcase heading-icon" aria-hidden="true"></i>Path</p>
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
      <p class="section-heading" v-reveal><i class="fa-solid fa-award heading-icon" aria-hidden="true"></i>Certifications</p>
      <div class="card-grid">
        <component
          :is="cert.url ? 'a' : 'div'"
          v-for="cert in sortedCertifications"
          :key="cert.name"
          v-bind="cert.url ? { href: cert.url, target: '_blank', rel: 'noopener noreferrer' } : {}"
          class="surface-card cert-card"
          v-reveal
        >
          <p class="card-title">{{ cert.name }}</p>
          <p class="card-meta">{{ cert.issuer }}, {{ cert.date }}</p>
          <p class="card-text">{{ cert.description }}</p>
          <p class="card-note">{{ cert.appliedNote }}</p>
        </component>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container container-narrow">
      <p class="section-heading" v-reveal><i class="fa-solid fa-people-group heading-icon" aria-hidden="true"></i>Soft skills</p>
      <div v-reveal>
        <span v-for="skill in softSkills" :key="skill" class="skill-pill">{{ skill }}</span>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container container-narrow">
      <p class="section-heading" v-reveal><i class="fa-solid fa-screwdriver-wrench heading-icon" aria-hidden="true"></i>Hard skills</p>

      <div v-for="group in skillGroups" :key="group.group" class="skill-group" v-reveal>
        <p class="skill-group__title">{{ group.group }}</p>
        <div :id="group.id">
          <div class="skill-meter" v-for="item in group.visibleItems" :key="item.name">
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
        <button
          v-if="group.hidden"
          type="button"
          class="text-button skill-group__toggle"
          :aria-expanded="group.expanded"
          :aria-controls="group.id"
          @click="toggleGroup(group.group)"
        >
          {{ group.expanded ? 'See less' : `See ${group.hidden} more` }}
          <i class="fa-solid" :class="group.expanded ? 'fa-chevron-up' : 'fa-chevron-down'" aria-hidden="true" />
        </button>
      </div>
    </div>
  </section>
</div>
</template>
