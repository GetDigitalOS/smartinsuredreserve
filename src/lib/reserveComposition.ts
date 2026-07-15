import { ProjectionRow } from './types';

export function computeReserveComposition(rows: ProjectionRow[]): {
  earningsTotal: number;
  recapturedTotal: number;
  finalReserve: number;
} {
  return {
    earningsTotal: rows.reduce((sum, r) => sum + r.reserveEarnings, 0),
    recapturedTotal: rows.reduce((sum, r) => sum + r.recapturedPremium, 0),
    finalReserve: rows.length === 0 ? 0 : rows[rows.length - 1].smartInsuredReserve,
  };
}
