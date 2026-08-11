<script setup>
import { flags } from '../data/flags';
import { theme } from '../utils/theme';

const year = new Date().getFullYear();

function applyTheme(newTheme) {
  theme.value = newTheme;
}

function getEasterEggTheme() {
  const now = new Date();
  const NIGHT_START_HOUR = 23;
  const NIGHT_END_HOUR = 4;
  const AMIGA_MONTH = 8; // September
  const HALLOWEEN_MONTH = 9; // October — Date#getMonth() is 0-indexed
  const CHRISTMAS_MONTH = 11; // December
  const month = now.getMonth();
  const hour = now.getHours();
  if (month === AMIGA_MONTH) return { value: 'amiga', emoji: '💾' };
  if (month === HALLOWEEN_MONTH) return { value: 'halloween', emoji: '🎃' };
  if (month === CHRISTMAS_MONTH) return { value: 'christmas', emoji: '🎄' };
  if (hour >= NIGHT_START_HOUR || hour < NIGHT_END_HOUR) return { value: 'cyberpunk', emoji: '🌆' };
  return null;
}
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__links">
      <a href="https://www.linkedin.com/in/teddygandon/" target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <span aria-hidden="true">&bull;</span>
      <a href="https://github.com/teddygandon" target="_blank" rel="noopener noreferrer"> GitHub </a>
      <span aria-hidden="true">&bull;</span>
      <a href="/teddy-gandon-cv2.pdf" download v-if="flags.displayCertifications">Download CV</a>
      <a href="/teddy-gandon-cv.pdf" download v-if="!flags.displayCertifications">Download CV</a>
      <span aria-hidden="true" v-if="getEasterEggTheme() != null && flags.displayChangingTheme">&bull;</span>
      <a
          type="button"
          class="site-nav__auto-theme"
          @click="applyTheme(getEasterEggTheme().value)"
          v-if="getEasterEggTheme() != null && flags.displayChangingTheme"
        >
          {{ getEasterEggTheme().emoji }}
        </a>
    </div>
    <p class="mt-4" style="font-size: 0.85rem">© {{ year }} Teddy Gandon</p>
  </footer>
</template>
