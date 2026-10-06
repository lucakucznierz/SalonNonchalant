import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Two pages share one app: "/" (German) and "/en/" (English). The site runs at the domain root.
export default defineConfig({
  base: '/',
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        de: 'index.html',
        en: 'en/index.html'
      }
    }
  }
})
