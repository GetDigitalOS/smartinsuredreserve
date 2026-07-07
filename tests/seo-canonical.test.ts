import { buildCanonicalUrl } from '../src/lib/seo';

describe('buildCanonicalUrl', () => {
  it('returns the canonical URL', () => {
    expect(buildCanonicalUrl()).toBe('https://smartinsuredreserve.pages.dev/');
  });

  it('starts with https://', () => {
    expect(buildCanonicalUrl()).toMatch(/^https:\/\//);
  });

  it('is a non-empty string', () => {
    expect(buildCanonicalUrl().length).toBeGreaterThan(0);
  });
});
