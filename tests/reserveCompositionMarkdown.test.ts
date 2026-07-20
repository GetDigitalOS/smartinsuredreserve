import { buildReserveCompositionMarkdown } from '../src/lib/reserveCompositionMarkdown';
import { ProjectionRow } from '../src/lib/types';

describe('buildReserveCompositionMarkdown', () => {
  it('builds a composition table from projection rows', () => {
    const rows = [
      { reserveEarnings: 100, recapturedPremium: 50, smartInsuredReserve: 300 },
      { reserveEarnings: 200, recapturedPremium: 150, smartInsuredReserve: 600 },
    ] as ProjectionRow[];

    expect(buildReserveCompositionMarkdown(rows).split('\n')).toEqual([
      '| Earnings Total | Recaptured Total | Final Reserve |',
      '| --- | --- | --- |',
      '| 300 | 200 | 600 |',
    ]);
  });

  it('returns zero totals for no rows', () => {
    expect(buildReserveCompositionMarkdown([]).split('\n')).toEqual([
      '| Earnings Total | Recaptured Total | Final Reserve |',
      '| --- | --- | --- |',
      '| 0 | 0 | 0 |',
    ]);
  });
});
