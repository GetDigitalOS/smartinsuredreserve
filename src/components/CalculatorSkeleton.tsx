import React from 'react';

export default function CalculatorSkeleton(): JSX.Element {
  return (
    <div role="status" aria-label="Loading calculator" className="space-y-4">
      <div className="h-8 w-1/2 animate-pulse rounded bg-slate-200" />
      <div className="h-12 w-full animate-pulse rounded bg-slate-200" />
      <div className="h-12 w-5/6 animate-pulse rounded bg-slate-200" />
      <span className="sr-only">Loading calculator</span>
    </div>
  );
}
