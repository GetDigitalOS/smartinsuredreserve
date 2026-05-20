# Developer Setup & Reference

## Prerequisites

- Node.js (compatible with Next.js 14)
- npm

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm start` | Start production server on port 3000 |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests (`--passWithNoTests`) |

## Project Structure

```
pages/
  index.tsx          — Entry point (dynamic-imports InsuranceOptimizer)
  _app.tsx           — App wrapper with global CSS
src/
  components/
    InsuranceOptimizer.tsx  — Main UI + calculation logic
  lib/
    calculator.ts    — Arithmetic helpers (scaffold)
styles/
  globals.css        — Tailwind + global styles
tests/
  calculator.test.ts — Unit tests for calculator helpers
```

## Config Files

| File | Purpose |
|------|---------|
| `next.config.js` | Next.js config (strict mode enabled) |
| `tsconfig.json` | TypeScript config (ES2020 target, strict) |
| `tailwind.config.cjs` | Tailwind CSS config |
| `postcss.config.cjs` | PostCSS config for Tailwind |
| `.eslintrc.json` | ESLint config (extends next) |
| `.prettierrc` | Prettier formatting rules |

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | 14.0.0 | Framework |
| react | 18.2.0 | UI library |
| recharts | 2.6.2 | Charts (bar + line combo) |
| lucide-react | 0.286.0 | Icons |
| tailwindcss | ^3.4.7 | Utility CSS |

## Environment Variables

None required. The app is fully client-side with no external services.
