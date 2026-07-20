import { buildDeltaTrendMarkdown } from '../src/lib/deltaTrendMarkdown';
import { ProjectionRow } from '../src/lib/types';

describe('buildDeltaTrendMarkdown', () => {
  it('renders a rising reserve trend', () => {
    const rows = [
      { smartInsuredReserve: 100 },
      { smartInsuredReserve: 250 },
      { smartInsuredReserve: 400 },
    ] as ProjectionRow[];

    expect(buildDeltaTrendMarkdown(rows).split('\n')).toEqual([
      '| Reserve Trend |',
      '| --- |',
      '| rising |',
    ]);
  });

  it('renders a flat reserve trend for empty rows', () => {
    expect(buildDeltaTrendMarkdown([]).split('\n')).toEqual([
      '| Reserve Trend |',
      '| --- |',
      '| flat |',
    ]);
  });
});
