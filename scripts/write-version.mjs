/* eslint-env node */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import { execSync } from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const commitHash = execSync('git rev-parse --short HEAD').toString('utf-8').trim();

const pkgJson = JSON.parse(readFileSync(__dirname + '/../package.json', 'utf-8'));
const pkgVer = `${pkgJson.version ?? 'unknown'}-${commitHash ?? 'unknown'}` + '\n';
writeFileSync(__dirname + '/../dist/version.txt', pkgVer, 'utf-8');
