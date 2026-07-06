import * as fs from 'fs';
import * as path from 'path';

const source = fs.readFileSync(
  path.join(__dirname, '../src/components/InsuranceOptimizer.tsx'),
  'utf-8'
);

describe('InsuranceOptimizer icon accessibility', () => {
  it('has at least 9 aria-hidden="true" attributes on decorative icons', () => {
    const matches = source.match(/aria-hidden="true"/g);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBeGreaterThanOrEqual(9);
  });

  it('has no icon elements missing aria-hidden', () => {
    const missingAriaHidden = /<(Shield|TrendingUp|DollarSign|AlertCircle)(?![^>]*aria-hidden)[^>]*>/;
    expect(missingAriaHidden.test(source)).toBe(false);
  });
});
