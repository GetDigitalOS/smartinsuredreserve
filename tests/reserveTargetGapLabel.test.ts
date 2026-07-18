import { describeReserveTargetGap } from "../src/lib/reserveTargetGapLabel";
import { ProjectionRow } from "../src/lib/types";

describe("describeReserveTargetGap", () => {
  const rows = [
    { smartInsuredReserve: 100 },
    { smartInsuredReserve: 250 },
    { smartInsuredReserve: 400 },
  ] as ProjectionRow[];

  it("describes a positive reserve gap", () => {
    expect(describeReserveTargetGap(rows, 800)).toBe("Reserve gap: $400");
  });

  it("describes no reserve gap when the target is met", () => {
    expect(describeReserveTargetGap(rows, 400)).toBe("Reserve gap: $0");
  });

  it("describes the target gap for empty rows", () => {
    expect(describeReserveTargetGap([], 10000)).toBe("Reserve gap: $10,000");
  });
});
