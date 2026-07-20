import { findReserveMilestones } from './reserveMilestones';
import { ProjectionRow } from './types';

export function buildReserveMilestonesCsv(
  rows: ProjectionRow[],
  targets: number[],
): string {
  const hits = findReserveMilestones(rows, targets);

  return [
    'Target,Year',
    ...targets.map((target) => `${target},${hits[target] ?? 'not reached'}`),
  ].join('\n');
}
