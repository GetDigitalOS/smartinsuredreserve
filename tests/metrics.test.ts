import { computeReserveMetrics } from '../src/lib/metrics';
import { ProjectionRow } from '../src/lib/types';

describe('computeReserveMetrics', () => {
  it('computes metrics correctly for non-empty array', () => {
    const rows = [
      { reserveEarnings: 10, recapturedPremium: 5, cumulativeSavings: 5 },
      { reserveEarnings: 20, recapturedPremium: 8, cumulativeSavings: 13 }
    ] as ProjectionRow[];
    
    expect(computeReserveMetrics(rows)).toEqual({
      totalReserveEarnings: 30,
      peakRecapturedPremium: 8,
      averageAnnualSavings: 6.5
    });
  });

  it('computes metrics correctly for empty array', () => {
    expect(computeReserveMetrics([])).toEqual({
      totalReserveEarnings: 0,
      peakRecapturedPremium: 0,
      averageAnnualSavings: 0
    });
  });
});
