import { buildReserveProgressCsv } from '../src/lib/reserveProgressCsv';
import { ProjectionRow } from '../src/lib/types';

describe('buildReserveProgressCsv', () => {
  it('returns the progress for projection rows', () => {
    const output = buildReserveProgressCsv(
      [{ smartInsuredReserve: 250 }] as ProjectionRow[],
      500,
    );

    expect(output.split('\n')).toEqual(['Reserve Progress', '0.5']);
  });

  it('returns zero for empty projection rows', () => {
    expect(buildReserveProgressCsv([], 1000).split('\n')).toEqual([
      'Reserve Progress',
      '0',
    ]);
  });
});
