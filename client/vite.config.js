import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Increase chunk size warning threshold (we are intentionally splitting)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunk strategy: vendor libraries in separate cached chunks
        manualChunks(id) {
          // React core — cached forever, rarely changes
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // React Router
          if (id.includes('node_modules/react-router')) {
            return 'router-vendor';
          }
          // Animation libraries (large, rarely change)
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/gsap')) {
            return 'animation-vendor';
          }
          // Swiper carousel
          if (id.includes('node_modules/swiper')) {
            return 'swiper-vendor';
          }
          // Icon libraries
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/react-icons') || id.includes('node_modules/@iconify')) {
            return 'icons-vendor';
          }
          // Axios HTTP client
          if (id.includes('node_modules/axios')) {
            return 'axios-vendor';
          }
          // All other node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Content-hash filenames for long-term browser caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Enable source maps only in dev; omit in production for smaller output
    sourcemap: false,
    // Target modern browsers for smaller, faster output
    target: 'es2020',
  },
})