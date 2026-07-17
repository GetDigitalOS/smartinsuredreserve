import { summarizeGrowthTable } from '../src/lib/growthTableTotals';
import { ProjectionRow } from '../src/lib/types';

describe('summarizeGrowthTable', () => {
  test('summarizes growth table entries', () => {
    const rows = [
      { year: 1, smartInsuredReserve: 100 },
      { year: 2, smartInsuredReserve: 250 },
    ] as ProjectionRow[];

    expect(summarizeGrowthTable(rows)).toEqual({
      years: 2,
      totalDelta: 150,
      finalReserve: 250,
    });
  });

  test('returns zero totals for no rows', () => {
    expect(summarizeGrowthTable([])).toEqual({
      years: 0,
      totalDelta: 0,
      finalReserve: 0,
    });
  });
});
