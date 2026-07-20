import { buildGrowthTotalsCsv } from '../src/lib/growthTableTotalsCsv';
import { ProjectionRow } from '../src/lib/types';

const row = (year: number, smartInsuredReserve: number) =>
  ({ year, smartInsuredReserve } as ProjectionRow);

describe('buildGrowthTotalsCsv', () => {
  it('produces correct CSV for two rows', () => {
    const rows = [row(1, 100), row(2, 250)];
    expect(buildGrowthTotalsCsv(rows).split('\n')).toEqual([
      'Years,Total Delta,Final Reserve',
      '2,150,250',
    ]);
  });

  it('produces correct CSV for empty rows', () => {
    expect(buildGrowthTotalsCsv([]).split('\n')).toEqual([
      'Years,Total Delta,Final Reserve',
      '0,0,0',
    ]);
  });
});
