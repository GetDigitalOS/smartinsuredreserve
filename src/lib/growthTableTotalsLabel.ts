import { summarizeGrowthTable } from './growthTableTotals';
import { formatCurrency } from './format';
import { ProjectionRow } from './types';

export function describeGrowthTotals(rows: ProjectionRow[]): string {
  const totals = summarizeGrowthTable(rows);

  return `Years: ${totals.years}; total delta: ${formatCurrency(totals.totalDelta)}; final reserve: ${formatCurrency(totals.finalReserve)}`;
}
