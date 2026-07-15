import { describeComparison } from '../src/lib/scenarioCompare';
import type { ProjectionRow } from '../src/lib/types';

describe('describeComparison', () => {
  it('formats the reserve and savings deltas', () => {
    const base = [
      { smartInsuredReserve: 1000, cumulativeSavings: 100 },
    ] as ProjectionRow[];
    const alt = [
      { smartInsuredReserve: 1500, cumulativeSavings: 250 },
    ] as ProjectionRow[];

    expect(describeComparison(base, alt)).toBe(
      'Final reserve delta: $500; total savings delta: $150'
    );
  });
});
