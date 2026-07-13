import { readFileSync } from 'fs';
import { join } from 'path';

describe('next.config.js CSP source', () => {
  const source = readFileSync(join(__dirname, '..', 'next.config.js'), 'utf8');

  it('does not contain the unsafe-eval token', () => {
    expect(source).not.toContain('unsafe-eval');
  });

  it('still declares a script-src directive', () => {
    expect(source).toContain('script-src');
  });
});
