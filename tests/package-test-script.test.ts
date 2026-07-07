const pkg = require('../package.json');

describe('package test script', () => {
  it('runs jest without allowing missing tests', () => {
    expect(pkg.scripts.test).toBe('jest');
    expect(pkg.scripts.test).not.toContain('--passWithNoTests');
  });
});
