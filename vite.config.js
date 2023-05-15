import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: "./",
  resolve: {
    alias: {
      'components': path.resolve('./src/components'),
      'utility': path.resolve('./src/utility'),
      'stores': path.resolve('./src/stores'),
      'data': path.resolve('./src/data'),
    }
  }
})
