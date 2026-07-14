import { compareProjections } from '../src/lib/scenarioCompare';
import type { ProjectionRow } from '../src/lib/types';

describe('compareProjections', () => {
  it('returns the final reserve and savings deltas', () => {
    const base = [
      { smartInsuredReserve: 1000, cumulativeSavings: 200 },
    ] as ProjectionRow[];
    const alt = [
      { smartInsuredReserve: 1500, cumulativeSavings: 350 },
    ] as ProjectionRow[];

    expect(compareProjections(base, alt)).toEqual({
      finalReserveDelta: 500,
      totalSavingsDelta: 150,
    });
  });

  it('returns zero deltas when both projections are empty', () => {
    expect(compareProjections([], [])).toEqual({
      finalReserveDelta: 0,
      totalSavingsDelta: 0,
    });
  });
});
