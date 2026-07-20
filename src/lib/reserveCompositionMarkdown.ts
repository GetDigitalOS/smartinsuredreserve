import { computeReserveComposition } from './reserveComposition';
import { ProjectionRow } from './types';

export function buildReserveCompositionMarkdown(rows: ProjectionRow[]): string {
  const { earningsTotal, recapturedTotal, finalReserve } = computeReserveComposition(rows);

  return [
    '| Earnings Total | Recaptured Total | Final Reserve |',
    '| --- | --- | --- |',
    `| ${earningsTotal} | ${recapturedTotal} | ${finalReserve} |`,
  ].join('\n');
}
