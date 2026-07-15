import { buildMarkdownReport } from '../src/lib/reportMarkdown';
import type { ProjectionInputs, ProjectionRow } from '../src/lib/types';

describe('buildMarkdownReport', () => {
  it('includes the report heading and health', () => {
    const report = buildMarkdownReport(
      [
        {
          smartInsuredReserve: 12000,
          cumulativeSavings: 400,
          reserveEarnings: 50,
          recapturedPremium: 400,
        } as ProjectionRow,
      ],
      {
        autoCurrentDeductible: 500,
        homeCurrentDeductible: 1000,
      } as ProjectionInputs,
    );

    expect(report.startsWith('# Reserve Report')).toBe(true);
    expect(report).toContain('- Health: strong');
  });
});
