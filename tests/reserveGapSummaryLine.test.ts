import { describeReserveGapSummary } from '../src/lib/reserveGapSummaryLine';
import { ProjectionRow } from '../src/lib/types';

describe('describeReserveGapSummary', () => {
  it('combines the reserve target gap and growth totals', () => {
    const rows = [
      { year: 1, smartInsuredReserve: 100 },
      { year: 2, smartInsuredReserve: 250 },
    ] as ProjectionRow[];

    expect(describeReserveGapSummary(rows, 800)).toBe(
      'Reserve gap: $550 | Years: 2; total delta: $150; final reserve: $250',
    );
  });

  it('describes an empty reserve gap summary', () => {
    expect(describeReserveGapSummary([], 1000)).toBe(
      'Reserve gap: $1,000 | Years: 0; total delta: $0; final reserve: $0',
    );
  });
});
