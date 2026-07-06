import fs from 'fs';
import path from 'path';

const cssPath = path.join(__dirname, '..', 'styles', 'globals.css');
const css = fs.readFileSync(cssPath, 'utf-8');

describe('globals.css reduced-motion support', () => {
  it('contains the prefers-reduced-motion media query', () => {
    expect(css).toContain('@media (prefers-reduced-motion: reduce)');
  });

  it('disables animation-duration in reduced-motion context', () => {
    expect(css).toContain('animation-duration: 0.01ms');
  });

  it('disables transition-duration in reduced-motion context', () => {
    expect(css).toContain('transition-duration: 0.01ms');
  });
});
