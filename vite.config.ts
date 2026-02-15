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
          name: 'AquaMix Master',
          short_name: 'AquaMix Master',
          description: 'A precision calculator for mixing hot and cold water to achieve exact temperatures and volumes. Perfect for tea brewing and culinary needs.',
          start_url: "/",
          display: 'standalone',
          theme_color: '#ffffff',
          background_color: '#ffffff',
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
              purpose: "maskable"
            },
            {
              src: "web-app-manifest-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any"
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