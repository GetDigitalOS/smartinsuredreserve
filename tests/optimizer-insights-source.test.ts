import * as fs from 'fs';
import * as path from 'path';

const source = fs.readFileSync(
  path.join(__dirname, '../src/components/InsuranceOptimizer.tsx'),
  'utf-8',
);

describe('InsuranceOptimizer insights source wiring', () => {
  test('renders the insights panel', () => {
    expect(source).toContain('InsightsPanel');
  });

  test('keeps the shared default projection inputs', () => {
    expect(source).toContain('DEFAULT_PROJECTION_INPUTS');
  });

  test('keeps the first-use notice', () => {
    expect(source).toContain('FirstUseNotice');
  });
});
