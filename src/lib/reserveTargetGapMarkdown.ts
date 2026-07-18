import { computeReserveTargetGap } from "./reserveTargetGap";
import { ProjectionRow } from "./types";

export function buildReserveTargetGapMarkdown(
  rows: ProjectionRow[],
  target: number
): string {
  const gap = computeReserveTargetGap(rows, target);

  return ["| Reserve Gap |", "| --- |", `| ${gap} |`].join("\n");
}
