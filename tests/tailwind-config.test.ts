const config = require('../tailwind.config.cjs');

describe('tailwind.config.cjs colors', () => {
  it('has colors object in theme.extend', () => {
    expect(typeof config.theme.extend.colors).toBe('object');
  });

  it('has brand.DEFAULT set to #4f46e5', () => {
    expect(config.theme.extend.colors.brand.DEFAULT).toBe('#4f46e5');
  });

  it('has surface set to #f9fafb', () => {
    expect(config.theme.extend.colors.surface).toBe('#f9fafb');
  });

  it('has text-muted set to #4b5563', () => {
    expect(config.theme.extend.colors['text-muted']).toBe('#4b5563');
  });
});
