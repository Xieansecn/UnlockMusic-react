import cp from 'node:child_process';
import path from 'node:path';
import url from 'node:url';

const projectRoot = url.fileURLToPath(new URL('../', import.meta.url));

export function command(cmd: string, dir = '') {
  return cp.execSync(cmd, { cwd: path.join(projectRoot, dir), encoding: 'utf-8' }).trim();
}

export function tryCommand(cmd: string, dir = '', fallback = '') {
  try {
    return command(cmd, dir);
  } catch (e) {
    return fallback;
  }
}
