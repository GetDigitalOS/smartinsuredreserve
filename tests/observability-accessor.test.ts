/**
 * @jest-environment jsdom
 */
import { MAX_CAPTURED_ERRORS, capturedErrors, getCapturedErrors, reportError } from '../src/lib/observability';

describe('observability accessor', () => {
  beforeEach(() => {
    capturedErrors.length = 0;
  });

  it('asserts MAX_CAPTURED_ERRORS === 50', () => {
    expect(MAX_CAPTURED_ERRORS).toBe(50);
  });

  it('returns an array whose length grows by one after reportError(new Error(\'z\')) and whose last element message === \'z\'', () => {
    const before = getCapturedErrors();
    reportError(new Error('z'));
    const after = getCapturedErrors();
    
    expect(after.length).toBe(before.length + 1);
    expect(after[after.length - 1].message).toBe('z');
  });

  it('returned array is a distinct reference from capturedErrors', () => {
    const result = getCapturedErrors();
    expect(result).not.toBe(capturedErrors);
  });
});
