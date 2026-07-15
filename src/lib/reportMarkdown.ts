import { buildReportSummary } from './reportSummary';
import type { ProjectionInputs, ProjectionRow } from './types';

export function buildMarkdownReport(
  rows: ProjectionRow[],
  inputs: ProjectionInputs,
): string {
  const summary = buildReportSummary(rows, inputs);

  return [
    '# Reserve Report',
    '',
    `- Health: ${summary.health}`,
    ...summary.insights.map((insight) => `- ${insight}`),
  ].join('\n');
}
