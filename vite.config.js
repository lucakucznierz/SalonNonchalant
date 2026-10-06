import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Relative base path so the built site works on any host or sub-folder.
export default defineConfig({
  base: './',
  plugins: [vue()]
})
