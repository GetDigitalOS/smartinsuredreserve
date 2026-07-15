import { computeReserveComposition } from '../src/lib/reserveComposition';
import { ProjectionRow } from '../src/lib/types';

const makeRow = (reserveEarnings: number, recapturedPremium: number, smartInsuredReserve: number): ProjectionRow =>
  ({ reserveEarnings, recapturedPremium, smartInsuredReserve } as ProjectionRow);

describe('computeReserveComposition', () => {
  it('sums earnings, recaptured, and returns last reserve', () => {
    const rows = [
      makeRow(10, 8, 1000),
      makeRow(20, 5, 2000),
    ];
    expect(computeReserveComposition(rows)).toEqual({
      earningsTotal: 30,
      recapturedTotal: 13,
      finalReserve: 2000,
    });
  });

  it('returns zeros for empty rows', () => {
    expect(computeReserveComposition([])).toEqual({
      earningsTotal: 0,
      recapturedTotal: 0,
      finalReserve: 0,
    });
  });
});
