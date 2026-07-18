import { ProjectionRow } from "./types";
import { computeReserveTargetGap } from "./reserveTargetGap";
import { formatCurrency } from "./format";

export function describeReserveTargetGap(
  rows: ProjectionRow[],
  target: number
): string {
  return `Reserve gap: ${formatCurrency(computeReserveTargetGap(rows, target))}`;
}
