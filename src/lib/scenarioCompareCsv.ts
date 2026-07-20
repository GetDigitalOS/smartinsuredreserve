import type { ProjectionRow } from './types';
import { compareProjections } from './scenarioCompare';

export function buildScenarioCompareCsv(
  base: ProjectionRow[],
  alt: ProjectionRow[]
): string {
  const { finalReserveDelta, totalSavingsDelta } = compareProjections(base, alt);

  return [
    'Final Reserve Delta,Total Savings Delta',
    `${finalReserveDelta},${totalSavingsDelta}`,
  ].join('\n');
}
