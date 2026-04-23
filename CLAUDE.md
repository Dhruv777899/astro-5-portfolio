# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

> Run `nvm use 22` before any npm commands — the default Node version may be v16.

```sh
npm run dev       # Dev server at localhost:4321
npm run build     # Production build to ./dist/
npm run preview   # Preview the production build locally
```

There are no lint or test scripts configured.

## Architecture

Single-page Astro 5 portfolio with Tailwind CSS v4 (via `@tailwindcss/vite` plugin) and GSAP for animations. No framework components (React/Vue/Svelte) — pure `.astro` files only.

**Page structure** (`src/pages/index.astro`): one page composed of section components stacked vertically — `Sidebar`, `Hero`, `About`, `Numbers`, `Work`, `Process`, `Contact`, `Footer` — all wrapped in `Layout.astro`.

**Layout** (`src/layouts/Layout.astro`): imports global CSS, injects Google Fonts (Bebas Neue, DM Serif Display, Outfit), renders a custom cursor (`#cursor-dot` / `#cursor-ring`), and initializes all client-side scripts via `<script>` tags using bare imports.

**Client scripts** (`src/scripts/`):
- `cursor.ts` — custom cursor dot + lagging ring, expands on hover over interactive elements
- `scroll.ts` — GSAP ScrollTrigger scroll-reveal (`.reveal` / `.reveal-delay-{1-4}` classes) and sidebar active-section highlighting via IntersectionObserver
- `workFilter.ts` — filters `.project-card[data-category]` elements by `.filter-btn[data-filter]` clicks; must be initialized manually in the Work component

**Styling** (`src/styles/global.css`): Tailwind v4 with a custom `@theme` block defining all design tokens (colors, fonts). All theme variables use CSS custom property names (`--color-base`, `--color-accent`, `--font-heading`, etc.) and are referenced throughout component styles.

**Scroll reveal pattern**: add `.reveal` (and optionally `.reveal-delay-1` through `.reveal-delay-4`) to any element to get a GSAP fade-up on scroll. Elements in `#home` section animate on page load instead.
