import fs from 'fs';
import path from 'path';

const source = fs.readFileSync(path.join(__dirname, '../pages/index.tsx'), 'utf-8');

describe('pages/index.tsx loading skeleton', () => {
  it.each(['CalculatorSkeleton', 'loading:', 'ssr: false'])('contains %s', (substring) => {
    expect(source).toContain(substring);
  });
});
