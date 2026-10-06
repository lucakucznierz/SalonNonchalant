import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// One page per language shares one app: "/" (German), "/en/" (English), "/fr/" (French). The site runs at the domain root.
export default defineConfig({
  base: '/',
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        de: 'index.html',
        en: 'en/index.html',
        fr: 'fr/index.html'
      }
    }
  }
})
