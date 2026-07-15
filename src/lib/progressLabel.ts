import { ProjectionRow } from './types';
import { computeReserveProgress } from './reserveProgress';
import { formatPercent } from './format';

export function describeReserveProgress(rows: ProjectionRow[], target: number): string {
  return `Reserve progress: ${formatPercent(computeReserveProgress(rows, target) * 100)}`;
}
