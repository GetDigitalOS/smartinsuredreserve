import { buildHtmlReport } from '../src/lib/reportHtml';
import type { ProjectionInputs, ProjectionRow } from '../src/lib/types';

describe('buildHtmlReport', () => {
  it('returns a report title, health, and insight list', () => {
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

    const report = buildHtmlReport(rows, inputs);

    expect(report.startsWith('<h1>Reserve Report')).toBe(true);
    expect(report).toContain('Health: strong');
    expect(report).toContain('<li>');
  });
});
