import url from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';
import replace from '@rollup/plugin-replace';
import topLevelAwait from 'vite-plugin-top-level-await';
import { VitePWA } from 'vite-plugin-pwa';

import { tryCommand } from './support/command';

const projectRoot = url.fileURLToPath(new URL('.', import.meta.url));
const pkg = JSON.parse(fs.readFileSync(projectRoot + '/package.json', 'utf-8'));

const COMMAND_GIT_VERSION = 'git describe --long --dirty --tags --always';
const shortCommit = tryCommand(COMMAND_GIT_VERSION, __dirname, 'unknown');
const version = `${pkg.version}-${shortCommit}`;

// https://vitejs.dev/config/
export default defineConfig({
  worker: {
    format: 'es',
  },
  server: {
    fs: {
      // Note:
      //   This is _insecure_, but is required to get pnpm link to work.
      // strict: false,

      allow: [
        'src',
        'node_modules',

        // Allow pnpm to link.
        process.env.LIB_PARAKEET_JS_DIR || '../libparakeet-js',
      ],
    },
  },
  base: './',
  optimizeDeps: {
    exclude: ['@jixun/libparakeet', 'sql.js'],
  },
  plugins: [
    replace({
      preventAssignment: true,
      values: {
        __APP_VERSION_SHORT__: pkg.version,
        __APP_VERSION__: version,
      },
    }),
    react(),
    wasm(),
    topLevelAwait(),
    VitePWA({
      registerType: 'prompt',
      workbox: {
        // Cache everything from dist
        globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}'],
      },
      manifest: {
        display: 'standalone',
        name: '音乐解锁 (Unlock Music)',
        short_name: '音乐解锁',
        lang: 'zh-cmn-Hans-CN',
        description: '在现代浏览器解锁已购的加密音乐！',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@nm': path.resolve(__dirname, 'node_modules'),

      // workaround for vite, workbox (PWA) and Emscripten transpiled parakeet lib (use of `import("module")`)
      module: path.resolve(__dirname, 'src', 'dummy.mjs'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          reacts: ['react', 'react-dom', 'react-dropzone', 'react-promise-suspense', 'react-redux', '@reduxjs/toolkit'],
          chakra: ['@chakra-ui/react', '@emotion/react', '@emotion/styled', 'framer-motion'],
          icons: ['react-icons', '@chakra-ui/icons'],
          utility: ['radash', 'nanoid', 'immer', 'react-syntax-highlighter'],
        },
      },
    },
  },
  test: {
    globals: true,
    mockReset: true,
    environment: 'jsdom',
    setupFiles: ['src/test-utils/setup-jest.ts'],
    alias: [
      {
        find: /^~\/(.*)/,
        replacement: 'src/$1',
      },
    ],
    // workaround: sql.js is not ESModule friendly, yet...
    deps: {
      optimizer: {
        web: {
          include: ['sql.js'],
        },
      },
    },
    api: {
      port: 5174, // vite port + 1
    },
    coverage: {
      provider: 'v8',
      exclude: [
        // default rules
        'coverage/**',
        'dist/**',
        'packages/*/test{,s}/**',
        '**/*.d.ts',
        'cypress/**',
        'test{,s}/**',
        'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',

        // custom ones
        'src/test-utils/**',
      ],
    },
  },
});
