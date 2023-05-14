import cp from 'node:child_process';
import url from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wasm from 'vite-plugin-wasm';
import replace from '@rollup/plugin-replace';
import topLevelAwait from 'vite-plugin-top-level-await';

const gitRoot = url.fileURLToPath(new URL('.', import.meta.url));
const pkg = JSON.parse(fs.readFileSync(gitRoot + '/package.json', 'utf-8'));

function command(cmd, dir = '') {
  return cp.execSync(cmd, { cwd: path.join(gitRoot, dir), encoding: 'utf-8' }).trim();
}

const COMMAND_GIT_VERSION = 'git describe --long --dirty --tags --always';
const shortCommit = command(COMMAND_GIT_VERSION);
const version = `${pkg.version}-${shortCommit}`;

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
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
});
