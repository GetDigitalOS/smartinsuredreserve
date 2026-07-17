import { classifyDeltaTrend } from './deltaTrend';
import { ProjectionRow } from './types';

export function describeDeltaTrend(rows: ProjectionRow[]): string {
  return `Reserve trend: ${classifyDeltaTrend(rows)}`;
}
