import { buildReserveTargetGapMarkdown } from "../src/lib/reserveTargetGapMarkdown";
import { ProjectionRow } from "../src/lib/types";

describe("buildReserveTargetGapMarkdown", () => {
  it("builds markdown for the final reserve gap", () => {
    const rows = [
      { smartInsuredReserve: 100 },
      { smartInsuredReserve: 250 },
      { smartInsuredReserve: 400 },
    ] as ProjectionRow[];

    expect(buildReserveTargetGapMarkdown(rows, 800).split("\n")).toEqual([
      "| Reserve Gap |",
      "| --- |",
      "| 400 |",
    ]);
  });

  it("builds markdown for an empty projection", () => {
    expect(buildReserveTargetGapMarkdown([], 1000).split("\n")).toEqual([
      "| Reserve Gap |",
      "| --- |",
      "| 1000 |",
    ]);
  });
});
