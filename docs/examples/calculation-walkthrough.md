# Calculation Walkthrough

## How the deductible upgrade logic works

The reserve balance is checked each year against the next deductible tier. When the reserve exceeds the tier threshold, the deductible automatically upgrades.

### Example: Auto deductible upgrade

Starting conditions:
- Current auto deductible: $250
- Auto tiers: `[250, 500, 1000]`
- Reserve balance: $0

**Year 1:** Reserve = $0. Next tier is $500. $0 < $500 → stay at $250.
**Year N:** Reserve reaches $520. Next tier is $500. $520 >= $500 → upgrade to $500.
**Year N+M:** Reserve reaches $1,100. Next tier is $1,000. $1,100 >= $1,000 → upgrade to $1,000.

### Key code pattern: projection loop

The core calculation in `InsuranceOptimizer.tsx` (lines 44-101) is a single `for` loop that:

1. Computes inflated premiums for each tier
2. Checks if reserve crosses the next deductible threshold
3. Calculates premium savings (recaptured premium)
4. Grows the reserve: `reserve += recapturedPremium + contribution + earnings`

This produces an array of yearly result objects used by both the chart and the table.

### Reserve growth formula (per year)

```
newReserve = previousReserve + recapturedPremium + annualContribution
earnings = newReserve * (returnRate / 100)
finalReserve = newReserve + earnings
```

Note: earnings are calculated on the balance *after* adding recaptured premium and contributions, not before.
