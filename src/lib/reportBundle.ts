import { buildGrowthTable } from './growthTable';
import { computeReserveComposition } from './reserveComposition';
import { buildReportSummary } from './reportSummary';
import type { ProjectionInputs, ProjectionRow } from './types';

export function buildReportBundleJson(
  rows: ProjectionRow[],
  inputs: ProjectionInputs,
): string {
  return JSON.stringify({
    summary: buildReportSummary(rows, inputs),
    growthTable: buildGrowthTable(rows),
    composition: computeReserveComposition(rows),
  });
}
