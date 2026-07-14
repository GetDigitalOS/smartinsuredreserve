import { ProjectionRow } from './types';

export function computeReserveMetrics(rows: ProjectionRow[]): { totalReserveEarnings: number; peakRecapturedPremium: number; averageAnnualSavings: number } {
  if (rows.length === 0) {
    return { totalReserveEarnings: 0, peakRecapturedPremium: 0, averageAnnualSavings: 0 };
  }
  
  let totalReserveEarnings = 0;
  let peakRecapturedPremium = 0;
  
  for (const row of rows) {
    totalReserveEarnings += row.reserveEarnings;
    if (row.recapturedPremium > peakRecapturedPremium) {
      peakRecapturedPremium = row.recapturedPremium;
    }
  }
  
  const averageAnnualSavings = rows[rows.length - 1].cumulativeSavings / rows.length;
  
  return { totalReserveEarnings, peakRecapturedPremium, averageAnnualSavings };
}
