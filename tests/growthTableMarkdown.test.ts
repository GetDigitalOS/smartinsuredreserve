import { buildGrowthTableMarkdown } from '../src/lib/growthTableMarkdown';
import { ProjectionRow } from '../src/lib/types';

describe('buildGrowthTableMarkdown', () => {
  it('builds a markdown table from growth rows', () => {
    const rows = [
      { year: 1, smartInsuredReserve: 100 },
      { year: 2, smartInsuredReserve: 250 },
    ] as ProjectionRow[];

    expect(buildGrowthTableMarkdown(rows).split('\n')).toEqual([
      '| Year | Reserve | Delta |',
      '| --- | --- | --- |',
      '| 1 | 100 | 0 |',
      '| 2 | 250 | 150 |',
    ]);
  });

  it('returns only table headers for no rows', () => {
    expect(buildGrowthTableMarkdown([])).toBe(
      '| Year | Reserve | Delta |\n| --- | --- | --- |',
    );
  });
});
