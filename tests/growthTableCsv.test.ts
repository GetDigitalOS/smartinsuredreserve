import { buildGrowthTableCsv } from '../src/lib/growthTableCsv';
import { ProjectionRow } from '../src/lib/types';

describe('buildGrowthTableCsv', () => {
  it('serializes growth table rows with a header', () => {
    const rows = [
      { year: 1, smartInsuredReserve: 100 },
      { year: 2, smartInsuredReserve: 250 },
    ] as ProjectionRow[];

    expect(buildGrowthTableCsv(rows).split('\n')).toEqual([
      'Year,Reserve,Delta',
      '1,100,0',
      '2,250,150',
    ]);
  });

  it('returns only the header for no rows', () => {
    expect(buildGrowthTableCsv([])).toBe('Year,Reserve,Delta');
  });
});
