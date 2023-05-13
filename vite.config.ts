import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    fs: {
      // Note:
      //   This is _insecure_, but is required to get pnpm link to work.
      // strict: false,

      allow: [
        'src',
        'node_modules',

        // Allow pnpm to link.
        '../libparakeet-js',
      ],
    },
  },
  base: './',
  optimizeDeps: {
    exclude: ['@jixun/libparakeet'],
  },
  plugins: [react(), wasm(), topLevelAwait()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
});
