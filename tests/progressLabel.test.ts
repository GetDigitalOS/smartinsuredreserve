import { describeReserveProgress } from '../src/lib/progressLabel';
import { ProjectionRow } from '../src/lib/types';

describe('describeReserveProgress', () => {
  it('formats progress toward a positive target', () => {
    expect(describeReserveProgress([{ smartInsuredReserve: 5000 } as ProjectionRow], 10000)).toBe(
      'Reserve progress: 50.0%',
    );
  });

  it('returns zero progress for a zero target', () => {
    expect(describeReserveProgress([{ smartInsuredReserve: 5000 } as ProjectionRow], 0)).toBe(
      'Reserve progress: 0.0%',
    );
  });

  it('returns zero progress for empty rows', () => {
    expect(describeReserveProgress([], 10000)).toBe('Reserve progress: 0.0%');
  });
});
