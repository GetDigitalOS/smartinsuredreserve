import { buildDeltaTrendCsv } from '../src/lib/deltaTrendCsv';
import { ProjectionRow } from '../src/lib/types';

describe('buildDeltaTrendCsv', () => {
  it('renders a rising reserve trend', () => {
    const rows = [
      { smartInsuredReserve: 100 },
      { smartInsuredReserve: 250 },
      { smartInsuredReserve: 400 },
    ] as ProjectionRow[];

    expect(buildDeltaTrendCsv(rows).split('\n')).toEqual(['Reserve Trend', 'rising']);
  });

  it('renders a flat reserve trend for empty rows', () => {
    expect(buildDeltaTrendCsv([]).split('\n')).toEqual(['Reserve Trend', 'flat']);
  });
});
