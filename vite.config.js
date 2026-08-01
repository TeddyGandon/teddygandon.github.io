import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // Bulma 1.0.4's own source still uses the legacy Sass if() function —
        // nothing in our styles does. Silence until Bulma ships a fix upstream.
        silenceDeprecations: ['if-function'],
      },
    },
  },
})
