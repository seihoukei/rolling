import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from "path"
import {VitePWA} from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      svelte(),
      VitePWA({
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,gif,jpg,mp3,ttf}'],
          maximumFileSizeToCacheInBytes : 20000000,
        },
        includeAssets: ['favicon.png', 'apple-icon.png', 'favicon.png'],
        manifest: {
          name: 'Rolling Scampuss',
          short_name: 'Rolling',
          description: 'Rhythm/runner minigame',
          theme_color: '#222222',
          icons: [
            {
              src: 'resources/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'resources/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      }),
  ],
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
