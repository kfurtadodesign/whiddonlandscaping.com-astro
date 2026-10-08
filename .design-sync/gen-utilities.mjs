#!/usr/bin/env node
// Regenerates ds-bundle/tokens/utilities.css from ds-bundle/tokens/brand.css.
// Keep these in step: the README's documented vocabulary is validated against
// the classes this emits (see validate-brand.mjs).
//
// NOTE: never write the sequence */ inside the emitted comment header - it
// terminates the CSS comment early and silently invalidates the file.
import { readFileSync, writeFileSync } from 'node:fs';

const OUT = process.argv[2] ?? 'ds-bundle/tokens';
const names = [...readFileSync(`${OUT}/brand.css`, 'utf8').matchAll(/--color-(brand-[a-z0-9-]+):/g)].map((m) => m[1]);

let css = `/*
 * Whiddon Landscaping - brand utility classes
 *
 * Tailwind generates the bg-, text-, and border- brand color classes from the
 * @theme block at build time. A rendered design does not run this repo's
 * Tailwind build, so the same class names are declared here as plain CSS.
 * That makes the vocabulary in README.md resolve in every context.
 * Generated from tokens/brand.css - keep in step with it.
 */

`;
for (const n of names) {
  css += `.bg-${n} { background-color: var(--color-${n}); }\n`;
  css += `.text-${n} { color: var(--color-${n}); }\n`;
  css += `.border-${n} { border-color: var(--color-${n}); }\n`;
}
css += `
/* Type families */
.font-heading { font-family: var(--font-heading); }
.font-body { font-family: var(--font-body); }

/* Hover pairs the site actually uses */
.hover\\:bg-brand-yellow-lt:hover { background-color: var(--color-brand-yellow-lt); }
.hover\\:bg-brand-green-lt:hover { background-color: var(--color-brand-green-lt); }
.hover\\:text-brand-blue-vivid:hover { color: var(--color-brand-blue-vivid); }
`;
writeFileSync(`${OUT}/utilities.css`, css);
console.error(`utilities.css: ${names.length} token(s) -> ${names.length * 3 + 5} class(es)`);
