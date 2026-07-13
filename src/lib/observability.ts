export interface CapturedError {
  message: string;
  stack?: string;
  context?: Record<string, unknown>;
}

export const capturedErrors: Array<CapturedError> = [];

export function reportError(error: unknown, context?: Record<string, unknown>): void {
  const normalized: CapturedError = {
    message: error instanceof Error ? error.message : typeof error === 'object' && error !== null && 'message' in error ? String((error as any).message) : String(error),
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
      reportError(event.error || new Error(event.message));
    });
    window.addEventListener('unhandledrejection', (event) => {
      reportError(event.reason);
    });
  }
}
