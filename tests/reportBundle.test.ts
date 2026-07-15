import { buildReportBundleJson } from '../src/lib/reportBundle';
import type { ProjectionInputs, ProjectionRow } from '../src/lib/types';

describe('buildReportBundleJson', () => {
  it('serializes the summary, growth table, and reserve composition', () => {
    const rows = [
      {
        year: 1,
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

    const bundle = JSON.parse(buildReportBundleJson(rows, inputs));

    expect(bundle.summary.health).toBe('strong');
    expect(Array.isArray(bundle.growthTable)).toBe(true);
    expect(bundle.growthTable).toHaveLength(1);
    expect(bundle.composition).toEqual({
      earningsTotal: 50,
      recapturedTotal: 400,
      finalReserve: 12000,
    });
  });
});
