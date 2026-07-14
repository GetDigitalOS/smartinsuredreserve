import { deriveMetricInsights } from '../src/lib/insights';
import { ProjectionInputs, ProjectionRow } from '../src/lib/types';

describe('deriveMetricInsights', () => {
  it('returns formatted reserve metric insights', () => {
    const rows = [
      { reserveEarnings: 100, recapturedPremium: 250, cumulativeSavings: 250 } as ProjectionRow,
    ];

    const insights = deriveMetricInsights(rows, {} as ProjectionInputs);

    expect(insights).toHaveLength(3);
    expect(insights[0]).toContain('Total reserve earnings:');
    expect(insights.join(' ')).toContain('$100');
  });
});
