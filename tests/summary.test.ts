import { computeSummaryStats } from '../src/lib/summary';
import type { ProjectionInputs, ProjectionRow } from '../src/lib/types';

function baseInputs(overrides: Partial<ProjectionInputs> = {}): ProjectionInputs {
  return {
    autoPremium250: 1000,
    autoPremium500: 800,
    autoPremium1000: 600,
    autoInflation: 0,
    autoCurrentDeductible: 250,

    homePremium500: 2000,
    homePremium1000: 1500,
    homePremium5000: 1000,
    homeInflation: 0,
    homeCurrentDeductible: 500,

    currentReserve: 0,
    reserveReturn: 0,
    reserveContribution: 0,

    years: 1,
    ...overrides,
  };
}

function projectionRow(overrides: Partial<ProjectionRow>): ProjectionRow {
  return {
    year: 1,
    autoDeductible: 250,
    homeDeductible: 500,
    autoPremiums: {},
    homePremiums: {},
    autoCurrentPremium: 0,
    homeCurrentPremium: 0,
    proposedPremium: 0,
    currentPremium: 0,
    recapturedPremium: 0,
    beginningReserve: 0,
    reserveEarnings: 0,
    smartInsuredReserve: 0,
    cumulativeSavings: 0,
    ...overrides,
  };
}

describe('computeSummaryStats', () => {
  test('empty rows return zero reserve and no break-even year', () => {
    const summary = computeSummaryStats([], baseInputs());

    expect(summary.finalReserve).toBe(0);
    expect(summary.breakEvenYear).toBeNull();
  });

  test('uses the final row reserve as finalReserve', () => {
    const summary = computeSummaryStats(
      [
        projectionRow({ year: 1, smartInsuredReserve: 500 }),
        projectionRow({ year: 2, smartInsuredReserve: 1250 }),
      ],
      baseInputs(),
    );

    expect(summary.finalReserve).toBe(1250);
  });

  test('returns the first year where cumulative savings crosses the deductible threshold', () => {
    const summary = computeSummaryStats(
      [
        projectionRow({ year: 1, cumulativeSavings: 400 }),
        projectionRow({ year: 2, cumulativeSavings: 750 }),
        projectionRow({ year: 3, cumulativeSavings: 1000 }),
      ],
      baseInputs({ autoCurrentDeductible: 250, homeCurrentDeductible: 500 }),
    );

    expect(summary.breakEvenYear).toBe(2);
  });

  test('returns null for breakEvenYear when savings never cross the threshold', () => {
    const summary = computeSummaryStats(
      [
        projectionRow({ year: 1, cumulativeSavings: 100 }),
        projectionRow({ year: 2, cumulativeSavings: 300 }),
      ],
      baseInputs({ autoCurrentDeductible: 500, homeCurrentDeductible: 1000 }),
    );

    expect(summary.breakEvenYear).toBeNull();
  });

  test('computes reserveCoverageRatio as finalReserve divided by 5000', () => {
    const summary = computeSummaryStats(
      [projectionRow({ year: 1, smartInsuredReserve: 2500 })],
      baseInputs(),
    );

    expect(summary.reserveCoverageRatio).toBe(0.5);
  });
});
