# System Overview

## What is SmartInsuredReserve?

A single-page web application that models the financial benefit of a **self-insurance reserve strategy**. Users input their auto and home insurance premiums at various deductible tiers, and the tool projects year-by-year how raising deductibles and redirecting premium savings into a reserve fund compounds over time.

## Architecture

```
Browser (client-only SPA)
  └── Next.js 14 (Pages Router, SSR disabled for main component)
       ├── pages/index.tsx          ← entry point, dynamic-imports InsuranceOptimizer
       ├── pages/_app.tsx           ← global layout wrapper
       ├── src/components/
       │   └── InsuranceOptimizer.tsx  ← all UI + calculation logic
       ├── src/lib/calculator.ts    ← generic arithmetic helpers (scaffold)
       ├── styles/globals.css       ← Tailwind + global styles
       └── tests/calculator.test.ts ← Jest unit tests
```

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Client-only rendering (`ssr: false`) | Recharts requires browser APIs; no server data needed |
| All logic in one component | Small app; single `useMemo` computes the full projection |
| No backend / API | Pure client-side calculator — no persistence, no auth |
| Pages Router (not App Router) | Project was scaffolded with Next.js 14 Pages Router |
| Recharts for visualization | Composable chart library with bar + line combo support |

## Data Flow

1. User enters insurance premiums, inflation rates, deductible tiers, reserve parameters
2. `useMemo` in `InsuranceOptimizer` recalculates a year-by-year projection array on every input change
3. Projection determines when the reserve balance crosses deductible tier thresholds to auto-upgrade
4. Results render as: summary cards, a composed bar+line chart, and a scrollable year-by-year table

## External Dependencies

- **No backend services** — fully static client-side app
- **No environment variables** required
- **No database** — all state is ephemeral in React state
