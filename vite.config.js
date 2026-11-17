import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Keep stable vendor code cacheable across portfolio content updates.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (/framer-motion|motion-dom|motion-utils/.test(id)) return 'motion';
          if (id.includes('axios')) return 'http';
          if (/react-dom|react-router|\/react\/|\/scheduler\//.test(id.replaceAll('\\', '/'))) return 'react-vendor';
        },
      },
    },
  },
});
