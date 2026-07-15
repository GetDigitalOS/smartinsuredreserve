import { computeReserveCagr } from '../src/lib/growth';
import { ProjectionRow } from '../src/lib/types';

describe('computeReserveCagr', () => {
  test('calculates the compound annual growth rate of the reserve', () => {
    const rows = [
      { smartInsuredReserve: 1000 },
      { smartInsuredReserve: 2000 },
      { smartInsuredReserve: 4000 },
    ] as ProjectionRow[];

    expect(computeReserveCagr(rows)).toBe(1);
  });

  test('returns zero when no rows are provided', () => {
    expect(computeReserveCagr([])).toBe(0);
  });

  test('returns zero when only one row is provided', () => {
    expect(computeReserveCagr([{ smartInsuredReserve: 500 }] as ProjectionRow[])).toBe(0);
  });
});
