import { buildScenarioCompareCsv } from '../src/lib/scenarioCompareCsv';
import type { ProjectionRow } from '../src/lib/types';

describe('buildScenarioCompareCsv', () => {
  it('exports projection deltas as CSV', () => {
    const base = [
      { smartInsuredReserve: 100, cumulativeSavings: 20 },
    ] as ProjectionRow[];
    const alt = [
      { smartInsuredReserve: 300, cumulativeSavings: 80 },
    ] as ProjectionRow[];

    expect(buildScenarioCompareCsv(base, alt).split('\n')).toEqual([
      'Final Reserve Delta,Total Savings Delta',
      '200,60',
    ]);
  });

  it('exports zero deltas for empty projections', () => {
    expect(buildScenarioCompareCsv([], []).split('\n')).toEqual([
      'Final Reserve Delta,Total Savings Delta',
      '0,0',
    ]);
  });
});
