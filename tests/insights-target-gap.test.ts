import { deriveTargetGapInsight } from '../src/lib/insights';
import { ProjectionRow } from '../src/lib/types';

describe('deriveTargetGapInsight', () => {
  it('formats the gap between the final reserve and the target', () => {
    const rows = [
      { smartInsuredReserve: 100 },
      { smartInsuredReserve: 250 },
      { smartInsuredReserve: 400 },
    ] as ProjectionRow[];

    expect(deriveTargetGapInsight(rows, 800)).toBe('Reserve gap to target: $400');
  });

  it('uses zero reserve for empty rows', () => {
    expect(deriveTargetGapInsight([], 1000)).toBe('Reserve gap to target: $1,000');
  });
});
