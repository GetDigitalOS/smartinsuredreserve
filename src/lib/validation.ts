import type { ProjectionInputs } from './types';

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

const AUTO_TIERS: number[] = [250, 500, 1000];
const HOME_TIERS: number[] = [500, 1000, 5000];

const PREMIUM_FIELDS: Array<keyof ProjectionInputs> = [
  'autoPremium250',
  'autoPremium500',
  'autoPremium1000',
  'homePremium500',
  'homePremium1000',
  'homePremium5000',
];

function isAscending(tiers: number[]): boolean {
  for (let i = 1; i < tiers.length; i++) {
    if (tiers[i] <= tiers[i - 1]) return false;
  }
  return true;
}

export function validateProjectionInputs(inputs: ProjectionInputs): ValidationResult {
  const errors: Record<string, string> = {};

  for (const field of PREMIUM_FIELDS) {
    const value = inputs[field];
    if (!(value > 0)) {
      errors[field] = 'Premium must be greater than 0';
    }
  }

  if (inputs.autoInflation < 0 || inputs.autoInflation > 100) {
    errors.autoInflation = 'Inflation rate must be between 0 and 100';
  }
  if (inputs.homeInflation < 0 || inputs.homeInflation > 100) {
    errors.homeInflation = 'Inflation rate must be between 0 and 100';
  }

  if (inputs.reserveReturn < 0 || inputs.reserveReturn > 50) {
    errors.reserveReturn = 'Reserve return must be between 0 and 50';
  }

  if (!Number.isFinite(inputs.years) || inputs.years < 1 || inputs.years > 50) {
    errors.years = 'Years must be between 1 and 50';
  }

  if (inputs.currentReserve < 0) {
    errors.currentReserve = 'Current reserve must be 0 or greater';
  }

  if (!isAscending(AUTO_TIERS)) {
    errors.autoCurrentDeductible = 'Auto deductible tiers must be in ascending order';
  }
  if (!isAscending(HOME_TIERS)) {
    errors.homeCurrentDeductible = 'Home deductible tiers must be in ascending order';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
