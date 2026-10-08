# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Astro-based website for Whiddon Landscaping (whiddonlandscaping.com).

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:4321)
npm run build        # Production build to dist/
npm run preview      # Preview production build locally
npm run astro check  # Type-check .astro files
```

## Architecture

This is an [Astro](https://astro.build) static site. Key conventions:

- **`src/pages/`** — file-based routing; each `.astro` file becomes a page
- **`src/components/`** — reusable `.astro` components
- **`src/layouts/`** — page layout wrappers
- **`src/content/`** — content collections (if used) defined in `src/content/config.ts`
- **`public/`** — static assets served as-is (images, fonts, etc.)

Astro components use a frontmatter fence (`---`) for server-side logic and imports, with HTML-like template syntax below it. Client-side interactivity uses `<script>` tags or framework islands (React, Svelte, etc.) with a `client:*` directive.
