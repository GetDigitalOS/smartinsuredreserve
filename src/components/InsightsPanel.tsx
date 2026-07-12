import React from 'react';
import { deriveInsights } from '../lib/insights';
import type { ProjectionInputs, ProjectionRow } from '../lib/types';

interface InsightsPanelProps {
  rows: ProjectionRow[];
  inputs: ProjectionInputs;
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ rows, inputs }) => {
  const insights = deriveInsights(rows, inputs);

  return (
    <section aria-label="Reserve insights">
      <ul>
        {insights.map((insight) => (
          <li key={insight}>{insight}</li>
        ))}
      </ul>
    </section>
  );
};

export default InsightsPanel;
