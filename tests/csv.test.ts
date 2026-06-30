import { buildProjectionCsv } from '../src/lib/csv';
import type { ProjectionRow } from '../src/lib/types';

function projectionRow(overrides: Partial<ProjectionRow> = {}): ProjectionRow {
  return {
    year: 1,
    autoDeductible: 250,
    homeDeductible: 500,
    autoPremiums: {},
    homePremiums: {},
    autoCurrentPremium: 0,
    homeCurrentPremium: 0,
    proposedPremium: 3000,
    currentPremium: 3500,
    recapturedPremium: 500,
    beginningReserve: 0,
    reserveEarnings: 0,
    smartInsuredReserve: 1500,
    cumulativeSavings: 500,
    ...overrides,
  };
}

describe('buildProjectionCsv', () => {
  const header =
    'Year,Auto Deductible,Home Deductible,Proposed Premium,Current Premium,Recaptured Premium,Reserve Balance,Cumulative Savings';

  test('starts with the exact header line', () => {
    const csv = buildProjectionCsv([projectionRow()]);

    expect(csv.split('\n')[0]).toBe(header);
  });

  test('empty rows produce only the header line', () => {
    expect(buildProjectionCsv([])).toBe(header);
  });

  test('two rows produce exactly three lines', () => {
    const csv = buildProjectionCsv([projectionRow({ year: 1 }), projectionRow({ year: 2 })]);

    expect(csv.split('\n')).toHaveLength(3);
  });

  test('serializes known row values as raw comma-joined numbers', () => {
    const csv = buildProjectionCsv([
      projectionRow({
        year: 7,
        autoDeductible: 1000,
        homeDeductible: 5000,
        proposedPremium: 4200,
        currentPremium: 5100,
        recapturedPremium: 900,
        smartInsuredReserve: 12000,
        cumulativeSavings: 3600,
      }),
    ]);

    expect(csv.split('\n')[1]).toBe('7,1000,5000,4200,5100,900,12000,3600');
  });
});
