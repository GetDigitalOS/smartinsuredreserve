import { buildPlainTextReport } from '../src/lib/reportText';
import type { ProjectionInputs, ProjectionRow } from '../src/lib/types';

describe('buildPlainTextReport', () => {
  it('returns a report title, health, and insights', () => {
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

    const lines = buildPlainTextReport(rows, inputs).split('\n');

    expect(lines[0]).toBe('Reserve Report');
    expect(lines[1]).toContain('strong');
    expect(lines.length).toBeGreaterThanOrEqual(5);
  });
});
