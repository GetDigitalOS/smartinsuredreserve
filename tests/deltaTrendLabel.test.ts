import { describeDeltaTrend } from '../src/lib/deltaTrendLabel';
import { ProjectionRow } from '../src/lib/types';

describe('describeDeltaTrend', () => {
  it('describes rising reserve trends', () => {
    const rows = [
      { smartInsuredReserve: 100 },
      { smartInsuredReserve: 250 },
      { smartInsuredReserve: 400 },
    ] as ProjectionRow[];

    expect(describeDeltaTrend(rows)).toBe('Reserve trend: rising');
  });

  it('describes falling reserve trends', () => {
    const rows = [
      { smartInsuredReserve: 400 },
      { smartInsuredReserve: 250 },
      { smartInsuredReserve: 100 },
    ] as ProjectionRow[];

    expect(describeDeltaTrend(rows)).toBe('Reserve trend: falling');
  });

  it('describes empty rows as flat', () => {
    expect(describeDeltaTrend([])).toBe('Reserve trend: flat');
  });
});
