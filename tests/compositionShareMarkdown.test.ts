import { buildCompositionShareMarkdown } from '../src/lib/compositionShareMarkdown';
import { ProjectionRow } from '../src/lib/types';

describe('buildCompositionShareMarkdown', () => {
  it('returns correct shares for a single row', () => {
    const rows = [{ reserveEarnings: 30, recapturedPremium: 10, smartInsuredReserve: 0 }] as ProjectionRow[];

    expect(buildCompositionShareMarkdown(rows).split('\n')).toEqual([
      '| Earnings Share | Recaptured Share |',
      '| --- | --- |',
      '| 0.75 | 0.25 |',
    ]);
  });

  it('returns zeros for empty rows', () => {
    expect(buildCompositionShareMarkdown([]).split('\n')).toEqual([
      '| Earnings Share | Recaptured Share |',
      '| --- | --- |',
      '| 0 | 0 |',
    ]);
  });
});
