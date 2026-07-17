import { computeCompositionShare } from './compositionShare';
import { formatPercent } from './format';
import { ProjectionRow } from './types';

export function describeCompositionShare(rows: ProjectionRow[]): string {
  const share = computeCompositionShare(rows);
  return `Earnings share: ${formatPercent(share.earningsShare * 100)}; recaptured share: ${formatPercent(share.recapturedShare * 100)}`;
}
