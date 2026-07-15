import { classifyDeltaTrend } from '../src/lib/deltaTrend';
import { ProjectionRow } from '../src/lib/types';

describe('classifyDeltaTrend', () => {
  it('returns rising when reserves increase', () => {
    const rows = [
      { smartInsuredReserve: 100 },
      { smartInsuredReserve: 250 },
      { smartInsuredReserve: 400 },
    ] as ProjectionRow[];
    expect(classifyDeltaTrend(rows)).toBe('rising');
  });

  it('returns falling when reserves decrease', () => {
    const rows = [
      { smartInsuredReserve: 400 },
      { smartInsuredReserve: 250 },
      { smartInsuredReserve: 100 },
    ] as ProjectionRow[];
    expect(classifyDeltaTrend(rows)).toBe('falling');
  });

  it('returns flat when reserves are constant', () => {
    const rows = [
      { smartInsuredReserve: 100 },
      { smartInsuredReserve: 100 },
    ] as ProjectionRow[];
    expect(classifyDeltaTrend(rows)).toBe('flat');
  });

  it('returns flat for empty rows', () => {
    expect(classifyDeltaTrend([])).toBe('flat');
  });
});
