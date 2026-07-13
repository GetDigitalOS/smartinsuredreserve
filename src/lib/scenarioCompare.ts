import type { ProjectionRow } from './types';

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
