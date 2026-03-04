import { add, subtract, multiply, divide, evaluateExpression } from '../src/lib/calculator';

describe('calculator helpers', () => {
  test('basic ops', () => {
    expect(add(1,2)).toBe(3);
    expect(subtract(5,2)).toBe(3);
    expect(multiply(3,4)).toBe(12);
    expect(divide(10,2)).toBe(5);
  });

  test('evaluate expression', () => {
    expect(evaluateExpression('1+2*3')).toBe(7);
    expect(evaluateExpression('(2+3)*4')).toBe(20);
  });
});
