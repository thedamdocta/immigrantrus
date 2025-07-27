import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries
          'react-vendor': ['react', 'react-dom'],
          'framer-motion': ['framer-motion'],
          'lucide-icons': ['lucide-react'],
          // Split UI components that might be large
          'ui-components': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog',
            '@radix-ui/react-select',
            '@radix-ui/react-toast'
          ]
        }
      }
    },
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Generate sourcemaps for production debugging
    sourcemap: false,
    // Set chunk size warnings
    chunkSizeWarningLimit: 1000
  }
})
