# Compliance Report — SmartInsuredReserve

**Date:** 2026-05-23
**Tier:** 2 — Interactive
**Framework Version:** Universal Web Development Principles v2 (v2.02.01)
**Auditor:** Claude (auto-audit via `/compliance`)

## Summary

| Status | Count |
|--------|------:|
| Met | 18 |
| Partial | 26 |
| Not Met | 19 |
| Not Applicable | 14 |

**Overall Compliance:** ~70% of applicable principles met or partially met (44 of 63 applicable).

> Counting only the 63 in-scope principles (Tier 1 + Tier 2 + active cross-cutting concerns), excluding the 14 marked N/A (CSRF/rate-limiting/CMS items that don't apply to a client-only calculator with no backend).

## Critical Gaps (Fix Before Launch)

1. **Dependency vulnerabilities** — `npm audit` reports **4 vulnerabilities (2 high, 2 moderate)** including a PostCSS XSS issue and brace-expansion DoS. The most recent commit (`d13f7ec`) claimed "0 remaining" but a fresh audit shows regression. **Fix immediately** with `npm audit fix` (and reassess if `--force` is needed since it bumps Next.js minor).
2. **CSP allows `unsafe-eval` and `unsafe-inline`** (`next.config.js:27`) — this neutralises most XSS protection. `unsafe-eval` is structurally required because `src/lib/calculator.ts:19` uses `Function()`. Remove the unused `evaluateExpression` helper, then tighten the CSP.
3. **No client-side error capture / observability** — registry declares `stack.observability = "@getdigitalos/observability"` but the package is **not installed in `package.json` and not imported anywhere**. Tier 2 requires error capture (Sentry or equivalent). This is also a registry drift.
4. **Security headers ineffective on Cloudflare Pages static deploys** — `next.config.js` `headers()` only runs in the Next runtime. The deploy target is `cloudflare-pages` (`.github/workflows/deploy.yml`), and the deploy uploads `.next` as a build output. Verify headers actually land at the edge; if not, move them to a `_headers` file or Cloudflare Transform Rules.

## Detailed Results

### Tier 1: Security Fundamentals
- Met — **HTTPS Everywhere** — Cloudflare Pages enforces TLS for `*.pages.dev`.
- Partial — **Security Headers** — `next.config.js:4-32` sets X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, CSP. Missing HSTS. CSP weakened by `unsafe-eval` + `unsafe-inline`. Verify these headers actually serve from Cloudflare Pages (Next's `headers()` does not apply to fully static output).
- Partial — **Input Validation** — `InsuranceOptimizer.tsx:27` does `parseFloat(value) || 0` — silently coerces garbage to `0`. Only `years` has `min/max` (line 212). No bounds on premiums/rates. No server (so server-side validation N/A).
- Not Met — **Dependency Hygiene** — `npm audit`: 4 vulnerabilities (2 high, 2 moderate). PostCSS XSS, brace-expansion DoS, transitive via Next 16.2.1.

### Tier 1: Design System Basics
- Partial — **Semantic Tokens** — Using raw Tailwind utility classes (`bg-indigo-600`, `text-blue-900`) directly; no semantic mapping layer.
- Not Met — **Token Hierarchy** — `tailwind.config.cjs` has empty `theme.extend`. No primitive → semantic → component layering.
- Met — **Consistent Spacing Scale** — Tailwind 4px base unit used uniformly.
- Met — **Typography Scale** — Tailwind defaults used consistently (`text-sm`, `text-xl`, `text-3xl`).
- Partial — **Icon System** — Lucide-react adopted (`InsuranceOptimizer.tsx:2`), but icons are **not marked `aria-hidden`** despite being decorative beside text labels (`<Shield className="w-8 h-8 text-indigo-600" />` line 120). Screen readers will announce them.
- Partial — **Responsive Breakpoint Strategy** — Tailwind defaults used (`sm:`, `lg:`). No fluid typography via `clamp()`. No container queries.

### Tier 1: Performance
- Partial — **Core Web Vitals Targets** — Not measured; no RUM. Simple page likely passes but unverified.
- Met — **Asset Optimization** — No images used. Next.js handles JS/CSS minification.
- Met — **Lazy Loading** — `pages/index.tsx:3` dynamically imports `InsuranceOptimizer` with `ssr: false`.
- Met — **CDN Delivery** — Cloudflare Pages serves from edge.

### Tier 1: Accessibility (WCAG 2.1 AA)
- Met — **Semantic HTML** — `<main id="main-content">`, single `<h1>`, `<h3>` for sections, `<table>` with `<thead>`/`<tbody>`, `<label htmlFor>` on every input.
- Partial — **Keyboard Navigation** — Native form elements work by default; no custom keyboard handling needed.
- Partial — **Color Contrast** — Not measured. White-on-gradient stat cards (`InsuranceOptimizer.tsx:225-256`) may be near threshold; `text-gray-600` on `bg-blue-50` should be checked.
- Partial — **Alt Text** — No `<img>` tags. Icons lack `aria-hidden`/`aria-label` (see Icon System above).
- Met — **Focus Indicators** — Skip link has explicit focus styles (`pages/_app.tsx:8`); inputs use browser defaults.
- Not Met — **Reduced Motion** — No `prefers-reduced-motion` handling. Recharts animations and Tailwind transitions run unconditionally.

### Tier 1: SEO Fundamentals
- Partial — **Semantic HTML for Search** — Has `<title>` and `<meta description>` (`pages/index.tsx:9-10`); only one page so no hierarchy to assess.
- Partial — **Open Graph & Social Tags** — Has `og:title`, `og:description`, `og:type`. **Missing `og:image`, `twitter:card`, `twitter:title`, `twitter:description`**.
- Not Met — **Structured Data** — No JSON-LD (`Organization`, `WebApplication`, `FAQPage`, etc.).
- Not Met — **Technical SEO** — No `public/robots.txt`, no `sitemap.xml`, no `<link rel="canonical">`. (Project has no `public/` folder.)
- Partial — **Performance as SEO** — Architecture is favourable but Core Web Vitals not measured.

### Tier 1: Code Quality
- Met — **Separation of Concerns** — Pages, components, lib separated.
- Partial — **DRY Principle** — `InsuranceOptimizer.tsx:131-156` and `:164-189` repeat near-identical 3-tier input groups (auto/home); could be extracted into a single `<DeductibleTierInputs />` component. Calculation logic at lines 39-42 and 62-70 duplicates tier-lookup patterns.
- Met — **Semantic Naming** — Variables and functions describe purpose (`autoInflationFactor`, `recapturedPremium`).
- Met — **Mobile-First CSS** — Tailwind base classes with `sm:`/`lg:` progressive enhancement.

### Tier 1: DevOps Basics
- Met — **Automated Deployment** — `.github/workflows/deploy.yml` deploys to Cloudflare Pages on push to `main`/`dev`.
- Met — **Preview Deployments** — `dev` branch → `dev.smartinsuredreserve.pages.dev`.
- Met — **Environment Separation** — Production (`main`) vs. preview (`dev`) clearly split via registry.
- Partial — **Domain & DNS** — Using `*.pages.dev` defaults; no custom domain documented. SSL auto-managed by Cloudflare.
- Met — **Version Control** — Git in use, semantic-ish commit prefixes (`feat`, `fix`, `chore`, `ci`).

### Tier 1: UX Fundamentals
- Met — **Responsive Design** — Tailwind responsive classes throughout.
- Partial — **Error Prevention** — Inputs are labelled and use `type="number"`; only `years` has `min`/`max`. Premiums/rates accept any negative or absurd value.
- Not Met — **Loading States** — `ssr: false` produces a blank flash during hydration; no skeleton or spinner. `ErrorBoundary` is shown only on error.
- Met — **Consistent Patterns** — All inputs go through `handleInputChange`.

---

### Tier 2: Enhanced Security
- N/A — **CSRF Protection** — No server, no form submissions.
- N/A — **Rate Limiting** — No server endpoints.
- N/A — **Honeypot Fields** — No backend forms.
- Partial — **Output Encoding** — React auto-escapes. However `src/lib/calculator.ts:19` evaluates arbitrary user input with `Function()`. The regex on line 11 is a safelist, but the helper is unused — **delete it** to remove the entire attack surface and the `unsafe-eval` requirement in CSP.
- Partial — **Content Security Policy** — Present, but `'unsafe-eval'` and `'unsafe-inline'` (script + style) defeat most of its purpose.
- Not Met — **Dependency Scanning** — No Dependabot config (`.github/dependabot.yml` absent), no `npm audit` step in CI, no Snyk integration.

### Tier 2: Data Handling
- Partial — **Client-Side + Server-Side Validation** — Minimal client validation; no server (so the second half is structurally N/A).
- Met — **Data Minimization** — No data collected, no telemetry, no third-party widgets.
- Met — **Secure Transmission** — HTTPS via Cloudflare; nothing transmitted anyway.
- Not Met — **Privacy Compliance** — No `/privacy` page even though `seo: required` is set in registry. Required at Tier 2 baseline regardless of data collection volume.

### Tier 2: Design System Extension
- Not Met — **Component Token Layer** — No abstracted button/input/card tokens; everything inline-styled with Tailwind utilities.
- Partial — **Interactive State Tokens** — Only the Try Again button has explicit hover state (`ErrorBoundary.tsx:29`). Inputs use browser default focus styles.
- Not Met — **Motion Design Principles** — No defined durations/easings; no `prefers-reduced-motion` honoured.
- Not Met — **Form Component Library** — Every input is rewritten inline (~25 occurrences in `InsuranceOptimizer.tsx`). No shared `<Input>`, `<Select>`, or `<Field>` component.
- Not Met — **Content Design Standards** — Error boundary copy is generic ("Something went wrong"); no defined patterns for empty/error/success/loading messages.

### Tier 2: Frontend Architecture Basics
- Met — **State Ownership** — Single `useState` (`InsuranceOptimizer.tsx:6`); clear local-only ownership.
- N/A — **Data Fetching Strategy** — No data fetching.
- Partial — **Rendering Strategy Decision** — CSR via `ssr: false`. The rationale (Recharts/hydration mismatch avoidance) is implicit, not documented in an ADR.

### Tier 2: Architecture
- Partial — **Separation of Concerns** — `InsuranceOptimizer.tsx` is 336 lines combining business logic (the `useMemo` projection at lines 30-102) with presentation. Extract calculation into `src/lib/projection.ts` so it can be tested independently.
- Met — **Configuration Externalized** — No hardcoded URLs or secrets.
- Partial — **Error Handling Strategy** — `ErrorBoundary` exists but does not log errors anywhere (`componentDidCatch` missing) — failures are silent in production.
- Met — **State Management** — Single source of truth in `inputs` state.

### Tier 2: Error & Edge Case UX
- Not Met — **Empty States** — Defaults always populate the form; no first-use guidance.
- N/A — **Partial Failure** — No async operations.
- N/A — **Timeout UX** — No requests.
- Not Met — **Form Error Recovery** — Invalid input becomes `0` silently (`InsuranceOptimizer.tsx:27`); user input is not preserved, no error message shown.
- N/A — **Offline Awareness** — App is fully offline-capable; no online operations.

### Tier 2: Performance Enhancement
- Met — **Code Splitting** — Calculator dynamically imported.
- Not Met — **Debouncing/Throttling** — Every keystroke triggers a full 30-year projection recalc via `useMemo`. Add debouncing for inputs that drive expensive recomputation.
- N/A — **Request Cancellation** — No requests.
- Partial — **Caching Strategy** — Relies on Cloudflare/Next defaults; no explicit `Cache-Control` configuration.

### Tier 2: Testing
- N/A — **Form Validation Testing** — No validation rules to test.
- Not Met — **Calculator Logic Testing** — `tests/calculator.test.ts` exercises **toy `add`/`subtract`/`multiply`/`divide`/`evaluateExpression` helpers from `src/lib/calculator.ts`** — none of which are used by the actual UI. The real reserve projection algorithm (the `useMemo` in `InsuranceOptimizer.tsx:30-102`) has **zero test coverage**. Also `npm test` uses `--passWithNoTests` so coverage degradation will not fail CI.
- Not Met — **Cross-Browser Testing** — No documented browser matrix or testing.
- Not Met — **Accessibility Testing** — No axe-core in CI, no Playwright a11y assertions.
- Not Met — **Visual Regression Testing** — None configured.

### Tier 2: Observability
- Not Met — **Client-Side Error Capture** — Registry advertises `@getdigitalos/observability` but no install in `package.json`, no import. ErrorBoundary doesn't even `console.error`.
- Not Met — **Source Maps in Production** — Not configured.
- Not Met — **Basic Analytics** — No Plausible/Fathom/GA integration.
- Not Met — **Uptime Monitoring** — Not documented; no UptimeRobot/BetterUptime config visible.

### Tier 2: Content Management
- N/A — **CMS Evaluation** — Single-purpose calculator; non-developers don't need to edit copy at this scale.
- N/A — **Content Modeling** — N/A.
- N/A — **Editorial Preview** — N/A.
- N/A — **Content Versioning** — N/A (Git serves this purpose).

---

### Cross-Cutting: Privacy & Data Protection
**Per Tier 2 checklist** (currently no collection, but still applies if any tracking is later added):
- Not Met — **Privacy policy** — Absent. Add a minimal `/privacy` page even though no data is currently collected.
- N/A — **Cookie consent mechanism** — No cookies, no analytics today.
- N/A — **Clear consent for marketing communications** — None sent.
- N/A — **Data retention awareness** — No persisted data.
- N/A — **DPA with form processor** — No third-party form services.

### Cross-Cutting: AI/LLM Integration
- N/A — No AI features. App is deterministic arithmetic.

### Cross-Cutting: Dependency Management
- Not Met — **Audit clean** — 4 vulnerabilities open today (2 high, 2 moderate); see Critical Gap #1.
- Met — **Lock file committed** — `package-lock.json` is in repo.
- Partial — **Evaluation criteria applied** — Dependency count is small (5 runtime deps); Recharts (2.6.2) is well-maintained; lucide-react is fine. No documented evaluation process.
- Not Met — **Automated dependency updates** — No Dependabot or Renovate config in `.github/`.

### Cross-Cutting: Structural Integrity
- Partial — **No swallowed errors** — `calculator.ts` throws clearly. But `ErrorBoundary` silently catches without reporting (no `componentDidCatch`, no logging).
- Partial — **Actionable error messages** — ErrorBoundary fallback ("Something went wrong") gives the user nothing to act on. `evaluateExpression` throws "Invalid characters in expression" — fine, but unused.
- Met — **No manual sync steps** — All state derived from `useMemo`, no manual refresh.
- N/A — **Headless CLI Support** — No CLI.
- Met — **Singular source of truth** — `inputs` useState is the single source.

### Cross-Cutting: Project Hub Registration
- Met — **Registered in Project Hub** — `C:/dev/project-hub/registry/projects.json` line 949.
- Met — **Tier matches classification** — Both registry and `PROJECT_CLASSIFICATION.md` agree on Tier 2.
- Met — **Git remote configured** — `https://github.com/GetDigitalOS/smartinsuredreserve.git`.
- Met — **Dev port assigned** — `3109` (in Freebridge range).
- Partial — **Status reflects reality** — Registry claims `observability: @getdigitalos/observability` but the package is not installed. Either install + wire it, or update the registry to `null`. `last_audited` updated to today by this audit.

## Recommendations (Prioritized)

### Critical (Security/Compliance Risk)
1. **Patch dependencies now.** Run `npm audit fix`; if forced upgrade is needed (Next 16.2.1 → 16.2.6), accept it — patch-level bump.
2. **Delete `src/lib/calculator.ts`** (and `tests/calculator.test.ts`). It is unused by the UI, uses `Function()` (an XSS sink if ever exposed), and is the only reason `unsafe-eval` is needed in CSP. Then tighten CSP: drop `'unsafe-eval'` from `script-src` and replace `'unsafe-inline'` for styles with a hash/nonce strategy (Tailwind preferred path: extract to a real stylesheet).
3. **Verify security headers actually serve.** Curl the production URL: `curl -I https://smartinsuredreserve.pages.dev`. If `next.config.js` headers don't land (likely the case with a static Cloudflare Pages export), add a `public/_headers` file.
4. **Install + wire client-side error capture.** Either install `@getdigitalos/observability` (as registry claims) or Sentry. Hook into `ErrorBoundary.componentDidCatch` so production errors aren't silent.
5. **Add Dependabot/Renovate config** at `.github/dependabot.yml` so vulnerabilities don't pile up unnoticed; add `npm audit --omit=dev` step to CI that fails on high/critical.
6. **Add a Privacy Policy page** (`pages/privacy.tsx`) — Tier 2 baseline requirement.

### Important (Quality/Reliability Risk)
1. **Test the real algorithm.** Extract the `useMemo` body of `InsuranceOptimizer.tsx:30-102` into `src/lib/projection.ts` and write Jest tests covering: deductible tier upgrades, compounding reserve, inflation factors, zero/negative reserve inputs, very large `years` values. Remove `--passWithNoTests` from the test script so missing tests fail.
2. **Fix icon accessibility.** Add `aria-hidden="true"` to every decorative Lucide icon next to a text label (~12 occurrences in `InsuranceOptimizer.tsx`).
3. **Honour `prefers-reduced-motion`.** Add a `@media (prefers-reduced-motion: reduce)` block to `styles/globals.css` that disables Tailwind transitions; pass `isAnimationActive={false}` to Recharts components when the media query matches.
4. **Validate inputs visibly.** Show inline errors for negative premiums, rates > 100%, years > 50 — rather than silently coercing to `0`.
5. **Improve `ErrorBoundary`** with `componentDidCatch` to log errors and an actionable fallback (include a "report issue" link).
6. **Add SEO basics:** `public/robots.txt`, generated `sitemap.xml`, `<link rel="canonical">`, `og:image`, `twitter:card`, JSON-LD `WebApplication` schema.

### Recommended (Best Practice)
1. **Build a small token layer** in `tailwind.config.cjs` (`theme.extend.colors.brand`, `surface`, `text`) so the indigo/blue/purple/green vocabulary is centralised, not scattered across 336 lines of utility classes.
2. **Extract reusable form components** (`<NumberField>`, `<SelectField>`) to eliminate the ~25 inline input declarations.
3. **Debounce input changes** before triggering the 30-year recalculation.
4. **Add an ADR** documenting the CSR (`ssr: false`) decision for the calculator page, so future contributors understand why.
5. **Reconcile registry drift:** either install `@getdigitalos/observability` or set `stack.observability` to `null` in `projects.json` so the hub view matches reality.
6. **Add a `public/` folder** for static assets (favicon, OG image, robots.txt, sitemap).

## Next Review

Recommended next compliance check: **2026-08-23** (90 days) — or earlier if any of the Critical items above are shipped, so the report can be re-baselined.
