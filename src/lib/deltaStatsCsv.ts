import { summarizeYearlyDeltas } from './deltaStats';
import { ProjectionRow } from './types';

export function buildDeltaStatsCsv(rows: ProjectionRow[]): string {
  const { peak, trough, average } = summarizeYearlyDeltas(rows);

  return ['Peak,Trough,Average', `${peak},${trough},${average}`].join('\n');
}
