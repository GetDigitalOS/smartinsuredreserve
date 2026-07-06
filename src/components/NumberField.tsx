import React from 'react';

interface NumberFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: string) => void;
  error?: string;
}

export default function NumberField({ id, label, value, onChange, error }: NumberFieldProps) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
      />
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
