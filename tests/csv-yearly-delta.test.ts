import { buildYearlyDeltaCsv } from '../src/lib/csv';
import type { ProjectionRow } from '../src/lib/types';

describe('buildYearlyDeltaCsv', () => {
  test('serializes yearly reserve deltas with the exact header', () => {
    const rows = [
      { smartInsuredReserve: 100 },
      { smartInsuredReserve: 250 },
      { smartInsuredReserve: 400 },
    ] as ProjectionRow[];

    expect(buildYearlyDeltaCsv(rows).split('\n')).toEqual([
      'Year,Reserve Delta',
      '1,150',
      '2,150',
    ]);
  });
});
