import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@shared/styles/tokens" as *; @use "@shared/styles/breakpoints" as *; @use "@shared/styles/mixins" as *; @use "@shared/styles/typography" as *; @use "@shared/styles/animations" as *;`,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three') || id.includes('@react-three')) {
            return 'three';
          }
          if (id.includes('framer-motion') || id.includes('gsap')) {
            return 'motion';
          }
          if (id.includes('node_modules/react') || id.includes('react-hook-form') || id.includes('zod')) {
            return 'vendor';
          }
        },
      },
    },
  },
});
