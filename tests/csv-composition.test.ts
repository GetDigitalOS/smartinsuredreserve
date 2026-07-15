import { buildCompositionCsv } from '../src/lib/csv';
import type { ProjectionRow } from '../src/lib/types';

describe('buildCompositionCsv', () => {
  test('builds the composition totals CSV', () => {
    const rows = [
      { reserveEarnings: 10, recapturedPremium: 8, smartInsuredReserve: 1000 },
      { reserveEarnings: 20, recapturedPremium: 5, smartInsuredReserve: 2000 },
    ] as ProjectionRow[];

    expect(buildCompositionCsv(rows).split('\n')).toEqual([
      'Earnings Total,Recaptured Total,Final Reserve',
      '30,13,2000',
    ]);
  });
});
