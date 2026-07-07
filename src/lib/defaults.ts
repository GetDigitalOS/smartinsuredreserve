import { ProjectionInputs } from './types';

export const DEFAULT_PROJECTION_INPUTS: ProjectionInputs = {
  autoPremium250: 1900,
  autoPremium500: 1473,
  autoPremium1000: 1140,
  autoInflation: 3.0,
  autoCurrentDeductible: 250,

  homePremium500: 2400,
  homePremium1000: 1860,
  homePremium5000: 1440,
  homeInflation: 22.5,
  homeCurrentDeductible: 500,

  currentReserve: 0,
  reserveReturn: 4.5,
  reserveContribution: 0,

  years: 30,
};
