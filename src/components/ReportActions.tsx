import React from 'react';
import { buildProjectionCsv } from '../lib/csv';
import type { ProjectionRow } from '../lib/types';
import { reportError } from '../lib/observability';

interface ReportActionsProps {
  rows: ProjectionRow[];
}

const ReportActions: React.FC<ReportActionsProps> = ({ rows }) => {
  const handlePrint = () => {
    try {
      window.print();
    } catch (err) {
      reportError(err, { source: 'report-actions' });
    }
  };

  const handleDownload = () => {
    try {
      const csv = buildProjectionCsv(rows);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = 'reserve-projection.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      reportError(err, { source: 'report-actions' });
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={handlePrint}
        className="rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Print Report
      </button>
      <button
        type="button"
        onClick={handleDownload}
        className="rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Download CSV
      </button>
    </div>
  );
};

export default ReportActions;
