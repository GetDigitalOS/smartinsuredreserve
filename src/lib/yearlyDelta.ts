import { ProjectionRow } from './types';

export function computeYearlyReserveDeltas(rows: ProjectionRow[]): number[] {
  if (rows.length < 2) {
    return [];
  }

  return rows.slice(1).map((row, index) => row.smartInsuredReserve - rows[index].smartInsuredReserve);
}
