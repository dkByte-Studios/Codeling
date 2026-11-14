// Copies the Pyodide runtime from node_modules into public/pyodide so the app serves it itself.
// That keeps the app working offline and avoids loading anything from a CDN. public/pyodide is not committed.
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const from = join(root, 'node_modules', 'pyodide');
const to = join(root, 'public', 'pyodide');

if (!existsSync(join(from, 'pyodide.mjs'))) {
  console.error('pyodide is not installed. Run npm install first.');
  process.exit(1);
}

rmSync(to, { recursive: true, force: true });
mkdirSync(to, { recursive: true });
// Only the runtime files the app loads: no type definitions, no docs, no package.json.
const keep = (name) => /\.(mjs|js|wasm|zip|json)$/.test(name) && !name.endsWith('.d.ts') && name !== 'package.json';
for (const name of readdirSync(from)) {
  if (keep(name)) cpSync(join(from, name), join(to, name));
}
console.log('Copied Pyodide to public/pyodide:', readdirSync(to).join(', '));
