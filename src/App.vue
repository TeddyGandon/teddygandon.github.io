<script setup>
import SiteNav from './components/SiteNav.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
  <div class="site-shell">
    <SiteNav />
    <main class="site-main">
      <RouterView v-slot="{ Component, route }">
        <transition name="route-fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </RouterView>
    </main>
    <SiteFooter />
  </div>
</template>
