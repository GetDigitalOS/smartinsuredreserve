import { buildReserveProgressMarkdown } from '../src/lib/reserveProgressMarkdown';
import { ProjectionRow } from '../src/lib/types';

describe('buildReserveProgressMarkdown', () => {
    it('returns formatted markdown with computed progress', () => {
        const rows = [{ smartInsuredReserve: 250 }] as unknown as ProjectionRow[];
        const result = buildReserveProgressMarkdown(rows, 500);
        expect(result.split('\n')).toEqual(['| Reserve Progress |', '| --- |', '| 0.5 |']);
    });

    it('returns formatted markdown for empty rows', () => {
        const result = buildReserveProgressMarkdown([], 1000);
        expect(result.split('\n')).toEqual(['| Reserve Progress |', '| --- |', '| 0 |']);
    });
});
