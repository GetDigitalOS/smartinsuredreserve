import { describeReserveCompositionSummary } from '../src/lib/reserveCompositionSummaryLine';
import { ProjectionRow } from '../src/lib/types';

describe('describeReserveCompositionSummary', () => {
  it('formats summary correctly for populated rows', () => {
    const rows = [
      { reserveEarnings: 100, recapturedPremium: 50, smartInsuredReserve: 300 },
      { reserveEarnings: 200, recapturedPremium: 150, smartInsuredReserve: 600 }
    ] as ProjectionRow[];
    expect(describeReserveCompositionSummary(rows)).toEqual('Earnings total: $300; recaptured total: $200; final reserve: $600 | Earnings share: 60.0%; recaptured share: 40.0%');
  });

  it('formats summary correctly for empty rows', () => {
    expect(describeReserveCompositionSummary([])).toEqual('Earnings total: $0; recaptured total: $0; final reserve: $0 | Earnings share: 0.0%; recaptured share: 0.0%');
  });
});
