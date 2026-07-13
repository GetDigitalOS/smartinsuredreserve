import { useEffect } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ErrorBoundary } from '../src/components/ErrorBoundary';
import { installGlobalErrorHandlers } from '../src/lib/observability';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => { installGlobalErrorHandlers() }, []);
  return (
    <ErrorBoundary>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:text-indigo-700 focus:font-semibold">
        Skip to main content
      </a>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
