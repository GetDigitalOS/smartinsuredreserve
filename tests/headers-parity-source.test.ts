import { readFileSync } from 'fs';
import { join } from 'path';

describe('security header parity between next.config.js and _headers', () => {
  const nextConfig = readFileSync(join(__dirname, '..', 'next.config.js'), 'utf8');
  const headersFile = readFileSync(join(__dirname, '..', '_headers'), 'utf8');

  it.each([
    'Strict-Transport-Security',
    'max-age=63072000',
    'X-Frame-Options',
    'X-Content-Type-Options',
    'Referrer-Policy',
  ])('%s appears in both next.config.js and _headers', (substring) => {
    expect(nextConfig).toContain(substring);
    expect(headersFile).toContain(substring);
  });

  it('neither file allows unsafe-eval', () => {
    expect(nextConfig).not.toContain('unsafe-eval');
    expect(headersFile).not.toContain('unsafe-eval');
  });
});
