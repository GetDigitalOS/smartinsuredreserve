import { nextEligibleTier, AUTO_DEDUCTIBLE_TIERS, HOME_DEDUCTIBLE_TIERS } from '../src/lib/deductibleTiers';

describe('nextEligibleTier', () => {
  it('returns next tier when reserve meets it', () => {
    expect(nextEligibleTier(250, 500, AUTO_DEDUCTIBLE_TIERS)).toBe(500);
  });

  it('returns current when reserve is below next tier', () => {
    expect(nextEligibleTier(250, 499, AUTO_DEDUCTIBLE_TIERS)).toBe(250);
  });

  it('returns current when already at top tier', () => {
    expect(nextEligibleTier(1000, 1000000, AUTO_DEDUCTIBLE_TIERS)).toBe(1000);
  });

  it('works with HOME_DEDUCTIBLE_TIERS', () => {
    expect(nextEligibleTier(500, 1000, HOME_DEDUCTIBLE_TIERS)).toBe(1000);
  });
});
