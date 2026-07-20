import { buildReserveMilestonesCsv } from '../src/lib/reserveMilestonesCsv';
import { ProjectionRow } from '../src/lib/types';

describe('buildReserveMilestonesCsv', () => {
  it('builds CSV rows for reached and unreached targets', () => {
    const rows = [
      { year: 1, smartInsuredReserve: 100 },
      { year: 2, smartInsuredReserve: 250 },
      { year: 3, smartInsuredReserve: 400 },
    ] as ProjectionRow[];

    expect(buildReserveMilestonesCsv(rows, [200, 500]).split('\n')).toEqual([
      'Target,Year',
      '200,2',
      '500,not reached',
    ]);
  });

  it('reports unreached targets for empty rows', () => {
    expect(buildReserveMilestonesCsv([], [100]).split('\n')).toEqual([
      'Target,Year',
      '100,not reached',
    ]);
  });
});
