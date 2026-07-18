import { buildDeltaStatsMarkdown } from '../src/lib/deltaStatsMarkdown';
import { ProjectionRow } from '../src/lib/types';

describe('buildDeltaStatsMarkdown', () => {
  it('formats the summary for yearly reserve deltas', () => {
    const rows = [
      { smartInsuredReserve: 100 },
      { smartInsuredReserve: 250 },
      { smartInsuredReserve: 400 },
    ] as ProjectionRow[];

    expect(buildDeltaStatsMarkdown(rows).split('\n')).toEqual([
      '| Peak | Trough | Average |',
      '| --- | --- | --- |',
      '| 150 | 150 | 150 |',
    ]);
  });

  it('formats zero values when there are no rows', () => {
    expect(buildDeltaStatsMarkdown([]).split('\n')).toEqual([
      '| Peak | Trough | Average |',
      '| --- | --- | --- |',
      '| 0 | 0 | 0 |',
    ]);
  });
});
