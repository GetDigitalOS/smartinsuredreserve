import { buildWebApplicationJsonLd } from '../src/lib/seo';

describe('buildWebApplicationJsonLd', () => {
  it('builds WebApplication structured data', () => {
    const jsonLd = buildWebApplicationJsonLd();

    expect(jsonLd['@type']).toBe('WebApplication');
    expect(jsonLd['@context']).toBe('https://schema.org');
    expect(jsonLd.name).toBe('SmartInsuredReserve');
  });

  it('serializes to parseable JSON containing the free offer price', () => {
    const parsed = JSON.parse(JSON.stringify(buildWebApplicationJsonLd())) as {
      offers?: { price?: unknown };
    };

    expect(parsed.offers?.price).toBe('0');
  });
});
