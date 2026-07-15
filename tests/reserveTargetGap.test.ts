import { computeReserveTargetGap } from "../src/lib/reserveTargetGap";
import { ProjectionRow } from "../src/lib/types";

describe("computeReserveTargetGap", () => {
  it("returns the remaining amount needed to reach the target", () => {
    const rows = [{ smartInsuredReserve: 6000 }] as ProjectionRow[];

    expect(computeReserveTargetGap(rows, 10000)).toBe(4000);
  });

  it("returns zero when the final reserve exceeds the target", () => {
    const rows = [{ smartInsuredReserve: 12000 }] as ProjectionRow[];

    expect(computeReserveTargetGap(rows, 10000)).toBe(0);
  });

  it("uses zero as the final reserve when no rows exist", () => {
    expect(computeReserveTargetGap([], 10000)).toBe(10000);
  });
});
