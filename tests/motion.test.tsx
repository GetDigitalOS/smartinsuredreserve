/**
 * @jest-environment jsdom
 */
import { prefersReducedMotion } from '../src/lib/motion';

describe('prefersReducedMotion', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: originalMatchMedia,
    });
  });

  it('returns true when reduced motion is preferred', () => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: true });

    expect(prefersReducedMotion()).toBe(true);
  });

  it('returns false when reduced motion is not preferred', () => {
    window.matchMedia = jest.fn().mockReturnValue({ matches: false });

    expect(prefersReducedMotion()).toBe(false);
  });

  it('returns false when matchMedia is unavailable', () => {
    delete (window as Partial<Window>).matchMedia;

    expect(prefersReducedMotion()).toBe(false);
  });
});
