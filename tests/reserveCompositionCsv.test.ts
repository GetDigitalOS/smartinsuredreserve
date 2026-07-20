import { buildReserveCompositionCsv } from '../src/lib/reserveCompositionCsv';
import { ProjectionRow } from '../src/lib/types';

const rows = [
  { reserveEarnings: 100, recapturedPremium: 50, smartInsuredReserve: 300 },
  { reserveEarnings: 200, recapturedPremium: 150, smartInsuredReserve: 600 },
] as ProjectionRow[];

test('buildReserveCompositionCsv produces correct CSV for non-empty rows', () => {
  expect(buildReserveCompositionCsv(rows).split('\n')).toEqual([
    'Earnings Total,Recaptured Total,Final Reserve',
    '300,200,600',
  ]);
});

test('buildReserveCompositionCsv produces zero row for empty rows', () => {
  expect(buildReserveCompositionCsv([]).split('\n')).toEqual([
    'Earnings Total,Recaptured Total,Final Reserve',
    '0,0,0',
  ]);
});
