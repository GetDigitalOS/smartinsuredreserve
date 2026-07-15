import { summarizeYearlyDeltas } from '../src/lib/deltaStats';
import { ProjectionRow } from '../src/lib/types';

describe('summarizeYearlyDeltas', () => {
  test('summarizes consistently increasing reserve deltas', () => {
    const rows = [
      { smartInsuredReserve: 100 },
      { smartInsuredReserve: 250 },
      { smartInsuredReserve: 400 },
    ] as ProjectionRow[];

    expect(summarizeYearlyDeltas(rows)).toEqual({
      peak: 150,
      trough: 150,
      average: 150,
    });
  });

  test('summarizes mixed reserve deltas', () => {
    const rows = [
      { smartInsuredReserve: 100 },
      { smartInsuredReserve: 50 },
      { smartInsuredReserve: 200 },
    ] as ProjectionRow[];

    expect(summarizeYearlyDeltas(rows)).toEqual({
      peak: 150,
      trough: -50,
      average: 50,
    });
  });

  test('returns zero statistics when no deltas exist', () => {
    expect(summarizeYearlyDeltas([])).toEqual({
      peak: 0,
      trough: 0,
      average: 0,
    });
  });
});
