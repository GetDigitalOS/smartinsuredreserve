import { computeReserveComposition } from './reserveComposition';
import { formatCurrency } from './format';
import { ProjectionRow } from './types';

export function describeReserveComposition(rows: ProjectionRow[]): string {
  const comp = computeReserveComposition(rows);
  return `Earnings total: ${formatCurrency(comp.earningsTotal)}; recaptured total: ${formatCurrency(comp.recapturedTotal)}; final reserve: ${formatCurrency(comp.finalReserve)}`;
}
