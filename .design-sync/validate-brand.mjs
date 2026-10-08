#!/usr/bin/env node
// Brand-only sync gate. Asserts that every name the docs enumerate is
// actually defined in the shipped CSS, that the styles.css @import closure
// resolves, and that the bundle header parses.
//
// Usage: node .design-sync/validate-brand.mjs [outDir]   (default ./ds-bundle)
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';

const OUT = resolve(process.argv[2] ?? 'ds-bundle');
const errors = [];
const warns = [];

// ---- 1. styles.css @import closure resolves on disk ----
const closure = new Set();
let remoteImports = 0;
(function walk(file) {
  if (closure.has(file)) return;
  closure.add(file);
  for (const m of readFileSync(file, 'utf8').matchAll(/@import\s+(?:url\(\s*)?["']([^"']+)["']/g)) {
    const spec = m[1];
    if (/^https?:/.test(spec)) { remoteImports++; continue; }
    const target = resolve(dirname(file), spec);
    if (!existsSync(target)) errors.push(`[CSS_IMPORT_MISSING] styles.css closure @imports "${spec}" which doesn't exist`);
    else walk(target);
  }
})(join(OUT, 'styles.css'));

const shippedCss = [...closure].map((f) => readFileSync(f, 'utf8')).join('\n');

// ---- 1b. every shipped CSS file actually parses, and every var() resolves ----
// This catches silent breakage a grep cannot see - e.g. a */ sequence inside a
// comment terminating it early and invalidating the rest of the file.
let parser = null;
try { parser = (await import('lightningcss')).transform; } catch { /* optional */ }
if (parser) {
  for (const f of closure) {
    try { parser({ filename: f, code: readFileSync(f), minify: false }); }
    catch (e) { errors.push(`[CSS_PARSE] ${f}: ${e.message}${e.loc ? ` (line ${e.loc.line}, col ${e.loc.column})` : ''}`); }
  }
} else {
  warns.push('[CSS_PARSE_SKIPPED] lightningcss not importable - CSS syntax not verified');
}
{
  const defined = new Set([...shippedCss.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
  for (const m of new Set([...shippedCss.matchAll(/var\((--[a-z0-9-]+)\)/g)].map((m) => m[1]))) {
    if (!defined.has(m)) errors.push(`[VAR_DANGLING] shipped CSS references var(${m}) but nothing defines it`);
  }
}

// ---- 2. bundle header is a parseable @ds-bundle comment ----
const bundlePath = join(OUT, '_ds_bundle.js');
if (!existsSync(bundlePath)) {
  errors.push('[NO_BUNDLE] _ds_bundle.js missing');
} else {
  const first = readFileSync(bundlePath, 'utf8').split('\n')[0];
  if (!first.startsWith('/* @ds-bundle: ')) errors.push('[DSBUNDLE_HEADER] first line is not a @ds-bundle comment');
  else {
    try {
      JSON.parse(first.replace(/^\/\* @ds-bundle: /, '').replace(/ \*\/$/, '').replace(/\*\\\//g, '*/'));
    } catch (e) { errors.push(`[DSBUNDLE_HEADER] header JSON doesn't parse: ${e.message}`); }
  }
}

// ---- 3. every documented name is defined in the shipped CSS ----
const docFiles = [
  join(OUT, 'README.md'),
  join(OUT, 'guidelines/patterns.md'),
  join(OUT, 'guidelines/voice.md'),
].filter(existsSync);
const docText = docFiles.map((f) => readFileSync(f, 'utf8')).join('\n');

const definedVars = new Set([...shippedCss.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
const definedClasses = new Set([...shippedCss.matchAll(/\.((?:[a-z0-9-]|\\:)+)\s*[,{:]/g)].map((m) => m[1].replace(/\\:/g, ':')));

// var(--*) references in the docs
for (const m of docText.matchAll(/var\((--[a-z0-9-]+)\)/g)) {
  if (!definedVars.has(m[1])) errors.push(`[TOKEN_UNDEFINED] docs reference ${m[1]} but no shipped CSS defines it`);
}
// bare --color-brand-* mentions in the docs (table rows, prose)
for (const m of docText.matchAll(/(--color-brand-[a-z0-9-]+)/g)) {
  if (!definedVars.has(m[1])) errors.push(`[TOKEN_UNDEFINED] docs name ${m[1]} but no shipped CSS defines it`);
}
// brand-* utility classes used in doc snippets
const utilityRefs = new Set([...docText.matchAll(/\b((?:bg|text|border)-brand-[a-z0-9-]+)\b/g)].map((m) => m[1]));
for (const cls of utilityRefs) {
  if (!definedClasses.has(cls)) errors.push(`[CLASS_UNDEFINED] docs use .${cls} but no shipped CSS defines it`);
}
// bare brand-* names in the vocabulary table (checked via their bg- form)
for (const m of docText.matchAll(/`(brand-[a-z0-9-]+)`/g)) {
  if (!definedClasses.has(`bg-${m[1]}`)) errors.push(`[CLASS_UNDEFINED] docs name \`${m[1]}\` but .bg-${m[1]} isn't defined`);
}
// effect + type classes
for (const cls of ['mesh-orb', 'orb-green', 'orb-blue', 'orb-yellow', 'owner-arrow', 'reveal', 'font-heading', 'font-body']) {
  if (docText.includes(cls) && !definedClasses.has(cls)) errors.push(`[CLASS_UNDEFINED] docs reference .${cls} but no shipped CSS defines it`);
}

// ---- 4. hex values quoted in the docs match the token definitions ----
const tokenHex = new Map([...shippedCss.matchAll(/(--color-brand-[a-z0-9-]+):\s*(#[0-9A-Fa-f]{3,8})/g)].map((m) => [m[1], m[2].toLowerCase()]));
for (const m of docText.matchAll(/`(brand-[a-z0-9-]+)`\s*`(#[0-9A-Fa-f]{6})`/g)) {
  const want = tokenHex.get(`--color-${m[1]}`);
  if (want && want !== m[2].toLowerCase()) errors.push(`[HEX_MISMATCH] docs say ${m[1]} is ${m[2]} but tokens define ${want}`);
}

// ---- 5. reveal must not be shipped in its invisible form ----
const revealRule = shippedCss.match(/\.reveal[^{]*\{[^}]*\}/);
if (revealRule && /opacity:\s*0\b/.test(revealRule[0])) {
  errors.push('[REVEAL_INVISIBLE] .reveal ships with opacity:0 — designs have no scroll observer and would render invisible content');
}

// ---- 6. informational ----
if (remoteImports) warns.push(`[FONT_REMOTE] ${remoteImports} remote @import(s) — Nunito Sans and Font Awesome load at runtime`);
if (!existsSync(join(OUT, 'fonts'))) warns.push('[FONTS_REMOTE_ONLY] no self-hosted fonts/ dir — brand fonts come from Google Fonts');

for (const w of warns) console.error(w);
for (const e of errors) console.error(e);
console.error(
  `\nchecked ${closure.size} CSS file(s), ${definedVars.size} custom propert(ies), ${definedClasses.size} class(es), ` +
  `${utilityRefs.size} documented utilit(ies) across ${docFiles.length} doc file(s)`,
);
console.error(errors.length ? `FAIL — ${errors.length} error(s)` : 'OK — brand bundle validates');
process.exit(errors.length ? 1 : 0);
