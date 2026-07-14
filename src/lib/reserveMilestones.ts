import { ProjectionRow } from './types';

export function findReserveMilestones(
  rows: ProjectionRow[],
  targets: number[],
): Record<number, number | null> {
  return Object.fromEntries(
    targets.map((target) => [
      target,
      rows.find((row) => row.smartInsuredReserve >= target)?.year ?? null,
    ]),
  );
}
