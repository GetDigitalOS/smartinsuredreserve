import { buildGrowthTable } from './growthTable';
import { ProjectionRow } from './types';

export function buildGrowthTableMarkdown(rows: ProjectionRow[]): string {
  const lines = ['| Year | Reserve | Delta |', '| --- | --- | --- |'];

  for (const entry of buildGrowthTable(rows)) {
    lines.push(`| ${entry.year} | ${entry.reserve} | ${entry.delta} |`);
  }

  return lines.join('\n');
}
