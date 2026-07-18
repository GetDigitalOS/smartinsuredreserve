import { buildReserveTargetGapCsv } from "../src/lib/reserveTargetGapCsv";
import { ProjectionRow } from "../src/lib/types";

describe("buildReserveTargetGapCsv", () => {
  it("returns the gap for the final reserve", () => {
    const rows = [
      { smartInsuredReserve: 100 },
      { smartInsuredReserve: 250 },
      { smartInsuredReserve: 400 },
    ] as ProjectionRow[];

    expect(buildReserveTargetGapCsv(rows, 800).split("\n")).toEqual([
      "Reserve Gap",
      "400",
    ]);
  });

  it("returns the full target when there are no rows", () => {
    expect(buildReserveTargetGapCsv([], 1000).split("\n")).toEqual([
      "Reserve Gap",
      "1000",
    ]);
  });
});
