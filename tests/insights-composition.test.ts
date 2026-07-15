import { deriveCompositionInsight } from '../src/lib/insights';
import { ProjectionRow } from '../src/lib/types';

describe('deriveCompositionInsight', () => {
  it('formats reserve earnings and recaptured premium', () => {
    const rows = [
      { reserveEarnings: 30, recapturedPremium: 10, smartInsuredReserve: 0 },
    ] as ProjectionRow[];

    expect(deriveCompositionInsight(rows)).toBe(
      'Reserve earnings: $30; recaptured premium: $10',
    );
  });

  it('returns zero totals for empty rows', () => {
    expect(deriveCompositionInsight([])).toBe(
      'Reserve earnings: $0; recaptured premium: $0',
    );
  });
});
