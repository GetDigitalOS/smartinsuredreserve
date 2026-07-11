import * as fs from 'fs';
import * as path from 'path';

describe('next.config.js source maps', () => {
  it('includes productionBrowserSourceMaps: true', () => {
    const configPath = path.join(__dirname, '..', 'next.config.js');
    const source = fs.readFileSync(configPath, 'utf8');
    expect(source).toContain('productionBrowserSourceMaps: true');
  });
});
