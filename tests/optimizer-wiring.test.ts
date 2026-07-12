import * as fs from 'fs';
import * as path from 'path';

const source = fs.readFileSync(
  path.join(__dirname, '../src/components/InsuranceOptimizer.tsx'),
  'utf-8',
);

describe('InsuranceOptimizer source wiring', () => {
  test('uses the shared default projection inputs', () => {
    expect(source).toContain('DEFAULT_PROJECTION_INPUTS');
  });

  test('renders the first-use notice', () => {
    expect(source).toContain('FirstUseNotice');
  });

  test('keeps inputs in component state', () => {
    expect(source).toContain('useState');
  });
});
