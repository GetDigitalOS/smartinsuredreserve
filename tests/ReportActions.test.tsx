/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import ReportActions from '../src/components/ReportActions';
import type { ProjectionRow } from '../src/lib/types';

function projectionRow(overrides: Partial<ProjectionRow> = {}): ProjectionRow {
  return {
    year: 1,
    autoDeductible: 250,
    homeDeductible: 500,
    autoPremiums: {},
    homePremiums: {},
    autoCurrentPremium: 0,
    homeCurrentPremium: 0,
    proposedPremium: 3000,
    currentPremium: 3500,
    recapturedPremium: 500,
    beginningReserve: 0,
    reserveEarnings: 0,
    smartInsuredReserve: 1500,
    cumulativeSavings: 500,
    ...overrides,
  };
}

describe('ReportActions', () => {
  const rows = [projectionRow()];
  let printSpy: jest.Mock;
  let createObjectURLSpy: jest.Mock;
  let revokeObjectURLSpy: jest.Mock;

  beforeEach(() => {
    printSpy = jest.fn();
    createObjectURLSpy = jest.fn(() => 'blob:reserve-projection');
    revokeObjectURLSpy = jest.fn();

    Object.defineProperty(window, 'print', {
      configurable: true,
      value: printSpy,
    });
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: createObjectURLSpy,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: revokeObjectURLSpy,
    });
  });

  test('renders report action buttons with accessible names', () => {
    render(<ReportActions rows={rows} />);

    expect(screen.getByRole('button', { name: 'Print Report' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Download CSV' })).toBeTruthy();
  });

  test('prints the report', () => {
    render(<ReportActions rows={rows} />);

    fireEvent.click(screen.getByRole('button', { name: 'Print Report' }));

    expect(printSpy).toHaveBeenCalledTimes(1);
  });

  test('downloads the projection CSV as a blob', () => {
    render(<ReportActions rows={rows} />);

    fireEvent.click(screen.getByRole('button', { name: 'Download CSV' }));

    expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
    expect(createObjectURLSpy.mock.calls[0][0]).toBeInstanceOf(Blob);
  });
});
