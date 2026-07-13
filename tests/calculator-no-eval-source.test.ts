import fs from 'fs';
import path from 'path';

describe('calculator source safety', () => {
  test('does not use dynamic expression evaluation', () => {
    const calculatorSource = fs.readFileSync(
      path.join(process.cwd(), 'src/lib/calculator.ts'),
      'utf8',
    );

    expect(calculatorSource).not.toContain('evaluateExpression');
    expect(calculatorSource).not.toMatch(/Function\s*\(/);
  });
});
