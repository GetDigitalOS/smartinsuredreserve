import { ProjectionRow } from './types';
import { summarizeYearlyDeltas } from './deltaStats';

export function classifyDeltaTrend(rows: ProjectionRow[]): 'rising' | 'flat' | 'falling' {
  const { average } = summarizeYearlyDeltas(rows);
  if (average > 0) return 'rising';
  if (average < 0) return 'falling';
  return 'flat';
}
