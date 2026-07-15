import { ProjectionRow, ProjectionInputs } from './types';
import { computeSummaryStats } from './summary';
import { formatCurrency, formatPercent } from './format';
import { computeReserveCagr } from './growth';
import { computeReserveMetrics } from './metrics';
import { classifyReserveHealth } from './reserveHealth';
import { findReserveMilestones } from './reserveMilestones';
import { computeReserveComposition } from './reserveComposition';

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

export function deriveMilestoneInsights(rows: ProjectionRow[], targets: number[]): string[] {
  const milestones = findReserveMilestones(rows, targets);

  return targets.map((target) => {
    const year = milestones[target];

    return year !== null
      ? `${formatCurrency(target)} reached in year ${year}`
      : `${formatCurrency(target)} not reached`;
  });
}

export function deriveGrowthInsight(rows: ProjectionRow[]): string {
  return `Reserve CAGR: ${formatPercent(computeReserveCagr(rows) * 100)}`;
}

export function deriveCompositionInsight(rows: ProjectionRow[]): string {
  const comp = computeReserveComposition(rows);

  return `Reserve earnings: ${formatCurrency(comp.earningsTotal)}; recaptured premium: ${formatCurrency(comp.recapturedTotal)}`;
}
