import { computeReserveComposition } from './reserveComposition';
import { ProjectionRow } from './types';

export function computeCompositionShare(rows: ProjectionRow[]): {
  earningsShare: number;
  recapturedShare: number;
} {
  const comp = computeReserveComposition(rows);
  const total = comp.earningsTotal + comp.recapturedTotal;

  if (total <= 0) {
    return { earningsShare: 0, recapturedShare: 0 };
  }

  return {
    earningsShare: comp.earningsTotal / total,
    recapturedShare: comp.recapturedTotal / total,
  };
}
