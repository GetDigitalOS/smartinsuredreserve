import { deriveMilestoneInsights } from '../src/lib/insights';
import { ProjectionRow } from '../src/lib/types';

describe('deriveMilestoneInsights', () => {
  it('reports reached and unreached reserve targets', () => {
    const rows = [
      { year: 1, smartInsuredReserve: 500 },
      { year: 2, smartInsuredReserve: 1500 },
    ] as ProjectionRow[];
    const insights = deriveMilestoneInsights(rows, [1000, 5000]);

    expect(insights).toHaveLength(2);
    expect(insights[0]).toContain('year 2');
    expect(insights[1]).toContain('not reached');
  });
});
