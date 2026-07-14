import { buildReportSummary } from '../src/lib/reportSummary';
import type { ProjectionInputs, ProjectionRow } from '../src/lib/types';

describe('buildReportSummary', () => {
  it('composes report metrics, health, and insights', () => {
    const rows = [
      {
        smartInsuredReserve: 12000,
        cumulativeSavings: 400,
        reserveEarnings: 50,
        recapturedPremium: 400,
      } as ProjectionRow,
    ];
    const inputs = {
      autoCurrentDeductible: 500,
      homeCurrentDeductible: 1000,
    } as ProjectionInputs;

    const result = buildReportSummary(rows, inputs);

    expect(result.metrics.totalReserveEarnings).toBe(50);
    expect(result.health).toBe('strong');
    expect(Array.isArray(result.insights)).toBe(true);
    expect(result.insights.length).toBeGreaterThanOrEqual(3);
  });
});
