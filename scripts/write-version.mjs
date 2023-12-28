/* eslint-env node */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkgJson = JSON.parse(readFileSync(__dirname + '/../package.json', 'utf-8'));
const pkgVer = (pkgJson.version ?? 'unknown') + '\n';
writeFileSync(__dirname + '/../dist/version.txt', pkgVer, 'utf-8');
