export function formatCurrency(value: number): string {
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  const formatted = Math.round(absValue).toLocaleString('en-US');
  return isNegative ? `-$${formatted}` : `$${formatted}`;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
