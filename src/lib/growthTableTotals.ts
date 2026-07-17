import { buildGrowthTable } from './growthTable';
import { ProjectionRow } from './types';

export function summarizeGrowthTable(
  rows: ProjectionRow[],
): { years: number; totalDelta: number; finalReserve: number } {
  const entries = buildGrowthTable(rows);

  return {
    years: entries.length,
    totalDelta: entries.reduce((total, entry) => total + entry.delta, 0),
    finalReserve: entries.length > 0 ? entries[entries.length - 1].reserve : 0,
  };
}
