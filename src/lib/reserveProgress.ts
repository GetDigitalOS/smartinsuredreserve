import { ProjectionRow } from './types';

export function computeReserveProgress(rows: ProjectionRow[], target: number): number {
  if (target <= 0 || rows.length === 0) return 0;
  return Math.min(1, rows[rows.length - 1].smartInsuredReserve / target);
}
