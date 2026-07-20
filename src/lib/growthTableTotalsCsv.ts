import { ProjectionRow } from './types';
import { summarizeGrowthTable } from './growthTableTotals';

export function buildGrowthTotalsCsv(rows: ProjectionRow[]): string {
  const { years, totalDelta, finalReserve } = summarizeGrowthTable(rows);
  return `Years,Total Delta,Final Reserve\n${years},${totalDelta},${finalReserve}`;
}
