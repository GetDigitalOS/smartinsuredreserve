import type { ProjectionRow } from './types';

const CSV_HEADER =
  'Year,Auto Deductible,Home Deductible,Proposed Premium,Current Premium,Recaptured Premium,Reserve Balance,Cumulative Savings';

export function buildProjectionCsv(rows: ProjectionRow[]): string {
  const lines = rows.map((row) =>
    [
      row.year,
      row.autoDeductible,
      row.homeDeductible,
      row.proposedPremium,
      row.currentPremium,
      row.recapturedPremium,
      row.smartInsuredReserve,
      row.cumulativeSavings,
    ].join(','),
  );

  return [CSV_HEADER, ...lines].join('\n');
}
