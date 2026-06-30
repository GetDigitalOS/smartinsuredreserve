import type { ProjectionInputs, ProjectionRow } from './types';

export interface SummaryStats {
  finalReserve: number;
  totalSavings: number;
  finalAutoDeductible: number;
  finalHomeDeductible: number;
  breakEvenYear: number | null;
  reserveCoverageRatio: number;
}

const MAX_HOME_DEDUCTIBLE_TIER = 5000;

export function computeSummaryStats(
  rows: ProjectionRow[],
  inputs: ProjectionInputs,
): SummaryStats {
  const finalRow = rows[rows.length - 1];
  const breakEvenThreshold = inputs.autoCurrentDeductible + inputs.homeCurrentDeductible;
  const breakEvenRow = rows.find((row) => row.cumulativeSavings >= breakEvenThreshold);
  const finalReserve = finalRow?.smartInsuredReserve ?? 0;

  return {
    finalReserve,
    totalSavings: finalRow?.cumulativeSavings ?? 0,
    finalAutoDeductible: finalRow?.autoDeductible ?? inputs.autoCurrentDeductible,
    finalHomeDeductible: finalRow?.homeDeductible ?? inputs.homeCurrentDeductible,
    breakEvenYear: breakEvenRow?.year ?? null,
    reserveCoverageRatio: finalReserve / MAX_HOME_DEDUCTIBLE_TIER,
  };
}
