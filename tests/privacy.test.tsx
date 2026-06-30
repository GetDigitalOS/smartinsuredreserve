/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Privacy from '../pages/privacy';

describe('Privacy', () => {
  test('renders the privacy policy heading and no-data-collected statement', () => {
    render(<Privacy />);

    expect(screen.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeTruthy();
    expect(
      screen.getByText(
        'The SmartInsuredReserve calculator collects no personal data and performs all computation in the browser.',
      ),
    ).toBeTruthy();
  });
});
