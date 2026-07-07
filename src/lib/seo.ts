export function buildCanonicalUrl(): string {
  return 'https://smartinsuredreserve.pages.dev/';
}

export function buildSocialMetaTags(): Array<{ name?: string; property?: string; content: string }> {
  return [
    { property: 'og:image', content: 'https://smartinsuredreserve.pages.dev/og-image.png' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Smart Insurance Deductible Optimizer' },
    { name: 'twitter:description', content: 'Calculate and optimize your insurance deductibles to minimize out-of-pocket costs and maximize your financial protection.' },
  ];
}

export function buildWebApplicationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'SmartInsuredReserve',
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
    },
  };
}
