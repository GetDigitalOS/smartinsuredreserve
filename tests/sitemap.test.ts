import fs from 'fs';
import path from 'path';

describe('sitemap.xml', () => {
  const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  let content: string;

  beforeAll(() => {
    content = fs.readFileSync(sitemapPath, 'utf-8');
  });

  it('contains urlset opening tag', () => {
    expect(content).toContain('<urlset');
  });

  it('contains the canonical URL', () => {
    expect(content).toContain('https://smartinsuredreserve.pages.dev/');
  });

  it('contains urlset closing tag', () => {
    expect(content).toContain('</urlset>');
  });
});
