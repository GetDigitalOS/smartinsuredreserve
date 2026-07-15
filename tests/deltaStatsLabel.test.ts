import { describeYearlyDeltas } from '../src/lib/deltaStatsLabel';
import { ProjectionRow } from '../src/lib/types';

describe('describeYearlyDeltas', () => {
  test('formats yearly delta statistics', () => {
    const rows = [
      { smartInsuredReserve: 100 },
      { smartInsuredReserve: 250 },
      { smartInsuredReserve: 400 },
    ] as ProjectionRow[];

    expect(describeYearlyDeltas(rows)).toBe(
      'Peak delta: $150; trough delta: $150; average delta: $150',
    );
  });

  test('formats zero statistics when no rows are provided', () => {
    expect(describeYearlyDeltas([])).toBe(
      'Peak delta: $0; trough delta: $0; average delta: $0',
    );
  });
});
