import { ProjectionRow } from './types';
import { computeCompositionShare } from './compositionShare';

export function buildCompositionShareCsv(rows: ProjectionRow[]): string {
  const { earningsShare, recapturedShare } = computeCompositionShare(rows);
  return `Earnings Share,Recaptured Share\n${earningsShare},${recapturedShare}`;
}
