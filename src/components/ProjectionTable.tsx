import React, { useState, useEffect } from 'react';
import { formatCurrency } from '../lib/format';
import type { ProjectionRow } from '../lib/types';

interface ProjectionTableProps {
  rows: ProjectionRow[];
  pageSize?: number;
}

const ProjectionTable: React.FC<ProjectionTableProps> = ({ rows, pageSize = 10 }) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));

  useEffect(() => {
    if (page > totalPages - 1) {
      setPage(totalPages - 1);
    }
  }, [page, totalPages]);

  const start = page * pageSize;
  const end = start + pageSize;
  const pageRows = rows.slice(start, end);

  const isFirstPage = page === 0;
  const isLastPage = page >= totalPages - 1;

  return (
    <div className="overflow-x-auto">
      <h3 className="font-semibold text-xl mb-4 text-gray-800">Year-by-Year Analysis</h3>
      <div className="border rounded-lg">
        <table className="w-full text-xs sm:text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left border-b">Year</th>
              <th className="p-2 text-center border-b bg-blue-50">Auto Ded.</th>
              <th className="p-2 text-center border-b bg-green-50">Home Ded.</th>
              <th className="p-2 text-right border-b bg-yellow-50">Proposed</th>
              <th className="p-2 text-right border-b bg-blue-50">Current</th>
              <th className="p-2 text-right border-b bg-green-50">Recaptured</th>
              <th className="p-2 text-right border-b bg-purple-50">Reserve Begin</th>
              <th className="p-2 text-right border-b bg-purple-50">Reserve End</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((row, idx) => (
              <tr key={row.year} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="p-2 border-b font-semibold">{row.year}</td>
                <td className="p-2 border-b text-center bg-blue-50">${row.autoDeductible}</td>
                <td className="p-2 border-b text-center bg-green-50">{formatCurrency(row.homeDeductible)}</td>
                <td className="p-2 border-b text-right bg-yellow-50">{formatCurrency(row.proposedPremium)}</td>
                <td className="p-2 border-b text-right bg-blue-50">{formatCurrency(row.currentPremium)}</td>
                <td className="p-2 border-b text-right bg-green-50 font-semibold">{formatCurrency(row.recapturedPremium)}</td>
                <td className="p-2 border-b text-right bg-purple-50">{formatCurrency(row.beginningReserve)}</td>
                <td className="p-2 border-b text-right bg-purple-50 font-semibold">{formatCurrency(row.smartInsuredReserve)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-700">
        <button
          type="button"
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={isFirstPage}
          aria-label="Previous page"
          className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <span aria-live="polite">
          Page {page + 1} of {totalPages}
        </span>
        <button
          type="button"
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={isLastPage}
          aria-label="Next page"
          className="px-3 py-1 border rounded bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectionTable;
