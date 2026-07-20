import { buildScenarioCompareMarkdown } from '../src/lib/scenarioCompareMarkdown';
import type { ProjectionRow } from '../src/lib/types';

describe('buildScenarioCompareMarkdown', () => {
  it('returns a markdown table containing comparison deltas', () => {
    const base = [
      { smartInsuredReserve: 100, cumulativeSavings: 20 },
    ] as ProjectionRow[];
    const alt = [
      { smartInsuredReserve: 300, cumulativeSavings: 80 },
    ] as ProjectionRow[];

    expect(buildScenarioCompareMarkdown(base, alt).split('\n')).toEqual([
      '| Final Reserve Delta | Total Savings Delta |',
      '| --- | --- |',
      '| 200 | 60 |',
    ]);
  });

  it('returns zero deltas for empty projections', () => {
    expect(buildScenarioCompareMarkdown([], []).split('\n')).toEqual([
      '| Final Reserve Delta | Total Savings Delta |',
      '| --- | --- |',
      '| 0 | 0 |',
    ]);
  });
});
