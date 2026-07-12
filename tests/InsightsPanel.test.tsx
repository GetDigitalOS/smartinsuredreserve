/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import InsightsPanel from '../src/components/InsightsPanel';
import type { ProjectionInputs, ProjectionRow } from '../src/lib/types';

const inputs: ProjectionInputs = {
  autoPremium250: 1200,
  autoPremium500: 1000,
  autoPremium1000: 800,
  autoInflation: 3,
  autoCurrentDeductible: 500,
  homePremium500: 2200,
  homePremium1000: 1900,
  homePremium5000: 1500,
  homeInflation: 3,
  homeCurrentDeductible: 1000,
  currentReserve: 0,
  reserveReturn: 4,
  reserveContribution: 0,
  years: 1,
};

const rows: ProjectionRow[] = [
  {
    year: 1,
    autoDeductible: 1000,
    homeDeductible: 5000,
    autoPremiums: { 250: 1200, 500: 1000, 1000: 800 },
    homePremiums: { 500: 2200, 1000: 1900, 5000: 1500 },
    autoCurrentPremium: 1000,
    homeCurrentPremium: 1900,
    proposedPremium: 2300,
    currentPremium: 2900,
    recapturedPremium: 600,
    beginningReserve: 0,
    reserveEarnings: 0,
    smartInsuredReserve: 12345,
    cumulativeSavings: 600,
  },
];

describe('InsightsPanel', () => {
  test('renders reserve insights as an accessible region', () => {
    render(<InsightsPanel rows={rows} inputs={inputs} />);

    expect(
      screen.getByRole('region', { name: /reserve insights/i }),
    ).toBeTruthy();
    expect(
      screen
        .getAllByRole('listitem')
        .some((item) => item.textContent?.includes('$12,345')),
    ).toBe(true);
  });
});
