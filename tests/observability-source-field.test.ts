/**
 * @jest-environment jsdom
 */
import { capturedErrors, reportError, installGlobalErrorHandlers } from '../src/lib/observability';

describe('observability source field', () => {
  beforeEach(() => {
    capturedErrors.length = 0;
  });

  it('reportError makes the last capturedErrors record have source === "report"', () => {
    reportError(new Error('y'));
    expect(capturedErrors[capturedErrors.length - 1].source).toBe('report');
  });

  it('after installGlobalErrorHandlers() dispatching a window ErrorEvent of type error with message x yields a record with source === "window.error"', () => {
    installGlobalErrorHandlers();
    window.dispatchEvent(new ErrorEvent('error', { message: 'x' }));
    expect(capturedErrors[capturedErrors.length - 1].source).toBe('window.error');
  });
});
