import type { ProjectionInputs, ProjectionRow } from './types';

const AUTO_TIERS: number[] = [250, 500, 1000];
const HOME_TIERS: number[] = [500, 1000, 5000];

function pickAutoBasePremium(inputs: ProjectionInputs): number {
  if (inputs.autoCurrentDeductible === 250) return inputs.autoPremium250;
  if (inputs.autoCurrentDeductible === 500) return inputs.autoPremium500;
  return inputs.autoPremium1000;
}

function pickHomeBasePremium(inputs: ProjectionInputs): number {
  if (inputs.homeCurrentDeductible === 500) return inputs.homePremium500;
  if (inputs.homeCurrentDeductible === 1000) return inputs.homePremium1000;
  return inputs.homePremium5000;
}

export function calculateProjection(inputs: ProjectionInputs): ProjectionRow[] {
  const results: ProjectionRow[] = [];
  let reserve = inputs.currentReserve;
  let autoDeductible = inputs.autoCurrentDeductible;
  let homeDeductible = inputs.homeCurrentDeductible;

  const currentAutoBasePremium = pickAutoBasePremium(inputs);
  const currentHomeBasePremium = pickHomeBasePremium(inputs);

  for (let year = 1; year <= inputs.years; year++) {
    const autoInflationFactor = Math.pow(1 + inputs.autoInflation / 100, year - 1);
    const homeInflationFactor = Math.pow(1 + inputs.homeInflation / 100, year - 1);

    const autoPremiums: Record<number, number> = {
      250: inputs.autoPremium250 * autoInflationFactor,
      500: inputs.autoPremium500 * autoInflationFactor,
      1000: inputs.autoPremium1000 * autoInflationFactor,
    };

    const homePremiums: Record<number, number> = {
      500: inputs.homePremium500 * homeInflationFactor,
      1000: inputs.homePremium1000 * homeInflationFactor,
      5000: inputs.homePremium5000 * homeInflationFactor,
    };

    const currentStrategyPremium =
      currentAutoBasePremium * autoInflationFactor +
      currentHomeBasePremium * homeInflationFactor;

    const autoIndex = AUTO_TIERS.indexOf(autoDeductible);
    if (autoIndex >= 0 && autoIndex < AUTO_TIERS.length - 1 && reserve >= AUTO_TIERS[autoIndex + 1]) {
      autoDeductible = AUTO_TIERS[autoIndex + 1];
    }

    const homeIndex = HOME_TIERS.indexOf(homeDeductible);
    if (homeIndex >= 0 && homeIndex < HOME_TIERS.length - 1 && reserve >= HOME_TIERS[homeIndex + 1]) {
      homeDeductible = HOME_TIERS[homeIndex + 1];
    }

    const autoCurrentPremium = autoPremiums[autoDeductible];
    const homeCurrentPremium = homePremiums[homeDeductible];
    const totalPremium = autoCurrentPremium + homeCurrentPremium;

    const recapturedPremium = currentStrategyPremium - totalPremium;

    const beginningReserve = reserve;
    reserve += recapturedPremium + inputs.reserveContribution;
    const reserveEarnings = reserve * (inputs.reserveReturn / 100);
    reserve += reserveEarnings;

    const cumulativeSavings =
      results.length > 0
        ? results[results.length - 1].cumulativeSavings + recapturedPremium
        : recapturedPremium;

    results.push({
      year,
      autoDeductible,
      homeDeductible,
      autoPremiums,
      homePremiums,
      autoCurrentPremium,
      homeCurrentPremium,
      proposedPremium: totalPremium,
      currentPremium: currentStrategyPremium,
      recapturedPremium,
      beginningReserve,
      reserveEarnings,
      smartInsuredReserve: reserve,
      cumulativeSavings,
    });
  }

  return results;
}
