import { formatCurrency, formatPercent } from '../src/lib/format';

describe('formatCurrency', () => {
  it('formats positive values', () => {
    expect(formatCurrency(123)).toBe('$123');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0');
  });

  it('formats fractional values with rounding', () => {
    expect(formatCurrency(12345.6)).toBe('$12,346');
    expect(formatCurrency(12345.4)).toBe('$12,345');
    expect(formatCurrency(12345.5)).toBe('$12,346');
  });

  it('formats negative values', () => {
    expect(formatCurrency(-1234.5)).toBe('-$1,235');
    expect(formatCurrency(-50)).toBe('-$50');
  });

  it('formats large values with separators', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000');
  });
});

describe('formatPercent', () => {
  it('formats positive values', () => {
    expect(formatPercent(4.5)).toBe('4.5%');
  });

  it('formats zero', () => {
    expect(formatPercent(0)).toBe('0.0%');
  });

  it('formats values that require rounding', () => {
    expect(formatPercent(4.56)).toBe('4.6%');
    expect(formatPercent(4.54)).toBe('4.5%');
  });

  it('formats negative values', () => {
    expect(formatPercent(-4.5)).toBe('-4.5%');
  });

  it('formats whole numbers to one decimal place', () => {
    expect(formatPercent(10)).toBe('10.0%');
  });
});
