/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import CalculatorSkeleton from '../src/components/CalculatorSkeleton';

describe('CalculatorSkeleton', () => {
  test('renders an accessible loading status with pulse placeholders', () => {
    const { container } = render(<CalculatorSkeleton />);
    const status = screen.getByRole('status');

    expect(status.getAttribute('aria-label')).toBe('Loading calculator');
    expect(container.querySelector('.animate-pulse')).toBeTruthy();
  });
});
