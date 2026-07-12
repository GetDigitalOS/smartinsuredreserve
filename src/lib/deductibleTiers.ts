export const AUTO_DEDUCTIBLE_TIERS = [250, 500, 1000];
export const HOME_DEDUCTIBLE_TIERS = [500, 1000, 5000];

export function nextEligibleTier(current: number, reserve: number, tiers: number[]): number {
  const idx = tiers.indexOf(current);
  if (idx === -1 || idx === tiers.length - 1) return current;
  const next = tiers[idx + 1];
  return reserve >= next ? next : current;
}
