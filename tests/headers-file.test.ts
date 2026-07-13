import { readFileSync } from 'fs';
import { join } from 'path';

describe('_headers Cloudflare Pages edge-headers file', () => {
  const source = readFileSync(join(__dirname, '..', '_headers'), 'utf8');

  it.each([
    '/*',
    'Content-Security-Policy',
    'Strict-Transport-Security',
    'max-age=63072000',
    'X-Frame-Options: DENY',
  ])('contains %s', (substring) => {
    expect(source).toContain(substring);
  });

  it('does not contain unsafe-eval', () => {
    expect(source).not.toContain('unsafe-eval');
  });
});
