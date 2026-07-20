import { classifyDeltaTrend } from './deltaTrend';
import { ProjectionRow } from './types';

export function buildDeltaTrendMarkdown(rows: ProjectionRow[]): string {
  return ['| Reserve Trend |', '| --- |', `| ${classifyDeltaTrend(rows)} |`].join('\n');
}
