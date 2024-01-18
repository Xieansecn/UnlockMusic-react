import { minify } from 'terser';
import { readFileSync, writeFileSync, readdirSync } from 'fs';

for (const file of readdirSync('dist/assets')) {
  if (!/\.(mjs|js)$/.test(file)) {
    continue;
  }

  console.log(`minifying ${file}...`);
  const isModule = /\.mjs$/.test(file);

  const output = await minify(readFileSync(`dist/assets/${file}`, 'utf-8'), {
    compress: true,
    mangle: true,
    module: isModule,
  });

  writeFileSync(`dist/assets/${file}`, output.code);
}
