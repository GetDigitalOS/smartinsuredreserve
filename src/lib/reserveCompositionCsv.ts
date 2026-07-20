import { ProjectionRow } from './types';
import { computeReserveComposition } from './reserveComposition';

export function buildReserveCompositionCsv(rows: ProjectionRow[]): string {
  const { earningsTotal, recapturedTotal, finalReserve } = computeReserveComposition(rows);
  return `Earnings Total,Recaptured Total,Final Reserve\n${earningsTotal},${recapturedTotal},${finalReserve}`;
}
