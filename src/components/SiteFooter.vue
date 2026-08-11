<script setup>
import { flags } from '../data/flags';
import { theme, getAutoTheme } from '../utils/theme';

const year = new Date().getFullYear();

function applyAutoTheme() {
  theme.value = getAutoTheme(now.value).value;
}

const now = new Date();
const autoTheme = getAutoTheme(now.value);
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
      <span aria-hidden="true" v-if="autoTheme != null && flags.displayChangingTheme">&bull;</span>
      <a
          type="button"
          class="site-nav__auto-theme"
          :title="`Switch to the ${autoTheme.value} theme`"
          :aria-label="`Switch to the ${autoTheme.value} theme`"
          @click="applyAutoTheme"
            v-if="autoTheme != null && flags.displayChangingTheme"
        >
          {{ autoTheme.emoji }}
        </a>
    </div>
    <p class="mt-4" style="font-size: 0.85rem">© {{ year }} Teddy Gandon</p>
  </footer>
</template>
