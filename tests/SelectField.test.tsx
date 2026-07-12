/**
 * @jest-environment jsdom
 */
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SelectField from '../src/components/SelectField';

describe('SelectField', () => {
  test('renders a labeled combobox with the selected value and forwards changes', () => {
    const handleChange = jest.fn();

    render(
      <SelectField
        id="state"
        label="State"
        value={2}
        onChange={handleChange}
        options={[
          { value: 1, label: 'One' },
          { value: 2, label: 'Two' },
        ]}
      />,
    );

    const select = screen.getByRole('combobox', { name: 'State' }) as HTMLSelectElement;
    expect(select).toBeTruthy();
    expect(select.value).toBe('2');

    fireEvent.change(select, { target: { value: '1' } });
    expect(handleChange).toHaveBeenCalledWith('1');
  });
});
