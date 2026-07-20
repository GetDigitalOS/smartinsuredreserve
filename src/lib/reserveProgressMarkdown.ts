import { ProjectionRow } from './types';
import { computeReserveProgress } from './reserveProgress';

export function buildReserveProgressMarkdown(rows: ProjectionRow[], target: number): string {
    const progress = computeReserveProgress(rows, target);
    return `| Reserve Progress |\n| --- |\n| ${progress} |`;
}
