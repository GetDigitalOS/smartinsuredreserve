import { readFileSync } from 'fs';
import { join } from 'path';

describe('next.config.js HSTS header source', () => {
  const source = readFileSync(join(__dirname, '..', 'next.config.js'), 'utf8');

  it.each([
    'Strict-Transport-Security',
    'max-age=63072000',
    'includeSubDomains',
  ])('contains %s', (substring) => {
    expect(source).toContain(substring);
  });
});
