import fs from 'fs';
import path from 'path';

describe('robots.txt', () => {
  const content = fs.readFileSync(path.join(process.cwd(), 'public', 'robots.txt'), 'utf8');

  it('contains User-agent: *', () => {
    expect(content).toContain('User-agent: *');
  });

  it('contains Allow: /', () => {
    expect(content).toContain('Allow: /');
  });

  it('contains sitemap URL', () => {
    expect(content).toContain('https://smartinsuredreserve.pages.dev/sitemap.xml');
  });
});
