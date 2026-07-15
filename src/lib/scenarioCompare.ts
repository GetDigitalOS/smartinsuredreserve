import type { ProjectionRow } from './types';
import { formatCurrency } from './format';

export function compareProjections(
  base: ProjectionRow[],
  alt: ProjectionRow[]
): { finalReserveDelta: number; totalSavingsDelta: number } {
  const baseFinal = base[base.length - 1];
  const altFinal = alt[alt.length - 1];

  return {
    finalReserveDelta:
      (altFinal?.smartInsuredReserve ?? 0) -
      (baseFinal?.smartInsuredReserve ?? 0),
    totalSavingsDelta:
      (altFinal?.cumulativeSavings ?? 0) - (baseFinal?.cumulativeSavings ?? 0),
  };
}

export function describeComparison(
  base: ProjectionRow[],
  alt: ProjectionRow[]
): string {
  const delta = compareProjections(base, alt);

  return `Final reserve delta: ${formatCurrency(
    delta.finalReserveDelta
  )}; total savings delta: ${formatCurrency(delta.totalSavingsDelta)}`;
}
