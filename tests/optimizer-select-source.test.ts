import * as fs from 'fs';
import * as path from 'path';

const source = fs.readFileSync(
  path.join(__dirname, '../src/components/InsuranceOptimizer.tsx'),
  'utf-8',
);

describe('InsuranceOptimizer select source wiring', () => {
  test('uses the shared SelectField component', () => {
    expect(source).toContain('SelectField');
  });

  test('imports SelectField from the local component path', () => {
    expect(source).toContain('./SelectField');
  });
});
