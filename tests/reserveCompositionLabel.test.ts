import { describeReserveComposition } from '../src/lib/reserveCompositionLabel';
import { ProjectionRow } from '../src/lib/types';

describe('describeReserveComposition', () => {
  it('formats reserve composition totals', () => {
    const rows = [
      { reserveEarnings: 100, recapturedPremium: 50, smartInsuredReserve: 300 },
      { reserveEarnings: 200, recapturedPremium: 150, smartInsuredReserve: 600 },
    ] as ProjectionRow[];

    expect(describeReserveComposition(rows)).toBe(
      'Earnings total: $300; recaptured total: $200; final reserve: $600',
    );
  });

  it('formats empty rows as zero totals', () => {
    expect(describeReserveComposition([])).toBe(
      'Earnings total: $0; recaptured total: $0; final reserve: $0',
    );
  });
});
