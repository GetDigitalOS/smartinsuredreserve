import { deriveGrowthInsight } from '../src/lib/insights';
import { ProjectionRow } from '../src/lib/types';

describe('deriveGrowthInsight', () => {
  it('formats the reserve CAGR', () => {
    const rows = [
      { smartInsuredReserve: 1000 },
      { smartInsuredReserve: 2000 },
      { smartInsuredReserve: 4000 },
    ] as ProjectionRow[];

    expect(deriveGrowthInsight(rows)).toBe('Reserve CAGR: 100.0%');
  });

  it('returns zero for empty rows', () => {
    expect(deriveGrowthInsight([])).toBe('Reserve CAGR: 0.0%');
  });
});
