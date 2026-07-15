import { computeYearlyReserveDeltas } from '../src/lib/yearlyDelta';
import { ProjectionRow } from '../src/lib/types';

describe('computeYearlyReserveDeltas', () => {
  test('calculates differences between successive reserve values', () => {
    const rows = [
      { smartInsuredReserve: 100 },
      { smartInsuredReserve: 250 },
      { smartInsuredReserve: 400 },
    ] as ProjectionRow[];

    expect(computeYearlyReserveDeltas(rows)).toEqual([150, 150]);
  });

  test('returns an empty array when no rows are provided', () => {
    expect(computeYearlyReserveDeltas([])).toEqual([]);
  });
});
