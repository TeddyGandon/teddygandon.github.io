import { cpSync, existsSync, readFileSync, statSync } from 'node:fs'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Hand-written static sub-sites (e.g. content/static/squadron/ → /squadron/).
// They are plain HTML/CSS, never processed by Vite: copied as-is into the build
// output, and served as-is by the dev server.
const staticSitesDir = fileURLToPath(new URL('./content/static', import.meta.url))

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

function staticSites() {
  let outDir
  return {
    name: 'static-sites',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = decodeURIComponent(req.url.split(/[?#]/)[0])
        const file = normalize(join(staticSitesDir, pathname))
        if (!file.startsWith(staticSitesDir + '\\') && !file.startsWith(staticSitesDir + '/')) return next()
        if (!existsSync(file)) return next()

        let target = file
        if (statSync(file).isDirectory()) {
          // Same behavior as GitHub Pages: /squadron → /squadron/
          if (!pathname.endsWith('/')) {
            res.statusCode = 301
            res.setHeader('Location', `${pathname}/`)
            return res.end()
          }
          target = join(file, 'index.html')
          if (!existsSync(target)) return next()
        }
        res.setHeader('Content-Type', MIME_TYPES[extname(target)] ?? 'application/octet-stream')
        res.end(readFileSync(target))
      })
    },
    writeBundle() {
      if (existsSync(staticSitesDir)) cpSync(staticSitesDir, outDir, { recursive: true })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), staticSites()],
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
