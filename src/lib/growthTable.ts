import { ProjectionRow } from './types';
import { computeYearlyReserveDeltas } from './yearlyDelta';

export function buildGrowthTable(
  rows: ProjectionRow[],
): { year: number; reserve: number; delta: number }[] {
  const deltas = computeYearlyReserveDeltas(rows);

  return rows.map((row, index) => ({
    year: row.year,
    reserve: row.smartInsuredReserve,
    delta: index === 0 ? 0 : deltas[index - 1],
  }));
}
