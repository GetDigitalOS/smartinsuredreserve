import { deriveInsights } from '../src/lib/insights';
import { ProjectionRow, ProjectionInputs } from '../src/lib/types';

describe('deriveInsights', () => {
  it('returns valid insight strings including formatted reserve', () => {
    const rows = [
      {
        smartInsuredReserve: 12345,
        cumulativeSavings: 3000,
      } as ProjectionRow
    ];
    
    const inputs = {
      autoCurrentDeductible: 500,
      homeCurrentDeductible: 1000,
    } as ProjectionInputs;

    const insights = deriveInsights(rows, inputs);
    
    expect(insights.length).toBeGreaterThanOrEqual(3);
    
    insights.forEach(insight => {
      expect(typeof insight).toBe('string');
      expect(insight.length).toBeGreaterThan(0);
    });
    
    const hasTargetSubstring = insights.some(insight => insight.includes('$12,345'));
    expect(hasTargetSubstring).toBe(true);
  });
});
