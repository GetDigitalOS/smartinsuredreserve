import { buildCompositionShareCsv } from '../src/lib/compositionShareCsv';
import { ProjectionRow } from '../src/lib/types';

describe('buildCompositionShareCsv', () => {
  it('returns correct shares for a single row', () => {
    const rows = [{ reserveEarnings: 30, recapturedPremium: 10, smartInsuredReserve: 0 }] as ProjectionRow[];
    expect(buildCompositionShareCsv(rows).split('\n')).toEqual([
      'Earnings Share,Recaptured Share',
      '0.75,0.25',
    ]);
  });

  it('returns zeros for empty rows', () => {
    expect(buildCompositionShareCsv([]).split('\n')).toEqual([
      'Earnings Share,Recaptured Share',
      '0,0',
    ]);
  });
});
