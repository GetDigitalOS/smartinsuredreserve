export function applyInflation(base: number, rate: number, year: number): number {
  return base * Math.pow(1 + rate / 100, year);
}

export function computePremiumSavings(current: number, proposed: number): number {
  return current - proposed;
}

export function compoundReserve(balance: number, contribution: number, returnRate: number): number {
  return balance * (1 + returnRate / 100) + contribution;
}
