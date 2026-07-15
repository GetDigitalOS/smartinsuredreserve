import { computeReserveMetrics } from './metrics';
import { computeYearlyReserveDeltas } from './yearlyDelta';
import type { ProjectionRow } from './types';

const CSV_HEADER =
  'Year,Auto Deductible,Home Deductible,Proposed Premium,Current Premium,Recaptured Premium,Reserve Balance,Cumulative Savings';

const DETAILED_CSV_HEADER =
  'Year,Auto Deductible,Home Deductible,Auto Premium,Home Premium,Proposed Premium,Current Premium,Recaptured Premium,Beginning Reserve,Reserve Earnings,Reserve Balance,Cumulative Savings';

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

export function buildDetailedProjectionCsv(rows: ProjectionRow[]): string {
  const lines = rows.map((row) =>
    [
      row.year,
      row.autoDeductible,
      row.homeDeductible,
      row.autoCurrentPremium,
      row.homeCurrentPremium,
      row.proposedPremium,
      row.currentPremium,
      row.recapturedPremium,
      row.beginningReserve,
      row.reserveEarnings,
      row.smartInsuredReserve,
      row.cumulativeSavings,
    ].join(','),
  );

  return [DETAILED_CSV_HEADER, ...lines].join('\n');
}

export function buildMetricsCsv(rows: ProjectionRow[]): string {
  const { totalReserveEarnings, peakRecapturedPremium, averageAnnualSavings } =
    computeReserveMetrics(rows);

  return [
    'Total Reserve Earnings,Peak Recaptured Premium,Average Annual Savings',
    [totalReserveEarnings, peakRecapturedPremium, averageAnnualSavings].join(','),
  ].join('\n');
}

export function buildYearlyDeltaCsv(rows: ProjectionRow[]): string {
  const lines = computeYearlyReserveDeltas(rows).map((delta, index) =>
    [index + 1, delta].join(','),
  );

  return ['Year,Reserve Delta', ...lines].join('\n');
}
