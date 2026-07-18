import { describeGrowthTotals } from './growthTableTotalsLabel';
import { describeReserveTargetGap } from './reserveTargetGapLabel';
import { ProjectionRow } from './types';

export function describeReserveGapSummary(rows: ProjectionRow[], target: number): string {
  return `${describeReserveTargetGap(rows, target)} | ${describeGrowthTotals(rows)}`;
}
