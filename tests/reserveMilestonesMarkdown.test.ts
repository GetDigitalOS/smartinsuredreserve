import { buildReserveMilestonesMarkdown } from '../src/lib/reserveMilestonesMarkdown';
import { ProjectionRow } from '../src/lib/types';

describe('buildReserveMilestonesMarkdown', () => {
  it('should generate markdown table for milestones', () => {
    const rows = [
      { year: 1, smartInsuredReserve: 100 },
      { year: 2, smartInsuredReserve: 250 },
      { year: 3, smartInsuredReserve: 400 }
    ] as ProjectionRow[];
    
    const targets = [200, 500];
    const output = buildReserveMilestonesMarkdown(rows, targets);
    
    expect(output.split('\n')).toEqual([
      '| Target | Year |',
      '| --- | --- |',
      '| 200 | 2 |',
      '| 500 | not reached |'
    ]);
  });

  it('should handle empty rows', () => {
    const output = buildReserveMilestonesMarkdown([], [100]);
    expect(output.split('\n')).toEqual([
      '| Target | Year |',
      '| --- | --- |',
      '| 100 | not reached |'
    ]);
  });
});
