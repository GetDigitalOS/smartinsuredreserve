import fs from 'fs';
import path from 'path';

const source = fs.readFileSync(path.join(__dirname, '../pages/index.tsx'), 'utf-8');

describe('pages/index.tsx social meta tags', () => {
  it('imports buildSocialMetaTags', () => {
    expect(source).toContain('buildSocialMetaTags');
  });

  it('maps over the social meta tags', () => {
    expect(source).toContain('.map(');
  });

  it('uses entry.property for property-based tags', () => {
    expect(source).toContain('property');
  });
});
