import { findReserveMilestones } from '../src/lib/reserveMilestones';
import { ProjectionRow } from '../src/lib/types';

describe('findReserveMilestones', () => {
  it('maps targets to the first year that reaches them', () => {
    const rows = [
      { year: 1, smartInsuredReserve: 500 },
      { year: 2, smartInsuredReserve: 1500 },
      { year: 3, smartInsuredReserve: 3000 },
    ] as ProjectionRow[];

    expect(findReserveMilestones(rows, [1000, 5000])).toEqual({
      1000: 2,
      5000: null,
    });
  });
});
