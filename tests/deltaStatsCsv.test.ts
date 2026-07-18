import { buildDeltaStatsCsv } from '../src/lib/deltaStatsCsv';
import { ProjectionRow } from '../src/lib/types';

describe('buildDeltaStatsCsv', () => {
  it('exports summary values for yearly reserve deltas', () => {
    const rows = [
      { smartInsuredReserve: 100 },
      { smartInsuredReserve: 250 },
      { smartInsuredReserve: 400 },
    ] as ProjectionRow[];

    expect(buildDeltaStatsCsv(rows).split('\n')).toEqual([
      'Peak,Trough,Average',
      '150,150,150',
    ]);
  });

  it('exports zero values when no rows are provided', () => {
    expect(buildDeltaStatsCsv([]).split('\n')).toEqual([
      'Peak,Trough,Average',
      '0,0,0',
    ]);
  });
});
