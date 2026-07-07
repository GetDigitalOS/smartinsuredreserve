import fs from 'fs';
import path from 'path';

describe('Dependabot configuration', () => {
  const content = fs.readFileSync(path.join(process.cwd(), '.github', 'dependabot.yml'), 'utf8');

  it.each([
    'version: 2',
    'package-ecosystem: "npm"',
    'directory: "/"',
    'interval: "weekly"',
  ])('contains %s', (expected) => {
    expect(content).toContain(expected);
  });
});
