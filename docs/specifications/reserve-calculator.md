# Reserve Calculator Specification

## Core Concept

The SmartInsured Reserve strategy works by:
1. Starting with the user's current deductibles and reserve balance
2. Calculating premium savings from higher deductibles vs. the current tier
3. Redirecting those savings + optional contributions into a reserve fund
4. Growing the reserve via an expected annual return rate
5. Automatically upgrading deductibles when the reserve crosses tier thresholds

## Inputs

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `autoPremium250` | number | 1900 | Annual auto premium at $250 deductible |
| `autoPremium500` | number | 1473 | Annual auto premium at $500 deductible |
| `autoPremium1000` | number | 1140 | Annual auto premium at $1,000 deductible |
| `autoInflation` | number | 3.0 | Auto premium inflation rate (%) |
| `autoCurrentDeductible` | select | 250 | Starting auto deductible tier |
| `homePremium500` | number | 2400 | Annual home premium at $500 deductible |
| `homePremium1000` | number | 1860 | Annual home premium at $1,000 deductible |
| `homePremium5000` | number | 1440 | Annual home premium at $5,000 deductible |
| `homeInflation` | number | 22.5 | Home premium inflation rate (%) |
| `homeCurrentDeductible` | select | 500 | Starting home deductible tier |
| `currentReserve` | number | 0 | Starting reserve balance ($) |
| `reserveReturn` | number | 4.5 | Expected annual return on reserve (%) |
| `reserveContribution` | number | 0 | Annual contribution to reserve ($) |
| `years` | number | 30 | Projection horizon (1-50) |

## Deductible Tiers

- **Auto:** $250 → $500 → $1,000
- **Home:** $500 → $1,000 → $5,000

## Calculation Logic (per year)

1. Apply inflation: `premium * (1 + inflationRate)^(year - 1)`
2. Determine current strategy cost (premiums at original deductible with inflation)
3. Check if reserve >= next deductible tier threshold → upgrade deductible
4. Calculate proposed premium at current (possibly upgraded) deductible
5. Recaptured premium = current strategy cost - proposed premium
6. Reserve grows by: recaptured premium + annual contribution + (reserve * return rate)

## Outputs

- **Summary cards:** Final reserve balance, total savings, final auto/home deductibles
- **Chart:** Composed bar+line chart showing proposed vs. current premiums, recaptured premium, reserve growth
- **Table:** Year-by-year breakdown with all intermediate values
