import { computeReserveProgress } from '../src/lib/reserveProgress';
import { ProjectionRow } from '../src/lib/types';

describe('computeReserveProgress', () => {
  it('returns 0.5 when last row smartInsuredReserve is half of target', () => {
    const rows = [{ smartInsuredReserve: 5000 }] as ProjectionRow[];
    expect(computeReserveProgress(rows, 10000)).toBe(0.5);
  });

  it('caps at 1 when smartInsuredReserve exceeds target', () => {
    const rows = [{ smartInsuredReserve: 20000 }] as ProjectionRow[];
    expect(computeReserveProgress(rows, 10000)).toBe(1);
  });

  it('returns 0 when target is 0', () => {
    const rows = [{ smartInsuredReserve: 5000 }] as ProjectionRow[];
    expect(computeReserveProgress(rows, 0)).toBe(0);
  });

  it('returns 0 when rows is empty', () => {
    expect(computeReserveProgress([], 10000)).toBe(0);
  });
});
