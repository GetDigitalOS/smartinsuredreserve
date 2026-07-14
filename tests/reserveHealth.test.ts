import { classifyReserveHealth } from '../src/lib/reserveHealth';

describe('classifyReserveHealth', () => {
  it('classifies reserve coverage ratios by health band', () => {
    expect(classifyReserveHealth(0.5)).toBe('under');
    expect(classifyReserveHealth(1)).toBe('adequate');
    expect(classifyReserveHealth(1.9)).toBe('adequate');
    expect(classifyReserveHealth(2)).toBe('strong');
  });
});
