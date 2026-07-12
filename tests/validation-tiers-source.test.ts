import fs from 'fs';
import path from 'path';

describe('validation.ts source code', () => {
  test('imports deductible tiers instead of defining them locally', () => {
    const sourcePath = path.resolve(__dirname, '../src/lib/validation.ts');
    const sourceCode = fs.readFileSync(sourcePath, 'utf8');

    expect(sourceCode).toContain('AUTO_DEDUCTIBLE_TIERS');
    expect(sourceCode).toContain('HOME_DEDUCTIBLE_TIERS');
    expect(sourceCode).toContain('./deductibleTiers');
    expect(sourceCode).not.toMatch(/const AUTO_TIERS/);
  });
});
