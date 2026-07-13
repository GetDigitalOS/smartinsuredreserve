export interface CapturedError {
  message: string;
  source: string;
  stack?: string;
  context?: Record<string, unknown>;
}

export const capturedErrors: Array<CapturedError> = [];

export function reportError(error: unknown, context?: Record<string, unknown>): void {
  const source = context && typeof context.source === 'string' ? context.source : 'report';
  const normalized: CapturedError = {
    message: error instanceof Error ? error.message : typeof error === 'object' && error !== null && 'message' in error ? String((error as any).message) : String(error),
    source,
    stack: error instanceof Error ? error.stack : undefined,
    context
  };
  
  capturedErrors.push(normalized);
  if (capturedErrors.length > 50) {
    capturedErrors.shift();
  }
  
  console.error(error);
}

export function installGlobalErrorHandlers(): void {
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
      reportError(event.error || new Error(event.message), { source: 'window.error' });
    });
    window.addEventListener('unhandledrejection', (event) => {
      reportError(event.reason, { source: 'window.unhandledrejection' });
    });
  }
}
