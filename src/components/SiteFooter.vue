<script setup>
import { flags } from '../data/flags';

const year = new Date().getFullYear();
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
      <a href="/teddy-gandon-cv.pdf" download>Download CV</a>
    </div>
    <p class="mt-4">
      <i class="has-text-grey-light" style="font-size: 0.9rem">The views expressed here are entirely my own and do not reflect the views of my employer.</i>
    </p>
  </footer>
</template>
