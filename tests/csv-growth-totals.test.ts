import { buildGrowthTotalsCsv } from '../src/lib/csv';
import type { ProjectionRow } from '../src/lib/types';

describe('buildGrowthTotalsCsv', () => {
  test('serializes growth totals with the exact header', () => {
    const rows = [
      { year: 1, smartInsuredReserve: 100 },
      { year: 2, smartInsuredReserve: 250 },
    ] as ProjectionRow[];

    expect(buildGrowthTotalsCsv(rows).split('\n')).toEqual([
      'Years,Total Delta,Final Reserve',
      '2,150,250',
    ]);
  });

  test('serializes empty growth totals as zeroes', () => {
    expect(buildGrowthTotalsCsv([]).split('\n')).toEqual([
      'Years,Total Delta,Final Reserve',
      '0,0,0',
    ]);
  });
});
