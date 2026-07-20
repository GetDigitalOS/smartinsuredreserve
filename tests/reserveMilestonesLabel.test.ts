import { describeReserveMilestones } from '../src/lib/reserveMilestonesLabel';
import { ProjectionRow } from '../src/lib/types';

describe('describeReserveMilestones', () => {
  it('correctly formats targets from rows', () => {
    const rows = [
      { year: 1, smartInsuredReserve: 100 },
      { year: 2, smartInsuredReserve: 250 },
      { year: 3, smartInsuredReserve: 400 }
    ] as ProjectionRow[];
    
    expect(describeReserveMilestones(rows, [200, 500])).toBe('Target 200: year 2; Target 500: not reached');
  });

  it('returns not reached for empty rows', () => {
    expect(describeReserveMilestones([], [100])).toBe('Target 100: not reached');
  });
});
