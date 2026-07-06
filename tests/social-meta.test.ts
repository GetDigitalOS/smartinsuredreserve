import { buildSocialMetaTags } from '../src/lib/seo';

describe('buildSocialMetaTags', () => {
  it('returns an array of at least 4 entries', () => {
    expect(buildSocialMetaTags().length).toBeGreaterThanOrEqual(4);
  });

  it('includes og:image entry with correct content', () => {
    const tags = buildSocialMetaTags();
    const entry = tags.find((t) => t.property === 'og:image');
    expect(entry).toBeDefined();
    expect(entry!.content).toBe('https://smartinsuredreserve.pages.dev/og-image.png');
  });

  it('includes twitter:card entry with summary_large_image', () => {
    const tags = buildSocialMetaTags();
    const entry = tags.find((t) => t.name === 'twitter:card');
    expect(entry).toBeDefined();
    expect(entry!.content).toBe('summary_large_image');
  });

  it('every entry has a non-empty string content', () => {
    const tags = buildSocialMetaTags();
    for (const tag of tags) {
      expect(typeof tag.content).toBe('string');
      expect(tag.content.length).toBeGreaterThan(0);
    }
  });
});
