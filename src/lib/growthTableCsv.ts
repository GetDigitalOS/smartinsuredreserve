import { buildGrowthTable } from './growthTable';
import { ProjectionRow } from './types';

export function buildGrowthTableCsv(rows: ProjectionRow[]): string {
  return [
    'Year,Reserve,Delta',
    ...buildGrowthTable(rows).map(
      (entry) => `${entry.year},${entry.reserve},${entry.delta}`,
    ),
  ].join('\n');
}
