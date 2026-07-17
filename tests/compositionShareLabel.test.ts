import { describeCompositionShare } from '../src/lib/compositionShareLabel';
import { ProjectionRow } from '../src/lib/types';

describe('describeCompositionShare', () => {
  it('formats earnings and recaptured shares', () => {
    const rows = [
      { reserveEarnings: 30, recapturedPremium: 10, smartInsuredReserve: 0 },
    ] as ProjectionRow[];

    expect(describeCompositionShare(rows)).toBe(
      'Earnings share: 75.0%; recaptured share: 25.0%',
    );
  });

  it('formats empty rows as zero shares', () => {
    expect(describeCompositionShare([])).toBe(
      'Earnings share: 0.0%; recaptured share: 0.0%',
    );
  });
});
