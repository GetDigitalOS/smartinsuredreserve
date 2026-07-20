import { ProjectionRow } from './types';
import { findReserveMilestones } from './reserveMilestones';

export function buildReserveMilestonesMarkdown(rows: ProjectionRow[], targets: number[]): string {
  const hits = findReserveMilestones(rows, targets);
  const lines: string[] = [
    '| Target | Year |',
    '| --- | --- |'
  ];
  
  for (const target of targets) {
    const hit = hits[target];
    const yearStr = hit !== null ? hit.toString() : 'not reached';
    lines.push(`| ${target} | ${yearStr} |`);
  }
  
  return lines.join('\n');
}
