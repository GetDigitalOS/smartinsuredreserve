import { applyInflation, computePremiumSavings, compoundReserve } from '../src/lib/calculator';

describe('applyInflation', () => {
  test('compounds a base value at a positive rate over multiple years', () => {
    expect(applyInflation(1000, 5, 2)).toBeCloseTo(1102.5, 5);
  });

  test('returns the base value when year is 0', () => {
    expect(applyInflation(1000, 5, 0)).toBe(1000);
  });

  test('returns the base value when rate is 0', () => {
    expect(applyInflation(1000, 0, 10)).toBe(1000);
  });
});

describe('computePremiumSavings', () => {
  test('returns the positive difference when proposed is lower than current', () => {
    expect(computePremiumSavings(1200, 900)).toBe(300);
  });

  test('returns zero when current equals proposed', () => {
    expect(computePremiumSavings(1000, 1000)).toBe(0);
  });

  test('returns a negative number when proposed exceeds current', () => {
    expect(computePremiumSavings(800, 1000)).toBe(-200);
  });
});

describe('compoundReserve', () => {
  test('grows the balance by the return rate and adds the contribution', () => {
    expect(compoundReserve(1000, 200, 5)).toBeCloseTo(1250, 5);
  });

  test('returns just the contribution when starting balance is zero', () => {
    expect(compoundReserve(0, 500, 5)).toBe(500);
  });

  test('returns balance + contribution when return rate is zero', () => {
    expect(compoundReserve(1000, 200, 0)).toBe(1200);
  });
});
