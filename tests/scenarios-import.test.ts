import { exportScenarioAsJson, importScenarioFromJson } from '../src/lib/scenarios';
import type { ProjectionInputs } from '../src/lib/types';

const inputs: ProjectionInputs = {
  autoPremium250: 1,
  autoPremium500: 1,
  autoPremium1000: 1,
  autoInflation: 1,
  autoCurrentDeductible: 1,
  homePremium500: 1,
  homePremium1000: 1,
  homePremium5000: 1,
  homeInflation: 1,
  homeCurrentDeductible: 1,
  currentReserve: 1,
  reserveReturn: 1,
  reserveContribution: 1,
  years: 1,
};

describe('importScenarioFromJson', () => {
  test('round-trips exported projection inputs', () => {
    expect(importScenarioFromJson(exportScenarioAsJson(inputs))).toEqual(inputs);
  });

  test('returns null for malformed JSON', () => {
    expect(importScenarioFromJson('{oops')).toBeNull();
  });

  test('returns null when a required input is missing', () => {
    const { years: _years, ...withoutYears } = inputs;
    expect(importScenarioFromJson(JSON.stringify(withoutYears))).toBeNull();
  });
});
