import { ProjectionRow } from './types';

export function computeReserveCagr(rows: ProjectionRow[]): number {
  if (rows.length < 2 || rows[0].smartInsuredReserve <= 0) {
    return 0;
  }

  return (
    Math.pow(
      rows[rows.length - 1].smartInsuredReserve / rows[0].smartInsuredReserve,
      1 / (rows.length - 1),
    ) - 1
  );
}
