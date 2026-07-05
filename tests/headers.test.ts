import { readFileSync } from 'fs';
import { join } from 'path';

describe('public/_headers', () => {
  const headers = readFileSync(join(__dirname, '..', 'public', '_headers'), 'utf8');

  it.each([
    '/*',
    'Strict-Transport-Security',
    'max-age=31536000',
    'X-Frame-Options: DENY',
    'X-Content-Type-Options: nosniff',
    'Referrer-Policy: strict-origin-when-cross-origin',
    'Content-Security-Policy',
  ])('contains %s', (substring) => {
    expect(headers).toContain(substring);
  });
});
