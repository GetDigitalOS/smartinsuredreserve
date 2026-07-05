import { buildCspHeader } from '../src/lib/csp';

describe('buildCspHeader', () => {
  it('returns a string', () => {
    expect(typeof buildCspHeader()).toBe('string');
  });

  it("never enables 'unsafe-eval'", () => {
    expect(buildCspHeader()).not.toContain("'unsafe-eval'");
  });

  it('declares a script-src directive', () => {
    expect(buildCspHeader()).toContain('script-src');
  });

  it("locks default-src to 'self'", () => {
    expect(buildCspHeader()).toContain("default-src 'self'");
  });

  it("forbids framing via frame-ancestors 'none'", () => {
    expect(buildCspHeader()).toContain("frame-ancestors 'none'");
  });

  it('includes the remaining hardened directives', () => {
    const header = buildCspHeader();
    expect(header).toContain("style-src 'self' 'unsafe-inline'");
    expect(header).toContain("img-src 'self' data:");
    expect(header).toContain("font-src 'self'");
    expect(header).toContain("connect-src 'self'");
  });
});
