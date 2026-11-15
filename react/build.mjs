// Builds the two React sections of the portfolio:
//   1. bundles src/islands.jsx into ../js/islands.js (what the browser loads)
//   2. renders the same components to HTML and writes it into ../index.html, so the page
//      is complete before any JavaScript runs (good for search engines and slow phones)
import { build, createServer } from 'vite';
import react from '@vitejs/plugin-react';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const here = path.dirname(fileURLToPath(import.meta.url));
const indexPath = path.join(here, '..', 'index.html');

await build({
  root: here,
  configFile: false,
  plugins: [react()],
  logLevel: 'warn',
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    outDir: path.join(here, '..', 'js'),
    emptyOutDir: false,
    lib: { entry: 'src/islands.jsx', name: 'Islands', formats: ['iife'], fileName: () => 'islands.js' },
    minify: true,
  },
});

const server = await createServer({ root: here, configFile: false, plugins: [react()], appType: 'custom', server: { middlewareMode: true }, logLevel: 'error' });
let html = readFileSync(indexPath, 'utf8');
for (const [name, file, id] of [['skills', '/src/Skills.jsx', 'skills-root'], ['projects', '/src/Projects.jsx', 'projects-root']]) {
  const mod = await server.ssrLoadModule(file);
  const markup = `<div id="${id}">${renderToString(createElement(mod.default))}</div>`;
  const re = new RegExp(String.raw`(<!--island:${name}-->)[\s\S]*?(<!--/island:${name}-->)`);
  if (!re.test(html)) throw new Error(`markers for ${name} not found in index.html`);
  html = html.replace(re, (_, a, b) => a + markup + b);
}
await server.close();
writeFileSync(indexPath, html);
console.log('islands.js built, index.html updated');
