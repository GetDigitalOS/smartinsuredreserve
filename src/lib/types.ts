export interface ProjectionInputs {
  autoPremium250: number;
  autoPremium500: number;
  autoPremium1000: number;
  autoInflation: number;
  autoCurrentDeductible: number;

  homePremium500: number;
  homePremium1000: number;
  homePremium5000: number;
  homeInflation: number;
  homeCurrentDeductible: number;

  currentReserve: number;
  reserveReturn: number;
  reserveContribution: number;

  years: number;
}

export interface ProjectionRow {
  year: number;
  autoDeductible: number;
  homeDeductible: number;
  autoPremiums: Record<number, number>;
  homePremiums: Record<number, number>;
  autoCurrentPremium: number;
  homeCurrentPremium: number;
  proposedPremium: number;
  currentPremium: number;
  recapturedPremium: number;
  beginningReserve: number;
  reserveEarnings: number;
  smartInsuredReserve: number;
  cumulativeSavings: number;
}
