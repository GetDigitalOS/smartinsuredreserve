import { readFileSync } from 'fs';
import { join } from 'path';

describe('next.config.js baseline security headers source', () => {
  const source = readFileSync(join(__dirname, '..', 'next.config.js'), 'utf8');

  it.each([
    'X-Content-Type-Options',
    'nosniff',
    'X-Frame-Options',
    'DENY',
    'Referrer-Policy',
    'strict-origin-when-cross-origin',
  ])('contains %s', (substring) => {
    expect(source).toContain(substring);
  });
});
