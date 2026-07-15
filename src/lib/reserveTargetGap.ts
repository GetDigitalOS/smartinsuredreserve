import { ProjectionRow } from "./types";

export function computeReserveTargetGap(
  rows: ProjectionRow[],
  target: number
): number {
  const finalReserve =
    rows.length === 0 ? 0 : rows[rows.length - 1].smartInsuredReserve;

  return Math.max(0, target - finalReserve);
}
