import { buildReportSummary } from './reportSummary';
import type { ProjectionInputs, ProjectionRow } from './types';

export function buildPlainTextReport(
  rows: ProjectionRow[],
  inputs: ProjectionInputs,
): string {
  const summary = buildReportSummary(rows, inputs);

  return ['Reserve Report', `Health: ${summary.health}`, ...summary.insights].join('\n');
}
