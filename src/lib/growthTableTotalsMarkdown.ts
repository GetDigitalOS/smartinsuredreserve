import { summarizeGrowthTable } from './growthTableTotals';
import { ProjectionRow } from './types';

export function buildGrowthTotalsMarkdown(rows: ProjectionRow[]): string {
  const totals = summarizeGrowthTable(rows);

  return [
    '| Years | Total Delta | Final Reserve |',
    '| --- | --- | --- |',
    `| ${totals.years} | ${totals.totalDelta} | ${totals.finalReserve} |`,
  ].join('\n');
}
