# Roadmap

## Current State

The app is a working single-page calculator with all core logic in one component. No backend, no persistence, no auth.

## Potential Next Steps

- [ ] **Extract calculation logic** — Move the `useMemo` projection logic from `InsuranceOptimizer.tsx` into `src/lib/` as a pure function for better testability
- [ ] **Add reserve calculator tests** — The existing tests only cover generic arithmetic helpers; the core projection logic has no test coverage
- [ ] **Input validation** — Add boundary checks (e.g., negative premiums, inflation > 100%, years outside 1-50)
- [ ] **Save/load scenarios** — Allow users to save parameter sets to localStorage or export as JSON
- [ ] **PDF/print export** — Generate a printable summary report of the projection

## Known Technical Debt

- [ ] `calculator.ts` contains generic arithmetic helpers unrelated to the insurance domain — likely scaffold remnants
- [ ] `InsuranceOptimizer.tsx` uses `any` types extensively — could benefit from proper interfaces
- [ ] Home insurance default inflation (22.5%) seems high — [VERIFY: is this an intentional stress-test default?]
