import { describeGrowthTotals } from '../src/lib/growthTableTotalsLabel';
import { ProjectionRow } from '../src/lib/types';

describe('describeGrowthTotals', () => {
  it('describes growth totals', () => {
    const rows = [
      { year: 1, smartInsuredReserve: 100 },
      { year: 2, smartInsuredReserve: 250 },
    ] as ProjectionRow[];

    expect(describeGrowthTotals(rows)).toBe(
      'Years: 2; total delta: $150; final reserve: $250',
    );
  });

  it('describes empty growth totals', () => {
    expect(describeGrowthTotals([])).toBe(
      'Years: 0; total delta: $0; final reserve: $0',
    );
  });
});
