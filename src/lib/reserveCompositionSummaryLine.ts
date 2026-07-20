import { ProjectionRow } from './types';
import { describeReserveComposition } from './reserveCompositionLabel';
import { describeCompositionShare } from './compositionShareLabel';

export function describeReserveCompositionSummary(rows: ProjectionRow[]): string {
    return `${describeReserveComposition(rows)} | ${describeCompositionShare(rows)}`;
}
