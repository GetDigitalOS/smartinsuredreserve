import fs from 'fs';
import path from 'path';

const source = fs.readFileSync(path.join(__dirname, '../pages/index.tsx'), 'utf-8');

describe('pages/index.tsx canonical link', () => {
  it('imports the canonical URL builder', () => {
    expect(source).toContain('buildCanonicalUrl');
  });

  it('renders a canonical link tag', () => {
    expect(source).toContain('rel="canonical"');
    expect(source).toContain('<link');
  });
});
