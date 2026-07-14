import { deriveHealthInsight } from '../src/lib/insights';
import { ProjectionInputs, ProjectionRow } from '../src/lib/types';

describe('deriveHealthInsight', () => {
  const inputs = {
    autoCurrentDeductible: 500,
    homeCurrentDeductible: 1000,
  } as ProjectionInputs;

  it('reports strong health for a well-covered reserve', () => {
    const insight = deriveHealthInsight(
      [{ smartInsuredReserve: 12000 } as ProjectionRow],
      inputs,
    );

    expect(insight).toContain('strong');
  });

  it('reports under health for an under-covered reserve', () => {
    const insight = deriveHealthInsight(
      [{ smartInsuredReserve: 2000 } as ProjectionRow],
      inputs,
    );

    expect(insight).toContain('under');
  });
});
