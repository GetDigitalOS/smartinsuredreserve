import { buildGrowthTable } from '../src/lib/growthTable';
import { ProjectionRow } from '../src/lib/types';

describe('buildGrowthTable', () => {
  it('builds reserve growth rows', () => {
    const rows = [
      { year: 1, smartInsuredReserve: 100 },
      { year: 2, smartInsuredReserve: 250 },
    ] as ProjectionRow[];

    expect(buildGrowthTable(rows)).toEqual([
      { year: 1, reserve: 100, delta: 0 },
      { year: 2, reserve: 250, delta: 150 },
    ]);
  });

  it('returns an empty table for empty rows', () => {
    expect(buildGrowthTable([])).toEqual([]);
  });
});
