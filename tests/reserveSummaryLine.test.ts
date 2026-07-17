import { describeReserveSummary } from '../src/lib/reserveSummaryLine';
import { ProjectionRow } from '../src/lib/types';

describe('describeReserveSummary', () => {
  it('combines reserve progress and trend', () => {
    const rows = [
      { smartInsuredReserve: 100 },
      { smartInsuredReserve: 250 },
      { smartInsuredReserve: 400 },
    ] as ProjectionRow[];

    expect(describeReserveSummary(rows, 800)).toBe('Reserve progress: 50.0% | Reserve trend: rising');
  });

  it('describes an empty reserve summary', () => {
    expect(describeReserveSummary([], 10000)).toBe('Reserve progress: 0.0% | Reserve trend: flat');
  });
});
