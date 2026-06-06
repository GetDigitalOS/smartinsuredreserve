import { calculateProjection } from '../src/lib/projection';
import type { ProjectionInputs } from '../src/lib/types';

function baseInputs(overrides: Partial<ProjectionInputs> = {}): ProjectionInputs {
  return {
    autoPremium250: 1000,
    autoPremium500: 800,
    autoPremium1000: 600,
    autoInflation: 0,
    autoCurrentDeductible: 250,

    homePremium500: 2000,
    homePremium1000: 1500,
    homePremium5000: 1000,
    homeInflation: 0,
    homeCurrentDeductible: 500,

    currentReserve: 0,
    reserveReturn: 0,
    reserveContribution: 0,

    years: 1,
    ...overrides,
  };
}

describe('calculateProjection', () => {
  test('year-1 premium computation matches inputs at inflation factor 1', () => {
    const rows = calculateProjection(
      baseInputs({
        autoInflation: 5,
        homeInflation: 10,
        years: 1,
      }),
    );

    expect(rows).toHaveLength(1);
    const row = rows[0];
    // Year-1 inflation factor is (1 + r)^0 = 1, so all premiums are at face value.
    expect(row.currentPremium).toBe(1000 + 2000);
    expect(row.autoPremiums[250]).toBe(1000);
    expect(row.autoPremiums[500]).toBe(800);
    expect(row.homePremiums[500]).toBe(2000);
    // No reserve to fund an upgrade, so proposed matches current.
    expect(row.proposedPremium).toBe(3000);
    expect(row.recapturedPremium).toBe(0);
  });

  test('deductible upgrades when reserve crosses the next tier threshold', () => {
    const rows = calculateProjection(
      baseInputs({
        currentReserve: 500,
        autoCurrentDeductible: 250,
        homeCurrentDeductible: 500,
        years: 1,
      }),
    );

    const row = rows[0];
    // Auto: 500 >= next tier (500), so it upgrades from 250 to 500.
    expect(row.autoDeductible).toBe(500);
    // Home: 500 < next tier (1000), so it stays at 500.
    expect(row.homeDeductible).toBe(500);
    // Proposed reflects the upgraded auto premium.
    expect(row.proposedPremium).toBe(800 + 2000);
    // Recaptured = (1000 + 2000) - (800 + 2000) = 200.
    expect(row.recapturedPremium).toBe(200);
  });

  test('reserve compounds with the configured return rate when no upgrades occur', () => {
    const rows = calculateProjection(
      baseInputs({
        currentReserve: 1000,
        autoCurrentDeductible: 1000, // already at max tier
        homeCurrentDeductible: 5000, // already at max tier
        reserveReturn: 10,
        reserveContribution: 0,
        years: 3,
      }),
    );

    // No upgrades possible -> recaptured = 0 every year -> reserve just compounds at 10%.
    expect(rows[0].beginningReserve).toBe(1000);
    expect(rows[0].reserveEarnings).toBeCloseTo(100, 10);
    expect(rows[0].smartInsuredReserve).toBeCloseTo(1100, 10);

    expect(rows[1].beginningReserve).toBeCloseTo(1100, 10);
    expect(rows[1].smartInsuredReserve).toBeCloseTo(1210, 10);

    expect(rows[2].smartInsuredReserve).toBeCloseTo(1331, 10);
  });

  test('cumulative savings accumulates recaptured premium across years', () => {
    const rows = calculateProjection(
      baseInputs({
        autoPremium250: 1000,
        autoPremium500: 800,
        autoPremium1000: 600,
        homePremium500: 2000,
        homePremium1000: 1500,
        homePremium5000: 1000,
        currentReserve: 500,
        autoCurrentDeductible: 250,
        homeCurrentDeductible: 500,
        reserveReturn: 0,
        reserveContribution: 0,
        years: 3,
      }),
    );

    // Year 1: reserve 500 -> auto upgrades to 500. recaptured = 200. reserve -> 700.
    expect(rows[0].recapturedPremium).toBe(200);
    expect(rows[0].cumulativeSavings).toBe(200);
    expect(rows[0].smartInsuredReserve).toBe(700);

    // Year 2: reserve 700, no further upgrades (next auto=1000, next home=1000). recaptured = 200. reserve -> 900.
    expect(rows[1].recapturedPremium).toBe(200);
    expect(rows[1].cumulativeSavings).toBe(400);
    expect(rows[1].smartInsuredReserve).toBe(900);

    // Year 3: reserve 900, still no upgrade. recaptured = 200. reserve -> 1100.
    expect(rows[2].recapturedPremium).toBe(200);
    expect(rows[2].cumulativeSavings).toBe(600);
    expect(rows[2].smartInsuredReserve).toBe(1100);
  });

  test('zero-reserve start leaves deductibles unchanged and beginningReserve at 0', () => {
    const rows = calculateProjection(
      baseInputs({
        currentReserve: 0,
        autoCurrentDeductible: 250,
        homeCurrentDeductible: 500,
        reserveContribution: 0,
        reserveReturn: 0,
        years: 1,
      }),
    );

    const row = rows[0];
    expect(row.beginningReserve).toBe(0);
    expect(row.autoDeductible).toBe(250);
    expect(row.homeDeductible).toBe(500);
    expect(row.recapturedPremium).toBe(0);
    expect(row.smartInsuredReserve).toBe(0);
    expect(row.cumulativeSavings).toBe(0);
  });

  test('1-year projection edge case returns a single row with year=1', () => {
    const rows = calculateProjection(baseInputs({ years: 1 }));

    expect(rows).toHaveLength(1);
    expect(rows[0].year).toBe(1);
  });
});
