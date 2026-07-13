import { buildDetailedProjectionCsv } from '../src/lib/csv';
import type { ProjectionRow } from '../src/lib/types';

function projectionRow(overrides: Partial<ProjectionRow> = {}): ProjectionRow {
  return {
    year: 1,
    autoDeductible: 250,
    homeDeductible: 500,
    autoPremiums: {},
    homePremiums: {},
    autoCurrentPremium: 1200,
    homeCurrentPremium: 1800,
    proposedPremium: 3000,
    currentPremium: 3500,
    recapturedPremium: 500,
    beginningReserve: 1000,
    reserveEarnings: 25,
    smartInsuredReserve: 1500,
    cumulativeSavings: 500,
    ...overrides,
  };
}

describe('buildDetailedProjectionCsv', () => {
  const header =
    'Year,Auto Deductible,Home Deductible,Auto Premium,Home Premium,Proposed Premium,Current Premium,Recaptured Premium,Beginning Reserve,Reserve Earnings,Reserve Balance,Cumulative Savings';

  test('starts with the exact detailed header line', () => {
    expect(buildDetailedProjectionCsv([projectionRow()]).split('\n')[0]).toBe(header);
  });

  test('empty rows produce only the header line', () => {
    expect(buildDetailedProjectionCsv([])).toBe(header);
  });

  test('two rows produce exactly three lines', () => {
    expect(
      buildDetailedProjectionCsv([projectionRow({ year: 1 }), projectionRow({ year: 2 })]).split(
        '\n',
      ),
    ).toHaveLength(3);
  });
});
