import { summarizeScenario } from '../src/lib/scenarioSummary';
import type { ProjectionRow, ProjectionInputs } from '../src/lib/types';

test('summarizeScenario returns correct summary for a single row', () => {
  const rows = [{ smartInsuredReserve: 12000, cumulativeSavings: 400 }] as ProjectionRow[];
  const inputs = { autoCurrentDeductible: 500, homeCurrentDeductible: 1000 } as ProjectionInputs;
  expect(summarizeScenario(rows, inputs)).toEqual({
    finalReserve: 12000,
    totalSavings: 400,
    health: 'strong',
  });
});
