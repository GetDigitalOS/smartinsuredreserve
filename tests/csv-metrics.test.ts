import { buildMetricsCsv } from '../src/lib/csv';
import type { ProjectionRow } from '../src/lib/types';

describe('buildMetricsCsv', () => {
  test('serializes the computed metrics with the exact header', () => {
    const rows = [
      { reserveEarnings: 10, recapturedPremium: 8, cumulativeSavings: 30 },
      { reserveEarnings: 20, recapturedPremium: 5, cumulativeSavings: 40 },
    ] as ProjectionRow[];

    const lines = buildMetricsCsv(rows).split('\n');

    expect(lines[0]).toBe(
      'Total Reserve Earnings,Peak Recaptured Premium,Average Annual Savings',
    );
    expect(lines[1]).toBe('30,8,20');
  });
});
