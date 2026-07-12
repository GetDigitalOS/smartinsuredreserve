import React from 'react';

interface SelectFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: string) => void;
  options: Array<{ value: number; label: string }>;
}

export default function SelectField({ id, label, value, onChange, options }: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
