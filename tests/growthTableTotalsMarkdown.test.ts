import { buildGrowthTotalsMarkdown } from '../src/lib/growthTableTotalsMarkdown';
import { ProjectionRow } from '../src/lib/types';

describe('buildGrowthTotalsMarkdown', () => {
  test('builds a Markdown table with growth totals', () => {
    const rows = [
      { year: 1, smartInsuredReserve: 100 },
      { year: 2, smartInsuredReserve: 250 },
    ] as ProjectionRow[];

    expect(buildGrowthTotalsMarkdown(rows).split('\n')).toEqual([
      '| Years | Total Delta | Final Reserve |',
      '| --- | --- | --- |',
      '| 2 | 150 | 250 |',
    ]);
  });

  test('builds zero totals for no rows', () => {
    expect(buildGrowthTotalsMarkdown([]).split('\n')).toEqual([
      '| Years | Total Delta | Final Reserve |',
      '| --- | --- | --- |',
      '| 0 | 0 | 0 |',
    ]);
  });
});
