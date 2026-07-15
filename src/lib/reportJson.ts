import { buildReportSummary } from './reportSummary';
import type { ProjectionInputs, ProjectionRow } from './types';

export function buildReportJson(
  rows: ProjectionRow[],
  inputs: ProjectionInputs,
): string {
  return JSON.stringify(buildReportSummary(rows, inputs));
}
