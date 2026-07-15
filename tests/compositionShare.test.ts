import { computeCompositionShare } from '../src/lib/compositionShare';
import { ProjectionRow } from '../src/lib/types';

describe('computeCompositionShare', () => {
  it('returns the earnings and recaptured shares', () => {
    const rows = [
      { reserveEarnings: 30, recapturedPremium: 10, smartInsuredReserve: 0 } as ProjectionRow,
    ];

    expect(computeCompositionShare(rows)).toEqual({
      earningsShare: 0.75,
      recapturedShare: 0.25,
    });
  });

  it('returns zero shares for empty rows', () => {
    expect(computeCompositionShare([])).toEqual({ earningsShare: 0, recapturedShare: 0 });
  });
});
