import { computeCompositionShare } from './compositionShare';
import { ProjectionRow } from './types';

export function buildCompositionShareMarkdown(rows: ProjectionRow[]): string {
  const { earningsShare, recapturedShare } = computeCompositionShare(rows);

  return [
    '| Earnings Share | Recaptured Share |',
    '| --- | --- |',
    `| ${earningsShare} | ${recapturedShare} |`,
  ].join('\n');
}
