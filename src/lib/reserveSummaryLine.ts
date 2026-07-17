import { describeDeltaTrend } from './deltaTrendLabel';
import { describeReserveProgress } from './progressLabel';
import { ProjectionRow } from './types';

export function describeReserveSummary(rows: ProjectionRow[], target: number): string {
  return `${describeReserveProgress(rows, target)} | ${describeDeltaTrend(rows)}`;
}
