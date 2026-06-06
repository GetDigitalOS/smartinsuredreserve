import { validateProjectionInputs } from '../src/lib/validation';
import type { ProjectionInputs } from '../src/lib/types';

function baseInputs(overrides: Partial<ProjectionInputs> = {}): ProjectionInputs {
  return {
    autoPremium250: 1900,
    autoPremium500: 1473,
    autoPremium1000: 1140,
    autoInflation: 3.0,
    autoCurrentDeductible: 250,

    homePremium500: 2400,
    homePremium1000: 1860,
    homePremium5000: 1440,
    homeInflation: 22.5,
    homeCurrentDeductible: 500,

    currentReserve: 0,
    reserveReturn: 4.5,
    reserveContribution: 0,

    years: 30,
    ...overrides,
  };
}

describe('validateProjectionInputs', () => {
  test('all-valid inputs pass with no errors', () => {
    const result = validateProjectionInputs(baseInputs());
    expect(result.valid).toBe(true);
    expect(result.errors).toEqual({});
  });

  test('negative premium fails', () => {
    const result = validateProjectionInputs(baseInputs({ autoPremium250: -100 }));
    expect(result.valid).toBe(false);
    expect(result.errors.autoPremium250).toBeDefined();
  });

  test('inflation > 100 fails', () => {
    const result = validateProjectionInputs(baseInputs({ autoInflation: 150 }));
    expect(result.valid).toBe(false);
    expect(result.errors.autoInflation).toBeDefined();
  });

  test('years = 0 fails', () => {
    const result = validateProjectionInputs(baseInputs({ years: 0 }));
    expect(result.valid).toBe(false);
    expect(result.errors.years).toBeDefined();
  });

  test('years = 51 fails', () => {
    const result = validateProjectionInputs(baseInputs({ years: 51 }));
    expect(result.valid).toBe(false);
    expect(result.errors.years).toBeDefined();
  });
});
