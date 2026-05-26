# Project Classification — smartinsuredreserve

| Field | Value |
|-------|-------|
| **Generated** | 2026-05-23 |
| **Method** | Tier manually restored (auto-classify under-read — incomplete docs) |
| **Result** | **Tier 2 — Interactive** |

> **Authoritative tier: Tier 2 — Interactive.** This doc was regenerated on 2026-05-23
> after the original was lost. Auto-classify scored the project 1/10 → Tier 1 from thin
> docs (a 20-line `CLAUDE.md` and 24-line README), yet its own rationale describes a
> "Tier 2 interactive demo." The Tier 2 governance tier from the registry has been
> preserved. **Re-run `/classify` once the project's docs are complete** to re-validate
> the tier from full signals.

## Tier Determination

**Tier 2 — Interactive** (restored)

- Final tier: **2** (preserved from registry)
- Auto-classify result: Tier 1 (1/10) — based on thin docs

## Auto-Classify Assessment (reference — under-read, incomplete docs)

| # | Question | Answer | Rationale |
|---|----------|--------|-----------|
| auth | User Authentication | No | Docs explicitly state no auth — it's a client-only calculator with no user accounts. |
| data | Data Persistence | No | No backend, no database; all state is ephemeral in React state per system-overview.md. |
| roles | Multi-Role Access | No | Single-purpose calculator with no user types or permission model. |
| integrations | Third-Party Integrations | No | System overview states no backend services and no external APIs — purely client-side. |
| realtime | Real-Time Features | No | Calculations are local useMemo recomputations; no websockets or live collaboration. |
| sensitive | Transaction Sensitivity | No | Inputs are insurance premium estimates entered ephemerally; no PII stored or transmitted. |
| scale | Scale Expectations | No | Tier 2 interactive demo with no backend — concurrency is bounded by static hosting, not application load. |
| team | Team Size | No | Small scaffold with no contributor guidelines or signals of multi-developer workflow. |
| longevity | Longevity | **Yes** | Registered in the Freebridge fleet under hub governance, implying ongoing maintenance beyond 2 years. |
| ai | AI/LLM Features | No | No AI/LLM dependencies or features — calculations are deterministic arithmetic via Recharts visualization. |
