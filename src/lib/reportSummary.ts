import { deriveInsights } from './insights';
import { computeReserveMetrics } from './metrics';
import { classifyReserveHealth } from './reserveHealth';
import { computeSummaryStats } from './summary';
import type { ProjectionInputs, ProjectionRow } from './types';

export function buildReportSummary(
  rows: ProjectionRow[],
  inputs: ProjectionInputs,
): {
  metrics: {
    totalReserveEarnings: number;
    peakRecapturedPremium: number;
    averageAnnualSavings: number;
  };
  health: 'under' | 'adequate' | 'strong';
  insights: string[];
} {
  return {
    metrics: computeReserveMetrics(rows),
    health: classifyReserveHealth(computeSummaryStats(rows, inputs).reserveCoverageRatio),
    insights: deriveInsights(rows, inputs),
  };
}
