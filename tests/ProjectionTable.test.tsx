/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import ProjectionTable from '../src/components/ProjectionTable';
import type { ProjectionRow } from '../src/lib/types';

function makeRow(year: number): ProjectionRow {
  return {
    year,
    autoDeductible: 250,
    homeDeductible: 500,
    autoPremiums: { 250: 1000, 500: 800, 1000: 600 },
    homePremiums: { 500: 2000, 1000: 1500, 5000: 1000 },
    autoCurrentPremium: 1000,
    homeCurrentPremium: 2000,
    proposedPremium: 3000,
    currentPremium: 3000,
    recapturedPremium: 0,
    beginningReserve: 0,
    reserveEarnings: 0,
    smartInsuredReserve: 0,
    cumulativeSavings: 0,
  };
}

function getYearCells(): string[] {
  const rows = screen.getAllByRole('row');
  // First row is the header; subsequent rows are data rows.
  return rows.slice(1).map((tr) => {
    const cells = within(tr).getAllByRole('cell');
    return cells[0].textContent ?? '';
  });
}

describe('ProjectionTable', () => {
  const thirtyRows: ProjectionRow[] = Array.from({ length: 30 }, (_, i) => makeRow(i + 1));

  test('all column headers render', () => {
    render(<ProjectionTable rows={thirtyRows} />);
    const expectedHeaders = [
      'Year',
      'Auto Ded.',
      'Home Ded.',
      'Proposed',
      'Current',
      'Recaptured',
      'Reserve Begin',
      'Reserve End',
    ];
    for (const header of expectedHeaders) {
      expect(screen.getByRole('columnheader', { name: header })).toBeTruthy();
    }
  });

  test('first page shows rows 1-10', () => {
    render(<ProjectionTable rows={thirtyRows} />);
    const years = getYearCells();
    expect(years).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']);
  });

  test('Next button advances to rows 11-20', () => {
    render(<ProjectionTable rows={thirtyRows} />);
    fireEvent.click(screen.getByRole('button', { name: /next page/i }));
    const years = getYearCells();
    expect(years).toEqual(['11', '12', '13', '14', '15', '16', '17', '18', '19', '20']);
  });

  test('Prev button is disabled on page 1', () => {
    render(<ProjectionTable rows={thirtyRows} />);
    const prev = screen.getByRole('button', { name: /previous page/i }) as HTMLButtonElement;
    expect(prev.disabled).toBe(true);
  });
});
