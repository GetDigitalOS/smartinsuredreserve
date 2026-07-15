import { ProjectionRow } from './types';
import { summarizeYearlyDeltas } from './deltaStats';
import { formatCurrency } from './format';

export function describeYearlyDeltas(rows: ProjectionRow[]): string {
  const stats = summarizeYearlyDeltas(rows);

  return `Peak delta: ${formatCurrency(stats.peak)}; trough delta: ${formatCurrency(stats.trough)}; average delta: ${formatCurrency(stats.average)}`;
}
