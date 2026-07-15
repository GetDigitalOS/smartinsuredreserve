import { buildReportJson } from '../src/lib/reportJson';
import { buildReportSummary } from '../src/lib/reportSummary';
import type { ProjectionInputs, ProjectionRow } from '../src/lib/types';

describe('buildReportJson', () => {
  it('serializes the report summary', () => {
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

    const result = JSON.parse(buildReportJson(rows, inputs));

    expect(result.health).toBe('strong');
    expect(Array.isArray(result.insights)).toBe(true);
    expect(result).toEqual(buildReportSummary(rows, inputs));
  });
});
