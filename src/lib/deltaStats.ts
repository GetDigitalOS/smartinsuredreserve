import { ProjectionRow } from './types';
import { computeYearlyReserveDeltas } from './yearlyDelta';

export function summarizeYearlyDeltas(
  rows: ProjectionRow[],
): { peak: number; trough: number; average: number } {
  const deltas = computeYearlyReserveDeltas(rows);

  if (deltas.length === 0) {
    return { peak: 0, trough: 0, average: 0 };
  }

  return {
    peak: Math.max(...deltas),
    trough: Math.min(...deltas),
    average: deltas.reduce((a, b) => a + b, 0) / deltas.length,
  };
}
