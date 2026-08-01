<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__links">
      <a href="https://www.linkedin.com/in/teddygandon/" target="_blank" rel="noopener noreferrer">
        LinkedIn
      </a>
      <span aria-hidden="true">·</span>
      <a href="https://github.com/teddygandon" target="_blank" rel="noopener noreferrer"> GitHub </a>
    </div>
    <p class="mt-4" style="font-size: 0.85rem">© {{ year }} Teddy Gandon</p>
  </footer>
</template>
