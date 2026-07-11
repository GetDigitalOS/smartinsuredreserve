import * as fs from 'fs';
import * as path from 'path';

const source = fs.readFileSync(
  path.join(__dirname, '../src/lib/projection.ts'),
  'utf-8',
);

describe('projection.ts source structure', () => {
  test('imports nextEligibleTier', () => {
    expect(source).toContain('nextEligibleTier');
  });

  test('imports from deductibleTiers module', () => {
    expect(source).toContain('deductibleTiers');
  });
});
