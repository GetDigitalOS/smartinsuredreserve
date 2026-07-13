/**
 * @jest-environment jsdom
 */

import { capturedErrors, reportError, installGlobalErrorHandlers } from '../src/lib/observability';

describe('observability', () => {
  beforeEach(() => {
    capturedErrors.length = 0;
  });

  it('reportError pushes error to capturedErrors', () => {
    reportError(new Error('boom'), { a: 1 });
    
    expect(capturedErrors.length).toBe(1);
    const lastError = capturedErrors[capturedErrors.length - 1];
    expect(lastError.message).toBe('boom');
    expect(lastError.context).toEqual({ a: 1 });
  });

  it('installGlobalErrorHandlers captures window errors', () => {
    installGlobalErrorHandlers();
    
    const errorEvent = new ErrorEvent('error', { message: 'edge error occurred' });
    window.dispatchEvent(errorEvent);
    
    expect(capturedErrors.length).toBeGreaterThan(0);
    const lastError = capturedErrors[capturedErrors.length - 1];
    expect(lastError.message).toMatch(/edge/);
  });
});
