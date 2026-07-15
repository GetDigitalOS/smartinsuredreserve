import { buildReportSummary } from './reportSummary';
import type { ProjectionInputs, ProjectionRow } from './types';

export function buildHtmlReport(
  rows: ProjectionRow[],
  inputs: ProjectionInputs,
): string {
  const summary = buildReportSummary(rows, inputs);

  return `<h1>Reserve Report</h1><p>Health: ${summary.health}</p><ul>${summary.insights
    .map((insight) => `<li>${insight}</li>`)
    .join('')}</ul>`;
}
