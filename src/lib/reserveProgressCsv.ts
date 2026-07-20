import { computeReserveProgress } from './reserveProgress';
import { ProjectionRow } from './types';

export function buildReserveProgressCsv(rows: ProjectionRow[], target: number): string {
  return ['Reserve Progress', String(computeReserveProgress(rows, target))].join('\n');
}
