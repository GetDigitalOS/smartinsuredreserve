import { ProjectionRow, ProjectionInputs } from './types';
import { computeSummaryStats } from './summary';
import { formatCurrency } from './format';
import { computeReserveMetrics } from './metrics';
import { classifyReserveHealth } from './reserveHealth';

export function deriveInsights(rows: ProjectionRow[], inputs: ProjectionInputs): string[] {
  const stats = computeSummaryStats(rows, inputs);
  
  const finalReserveLine = `Final reserve: ${formatCurrency(stats.finalReserve)}`;
  const totalSavingsLine = `Total savings: ${formatCurrency(stats.totalSavings)}`;
  const breakEvenLine = stats.breakEvenYear !== null
    ? `Break-even year: ${stats.breakEvenYear}`
    : 'Savings do not offset both deductibles';

  return [finalReserveLine, totalSavingsLine, breakEvenLine];
}

export function deriveMetricInsights(rows: ProjectionRow[], inputs: ProjectionInputs): string[] {
  void inputs;
  const metrics = computeReserveMetrics(rows);

  return [
    `Total reserve earnings: ${formatCurrency(metrics.totalReserveEarnings)}`,
    `Peak annual savings: ${formatCurrency(metrics.peakRecapturedPremium)}`,
    `Average annual savings: ${formatCurrency(metrics.averageAnnualSavings)}`,
  ];
}

export function deriveHealthInsight(rows: ProjectionRow[], inputs: ProjectionInputs): string {
  const stats = computeSummaryStats(rows, inputs);

  return `Reserve health: ${classifyReserveHealth(stats.reserveCoverageRatio)}`;
}
