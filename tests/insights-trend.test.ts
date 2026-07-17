import { deriveTrendInsight } from '../src/lib/insights';
import { ProjectionRow } from '../src/lib/types';

describe('deriveTrendInsight', () => {
  it('reports a rising reserve trend', () => {
    const rows = [
      { smartInsuredReserve: 100 },
      { smartInsuredReserve: 250 },
      { smartInsuredReserve: 400 },
    ] as ProjectionRow[];

    expect(deriveTrendInsight(rows)).toBe('Reserve is rising');
  });

  it('reports a flat reserve trend for empty rows', () => {
    expect(deriveTrendInsight([])).toBe('Reserve is flat');
  });
});
