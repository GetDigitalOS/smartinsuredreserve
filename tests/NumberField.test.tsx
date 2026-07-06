/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NumberField from '../src/components/NumberField';

describe('NumberField', () => {
  test('renders label associated to input via htmlFor/id', () => {
    render(<NumberField id="premium" label="Premium" value={0} onChange={() => undefined} />);
    const label = screen.getByText('Premium');
    const input = screen.getByLabelText('Premium');
    expect(label).toBeTruthy();
    expect(input).toBeTruthy();
  });

  test('typing fires onChange with the typed value', () => {
    const handleChange = jest.fn();
    render(<NumberField id="premium" label="Premium" value={0} onChange={handleChange} />);
    const input = screen.getByLabelText('Premium');
    fireEvent.change(input, { target: { value: '42' } });
    expect(handleChange).toHaveBeenCalledWith('42');
  });

  test('passing error renders role="alert" with error text', () => {
    render(
      <NumberField id="premium" label="Premium" value={0} onChange={() => undefined} error="Too high" />,
    );
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe('Too high');
  });

  test('omitting error renders no role="alert" element', () => {
    render(<NumberField id="premium" label="Premium" value={0} onChange={() => undefined} />);
    expect(screen.queryByRole('alert')).toBeNull();
  });
});
