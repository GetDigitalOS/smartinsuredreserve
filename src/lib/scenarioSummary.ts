import type { ProjectionInputs, ProjectionRow } from './types';
import { computeSummaryStats } from './summary';
import { classifyReserveHealth } from './reserveHealth';

export function summarizeScenario(
  rows: ProjectionRow[],
  inputs: ProjectionInputs,
): { finalReserve: number; totalSavings: number; health: 'under' | 'adequate' | 'strong' } {
  const stats = computeSummaryStats(rows, inputs);
  return {
    finalReserve: stats.finalReserve,
    totalSavings: stats.totalSavings,
    health: classifyReserveHealth(stats.reserveCoverageRatio),
  };
}
