import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // Reduce number of output files by inlining dynamic imports and disabling manual chunking
        inlineDynamicImports: true,
        entryFileNames: 'assets/app-[hash].js',
        chunkFileNames: 'assets/app-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
