# Raíz — cocina de estación

**[Ver sitio en vivo →](https://restaurante-raiz.vercel.app)**

![Raíz](docs/preview.jpg)

Editorial landing page for a fictional seasonal-kitchen restaurant, with a
rotating tasting menu and online booking. First of five frontend portfolio
pieces.

> Demo site. Raíz is not a real restaurant; the content is plausible but invented.

## What it demonstrates

- **Editorial typography** on a fluid scale built with `clamp()`. Fraunces
  variable for display, Inter variable for reading.
- **Full-bleed photography** through a `<Figure>` component: `srcset`/`sizes`,
  `loading`/`fetchpriority`, fade-in on load, and a solid colour fallback when
  an image fails.
- **Microinteractions** with Framer Motion: hero parallax tied to scroll,
  reveal on viewport entry, tab underline with `layoutId`, panel transitions.
- **A booking form with real states** (`idle → submitting → success | error`):
  Zod and React Hook Form validation, per-field errors, `aria-live`, focus moved
  to the first error, confirmation panel, and a failure path with retry.
- **Smooth scrolling** with Lenis and anchor navigation, disabled automatically
  under `prefers-reduced-motion`.
- **Accessibility**: landmarks, labels on every field, `radiogroup`,
  `tablist`/`tabpanel`, skip link, visible focus.
- **Responsive** from 320px to wide screens, with no horizontal scroll.

## Stack

Vite · React 19 · TypeScript · Framer Motion · React Hook Form · Zod · Lenis ·
Fontsource. Hand-written CSS using custom properties and one file per
component, with no styling framework.

## Trying the form

Fill in the fields and confirm to see the `submitting` state and then the
confirmation panel. To see the **error state**, use an email ending in
`@error.test` (for example `ana@error.test`): the simulated request fails and
the retry banner appears.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build
npm run preview    # serve the build
```

## Photography

Images are served from the Unsplash CDN so the repository carries no binaries.
They are centralised in [`src/data/images.ts`](src/data/images.ts): replace each
`id` with a local path (`/img/hero.jpg` under `public/img/`) to use your own
photos. `<Figure>` builds the `srcset` from that file.

## Structure
