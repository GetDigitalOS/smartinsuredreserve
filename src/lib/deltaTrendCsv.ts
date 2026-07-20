import { classifyDeltaTrend } from './deltaTrend';
import { ProjectionRow } from './types';

export function buildDeltaTrendCsv(rows: ProjectionRow[]): string {
  return ['Reserve Trend', classifyDeltaTrend(rows)].join('\n');
}
