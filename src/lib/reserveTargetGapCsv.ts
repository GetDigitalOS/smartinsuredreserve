import { computeReserveTargetGap } from "./reserveTargetGap";
import { ProjectionRow } from "./types";

export function buildReserveTargetGapCsv(
  rows: ProjectionRow[],
  target: number
): string {
  return ["Reserve Gap", String(computeReserveTargetGap(rows, target))].join("\n");
}
