import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(() => {
  return {
    server: {
      port: 3001,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },
        // 1. Files in the public folder to be cached initially
        includeAssets: ['favicon.svg', 'web-app-manifest-192x192.png', 'web-app-manifest-512x512.png'],
        workbox: {
          // 2. Cache all compiled assets (JS, CSS) and static files
          globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
          // 3. Ensures the app loads the index.html shell even when offline
          navigateFallback: 'index.html',
        },
        manifest: {
          name: 'TeaCraft Pro',
          short_name: 'TeaCraft Pro',
          description: 'A precision brewing companion for tea enthusiasts. Calculate exact water ratios and temperatures to achieve the perfect steep every time.',
          start_url: "/",
          display: 'standalone',
          theme_color: '#fffbeb',
          background_color: '#fffbeb',
          screenshots: [
            {
              src: "/screenshot-mobile.webp",
              sizes: "1080x1920",
              type: "image/webp",
              form_factor: "narrow"
            },
            {
              src: "/screenshot-desktop.webp",
              sizes: "1920x1080",
              type: "image/webp",
              form_factor: "wide"
            }
          ],
          icons: [
            {
              src: 'favicon.svg',
              sizes: 'any',
              type: 'image/svg+xml',
              purpose: 'any'
            },
            {
              src: "web-app-manifest-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any"
            },
            {
              src: "maskable_icon_x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "maskable"
            },
            {
              src: "web-app-manifest-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any"
            },
            {
              src: "maskable_icon_x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable"
            }
          ]
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});